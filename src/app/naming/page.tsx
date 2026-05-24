"use client";

import { useState, FormEvent } from "react";
import { useResults } from "@/lib/result-store";

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
    <button onClick={speak} className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 transition-colors" title="Listen">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.8l4.7-3.5a.5.5 0 01.8.4v12.6a.5.5 0 01-.8.4L6.5 15.2H3.2a1 1 0 01-1-1v-4.4a1 1 0 011-1h3.3z" />
      </svg>
      Listen
    </button>
  );
}

export default function NamingPage() {
  const [loading, setLoading] = useState(false);
  const { results, setNamingResult } = useResults();
  const result = results.naming;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setNamingResult(null);

    const form = e.currentTarget;
    const data = {
      surname: form.surname.value,
      gender: form.gender.value,
      birthYear: parseInt(form.birthYear.value),
      birthMonth: parseInt(form.birthMonth.value),
      birthDay: parseInt(form.birthDay.value),
      birthHour: parseInt(form.birthHour.value),
      style: (form.elements.namedItem("style") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "naming", input: data }),
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
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--accent)" }}>Create a Chinese Name</h1>
        <p className="text-stone-500 mt-2">Based on your birth information and classical Chinese texts</p>
        <p className="text-xs mt-1 inline-block px-3 py-1 rounded" style={{ color: "#8B7D5E", backgroundColor: "var(--gold-muted)" }}>$1 per reading</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Your Surname</label>
            <input name="surname" required placeholder="e.g. Smith" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
            <select name="gender" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Date of Birth</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input name="birthYear" type="number" placeholder="Year" required min={1900} max={2100} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
              <input name="birthMonth" type="number" placeholder="Month" required min={1} max={12} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
              <input name="birthDay" type="number" placeholder="Day" required min={1} max={31} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Birth Hour (0-23)</label>
            <input name="birthHour" type="number" placeholder="e.g. 8 for 8:00 AM" required min={0} max={23} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <p className="text-xs text-stone-400 mt-1">Approximate is fine if you don&apos;t know the exact hour.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Name Style</label>
            <select name="style" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
              <option value="">Select...</option>
              <option value="elegant">Elegant & Refined · 典雅</option>
              <option value="grand">Grand & Powerful · 大气</option>
              <option value="fresh">Fresh & Natural · 清新</option>
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 btn-primary">
            {loading ? "Processing..." : "Generate Name — $1.00"}
          </button>
          <p className="text-center text-xs text-stone-400">You will be redirected to a secure payment page</p>
        </form>

      {result && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold" style={{ color: "var(--accent)" }}>Your Chinese Names</h2>
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
                {opt.sourceText && <p className="text-stone-500 italic">{opt.sourceText}</p>}
              </div>
              {i === 0 && <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400"><strong>Recommended</strong> — Best match for your elemental profile</div>}
            </div>
          ))}
          <div className="bg-stone-100 rounded-lg p-4 text-xs text-stone-500">
            <p className="font-medium mb-1">Bazi Analysis</p>
            <p>{result.baziAnalysis.analysis}</p>
            <p className="mt-1">{result.baziAnalysis.analysisEn}</p>
          </div>
        </div>
      )}
    </div>
  );
}
