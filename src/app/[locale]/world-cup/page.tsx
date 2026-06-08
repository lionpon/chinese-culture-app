import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "World Cup I Ching",
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

export default function Page() {
  return <div>World Cup page works</div>;
}
