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
        <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--gold)" }}>{displayCountries}+</div>
        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t("trust.countries")}</div>
      </div>
      <div className="w-px" style={{ backgroundColor: "var(--border-medium)" }} />
      <div>
        <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--gold)" }}>{displayReadings}+</div>
        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t("trust.readings")}</div>
      </div>
      <div className="w-px hidden sm:block" style={{ backgroundColor: "var(--border-medium)" }} />
      <div className="hidden sm:block">
        <div className="text-xl sm:text-2xl font-bold" style={{ color: "var(--gold)" }}>{t("trust.free")}</div>
        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t("trust.freeLabel")}</div>
      </div>
    </div>
  );
}
