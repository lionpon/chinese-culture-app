"use client";

import type { NamingResult, NameAnalysisResult } from "@/types";
import SpeakButton from "./SpeakButton";
import PaywallOverlay from "./PaywallOverlay";
import EmailCaptureForm from "./EmailCaptureForm";

function ResultCard({ opt, i, recommended, isFree }: { opt: { characters: string; pinyin: string; meaning: string; wuxing?: string; source?: string; sourceText?: string }; i: number; recommended: boolean; isFree?: boolean }) {
  return (
    <div key={i} className="card-classic p-4 sm:p-6">
      <div className="text-center mb-3">
        <p className="text-3xl font-bold text-accent">{opt.characters}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="text-lg text-stone-500">{opt.pinyin}</p>
          <SpeakButton text={opt.characters} />
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="text-stone-400">Meaning:</span> {opt.meaning}</p>
        {opt.wuxing && <p><span className="text-stone-400">Elements:</span> {opt.wuxing}</p>}
        {opt.source && <p><span className="text-stone-400">Source:</span> {opt.source}</p>}
        {opt.sourceText && <p className="text-stone-500 italic">{opt.sourceText}</p>}
      </div>
      {!isFree && recommended && (
        <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
          <strong>Recommended</strong> — Best match for your elemental profile
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
  // Analyze mode
  if ("type" in result && result.type === "analysis") {
    const a = result as NameAnalysisResult;
    const matchLabels: Record<string, string> = {
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor",
    };
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mb-6 text-accent">Your Name Analysis</h1>

        <div className="card-classic p-4 sm:p-6 mb-4">
          <div className="text-center mb-3">
            <p className="text-3xl font-bold text-accent">{a.characters}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-lg text-stone-500">{a.pinyin}</p>
              <SpeakButton text={a.characters} />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p><span className="text-stone-400">Compatibility Score:</span> <strong>{a.score}% — {matchLabels[a.baziCompatibility.match]}</strong></p>
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
                <p><span className="text-stone-400">Favorable Elements:</span> {a.baziCompatibility.favorableElements.join(", ")}</p>
                <p><span className="text-stone-400">Surname Element:</span> {a.elementBreakdown.surnameElement}</p>
                <p><span className="text-stone-400">Given Name Elements:</span> {a.elementBreakdown.givenNameElements.join(", ")}</p>
              </div>
            </div>

            {a.suggestion && (
              <div className="card-classic p-4 sm:p-6 mb-4" style={{ borderColor: "var(--border-strong)" }}>
                <p className="text-sm font-medium text-stone-600 mb-3">Based on your Bazi, consider</p>
                <ResultCard opt={a.suggestion} i={0} recommended={false} />
                <p className="text-xs text-stone-400 mt-3 text-center">Same surname, more balanced given name</p>
              </div>
            )}

            <div className="mt-4 bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
              <p className="font-medium mb-1">Bazi Analysis</p>
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
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">Your Chinese Name</h1>
      <div className="space-y-4">
        {/* Always show first recommended name */}
        {r.options.length > 0 && (
          <ResultCard opt={r.options[0]} i={0} recommended={true} isFree={!!(isFree && purchaseId)} />
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
              <p className="font-medium mb-1">Bazi Analysis</p>
              <p>{r.baziAnalysis.analysis}</p>
              <p className="mt-1">{r.baziAnalysis.analysisEn}</p>
            </div>
          </>
        )}
      </div>
      <EmailCaptureForm source="naming" />
    </div>
  );
}
