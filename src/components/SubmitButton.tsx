import { useTranslations } from "next-intl";

export default function SubmitButton({
  loading,
  label,
  hasFree,
}: {
  loading: boolean;
  label: string;
  hasFree?: boolean;
}) {
  const t = useTranslations("common");

  return (
    <>
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading
          ? t("submit.processing")
          : hasFree
            ? t("submit.free", { label })
            : t("submit.paidSimple", { label })}
      </button>
      {!hasFree && (
        <p className="text-center text-xs text-stone-400 mt-2">
          {t("submit.cardNote")}
        </p>
      )}
    </>
  );
}