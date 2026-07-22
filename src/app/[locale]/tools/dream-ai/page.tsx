"use client";

import { useState, useRef, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";
import { BASE_URL } from "@/lib/config";
import EmailCaptureForm from "@/components/EmailCaptureForm";

interface DreamResult {
  title: string;
  interpretation: string;
  symbol: string;
  symbolMeaning: string;
  fortune: string;
  emoji: string;
}

const SHARE_PLATFORMS = [
  {
    name: "Twitter",
    icon: "X",
    color: "hover:bg-black hover:text-white",
    buildUrl: (text: string, url: string) =>
      "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url),
  },
  {
    name: "Facebook",
    icon: "f",
    color: "hover:bg-[#1877F2] hover:text-white",
    buildUrl: (text: string, url: string) =>
      "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) + "&quote=" + encodeURIComponent(text),
  },
  {
    name: "WhatsApp",
    icon: "WA",
    color: "hover:bg-[#25D366] hover:text-white",
    buildUrl: (text: string, url: string) =>
      "https://wa.me/?text=" + encodeURIComponent(text + " " + url),
  },
];

export default function DreamAiPage() {
  const t = useTranslations("dreamAi");
  const [dreamText, setDreamText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DreamResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!dreamText.trim() || dreamText.trim().length < 3) return;
    setLoading(true);
    setError("");
    setResult(null);
    trackClick("dream_ai_submit");
    try {
      const res = await fetch("/api/dream-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamText: dreamText.trim() }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else {
        setResult(data);
        trackClick("dream_ai_result");
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } catch { setError(t("error")); }
    finally { setLoading(false); }
  }

  const shareText = result
    ? "My AI dream reading: " + result.title + " " + result.emoji + "\n\n" + result.fortune
    : "";
  const shareUrl = BASE_URL + "/tools/dream-ai";

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareText + "\n\nTry it: " + shareUrl);
      setCopied(true);
      trackClick("dream_ai_share_copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function shareTo(platform: typeof SHARE_PLATFORMS[number]) {
    trackClick("dream_ai_share_" + platform.name.toLowerCase());
    window.open(platform.buildUrl(shareText, shareUrl), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">{t("title")}</h1>
        <p className="text-stone-500 mt-2 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="card-classic p-4 sm:p-6 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">{t("label")}</label>
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder={t("placeholder")}
            className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-y"
            disabled={loading}
          />
          <p className="text-xs text-stone-400 mt-1 text-right">{dreamText.length}/500</p>
        </div>
        <button
          type="submit"
          disabled={loading || dreamText.trim().length < 3}
          className="w-full py-3 rounded-xl text-sm font-medium btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-spin">..</span>
              {t("interpreting")}
            </span>
          ) : (t("submit"))}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      {result && (
        <div ref={resultRef} className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-amber-50 via-white to-red-50 p-6 shadow-lg">
            <div className="text-center mb-4"><span className="text-5xl">{result.emoji}</span></div>
            <h2 className="text-xl font-bold text-stone-800 text-center mb-4 leading-snug">{result.title}</h2>
            <div className="text-sm text-stone-700 mb-4 space-y-2">
              {result.interpretation.split("\n").map((p, i) => p.trim() ? <p key={i} className="leading-relaxed">{p}</p> : null)}
            </div>
            {result.symbol && (
              <div className="inline-flex items-center gap-2 bg-amber-100/80 rounded-full px-4 py-1.5 mb-4">
                <span className="text-xs text-amber-800 font-medium">Dream symbol: {result.symbol} - {result.symbolMeaning}</span>
              </div>
            )}
            <div className="border-t border-amber-200 pt-4 mt-4 text-center">
              <p className="text-sm italic text-stone-600">.. {result.fortune}</p>
            </div>
          </div>

          <div className="card-classic p-4">
            <p className="text-xs text-stone-500 text-center mb-3 font-medium uppercase tracking-wide">{t("sharePrompt")}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {SHARE_PLATFORMS.map((platform) => (
                <button key={platform.name} onClick={() => shareTo(platform)}
                  className={"inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 transition-all " + platform.color}>
                  <span className="font-bold">{platform.icon}</span>
                  <span className="hidden sm:inline">{platform.name}</span>
                </button>
              ))}
              <button onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-stone-100 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">{copied ? t("copied") : t("copy")}</span>
                {copied && <span className="text-xs text-green-600">ok</span>}
              </button>
            </div>
          </div>

          <div className="text-center pb-8">
            <div className="card-classic p-5 border-2 border-amber-300 bg-amber-50/50">
              <p className="text-sm font-semibold text-stone-800 mb-2">{t("upsellTitle")}</p>
              <p className="text-xs text-stone-500 mb-4">{t("upsellDesc")}</p>
              <Link href="/dream-interpretation" onClick={() => trackClick("dream_ai_upsell_click")}
                className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium btn-primary">
                {t("upsellCta")}
              </Link>
            </div>
          </div>

          <div className="text-center pb-4">
            <button onClick={() => { setResult(null); setDreamText(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs text-stone-400 hover:text-stone-600 underline">
              {t("tryAnother")}
            </button>
          </div>
        </div>
      )}
      <EmailCaptureForm source="dream-ai" />
    </div>
  );
}