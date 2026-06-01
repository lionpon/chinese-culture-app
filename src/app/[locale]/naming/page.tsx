"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import FreeTierBadge from "@/components/FreeTierBadge";
import SpeakButton from "@/components/SpeakButton";
import { hasFreeUses } from "@/lib/free-tier";

export default function NamingPage() {
  const t = useTranslations("naming");
  const { loading, checkout } = useCheckout("naming");
  const [amount, setAmount] = useState(1);

  function ExampleResult() {
    return (
      <details className="card-classic p-4 sm:p-5 mb-6 cursor-pointer group">
        <summary className="text-sm font-medium text-stone-600 select-none">
          {t("example.summary")}
        </summary>
        <div className="mt-4 pt-4 border-t border-stone-100 space-y-4">
          <div className="card-classic p-4" style={{ borderColor: "rgba(155,74,58,0.15)" }}>
            <div className="text-center mb-2">
              <p className="text-3xl font-bold text-accent">林明哲</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-lg text-stone-500">lín míng zhé</p>
                <SpeakButton text="林明哲" />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="text-stone-400">{t("example.meaning")}:</span> {t("example.meaningText")}</p>
              <p><span className="text-stone-400">{t("example.elements")}:</span> {t("example.elementsText")}</p>
              <p><span className="text-stone-400">{t("example.source")}:</span> 《尚书·尧典》, 《易经·系辞》</p>
            </div>
          </div>
          <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-500">
            <p className="font-medium mb-1">{t("example.baziTitle")}</p>
            <p>{t("example.baziText")}</p>
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
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      gender: form.gender.value,
      birthYear: parseInt(form.birthYear.value),
      birthMonth: parseInt(form.birthMonth.value),
      birthDay: parseInt(form.birthDay.value),
      birthHour: parseInt(form.birthHour.value),
      style: (form.elements.namedItem("style") as HTMLSelectElement).value,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.firstName")}</label>
            <input name="firstName" required placeholder={t("form.firstNamePlaceholder")} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.lastName")}</label>
            <input name="lastName" required placeholder={t("form.lastNamePlaceholder")} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.gender")}</label>
          <select name="gender" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">{t("form.genderPlaceholder")}</option>
            <option value="male">{t("form.male")}</option>
            <option value="female">{t("form.female")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.dob")}</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input name="birthYear" type="number" placeholder={t("form.year")} required min={1900} max={2100} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthMonth" type="number" placeholder={t("form.month")} required min={1} max={12} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthDay" type="number" placeholder={t("form.day")} required min={1} max={31} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.hour")}</label>
          <input name="birthHour" type="number" placeholder={t("form.hourPlaceholder")} required min={0} max={23} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          <p className="text-xs text-stone-400 mt-1">{t("form.hourHelper")}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.style")}</label>
          <select name="style" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">{t("form.stylePlaceholder")}</option>
            <option value="elegant">{t("form.styleElegant")}</option>
            <option value="grand">{t("form.styleGrand")}</option>
            <option value="fresh">{t("form.styleFresh")}</option>
          </select>
        </div>

        <AmountPicker value={amount} onChange={setAmount} />
        {hasFreeUses() && (
          <p className="text-xs text-stone-400 text-center">{t("form.previewNote")}</p>
        )}
        <SubmitButton loading={loading} label={t("form.submit")} hasFree={hasFreeUses()} amount={amount} />
      </form>
    </div>
  );
}
