"use client";

import { useState } from "react";
import { consumeFreeUse, updateRemaining } from "./free-tier";
import { trackClick } from "./track";

export function useCheckout(type: string) {
  const [loading, setLoading] = useState(false);

  async function checkout(data: Record<string, unknown>, forcePaid?: boolean) {
    setLoading(true);
    // The server is the single source of truth for the free quota (cookie +
    // DB fingerprint). Never downgrade to a paid flow based on localStorage
    // alone — a stale/mismatched client state would either surprise the user
    // with a PayPal redirect or dead-end them in a 403 alert with no paid
    // button. Callers pass forcePaid when the UI is the paid-only variant.
    const free = !forcePaid;
    // Auto-detect locale from URL path (e.g. /ru/naming → ru)
    const pathLocale = window.location.pathname.split("/")[1];
    const locale = ["ru", "ja", "ko"].includes(pathLocale) ? pathLocale : "en";
    data.locale = locale;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input: data, free }),
      });
      const result = await res.json();

      if (result.error === "free_limit_reached") {
        updateRemaining(0);
        // Tell the badge/listeners the free tier is gone so the UI switches
        // to the paid variant instead of leaving a dead "free" button.
        window.dispatchEvent(new Event("cc-free-tier-changed"));
        alert("Your free reading was already used. Use the gold button below to unlock your full result.");
        return;
      }

      if (result.url) {
        // Paid checkout — track before redirecting to PayPal
        trackClick("pay_click");
        window.location.href = result.url;
      } else if (result.purchase_id) {
        if (free) consumeFreeUse();
        if (typeof result.remaining === "number") updateRemaining(result.remaining);
        const freeParam = result.free ? "&free=1" : "";
        window.location.href = `/success?purchase_id=${result.purchase_id}${freeParam}`;
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch {
      alert("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { loading, checkout };
}
