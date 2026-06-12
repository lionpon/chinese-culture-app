"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function TrustSignals() {
  const t = useTranslations("home");
  const [stats, setStats] = useState<{ countries: number; readings: number } | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats || (stats.countries === 0 && stats.readings === 0)) return null;

  return (
    <div className="flex justify-center gap-6 sm:gap-10 py-6 text-center">
      <div>
        <div className="text-xl sm:text-2xl font-bold text-accent">{stats.countries}+</div>
        <div className="text-xs text-stone-400 mt-1">{t("trust.countries")}</div>
      </div>
      <div className="w-px bg-stone-200" />
      <div>
        <div className="text-xl sm:text-2xl font-bold text-accent">{stats.readings}+</div>
        <div className="text-xs text-stone-400 mt-1">{t("trust.readings")}</div>
      </div>
    </div>
  );
}
