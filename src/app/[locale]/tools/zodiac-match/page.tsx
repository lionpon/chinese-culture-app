"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";
import { BASE_URL } from "@/lib/config";

const ZODIAC = [
  { key: "Rat", emoji: "🐀" },
  { key: "Ox", emoji: "🐂" },
  { key: "Tiger", emoji: "🐅" },
  { key: "Rabbit", emoji: "🐇" },
  { key: "Dragon", emoji: "🐉" },
  { key: "Snake", emoji: "🐍" },
  { key: "Horse", emoji: "🐎" },
  { key: "Goat", emoji: "🐐" },
  { key: "Monkey", emoji: "🐒" },
  { key: "Rooster", emoji: "🐓" },
  { key: "Dog", emoji: "🐕" },
  { key: "Pig", emoji: "🐖" },
];

interface MatchResult {
  title: string;
  score: number;
  scoreLabel: string;
  love: string;
  friendship: string;
  career: string;
  secret: string;
  advice: string;
  emoji: string;
}

export default function ZodiacMatchPage() {
  const t = useTranslations("zodiacMatch");
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!sign1 || !sign2) return;
    setLoading(true);
    setError("");
    setResult(null);
    trackClick("zodiac_match_submit");
    try {
      const res = await fetch("/api/zodiac-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign1, sign2 }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setResult(data); trackClick("zodiac_match_result"); }
    } catch { setError(t("error")); }
    finally { setLoading(false); }
  }

  const shareText = result
    ? `${ZODIAC.find(z=>z.key===sign1)?.emoji} ${sign1} + ${ZODIAC.find(z=>z.key===sign2)?.emoji} ${sign2}: ${result.score}% ${result.scoreLabel}! ${result.secret}`
    : "";
  const shareUrl = `${BASE_URL}/tools/zodiac-match`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareText + "\n\nCheck yours: " + shareUrl);
      setCopied(true); trackClick("zodiac_match_share_copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function getScoreColor(s: number) {
    if (s >= 80) return "text-red-500";
    if (s >= 60) return "text-amber-500";
    if (s >= 40) return "text-yellow-500";
    return "text-stone-400";
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">{t("title")}</h1>
        <p className="text-stone-500 mt-2 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="card-classic p-4 sm:p-6 space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">{t("yourSign")}</label>
            <select value={sign1} onChange={e => setSign1(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" disabled={loading}>
              <option value="">{t("selectSign")}</option>
              {ZODIAC.map(z => <option key={z.key} value={z.key}>{z.emoji} {z.key}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">{t("theirSign")}</label>
            <select value={sign2} onChange={e => setSign2(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" disabled={loading}>
              <option value="">{t("selectSign")}</option>
              {ZODIAC.map(z => <option key={z.key} value={z.key}>{z.emoji} {z.key}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" disabled={loading || !sign1 || !sign2}
          className="w-full py-3 rounded-xl text-sm font-medium btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <span className="inline-flex items-center gap-2"><span className="animate-spin">💫</span>{t("checking")}</span> : t("submit")}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      {result && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-6 shadow-lg text-center">
            <div className="text-6xl mb-4">
              {ZODIAC.find(z=>z.key===sign1)?.emoji} {ZODIAC.find(z=>z.key===sign2)?.emoji}
            </div>
            <h2 className="text-xl font-bold text-stone-800 mb-3">{result.title}</h2>
            <div className="mb-4">
              <span className={`text-5xl font-black ${getScoreColor(result.score)}`}>{result.score}%</span>
              <p className="text-sm text-stone-500 mt-1">{result.scoreLabel}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-4">
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-red-400 font-semibold mb-1">❤️ {t("love")}</p>
                <p className="text-xs text-stone-700">{result.love}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-blue-400 font-semibold mb-1">🤝 {t("friendship")}</p>
                <p className="text-xs text-stone-700">{result.friendship}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-green-400 font-semibold mb-1">💼 {t("career")}</p>
                <p className="text-xs text-stone-700">{result.career}</p>
              </div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 mb-3">
              <p className="text-sm text-stone-700 italic">💡 {result.secret}</p>
            </div>
            <p className="text-xs text-stone-500">{result.advice}</p>
          </div>

          <div className="card-classic p-4">
            <p className="text-xs text-stone-500 text-center mb-3 font-medium uppercase tracking-wide">{t("sharePrompt")}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={() => {
                trackClick("zodiac_match_share_twitter");
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
              }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-black hover:text-white transition-all">
                <span className="font-bold">X</span><span className="hidden sm:inline">Twitter</span>
              </button>
              <button onClick={() => {
                trackClick("zodiac_match_share_wa");
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
              }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-[#25D366] hover:text-white transition-all">
                <span className="font-bold">WA</span><span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-stone-100 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">{copied ? t("copied") : t("copy")}</span>
              </button>
            </div>
          </div>

          <div className="text-center pb-8">
            <div className="card-classic p-5 border-2 border-amber-300 bg-amber-50/50">
              <p className="text-sm font-semibold text-stone-800 mb-2">{t("upsellTitle")}</p>
              <p className="text-xs text-stone-500 mb-4">{t("upsellDesc")}</p>
              <Link href="/naming" onClick={() => trackClick("zodiac_match_upsell")}
                className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium btn-primary">
                {t("upsellCta")}
              </Link>
            </div>
          </div>

          <div className="text-center pb-4">
            <button onClick={() => { setResult(null); setSign1(""); setSign2(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs text-stone-400 hover:text-stone-600 underline">{t("tryAnother")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
