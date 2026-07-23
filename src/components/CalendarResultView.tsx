"use client";

import type { CalendarResult } from "@/types";
import PaywallOverlay from "./PaywallOverlay";
import EmailCaptureForm from "./EmailCaptureForm";

function DayCard({ day, isLocked }: { day: CalendarResult["auspiciousDays"][0]; isLocked?: boolean }) {
  const lockedStyle: React.CSSProperties = isLocked ? {
    filter: "blur(6px)",
    userSelect: "none",
    pointerEvents: "none",
    opacity: 0.4,
  } : {};

  return (
    <div className="card-classic p-4 sm:p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xl font-bold text-accent">{day.date}</p>
        {day.score != null && (
          <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
            Score: {day.score}/100
          </span>
        )}
      </div>
      <p className="text-sm text-stone-500 mb-3">{day.lunarDate}</p>
      <div style={lockedStyle}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
          <div>
            <p className="text-stone-400 text-xs">Heavenly Stems & Branches</p>
            <p>{day.ganzhi ? `${day.ganzhi.year} ${day.ganzhi.month} ${day.ganzhi.day}` : "—"}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs">Jianchu / Constellation</p>
            <p>{day.jianchu ? `${day.jianchu} / ${day.constellation}` : "—"}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
          <div>
            <p className="text-xs font-medium text-accent">Suitable 宜</p>
            <p className="text-accent">{day.suitable?.join("、") || "—"}</p>
            <p className="text-xs mt-0.5 opacity-60 text-accent">{day.suitableEn?.join(" / ") || ""}</p>
          </div>
          <div>
            <p className="text-stone-500 text-xs font-medium">Unsuitable 忌</p>
            <p className="text-stone-600">{day.unsuitable?.join("、") || "—"}</p>
            <p className="text-stone-500/60 text-xs mt-0.5">{day.unsuitableEn?.join(" / ") || ""}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-accent">
          Auspicious gods: {day.gods?.join("、") || "—"}
        </p>
        <div className="mt-3 pt-3 border-t border-stone-100">
          <p className="text-xs font-medium mb-2 text-accent">Auspicious Hours 吉时</p>
          <div className="flex flex-wrap gap-1">
            {day.hours?.map(h => (
              <span key={h.branch} className="text-xs px-2 py-1 rounded border"
                style={h.auspicious ? { color: "var(--gold)", backgroundColor: "var(--gold-subtle)", borderColor: "var(--border-strong)" } : { color: "var(--text-dim)", backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
                title={`${h.label} (${h.labelEn}) — ${h.auspicious ? "Auspicious" : "Inauspicious"}`}>
                {h.label} <span className="opacity-60">{h.time}</span>
              </span>
            )) || <span className="text-xs text-stone-400">—</span>}
          </div>
        </div>
      </div>
      {isLocked && (
        <div className="text-center mt-2">
          <p className="text-xs font-medium" style={{ color: "var(--gold)" }}>🔒 Unlock full details for $1</p>
        </div>
      )}
    </div>
  );
}

export default function CalendarResultView({
  result,
  isFree,
  purchaseId,
}: {
  result: CalendarResult;
  isFree?: boolean;
  purchaseId?: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">Auspicious Dates</h1>
      <div className="space-y-4">
        {/* Free preview: show top date with blurred details */}
        {isFree && result.auspiciousDays.length > 0 && (
          <DayCard day={result.auspiciousDays[0]} isLocked={true} />
        )}

        {/* Paywall for free users — unlocks all dates + full details */}
        {isFree && purchaseId && (
          <PaywallOverlay
            purchaseId={purchaseId}
            featureKey1="unlockCalendar1"
            featureKey2="unlockCalendar2"
          />
        )}

        {/* Paid: show all dates normally */}
        {!isFree && result.auspiciousDays.map((day, i) => (
          <DayCard key={i} day={day} />
        ))}
      </div>
      <EmailCaptureForm source="calendar" />
    </div>
  );
}

