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

  // Always show — even with zeros we display "100+" as default social proof
  const displayCountries = stats?.countries || 6;
  const displayReadings = stats?.readings || 3;

  return (
    <div className="flex justify-center gap-6 sm:gap-10 py-6 text-center">
      <div>
        <div className="text-xl sm:text-2xl font-bold text-accent">{displayCountries}+</div>
        <div className="text-xs text-stone-400 mt-1">{t("trust.countries")}</div>
      </div>
      <div className="w-px bg-stone-200" />
      <div>
        <div className="text-xl sm:text-2xl font-bold text-accent">{displayReadings}+</div>
        <div className="text-xs text-stone-400 mt-1">{t("trust.readings")}</div>
      </div>
      <div className="w-px bg-stone-200 hidden sm:block" />
      <div className="hidden sm:block">
        <div className="text-xl sm:text-2xl font-bold text-accent">{t("trust.free")}</div>
        <div className="text-xs text-stone-400 mt-1">{t("trust.freeLabel")}</div>
      </div>
    </div>
  );
}
