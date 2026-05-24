"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { NamingResult, CalendarResult, DivinationResult } from "@/types";

type ResultState = "loading" | "completed" | "failed";

function SuccessContent() {
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchase_id");

  const [state, setState] = useState<ResultState>("loading");
  const [type, setType] = useState<string>("");
  const [result, setResult] = useState<NamingResult | CalendarResult | DivinationResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!purchaseId) {
      setError("Missing purchase ID. Please try again.");
      setState("failed");
      return;
    }

    let attempts = 0;
    const maxAttempts = 30;

    const poll = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/result?purchase_id=${purchaseId}`);
        const data = await res.json();

        if (data.status === "completed") {
          clearInterval(poll);
          setState("completed");
          setType(data.type);
          setResult(data.result);
        } else if (data.status === "failed") {
          clearInterval(poll);
          setState("failed");
          setError(data.error || "Processing failed.");
        }
      } catch {
        // Keep polling
      }

      if (attempts >= maxAttempts) {
        clearInterval(poll);
        setState("failed");
        setError("Result is taking longer than expected. Your reading will be processed — please check back or contact support.");
      }
    }, 2000);

    return () => clearInterval(poll);
  }, [purchaseId]);

  if (!purchaseId) {
    return <div className="text-center py-16 text-red-600">Missing purchase ID. Please try your request again.</div>;
  }

  if (state === "loading") {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-stone-300 border-t-stone-500 rounded-full mx-auto mb-4" />
        <p className="text-stone-500">Payment received. Preparing your reading...</p>
        <p className="text-xs text-stone-400 mt-2">This usually takes a few seconds.</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">Something went wrong</p>
        <p className="text-stone-500 text-sm mt-2">{error || "Please contact support."}</p>
        <a href="/" className="inline-block mt-4 text-stone-600 underline text-sm hover:text-stone-800">Return to Home</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {type === "naming" && result && <NamingResultView result={result as NamingResult} />}
      {type === "calendar" && result && <CalendarResultView result={result as CalendarResult} />}
      {type === "divination" && result && <DivinationResultView result={result as DivinationResult} />}
      <p className="text-center text-xs text-stone-400 mt-8">
        For cultural appreciation only. Decisions are your own responsibility. Payments are voluntary contributions for app maintenance.
      </p>
    </div>
  );
}

function SpeakButton({ text }: { text: string }) {
  function speak() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.6;
    window.speechSynthesis.speak(u);
  }
  return (
    <button onClick={speak} className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 transition-colors" title="Listen to pronunciation">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.8l4.7-3.5a.5.5 0 01.8.4v12.6a.5.5 0 01-.8.4L6.5 15.2H3.2a1 1 0 01-1-1v-4.4a1 1 0 011-1h3.3z" />
      </svg>
      Listen
    </button>
  );
}

function NamingResultView({ result }: { result: NamingResult }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--accent)" }}>Your Chinese Name</h1>
      <div className="space-y-4">
          {result.options.map((opt, i) => (
          <div key={i} className="card-classic p-4 sm:p-6">
            <div className="text-center mb-3">
              <p className="text-3xl font-bold" style={{ color: "var(--accent)" }}>{opt.characters}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-lg text-stone-500">{opt.pinyin}</p>
                <SpeakButton text={opt.characters} />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-stone-400">Meaning:</span> {opt.meaning}</p>
              <p><span className="text-stone-400">Elements:</span> {opt.wuxing}</p>
              <p><span className="text-stone-400">Source:</span> {opt.source}</p>
              {opt.sourceText && (
                <p className="text-stone-500 italic">{opt.sourceText}</p>
              )}
            </div>
            {i === 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
                <strong>Recommended</strong> — Best match for your elemental profile
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
        <p className="font-medium mb-1">Bazi Analysis</p>
        <p>{result.baziAnalysis.analysis}</p>
        <p className="mt-1">{result.baziAnalysis.analysisEn}</p>
      </div>
    </div>
  );
}

function CalendarResultView({ result }: { result: CalendarResult }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--accent)" }}>Auspicious Dates</h1>
      <p className="text-xs text-stone-400 text-center -mt-4 mb-4">
        For cultural appreciation only. Scheduling decisions are your own responsibility.
      </p>
      <div className="space-y-4">
        {result.auspiciousDays.map((day, i) => (
          <div key={i} className="card-classic p-4 sm:p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{day.date}</p>
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
                <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>Suitable 宜</p>
                <p style={{ color: "var(--accent)" }}>{day.suitable.join("、")}</p>
                <p className="text-xs mt-0.5 opacity-60" style={{ color: "var(--accent)" }}>{day.suitableEn?.join(" / ")}</p>
              </div>
              <div>
                <p className="text-stone-500 text-xs font-medium">Unsuitable 忌</p>
                <p className="text-stone-600">{day.unsuitable.join("、")}</p>
                <p className="text-stone-500/60 text-xs mt-0.5">{day.unsuitableEn?.join(" / ")}</p>
              </div>
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--accent)" }}>
              Auspicious gods: {day.gods.join("、")}
            </p>
            <div className="mt-3 pt-3 border-t border-stone-100">
              <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>Auspicious Hours 吉时</p>
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

function DivinationResultView({ result }: { result: DivinationResult }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "var(--accent)" }}>Your I Ching Reading</h1>
      <div className="card-classic p-6 space-y-5">
        <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, var(--accent-muted), var(--gold-muted))", border: "1px solid rgba(155,74,58,0.15)" }}>
          <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--accent)" }}>Guidance for You</p>
          <p className="text-sm text-stone-800 leading-relaxed">{result.mainHexagram.advice}</p>
          <p className="text-xs text-stone-400 mt-3 pt-3 border-t border-stone-300/50">
            For cultural appreciation only. Decisions are your own responsibility.
          </p>
        </div>

        <div className="text-center border-t border-stone-100 pt-4">
          <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{result.mainHexagram.nameZh}</p>
          <p className="text-base text-stone-500">{result.mainHexagram.pinyin}</p>
          <p className="text-sm text-stone-400">{result.mainHexagram.nameEn}</p>
        </div>

        <div className="bg-stone-50 rounded-lg p-4">
          <p className="text-sm font-medium text-stone-600 mb-1">Original Judgment (卦辞)</p>
          <p className="text-stone-800">{result.mainHexagram.judgment}</p>
          <p className="text-xs text-stone-500 mt-1">{result.mainHexagram.judgmentEn}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-stone-600 mb-1">Interpretation</p>
          <p className="text-sm text-stone-500">{result.mainHexagram.descriptionEn}</p>
        </div>

        {result.changedHexagram && (
          <div className="bg-stone-50 rounded-lg p-4">
            <p className="text-sm font-medium text-stone-600 mb-1">Changed Hexagram (变卦)</p>
            <p className="text-stone-800 font-medium">{result.changedHexagram.nameZh}</p>
            <p className="text-xs text-stone-500">{result.changedHexagram.pinyin} — {result.changedHexagram.nameEn}</p>
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
          <div className="rounded-lg p-4" style={{ backgroundColor: "var(--gold-muted)", border: "1px solid rgba(196,163,90,0.2)" }}>
            <p className="text-sm font-medium mb-1" style={{ color: "#8B7D5E" }}>Changing Line (动爻) — Position {result.changingLine.position}</p>
            <p className="text-stone-800">{result.changingLine.text}</p>
            <p className="text-xs text-stone-500 mt-1">{result.changingLine.textEn}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-stone-300 border-t-stone-500 rounded-full mx-auto mb-4" />
        <p className="text-stone-500">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
