"use client";

import { useState, useEffect } from "react";
import { getFreeTier } from "@/lib/free-tier";

export default function FeatureCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(getFreeTier().remaining);
  }, []);

  return (
    <a
      href={href}
      className="group block p-4 sm:p-6 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all"
    >
      <h2 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors">
        {title}
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
      <span className="inline-block mt-4 text-xs font-medium text-stone-400 group-hover:text-stone-500 transition-colors">
        {remaining > 0 ? "Free trial available →" : "$1 per reading →"}
      </span>
    </a>
  );
}
