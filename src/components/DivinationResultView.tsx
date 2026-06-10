"use client";

import type { DivinationResult } from "@/types";
import SpeakButton from "./SpeakButton";
import PaywallOverlay from "./PaywallOverlay";

export default function DivinationResultView({
  result,
  isFree,
  purchaseId,
}: {
  result: DivinationResult;
  isFree?: boolean;
  purchaseId?: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">Your I Ching Reading</h1>
      <div className="card-classic p-6 space-y-5">
        {/* Advice — always visible as teaser */}
        <div className="rounded-xl p-5 advice-card">
          <p className="text-xs font-medium mb-2 uppercase tracking-wide text-accent">Guidance for You</p>
          <p className="text-sm text-stone-800 leading-relaxed">{result.mainHexagram.advice}</p>
        </div>

        {/* Hexagram identity — always visible */}
        <div className="text-center border-t border-stone-100 pt-4">
          <p className="text-2xl font-bold text-accent">{result.mainHexagram.nameZh}</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-base text-stone-500">{result.mainHexagram.pinyin}</p>
            <SpeakButton text={result.mainHexagram.nameZh} />
          </div>
          <p className="text-sm text-stone-400">{result.mainHexagram.nameEn}</p>
        </div>

        {/* Judgment — always visible as teaser */}
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-sm font-medium text-stone-600 mb-1">Original Judgment (卦辞)</p>
          <p className="text-stone-800">{result.mainHexagram.judgment}</p>
          <p className="text-xs text-stone-500 mt-1">{result.mainHexagram.judgmentEn}</p>
        </div>

        {/* Gated content: interpretation + changed/mutual hexagrams + changing line */}
        {isFree && purchaseId ? (
          <PaywallOverlay
            purchaseId={purchaseId}
            featureKey1="unlockDivination1"
            featureKey2="unlockDivination2"
          />
        ) : (
          <>
            <div>
              <p className="text-sm font-medium text-stone-600 mb-1">Interpretation</p>
              <p className="text-sm text-stone-500">{result.mainHexagram.descriptionEn}</p>
            </div>

            {result.changedHexagram && (
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-sm font-medium text-stone-600 mb-1">Changed Hexagram (变卦)</p>
                <p className="text-stone-800 font-medium">{result.changedHexagram.nameZh}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-stone-500">{result.changedHexagram.pinyin} — {result.changedHexagram.nameEn}</p>
                  <SpeakButton text={result.changedHexagram.nameZh} />
                </div>
                <p className="text-xs text-stone-500 mt-1">{result.changedHexagram.descriptionEn}</p>
              </div>
            )}

            {result.mutualHexagram && (
              <div>
                <p className="text-sm font-medium text-stone-600 mb-1">Mutual Hexagram (互卦)</p>
                <p className="text-sm">{result.mutualHexagram.nameZh} ({result.mutualHexagram.pinyin} — {result.mutualHexagram.nameEn})</p>
              </div>
            )}

            {result.changingLine && (
              <div className="rounded-lg p-4 changing-line-card">
                <p className="text-sm font-medium mb-1 text-accent-warm">Changing Line (动爻) — Position {result.changingLine.position}</p>
                <p className="text-stone-800">{result.changingLine.text}</p>
                <p className="text-xs text-stone-500 mt-1">{result.changingLine.textEn}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
