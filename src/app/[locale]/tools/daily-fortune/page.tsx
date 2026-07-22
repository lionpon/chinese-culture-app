"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";
import { BASE_URL } from "@/lib/config";

const ZODIAC = [
  { key: "Rat", emoji: "🐀" }, { key: "Ox", emoji: "🐂" }, { key: "Tiger", emoji: "🐅" },
  { key: "Rabbit", emoji: "🐇" }, { key: "Dragon", emoji: "🐉" }, { key: "Snake", emoji: "🐍" },
  { key: "Horse", emoji: "🐎" }, { key: "Goat", emoji: "🐐" }, { key: "Monkey", emoji: "🐒" },
  { key: "Rooster", emoji: "🐓" }, { key: "Dog", emoji: "🐕" }, { key: "Pig", emoji: "🐖" },
];

interface FortuneResult {
  title: string;
  hexagram: string;
  hexagramNum: number;
  fortune: string;
  luckyColor: string;
  luckyNumber: number;
  mood: string;
  advice: string;
  emoji: string;
  sign: string;
  date: string;
}

const COLOR_MAP: Record<string, string> = {
  Red: "#EF4444", Gold: "#F59E0B", Green: "#10B981", Blue: "#3B82F6",
  Purple: "#8B5CF6", Pink: "#EC4899", Silver: "#9CA3AF", White: "#F9FAFB",
  Black: "#1F2937", Yellow: "#EAB308", Orange: "#F97316", Teal: "#14B8A6",
};

export default function DailyFortunePage() {
  const t = useTranslations("dailyFortune");
  const [sign, setSign] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!sign) return;
    setLoading(true); setError(""); setResult(null);
    trackClick("daily_fortune_submit");
    try {
      const res = await fetch("/api/daily-fortune", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sign }) });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setResult(data); trackClick("daily_fortune_result"); }
    } catch { setError(t("error")); }
    finally { setLoading(false); }
  }

  const shareText = result
    ? `🔮 Today's fortune for ${result.sign} ${ZODIAC.find(z=>z.key===result.sign)?.emoji}: "${result.title}" ${result.emoji}\n\nLucky color: ${result.luckyColor} | Lucky number: ${result.luckyNumber}`
    : "";
  const shareUrl = `${BASE_URL}/tools/daily-fortune`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareText + "\n\nGet yours: " + shareUrl);
      setCopied(true); trackClick("daily_fortune_share_copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
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
          <select value={sign} onChange={e => setSign(e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" disabled={loading}>
            <option value="">{t("selectSign")}</option>
            {ZODIAC.map(z => <option key={z.key} value={z.key}>{z.emoji} {z.key}</option>)}
          </select>
        </div>
        <button type="submit" disabled={loading || !sign}
          className="w-full py-3 rounded-xl text-sm font-medium btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <span className="inline-flex items-center gap-2"><span className="animate-spin">🔮</span>{t("generating")}</span> : t("submit")}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      {result && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 shadow-lg text-center">
            <div className="text-5xl mb-3">{result.emoji}</div>
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-3 py-1 mb-3">
              <span className="text-xs text-purple-700 font-medium">{ZODIAC.find(z=>z.key===result.sign)?.emoji} {result.sign} · {result.date}</span>
            </div>
            <h2 className="text-xl font-bold text-stone-800 mb-4">{result.title}</h2>
            <p className="text-sm text-stone-700 mb-4 leading-relaxed">{result.fortune}</p>
            <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs text-stone-500">📖 I Ching:</span>
              <span className="text-xs font-semibold text-purple-700">{result.hexagram} (#{result.hexagramNum})</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-stone-400 mb-1">{t("luckyColor")}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: COLOR_MAP[result.luckyColor] || result.luckyColor }} />
                  <span className="text-sm font-semibold text-stone-700">{result.luckyColor}</span>
                </div>
              </div>
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-stone-400 mb-1">{t("luckyNumber")}</p>
                <span className="text-2xl font-black text-purple-600">{result.luckyNumber}</span>
              </div>
              <div className="bg-white/70 rounded-xl p-3">
                <p className="text-xs text-stone-400 mb-1">{t("mood")}</p>
                <span className="text-sm font-semibold text-stone-700">{result.mood}</span>
              </div>
            </div>
            <div className="bg-white/80 rounded-xl p-4">
              <p className="text-xs text-stone-500 mb-1">{t("advice")}</p>
              <p className="text-sm text-stone-700 italic">{result.advice}</p>
            </div>
          </div>

          <div className="card-classic p-4">
            <p className="text-xs text-stone-500 text-center mb-3 font-medium uppercase tracking-wide">{t("sharePrompt")}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={() => {
                trackClick("daily_fortune_share_twitter");
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
              }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-black hover:text-white transition-all">
                <span className="font-bold">X</span><span className="hidden sm:inline">Twitter</span>
              </button>
              <button onClick={() => {
                trackClick("daily_fortune_share_wa");
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
              <Link href="/divination" onClick={() => trackClick("daily_fortune_upsell")}
                className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium btn-primary">
                {t("upsellCta")}
              </Link>
            </div>
          </div>

          <div className="text-center pb-4">
            <button onClick={() => { setResult(null); setSign(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs text-stone-400 hover:text-stone-600 underline">{t("tryAnother")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
