"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const STORAGE_KEY = "cc-cookie-consent";

export function getConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "accepted") return true;
  if (v === "declined") return false;
  return null;
}

export default function CookieConsent() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  function choose(accepted: boolean) {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t shadow-lg" style={{ backgroundColor: "rgba(26, 26, 46, 0.98)", backdropFilter: "blur(12px)", borderColor: "var(--border-medium)" }}>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>
        <p className="flex-1 leading-relaxed">
          {t("cookie.text")}{" "}
          <Link href="/privacy" className="underline" style={{ color: "var(--gold)" }}>{t("cookie.privacyLink")}</Link>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose(false)}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs border transition-colors"
            style={{ borderColor: "var(--border-medium)", color: "var(--text-muted)", backgroundColor: "var(--bg-surface)" }}
          >
            {t("cookie.essentialOnly")}
          </button>
          <button
            onClick={() => choose(true)}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs btn-primary"
          >
            {t("cookie.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
