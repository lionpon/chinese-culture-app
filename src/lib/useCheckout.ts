"use client";

import { useState } from "react";
import { hasFreeUses, consumeFreeUse, updateRemaining } from "./free-tier";

export function useCheckout(type: string) {
  const [loading, setLoading] = useState(false);

  async function checkout(data: Record<string, unknown>, method?: "paypal" | "card") {
    setLoading(true);
    const free = hasFreeUses();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input: data, free, method }),
      });
      const result = await res.json();

      if (result.error === "free_limit_reached") {
        updateRemaining(0);
        alert("Free trial limit reached. Please choose a paid option to continue.");
        return;
      }

      if (result.url) {
        // Card payment via paypal.me — opens in new tab, no auto-callback.
        // User pays, closes tab, comes back. No pending order to poll.
        if (result.method === "card") {
          window.open(result.url, "_blank");
          alert("Payment page opened. After completing payment, close the new tab and refresh this page. Your result will appear once payment is confirmed (usually within 1-2 minutes).");
          setLoading(false);
          return;
        }
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
