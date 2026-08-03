import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";
import { snakeYear, zodiacPredictions, zodiacAnimals } from "@/data/snake-2027";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import GuideCTA from "@/components/GuideCTA";

type Locale = "en" | "ru" | "ja" | "ko";

const zodiacNamesRu: Record<string, string> = { rat:"Крыса",ox:"Бык",tiger:"Тигр",rabbit:"Кролик",dragon:"Дракон",snake:"Змея",horse:"Лошадь",goat:"Коза",monkey:"Обезьяна",rooster:"Петух",dog:"Собака",pig:"Свинья" };
const zodiacNamesJa: Record<string, string> = { rat:"子",ox:"丑",tiger:"寅",rabbit:"卯",dragon:"辰",snake:"巳",horse:"午",goat:"未",monkey:"申",rooster:"酉",dog:"戌",pig:"亥" };
const zodiacNamesKo: Record<string, string> = { rat:"쥐",ox:"소",tiger:"호랑이",rabbit:"토끼",dragon:"용",snake:"뱀",horse:"말",goat:"양",monkey:"원숭이",rooster:"닭",dog:"개",pig:"돼지" };

const labels: Record<Locale, Record<string, string>> = {
  en: { career:"Career", love:"Love", health:"Health", wealth:"Wealth", luckyColor:"Lucky Colors", luckyNumber:"Lucky Numbers", compatible:"Most Compatible", avoid:"Watch Out For", summary:"Summary", ranking:"of 12 · Overall Rank", titleSuffix:"Snake Year 2027 Fortune" },
  ru: { career:"Карьера", love:"Любовь", health:"Здоровье", wealth:"Богатство", luckyColor:"Счастливые цвета", luckyNumber:"Счастливые числа", compatible:"Совместимость", avoid:"Осторожно", summary:"Итог", ranking:"из 12 · Общий рейтинг", titleSuffix:"Год Змеи 2027 Гороскоп" },
  ja: { career:"仕事運", love:"恋愛運", health:"健康運", wealth:"金運", luckyColor:"ラッキーカラー", luckyNumber:"ラッキーナンバー", compatible:"相性の良い干支", avoid:"注意すべき干支", summary:"総評", ranking:"位 / 12 · 総合ランキング", titleSuffix:"2027年巳年 運勢" },
  ko: { career:"직업운", love:"연애운", health:"건강운", wealth:"재물운", luckyColor:"행운의 색상", luckyNumber:"행운의 숫자", compatible:"잘 맞는 띠", avoid:"주의할 띠", summary:"요약", ranking:"위 / 12 · 종합 순위", titleSuffix:"2027년 뱀의 해 운세" },
};

interface Props {
  params: Promise<{ locale: Locale; animal: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, animal } = await params;
  const l = (["en","ru","ja","ko"] as Locale[]).includes(locale) ? locale : "en";
  const pred = zodiacPredictions[animal];
  if (!pred) return { title: "Not Found" };

  const nameMap: Record<string, Record<string,string>> = { ru: zodiacNamesRu, ja: zodiacNamesJa, ko: zodiacNamesKo };
  const name = nameMap[l]?.[animal] || pred.animal;

  return {
    title: `${name} — ${labels[l].titleSuffix}`,
    description: `${pred.summary} · Career: ${pred.career.slice(0,80)}... · Lucky: ${pred.luckyColor}`,
    alternates: {
      languages: {
        en: `/snake-2027/${animal}`,
        ru: `/ru/snake-2027/${animal}`,
        ja: `/ja/snake-2027/${animal}`,
        ko: `/ko/snake-2027/${animal}`,
      },
    },
  };
}

