"use client";

import { useTranslations } from "next-intl";

export default function SubmitButton({
  loading,
  label,
  hasFree,
  amount = 1,
}: {
  loading: boolean;
  label: string;
  hasFree?: boolean;
  amount?: number;
}) {
  const t = useTranslations("common");

  return (
    <>
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading
          ? t("submit.processing")
          : hasFree
            ? t("submit.free", { label })
            : t("submit.paid", { label, amount })}
      </button>
      {!hasFree && (
        <p className="text-center text-xs text-stone-400">
          {t("submit.helper")}
        </p>
      )}
    </>
  );
}
