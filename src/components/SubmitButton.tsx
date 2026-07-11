"use client";

import { useTranslations } from "next-intl";

export default function SubmitButton({
  loading,
  label,
  hasFree,
  onPayPal,
  onCard,
}: {
  loading: boolean;
  label: string;
  hasFree?: boolean;
  onPayPal?: () => void;
  onCard?: () => void;
}) {
  const t = useTranslations("common");

  if (hasFree) {
    return (
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading ? t("submit.processing") : t("submit.free", { label })}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-center text-xs text-stone-400">
        {t("submit.choosePayment")}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={onPayPal}
          className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-opacity disabled:opacity-60"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {loading ? "..." : t("submit.payWithPayPal")}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onCard}
          className="flex-1 py-3 rounded-xl text-sm font-medium transition-opacity disabled:opacity-60"
          style={{ border: "2px solid var(--accent)", color: "var(--accent)", background: "transparent" }}
        >
          {loading ? "..." : t("submit.payWithCard")}
        </button>
      </div>
      <p className="text-center text-xs text-stone-400">
        {t("submit.helper")}
      </p>
    </div>
  );
}
