"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import FreeTierBadge from "@/components/FreeTierBadge";
import { hasFreeUses } from "@/lib/free-tier";

function ExampleResult() {
  return (
    <details className="card-classic p-4 sm:p-5 mb-6 cursor-pointer group">
      <summary className="text-sm font-medium text-stone-600 select-none">
        Example result — see what you&apos;ll get
      </summary>
      <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
        <div className="rounded-xl p-4 advice-card">
          <p className="text-xs font-medium mb-1 uppercase tracking-wide text-accent">Guidance for You</p>
          <p className="text-sm text-stone-800 leading-relaxed">
            ☀️ Verdict: Auspicious 吉 — This is a time for bold, decisive action. Take the initiative now — launch that project, make the first move, step into leadership. Your momentum will be rewarded.
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">乾</p>
          <p className="text-base text-stone-500">qián</p>
          <p className="text-sm text-stone-400">The Creative (Heaven)</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-500">
          <p className="font-medium mb-1">Original Judgment (卦辞)</p>
          <p>Success. Perseverance furthers. The Creative works sublime success, furthering through perseverance.</p>
        </div>
        <p className="text-xs text-stone-400 italic">
          Cast your own hexagram above. Free preview shows the core reading — unlock changed & mutual hexagrams with a contribution.
        </p>
      </div>
    </details>
  );
}

export default function DivinationPage() {
  const t = useTranslations("divination");
  const { loading, checkout } = useCheckout("divination");
  const [method, setMethod] = useState<"time" | "random" | "manual">("time");
  const [amount, setAmount] = useState(1);

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
    data.amount = amount;
    await checkout(data);
  }

  const methodLabels: Record<string, string> = {
    time: t("form.methodTime"),
    random: t("form.methodRandom"),
    manual: t("form.methodManual"),
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">{t("title")}</h1>
        <p className="text-stone-500 mt-2">{t("subtitle")}</p>
        {!hasFreeUses() && (
          <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">{t("badge")}</p>
        )}
      </div>

      <FreeTierBadge />
      <ExampleResult />

      <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.question")}</label>
          <input name="question" placeholder={t("form.questionPlaceholder")} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">{t("form.method")}</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(["time", "random", "manual"] as const).map(m => (
              <button key={m} type="button" onClick={() => setMethod(m)}
                className="py-2 px-3 rounded-lg text-sm border transition-colors border-stone-200 text-stone-500 hover:border-stone-300"
                style={method === m ? { borderColor: "var(--accent)", backgroundColor: "var(--accent-muted)", color: "var(--accent)" } : {}}>
                {methodLabels[m]}
              </button>
            ))}
          </div>
        </div>
        {method === "manual" && (
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.numbers")}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input name="num1" type="number" placeholder={t("form.firstNum")} required min={1} max={999} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
              <input name="num2" type="number" placeholder={t("form.secondNum")} required min={1} max={999} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
              <input name="num3" type="number" placeholder={t("form.thirdNum")} required min={1} max={999} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            </div>
          </div>
        )}

        <AmountPicker value={amount} onChange={setAmount} />
        {hasFreeUses() && (
          <p className="text-xs text-stone-400 text-center">{t("form.previewNote")}</p>
        )}
        <SubmitButton loading={loading} label={t("form.submit")} hasFree={hasFreeUses()} amount={amount} />
      </form>
    </div>
  );
}
