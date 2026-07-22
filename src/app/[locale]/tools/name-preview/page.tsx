"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";
import { BASE_URL } from "@/lib/config";
import EmailCaptureForm from "@/components/EmailCaptureForm";

interface NameOption {
  chinese: string;
  pinyin: string;
  meaning: string;
  elements: string;
  style: string;
}

interface PreviewResult {
  originalName: string;
  names: NameOption[];
  headline: string;
}

const STYLE_BADGES: Record<string, string> = {
  Elegant: "bg-purple-100 text-purple-700",
  Bold: "bg-red-100 text-red-700",
  Gentle: "bg-blue-100 text-blue-700",
  Artistic: "bg-pink-100 text-pink-700",
  Classic: "bg-amber-100 text-amber-700",
};

export default function NamePreviewPage() {
  const t = useTranslations("namePreview");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PreviewResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) return;
    setLoading(true); setError(""); setResult(null);
    trackClick("name_preview_submit");
    try {
      const res = await fetch("/api/name-preview", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), gender: gender || undefined }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setResult(data); trackClick("name_preview_result"); }
    } catch { setError(t("error")); }
    finally { setLoading(false); }
  }

  const shareText = result
    ? `✨ My Chinese name could be "${result.names[0]?.chinese}" — ${result.names[0]?.meaning}`
    : "";
  const shareUrl = `${BASE_URL}/tools/name-preview`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareText + "\n\nFind yours: " + shareUrl);
      setCopied(true); trackClick("name_preview_share_copy");
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
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            disabled={loading}
            maxLength={50}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">{t("genderLabel")}</label>
          <div className="flex gap-3">
            {["", "male", "female"].map(g => (
              <button key={g} type="button"
                onClick={() => setGender(g)}
                className={`flex-1 py-2 rounded-lg text-sm border transition-all ${gender === g ? "border-amber-400 bg-amber-50 text-amber-800 font-medium" : "border-stone-300 text-stone-500 hover:border-stone-400"}`}>
                {g === "" ? t("anyGender") : g === "male" ? t("male") : t("female")}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading || name.trim().length < 2}
          className="w-full py-3 rounded-xl text-sm font-medium btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? <span className="inline-flex items-center gap-2"><span className="animate-spin">✨</span>{t("generating")}</span> : t("submit")}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      {result && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-lg">
            <p className="text-xs text-stone-400 text-center mb-1">{t("for")} &ldquo;{result.originalName}&rdquo;</p>
            <h2 className="text-lg font-bold text-stone-800 text-center mb-6">{result.headline}</h2>
            <div className="space-y-4">
              {result.names.map((n, i) => (
                <div key={i} className="bg-white/80 rounded-xl p-4 border border-amber-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-accent">{n.chinese}</span>
                      <div>
                        <p className="text-xs text-stone-500">{n.pinyin}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${STYLE_BADGES[n.style] || "bg-stone-100 text-stone-600"}`}>{n.style}</span>
                      </div>
                    </div>
                    <span className="text-xs text-stone-400">{n.elements}</span>
                  </div>
                  <p className="text-sm text-stone-700 italic">{n.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-classic p-4">
            <p className="text-xs text-stone-500 text-center mb-3 font-medium uppercase tracking-wide">{t("sharePrompt")}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={() => {
                trackClick("name_preview_share_twitter");
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
              }} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-stone-300 text-stone-600 hover:bg-black hover:text-white transition-all">
                <span className="font-bold">X</span><span className="hidden sm:inline">Twitter</span>
              </button>
              <button onClick={() => {
                trackClick("name_preview_share_wa");
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
              <Link href="/naming" onClick={() => trackClick("name_preview_upsell")}
                className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium btn-primary">
                {t("upsellCta")}
              </Link>
            </div>
          </div>

          <div className="text-center pb-4">
            <button onClick={() => { setResult(null); setName(""); setGender(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs text-stone-400 hover:text-stone-600 underline">{t("tryAnother")}</button>
          </div>
        </div>
      )}
      <EmailCaptureForm source="name-preview" />
    </div>
  );
}
