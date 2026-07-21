"use client";

import { useTranslations } from "next-intl";

export default function TrustSignals() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 py-6 text-center">
      <div className="flex items-center gap-1.5">
        <span className="text-sm">&#x2705;</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{t("trust.item1")}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">&#x26A1;</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{t("trust.item2")}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">&#x1F512;</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{t("trust.item3")}</span>
      </div>
    </div>
  );
}
