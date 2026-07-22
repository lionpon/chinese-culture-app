"use client";

import type { DivinationResult } from "@/types";
import SpeakButton from "./SpeakButton";
import PaywallOverlay from "./PaywallOverlay";
import EmailCaptureForm from "./EmailCaptureForm";

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

        {/* Hexagram identity — English-first */}
        <div className="text-center border-t border-stone-100 pt-4">
          <p className="text-2xl font-bold text-accent">{result.mainHexagram.nameEn}</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <p className="text-base text-stone-500">{result.mainHexagram.nameZh} · {result.mainHexagram.pinyin}</p>
            <SpeakButton text={result.mainHexagram.nameZh} />
          </div>
        </div>

        {/* Judgment — English as main body, Chinese as citation */}
        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-sm font-medium text-stone-600 mb-1">The Oracle Says</p>
          <p className="text-stone-800 leading-relaxed">{result.mainHexagram.judgmentEn}</p>
          <p className="text-xs text-stone-400 mt-2 italic">卦辞: {result.mainHexagram.judgment}</p>
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
              <p className="text-sm font-medium text-stone-600 mb-1">What This Means for You</p>
              <p className="text-sm text-stone-500 leading-relaxed">{result.mainHexagram.descriptionEn}</p>
            </div>

            {result.changingLine && (
              <div className="rounded-lg p-4 changing-line-card">
                <p className="text-sm font-medium mb-1 text-accent-warm">The Turning Point — Line {result.changingLine.position}</p>
                <p className="text-stone-800 leading-relaxed">{result.changingLine.textEn}</p>
                <p className="text-xs text-stone-400 mt-2 italic">爻辞: {result.changingLine.text}</p>
              </div>
            )}

            {result.changedHexagram && (
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-sm font-medium text-stone-600 mb-1">Where This Is Heading</p>
                <p className="text-stone-800 font-medium">{result.changedHexagram.nameEn}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-stone-400">{result.changedHexagram.nameZh} · {result.changedHexagram.pinyin}</p>
                  <SpeakButton text={result.changedHexagram.nameZh} />
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{result.changedHexagram.descriptionEn}</p>
              </div>
            )}

            {result.mutualHexagram && (
              <div className="text-center text-sm text-stone-500">
                <p>
                  <span className="text-stone-400">Inner dynamics:</span>{" "}
                  {result.mutualHexagram.nameEn}{" "}
                  <span className="text-xs text-stone-400">({result.mutualHexagram.nameZh} · {result.mutualHexagram.pinyin})</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <EmailCaptureForm source="divination" />
    </div>
  );
}
