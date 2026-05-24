"use client";

import { useState, FormEvent } from "react";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import FreeTierBadge from "@/components/FreeTierBadge";

export default function DivinationPage() {
  const { loading, checkout } = useCheckout("divination");
  const [method, setMethod] = useState<"time" | "random" | "manual">("time");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    await checkout(data);
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">I Ching Divination</h1>
        <p className="text-stone-500 mt-2">Consult the ancient Book of Changes</p>
        <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">$1 per reading</p>
      </div>

      <FreeTierBadge />

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

        <SubmitButton loading={loading} label="Cast Hexagram — $1.00" />
      </form>
    </div>
  );
}
