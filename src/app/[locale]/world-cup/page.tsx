import type { Metadata } from "next";
import { Link } from "@/navigation";
import { MATCHES, GROUPS, type WCMatch, getMatchesByDate } from "@/data/world-cup-2026";
import { predictMatch, getStageName, type MatchPrediction } from "@/lib/world-cup";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

const UI: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  hero: string; subtitle: string; intro: string;
  todayLabel: string; upcomingLabel: string; fullScheduleLabel: string;
  noMatches: string; groupLabel: string; vs: string;
  cta: string; ctaText: string; disclaimer: string; groupsLabel: string;
}> = {
  en: {
    title: "I Ching World Cup 2026 Predictions — AI Oracle Match Forecast | Chinese Culture Studio",
    desc: "Ancient I Ching (Book of Changes) hexagram predictions for every 2026 FIFA World Cup match. 48 teams, 104 matches.",
    ogTitle: "I Ching World Cup 2026 Predictions", ogDesc: "Ancient Chinese oracle meets modern football.",
    hero: "I Ching x World Cup 2026", subtitle: "The 3,000-year-old Book of Changes meets the world's biggest tournament. Every match, one hexagram.",
    intro: "Below are I Ching hexagram-based predictions for every match of the 2026 FIFA World Cup (June 11 - July 19). Each prediction is deterministically generated from the match date and teams — the same match always yields the same hexagram.",
    todayLabel: "Today's Predictions", upcomingLabel: "Upcoming Matches", fullScheduleLabel: "Full Schedule",
    noMatches: "No matches scheduled for this date.", groupLabel: "Group", vs: "vs",
    cta: "Try I Ching Divination", ctaText: "Ask the I Ching your own question — about football or anything else.",
    disclaimer: "For entertainment only. The I Ching is a 3,000-year-old wisdom tradition, not a sports betting tool. Predictions are deterministic and based on match metadata.",
    groupsLabel: "Groups",
  },
  ru: {
    title: "И-Цзин ЧМ-2026 Прогнозы | Chinese Culture Studio",
    desc: "Древние предсказания И-Цзин для каждого матча ЧМ-2026.",
    ogTitle: "И-Цзин Прогнозы на ЧМ-2026", ogDesc: "Древний китайский оракул встречает современный футбол.",
    hero: "И-Цзин x ЧМ-2026", subtitle: "3000-летняя Книга Перемен встречает крупнейший турнир мира.",
    intro: "Прогнозы на основе гексаграмм И-Цзин для каждого матча ЧМ-2026 (11 июня - 19 июля).",
    todayLabel: "Прогнозы на Сегодня", upcomingLabel: "Предстоящие Матчи", fullScheduleLabel: "Полное Расписание",
    noMatches: "На эту дату матчей нет.", groupLabel: "Группа", vs: "vs",
    cta: "Гадание И-Цзин", ctaText: "Задайте И-Цзин свой вопрос.",
    disclaimer: "Только для развлечения.", groupsLabel: "Группы",
  },
  ja: {
    title: "易経 2026年W杯 勝敗予想 | Chinese Culture Studio",
    desc: "古代の易経を用いた2026年FIFAワールドカップの卦予測。",
    ogTitle: "易経 2026年W杯 勝敗予想", ogDesc: "古代中国のオラクルが現代サッカーと出会う。",
    hero: "易経 x 2026 W杯", subtitle: "3000年の歴史を持つ易経が世界最大のトーナメントと出会う。",
    intro: "2026年FIFAワールドカップ（6月11日〜7月19日）の全試合に対する易経八卦予測です。",
    todayLabel: "本日の予想", upcomingLabel: "今後の試合", fullScheduleLabel: "全スケジュール",
    noMatches: "この日に試合はありません。", groupLabel: "グループ", vs: "vs",
    cta: "易経占い", ctaText: "易経に質問してみてください。",
    disclaimer: "娯楽目的です。", groupsLabel: "グループ",
  },
  ko: {
    title: "주역 2026 월드컵 예측 | Chinese Culture Studio",
    desc: "고대 주역을 통한 2026 FIFA 월드컵 괘 예측.",
    ogTitle: "주역 2026 월드컵 예측", ogDesc: "고대 중국의 오라클이 현대 축구를 만나다.",
    hero: "주역 x 2026 월드컵", subtitle: "3,000년 된 역경이 세계 최대의 토너먼트를 만납니다.",
    intro: "2026 FIFA 월드컵(6월 11일~7월 19일)의 모든 경기에 대한 주역 괘 예측입니다.",
    todayLabel: "오늘의 예측", upcomingLabel: "예정된 경기", fullScheduleLabel: "전체 일정",
    noMatches: "경기가 없습니다.", groupLabel: "그룹", vs: "vs",
    cta: "주역 점술", ctaText: "주역에게 질문해보세요.",
    disclaimer: "오락 목적입니다.", groupsLabel: "조",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = UI[params.locale] || UI.en;
  return {
    title: u.title, description: u.desc,
    openGraph: { title: u.ogTitle, description: u.ogDesc },
    robots: "index, follow",
    alternates: {
      languages: {
        en: `${BASE_URL}/world-cup`,
        ru: `${BASE_URL}/ru/world-cup`,
        ja: `${BASE_URL}/ja/world-cup`,
        ko: `${BASE_URL}/ko/world-cup`,
      },
    },
  };
}

function PredictionCard({ p, locale }: { p: MatchPrediction; locale: string }) {
  return (
    <div className="card-classic p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-stone-700">
          {p.match.home} <span className="text-stone-400 text-xs">vs</span> {p.match.away}
        </div>
        <span className="text-xs text-stone-400">{getStageName(p.match.stage, locale)}</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
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

export default function WorldCupPage({ params }: Props) {
  const u = UI[params.locale] || UI.en;
  const locale = params.locale;
  const today = new Date().toISOString().slice(0, 10);

  const todayMatches = getMatchesByDate(today).filter(m => m.home !== "TBD");
  const todayPredictions = todayMatches.map(predictMatch);

  const upcoming = MATCHES.filter(m => m.date >= today && m.home !== "TBD").slice(0, 12);

  const allMatches = MATCHES.filter(m => m.home !== "TBD");
  const matchesByDate = new Map<string, WCMatch[]>();
  for (const m of allMatches) {
    const existing = matchesByDate.get(m.date) || [];
    existing.push(m);
    matchesByDate.set(m.date, existing);
  }
  const dateEntries = Array.from(matchesByDate.entries()).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{ color: "var(--accent)" }}>{u.hero}</h1>
        <p className="text-sm sm:text-base text-stone-500 max-w-2xl mx-auto">{u.subtitle}</p>
        <p className="text-xs text-stone-400 mt-4 max-w-xl mx-auto">{u.intro}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.todayLabel} — {today}</h2>
        {todayPredictions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {todayPredictions.map((p) => <PredictionCard key={p.match.id} p={p} locale={locale} />)}
          </div>
        ) : (
          <div className="card-classic p-6 text-center text-sm text-stone-400">{u.noMatches}</div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.groupsLabel}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GROUPS.map((g) => (
            <div key={g.name} className="card-classic p-3">
              <div className="text-sm font-semibold text-stone-700 mb-2">{u.groupLabel} {g.name}</div>
              {g.teams.map((t) => <div key={t} className="text-xs text-stone-600">{t}</div>)}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.upcomingLabel}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcoming.map((m) => <PredictionCard key={m.id} p={predictMatch(m)} locale={locale} />)}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.fullScheduleLabel}</h2>
        {dateEntries.map(([date, matches]) => (
          <div key={date} className="mb-6">
            <h3 className="text-sm font-medium text-stone-500 mb-3 sticky top-14 bg-stone-50 py-1">{date}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matches.map((m) => <PredictionCard key={m.id} p={predictMatch(m)} locale={locale} />)}
            </div>
          </div>
        ))}
      </section>

      <section className="card-classic p-5 text-center mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-2">{u.cta}</h2>
        <p className="text-sm text-stone-500 mb-4">{u.ctaText}</p>
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-sm font-medium btn-primary">
          {u.cta} &rarr;
        </Link>
      </section>

      <p className="text-center text-xs text-stone-400 mb-8">{u.disclaimer}</p>
    </div>
  );
}
