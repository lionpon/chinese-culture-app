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
      className="group block p-5 sm:p-6 rounded-2xl border-2 border-stone-100 bg-white hover:border-accent/30 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      <span className="text-3xl mb-3 block">{icon}</span>
      <h2 className="text-base font-bold text-stone-800 mb-1.5 group-hover:text-accent transition-colors">
        {title}
      </h2>
      <p className="text-xs text-stone-400 leading-relaxed mb-4">{desc}</p>
      <span
        className={`inline-block px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
          isFree
            ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
            : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
        }`}
      >
        {isFree ? "✨ " + t("cta.free") : t("cta.paid")}
      </span>
    </Link>
  );
}
