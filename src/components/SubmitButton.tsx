import { useTranslations } from "next-intl";
import PaymentTrustBadges from "./PaymentTrustBadges";

export default function SubmitButton({
  loading,
  label,
  hasFree,
  onPaidClick,
  amount,
}: {
  loading: boolean;
  label: string;
  hasFree?: boolean;
  onPaidClick?: () => void;
  amount?: number;
}) {
  const t = useTranslations("common");
  const amt = amount ?? 1;

  if (hasFree) {
    return (
      <div className="space-y-2">
        <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
          {loading ? t("submit.processing") : t("submit.free", { label })}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={onPaidClick}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
          style={{
            backgroundColor: "var(--gold)",
            color: "var(--bg-deep)",
          }}
        >
          {t("submit.paid", { label, amount: `$${amt}` })}
        </button>
        <div className="mt-3">
          <PaymentTrustBadges />
        </div>
        <p className="text-center text-xs" style={{ color: "var(--text-dim)" }}>
          {t("submit.paidNote")}
        </p>
      </div>
    );
  }

  return (
    <>
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading
          ? t("submit.processing")
          : t("submit.paidSimple", { label, amount: `$${amt}` })}
      </button>
      <p className="text-center text-xs text-stone-400 mt-2">
        {t("submit.cardNote")}
      </p>
      <div className="mt-3">
        <PaymentTrustBadges />
      </div>
    </>
  );
}