"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

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
        <p className="text-sm text-green-600">{t("success")}</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 max-w-md mx-auto">
      <h2 className="text-sm font-medium text-stone-400 text-center mb-4">{t("title")}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="flex-1 px-3 py-1.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 text-stone-700 placeholder:text-stone-300"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-1.5 text-sm bg-stone-100 hover:bg-stone-200 disabled:bg-stone-50 text-stone-500 font-medium rounded-lg transition-colors shrink-0"
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
          className="w-full px-3 py-1.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 text-stone-700 placeholder:text-stone-300 resize-none"
        />
        {status === "error" && errorMsg && (
          <p className="text-red-500 text-xs">{errorMsg}</p>
        )}
      </form>
    </section>
  );
}
