// 产品轨社媒内容(营销第 2 步 — 2026-10-19 新增)
// 目标:把"可付款客群"(美国准父母/侨民)从高意图社区引到 /naming 产品页。
// 策略(与 reddit.ts 注释一致):发实质干货帖,链接自然植入,绝不裸链。
// 门控:REDDIT_PROMO_ENABLED=1 + redditConfigured() 双开关,默认静默不发。
// 调度:先人工触发(/api/reddit-promo),观察社区反馈后再考虑 cron 自动化。

import { BASE_URL } from "@/lib/config";

const SITE_URL = BASE_URL;

/** UTM 链接 — 与 content.ts 的 utmLink 区分 campaign */
function promoLink(path: string, lang: string, variant: string): string {
  const localePath = lang === "en" ? path : `/${lang}${path}`;
  return `${SITE_URL}${localePath}?utm_source=reddit&utm_medium=social&utm_campaign=naming-tool&utm_content=${variant}`;
}

export interface NamingPromoPost {
  variant: string;
  title: string;
  text: string;
  link: string;
}

// 名字数据源自 src/data/characters.ts(诗经/楚辞/论语语料库)
const GIRL_NAMES = [
  { ch: "芷若", py: "Zhǐruò", en: "Angelica + lotus — 'purity and grace', from Songs of Chu" },
  { ch: "兰心", py: "Lánxīn", en: "Orchid + heart — 'a refined and virtuous soul', Songs of Chu" },
  { ch: "薇安", py: "Wēi'ān", en: "Rose + peace — 'beauty with calm strength', Book of Songs" },
  { ch: "桐音", py: "Tóngyīn", en: "Paulownia + sound — 'music of the phoenix tree', Book of Songs" },
  { ch: "昭华", py: "Zhāohuá", en: "Bright + splendor — 'illustrious radiance', Book of Songs" },
  { ch: "若曦", py: "Ruòxī", en: "Like + dawn light — 'graceful as the morning sun', Songs of Chu" },
  { ch: "语嫣", py: "Yǔyān", en: "Speech + charm — 'eloquent and captivating'" },
  { ch: "静姝", py: "Jìngshū", en: "Quiet + beauty — 'serene and lovely', Book of Songs" },
  { ch: "婉清", py: "Wǎnqīng", en: "Graceful + clear — 'gentle purity'" },
  { ch: "佳音", py: "Jiāyīn", en: "Good + sound — 'good tidings'" },
];

const BOY_NAMES = [
  { ch: "松柏", py: "Sōngbǎi", en: "Pine + cypress — 'steadfast through hardship', Analects" },
  { ch: "明德", py: "Míngdé", en: "Bright + virtue — 'illuminated morality', Analects" },
  { ch: "景行", py: "Jǐngxíng", en: "Grand + conduct — 'noble path', Book of Songs" },
  { ch: "沐阳", py: "Mùyáng", en: "Bathe + sun — 'bathed in sunshine'" },
  { ch: "子墨", py: "Zǐmò", en: "Master + ink — 'scholar's elegance'" },
  { ch: "修远", py: "Xiūyuǎn", en: "Cultivate + far — 'the long road of self-cultivation', Songs of Chu" },
  { ch: "承宇", py: "Chéngyǔ", en: "Uphold + cosmos — 'one who carries the world', Songs of Chu" },
  { ch: "浩然", py: "Hàorán", en: "Vast + spirit — 'magnanimous spirit'" },
  { ch: "嘉树", py: "Jiāshù", en: "Excellent + tree — 'a fine and upright man', Songs of Chu" },
  { ch: "启明", py: "Qǐmíng", en: "Dawn + bright — 'the morning star'" },
];

// r/namenerds 合规要点(2026-10-19 读版规后修订):
//   • NO dishonesty = 永封级 — 必须透明披露"这是我们做的免费工具",不得伪装纯个人整理
//   • 列表 < 15 个(本模板 10 个 ✅)• 同 sub 3 天内不重发
const INTRO_EN = `Chinese given names are usually two characters drawn from classical literature — the Book of Songs (诗经), Songs of Chu (楚辞) and the Analects (论语). Each character carries a meaning and a five-element property (wood, fire, earth, metal, water), and parents often balance them against the child's birth date.

Full disclosure: I've been building a small database of names from these sources for a free naming tool, and these are my current favorites from it. For each: characters, pinyin, meaning, and source where it exists.`;

const HOW_EN = `How the five-element part works: a child born in, say, a wood-heavy year benefits from fire or metal characters — the system is a balancing act, not superstition. The tool we built (free, no sign-up) generates a personalized name from this database based on birth date — pinyin, meaning and the element reasoning included: {LINK}. Happy to answer questions about any of the names above in the comments.`;

const VARIANT_GIRLS: NamingPromoPost = {
  variant: "girls",
  title: "Chinese girl names from classical poetry — 10 of my favorites (meanings & pinyin)",
  text: `${INTRO_EN}\n\n${GIRL_NAMES.map((n, i) => `${i + 1}. ${n.ch} (${n.py}) — ${n.en}`).join("\n")}\n\n${HOW_EN}`,
  link: promoLink("/naming", "en", "girls"),
};

const VARIANT_BOYS: NamingPromoPost = {
  variant: "boys",
  title: "Chinese boy names from the Analects & Songs of Chu — 10 of my favorites (meanings & pinyin)",
  text: `${INTRO_EN}\n\n${BOY_NAMES.map((n, i) => `${i + 1}. ${n.ch} (${n.py}) — ${n.en}`).join("\n")}\n\n${HOW_EN}`,
  link: promoLink("/naming", "en", "boys"),
};

const VARIANTS: Record<string, NamingPromoPost> = {
  girls: VARIANT_GIRLS,
  boys: VARIANT_BOYS,
};

/** 返回指定 variant 的产品帖;默认按周数轮换(一周 girls、一周 boys)。 */
export function getNamingPromoPost(variant?: string, date = new Date()): NamingPromoPost {
  if (variant && VARIANTS[variant]) return VARIANTS[variant];
  const week = Math.floor(date.getTime() / (7 * 24 * 3600 * 1000));
  return week % 2 === 0 ? VARIANT_GIRLS : VARIANT_BOYS;
}
