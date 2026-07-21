import type { Metadata } from "next";
import { Link } from "@/navigation";
import { snakeYear, zodiacAnimals } from "@/data/snake-2027";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import GuideCTA from "@/components/GuideCTA";

type Locale = "en" | "ru" | "ja" | "ko";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = (["en","ru","ja","ko"] as Locale[]).includes(locale) ? locale : "en";
  return {
    title: `${snakeYear.yearTitle[l]} — ${snakeYear.yearSubtitle[l]}`,
    description: snakeYear.seoDescription[l],
    alternates: {
      languages: {
        en: "/snake-2027",
        ru: "/ru/snake-2027",
        ja: "/ja/snake-2027",
        ko: "/ko/snake-2027",
      },
    },
  };
}

export default async function Snake2027Page({ params }: Props) {
  const { locale } = await params;
  const l = (["en","ru","ja","ko"] as Locale[]).includes(locale) ? locale : "en";
  return (
    <div className="max-w-4xl mx-auto">
      <AnalyticsTracker />

      {/* Hero */}
      <section className="text-center py-10 sm:py-16">
        <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {snakeYear.yearTitle[l]}
        </h1>
        <p className="text-sm sm:text-base mb-2" style={{ color: "var(--gold)" }}>
          {snakeYear.element[l]} · {snakeYear.yearSubtitle[l]}
        </p>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {snakeYear.overview[l]}
        </p>
      </section>

      {/* Zodiac Grid */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-center mb-6" style={{ color: "var(--text-primary)" }}>
          {l === "ru" ? "Выберите ваш знак зодиака" : l === "ja" ? "あなたの干支を選んでください" : l === "ko" ? "당신의 띠를 선택하세요" : "Choose Your Zodiac Animal"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {zodiacAnimals.map(({ key, nameEn, nameZh }) => (
            <Link
              key={key}
              href={`/snake-2027/${key}`}
              className="card-classic p-4 text-center transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              <div className="text-3xl mb-1">{nameZh}</div>
              <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                {l === "ru" ?
                  {rat:"Крыса",ox:"Бык",tiger:"Тигр",rabbit:"Кролик",dragon:"Дракон",snake:"Змея",horse:"Лошадь",goat:"Коза",monkey:"Обезьяна",rooster:"Петух",dog:"Собака",pig:"Свинья"}[key]
                : l === "ja" ?
                  {rat:"子",ox:"丑",tiger:"寅",rabbit:"卯",dragon:"辰",snake:"巳",horse:"午",goat:"未",monkey:"申",rooster:"酉",dog:"戌",pig:"亥"}[key]
                : l === "ko" ?
                  {rat:"쥐",ox:"소",tiger:"호랑이",rabbit:"토끼",dragon:"용",snake:"뱀",horse:"말",goat:"양",monkey:"원숭이",rooster:"닭",dog:"개",pig:"돼지"}[key]
                : nameEn}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mb-12">
        <GuideCTA
          type="naming"
          title={
            l === "ru" ? "Получите китайское имя на год Змеи" :
            l === "ja" ? "巳年のあなたの中国名を手に入れよう" :
            l === "ko" ? "뱀의 해 당신의 중국식 이름을 받아보세요" :
            "Get Your Snake Year Chinese Name"
          }
          desc={
            l === "ru" ? "Персонализированное имя на основе Ба-цзы и Пяти Элементов" :
            l === "ja" ? "八字と五行に基づくあなただけの中国名" :
            l === "ko" ? "사주와 오행에 기반한 개인 맞춤 중국식 이름" :
            "Personalized name based on your Bazi and Five Elements"
          }
        />
      </div>

      <section className="text-center mb-12">
        <p className="text-xs" style={{ color: "var(--text-dim)" }}>
          {l === "ru" ? "Только для культурного ознакомления. Не профессиональная консультация." :
           l === "ja" ? "文化的鑑賞のみを目的としています。専門的なアドバイスではありません。" :
           l === "ko" ? "문화적 감상을 위한 것입니다. 전문적인 조언이 아닙니다." :
           "For cultural appreciation only. Not professional advice."}
        </p>
      </section>
    </div>
  );
}
