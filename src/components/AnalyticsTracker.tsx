"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "@/components/CookieConsent";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (tracked.current === pathname) return;
    tracked.current = pathname;

    const consent = getConsent();
    if (consent === false) return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
