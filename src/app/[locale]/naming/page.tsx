"use client";

import { FormEvent, useState, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import AmountPicker from "@/components/AmountPicker";
import FreeTierBadge from "@/components/FreeTierBadge";
import SpeakButton from "@/components/SpeakButton";
import { hasFreeUses } from "@/lib/free-tier";
import { trackClick } from "@/lib/track";

interface PreviewData {
  dayMaster: { wuxing: string; element: string; heavenlyStem: string };
  elements: { element: string; elementEn: string; count: number }[];
  maxCount: number;
  analysis: string;
  favorable: { element: string; elementEn: string }[];
  unfavorable: { element: string; elementEn: string }[];
  balanced: boolean;
  strongest: { element: string; elementEn: string };
  weakest: { element: string; elementEn: string };
}

const ELEMENT_COLORS: Record<string, string> = {
  "Wood": "#4A9E4A",
  "Fire": "#E0554A",
  "Earth": "#C4A44A",
  "Metal": "#D4C45A",
  "Water": "#4A90D9",
};

const ELEMENT_EMOJI: Record<string, string> = {
  "Wood": "🌳", "Fire": "🔥", "Earth": "🏔️", "Metal": "⚜️", "Water": "💧",
};

export default function NamingPage() {
  const t = useTranslations("naming");
  const tc = useTranslations("common");
  const locale = useLocale();
  const isJaKo = locale === "ja" || locale === "ko";
  const { loading, checkout } = useCheckout("naming");
  const [amount, setAmount] = useState(1);
  const [mode, setMode] = useState<"create" | "analyze">("create");
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const previewTimer = useRef<ReturnType<typeof setTimeout>>();

  function ExampleResult() {
    return (
      <details className="card-classic p-4 sm:p-5 mb-6 cursor-pointer group">
        <summary className="text-sm font-medium text-stone-600 select-none">
          {t("example.summary")}
        </summary>
        <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="card-classic p-4" style={{ borderColor: "var(--border-medium)" }}>
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

  const fetchPreview = useCallback(async (year: number, month: number, day?: number, hour?: number) => {
    setPreviewLoading(true);
    try {
      const res = await fetch("/api/preview/naming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthYear: year, birthMonth: month, birthDay: day, birthHour: hour }),
      });
      if (res.ok) {
        const data = await res.json();
        setPreview(data);
        trackClick("preview_bazi");
      }
    } catch {
      // silent fail — preview is optional
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  function onBirthInput(e: React.ChangeEvent<HTMLInputElement>) {
    // Debounced preview fetch when birth fields change
    const form = e.currentTarget.form;
    if (!form) return;
    const y = parseInt((form.elements.namedItem("birthYear") as HTMLInputElement)?.value);
    const m = parseInt((form.elements.namedItem("birthMonth") as HTMLInputElement)?.value);
    const d = parseInt((form.elements.namedItem("birthDay") as HTMLInputElement)?.value);
    const h = parseInt((form.elements.namedItem("birthHour") as HTMLInputElement)?.value);

    if (previewTimer.current) clearTimeout(previewTimer.current);
    if (!isNaN(y) && !isNaN(m) && y >= 1900 && m >= 1 && m <= 12) {
      previewTimer.current = setTimeout(() => {
        fetchPreview(y, m, isNaN(d) ? undefined : d, isNaN(h) ? undefined : h);
      }, 500);
    }
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

      {/* Pricing banner */}
      <div className="card-classic p-3 mb-6 text-center border-dashed" style={{ borderColor: "var(--gold)", backgroundColor: "rgba(201, 169, 110, 0.06)" }}>
        <p className="text-sm font-bold" style={{ color: "var(--gold)" }}>{tc("pricing.title")}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{tc("pricing.compare")}</p>
      </div>

      {/* Free Bazi Preview — appears when birth date is filled */}
      {preview && (
        <div className="card-classic p-4 sm:p-5 mb-6 animate-fadeIn" style={{ borderColor: "var(--border-strong)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{ELEMENT_EMOJI[preview.dayMaster.element] || "✨"}</span>
            <div>
              <p className="text-sm font-semibold text-accent">
                {t("preview.dayMaster")}: <span className="text-base">{preview.dayMaster.heavenlyStem}</span>
                <span className="text-stone-500"> ({preview.dayMaster.wuxing}{preview.dayMaster.element})</span>
              </p>
              <p className="text-xs text-stone-400">{preview.analysis}</p>
            </div>
          </div>

          {/* Five Elements Balance Bars */}
          <div className="space-y-1.5 mb-3">
            <p className="text-xs font-medium text-stone-500">{t("preview.elementsTitle")}</p>
            {preview.elements.map((el) => (
              <div key={el.element} className="flex items-center gap-2">
                <span className="text-xs w-12 text-stone-500">{el.elementEn} {el.element}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-surface)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(8, (el.count / preview.maxCount) * 100)}%`,
                      backgroundColor: ELEMENT_COLORS[el.elementEn] || "#999",
                    }}
                  />
                </div>
                <span className="text-xs w-4 text-stone-400">{el.count}</span>
              </div>
            ))}
          </div>

          {/* Lucky Elements */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs text-stone-500">{t("preview.favorable")}:</span>
            {preview.favorable.map((el) => (
              <span
                key={el.element}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: (ELEMENT_COLORS[el.elementEn] || "#999") + "18",
                  color: ELEMENT_COLORS[el.elementEn] || "#999",
                  border: `1px solid ${(ELEMENT_COLORS[el.elementEn] || "#999")}40`,
                }}
              >
                {ELEMENT_EMOJI[el.elementEn]} {el.elementEn} {el.element}
              </span>
            ))}
          </div>

          {/* Teaser CTA */}
          <div className="bg-stone-50 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-stone-700">{t("preview.teaser")}</p>
            <p className="text-xs text-stone-400 mt-1">{t("preview.teaserSub")}</p>
          </div>
        </div>
      )}

      {/* Preview loading skeleton */}
      {previewLoading && !preview && (
        <div className="card-classic p-4 mb-6 animate-pulse">
          <div className="h-4 bg-stone-200 rounded w-3/4 mb-3" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-2 bg-stone-100 rounded w-full" />
            ))}
          </div>
        </div>
      )}

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
              onInvalid={(e) => e.currentTarget.setCustomValidity(tc("validation.inputRequired"))}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              {mode === "analyze" ? t("form.lastNameAnalyze") : t("form.lastName")}
            </label>
            <input name="lastName" required
              placeholder={mode === "analyze" ? t("form.lastNameAnalyzePlaceholder") : t("form.lastNamePlaceholder")}
              onInvalid={(e) => e.currentTarget.setCustomValidity(tc("validation.inputRequired"))}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.gender")}</label>
          <select name="gender" required
            onInvalid={(e) => e.currentTarget.setCustomValidity(tc("validation.selectRequired"))}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
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
            <input name="birthYear" type="number" placeholder={t("form.year")} min={1900} max={2100} onChange={onBirthInput} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthMonth" type="number" placeholder={t("form.month")} min={1} max={12} onChange={onBirthInput} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthDay" type="number" placeholder={t("form.day")} min={1} max={31} onChange={onBirthInput} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            {t("form.hour")}
            <span className="text-stone-400 font-normal text-xs ml-1">({t("form.optional")})</span>
          </label>
          <input name="birthHour" type="number" placeholder={t("form.hourPlaceholder")} min={0} max={23} onChange={onBirthInput} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          <p className="text-xs text-stone-400 mt-1">{t("form.hourHelper")}</p>
        </div>

        {mode !== "analyze" && (
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t("form.style")}</label>
            <select name="style" required
              onInvalid={(e) => e.currentTarget.setCustomValidity(tc("validation.selectRequired"))}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
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
