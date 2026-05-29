"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

interface DailyData {
  mainHexagram: {
    nameZh: string;
    nameEn: string;
    pinyin: string;
    advice: string;
  };
}

export default function DailyHexagram() {
  const t = useTranslations("home");
  const [data, setData] = useState<DailyData | null>(null);

  useEffect(() => {
    fetch("/api/daily")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const { mainHexagram } = data;
  const teaser =
    mainHexagram.advice.length > 160
      ? mainHexagram.advice.slice(0, 157).replace(/\s+\S*$/, "") + "…"
      : mainHexagram.advice;

  return (
    <section className="max-w-lg mx-auto mb-12">
      <p className="text-center text-xs font-medium tracking-wide uppercase mb-4 text-gold">
        {t("dailyHexagram.heading")}
      </p>
      <div className="card-classic p-4 sm:p-6 text-center">
        <p className="text-2xl sm:text-3xl font-bold mb-1 text-accent">
          {mainHexagram.nameZh}
        </p>
        <p className="text-sm text-stone-500 mb-4">
          {mainHexagram.pinyin} — {mainHexagram.nameEn}
        </p>
        <p className="text-sm text-stone-600 leading-relaxed mb-5 max-w-md mx-auto">
          {teaser}
        </p>
        <Link
          href="/divination"
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary"
        >
          {t("dailyHexagram.cta")}
        </Link>
        <p className="text-xs text-stone-400 mt-3">
          {t("dailyHexagram.helper")}
        </p>
      </div>
    </section>
  );
}
