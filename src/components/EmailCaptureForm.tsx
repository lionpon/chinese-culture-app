"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackClick } from "@/lib/track";

interface EmailCaptureFormProps {
  source: "zodiac-calculator" | "five-elements-test" | "divination" | "naming" | "calendar" | "palm-reading" | "dream-interpretation";
}

export default function EmailCaptureForm({ source }: EmailCaptureFormProps) {
  const t = useTranslations("tools");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    trackClick(`subscribe_${source}`);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-green-700 text-sm">{t("emailSuccess")}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-5 border border-stone-200 rounded-lg bg-stone-50">
      <p className="text-sm font-medium text-stone-700 mb-3">{t("emailTitle")}</p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/30"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {status === "loading" ? "..." : t("emailSubmit")}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-xs mt-2">{t("emailError")}</p>
      )}
    </div>
  );
}
