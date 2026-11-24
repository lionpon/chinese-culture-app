"use client";

import { useTranslations } from "next-intl";

export interface BaziPillar {
  label: string; stem: string; branch: string; wuxing: string; element: string;
}
export interface BaziChartData {
  dayMaster: { wuxing: string; element: string; heavenlyStem: string };
  elements: { element: string; elementEn: string; count: number }[];
  maxCount: number;
  favorable: { element: string; elementEn: string }[];
  strongest: { element: string; elementEn: string };
  pillars?: BaziPillar[];
}

const ELEMENT_COLORS: Record<string, string> = {
  Wood: "#4A9E4A", Fire: "#E0554A", Earth: "#C4A44A", Metal: "#D4C45A", Water: "#4A90D9",
};
const ELEMENT_EMOJI: Record<string, string> = {
  Wood: "🌳", Fire: "🔥", Earth: "🏔️", Metal: "⚜️", Water: "💧",
};

/** 五行环 SVG（响应式, 手机/桌面通用） */
export function ElementWheel({ elements, dayMaster, size = 200 }: {
  elements: { elementEn: string; count: number }[]; dayMaster: { element: string }; size?: number;
}) {
  const total = elements.reduce((a, e) => a + e.count, 0) || 1;
  const r = 80, cx = 100, cy = 100, stroke = 34;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const segments = elements.map((el) => {
    const frac = el.count / total;
    const seg = { ...el, frac, dash: frac * circ, offset };
    offset += frac * circ;
    return seg;
  });
  return (
    <svg viewBox="0 0 200 200" width="100%" style={{ maxWidth: size }} aria-label="Five elements chart">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-surface)" strokeWidth={stroke} />
      {segments.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r} fill="none"
          stroke={ELEMENT_COLORS[s.elementEn] || "#999"}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${circ - s.dash}`}
          strokeDashoffset={-s.offset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22">{ELEMENT_EMOJI[dayMaster.element] || "✨"}</text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="13" fill="var(--text-muted)">{dayMaster.element}</text>
    </svg>
  );
}


/**
 * 命盘图表卡 — 2026-10-28 竞品调研交付②（预注册 WORK_LOG_2026-10-28 §⑦）
 * Astro-Charts 模式：免费预览给"看得见的命盘"（四柱 + 五行环）。
 * 2026-11-24 处置：download/share 按钮 4 周 0 次使用 → 预注册阈值（≥5/4 周）未达成证伪 → 移除按钮，
 * 保留图表展示（preview_bazi 仍在使用中）。事件 bazi_chart_download/share 退役。
 */
export default function BaziChartCard({ data }: { data: BaziChartData }) {
  const t = useTranslations("naming");

  const pillars = data.pillars || [];
  const pillarLabels: Record<string, string> = {
    year: t("chart.year"), month: t("chart.month"), day: t("chart.day"), hour: t("chart.hour"),
  };

  return (
    <div className="mb-3">
      <p className="text-xs font-medium text-stone-500 mb-2">{t("chart.title")}</p>

      {pillars.length === 4 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {pillars.map((p) => (
            <div key={p.label} className="rounded-lg p-2 text-center border" style={{ borderColor: ELEMENT_COLORS[p.element] || "#999" }}>
              <p className="text-[10px] tracking-wide" style={{ color: "var(--text-muted)" }}>{pillarLabels[p.label] || p.label}</p>
              <p className="text-xl font-bold" style={{ color: ELEMENT_COLORS[p.element] || "#999" }}>{p.stem}{p.branch}</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{p.element} {p.wuxing}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
        <div className="w-full sm:w-1/2 max-w-[220px]">
          <ElementWheel elements={data.elements.map(e => ({ elementEn: e.elementEn, count: e.count }))} dayMaster={data.dayMaster} />
        </div>
        <div className="w-full sm:w-1/2 space-y-1">
          {data.elements.map((el) => (
            <div key={el.element} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: ELEMENT_COLORS[el.elementEn] || "#999" }} />
              <span style={{ color: "var(--text-body)" }}>{el.elementEn} {el.element}</span>
              <span className="ml-auto" style={{ color: "var(--text-muted)" }}>×{el.count}</span>
            </div>
          ))}
          <p className="text-[11px] pt-1" style={{ color: "var(--text-muted)" }}>
            {t("chart.dayMaster")}: {data.dayMaster.heavenlyStem} · {data.dayMaster.element}
          </p>
        </div>
      </div>
    </div>
  );
}
