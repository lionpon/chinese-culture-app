"use client";

import { useState } from "react";
import { hasFreeUses, consumeFreeUse, updateRemaining } from "./free-tier";
import { trackClick } from "./track";

export function useCheckout(type: string) {
  const [loading, setLoading] = useState(false);

  async function checkout(data: Record<string, unknown>, forcePaid?: boolean) {
    setLoading(true);
    const free = forcePaid ? false : hasFreeUses();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input: data, free }),
      });
      const result = await res.json();

      if (result.error === "free_limit_reached") {
        updateRemaining(0);
        alert("Free trial limit reached. Please choose a paid option to continue.");
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
