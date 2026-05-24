export default function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <>
      <button type="submit" disabled={loading} className="w-full py-3 btn-primary">
        {loading ? "Processing..." : label}
      </button>
      <p className="text-center text-xs text-stone-400">You will be redirected to a secure payment page</p>
    </>
  );
}
