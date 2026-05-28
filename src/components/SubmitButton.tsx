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
  return (
    <>
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading
          ? "Processing..."
          : hasFree
            ? `${label} — Free`
            : `${label} · Support $${amount}`}
      </button>
      {!hasFree && (
        <p className="text-center text-xs text-stone-400">
          Your contribution helps maintain the service
        </p>
      )}
    </>
  );
}
