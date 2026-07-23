"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PaymentTrustBadges from "./PaymentTrustBadges";

export default function PaywallOverlay({
  purchaseId,
  featureKey1,
  featureKey2,
  lockedTitles,
}: {
  purchaseId: string;
  featureKey1: string;
  featureKey2: string;
  lockedTitles?: string[];
}) {
  const t = useTranslations("success");
  const [loading, setLoading] = useState(false);

  async function unlock() {
    setLoading(true);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchase_id: purchaseId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const features = lockedTitles || [t(featureKey1), t(featureKey2)];

  return (
    <div className="relative my-6">
      {/* Divider with label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-medium)" }} />
        <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--gold)" }}>
          ✨ {t("unlockHeading")}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-medium)" }} />
      </div>

      {/* Upgrade card */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))",
          border: "1px solid var(--border-medium)",
        }}
      >
        {/* Feature list */}
        <ul className="space-y-2 mb-4">
          {features.map((title, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-body)" }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }}>✓</span>
              <span>{title}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          onClick={unlock}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-60 mb-3"
        >
          {loading ? "..." : t("unlockFullCta")}
        </button>

        {/* Payment trust badges */}
        <PaymentTrustBadges />

        {/* Note — paywall stays visible, no dismiss */}
        <p className="w-full pt-3 text-xs text-center" style={{ color: "var(--text-dim)" }}>
          {t("paywallPersistent")}
        </p>
      </div>
    </div>
  );
}
