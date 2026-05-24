"use client";

import { useState } from "react";
import { hasFreeUses, consumeFreeUse } from "./free-tier";

export function useCheckout(type: string) {
  const [loading, setLoading] = useState(false);

  async function checkout(data: Record<string, unknown>) {
    setLoading(true);
    const free = hasFreeUses();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input: data, free }),
      });
      const result = await res.json();
      if (result.url) {
        window.location.href = result.url;
      } else if (result.purchase_id) {
        if (free) consumeFreeUse();
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
