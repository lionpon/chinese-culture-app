"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BASE_URL } from "@/lib/config";
import { trackClick } from "@/lib/track";

export default function ShareButton() {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = BASE_URL;
    const text = t("share.text");

    trackClick("share");
    if (navigator.share) {
      try {
        await navigator.share({ title: t("share.title"), text, url });
      } catch {}
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 hover:text-stone-800 transition-colors"
      title={t("share.tooltip")}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span className="hidden sm:inline">{t("share.button")}</span>
      {copied && (
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "var(--accent)", backgroundColor: "var(--accent-muted)" }}>
          {t("share.copied")}
        </span>
      )}
    </button>
  );
}
