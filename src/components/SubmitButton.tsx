export default function SubmitButton({
  loading,
  label,
  hasFree,
}: {
  loading: boolean;
  label: string;
  hasFree?: boolean;
}) {
  return (
    <>
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading
          ? "Processing..."
          : hasFree
            ? `${label} — Free`
            : `${label} — $1.00`}
      </button>
      {!hasFree && (
        <p className="text-center text-xs text-stone-400">
          You will be redirected to a secure payment page
        </p>
      )}
    </>
  );
}
