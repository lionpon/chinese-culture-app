"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { trackClick } from "@/lib/track";

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
 * 命盘图表 + 分享卡片 — 2026-10-28 竞品调研交付②（预注册 WORK_LOG_2026-10-28 §⑦）
 * Astro-Charts 模式：免费预览给"看得见的命盘"（四柱 + 五行环），可下载/分享。
 * 事件: bazi_chart_download / bazi_chart_share
 */
export default function BaziChartCard({ data }: { data: BaziChartData }) {
  const t = useTranslations("naming");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const pillars = data.pillars || [];
  const pillarLabels: Record<string, string> = {
    year: t("chart.year"), month: t("chart.month"), day: t("chart.day"), hour: t("chart.hour"),
  };

  function drawCard(): HTMLCanvasElement {
    const W = 720, H = 900;
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      canvasRef.current = canvas;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.fillStyle = "#C9A96E";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText(t("chart.title"), W / 2, 80);
    ctx.fillStyle = "#9b9bb0";
    ctx.font = "22px sans-serif";
    ctx.fillText("culture-of-china.com", W / 2, 120);
    const total = data.elements.reduce((a, e) => a + e.count, 0) || 1;
    const r = 130, cx = W / 2, cy = 300, stroke = 56;
    let offset = 0;
    for (const el of data.elements) {
      const frac = el.count / total;
      ctx.beginPath();
      ctx.strokeStyle = ELEMENT_COLORS[el.elementEn] || "#999";
      ctx.lineWidth = stroke;
      ctx.arc(cx, cy, r, -Math.PI / 2 + offset * 2 * Math.PI, -Math.PI / 2 + (offset + frac) * 2 * Math.PI);
      ctx.stroke();
      offset += frac;
    }
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px sans-serif";
    ctx.fillText(ELEMENT_EMOJI[data.dayMaster.element] || "✨", cx, cy - 8);
    ctx.fillStyle = "#C9A96E";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(t("chart.dayMaster") + " · " + data.dayMaster.element, cx, cy + 46);
    let ly = 470;
    for (const el of data.elements) {
      ctx.fillStyle = ELEMENT_COLORS[el.elementEn] || "#999";
      ctx.beginPath(); ctx.arc(cx - 240, ly, 10, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = "#e8e8f0";
      ctx.textAlign = "left";
      ctx.font = "24px sans-serif";
      ctx.fillText(el.elementEn + " " + el.element + " · " + el.count, cx - 210, ly + 8);
      ly += 42;
    }
    if (pillars.length === 4) {
      const boxW = 150, gap = 20, x0 = (W - (boxW * 2 + gap)) / 2;
      const py = ly + 20;
      pillars.forEach((p, i) => {
        const bx = x0 + (i % 2) * (boxW + gap);
        const by = py + Math.floor(i / 2) * 110;
        ctx.strokeStyle = ELEMENT_COLORS[p.element] || "#999";
        ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, boxW, 92);
        ctx.fillStyle = "#ffffff";
        ctx.font = "34px sans-serif";
        ctx.fillText(p.stem + p.branch, bx + boxW / 2, by + 42);
        ctx.fillStyle = "#9b9bb0";
        ctx.font = "18px sans-serif";
        ctx.fillText((pillarLabels[p.label] || p.label) + " · " + p.element, bx + boxW / 2, by + 72);
      });
    }
    ctx.fillStyle = "#9b9bb0";
    ctx.textAlign = "center";
    ctx.font = "18px sans-serif";
    ctx.fillText(t("chart.disclaimer"), W / 2, H - 40);
    return canvas;
  }

  function download() {
    const canvas = drawCard();
    trackClick("bazi_chart_download");
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "five-elements-chart.png";
    a.click();
  }

  async function share() {
    trackClick("bazi_chart_share");
    const canvas = drawCard();
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const file = blob ? new File([blob], "five-elements-chart.png", { type: "image/png" }) : null;
    if (navigator.share && file) {
      try {
        await navigator.share({ title: t("chart.title"), text: t("chart.shareText", { element: data.dayMaster.element }), files: [file] });
        return;
      } catch { /* cancelled — fall through to copy */ }
    }
    try {
      await navigator.clipboard.writeText(t("chart.shareText", { element: data.dayMaster.element }));
    } catch { /* clipboard unavailable */ }
  }

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

      <div className="flex gap-2">
        <button onClick={download} className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-colors"
          style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)", minHeight: "2.5rem" }}>
          ⬇ {t("chart.download")}
        </button>
        <button onClick={share} className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-colors"
          style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)", minHeight: "2.5rem" }}>
          ↗ {t("chart.share")}
        </button>
      </div>
    </div>
  );
}
