"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { NamingResult, NameAnalysisResult } from "@/types";
import SpeakButton from "./SpeakButton";
import PaywallOverlay from "./PaywallOverlay";
import EmailCaptureForm from "./EmailCaptureForm";
import DownloadPDF from "./DownloadPDF";
import { trackClick } from "@/lib/track";

function ResultCard({ opt, i, recommended, isFree, showNarrative, teaser }: { opt: { characters: string; pinyin: string; meaning: string; narrative?: string; wuxing?: string; source?: string; sourceText?: string }; i: number; recommended: boolean; isFree?: boolean; showNarrative?: boolean; teaser?: boolean }) {
  const t = useTranslations("result");
  if (teaser) {
    // Free-tier teaser: only characters + five-element hook. Pinyin/meaning/source/narrative are the paid content.
    return (
      <div key={i} className="card-classic p-4 sm:p-6" style={{ borderColor: "var(--border-strong)" }}>
        <div className="text-center mb-3">
          <p className="text-3xl font-bold text-accent">{opt.characters}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <SpeakButton text={opt.characters} />
          </div>
          {opt.wuxing && (
            <p className="text-sm mt-2 px-3 py-1.5 inline-block rounded-lg" style={{ color: "var(--gold)", backgroundColor: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
              {t("naming.freeTeaser", { elements: opt.wuxing })}
            </p>
          )}
        </div>
        <p className="text-center text-xs text-stone-400">
          🔒 {t("naming.freeLocked")}
        </p>
      </div>
    );
  }
  return (
    <div key={i} className="card-classic p-4 sm:p-6">
      {/* Narrative intro — the story behind this name */}
      {showNarrative && opt.narrative && i === 0 && (
        <div className="mb-4 px-3 py-3 rounded-lg" style={{ backgroundColor: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)" }}>
          <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-body)" }}>
            {opt.narrative}
          </p>
        </div>
      )}
      <div className="text-center mb-3">
        <p className="text-3xl font-bold text-accent">{opt.characters}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-lg text-stone-500">{opt.pinyin}</p>
          <SpeakButton text={opt.characters} />
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-stone-400">{t("naming.meaning")}:</span> {opt.meaning}</p>
        {opt.wuxing && <p><span className="text-stone-400">{t("naming.elements")}:</span> {opt.wuxing}</p>}
        {opt.source && <p><span className="text-stone-400">{t("naming.source")}:</span> {opt.source}</p>}
        {opt.sourceText && <p className="text-stone-500 italic">{opt.sourceText}</p>}
      </div>
      {!isFree && recommended && (
        <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
          {t("naming.recommended")}
        </div>
      )}
    </div>
  );
}

export default function NamingResultView({
  result,
  isFree,
  purchaseId,
}: {
  result: NamingResult | NameAnalysisResult;
  isFree?: boolean;
  purchaseId?: string;
}) {
  const t = useTranslations("result");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mode = ("type" in result && result.type === "analysis") ? "name_analysis" : "naming";
    trackClick(isFree ? `result_free_${mode}` : `result_viewed_${mode}`);
  }, [isFree, result]);

  // Analyze mode
  if ("type" in result && result.type === "analysis") {
    const a = result as NameAnalysisResult;
    const matchLabels: Record<string, string> = {
      excellent: t("analyze.matchExcellent"),
      good: t("analyze.matchGood"),
      fair: t("analyze.matchFair"),
      poor: t("analyze.matchPoor"),
    };
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mb-6 text-accent">{t("analyze.title")}</h1>

        <div className="card-classic p-4 sm:p-6 mb-4">
          <div className="text-center mb-3">
            <p className="text-3xl font-bold text-accent">{a.characters}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-lg text-stone-500">{a.pinyin}</p>
              <SpeakButton text={a.characters} />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p><span className="text-stone-400">{t("analyze.score")}:</span> <strong>{a.score}% — {matchLabels[a.baziCompatibility.match]}</strong></p>
            {a.baziCompatibility.analysisEn && (
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{a.baziCompatibility.analysisEn}</p>
            )}
          </div>
        </div>

        {isFree && purchaseId ? (
          <PaywallOverlay
            purchaseId={purchaseId}
            featureKey1="unlockNaming1"
            featureKey2="unlockNaming2"
          />
        ) : (
          <>
            <div className="card-classic p-4 sm:p-6 mb-4">
              <div className="space-y-2 text-sm">
                <p><span className="text-stone-400">{t("analyze.favorableElements")}:</span> {a.baziCompatibility.favorableElements.join(", ")}</p>
                <p><span className="text-stone-400">{t("analyze.surnameElement")}:</span> {a.elementBreakdown.surnameElement}</p>
                <p><span className="text-stone-400">{t("analyze.givenNameElements")}:</span> {a.elementBreakdown.givenNameElements.join(", ")}</p>
              </div>
            </div>

            {a.suggestion && (
              <div className="card-classic p-4 sm:p-6 mb-4" style={{ borderColor: "var(--border-strong)" }}>
                <p className="text-sm font-medium text-stone-600 mb-3">{t("analyze.suggestion")}</p>
                <ResultCard opt={a.suggestion} i={0} recommended={false} />
                <p className="text-xs text-stone-400 mt-3 text-center">{t("analyze.suggestionNote")}</p>
              </div>
            )}

            <div className="mt-4 bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
              <p className="font-medium mb-1">{t("naming.baziAnalysis")}</p>
              <p>{a.baziAnalysis.analysis}</p>
              <p className="mt-1">{a.baziAnalysis.analysisEn}</p>
            </div>
          </>
        )}
      <EmailCaptureForm source="naming" />
      </div>
    );
  }

  // Create mode (original)
  const r = result as NamingResult;
  return (
    <div>
      {/* PDF download — paid users only */}
      {!isFree && (
        <div className="flex justify-end mb-4">
          <DownloadPDF
            filename={`chinese-name-${r.options[0]?.characters || "reading"}`}
            title="Your Chinese Name Reading"
            resultRef={resultRef}
          />
        </div>
      )}
      <div ref={resultRef}>
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">{t("naming.title")}</h1>
      <div className="space-y-4">
        {/* Why this name? — one-line context */}
        {r.options.length > 0 && r.options[0].wuxing && (
          <div className="text-center px-4">
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {t("naming.nameRationale", {
                elements: r.options[0].wuxing,
                source: r.options[0].source || t("naming.classicalSource")
              })}
            </p>
          </div>
        )}

        {/* Free tier: characters + five-element hook only (teaser). Paid: full card. */}
        {r.options.length > 0 && (
          <ResultCard opt={r.options[0]} i={0} recommended={true} isFree={!!(isFree && purchaseId)} showNarrative={!isFree} teaser={!!(isFree && purchaseId)} />
        )}

        {/* Gate remaining names + bazi analysis behind paywall */}
        {isFree && purchaseId ? (
          <PaywallOverlay
            purchaseId={purchaseId}
            featureKey1="unlockNaming1"
            featureKey2="unlockNaming2"
          />
        ) : (
          <>
            {r.options.slice(1).map((opt, i) => (
              <ResultCard key={i + 1} opt={opt} i={i + 1} recommended={false} />
            ))}
            <div className="mt-6 bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
              <p className="font-medium mb-1">{t("naming.baziAnalysis")}</p>
              <p>{r.baziAnalysis.analysis}</p>
              <p className="mt-1">{r.baziAnalysis.analysisEn}</p>
            </div>
          </>
        )}
      </div>
      <EmailCaptureForm source="naming" />
      </div>
    </div>
  );
}
