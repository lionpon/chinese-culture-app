import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";
import { BreadcrumbListSchema } from "@/components/JsonLd";

type Props = { params: { locale: string } };

const META: Record<string, Metadata> = {
  en: {
    title: "Free Dream Interpretation: What Does Your Dream Mean? Zhou Gong + Freud AI | Chinese Culture Studio",
    description: "Describe your dream — get instant analysis from Zhou Gong's 3,000-year Chinese dream dictionary + Freudian psychology. Snakes, water, teeth falling out, death decoded. Try free, unlock full reading for $1.",
    robots: "index, follow",
  },
  ru: {
    title: "Китайское толкование снов — Чжоу Гун + Фрейд AI анализ | Chinese Culture Studio",
    description: "Опишите свой сон и получите толкование с двух точек зрения: древний китайский сонник Чжоу Гуна и психоанализ Фрейда. С поддержкой ИИ, на русском и китайском.",
    robots: "index, follow",
  },
  ja: {
    title: "中国夢占い — 周公＋フロイト AI分析 | Chinese Culture Studio",
    description: "夢を記述すると、周公の古代中国夢辞典とフロイト精神分析を組み合わせた2つの視点からの解釈が得られます。AI搭載、中国語と日本語で。",
    robots: "index, follow",
  },
  ko: {
    title: "중국 꿈 해몽 — 주공 + 프로이트 AI 분석 | Chinese Culture Studio",
    description: "꿈을 설명하면 주공의 고대 중국 꿈 사전과 프로이트 정신분석을 결합한 이중 관점 해석을 받을 수 있습니다. AI 기반, 중국어와 한국어로.",
    robots: "index, follow",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = META[params.locale] || META.en;
  return {
    ...m,
    openGraph: {
      title: (m.title as string) || "Chinese Dream Interpretation",
      description: m.description ?? undefined,
    },
    alternates: {
      languages: {
        en: `${BASE_URL}/dream-interpretation`,
        ru: `${BASE_URL}/ru/dream-interpretation`,
        ja: `${BASE_URL}/ja/dream-interpretation`,
        ko: `${BASE_URL}/ko/dream-interpretation`,
      },
    },
  };
}

export default function DreamInterpretationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Chinese Culture Studio", url: BASE_URL },
          { name: "Dream Interpretation", url: `${BASE_URL}/dream-interpretation` },
        ]}
      />
      {children}
    </>
  );
}
