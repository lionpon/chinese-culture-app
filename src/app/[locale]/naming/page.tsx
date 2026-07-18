"use client";

import { FormEvent, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import FreeTierBadge from "@/components/FreeTierBadge";
import SpeakButton from "@/components/SpeakButton";
import { hasFreeUses } from "@/lib/free-tier";
import { trackClick } from "@/lib/track";

export default function NamingPage() {
  const t = useTranslations("naming");
  const locale = useLocale();
  const isJaKo = locale === "ja" || locale === "ko";
  const { loading, checkout } = useCheckout("naming");
  const [amount, setAmount] = useState(1);
  const [mode, setMode] = useState<"create" | "analyze">("create");

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

  function intOrUndefined(val: string): number | undefined {
    const n = parseInt(val);
    return isNaN(n) ? undefined : n;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const styleEl = form.elements.namedItem("style") as HTMLSelectElement | null;
    await checkout({
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      gender: form.gender.value,
      birthYear: intOrUndefined(form.birthYear.value),
      birthMonth: intOrUndefined(form.birthMonth.value),
      birthDay: intOrUndefined(form.birthDay.value),
      birthHour: intOrUndefined(form.birthHour.value),
      style: styleEl ? styleEl.value as "elegant" | "grand" | "fresh" : "elegant",
      mode,
      amount,
    });
    trackClick("form_submit_naming");
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">{t("title")}</h1>
        <p className="text-stone-500 mt-2">{t("subtitle")}</p>
        <p className="text-xs text-stone-400 mt-1 flex items-center justify-center gap-1">
          ⚡ 30s · {hasFreeUses() ? "1 free reading" : ""}
        </p>
        {!hasFreeUses() && (
          <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">{t("badge")}</p>
        )}
      </div>

      <FreeTierBadge />
      <ExampleResult />

      <form onSubmit={handleSubmit} className="space-y-4 card-classic p-4 sm:p-6">
        {/* Mode toggle — only for ja/ko users who may already have a Chinese name */}
        {isJaKo && (
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">{t("form.modeLabel")}</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("create")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm border transition-colors ${
                  mode === "create"
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-stone-600 border-stone-300 hover:border-stone-400"
                }`}
              >
                {t("form.modeCreate")}
              </button>
              <button
                type="button"
                onClick={() => setMode("analyze")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm border transition-colors ${
                  mode === "analyze"
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-stone-600 border-stone-300 hover:border-stone-400"
                }`}
              >
                {t("form.modeAnalyze")}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              {mode === "analyze" ? t("form.firstNameAnalyze") : t("form.firstName")}
            </label>
            <input name="firstName" required
              placeholder={mode === "analyze" ? t("form.firstNameAnalyzePlaceholder") : t("form.firstNamePlaceholder")}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              {mode === "analyze" ? t("form.lastNameAnalyze") : t("form.lastName")}
            </label>
            <input name="lastName" required
              placeholder={mode === "analyze" ? t("form.lastNameAnalyzePlaceholder") : t("form.lastNamePlaceholder")}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
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
          <label className="block text-sm font-medium text-stone-700 mb-1">
            {t("form.dob")}
            <span className="text-stone-400 font-normal text-xs ml-1">({t("form.optional")})</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input name="birthYear" type="number" placeholder={t("form.year")} min={1900} max={2100} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthMonth" type="number" placeholder={t("form.month")} min={1} max={12} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthDay" type="number" placeholder={t("form.day")} min={1} max={31} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            {t("form.hour")}
            <span className="text-stone-400 font-normal text-xs ml-1">({t("form.optional")})</span>
          </label>
          <input name="birthHour" type="number" placeholder={t("form.hourPlaceholder")} min={0} max={23} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          <p className="text-xs text-stone-400 mt-1">{t("form.hourHelper")}</p>
        </div>

        {mode !== "analyze" && (
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.style")}</label>
            <select name="style" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
              <option value="">{t("form.stylePlaceholder")}</option>
              <option value="elegant">{t("form.styleElegant")}</option>
              <option value="grand">{t("form.styleGrand")}</option>
              <option value="fresh">{t("form.styleFresh")}</option>
            </select>
          </div>
        )}

        <AmountPicker value={amount} onChange={setAmount} />
        {hasFreeUses() && (
          <p className="text-xs text-stone-400 text-center">{t("form.previewNote")}</p>
        )}
        <SubmitButton loading={loading} label={mode === "analyze" ? t("form.submitAnalyze") : t("form.submit")} hasFree={hasFreeUses()} />
      </form>
    </div>
  );
}
