"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import { Link } from "@/navigation";

export default function DreamInterpretationPage() {
 const t = useTranslations("dream");
 const { loading, checkout } = useCheckout("dream-interpretation");
 const [amount, setAmount] = useState(1);
 const [consent, setConsent] = useState(false);
 const [charCount, setCharCount] = useState(0);

 async function handleSubmit(e: FormEvent<HTMLFormElement>) {
 e.preventDefault();
 const form = e.currentTarget;
 const pmethod = form.dataset.paymentMethod as "paypal" | "card" | undefined;
 await checkout({
 dreamText: form.dreamText.value,
 dreamType: form.dreamType.value || undefined,
 focus: form.interpretFocus.value || undefined,
 amount,
 }, pmethod);
 }

 return (
 <div className="max-w-lg mx-auto">
 <div className="text-center mb-8">
 <h1 className="text-2xl sm:text-3xl font-bold text-accent">
 {t("title")}
 </h1>
 <p className="text-stone-500 mt-2">{t("subtitle")}</p>
 <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">
 {t("badge")}
 </p>
 </div>

 <form
 onSubmit={handleSubmit}
 className="space-y-5 card-classic p-4 sm:p-6"
 >
 {/* Dream text area */}
 <div>
 <label className="block text-sm font-medium text-stone-700 mb-2">
 {t("form.dreamLabel")} <span className="text-red-400">*</span>
 </label>
 <textarea
 name="dreamText"
 required
 rows={5}
 minLength={10}
 maxLength={2000}
 placeholder={t("form.dreamPlaceholder")}
 className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 resize-y"
 onChange={(e) => setCharCount(e.target.value.length)}
 />
 <p className="text-xs text-stone-400 mt-1 text-right">
 {charCount}/2000
 </p>
 </div>

 {/* Dream type */}
 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">
 {t("form.dreamTypeLabel")}
 </label>
 <select
 name="dreamType"
 className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
 >
 <option value="">{t("form.dreamTypeDefault")}</option>
 <option value="normal">{t("form.normal")}</option>
 <option value="nightmare">{t("form.nightmare")}</option>
 <option value="recurring">{t("form.recurring")}</option>
 <option value="lucid">{t("form.lucid")}</option>
 </select>
 </div>

 {/* Focus preference */}
 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">
 {t("form.focusLabel")}
 </label>
 <select
 name="interpretFocus"
 className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
 >
 <option value="both">{t("form.focusBoth")}</option>
 <option value="chinese">{t("form.focusChinese")}</option>
 <option value="freudian">{t("form.focusFreudian")}</option>
 </select>
 <p className="text-xs text-stone-400 mt-1">{t("form.focusHelper")}</p>
 </div>

 {/* Consent */}
 <div className="flex items-start gap-2">
 <input
 type="checkbox"
 id="consent"
 checked={consent}
 onChange={(e) => setConsent(e.target.checked)}
 className="mt-0.5"
 required
 />
 <label
 htmlFor="consent"
 className="text-xs text-stone-500 leading-relaxed"
 >
 {t("form.consent")}{" "}
 <Link
 href="/privacy"
 className="underline hover:text-stone-700"
 >
 {t("form.consentLink")}
 </Link>
 </label>
 </div>

 <AmountPicker value={amount} onChange={setAmount} />
 <SubmitButton
 loading={loading}
 label={
 loading ? t("form.processing") : t("form.submit")
 }
 hasFree
 
 />
 </form>

 {/* Link to dream meaning guide */}
 <div className="text-center mt-6">
 <Link
 href="/guide/dream-meaning"
 className="text-xs text-stone-400 hover:text-stone-600 underline"
 >
 {t("learnMore")}
 </Link>
 </div>
 </div>
 );
}
