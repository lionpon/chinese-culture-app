"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  function switchTo(target: string) {
    if (target === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: target });
    });
  }

  return (
    <span className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => switchTo("en")}
        className={`hover:text-stone-800 transition-colors ${locale === "en" ? "text-stone-800 font-bold" : "text-stone-400"}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-stone-300">|</span>
      <button
        onClick={() => switchTo("ru")}
        className={`hover:text-stone-800 transition-colors ${locale === "ru" ? "text-stone-800 font-bold" : "text-stone-400"}`}
        aria-label="Переключить на русский"
      >
        RU
      </button>
      <span className="text-stone-300">|</span>
      <button
        onClick={() => switchTo("ja")}
        className={`hover:text-stone-800 transition-colors ${locale === "ja" ? "text-stone-800 font-bold" : "text-stone-400"}`}
        aria-label="日本語に切り替え"
      >
        JA
      </button>
      <span className="text-stone-300">|</span>
      <button
        onClick={() => switchTo("ko")}
        className={`hover:text-stone-800 transition-colors ${locale === "ko" ? "text-stone-800 font-bold" : "text-stone-400"}`}
        aria-label="한국어로 전환"
      >
        KO
      </button>
    </span>
  );
}
