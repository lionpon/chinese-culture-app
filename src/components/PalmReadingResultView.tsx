"use client";

import type { PalmReadingResult, LineAnalysis, MountAnalysis } from "@/types";
import EmailCaptureForm from "./EmailCaptureForm";

const QUALITY_COLORS: Record<string, string> = {
  excellent: "#2D6A4F",
  good: "#40916C",
  fair: "#B7B44D",
  poor: "#C77D38",
};
const QUALITY_LABELS: Record<string, string> = {
  excellent: "Excellent 上吉",
  good: "Good 吉",
  fair: "Fair 平",
  poor: "Weak 弱",
};

const ELEMENT_COLORS: Record<string, string> = {
  "金": "#F5F0E8",
  "木": "#E8F5E9",
  "水": "#E3F2FD",
  "火": "#FBE9E7",
  "土": "#FFF8E1",
};

function LineCard({ title, titleEn, line }: { title: string; titleEn: string; line: LineAnalysis }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-semibold text-stone-800 text-sm">{title}</h4>
          <p className="text-xs text-stone-400">{titleEn}</p>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: QUALITY_COLORS[line.quality] + "20", color: QUALITY_COLORS[line.quality] }}
        >
          {QUALITY_LABELS[line.quality]}
        </span>
      </div>
      <p className="text-sm text-stone-700 mb-1">{line.description}</p>
      <p className="text-xs text-stone-500">{line.descriptionEn}</p>
      {line.classicalRef && (
        <p className="mt-2 text-xs text-accent italic">{line.classicalRef}</p>
      )}
    </div>
  );
}

function MountBadge({ mount }: { mount: MountAnalysis }) {
  return (
    <div className="bg-white border border-stone-200 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <h5 className="text-xs font-semibold text-stone-700">{mount.name}</h5>
      </div>
      <p className="text-xs text-stone-400 mb-1">{mount.nameEn}</p>
      <span className="text-xs text-stone-500 bg-stone-50 px-2 py-0.5 rounded">{mount.condition}</span>
      <p className="text-xs text-stone-600 mt-1.5">{mount.meaning}</p>
      <p className="text-xs text-stone-400">{mount.meaningEn}</p>
    </div>
  );
}

export default function PalmReadingResultView({ result, isFree: _isFree, purchaseId: _purchaseId }: { result: PalmReadingResult; isFree?: boolean; purchaseId?: string }) {
  void _isFree; void _purchaseId;
  const h = result.handType;
  const bg = ELEMENT_COLORS[h.element] || "#F5F0E8";

  return (
    <div className="space-y-6">
      {/* Hand Type Banner */}
      <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: bg, border: "1px solid rgba(0,0,0,0.06)" }}>
        <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Hand Type · 五行手型</p>
        <h3 className="text-xl font-bold text-stone-800 mb-1">
          {h.elementEn} Type <span className="text-base font-normal text-stone-500">({h.element}形手)</span>
        </h3>
        <p className="text-sm text-stone-600 mb-1">{h.description}</p>
        <p className="text-xs text-stone-500">{h.descriptionEn}</p>
      </div>

      {/* Three Lines */}
      <div>
        <h3 className="text-sm font-semibold text-stone-800 mb-3 text-center">
          Three Talent Lines · 三才纹
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <LineCard
            title="Life Line · 地纹"
            titleEn="Health & Vitality"
            line={result.threeLines.lifeLine}
          />
          <LineCard
            title="Head Line · 人纹"
            titleEn="Wisdom & Career"
            line={result.threeLines.headLine}
          />
          <LineCard
            title="Heart Line · 天纹"
            titleEn="Emotion & Status"
            line={result.threeLines.heartLine}
          />
        </div>
      </div>

      {/* Auxiliary Lines */}
      {Object.keys(result.auxiliaryLines).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-800 mb-3 text-center">
            Auxiliary Lines · 辅助纹
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.auxiliaryLines.fateLine && (
              <LineCard
                title="Fate Line · 玉柱纹"
                titleEn="Career Path"
                line={result.auxiliaryLines.fateLine}
              />
            )}
            {result.auxiliaryLines.marriageLine && (
              <LineCard
                title="Marriage Line · 婚姻线"
                titleEn="Relationships"
                line={result.auxiliaryLines.marriageLine}
              />
            )}
            {result.auxiliaryLines.sunLine && (
              <LineCard
                title="Sun Line · 太阳线"
                titleEn="Success & Fame"
                line={result.auxiliaryLines.sunLine}
              />
            )}
            {result.auxiliaryLines.healthLine && (
              <LineCard
                title="Health Line · 健康线"
                titleEn="Wellness"
                line={result.auxiliaryLines.healthLine}
              />
            )}
          </div>
        </div>
      )}

      {/* Mounts */}
      <div>
        <h3 className="text-sm font-semibold text-stone-800 mb-3 text-center">
          Nine Palaces · 掌中九宫
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {result.mounts.map((m, i) => (
            <MountBadge key={i} mount={m} />
          ))}
        </div>
      </div>

      {/* Overall Judgment */}
      <div className="card-classic p-5">
        <h3 className="text-sm font-semibold text-stone-800 mb-3 text-center">
          Overall Judgment · 综合判断
        </h3>
        <p className="text-sm text-stone-700 mb-2">{result.overallJudgment.text}</p>
        <p className="text-xs text-stone-500 mb-3">{result.overallJudgment.textEn}</p>
        <div className="border-t border-stone-100 pt-3">
          <p className="text-xs text-accent italic">{result.overallJudgment.classicalRef}</p>
        </div>
      </div>

      {/* Advice */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(["career", "love", "health"] as const).map((key) => (
          <div key={key} className="bg-white border border-stone-200 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-stone-500 uppercase mb-2">
              {key === "career" ? "Career · 事业" : key === "love" ? "Love · 感情" : "Health · 健康"}
            </h4>
            <p className="text-sm text-stone-700 mb-1">{result.advice[key]}</p>
            <p className="text-xs text-stone-500">{result.advice[`${key}En` as keyof typeof result.advice]}</p>
          </div>
        ))}
      </div>
      <EmailCaptureForm source="palm-reading" />
    </div>
  );
}
