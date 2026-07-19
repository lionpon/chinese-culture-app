"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { trackClick } from "@/lib/track";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!message || message.length < 10) {
      setStatus("error");
      setErrorMsg("Message must be at least 10 characters.");
      return;
    }

    trackClick("form_submit_contact");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
      } else if (res.status === 429) {
        setStatus("error");
        setErrorMsg(data.message || "Please wait before sending another message.");
      } else {
        setStatus("error");
        setErrorMsg(t("error"));
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("error"));
    }
  }

  if (status === "success") {
    return (
      <section className="py-8 px-4 max-w-md mx-auto text-center">
        <p className="text-sm" style={{ color: "var(--jade)" }}>{t("success")}</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 max-w-md mx-auto">
      <h2 className="text-sm font-medium text-center mb-4" style={{ color: "var(--text-muted)" }}>{t("title")}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="flex-1 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-1.5 text-sm font-medium rounded-lg transition-colors shrink-0 disabled:opacity-50"
            style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)" }}
          >
            {status === "loading" ? t("sending") : t("submit")}
          </button>
        </div>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={2}
          placeholder={t("messagePlaceholder")}
          className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 resize-none"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
        />
        {status === "error" && errorMsg && (
          <p className="text-red-400 text-xs">{errorMsg}</p>
        )}
      </form>
    </section>
  );
}
