"use client";

import { useEffect, useRef } from "react";
import type { DreamInterpretationResult } from "@/types";
import PaywallOverlay from "./PaywallOverlay";
import EmailCaptureForm from "./EmailCaptureForm";
import DownloadPDF from "./DownloadPDF";
import { useTranslations } from "next-intl";
import { trackClick } from "@/lib/track";

const CATEGORY_COLORS: Record<string, string> = {
  "正梦": "#E8F5E9",
  "噩梦": "#FBE9E7",
  "思梦": "#E3F2FD",
  "寤梦": "#FFF8E1",
  "喜梦": "#F3E5F5",
  "惧梦": "#FCE4EC",
};

function SymbolCard({
  symbol,
  symbolEn,
  meaning,
  meaningEn,
  classicalRef,
  borderColor,
}: {
  symbol: string;
  symbolEn: string;
  meaning: string;
  meaningEn: string;
  classicalRef?: string;
  borderColor: string;
}) {
  return (
    <div
      className="bg-white rounded-xl p-4 border-l-2"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-bold text-stone-800">{symbol}</span>
        <span className="text-xs text-stone-400">{symbolEn}</span>
      </div>
      <p className="text-sm text-stone-700 mb-1">{meaning}</p>
      <p className="text-xs text-stone-500">{meaningEn}</p>
      {classicalRef && (
        <p className="mt-2 text-xs text-accent italic">{classicalRef}</p>
      )}
    </div>
  );
}

