import type { Metadata } from "next";

type LayoutProps = { children: React.ReactNode; params: { locale: string } };

const SEO: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Free Chinese Zodiac Calculator — Find Your Animal Sign, Element & Compatibility",
    desc: "Enter your birth year to discover your Chinese zodiac sign, Wu Xing element, personality traits, lucky numbers, and compatible signs. Free instant result.",
    ogTitle: "Free Chinese Zodiac Calculator",
    ogDesc: "Discover your Chinese zodiac animal, element, personality traits, and compatibility. Free instant result.",
  },
  ru: {
    title: "Калькулятор Китайского Зодиака — Узнайте Свой Знак, Стихию и Совместимость",
    desc: "Введите год рождения и узнайте свой знак китайского зодиака, стихию, черты характера, счастливые числа и совместимые знаки. Бесплатный мгновенный результат.",
    ogTitle: "Калькулятор Китайского Зодиака",
    ogDesc: "Узнайте свой зодиакальный знак, стихию, характер и совместимость. Бесплатный мгновенный результат.",
  },
  ja: {
    title: "無料中国十二支計算機 — あなたの干支・五行・相性を知る",
    desc: "生まれた年を入力して、あなたの十二支、五行、性格の特徴、ラッキーナンバー、相性の良い干支を発見しましょう。無料で即座に結果を表示します。",
    ogTitle: "無料中国十二支計算機",
    ogDesc: "あなたの十二支、五行、性格の特徴、相性を発見。無料で即座に結果を表示。",
  },
  ko: {
    title: "무료 중국 십이지 계산기 — 당신의 띠, 오행, 궁합 알아보기",
    desc: "태어난 연도를 입력하여 십이지 동물, 오행, 성격 특성, 행운의 숫자, 궁합이 좋은 띠를 알아보세요. 무료 즉시 결과 제공.",
    ogTitle: "무료 중국 십이지 계산기",
    ogDesc: "당신의 십이지 동물, 오행, 성격 특성, 궁합을 알아보세요. 무료 즉시 결과.",
  },
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const seo = SEO[params.locale] || SEO.en;
  return {
    title: seo.title,
    description: seo.desc,
    openGraph: { title: seo.ogTitle, description: seo.ogDesc },
    robots: "index, follow",
  };
}

export default function ToolLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
