"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function NavMenu() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 -mr-2 transition-colors"
        style={{ color: "var(--text-muted)" }}
        aria-label={t("toggleMenu")}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-14 left-0 right-0 border-b shadow-lg" style={{ backgroundColor: "rgba(26, 26, 46, 0.98)", backdropFilter: "blur(12px)", borderColor: "var(--border-subtle)" }}>
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/world-cup" className="text-sm font-semibold py-1" style={{ color: "var(--vermilion)" }} onClick={() => setOpen(false)}>
              ⚽ World Cup
            </Link>
            <Link href="/naming" className="text-sm py-1" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>
              {t("nav.createName")}
            </Link>
            <Link href="/calendar" className="text-sm py-1" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>
              {t("nav.dateSelection")}
            </Link>
            <Link href="/divination" className="text-sm py-1" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>
              {t("nav.ichingDivination")}
            </Link>
            <Link href="/palm-reading" className="text-sm py-1" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>
              {t("nav.palmMenu")}
            </Link>
            <Link href="/dream-interpretation" className="text-sm py-1" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>
              {t("nav.dreamMenu")}
            </Link>
            <div className="pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
