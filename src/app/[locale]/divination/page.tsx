"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import FreeTierBadge from "@/components/FreeTierBadge";
import SpeakButton from "@/components/SpeakButton";
import { hasFreeUses } from "@/lib/free-tier";

export default function DivinationPage() {
 const t = useTranslations("divination");
 const { loading, checkout } = useCheckout("divination");
 const [method, setMethod] = useState<"time" | "random" | "manual">("time");
 const [amount, setAmount] = useState(1);

 function ExampleResult() {
 return (
 <details className="card-classic p-4 sm:p-5 mb-6 cursor-pointer group">
 <summary className="text-sm font-medium text-stone-600 select-none">
 {t("example.summary")}
 </summary>
 <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
 <div className="rounded-xl p-4 advice-card">
 <p className="text-xs font-medium mb-1 uppercase tracking-wide text-accent">{t("example.guidance")}</p>
 <p className="text-sm text-stone-800 leading-relaxed">
 {t("example.guidanceText")}
 </p>
 </div>
 <div className="text-center">
 <p className="text-2xl font-bold text-accent">乾</p>
 <div className="flex items-center justify-center gap-2">
 <p className="text-base text-stone-500">qián</p>
 <SpeakButton text="乾" />
 </div>
 <p className="text-sm text-stone-400">The Creative (Heaven)</p>
 </div>
 <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-500">
 <p className="font-medium mb-1">{t("example.judgmentTitle")}</p>
 <p>{t("example.judgmentText")}</p>
 </div>
 <p className="text-xs text-stone-400 italic">
 {t("example.footer")}
 </p>
 </div>
 </details>
 );
 }

 async function handleSubmit(e: FormEvent<HTMLFormElement>) {
 e.preventDefault();
 const form = e.currentTarget;
 const pmethod = form.dataset.paymentMethod as "paypal" | "card" | undefined;
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
 await checkout(data, pmethod);
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
 <SubmitButton loading={loading} label={t("form.submit")} hasFree={hasFreeUses()} onPayPal={() => { const f = document.querySelector("form"); if (f) { f.dataset.paymentMethod = "paypal"; f.requestSubmit(); } }} onCard={() => { const f = document.querySelector("form"); if (f) { f.dataset.paymentMethod = "card"; f.requestSubmit(); } }} />
 </form>
 </div>
 );
}
