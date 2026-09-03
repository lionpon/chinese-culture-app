// Programmatic SEO — date long-tail pages (content factory batch 1, en only).
// 13 events × 12 months of 2027 = 156 static pages. Dates are computed from the
// almanac engine at build time (src/lib/calendar.ts) — never hand-written.
// See .claude/skills/content-factory/SKILL.md for the content standard.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { selectAuspiciousDays, solarToLunar } from "@/lib/calendar";
import { EVENTS, MONTHS_2027, YEAR, getEvent, fill } from "@/data/auspicious-events";
import { BASE_URL } from "@/lib/config";
import GuideFaq from "@/components/GuideFaq";
import GuideCTA from "@/components/GuideCTA";
import GuideToolEmbed from "@/components/GuideToolEmbed";

export const dynamicParams = false;

const JIANCHU_EN: Record<string, string> = {
  "建": "Establish", "除": "Remove", "满": "Full", "平": "Balance",
  "定": "Stable", "执": "Initiate", "破": "Destroy", "危": "Danger",
  "成": "Success", "收": "Receive", "开": "Open", "闭": "Close",
};

// Month-specific cultural notes (authentic, computed where possible)
const MONTH_NOTES: Record<string, string> = {
  february: "Chinese New Year falls on February 6, 2027 — the year's biggest celebration and a busy time for family events.",
  april: "Qingming Festival falls in early April — a remembrance day most families keep for ancestors, not celebrations.",
  december: "The winter solstice in late December is a traditional time for family gatherings and ancestral ceremonies.",
};

function getGhostMonthRange(year: number): string | null {
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

export function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const ev of EVENTS) {
    for (const m of MONTHS_2027) {
      out.push({ locale: "en", slug: `${ev.slug}-${m.slug}-${YEAR}` });
    }
  }
  return out;
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const [evSlug, mSlug] = params.slug.split("-");
  const ev = getEvent(evSlug);
  const m = MONTHS_2027.find(x => x.slug === mSlug);
  if (!ev || !m) return {};
  const url = `${BASE_URL}/guide/auspicious-dates/${params.slug}`;
  return {
    title: fill(ev.title, { month: m.name, year: YEAR }),
    description: fill(ev.desc, { month: m.name, year: YEAR }),
    openGraph: {
      title: fill(ev.title, { month: m.name, year: YEAR }),
      description: fill(ev.desc, { month: m.name, year: YEAR }),
      type: "website",
      url,
    },
    alternates: { canonical: url, languages: { en: url } },
    robots: "index, follow",
  };
}

