// 程序化内容管线 — A 线（2026-10-28 定案：热词驱动 + 引擎模板，全自动安全线）
// 流程: 竞品 sitemap 差集 → 意图分类(dates/zodiac/lunar) → 引擎生成真实数据 → 入库 → IndexNow
// 原则: 事实全部来自站内引擎（selectAuspiciousDays/solarToLunar/zodiac-data），AI 不参与 = 零编造风险
// 政策面: 每页数据独一无二（引擎按参数计算），不构成 scaled content abuse
import { prisma } from "@/lib/db";
import { EVENTS, getEvent, fill, MONTHS_2027 } from "@/data/auspicious-events";
import { selectAuspiciousDays, solarToLunar, CNY_DATES } from "@/lib/calendar";
import { getZodiacInfo } from "@/data/zodiac-data";
import { BASE_URL, BASE_HOST } from "@/lib/config";
import type { EventType } from "@/types";

const COMPETITOR_SITEMAPS = [
  "https://www.yourchineseastrology.com/sitemap.xml",
  "https://cafeastrology.com/sitemap.xml",
  "https://www.chinesefortunecalendar.com/sitemap.xml",
];

const MONTH_SLUGS: string[] = MONTHS_2027.map(m => m.slug);
const EVENT_SLUGS: string[] = EVENTS.map(e => e.slug);
const ANIMALS = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];
const YEARS = [2027, 2028, 2029, 2030];

interface Candidate { type: "dates" | "zodiac" | "lunar"; slug: string; source: string; params: Record<string, string | number>; }

async function fetchSitemapUrls(url: string, depth = 0): Promise<string[]> {
  const out: string[] = [];
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; CultureContentBot/1.0)" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return out;
    const text = await res.text();
    const locs = Array.from(text.matchAll(/<loc>\s*(?:<!\[CDATA\[)?([^<\]]+)/g)).map(m => m[1].trim());
    if (/<sitemapindex/i.test(text) && depth < 1) {
      for (const child of locs.slice(0, 3)) {
        out.push(...(await fetchSitemapUrls(child, depth + 1)));
      }
      return out;
    }
    return locs;
  } catch {
    return out;
  }
}

function tokensFromUrl(url: string): string[] {
  try {
    const path = new URL(url).pathname;
    const last = path.split("/").filter(Boolean).pop() || "";
    return last.replace(/\.(html?|php|asp)$/i, "").toLowerCase().split(/[-_]/).filter(t => t.length > 1);
  } catch {
    return [];
  }
}

/** 竞品 sitemap → 意图候选（去重） */
export async function discoverCandidates(): Promise<Candidate[]> {
  const all = new Map<string, Candidate>();
  for (const sm of COMPETITOR_SITEMAPS) {
    const urls = await fetchSitemapUrls(sm);
    for (const u of urls) {
      const t = tokensFromUrl(u);
      // dates: event + month + year
      const ev = t.find(x => EVENT_SLUGS.includes(x));
      const mo = t.find(x => MONTH_SLUGS.includes(x));
      const yr = t.find(x => YEARS.includes(Number(x)));
      if (ev && mo && yr) {
        const slug = `${ev}-${mo}-${yr}`;
        if (!all.has(slug)) all.set(slug, { type: "dates", slug, source: "competitor-sitemap", params: { event: ev, month: mo, year: Number(yr) } });
        continue;
      }
      // zodiac: animal + (2027|fortune|luck|horoscope)
      const an = t.find(x => ANIMALS.includes(x));
      const hasYear = t.some(x => /^20\d{2}$/.test(x));
      const hasFortune = t.some(x => /fortune|luck|horoscope|prediction/.test(x));
      if (an && (hasYear || hasFortune)) {
        const slug = `${an}-2027-fortune`;
        if (!all.has(slug)) all.set(slug, { type: "zodiac", slug, source: "competitor-sitemap", params: { animal: an } });
        continue;
      }
      // lunar: month + lunar/chinese
      const hasLunar = t.some(x => /lunar|chinese/.test(x));
      if (mo && hasLunar && !ev) {
        const slug = `${mo}-lunar-dates-2027`;
        if (!all.has(slug)) all.set(slug, { type: "lunar", slug, source: "competitor-sitemap", params: { month: mo } });
      }
    }
  }
  return Array.from(all.values());
}

