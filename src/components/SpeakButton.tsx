"use client";

export default function SpeakButton({ text }: { text: string }) {
  function speak() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.4;
    window.speechSynthesis.speak(u);
  }

  return (
    <button
      onClick={speak}
      className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 transition-colors"
      title="Listen to pronunciation"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.8l4.7-3.5a.5.5 0 01.8.4v12.6a.5.5 0 01-.8.4L6.5 15.2H3.2a1 1 0 01-1-1v-4.4a1 1 0 011-1h3.3z"
        />
      </svg>
      Listen
    </button>
  );
}
