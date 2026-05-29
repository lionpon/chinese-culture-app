"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { getFreeTier } from "@/lib/free-tier";

export default function FeatureCard({
  href,
  title,
  desc,
  hideFree,
}: {
  href: string;
  title: string;
  desc: string;
  hideFree?: boolean;
}) {
  const t = useTranslations("home");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(getFreeTier().remaining);
  }, []);

  return (
    <Link
      href={href}
      className="group block p-4 sm:p-6 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all"
    >
      <h2 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors">
        {title}
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
      <span className="inline-block mt-4 text-xs font-medium text-stone-400 group-hover:text-stone-500 transition-colors">
        {hideFree
          ? t("cta.paid")
          : remaining > 0
            ? t("cta.free")
            : t("cta.paid")}
      </span>
    </Link>
  );
}
