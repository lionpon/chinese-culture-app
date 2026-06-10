"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PaywallOverlay({
  purchaseId,
  featureKey1,
  featureKey2,
}: {
  purchaseId: string;
  featureKey1: string;
  featureKey2: string;
}) {
  const t = useTranslations("success");
  const [loading, setLoading] = useState(false);

  async function unlock() {
    setLoading(true);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchase_id: purchaseId, amount: 1 }),
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

  return (
    <div className="relative">
      <div className="blur-sm select-none opacity-30 pointer-events-none">
        <div className="h-24 rounded-lg bg-stone-100 mb-3" />
        <div className="h-16 rounded-lg bg-stone-100 mb-3" />
        <div className="h-20 rounded-lg bg-stone-100" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center px-4 py-5 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #FFF9F5 0%, #FFF5F0 100%)", border: "2px solid rgba(155,74,58,0.25)" }}>
          <p className="text-base font-bold mb-1" style={{ color: "var(--accent)" }}>
            {t("unlockTitle")}
          </p>
          <ul className="text-xs text-stone-500 space-y-0.5 mb-3">
            <li>+ {t(featureKey1)}</li>
            <li>+ {t(featureKey2)}</li>
          </ul>
          <button
            onClick={unlock}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-60"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {loading ? "..." : t("unlockNow")}
          </button>
        </div>
      </div>
    </div>
  );
}
