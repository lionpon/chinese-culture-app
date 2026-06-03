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

    // Client-side validation
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
      <section className="py-16 px-4 max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <div className="text-4xl mb-3">&#10003;</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">{t("success")}</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">{t("title")}</h2>
        <p className="text-stone-500">{t("description")}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-stone-700 mb-1">
            {t("email")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-stone-700 mb-1">
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder={t("messagePlaceholder")}
            className="w-full px-4 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-stone-800 resize-y"
          />
        </div>
        {status === "error" && errorMsg && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium rounded-xl transition-colors"
        >
          {status === "loading" ? t("sending") : t("submit")}
        </button>
      </form>
    </section>
  );
}
