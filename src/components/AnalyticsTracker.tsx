"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "@/components/CookieConsent";

function isTestMode(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith("cc_test_mode=1"));
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (tracked.current === pathname) return;
    tracked.current = pathname;

    // Skip tracking in test mode
    if (isTestMode()) return;

    const consent = getConsent();
    if (consent === false) return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, referrer: document.referrer || "" }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
