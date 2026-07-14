"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const [dismissed, setDismissed] = useState(false);

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

  if (dismissed) return null;

  const cards = lockedTitles || [t(featureKey1), t(featureKey2)];

  return (
    <div className="relative my-4">
      {/* Progress bar */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full w-[30%] rounded-full"
            style={{ backgroundColor: "var(--accent)" }} />
        </div>
        <span className="text-xs text-stone-400 font-medium">30%</span>
      </div>
      <p className="text-sm font-semibold text-center mb-4" style={{ color: "var(--accent)" }}>
        {t("unlockTitle")}
      </p>

      {/* Teaser cards — showing what's locked */}
      <div className="space-y-2 opacity-50 pointer-events-none mb-4">
        {cards.map((title, i) => (
          <div key={i} className="bg-white rounded-lg px-4 py-3 border border-stone-200/60 shadow-sm">
            <p className="text-sm font-medium text-stone-700">
              {title}
            </p>
            <p className="text-xs text-stone-400">
              {t("lockedContent")}
            </p>
          </div>
        ))}
        <div className="bg-stone-50 rounded-lg px-4 py-3 text-center border border-dashed border-stone-200">
          <p className="text-xs text-stone-400">{t("andMore")}</p>
        </div>
      </div>

      {/* Action buttons — primary = unlock */}
      <div className="flex flex-col gap-2">
        <button
          onClick={unlock}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-60"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {loading ? "..." : t("unlockFullCta")}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="w-full py-2 rounded-xl text-xs text-stone-400 hover:text-stone-500 transition-colors"
        >
          {t("seeFreePreview")}
        </button>
      </div>
    </div>
  );
}