export function getGhostMonthRange(year: number): string | null {
  const d = new Date(Date.UTC(year, 0, 1));
  let first: Date | null = null;
  let last: Date | null = null;
  for (; d.getUTCFullYear() === year; d.setUTCDate(d.getUTCDate() + 1)) {
    const lunar = solarToLunar(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    if (lunar.lunarMonth === 7 && !lunar.isLeapMonth) {
      if (!first) first = new Date(d);
      last = new Date(d);
    }
  }
  if (!first || !last) return null;
  const fmt = (x: Date) => x.toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
  return `${fmt(first)} – ${fmt(last)}, ${year}`;
}


function formatDay(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** dates 类型：某年某月某事件的吉日文章（引擎真实数据 + 内容工厂模板） */
function makeDatesArticle(c: Candidate) {
  const ev = getEvent(String(c.params.event));
  const monthSlug = String(c.params.month);
  const year = Number(c.params.year);
  if (!ev) return null;
  const mNum = MONTH_SLUGS.indexOf(monthSlug) + 1;
  if (!mNum) return null;
  const lastDay = new Date(Date.UTC(year, mNum, 0)).getUTCDate();
  const result = selectAuspiciousDays({
    startDate: `${year}-${String(mNum).padStart(2, "0")}-01`,
    endDate: `${year}-${String(mNum).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`,
    eventType: ev.slug as EventType,
  });
  const top = [...result.auspiciousDays].sort((a, b) => b.score - a.score).slice(0, 3);
  if (!top.length) return null;
  const monthName = MONTHS_2027[mNum - 1].name;
  const ghost = getGhostMonthRange(year);
  const vars = { month: monthName, year, ghostMonth: ghost || "the Ghost Month" };
  const title = fill(ev.title, vars);
  const metaDesc = fill(ev.desc, vars);
  const intro = ev.intro.map(p => fill(p, vars));
  const sections = [
    {
      h: `Top ${top.length} Auspicious ${ev.shortName} Days in ${monthName} ${year}`,
      p: top.map(d =>
        `${formatDay(d.date)} — score ${d.score}/100. ${d.lunarDate}; year ${d.ganzhi.year}, day ${d.ganzhi.day}.` +
        ` Best for: ${d.suitable.slice(0, 3).join(", ")}.`
      ),
    },
    { h: fill(ev.avoidTitle, vars), p: ev.avoidNotes.map(n => fill(n, vars)) },
    {
      h: "How these dates are chosen",
      p: [
        "Each date is computed from the traditional Chinese almanac — the day's heavenly stems and earthly branches, the twelve Jian-Chu officers, and the almanac's suitability list for this event type.",
        "Scores compare every day of the month; only the highest-scoring days are shown. Dates inside the Ghost Month are automatically excluded for major life events.",
      ],
    },
    {
      h: "Need the full picture?",
      p: [
        "This page shows the top days. The full almanac reading adds hour-level luck windows, clashing zodiac signs, and a complete list of what to do and avoid on your chosen day.",
      ],
    },
  ];
  const faqs = ev.faqs.map(f => ({ q: fill(f.q, vars), a: fill(f.a, vars) }));
  return { slug: c.slug, type: "dates", title, metaDesc, intro: intro.join("\n\n"), sections: JSON.stringify(sections), faqs: JSON.stringify(faqs), source: c.source };
}

/** zodiac 类型：生肖 2027 运势（生肖数据 + 2027 年干支） */
function makeZodiacArticle(c: Candidate) {
  const animal = String(c.params.animal);
  const yearInfo = getZodiacInfo(2027, "en");
  const idx = ANIMALS.indexOf(animal);
  const animalInfo = getZodiacInfo(2020 + ((idx - (2020 - 4)) % 12 + 12) % 12, "en");
  const title = `${capitalize(animal)} in 2027: What the Year of the ${yearInfo.animal} Means for You`;
  const metaDesc = `${capitalize(animal)} 2027 forecast — luck, love and career in the Year of the ${yearInfo.animal}, with your lucky colors, numbers and best matches.`;
  const intro = `If you were born in a ${capitalize(animal)} year, 2027 — the Year of the ${yearInfo.animal} — brings a different rhythm to your life. Here is what the Chinese zodiac tradition says about your luck, your best matches, and how to make the most of the year.`;
  const sections = [
    {
      h: `Your ${capitalize(animal)} nature`,
      p: [`People born in ${capitalize(animal)} years are traditionally described as: ${animalInfo.personality.join(", ").toLowerCase()}.`],
    },
    {
      h: `Luck in 2027`,
      p: [
        `2027 is an Earth year in the five-element cycle (the Year of the Goat's element). For ${capitalize(animal)}s, the almanac's advice is to lean on your natural strengths — ${animalInfo.personality[0].toLowerCase()} — and plan important decisions on days that favor your element.`,
        `Lucky numbers: ${animalInfo.luckyNumbers}. Lucky colors: ${animalInfo.luckyColors.toLowerCase()}.`,
      ],
    },
    {
      h: "Your best matches",
      p: [`In love and partnership, ${animal}s harmonize best with: ${animalInfo.compatible.toLowerCase()}. The pairing to handle with care: ${animalInfo.incompatible.toLowerCase()}.`],
    },
    {
      h: "Want a reading built for your exact birth date?",
      p: ["Zodiac-year guidance is a general current. A Ba-Zi reading uses your full birth information to map your personal five-element balance — and a name chosen to support it."],
    },
  ];
  const faqs = [
    { q: `Is 2027 a good year for people born in ${capitalize(animal)} years?`, a: `The Year of the ${yearInfo.animal} favors steady progress. The almanac tradition reads it as a year to strengthen what you already have — especially in the areas tied to your lucky numbers (${animalInfo.luckyNumbers}) and colors.` },
    { q: `Who are ${capitalize(animal)}s most compatible with?`, a: `Traditionally, ${animalInfo.compatible.toLowerCase()}. The six-harmony and three-unity groupings of the Chinese zodiac place these signs in natural alignment.` },
    { q: "How is this different from a Ba-Zi reading?", a: "Zodiac signs describe one branch of your birth year. Ba-Zi maps all four pillars — year, month, day and hour — into a five-element chart. Our naming and calendar services are built on the full Ba-Zi engine." },
  ];
  return { slug: c.slug, type: "zodiac", title, metaDesc, intro, sections: JSON.stringify(sections), faqs: JSON.stringify(faqs), source: c.source };
}


/** lunar 类型：某月农历对照 + 春节位置 */
function makeLunarArticle(c: Candidate) {
  const monthSlug = String(c.params.month);
  const mNum = MONTH_SLUGS.indexOf(monthSlug) + 1;
  if (!mNum) return null;
  const monthName = MONTHS_2027[mNum - 1].name;
  const cny = CNY_DATES[2027];
  const lunarMonthNames = ["", "1st month", "2nd month", "3rd month", "4th month", "5th month", "6th month", "7th month", "8th month", "9th month", "10th month", "11th month", "12th month"];
  const days: string[] = [];
  for (const d of [1, 8, 15, 23, new Date(Date.UTC(2027, mNum, 0)).getUTCDate()]) {
    const lunar = solarToLunar(2027, mNum, d);
    days.push(`${monthName} ${d}, 2027 → ${lunarMonthNames[lunar.lunarMonth]} day ${lunar.lunarDay}${lunar.isLeapMonth ? " (leap month)" : ""}`);
  }
  const isCnyMonth = !!cny && cny[0] === mNum;
  const title = `${monthName} 2027 in the Chinese Lunar Calendar: Key Dates Explained`;
  const metaDesc = `What does ${monthName} 2027 look like on the Chinese lunar calendar? Key lunar dates, the Spring Festival position, and what each day means for planning.`;
  const intro = `The Chinese lunar calendar runs roughly a month behind the Gregorian one. ${monthName} 2027 spans parts of two lunar months — here are the key dates and what they mean for festivals, naming, and choosing days.`;
  const sections = [
    { h: `${monthName} 2027 — lunar conversion table`, p: days },
    {
      h: "Chinese New Year",
      p: isCnyMonth
        ? [`Chinese New Year 2027 falls on ${monthName} ${cny ? cny[1] : ""}, 2027 — the first day of the lunar year, and the most important date of the Chinese calendar.`]
        : [`Chinese New Year 2027 falls on ${cny ? new Date(Date.UTC(2027, cny[0] - 1, cny[1])).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : ""}, 2027.`],
    },
    {
      h: "Why the lunar date matters",
      p: [
        "Traditional Chinese planning — weddings, openings, moving house — reads both the lunar and almanac day. The lunar date decides the month's festivals; the almanac day decides what the day is good for.",
        "Convert any date to the lunar calendar, then check whether it makes a good wedding or business day, with the tools below.",
      ],
    },
  ];
  const faqs = [
    { q: `When is Chinese New Year 2027?`, a: `Chinese New Year 2027 falls on ${cny ? new Date(Date.UTC(2027, cny[0] - 1, cny[1])).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "February"}, marking the start of the Year of the Goat.` },
    { q: `Why does the lunar ${monthName} differ from the Gregorian one?`, a: "The lunar calendar is based on moon cycles of about 29.5 days, so lunar months drift against the Gregorian calendar. That's why Chinese New Year moves between late January and late February." },
    { q: "Can I check a specific date?", a: "Yes — use the free lunar calendar converter to convert any Gregorian date to its lunar month, day name and zodiac year." },
  ];
  return { slug: c.slug, type: "lunar", title, metaDesc, intro, sections: JSON.stringify(sections), faqs: JSON.stringify(faqs), source: c.source };
}

async function pingIndexNow(slugs: string[]): Promise<boolean> {
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: BASE_HOST,
        key: "b8f3a2d1c7e4569f0a1234b5678c9d0e",
        keyLocation: `https://${BASE_HOST}/b8f3a2d1c7e4569f0a1234b5678c9d0e.txt`,
        urlList: slugs.map(s => `${BASE_URL}/insights/${s}`),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** A 线主流程：发现 → 分类 → 引擎生成 → 入库（ON CONFLICT 幂等）→ IndexNow */
export async function runDailyContentPipeline() {
  const candidates = await discoverCandidates();
  const existingRows = await prisma.$queryRawUnsafe<{ slug: string }[]>(
    `SELECT slug FROM "ProgrammaticArticle"`
  );
  const existing = new Set(existingRows.map(r => r.slug));
  const generated: string[] = [];
  const skipped: string[] = [];
  for (const c of candidates) {
    if (generated.length >= 2) break;
    if (existing.has(c.slug)) { skipped.push(c.slug); continue; }
    let article: { slug: string; type: string; title: string; metaDesc: string; intro: string; sections: string; faqs: string; source: string } | null = null;
    if (c.type === "dates") article = makeDatesArticle(c);
    else if (c.type === "zodiac") article = makeZodiacArticle(c);
    else if (c.type === "lunar") article = makeLunarArticle(c);
    if (!article) continue;
    await prisma.$executeRawUnsafe(
      `INSERT INTO "ProgrammaticArticle" ("id","slug","type","title","metaDesc","intro","sections","faqs","source","status")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, 'published')
       ON CONFLICT ("slug") DO NOTHING`,
      article.slug, article.type, article.title, article.metaDesc, article.intro, article.sections, article.faqs, article.source
    );
    generated.push(c.slug);
  }
  const indexNowOk = generated.length ? await pingIndexNow(generated) : null;
  return {
    candidatesFound: candidates.length,
    generated,
    skippedExisting: skipped.length,
    indexNowOk,
  };
}

export async function getPublishedArticles() {
  return prisma.$queryRawUnsafe<{ slug: string; createdAt: Date }[]>(
    `SELECT slug, "createdAt" FROM "ProgrammaticArticle" WHERE status='published' ORDER BY "createdAt" DESC`
  );
}