export default function AuspiciousDateMonthPage({ params }: { params: { locale: string; slug: string } }) {
  if (params.locale !== "en") notFound();
  const [evSlug, mSlug, yStr] = params.slug.split("-");
  const ev = getEvent(evSlug);
  const monthIdx = MONTHS_2027.findIndex(x => x.slug === mSlug);
  const m = MONTHS_2027[monthIdx];
  if (!ev || !m || parseInt(yStr) !== YEAR) notFound();

  const mNum = monthIdx + 1;
  const lastDay = new Date(Date.UTC(YEAR, mNum, 0)).getUTCDate();
  const result = selectAuspiciousDays({
    startDate: `${YEAR}-${String(mNum).padStart(2, "0")}-01`,
    endDate: `${YEAR}-${String(mNum).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`,
    eventType: ev.slug,
  });
  const days = [...result.auspiciousDays].sort((a, b) => b.score - a.score);
  const ghostMonth = getGhostMonthRange(YEAR);
  const monthNote = MONTH_NOTES[m.slug];
  const prevIdx = (monthIdx + 11) % 12;
  const nextIdx = (monthIdx + 1) % 12;
  const prev = MONTHS_2027[prevIdx];
  const next = MONTHS_2027[nextIdx];

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      {/* Breadcrumb */}
      <nav className="not-prose text-xs mb-4" style={{ color: "var(--text-dim)" }}>
        <Link href="/" className="hover:underline">Home</Link> ›{" "}
        <Link href="/guide/auspicious-dates" className="hover:underline">Auspicious Dates Guide</Link> ›{" "}
        <span style={{ color: "var(--text-muted)" }}>{ev.shortName} · {m.name}</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold">
        {ev.emoji} {fill(ev.title, { month: m.name, year: YEAR })}
      </h1>
      <p className="text-stone-500 text-sm">{fill(ev.desc, { month: m.name, year: YEAR }).split(" — ")[0]}.</p>
      <hr className="my-6 border-stone-200" />

      <h2>{ev.introTitle}</h2>
      {ev.intro.map((p, i) => (
        <p key={i}>{fill(p, { month: m.name, year: YEAR, ghostMonth: ghostMonth ?? "" })}</p>
      ))}
      {monthNote && <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>📅 {monthNote}</p>}

      <GuideToolEmbed tool="dateCheck" eventType={ev.slug} />
      <GuideCTA href="/calendar" service="calendar" variant="inline" />

      <h2>The Best-Rated {ev.shortName} Days in {m.name}</h2>
      {days.length === 0 ? (
        <p>No especially favorable days this month — the almanac is quiet for {ev.name.toLowerCase()}. Try a neighboring month.</p>
      ) : (
        <>
          <p className="text-sm text-stone-500">
            {days.length} days in {m.name} score above the almanac&apos;s baseline for {ev.name.toLowerCase()}.
            Each is rated on its jianchu star, its day-branch, and the lucky gods in charge.
          </p>
          {days.map((day, i) => (
            <div key={day.date} className="not-prose my-2 card-classic p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-base font-bold text-accent m-0">
                  {i === 0 && <span title="Top pick" className="mr-1">⭐</span>}
                  {formatDay(day.date)}
                </p>
                <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(74,158,74,0.12)", color: "#3d8a3d" }}>
                  Score {day.score}/100
                </span>
              </div>
              {i === 0 ? (
                <>
                  <p className="text-xs mt-1 mb-0" style={{ color: "var(--text-muted)" }}>
                    {day.lunarDate} · {day.ganzhi.day} · {day.jianchu} ({JIANCHU_EN[day.jianchu] || day.jianchu}) day · {day.constellation}
                  </p>
                  <p className="text-xs mt-1 mb-0">
                    <span style={{ color: "var(--text-dim)" }}>Lucky gods:</span> {day.gods.join(" · ")}
                  </p>
                  {day.suitableEn.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {day.suitableEn.map(s => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(201,169,110,0.1)", color: "var(--gold)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xs mt-1 mb-0" style={{ color: "var(--text-dim)" }}>
                  {day.jianchu} ({JIANCHU_EN[day.jianchu] || day.jianchu}) day · 🔒 full details in your reading
                </p>
              )}
            </div>
          ))}
          <p className="text-sm text-stone-500 not-prose">
            Your full reading covers all 13 event types, hour-by-hour luck windows, and personal zodiac-clash checks for these dates.
          </p>
        </>
      )}

      <h2>{ev.avoidTitle}</h2>
      <ul>
        {ev.avoidNotes.map(n => (
          <li key={n}>{fill(n, { month: m.name, year: YEAR, ghostMonth: ghostMonth ?? "" })}</li>
        ))}
      </ul>

      {/* Month navigation — internal link ring across all 12 months */}
      <h2>Every Month in {YEAR}</h2>
      <div className="not-prose flex flex-wrap gap-1.5">
        {MONTHS_2027.map(mo => (
          <Link
            key={mo.slug}
            href={`/guide/auspicious-dates/${ev.slug}-${mo.slug}-${YEAR}`}
            className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
              mo.slug === m.slug ? "font-semibold" : "hover:opacity-80"
            }`}
            style={mo.slug === m.slug
              ? { backgroundColor: "var(--gold)", color: "var(--bg-deep)", borderColor: "var(--gold)" }
              : { borderColor: "var(--border-medium)", color: "var(--text-muted)" }}
          >
            {mo.short}
          </Link>
        ))}
      </div>
      <div className="not-prose flex justify-between mt-3 text-sm">
        <Link href={`/guide/auspicious-dates/${ev.slug}-${prev.slug}-${YEAR}`} className="hover:underline" style={{ color: "var(--gold)" }}>
          ← {prev.name} {YEAR}
        </Link>
        <Link href={`/guide/auspicious-dates/${ev.slug}-${next.slug}-${YEAR}`} className="hover:underline" style={{ color: "var(--gold)" }}>
          {next.name} {YEAR} →
        </Link>
      </div>

      {/* Sibling events — cross-link all 13 event series for this month */}
      <h2>Other Date Guides for {m.name} {YEAR}</h2>
      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {EVENTS.map(e => (
          <Link
            key={e.slug}
            href={`/guide/auspicious-dates/${e.slug}-${m.slug}-${YEAR}`}
            className={`text-xs px-2.5 py-2 rounded-lg border transition-colors ${e.slug === ev.slug ? "font-semibold" : "hover:opacity-80"}`}
            style={e.slug === ev.slug
              ? { backgroundColor: "var(--gold-subtle)", borderColor: "var(--gold)", color: "var(--gold)" }
              : { borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
          >
            {e.emoji} {e.shortName}
          </Link>
        ))}
      </div>

      <GuideFaq lang={params.locale} faqs={ev.faqs.map(f => ({
        q: fill(f.q, { month: m.name, year: YEAR, ghostMonth: ghostMonth ?? "" }),
        a: fill(f.a, { month: m.name, year: YEAR, ghostMonth: ghostMonth ?? "" }),
      }))} />

      <GuideCTA href="/calendar" service="calendar" />
      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">
        Dates are computed from the traditional Chinese almanac (tongshu). For entertainment purposes only — not professional advice.
      </p>

      <GuideCTA href="/calendar" service="calendar" variant="sticky" />
    </article>
  );
}
