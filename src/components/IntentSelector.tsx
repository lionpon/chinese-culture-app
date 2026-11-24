"use client";

import { useTranslations } from "next-intl";
import { trackClick } from "@/lib/track";

/**
 * 意图选择器 — 2026-11-24 预注册实验（WORK_LOG_2026-11-24 §⑪）
 * 访客自报目的，引导到名字表或免费预览工具。事件: intent_selector_character/naming/browse。
 * 移动端：flex-col 堆叠 + min-h 2.5rem 触控目标（规范第 6 条）。
 */
export default function IntentSelector() {
  const t = useTranslations("tools");

  function go(target: "character" | "naming" | "browse") {
    trackClick("intent_selector_" + target);
    const id = target === "naming" ? "name-preview-tool" : "name-table";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="not-prose my-4 rounded-xl border p-3 sm:p-4" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--gold)" }}>{t("intentSelector.title")}</p>
      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{t("intentSelector.subtitle")}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => go("character")}
          className="flex-1 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors"
          style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)", minHeight: "2.5rem" }}>
          🎭 {t("intentSelector.character")}
        </button>
        <button onClick={() => go("naming")}
          className="flex-1 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors btn-primary"
          style={{ minHeight: "2.5rem" }}>
          👶 {t("intentSelector.naming")}
        </button>
        <button onClick={() => go("browse")}
          className="flex-1 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors"
          style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)", minHeight: "2.5rem" }}>
          👀 {t("intentSelector.browse")}
        </button>
      </div>
    </div>
  );
}
