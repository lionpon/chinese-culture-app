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
            : `${label} · Support $1`}
      </button>
      {!hasFree && (
        <p className="text-center text-xs text-stone-400">
          Your contribution helps maintain the service
        </p>
      )}
    </>
  );
}
