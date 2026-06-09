import type { Metadata } from "next";
import { Link } from "@/navigation";
import { MATCHES, type WCMatch } from "@/data/world-cup-2026";
import { predictMatch, getStageName, type MatchPrediction } from "@/lib/world-cup";
import { BreadcrumbListSchema } from "@/components/JsonLd";
import { BASE_URL } from "@/lib/config";
import { notFound } from "next/navigation";

type Props = { params: { locale: string; date: string } };

const UI: Record<string, {
  title: (d: string) => string; desc: (d: string) => string; heading: string;
  noMatches: string; prediction: string; groupLabel: string; vs: string;
  cta: string; ctaText: string; backLabel: string; venue: string;
}> = {
  en: {
    title: (d) => `I Ching World Cup Predictions ${d} — Today's Match Forecast | Chinese Culture Studio`,
    desc: (d) => `I Ching hexagram predictions for FIFA World Cup 2026 matches on ${d}. For entertainment only — ancient Chinese oracle meets football.`,
    heading: "I Ching World Cup Predictions", noMatches: "No matches scheduled for this date.",
    prediction: "Prediction", groupLabel: "Group", vs: "vs", cta: "Full World Cup Schedule",
    ctaText: "See all 104 matches and predictions &rarr;", backLabel: "← Full World Cup Schedule",
    venue: "Venue",
  },
  ru: {
    title: (d) => `И-Цзин прогнозы на ЧМ-2026 ${d} — Прогнозы на матчи | Chinese Culture Studio`,
    desc: (d) => `Прогнозы И-Цзин на матчи ЧМ-2026 на ${d}. Только для развлечения.`,
    heading: "Прогнозы И-Цзин на ЧМ-2026", noMatches: "На эту дату матчей нет.",
    prediction: "Прогноз", groupLabel: "Группа", vs: "vs", cta: "Полное расписание ЧМ",
    ctaText: "Все 104 матча и прогнозы &rarr;", backLabel: "← Полное расписание",
    venue: "Стадион",
  },
  ja: {
    title: (d) => `易経W杯予想 ${d} — 本日の試合占い | Chinese Culture Studio`,
    desc: (d) => `${d}のFIFAワールドカップ2026試合の易経卦予想。娯楽目的です。`,
    heading: "易経 2026年W杯 勝敗予想", noMatches: "この日に試合はありません。",
    prediction: "予想", groupLabel: "グループ", vs: "vs", cta: "全スケジュール",
    ctaText: "全104試合の予想を見る &rarr;", backLabel: "← 全スケジュール",
    venue: "会場",
  },
  ko: {
    title: (d) => `주역 월드컵 예측 ${d} — 오늘의 경기 전망 | Chinese Culture Studio`,
    desc: (d) => `${d} FIFA 월드컵 2026 경기 주역 괘 예측. 오락 목적입니다.`,
    heading: "주역 2026 월드컵 예측", noMatches: "이 날짜에 경기가 없습니다.",
    prediction: "예측", groupLabel: "조", vs: "vs", cta: "전체 일정",
    ctaText: "104개 전 경기 예측 보기 &rarr;", backLabel: "← 전체 일정",
    venue: "경기장",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = UI[params.locale] || UI.en;
  const matches = MATCHES.filter((m) => m.date === params.date && m.home !== "TBD");
  const title = matches.length > 0
    ? u.title(params.date) + ` (${matches.length} matches)`
    : u.title(params.date);
  const localePrefix = params.locale === "en" ? "" : `/${params.locale}`;
  return {
    title,
    description: u.desc(params.date),
    robots: "index, follow",
    openGraph: {
      title,
      description: u.desc(params.date),
      url: `${BASE_URL}${localePrefix}/daily/world-cup/${params.date}`,
    },
  };
}

function MatchCard({ p, locale }: { p: MatchPrediction; locale: string }) {
  const u = UI[locale] || UI.en;
  return (
    <div className="card-classic p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-stone-700">
          {p.match.home} <span className="text-stone-400 text-xs">{u.vs}</span> {p.match.away}
        </div>
        <span className="text-xs text-stone-400">{getStageName(p.match.stage, locale)}</span>
      </div>
      <div className="text-xs text-stone-500 mb-1">{u.groupLabel} {p.match.group} — {p.match.venue}</div>
      <div className="flex items-center gap-3 mb-2 pt-2 border-t border-stone-100">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "var(--accent)" }}>
          {p.hexagram.id}
        </div>
        <div>
          <div className="text-sm font-medium" style={{ color: "var(--accent)" }}>{p.hexagram.nameEn}</div>
          <div className="text-xs text-stone-400">{p.hexagram.nameZh} - {p.hexagram.pinyin}</div>
        </div>
      </div>
      <p className="text-xs text-stone-500 italic mb-1">&ldquo;{p.hexagram.judgmentEn}&rdquo;</p>
      <p className="text-xs text-stone-600">{p.footballInterpretation}</p>
    </div>
  );
}

export default function DailyWorldCupPage({ params }: Props) {
  const u = UI[params.locale] || UI.en;
  const locale = params.locale;
  const date = params.date;

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const matches: WCMatch[] = MATCHES.filter((m) => m.date === date && m.home !== "TBD");
  if (matches.length === 0) {
    // Even no-match days get indexed (for future tournament dates)
  }

  const predictions = matches.map(predictMatch);
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="max-w-4xl mx-auto">
      <BreadcrumbListSchema
        items={[
          { name: "Chinese Culture Studio", url: `${BASE_URL}${localePrefix}` },
          { name: "World Cup 2026", url: `${BASE_URL}${localePrefix}/world-cup` },
          { name: date, url: `${BASE_URL}${localePrefix}/daily/world-cup/${date}` },
        ]}
      />

      <p className="text-xs text-stone-400 mb-1">
        <Link href="/world-cup" className="hover:text-stone-600 underline">{u.backLabel}</Link>
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>{u.heading}</h1>
      <p className="text-sm text-stone-500 mb-6">{date}</p>

      {predictions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {predictions.map((p) => <MatchCard key={p.match.id} p={p} locale={locale} />)}
        </div>
      ) : (
        <div className="card-classic p-6 text-center text-sm text-stone-400 mb-8">
          <p className="mb-2">{u.noMatches}</p>
          <Link href="/world-cup" className="text-accent underline text-xs">{u.ctaText}</Link>
        </div>
      )}

      <div className="text-center mb-8">
        <Link href="/world-cup" className="inline-block px-6 py-3 rounded-xl font-medium btn-primary text-sm">
          {u.cta}
        </Link>
      </div>
    </div>
  );
}
