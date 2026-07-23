"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";
import { BASE_URL } from "@/lib/config";
import EmailCaptureForm from "@/components/EmailCaptureForm";

interface PalaceResult {
  name: string;
  nameEn: string;
  verdict: string;
  verdictText: string;
  guidance: string;
  conclusion: string;
  timing: string;
  element: string;
  direction: string;
}

interface Calculation {
  lunarMonth: number;
  lunarDay: number;
  shichen: number;
  shichenName: string;
  steps: {
    month: { start: string; count: number; land: string };
    day: { start: string; count: number; land: string };
    hour: { start: string; count: number; land: string };
  };
}

interface OracleResult {
  palace: PalaceResult;
  question: string;
  calculation: Calculation;
}

const VERDICT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  stable:    { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)", text: "#10B981" },
  stuck:     { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.3)", text: "#F59E0B" },
  favorable: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.3)", text: "#3B82F6" },
  caution:   { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.3)",  text: "#EF4444" },
  unfavorable: { bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.3)", text: "#6B7280" },
};

export default function QuickOraclePage() {
  const t = useTranslations("quickOracle");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OracleResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    trackClick("quick_oracle_submit");
    try {
      const res = await fetch("/api/xiaoliuren", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setResult(data); trackClick("quick_oracle_result"); }
    } catch { setError(t("error")); }
    finally { setLoading(false); }
  }

  const shareText = result
    ? "🔮 Quick Oracle: " + result.palace.nameEn + " (" + result.palace.name + ")" + "\n\n\"" + result.palace.verdictText + "\"" + "\n\n" + (result.question ? "Asked: " + result.question + "\n\n" : "") + "Ask yours: " + BASE_URL + "/tools/quick-oracle"
    : "";

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true); trackClick("quick_oracle_share_copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const colors = result ? VERDICT_COLORS[result.palace.verdict] || VERDICT_COLORS.unfavorable : VERDICT_COLORS.unfavorable;

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">{t("title")}</h1>
        <p className="text-stone-500 mt-2 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="card-classic p-4 sm:p-6 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-stone-400 mb-2">{t("questionLabel")}</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("questionPlaceholder")}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
            style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-primary)" }}

          />
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-60">
          {loading ? t("asking") : t("submit")}
        </button>
        <p className="text-center text-xs text-stone-500">{t("disclaimer")}</p>
      </form>

      {error && (
        <div className="card-classic p-4 mb-8 text-center text-red-400 text-sm">{error}</div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="rounded-2xl p-6 text-center" style={{ background: colors.bg, border: "1px solid " + colors.border }}>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">{t("yourAnswer")}</p>
            <p className="text-3xl font-bold mb-1" style={{ color: colors.text }}>{result.palace.nameEn}</p>
            <p className="text-lg text-stone-400 mb-4">{result.palace.name}</p>
            <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-primary)" }}>{result.palace.verdictText}</p>
            {(result.palace.guidance || result.palace.conclusion) && (
              <div className="bg-black/20 rounded-xl p-4 text-left">
                <p className="text-sm text-stone-300 leading-relaxed">{result.palace.conclusion || result.palace.guidance}</p>
              </div>
            )}
          </div>

          {result.question && (
            <p className="text-center text-xs text-stone-500 italic">You asked: &ldquo;{result.question}&rdquo;</p>
          )}

          <div className="card-classic p-4 text-center">
            <p className="text-xs text-stone-400 mb-1">{t("timingHint")}</p>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>{result.palace.timing}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText)} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("quick_oracle_share_twitter")} className="px-4 py-2 rounded-full text-xs font-medium transition-colors" style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border-medium)" }}>X Share</a>
            <a href={"https://wa.me/?text=" + encodeURIComponent(shareText)} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("quick_oracle_share_whatsapp")} className="px-4 py-2 rounded-full text-xs font-medium transition-colors" style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border-medium)" }}>WhatsApp</a>
            <button onClick={copyToClipboard} className="px-4 py-2 rounded-full text-xs font-medium transition-colors" style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)", border: "1px solid var(--border-medium)" }}>{copied ? "✓ Copied!" : t("copy")}</button>
          </div>

          <div className="card-classic p-4">
            <button onClick={() => setShowCalc(!showCalc)} className="w-full text-left flex items-center justify-between text-xs text-stone-400 transition-colors hover:opacity-70">
              <span>{t("howItWorks")}</span>
              <span>{showCalc ? "▾" : "▸"}</span>
            </button>
            {showCalc && (
              <div className="mt-3 space-y-3 text-xs text-stone-400 border-t border-stone-800 pt-3">
                <div>
                  <p className="text-stone-500 mb-1">{t("lunarDate")}</p>
                  <p>{t("lunarMonth")} {result.calculation.lunarMonth} · {t("lunarDay")} {result.calculation.lunarDay} · {t("shichen")} {result.calculation.shichenName}</p>
                </div>
                <div>
                  <p className="text-stone-500 mb-1">{t("countingSteps")}</p>
                  <ol className="list-decimal list-inside space-y-1 text-stone-500">
                    <li>{t("stepMonth", { start: result.calculation.steps.month.start, count: result.calculation.steps.month.count, land: result.calculation.steps.month.land })}</li>
                    <li>{t("stepDay", { start: result.calculation.steps.day.start, count: result.calculation.steps.day.count, land: result.calculation.steps.day.land })}</li>
                    <li>{t("stepHour", { start: result.calculation.steps.hour.start, count: result.calculation.steps.hour.count, land: result.calculation.steps.hour.land })}</li>
                  </ol>
                </div>
                <p className="text-stone-600 italic">{t("methodNote")}</p>
              </div>
            )}
          </div>

          <div className="card-classic p-5 text-center" style={{ borderColor: "var(--border-medium)" }}>
            <p className="text-sm mb-1" style={{ color: "var(--text-primary)" }}>{t("upsellTitle")}</p>
            <p className="text-xs text-stone-500 mb-3">{t("upsellDesc")}</p>
            <Link href="/divination" className="inline-block px-5 py-2 rounded-xl text-sm font-medium btn-primary">{t("upsellCta")}</Link>
          </div>

          <EmailCaptureForm source="quick-oracle" />
        </div>
      )}
    </div>
  );
}
