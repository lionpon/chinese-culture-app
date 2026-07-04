"use client";

import type { DreamInterpretationResult } from "@/types";
import PaywallOverlay from "./PaywallOverlay";
import EmailCaptureForm from "./EmailCaptureForm";
import { useTranslations } from "next-intl";

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

  return (
    <div className="space-y-6">
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
          <span className="mx-2 text-stone-300">|</span>
          <span className="text-base font-normal text-stone-500">
            {dt.freudianTypeEn}
          </span>
        </h3>
        <p className="text-sm text-stone-600 mb-1">{dt.description}</p>
        <p className="text-xs text-stone-500">{dt.descriptionEn}</p>
      </div>

      {/* Gated content: interpretation details */}
      {isFree && purchaseId ? (
        <PaywallOverlay
          purchaseId={purchaseId}
          featureKey1="unlockDream1"
          featureKey2="unlockDream2"
        />
      ) : (
        <>
          {/* Dual Perspective */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zhou Gong Side */}
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

              {zg.symbols.length > 0 && zg.symbols[0].symbol && (
                <div className="space-y-3 mb-4">
                  {zg.symbols.map((s, i) => (
                    <SymbolCard
                      key={i}
                      {...s}
                      borderColor={
                        ["#2D6A4F", "#40916C", "#B7B44D", "#C77D38", "#9B4A3A"][
                          i % 5
                        ]
                      }
                    />
                  ))}
                </div>
              )}

              <div className="card-classic p-4">
                <p className="text-sm text-stone-700 mb-2">
                  {zg.overallInterpretation}
                </p>
                <p className="text-xs text-stone-500 mb-3">
                  {zg.overallInterpretationEn}
                </p>
                {zg.classicalRef && (
                  <div className="border-t border-stone-100 pt-3">
                    <p className="text-xs text-accent italic">{zg.classicalRef}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Freudian Side */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🧠</span>
                <h3 className="text-lg font-semibold text-stone-800">
                  {t("result.freudianTitle")}
                </h3>
                <span className="text-xs text-stone-400">
                  {t("result.freudianSubtitle")}
                </span>
              </div>

              <div className="card-classic p-4 mb-4">
                <h4 className="text-sm font-semibold text-stone-700 mb-2">
                  {t("result.latentMeaning")}
                </h4>
                <p className="text-sm text-stone-700 mb-1">{fd.latentMeaning}</p>
                <p className="text-xs text-stone-500">{fd.latentMeaningEn}</p>
              </div>

              {fd.wishFulfillment && (
                <div className="card-classic p-4 mb-4">
                  <h4 className="text-sm font-semibold text-stone-700 mb-2">
                    {t("result.wishFulfillment")}
                  </h4>
                  <p className="text-sm text-stone-700 mb-1">{fd.wishFulfillment}</p>
                  <p className="text-xs text-stone-500">{fd.wishFulfillmentEn}</p>
                </div>
              )}

              {fd.keySymbols.length > 0 && (
                <div className="space-y-2">
                  {fd.keySymbols.map((s, i) => (
                    <div key={i} className="bg-white border border-stone-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-stone-700">
                          {s.symbol}
                        </span>
                        <span className="text-xs text-stone-400">{s.symbolEn}</span>
                      </div>
                      <p className="text-xs text-stone-600 mb-1">{s.analysis}</p>
                      <p className="text-xs text-stone-500">{s.analysisEn}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Jungian (if present) */}
          {result.jungian && (
            <div className="card-classic p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔮</span>
                <h3 className="text-sm font-semibold text-stone-800">
                  {t("result.jungianTitle")}
                </h3>
              </div>
              {result.jungian.archetypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {result.jungian.archetypes.map((a, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-stone-700 mb-1">
                {result.jungian.compensation}
              </p>
              <p className="text-xs text-stone-500">
                {result.jungian.compensationEn}
              </p>
            </div>
          )}

          {/* Overview */}
          <div className="card-classic p-5">
            <h3 className="text-sm font-semibold text-stone-800 mb-3 text-center">
              {t("result.overview")}
            </h3>
            <p className="text-sm text-stone-700 mb-2">{result.overview.text}</p>
            <p className="text-xs text-stone-500 mb-3">{result.overview.textEn}</p>
            {result.overview.classicalRef && (
              <div className="border-t border-stone-100 pt-3">
                <p className="text-xs text-accent italic">
                  {result.overview.classicalRef}
                </p>
              </div>
            )}
          </div>

          {/* Advice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white border border-stone-200 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">
                {t("result.practicalAdvice")}
              </h4>
              <p className="text-sm text-stone-700 mb-1">
                {result.advice.practical}
              </p>
              <p className="text-xs text-stone-500">{result.advice.practicalEn}</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">
                {t("result.psychologicalAdvice")}
              </h4>
              <p className="text-sm text-stone-700 mb-1">
                {result.advice.psychological}
              </p>
              <p className="text-xs text-stone-500">
                {result.advice.psychologicalEn}
              </p>
            </div>
          </div>
        </>
      )}

      <EmailCaptureForm source="dream-interpretation" />
    </div>
  );
}
