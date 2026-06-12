import type { Metadata } from "next";

type LayoutProps = { children: React.ReactNode; params: { locale: string } };

const SEO: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Free Five Elements Personality Test — Discover Your Wu Xing Element",
    desc: "Take this quick quiz to discover which Chinese Five Elements type you are — Wood, Fire, Earth, Metal, or Water. Learn your personality traits, career path, and elemental compatibility.",
    ogTitle: "Free Five Elements Personality Test",
    ogDesc: "Discover your Wu Xing element type — Wood, Fire, Earth, Metal, or Water. Free personality quiz.",
  },
  ru: {
    title: "Тест Пяти Элементов — Узнайте Свой Элемент У-Син",
    desc: "Пройдите быстрый тест, чтобы узнать, какой вы элемент китайской философии — Дерево, Огонь, Земля, Металл или Вода. Узнайте свой характер, карьерный путь и совместимость стихий.",
    ogTitle: "Тест Пяти Элементов",
    ogDesc: "Узнайте свой элемент У-Син — Дерево, Огонь, Земля, Металл или Вода. Бесплатный тест личности.",
  },
  ja: {
    title: "無料五行パーソナリティ診断 — あなたの五行を見つけよう",
    desc: "簡単な質問に答えて、あなたが五行（木・火・土・金・水）のどのタイプかを見つけましょう。性格、キャリアの方向性、元素の相性を学びます。",
    ogTitle: "無料五行パーソナリティ診断",
    ogDesc: "あなたの五行タイプ — 木・火・土・金・水 を見つけましょう。無料の性格診断テスト。",
  },
  ko: {
    title: "무료 오행 성격 테스트 — 당신의 오행 요소를 발견하세요",
    desc: "간단한 질문에 답하여 당신이 오행(목, 화, 토, 금, 수) 중 어떤 타입인지 알아보세요. 성격 특성, 진로 방향, 요소 궁합을 확인할 수 있습니다.",
    ogTitle: "무료 오행 성격 테스트",
    ogDesc: "당신의 오행 타입 — 목, 화, 토, 금, 수 를 알아보세요. 무료 성격 퀴즈.",
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
