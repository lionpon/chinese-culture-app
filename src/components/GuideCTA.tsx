"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";

export default function GuideCTA({
  href,
  service,
  variant = "card",
}: {
  href: string;
  service: "naming" | "calendar" | "divination" | "palm-reading" | "dream-interpretation";
  variant?: "card" | "inline" | "sticky";
}) {
  const t = useTranslations("guide");

  const info: Record<string, { title: string; desc: string; cta: string; icon: string }> = {
    naming: { title: t("cta.naming.title"), desc: t("cta.naming.desc"), cta: t("cta.naming.cta"), icon: "🖋" },
    calendar: { title: t("cta.calendar.title"), desc: t("cta.calendar.desc"), cta: t("cta.calendar.cta"), icon: "📅" },
    divination: { title: t("cta.divination.title"), desc: t("cta.divination.desc"), cta: t("cta.divination.cta"), icon: "☯" },
    "palm-reading": { title: t("cta.palm.title"), desc: t("cta.palm.desc"), cta: t("cta.palm.cta"), icon: "✋" },
    "dream-interpretation": { title: t("cta.dream.title"), desc: t("cta.dream.desc"), cta: t("cta.dream.cta"), icon: "🌙" },
  };

  const item = info[service] || info.divination;

  if (variant === "sticky") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 border-t shadow-lg animate-slide-up" style={{ backgroundColor: "rgba(26, 26, 46, 0.95)", backdropFilter: "blur(12px)", borderColor: "var(--border-medium)" }}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <span className="text-xl shrink-0">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>{item.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
          </div>
          <Link
            href={href}
            onClick={() => trackClick("guide_cta_sticky_" + service)}
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold btn-primary whitespace-nowrap shadow-md"
          >
            {item.cta} →
          </Link>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="not-prose my-6">
        <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--gold-subtle)" }}>
          <span className="text-2xl shrink-0">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--gold)" }}>{item.title}</p>
            <p className="text-xs truncate hidden sm:block" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
          </div>
          <Link
            href={href}
            onClick={() => trackClick("guide_cta_inline_" + service)}
            className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold btn-primary whitespace-nowrap"
          >
            {item.cta} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-10">
      <div className="card-classic p-5 sm:p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.04))", borderColor: "var(--border-medium)" }}>
        <p className="text-2xl mb-2">{item.icon}</p>
        <h3 className="text-base font-bold mb-1" style={{ color: "var(--gold)" }}>
          {item.title}
        </h3>
        <p className="text-sm mb-4 max-w-sm mx-auto" style={{ color: "var(--text-body)" }}>
          {item.desc}
        </p>
        <Link
          href={href}
          onClick={() => trackClick("guide_cta_" + service)}
          className="inline-block px-6 py-3 rounded-xl text-sm font-medium btn-primary"
        >
          {item.cta} →
        </Link>
        <p className="text-xs mt-3" style={{ color: "var(--text-dim)" }}>
          {t("cta.disclaimer")}
        </p>
      </div>
    </div>
  );
}
