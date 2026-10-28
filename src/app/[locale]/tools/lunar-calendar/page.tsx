import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LunarConverterTool from "@/components/LunarConverterTool";
import { Link } from "@/navigation";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tools" });
  const titles: Record<string, string> = {
    en: "Chinese Lunar Calendar Converter 2024-2030 | Chinese Culture Studio",
    ru: "Конвертер китайского лунного календаря | Chinese Culture Studio",
    ja: "旧暦カレンダー変換ツール | Chinese Culture Studio",
  };
  return {
    title: titles[params.locale] || titles.en,
    description: t("lunarConverter.pageIntro"),
    robots: "index, follow",
  };
}

export default function LunarCalendarPage() {
  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <LunarConverterIntro />
      <LunarConverterTool />
      <RelatedLinks />
    </div>
  );
}

import { useTranslations } from "next-intl";

function LunarConverterIntro() {
  const t = useTranslations("tools");
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">🌙 {t("lunarConverter.title")}</h1>
      <p className="text-stone-500 text-sm leading-relaxed max-w-xl mx-auto">
        {t("lunarConverter.pageIntro")}
      </p>
    </div>
  );
}

function RelatedLinks() {
  const t = useTranslations("tools");
  return (
    <div className="not-prose my-8">
      <p className="text-sm font-semibold mb-2">{t("lunarConverter.relatedTitle")}</p>
      <ul className="space-y-2 text-sm list-disc list-inside">
        <li><Link href="/guide/chinese-new-year-2027">{t("lunarConverter.relatedCny")}</Link></li>
        <li><Link href="/guide/auspicious-dates">{t("lunarConverter.relatedDates")}</Link></li>
        <li><Link href="/calendar">{t("lunarConverter.relatedCalendar")}</Link></li>
      </ul>
    </div>
  );
}
