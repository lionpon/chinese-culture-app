"use client";

import { useTranslations } from "next-intl";

export default function PaymentTrustBadges() {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Payment method icons */}
      <div className="flex items-center gap-3 opacity-70">
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-label="Visa">
          <rect width="36" height="24" rx="3" fill="#1A1F71"/>
          <text x="6" y="17" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">VISA</text>
        </svg>
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-label="Mastercard">
          <rect width="36" height="24" rx="3" fill="#1C1C1C"/>
          <circle cx="15" cy="12" r="6" fill="#EB001B"/>
          <circle cx="21" cy="12" r="6" fill="#F79E1B" opacity="0.8"/>
          <text x="7" y="21" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="white" opacity="0.7">MC</text>
        </svg>
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none" aria-label="PayPal">
          <rect width="36" height="24" rx="3" fill="#0070BA"/>
          <text x="4" y="17" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="white">PayPal</text>
        </svg>
      </div>
      {/* Trust signals — i18n */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-xs" style={{ color: "var(--text-dim)" }}>
        <span>{t("trustBadges.ssl")}</span>
        <span>{t("trustBadges.instant")}</span>
        <span>{t("trustBadges.refund")}</span>
      </div>
    </div>
  );
}
