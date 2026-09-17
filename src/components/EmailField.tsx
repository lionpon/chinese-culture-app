"use client";

import { useTranslations } from "next-intl";

/**
 * Optional email capture on service forms — the buyer's email lets us
 * deliver their reading by email and recover abandoned unlocks. Always
 * optional (native type=email validates format only when filled).
 */
export default function EmailField() {
  const t = useTranslations("common");
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">
        {t("form.emailLabel")}
      </label>
      <input
        type="email"
        name="email"
        autoComplete="email"
        placeholder={t("form.emailPlaceholder")}
        className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
      />
    </div>
  );
}
