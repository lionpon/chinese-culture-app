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
  predictionLabel: string; hexagramLabel: string; judgmentLabel: string;
  footballWisdom: string; noMatches: string; groupLabel: string;
  stageLabel: string; vs: string; cta: string; ctaText: string;
  disclaimer: string; groupsLabel: string;
}> = {
  en: {
    title: "I Ching World Cup 2026 Predictions — AI Oracle Match Forecast | Chinese Culture Studio",
    desc: "Ancient I Ching (Book of Changes) hexagram predictions for every 2026 FIFA World Cup match. 48 teams, 104 matches — see what the oracle says about the outcome before kick-off.",
    ogTitle: "I Ching World Cup 2026 Predictions",
    ogDesc: "Ancient Chinese oracle meets modern football. Hexagram predictions for every 2026 World Cup match — group stage through the final.",
    hero: "I Ching × World Cup 2026",
    subtitle: "The 3,000-year-old Book of Changes meets the world's biggest tournament. Every match, one hexagram. Will the oracle see what's coming?",
    intro: "Below are I Ching hexagram-based predictions for every match of the 2026 FIFA World Cup (June 11 – July 19). Each prediction is deterministically generated from the match date and teams — the same match always yields the same hexagram. Take it as ancient wisdom in a football shirt.",
    todayLabel: "Today's Predictions",
    upcomingLabel: "Upcoming Matches",
    fullScheduleLabel: "Full Schedule",
    predictionLabel: "I Ching Prediction",
    hexagramLabel: "Hexagram",
    judgmentLabel: "Judgment",
    footballWisdom: "Football Wisdom",
    noMatches: "No matches scheduled for this date.",
    groupLabel: "Group",
    stageLabel: "Stage",
    vs: "vs",
    cta: "Try I Ching Divination",
    ctaText: "Ask the I Ching your own question — about football or anything else.",
    disclaimer: "For entertainment only. The I Ching is a 3,000-year-old wisdom tradition, not a sports betting tool. Predictions are deterministic and based on match metadata.",
    groupsLabel: "Groups",
  },
  ru: {
    title: "И-Цзин Чемпионат Мира 2026 Прогнозы — Оракул на Матчи | Chinese Culture Studio",
    desc: "Древние предсказания И-Цзин (Книги Перемен) для каждого матча ЧМ-2026. 48 команд, 104 матча — узнайте, что говорит оракул об исходе до свистка.",
    ogTitle: "И-Цзин Прогнозы на ЧМ-2026",
    ogDesc: "Древний китайский оракул встречает современный футбол. Прогнозы по гексаграммам для каждого матча ЧМ-2026.",
    hero: "И-Цзин × ЧМ-2026",
    subtitle: "3000-летняя Книга Перемен встречает крупнейший турнир мира. Каждый матч — одна гексаграмма. Увидит ли оракул, что грядёт?",
    intro: "Ниже — прогнозы на основе гексаграмм И-Цзин для каждого матча ЧМ-2026 (11 июня – 19 июля). Каждое предсказание детерминировано генерируется из даты матча и команд — один и тот же матч всегда даёт одну и ту же гексаграмму. Воспринимайте как древнюю мудрость в футбольной форме.",
    todayLabel: "Прогнозы на Сегодня",
    upcomingLabel: "Предстоящие Матчи",
    fullScheduleLabel: "Полное Расписание",
    predictionLabel: "Прогноз И-Цзин",
    hexagramLabel: "Гексаграмма",
    judgmentLabel: "Суждение",
    footballWisdom: "Футбольная Мудрость",
    noMatches: "На эту дату матчей нет.",
    groupLabel: "Группа",
    stageLabel: "Этап",
    vs: "—",
    cta: "Попробовать И-Цзин Гадание",
    ctaText: "Задайте И-Цзин свой вопрос — о футболе или о чём угодно.",
    disclaimer: "Только для развлечения. И-Цзин — 3000-летняя традиция мудрости, а не инструмент для ставок.",
    groupsLabel: "Группы",
  },
  ja: {
    title: "易経 2026年W杯 勝敗予想 — 64卦オラクル マッチ予測 | Chinese Culture Studio",
    desc: "古代の易経（易）を用いた2026年FIFAワールドカップ全104試合の卦予測。48チーム、グループステージから決勝まで、オラクルが示す試合の行方。",
    ogTitle: "易経 2026年W杯 勝敗予想",
    ogDesc: "古代中国のオラクルが現代サッカーと出会う。2026年W杯全試合の八卦予測。",
    hero: "易経 × 2026 W杯",
    subtitle: "3000年の歴史を持つ易経が世界最大のトーナメントと出会う。全試合に一卦ずつ。オラクルは未来を見通せるか？",
    intro: "以下は2026年FIFAワールドカップ（6月11日〜7月19日）の全試合に対する易経八卦予測です。各予測は試合日と対戦チームから決定論的に生成され、同じ試合には常に同じ卦が現れます。古代の知恵がサッカーのユニフォームを着たと思ってお楽しみください。",
    todayLabel: "本日の予想",
    upcomingLabel: "今後の試合",
    fullScheduleLabel: "全スケジュール",
    predictionLabel: "易経予測",
    hexagramLabel: "卦",
    judgmentLabel: "判断",
    footballWisdom: "サッカー的知恵",
    noMatches: "この日に試合は予定されていません。",
    groupLabel: "グループ",
    stageLabel: "ステージ",
    vs: "vs",
    cta: "易経占いを試す",
    ctaText: "サッカーでも何でも、易経にあなた自身の質問をしてみてください。",
    disclaimer: "娯楽目的です。易経は3000年の知恵の伝統であり、スポーツ賭博ツールではありません。",
    groupsLabel: "グループ",
  },
  ko: {
    title: "주역 2026 월드컵 예측 — 64괘 오라클 매치 전망 | Chinese Culture Studio",
    desc: "고대 주역(역경)을 통한 2026 FIFA 월드컵 전 104경기 괘 예측. 48개국, 그룹 스테이지부터 결승까지 — 오라클이 말해주는 경기 결과.",
    ogTitle: "주역 2026 월드컵 예측",
    ogDesc: "고대 중국의 오라클이 현대 축구를 만나다. 2026 월드컵 전 경기 주역 예측.",
    hero: "주역 × 2026 월드컵",
    subtitle: "3,000년 된 역경이 세계 최대의 토너먼트를 만납니다. 모든 경기에 하나의 괘. 오라클이 미래를 볼 수 있을까요?",
    intro: "아래는 2026 FIFA 월드컵(6월 11일~7월 19일)의 모든 경기에 대한 주역 괘 예측입니다. 각 예측은 경기 날짜와 팀에서 결정론적으로 생성됩니다 — 같은 경기는 항상 같은 괘를 얻습니다. 축구 유니폼을 입은 고대의 지혜로 즐겨주세요.",
    todayLabel: "오늘의 예측",
    upcomingLabel: "예정된 경기",
    fullScheduleLabel: "전체 일정",
    predictionLabel: "주역 예측",
    hexagramLabel: "괘",
    judgmentLabel: "판단",
    footballWisdom: "축구적 지혜",
    noMatches: "이 날짜에 예정된 경기가 없습니다.",
    groupLabel: "그룹",
    stageLabel: "스테이지",
    vs: "vs",
    cta: "주역 점술 시도하기",
    ctaText: "축구든 무엇이든, 주역에게 직접 질문해보세요.",
    disclaimer: "오락 목적으로만 제공됩니다. 주역은 3,000년 된 지혜의 전통이지 스포츠 베팅 도구가 아닙니다.",
    groupsLabel: "조",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = UI[params.locale] || UI.en;
  return {
    title: u.title,
    description: u.desc,
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
  const u = UI[locale] || UI.en;
  return (
    <div className="card-classic p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-stone-700">
          {p.match.home} <span className="text-stone-400 text-xs">{u.vs}</span> {p.match.away}
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">{getStageName(p.match.stage, locale)}</span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: "var(--accent)", color: "white", fontSize: "1.1rem" }}>
          {p.hexagram.id}
        </div>
        <div>
          <div className="text-sm font-medium" style={{ color: "var(--accent)" }}>{p.hexagram.nameEn}</div>
          <div className="text-xs text-stone-400">{p.hexagram.nameZh} · {p.hexagram.pinyin}</div>
        </div>
      </div>
      <p className="text-xs text-stone-500 italic mb-2">&ldquo;{p.hexagram.judgmentEn}&rdquo;</p>
      <p className="text-xs text-stone-600 leading-relaxed">{p.footballInterpretation}</p>
    </div>
  );
}

function GroupTable({ group, locale }: { group: typeof GROUPS[0]; locale: string }) {
  const u = UI[locale] || UI.en;
  return (
    <div className="card-classic p-3 sm:p-4">
      <div className="text-sm font-semibold text-stone-700 mb-2">{u.groupLabel} {group.name}</div>
      <div className="space-y-1">
        {group.teams.map((team) => (
          <div key={team} className="text-xs text-stone-600">{team}</div>
        ))}
      </div>
    </div>
  );
}

export default function WorldCupPage({ params }: Props) {
  const u = UI[params.locale] || UI.en;
  const locale = params.locale;

  const today = new Date().toISOString().slice(0, 10);
  const todayMatches = getMatchesByDate(today).filter(m => m.home !== "TBD");
  const todayPredictions = todayMatches.map(predictMatch);

  const upcoming = MATCHES.filter(m => m.date >= today && m.home !== "TBD").slice(0, 20);
  const upcomingPredictions = upcoming.map(predictMatch);

  // Group matches by date for full schedule
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
      {/* Hero */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{ color: "var(--accent)" }}>{u.hero}</h1>
        <p className="text-sm sm:text-base text-stone-500 max-w-2xl mx-auto leading-relaxed">{u.subtitle}</p>
        <p className="text-xs text-stone-400 mt-4 max-w-xl mx-auto">{u.intro}</p>
      </div>

      {/* Today's Predictions */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">
          {u.todayLabel} — {today}
        </h2>
        {todayPredictions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {todayPredictions.map((p) => (
              <PredictionCard key={p.match.id} p={p} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="card-classic p-6 text-center text-sm text-stone-400">
            {u.noMatches} {u.cta && (
              <Link href="/divination" className="ml-1 underline" style={{ color: "var(--accent)" }}>{u.cta}</Link>
            )}
          </div>
        )}
      </section>

      {/* Groups Overview */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.groupsLabel}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GROUPS.map((g) => (
            <GroupTable key={g.name} group={g} locale={locale} />
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.upcomingLabel}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcomingPredictions.map((p) => (
            <PredictionCard key={p.match.id} p={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* Full Schedule */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.fullScheduleLabel}</h2>
        {dateEntries.map(([date, matches]) => {
          const predictions = matches.map(predictMatch);
          return (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-stone-500 mb-3 sticky top-14 bg-stone-50 py-1">{date}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {predictions.map((p) => (
                  <PredictionCard key={p.match.id} p={p} locale={locale} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="card-classic p-5 sm:p-8 text-center mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-2">{u.cta}</h2>
        <p className="text-sm text-stone-500 mb-4">{u.ctaText}</p>
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-sm font-medium btn-primary">
          {u.cta} →
        </Link>
      </section>

      {/* Disclaimer */}
      <p className="text-center text-xs text-stone-400 mb-8">{u.disclaimer}</p>
    </div>
  );
}
