"use client";

import { Link } from "@/navigation";

/**
 * Mid-content CTA on /snake-2027/[animal] pages.
 * Must be a client component — the parent page is a server component and
 * passing onClick to a client Link from a server component throws
 * "Event handlers cannot be passed to Client Component props" during SSR.
 */
export default function SnakeMidCTA({ l, animalName }: { l: string; animalName: string }) {
  return (
    <Link
      href="/naming"
      className="block card-classic p-4 sm:p-5 transition-all hover:shadow-md group"
      style={{ borderColor: "var(--border-strong)", background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02))" }}
      onClick={() => {
        if (typeof window !== "undefined") {
          fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page: window.location.pathname, event: "snake_mid_cta_naming" }) }).catch(() => {});
        }
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5">🖋</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold group-hover:text-accent transition-colors" style={{ color: "var(--text-primary)" }}>
            {l === "ru" ? "Ваш знак рассказал о судьбе. Узнайте, какое имя она вам приготовила." :
             l === "ja" ? "干支が運命を語りました。その運命があなたに用意した名前を見つけましょう。" :
             l === "ko" ? "띠가 운명을 말했습니다. 그 운명이 당신을 위해 준비한 이름을 찾아보세요." :
             `Your ${animalName} forecast reveals the energy around you. Want to see what name the Five Elements would give someone born under your sign?`}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {l === "ru" ? "30 секунд · от $5.99" :
             l === "ja" ? "30秒 · $5.99から" :
             l === "ko" ? "30초 · $5.99부터" :
             "Takes 30 seconds · from $5.99"}
          </p>
        </div>
        <span className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "var(--accent)" }}>
          {l === "ru" ? "Создать имя →" :
           l === "ja" ? "名前を作成 →" :
           l === "ko" ? "이름 만들기 →" :
           "Get My Name →"}
        </span>
      </div>
    </Link>
  );
}
