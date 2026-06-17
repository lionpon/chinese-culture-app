"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import SpeakButton from "./SpeakButton";
import { trackClick } from "@/lib/track";

interface DailyData {
  mainHexagram: {
    nameZh: string;
    nameEn: string;
    nameJa?: string;
    nameRu?: string;
    pinyin: string;
    advice: string;
    adviceJa?: string;
    adviceRu?: string;
  };
}

export default function DailyHexagram() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [data, setData] = useState<DailyData | null>(null);

  useEffect(() => {
    fetch(`/api/daily?_=${new Date().toISOString().slice(0, 10)}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const { mainHexagram } = data;
  const localizedAdvice =
    locale === "ja" || locale === "ko" ? mainHexagram.adviceJa
    : locale === "ru" ? mainHexagram.adviceRu
    : mainHexagram.advice;
  const advice = localizedAdvice || mainHexagram.advice;
  const teaser =
    advice.length > 160
      ? advice.slice(0, 157).replace(/\s+\S*$/, "") + "…"
      : advice;

  const localizedName =
    locale === "ja" || locale === "ko" ? mainHexagram.nameJa
    : locale === "ru" ? mainHexagram.nameRu
    : mainHexagram.nameEn;

  return (
    <section className="max-w-lg mx-auto mb-12">
      <p className="text-center text-xs font-medium tracking-wide uppercase mb-4 text-gold">
        {t("dailyHexagram.heading")}
      </p>
      <div className="card-classic p-4 sm:p-6 text-center">
        <p className="text-2xl sm:text-3xl font-bold mb-1 text-accent">
          {mainHexagram.nameZh}
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <p className="text-sm text-stone-500">
            {mainHexagram.pinyin} — {localizedName}
          </p>
          <SpeakButton text={mainHexagram.nameZh} />
        </div>
        <p className="text-sm text-stone-600 leading-relaxed mb-5 max-w-md mx-auto">
          {teaser}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href={`/daily/${new Date().toISOString().slice(0, 10)}`}
            onClick={() => trackClick("daily_cta")}
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary"
          >
            {t("dailyHexagram.cta")}
          </Link>
          <Link
            href="/divination"
            onClick={() => trackClick("daily_divination_link")}
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
          >
            {t("dailyHexagram.askOwn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
