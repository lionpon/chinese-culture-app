"use client";

import type { NamingResult } from "@/types";
import SpeakButton from "./SpeakButton";

export default function NamingResultView({ result }: { result: NamingResult }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">Your Chinese Name</h1>
      <div className="space-y-4">
        {result.options.map((opt, i) => (
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
            {i === 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
                <strong>Recommended</strong> — Best match for your elemental profile
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
        <p className="font-medium mb-1">Bazi Analysis</p>
        <p>{result.baziAnalysis.analysis}</p>
        <p className="mt-1">{result.baziAnalysis.analysisEn}</p>
      </div>
    </div>
  );
}
