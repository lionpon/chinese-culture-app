"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import FreeTierBadge from "@/components/FreeTierBadge";
import { hasFreeUses } from "@/lib/free-tier";

export default function CalendarPage() {
 const t = useTranslations("calendar");
 const { loading, checkout } = useCheckout("calendar");
 const [amount, setAmount] = useState(1);

 function ExampleResult() {
 return (
 <details className="card-classic p-4 sm:p-5 mb-6 cursor-pointer group">
 <summary className="text-sm font-medium text-stone-600 select-none">
 {t("example.summary")}
 </summary>
 <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
 <div className="card-classic p-4">
 <div className="flex items-center justify-between mb-2">
 <p className="text-xl font-bold text-accent">2026-06-15</p>
 <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">{t("example.score")}</span>
 </div>
 <p className="text-sm text-stone-500 mb-3">农历五月廿九</p>
 <div className="grid grid-cols-2 gap-2 text-sm">
 <div>
 <p className="text-stone-400 text-xs">{t("example.suitableLabel")}</p>
 <p className="text-accent">嫁娶、纳采</p>
 <p className="text-stone-400 text-xs mt-0.5">{t("example.suitableItems")}</p>
 </div>
 <div>
 <p className="text-stone-400 text-xs">{t("example.unsuitableLabel")}</p>
 <p className="text-stone-600">词讼、安葬</p>
 <p className="text-stone-400 text-xs mt-0.5">{t("example.unsuitableItems")}</p>
 </div>
 </div>
 <p className="mt-2 text-xs text-accent">
 {t("example.godsLabel")}: 天德、月德
 <span className="text-stone-400 block">{t("example.godsItems")}</span>
 </p>
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
 await checkout({
 startDate: form.startDate.value,
 endDate: form.endDate.value,
 eventType: form.eventType.value,
 amount,
 });
 }

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
 <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.range")}</label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
 <div><span className="text-xs text-stone-400">{t("form.start")}</span>
 <input name="startDate" type="date" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" /></div>
 <div><span className="text-xs text-stone-400">{t("form.end")}</span>
 <input name="endDate" type="date" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" /></div>
 </div>
 <p className="text-xs text-stone-400 mt-1">{t("form.rangeHelper")}</p>
 </div>
 <div>
 <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.eventType")}</label>
 <select name="eventType" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
 <option value="">{t("form.eventPlaceholder")}</option>
 <option value="wedding">{t("events.wedding")}</option>
 <option value="engagement">{t("events.engagement")}</option>
 <option value="business">{t("events.businessOpening")}</option>
 <option value="travel">{t("events.travel")}</option>
 <option value="moving">{t("events.movingHouse")}</option>
 <option value="contract">{t("events.signingContract")}</option>
 <option value="sacrifice">{t("events.ancestralCeremony")}</option>
 <option value="construction">{t("events.construction")}</option>
 <option value="medical">{t("events.medicalTreatment")}</option>
 <option value="funeral">{t("events.funeral")}</option>
 <option value="education">{t("events.education")}</option>
 <option value="meeting">{t("events.meeting")}</option>
 <option value="renovation">{t("events.renovation")}</option>
 </select>
 </div>

 <AmountPicker value={amount} onChange={setAmount} />
 {hasFreeUses() && (
 <p className="text-xs text-stone-400 text-center">{t("form.previewNote")}</p>
 )}
 <SubmitButton loading={loading} label={t("form.submit")} hasFree={hasFreeUses()} />
 </form>
 </div>
 );
}
