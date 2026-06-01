"use client";

import type { NamingResult, NameAnalysisResult } from "@/types";
import SpeakButton from "./SpeakButton";

function ResultCard({ opt, i, recommended }: { opt: { characters: string; pinyin: string; meaning: string; wuxing: string; source: string; sourceText?: string }; i: number; recommended: boolean }) {
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
        <p><span className="text-stone-400">Elements:</span> {opt.wuxing}</p>
        <p><span className="text-stone-400">Source:</span> {opt.source}</p>
        {opt.sourceText && <p className="text-stone-500 italic">{opt.sourceText}</p>}
      </div>
      {recommended && (
        <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
          <strong>Recommended</strong> — Best match for your elemental profile
        </div>
      )}
    </div>
  );
}

export default function NamingResultView({ result }: { result: NamingResult | NameAnalysisResult }) {
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
            <p><span className="text-stone-400">Favorable Elements:</span> {a.baziCompatibility.favorableElements.join(", ")}</p>
            <p><span className="text-stone-400">Surname Element:</span> {a.elementBreakdown.surnameElement}</p>
            <p><span className="text-stone-400">Given Name Elements:</span> {a.elementBreakdown.givenNameElements.join(", ")}</p>
          </div>
        </div>

        {a.suggestion && (
          <div className="card-classic p-4 sm:p-6 mb-4" style={{ borderColor: "rgba(155,74,58,0.3)" }}>
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
      </div>
    );
  }

  // Create mode (original)
  const r = result as NamingResult;
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">Your Chinese Name</h1>
      <div className="space-y-4">
        {r.options.map((opt, i) => (
          <ResultCard key={i} opt={opt} i={i} recommended={i === 0} />
        ))}
      </div>
      <div className="mt-6 bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
        <p className="font-medium mb-1">Bazi Analysis</p>
        <p>{r.baziAnalysis.analysis}</p>
        <p className="mt-1">{r.baziAnalysis.analysisEn}</p>
      </div>
    </div>
  );
}
