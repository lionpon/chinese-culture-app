export default function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="text-center py-16">
      <div className="animate-spin w-8 h-8 border-2 border-stone-300 border-t-stone-500 rounded-full mx-auto mb-4" />
      <p className="text-stone-500">{text}</p>
    </div>
  );
}
