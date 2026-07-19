"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { getFreeTier } from "@/lib/free-tier";

const ICONS: Record<string, string> = {
  naming: "🖋",
  calendar: "📅",
  divination: "☯",
  "palm-reading": "✋",
  "dream-interpretation": "🌙",
};

export default function FeatureCard({
  href,
  title,
  desc,
  hideFree,
  onClick,
}: {
  href: string;
  title: string;
  desc: string;
  hideFree?: boolean;
  onClick?: () => void;
}) {
  const t = useTranslations("home");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(getFreeTier().remaining);
  }, []);

  // Extract service key from href
  const service = href.split("/").pop() || "";
  const icon = ICONS[service] || "✨";
  const isFree = !hideFree && remaining > 0;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group block p-5 sm:p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--bg-card)",
      }}
      onMouseEnter={e => {
        const t = e.currentTarget;
        t.style.borderColor = "var(--border-strong)";
        t.style.boxShadow = "0 0 30px var(--gold-subtle), 0 4px 20px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        const t = e.currentTarget;
        t.style.borderColor = "var(--border-subtle)";
        t.style.boxShadow = "none";
      }}
    >
      <span className="text-3xl mb-3 block">{icon}</span>
      <h2 className="text-base font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{desc}</p>
      <span
        className="inline-block px-4 py-2 rounded-lg text-xs font-semibold"
        style={isFree ? {
          backgroundColor: "var(--gold-subtle)",
          color: "var(--gold)",
        } : {
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-muted)",
        }}
      >
        {isFree ? "✨ " + t("cta.free") : t("cta.paid")}
      </span>
    </Link>
  );
}
