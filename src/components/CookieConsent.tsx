"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "cc-cookie-consent";

export function getConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "accepted") return true;
  if (v === "declined") return false;
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  function choose(accepted: boolean) {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur border-t border-stone-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm text-stone-600">
        <p className="flex-1 leading-relaxed">
          This site uses essential cookies and local storage for free-tier tracking and analytics.
          By clicking &ldquo;Accept&rdquo; you consent to this. See our{" "}
          <a href="/privacy" className="underline text-stone-800 hover:text-stone-600">Privacy Policy</a>{" "}
          for details.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose(false)}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs border border-stone-300 text-stone-500 hover:bg-stone-50 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={() => choose(true)}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs btn-primary"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