export default async function AnimalPage({ params }: Props) {
  const { locale, animal } = await params;
  const l = (["en","ru","ja","ko"] as Locale[]).includes(locale) ? locale : "en";
  const pred = zodiacPredictions[animal];
  if (!pred) notFound();

  const la = labels[l];
  const nameMap: Record<string, Record<string,string>> = { ru: zodiacNamesRu, ja: zodiacNamesJa, ko: zodiacNamesKo };
  const animalName = nameMap[l]?.[animal] || pred.animal;

  const prevIdx = zodiacAnimals.findIndex(a => a.key === animal) - 1;
  const nextIdx = zodiacAnimals.findIndex(a => a.key === animal) + 1;
  const prevAnimal = prevIdx >= 0 ? zodiacAnimals[prevIdx] : null;
  const nextAnimal = nextIdx < zodiacAnimals.length ? zodiacAnimals[nextIdx] : null;

  return (
    <div className="max-w-2xl mx-auto">
      <AnalyticsTracker />

      {/* Back link */}
      <div className="mb-4">
        <Link href="/snake-2027" className="text-xs guide-link">
          ← {l === "ru" ? "Назад к обзору" : l === "ja" ? "概要に戻る" : l === "ko" ? "개요로 돌아가기" : "Back to Overview"}
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">{pred.animalZh}</div>
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          {animalName} — {snakeYear.yearTitle[l]}
        </h1>
        <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>
          #{pred.ranking} {la.ranking}
        </div>
      </div>

      {/* Summary */}
      <div className="card-classic p-5 mb-6 text-center">
        <p className="text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>{pred.summary}</p>
      </div>

      {/* Fortune grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {(["career","love","health","wealth"] as const).map(cat => (
          <div key={cat} className="card-classic p-4">
            <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--gold)" }}>{la[cat]}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{pred[cat]}</p>
          </div>
        ))}
      </div>

      {/* Contextual mid-content CTA — "answer first, story paid" strategy */}
      <div className="mb-8">
        <Link
          href="/naming"
          className="block card-classic p-4 sm:p-5 transition-all hover:shadow-md group"
          style={{ borderColor: "var(--border-strong)", background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02))" }}
          onClick={() => {
            if (typeof window !== "undefined") {
              fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page: window.location.pathname, event: "snake_mid_cta_naming" }) }).catch(() => {});
            }
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">🖋</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold group-hover:text-accent transition-colors" style={{ color: "var(--text-primary)" }}>
                {l === "ru" ? "Ваш знак рассказал о судьбе. Узнайте, какое имя она вам приготовила." :
                 l === "ja" ? "干支が運命を語りました。その運命があなたに用意した名前を見つけましょう。" :
                 l === "ko" ? "띠가 운명을 말했습니다. 그 운명이 당신을 위해 준비한 이름을 찾아보세요." :
                 `Your ${animalName} forecast reveals the energy around you. Want to see what name the Five Elements would give someone born under your sign?`}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {l === "ru" ? "30 секунд · от $5.99" :
                 l === "ja" ? "30秒 · $5.99から" :
                 l === "ko" ? "30초 · $5.99부터" :
                 "Takes 30 seconds · from $5.99"}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "var(--accent)" }}>
              {l === "ru" ? "Создать имя →" :
               l === "ja" ? "名前を作成 →" :
               l === "ko" ? "이름 만들기 →" :
               "Get My Name →"}
            </span>
          </div>
        </Link>
      </div>

      {/* Lucky info bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 text-center">
        <div className="px-4 py-2">
          <div className="text-xs mb-0.5" style={{ color: "var(--text-dim)" }}>{la.luckyColor}</div>
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{pred.luckyColor}</div>
        </div>
        <div style={{ borderLeft: "1px solid var(--border-medium)" }} />
        <div className="px-4 py-2">
          <div className="text-xs mb-0.5" style={{ color: "var(--text-dim)" }}>{la.luckyNumber}</div>
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{pred.luckyNumber}</div>
        </div>
        <div style={{ borderLeft: "1px solid var(--border-medium)" }} />
        <div className="px-4 py-2">
          <div className="text-xs mb-0.5" style={{ color: "var(--text-dim)" }}>{la.compatible}</div>
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{pred.compatible}</div>
        </div>
        <div style={{ borderLeft: "1px solid var(--border-medium)" }} />
        <div className="px-4 py-2">
          <div className="text-xs mb-0.5" style={{ color: "var(--text-dim)" }}>{la.avoid}</div>
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{pred.avoid}</div>
        </div>
      </div>

      {/* CTA */}
      <div className="mb-8">
        <GuideCTA service="naming" href="/naming" />
      </div>

      {/* Prev/Next navigation */}
      <div className="flex justify-between mb-8">
        {prevAnimal ? (
          <Link href={`/snake-2027/${prevAnimal.key}`} className="text-sm guide-link">
            ← {l === "ru" ? zodiacNamesRu[prevAnimal.key] : l === "ja" ? zodiacNamesJa[prevAnimal.key] : l === "ko" ? zodiacNamesKo[prevAnimal.key] : prevAnimal.nameEn}
          </Link>
        ) : <div />}
        <Link href="/snake-2027" className="text-sm guide-link">
          {l === "ru" ? "Все знаки" : l === "ja" ? "全干支" : l === "ko" ? "전체 보기" : "All Animals"}
        </Link>
        {nextAnimal ? (
          <Link href={`/snake-2027/${nextAnimal.key}`} className="text-sm guide-link">
            {l === "ru" ? zodiacNamesRu[nextAnimal.key] : l === "ja" ? zodiacNamesJa[nextAnimal.key] : l === "ko" ? zodiacNamesKo[nextAnimal.key] : nextAnimal.nameEn} →
          </Link>
        ) : <div />}
      </div>

      <section className="text-center">
        <p className="text-xs" style={{ color: "var(--text-dim)" }}>
          {l === "ru" ? "Только для культурного ознакомления." :
           l === "ja" ? "文化的鑑賞のみを目的としています。" :
           l === "ko" ? "문화적 감상을 위한 것입니다." :
           "For cultural appreciation only. Not professional advice."}
        </p>
      </section>
    </div>
  );
}
