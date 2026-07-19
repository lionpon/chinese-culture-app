"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";

type ToolType = "zodiac" | "dateCheck" | "elements" | "iching";

function ZodiacTool() {
  const t = useTranslations("tools");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{animal:string;element:string;compatible:string}|null>(null);
  const ZODIAC = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  const ELEMENTS = ["Metal","Water","Wood","Fire","Earth"];
  function calc() {
    const y = parseInt(year); if (isNaN(y) || y < 1900) return;
    const idx = (y - 4) % 12; const elIdx = ((y - 4) % 10) / 2 | 0;
    setResult({ animal: ZODIAC[idx], element: ELEMENTS[elIdx], compatible: ZODIAC[(idx + 6) % 12] });
    trackClick("guide_tool_zodiac");
  }
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>🐉 {t("zodiacCalculator.title")}</p>
      <div className="flex gap-2 mb-3">
        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder={t("zodiacCalculator.yearPlaceholder")}
          className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none"
          style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)" }} />
        <button onClick={calc} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>{t("zodiacCalculator.submit")}</button>
      </div>
      {result && (
        <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "var(--bg-deep)" }}>
          <p className="text-sm">{t("zodiacCalculator.yourAnimal")}: <strong style={{ color: "var(--gold)" }}>{result.animal}</strong> · {t("zodiacCalculator.element")}: {result.element}</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t("zodiacCalculator.compatible")}: {result.compatible}</p>
        </div>
      )}
      <Link href="/naming" onClick={() => trackClick("guide_tool_cta_zodiac")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("zodiacCalculator.ctaLink")} →</Link>
    </div>
  );
}

function DateCheckTool() {
  const t = useTranslations("calendar");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<string|null>(null);
  function check() {
    if (!date) return;
    const d = new Date(date);
    const ji = (Math.floor((d.getTime() / 86400000)) % 12 + 12) % 12;
    const labels = ["Establish","Remove","Full","Balance","Stable","Initiate","Destroy","Danger","Success","Receive","Open","Close"];
    const auspicious = ["Success","Receive","Open","Balance","Stable"].includes(labels[ji]);
    setResult((auspicious ? "✅ " : "⚠️ ") + labels[ji] + " day" + (auspicious ? " — auspicious" : " — caution advised"));
    trackClick("guide_tool_datecheck");
  }
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>📅 Quick Date Check</p>
      <div className="flex gap-2 mb-3">
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none"
          style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)" }} />
        <button onClick={check} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>Check</button>
      </div>
      {result && <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "var(--bg-deep)" }}><p className="text-sm">{result}</p></div>}
      <Link href="/calendar" onClick={() => trackClick("guide_tool_cta_calendar")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("form.submit")} →</Link>
    </div>
  );
}

function ElementsTool() {
  const t = useTranslations("tools");
  const [step, setStep] = useState<"start"|"q1"|"q2"|"result">("start");
  const [ans, setAns] = useState<number[]>([]);
  const EL = ["Wood","Fire","Earth","Metal","Water"];
  const Q = [
    {q:"What describes you best?", o:["🌳 Creative & Flexible","🔥 Passionate & Bold","🏔️ Stable & Reliable","⚜️ Organized & Precise","💧 Wise & Adaptable"]},
    {q:"What do you value most?", o:["Growth & Learning","Recognition & Fame","Security & Family","Structure & Order","Freedom & Wisdom"]}
  ];
  function answer(i:number) {
    const na = [...ans, i]; setAns(na);
    if (na.length === 1) setStep("q2");
    else if (na.length === 2) { setStep("result"); trackClick("guide_tool_elements"); }
  }
  if (step === "result") {
    const r = EL[(ans[0]+ans[1])%5];
    return (
      <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>{t("fiveElements.title")}</p>
        <div className="rounded-lg p-4 mb-3 text-center" style={{ backgroundColor: "var(--bg-deep)" }}>
          <p className="text-3xl mb-1 font-bold">{r}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t("fiveElements.yourElement")} — {r}</p>
        </div>
        <Link href="/divination" onClick={() => trackClick("guide_tool_cta_elements")}
          className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("fiveElements.ctaDivination")} →</Link>
      </div>
    );
  }
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>{t("fiveElements.title")}</p>
      {step === "start" && <button onClick={() => setStep("q1")} className="w-full py-3 text-sm font-medium rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>{t("fiveElements.seeResult")}</button>}
      {(step === "q1" || step === "q2") && (
        <div>
          <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{t("fiveElements.question")} {step === "q1" ? "1" : "2"}/{t("of")} 2</p>
          <p className="text-sm mb-3" style={{ color: "var(--text-body)" }}>{Q[step === "q1" ? 0 : 1].q}</p>
          <div className="space-y-1.5">
            {Q[step === "q1" ? 0 : 1].o.map((o,i) => (
              <button key={i} onClick={() => answer(i)} className="w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors hover:bg-white/5"
                style={{ borderColor: "var(--border-medium)", color: "var(--text-body)" }}>{o}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IChingTool() {
  const t = useTranslations("home");
  const [data, setData] = useState<{nameZh:string;nameEn:string;pinyin:string;advice:string}|null>(null);
  useEffect(() => {
    fetch("/api/daily").then(r => r.json()).then(d => setData(d.mainHexagram)).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>☯ {t("dailyHexagram.heading")}</p>
      <div className="rounded-lg p-4 mb-3 text-center" style={{ backgroundColor: "var(--bg-deep)" }}>
        <p className="text-2xl font-bold mb-1" style={{ color: "var(--gold)" }}>{data.nameZh}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{data.pinyin} — {data.nameEn}</p>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-body)" }}>{(data.advice||"").slice(0,120)}...</p>
      </div>
      <Link href="/divination" onClick={() => trackClick("guide_tool_cta_iching")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("dailyHexagram.cta")}</Link>
    </div>
  );
}

export default function GuideToolEmbed({ tool }: { tool: ToolType }) {
  if (tool === "zodiac") return <ZodiacTool />;
  if (tool === "dateCheck") return <DateCheckTool />;
  if (tool === "elements") return <ElementsTool />;
  if (tool === "iching") return <IChingTool />;
  return null;
}
