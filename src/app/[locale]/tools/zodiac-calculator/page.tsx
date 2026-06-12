"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import { getZodiacInfo, getZodiacAnimalZh } from "@/data/zodiac-data";
import { getElementFromStem } from "@/lib/zodiac-calculator";
import EmailCaptureForm from "@/components/EmailCaptureForm";

export default function ZodiacCalculatorPage() {
  const t = useTranslations("tools");
  const locale = useLocale();

  const [yearInput, setYearInput] = useState("");
  const [result, setResult] = useState<{ year: number; animalZh: string; info: ReturnType<typeof getZodiacInfo>; element: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const year = parseInt(yearInput, 10);
    if (isNaN(year) || year < 1900 || year > 2100) {
      setError("Please enter a valid year between 1900 and 2100.");
      return;
    }

    const info = getZodiacInfo(year, locale);
    const stem = (year - 4) % 10;
    const element = getElementFromStem(stem);
    const animalZh = getZodiacAnimalZh(year);

    setResult({ year, animalZh, info, element });
  };

  return (
    <div className="max-w-lg mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 text-center mb-2">
        {t("zodiacCalculator.title")}
      </h1>
      <p className="text-stone-500 text-center text-sm mb-8">
        {t("zodiacCalculator.subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="card-classic p-5 sm:p-6 mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          {t("zodiacCalculator.yearLabel")}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            placeholder={t("zodiacCalculator.yearPlaceholder")}
            className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
            min={1900}
            max={2100}
          />
          <button
            type="submit"
            className="btn-primary px-6 py-2 text-sm font-medium"
          >
            {t("zodiacCalculator.submit")}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <p className="text-stone-400 text-xs mt-3 leading-relaxed">
          {t("zodiacCalculator.note")}
        </p>
      </form>

      {result && (
        <div className="card-classic p-5 sm:p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">{result.animalZh}</div>
            <h2 className="text-xl font-bold text-stone-800">
              {t("zodiacCalculator.yourAnimal")}: {result.info.animal}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-sm text-stone-500">{t("zodiacCalculator.element")}:</span>
              <span className="badge-accent px-3 py-0.5 text-xs font-medium rounded-full">
                {result.element}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-2">{t("zodiacCalculator.personality")}</h3>
              <div className="flex flex-wrap gap-1">
                {result.info.personality.map((trait) => (
                  <span key={trait} className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-full">{trait}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-stone-700 mb-1">{t("zodiacCalculator.luckyNumbers")}</h3>
                <p className="text-sm text-stone-600">{result.info.luckyNumbers}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-700 mb-1">{t("zodiacCalculator.luckyColors")}</h3>
                <p className="text-sm text-stone-600">{result.info.luckyColors}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-green-700 mb-1">{t("zodiacCalculator.compatible")}</h3>
                <p className="text-sm text-stone-600">{result.info.compatible}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-700 mb-1">{t("zodiacCalculator.incompatible")}</h3>
                <p className="text-sm text-stone-600">{result.info.incompatible}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setResult(null); setYearInput(""); }}
              className="text-sm text-stone-500 hover:text-stone-700 underline"
            >
              {t("zodiacCalculator.another")}
            </button>
          </div>
        </div>
      )}

      {result && <EmailCaptureForm source="zodiac-calculator" />}

      {result && (
        <div className="text-center mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-sm text-stone-600 mb-2">{t("zodiacCalculator.ctaNaming")}</p>
          <Link href="/naming" className="btn-primary inline-block px-5 py-2 text-sm font-medium rounded-md">
            {t("zodiacCalculator.ctaLink")} →
          </Link>
        </div>
      )}

      <p className="text-center text-stone-400 text-xs mt-8">{t("disclaimer")}</p>
    </div>
  );
}
