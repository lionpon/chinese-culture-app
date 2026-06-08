import type { Metadata } from "next";
import { Link } from "@/navigation";
import { GROUPS } from "@/data/world-cup-2026";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

const UI: Record<string, { hero: string; subtitle: string; groupsLabel: string; cta: string; ctaText: string; disclaimer: string }> = {
  en: {
    hero: "I Ching x World Cup 2026",
    subtitle: "Ancient oracle meets modern football.",
    groupsLabel: "Groups",
    cta: "Try I Ching Divination",
    ctaText: "Ask the I Ching your own question.",
    disclaimer: "For entertainment only. The I Ching is a 3,000-year-old wisdom tradition, not a sports betting tool.",
  },
  ru: {
    hero: "И-Цзин x ЧМ-2026", subtitle: "Древний оракул встречает футбол.",
    groupsLabel: "Группы", cta: "Гадание И-Цзин", ctaText: "Задайте И-Цзин свой вопрос.",
    disclaimer: "Только для развлечения.",
  },
  ja: {
    hero: "易経 x 2026 W杯", subtitle: "古代のオラクルがサッカーと出会う。",
    groupsLabel: "グループ", cta: "易経占い", ctaText: "易経に質問してみてください。",
    disclaimer: "娯楽目的です。",
  },
  ko: {
    hero: "주역 x 2026 월드컵", subtitle: "고대 오라클이 축구를 만나다.",
    groupsLabel: "조", cta: "주역 점술", ctaText: "주역에게 질문해보세요.",
    disclaimer: "오락 목적입니다.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "I Ching World Cup 2026 Predictions | Chinese Culture Studio",
    description: "Ancient I Ching hexagram predictions for every 2026 FIFA World Cup match.",
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

export default function Page({ params }: Props) {
  const locale = params.locale;
  const u = UI[locale] || UI.en;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{ color: "var(--accent)" }}>{u.hero}</h1>
        <p className="text-sm text-stone-500">{u.subtitle}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{u.groupsLabel}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GROUPS.map((g) => (
            <div key={g.name} className="card-classic p-3">
              <div className="text-sm font-semibold text-stone-700 mb-2">Group {g.name}</div>
              {g.teams.map((t) => <div key={t} className="text-xs text-stone-600">{t}</div>)}
            </div>
          ))}
        </div>
      </section>

      <section className="card-classic p-5 text-center mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-2">{u.cta}</h2>
        <p className="text-sm text-stone-500 mb-4">{u.ctaText}</p>
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-sm font-medium btn-primary">
          {u.cta} &rarr;
        </Link>
      </section>

      <p className="text-center text-xs text-stone-400">{u.disclaimer}</p>
    </div>
  );
}