export default function DreamInterpretationResultView({
  result,
  isFree,
  purchaseId,
}: {
  result: DreamInterpretationResult;
  isFree?: boolean;
  purchaseId?: string;
}) {
  const t = useTranslations("dream");

  const dt = result.dreamType;
  const zg = result.zhouGong;
  const fd = result.freudian;
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackClick(isFree ? "result_free_dream" : "result_viewed_dream");
  }, [isFree]);

  return (
    <div className="space-y-6">
      {!isFree && (
        <div className="flex justify-end">
          <DownloadPDF
            filename={`dream-interpretation-${dt.chineseCategoryEn?.toLowerCase()?.replace(/\s+/g, "-") || "reading"}`}
            title="Your Dream Interpretation"
            resultRef={resultRef}
          />
        </div>
      )}
      <div ref={resultRef}>
      {/* Dream Type Banner */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{
          backgroundColor: CATEGORY_COLORS[dt.chineseCategory] || "#F5F0E8",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">
          {t("result.dreamType")}
        </p>
        <h3 className="text-xl font-bold text-stone-800 mb-1">
          {dt.chineseCategoryEn}{" "}
          <span className="text-base font-normal text-stone-500">
            ({dt.chineseCategory})
          </span>
          <span className="mx-2 text-stone-400">|</span>
          <span className="text-base font-normal text-stone-500">
            {dt.freudianTypeEn}
          </span>
        </h3>
        <p className="text-sm text-stone-600 mb-1">{dt.description}</p>
        <p className="text-xs text-stone-500">{dt.descriptionEn}</p>
      </div>

      {/* 2: Overview — the verdict, moved to top */}
      <div className="card-classic p-5 text-center" style={{ borderColor: "var(--border-strong)" }}>
        <p className="text-xs font-medium mb-2 uppercase tracking-wide text-stone-400">{t("result.overview")}</p>
        <p className="text-sm font-semibold leading-relaxed mb-2" style={{ color: "var(--text-primary)" }}>{result.overview.textEn}</p>
        <p className="text-xs text-stone-500 mb-3">{result.overview.text}</p>
        {result.overview.classicalRef && (
          <div className="border-t border-stone-100 pt-3">
            <p className="text-xs text-accent italic">
              {result.overview.classicalRef}
            </p>
          </div>
        )}
      </div>

      {/* Free preview: 1 Zhou Gong symbol + partial interpretation, then paywall */}
      {isFree && purchaseId ? (
        <>
          {zg.symbols.length > 0 && zg.symbols[0].symbol && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏮</span>
                <h3 className="text-lg font-semibold text-stone-800">
                  {t("result.zhouGongTitle")}
                </h3>
                <span className="text-xs text-stone-400">
                  {t("result.zhouGongSubtitle")}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <SymbolCard
                  {...zg.symbols[0]}
                  borderColor="#2D6A4F"
                />
              </div>

              {(zg.overallInterpretation || zg.overallInterpretationEn) && (
                <div className="card-classic p-4 mb-6">
                  {zg.overallInterpretation && (
                    <p className="text-sm text-stone-700 mb-2">{zg.overallInterpretation}</p>
                  )}
                  {zg.overallInterpretationEn && (
                    <p className="text-xs text-stone-500">{zg.overallInterpretationEn}</p>
                  )}
                </div>
              )}
            </div>
          )}
          <PaywallOverlay
            purchaseId={purchaseId}
            featureKey1="unlockDream1"
            featureKey2="unlockDream2"
          />
        </>
      ) : (
        <>
              {/* === PAID: Narrative-first layout === */}
          <>
            {/* The Synthesis — what your dream is telling you, in one flowing read */}
            <div className="card-classic p-5" style={{ borderColor: "var(--border-strong)" }}>
              <p className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: "var(--gold)" }}>
                🔮 What Your Dream Is Telling You
              </p>

              {/* Zhou Gong narrative */}
              {zg.overallInterpretationEn && (
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-body)" }}>
                  {zg.overallInterpretationEn}
                </p>
              )}

              {/* Freudian narrative */}
              {fd.latentMeaningEn && (
                <p className="text-sm leading-relaxed mb-1" style={{ color: "var(--text-body)" }}>
                  {fd.latentMeaningEn}
                </p>
              )}
              {fd.wishFulfillmentEn && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                  {fd.wishFulfillmentEn}
                </p>
              )}

              {/* Jungian (woven in) */}
              {result.jungian?.compensationEn && (
                <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--text-body)" }}>
                  {result.jungian.compensationEn}
                </p>
              )}

              {/* Classical reference */}
              {(zg.classicalRef || result.overview.classicalRef) && (
                <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <p className="text-xs italic" style={{ color: "var(--text-dim)" }}>
                    {zg.classicalRef || result.overview.classicalRef}
                  </p>
                </div>
              )}
            </div>

            {/* Key Symbols — when relevant */}
            {zg.symbols.length > 0 && zg.symbols[0].symbol && (
              <details className="card-classic p-4 cursor-pointer group" open>
                <summary className="text-sm font-medium text-stone-600 select-none">
                  🏮 Dream Symbols Decoded ({zg.symbols.length})
                </summary>
                <div className="mt-3 space-y-2">
                  {zg.symbols.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
                      <span className="text-lg flex-shrink-0">{s.symbol}</span>
                      <div>
                        <p className="text-xs font-medium text-stone-500 mb-0.5">{s.symbolEn}</p>
                        <p className="text-sm text-stone-700">{s.meaningEn}</p>
                        {s.classicalRef && (
                          <p className="text-xs text-accent italic mt-1">{s.classicalRef}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Freudian key symbols */}
            {fd.keySymbols.length > 0 && (
              <details className="card-classic p-4 cursor-pointer group">
                <summary className="text-sm font-medium text-stone-600 select-none">
                  🧠 Through a Psychological Lens
                </summary>
                <div className="mt-3 space-y-2">
                  {fd.keySymbols.map((s, i) => (
                    <div key={i} className="bg-stone-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-stone-500 mb-1">
                        {s.symbolEn || s.symbol}
                      </p>
                      <p className="text-sm text-stone-700">{s.analysisEn}</p>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Jungian archetypes */}
            {result.jungian?.archetypes && result.jungian.archetypes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 px-1">
                <span className="text-xs text-stone-400">Archetypes present:</span>
                {result.jungian.archetypes.map((a, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {a}
                  </span>
                ))}
              </div>
            )}

            {/* Advice — separate, actionable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.advice.practicalEn && (
                <div className="bg-white border border-stone-200 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">
                    {t("result.practicalAdvice")}
                  </h4>
                  <p className="text-sm text-stone-700">{result.advice.practicalEn}</p>
                </div>
              )}
              {result.advice.psychologicalEn && (
                <div className="bg-white border border-stone-200 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">
                    {t("result.psychologicalAdvice")}
                  </h4>
                  <p className="text-sm text-stone-700">{result.advice.psychologicalEn}</p>
                </div>
              )}
            </div>
          </>
        </>
      )}

      <EmailCaptureForm source="dream-interpretation" />
      </div>
    </div>
  );
}
