"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackClick } from "@/lib/track";

export const PRESETS = [5.99, 9.99, 14.99, 19.99];
export const DEFAULT_AMOUNT = 5.99;

interface Props {
  value: number;
  onChange: (amount: number) => void;
}

export default function AmountPicker({ value, onChange }: Props) {
  const t = useTranslations("common");
  const [customMode, setCustomMode] = useState(false);

  function handlePreset(amt: number) {
    setCustomMode(false);
    onChange(amt);
    if (amt !== DEFAULT_AMOUNT || value !== DEFAULT_AMOUNT) {
      trackClick(`amount_changed_${amt}`);
    }
  }

  function handleCustom() {
    setCustomMode(true);
    if (value < 1) onChange(DEFAULT_AMOUNT);
    trackClick("amount_custom_mode");
  }

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        {t("amount.label")}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {PRESETS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => handlePreset(amt)}
            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
              !customMode && value === amt
                ? "border-accent bg-accent-muted text-accent font-medium"
                : "border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            ${amt}
          </button>
        ))}
        <button
          type="button"
          onClick={handleCustom}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
            customMode
              ? "border-accent bg-accent-muted text-accent font-medium"
              : "border-stone-200 text-stone-600 hover:border-stone-300"
          }`}
        >
          {t("amount.custom")}
        </button>
      </div>
      {customMode && (
        <input
          type="number"
          min={1}
          max={100}
          value={value}
          onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-24 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          placeholder={t("amount.placeholder")}
        />
      )}
    </div>
  );
}
