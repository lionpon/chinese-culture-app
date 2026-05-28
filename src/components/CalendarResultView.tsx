"use client";

import type { CalendarResult } from "@/types";

export default function CalendarResultView({ result }: { result: CalendarResult }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6 text-accent">Auspicious Dates</h1>
      <div className="space-y-4">
        {result.auspiciousDays.map((day, i) => (
          <div key={i} className="card-classic p-4 sm:p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl font-bold text-accent">{day.date}</p>
              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                Score: {day.score}/100
              </span>
            </div>
            <p className="text-sm text-stone-500 mb-3">{day.lunarDate}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
              <div>
                <p className="text-stone-400 text-xs">Heavenly Stems & Branches</p>
                <p>{day.ganzhi.year} {day.ganzhi.month} {day.ganzhi.day}</p>
              </div>
              <div>
                <p className="text-stone-400 text-xs">Jianchu / Constellation</p>
                <p>{day.jianchu} / {day.constellation}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
              <div>
                <p className="text-xs font-medium text-accent">Suitable 宜</p>
                <p className="text-accent">{day.suitable.join("、")}</p>
                <p className="text-xs mt-0.5 opacity-60 text-accent">{day.suitableEn?.join(" / ")}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs font-medium">Unsuitable 忌</p>
                <p className="text-stone-600">{day.unsuitable.join("、")}</p>
                <p className="text-stone-500/60 text-xs mt-0.5">{day.unsuitableEn?.join(" / ")}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-accent">
              Auspicious gods: {day.gods.join("、")}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-100">
              <p className="text-xs font-medium mb-2 text-accent">Auspicious Hours 吉时</p>
              <div className="flex flex-wrap gap-1">
                {day.hours.map(h => (
                  <span key={h.branch} className="text-xs px-2 py-1 rounded border"
                    style={h.auspicious ? { color: "var(--accent)", backgroundColor: "var(--accent-muted)", borderColor: "rgba(155,74,58,0.25)" } : { color: "#A4958A", backgroundColor: "#F5F3F0", borderColor: "#E8E4DF" }}
                    title={`${h.label} (${h.labelEn}) — ${h.auspicious ? "Auspicious" : "Inauspicious"}`}>
                    {h.label} <span className="opacity-60">{h.time}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
