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
        className="p-2 -mr-2 text-stone-500 hover:text-stone-800 transition-colors"
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
        <div className="absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/world-cup" className="text-sm font-semibold py-1" style={{ color: "var(--accent)" }} onClick={() => setOpen(false)}>
              ⚽ World Cup
            </Link>
            <Link href="/naming" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              {t("nav.createName")}
            </Link>
            <Link href="/calendar" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              {t("nav.dateSelection")}
            </Link>
            <Link href="/divination" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              {t("nav.ichingDivination")}
            </Link>
            <Link href="/palm-reading" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              {t("nav.palmMenu")}
            </Link>
            <Link href="/dream-interpretation" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              {t("nav.dreamMenu")}
            </Link>
            <div className="pt-2 border-t border-stone-100">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
