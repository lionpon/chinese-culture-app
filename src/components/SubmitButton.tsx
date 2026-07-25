import { useTranslations } from "next-intl";
import PaymentTrustBadges from "./PaymentTrustBadges";
import { DEFAULT_AMOUNT } from "./AmountPicker";

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
  const amt = amount ?? DEFAULT_AMOUNT;

  if (hasFree) {
    return (
      <div className="space-y-2">
        <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
          {loading ? t("submit.processing") : t("submit.free", { label })}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-subtle)" }} />
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>or unlock everything</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-subtle)" }} />
        </div>

        {/* Paid button */}
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

        {/* Trust strip */}
        <div className="rounded-lg p-3 text-center space-y-2" style={{ backgroundColor: "rgba(201,169,110,0.04)" }}>
          <PaymentTrustBadges />
          <p className="text-center text-xs" style={{ color: "var(--text-dim)" }}>
            {t("submit.paidNote")}
          </p>
        </div>
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
      <p className="text-center text-xs mt-2" style={{ color: "var(--text-dim)" }}>
        {t("submit.cardNote")}
      </p>
      <div className="mt-3">
        <PaymentTrustBadges />
      </div>
    </>
  );
}