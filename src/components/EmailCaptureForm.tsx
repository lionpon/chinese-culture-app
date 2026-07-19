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
      <div className="mt-8 p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(91, 154, 123, 0.12)", border: "1px solid rgba(91, 154, 123, 0.25)" }}>
        <p className="text-sm" style={{ color: "var(--jade)" }}>{t("emailSuccess")}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-5 border rounded-lg" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-medium mb-3" style={{ color: "var(--text-body)" }}>{t("emailTitle")}</p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="flex-1 px-3 py-2 text-sm rounded-md focus:outline-none"
          style={{ backgroundColor: "var(--bg-deep)", border: "1px solid var(--border-medium)", color: "var(--text-primary)" }}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}
        >
          {status === "loading" ? "..." : t("emailSubmit")}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">{t("emailError")}</p>
      )}
    </div>
  );
}
