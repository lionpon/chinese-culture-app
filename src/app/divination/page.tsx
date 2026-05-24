"use client";

import { useState, FormEvent } from "react";
import { useResults } from "@/lib/result-store";

export default function DivinationPage() {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"time" | "random" | "manual">("time");
  const { results, setDivinationResult } = useResults();
  const result = results.divination;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDivinationResult(null);

    const form = e.currentTarget;
    const data: Record<string, unknown> = {
      method,
      question: form.question?.value || null,
    };
    if (method === "manual") {
      data.numbers = [
        parseInt(form.num1.value) || 1,
        parseInt(form.num2.value) || 1,
        parseInt(form.num3.value) || 1,
      ];
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "divination", input: data }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else alert(error || "Something went wrong");
    } catch {
      alert("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--accent)" }}>I Ching Divination</h1>
        <p className="text-stone-500 mt-2">Consult the ancient Book of Changes</p>
        <p className="text-xs mt-1 inline-block px-3 py-1 rounded" style={{ color: "#8B7D5E", backgroundColor: "var(--gold-muted)" }}>$1 per reading</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Your Question (optional)</label>
            <input name="question" placeholder="What would you like guidance on?" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Casting Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(["time", "random", "manual"] as const).map(m => (
                <button key={m} type="button" onClick={() => setMethod(m)}
                  className="py-2 px-3 rounded-lg text-sm border transition-colors border-stone-200 text-stone-500 hover:border-stone-300"
                  style={method === m ? { borderColor: "var(--accent)", backgroundColor: "var(--accent-muted)", color: "var(--accent)" } : {}}>
                  {m === "time" && "Time-based (时间)"}
                  {m === "random" && "Random (随机)"}
                  {m === "manual" && "Manual (手动)"}
                </button>
              ))}
            </div>
          </div>
          {method === "manual" && (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Three Numbers (1-999)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input name="num1" type="number" placeholder="First" required min={1} max={999} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
                <input name="num2" type="number" placeholder="Second" required min={1} max={999} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
                <input name="num3" type="number" placeholder="Third" required min={1} max={999} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 btn-primary">
            {loading ? "Processing..." : "Cast Hexagram — $1.00"}
          </button>
          <p className="text-center text-xs text-stone-400">You will be redirected to a secure payment page</p>
        </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--accent)" }}>Your I Ching Reading</h2>
          <div className="card-classic p-4 sm:p-6 space-y-5">
            {/* Advice — most prominent for quick understanding */}
            <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, var(--accent-muted), var(--gold-muted))", border: "1px solid rgba(155,74,58,0.15)" }}>
              <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--accent)" }}>Guidance for You</p>
              <p className="text-sm text-stone-800 leading-relaxed">{result.mainHexagram.advice}</p>
              <p className="text-xs text-stone-400 mt-3 pt-3 border-t border-stone-300/50">
                For cultural appreciation only. Decisions based on this reading are your own responsibility.
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
      )}
    </div>
  );
}
