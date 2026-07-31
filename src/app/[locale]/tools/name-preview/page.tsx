"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";
import EmailCaptureForm from "@/components/EmailCaptureForm";

interface NameOption {
  chinese: string;
  pinyin: string;
  meaning: string;
}

interface PreviewResult {
  originalName: string;
  names: NameOption[];
  headline: string;
}



export default function NamePreviewPage() {
  const t = useTranslations("namePreview");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PreviewResult | null>(null);
  const [error, setError] = useState("");

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
              {result.names.slice(0, 1).map((n, i) => (
                <div key={i} className="bg-white/80 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-accent">{n.chinese}</span>
                      <p className="text-sm text-stone-500">{n.pinyin}</p>
                    </div>
                  </div>
                  <p className="text-sm text-stone-700 italic">{n.meaning}</p>
                </div>
              ))}
            </div>

            {/* Locked names placeholder */}
            <div className="mt-4 space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-stone-100/80 rounded-xl p-4 border border-dashed border-stone-300 flex items-center gap-3 opacity-50">
                  <div className="w-16 h-8 bg-stone-200 rounded animate-pulse" />
                  <div className="w-24 h-4 bg-stone-200 rounded animate-pulse" />
                  <span className="ml-auto text-xs text-stone-400">🔒</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pb-8">
            <div className="card-classic p-5 border-2 border-amber-400 bg-amber-50/80">
              <p className="text-base font-bold text-stone-800 mb-1">{t("upsellTitle")}</p>
              <p className="text-sm text-stone-600 mb-4">{t("upsellDesc")}</p>
              <Link href="/naming" onClick={() => trackClick("name_preview_upsell")}
                className="inline-block px-8 py-3 rounded-xl text-sm font-bold btn-primary shadow-lg">
                {t("upsellCta")}
              </Link>
              <p className="text-xs text-stone-400 mt-3">{t("upsellNote")}</p>
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
