"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import PaymentTrustBadges from "./PaymentTrustBadges";
import PayPalSmartButtons from "./PayPalSmartButtons";
import { trackClick } from "@/lib/track";

/**
 * 付费墙 — 2026-10-28 首单 offer + 结账确认层 + email 采集 A/B (预注册 §⑰)
 * 流程: 锁定卡 → 解锁点击 → 确认层(准确价格+所得清单+信任+email) → Continue → PayPal 按钮
 */

export default function PaywallOverlay({
  purchaseId,
  featureKey1,
  featureKey2,
  lockedTitles,
}: {
  purchaseId: string;
  featureKey1: string;
  featureKey2: string;
  lockedTitles?: string[];
}) {
  const t = useTranslations("success");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"locked" | "confirm" | "pay">("locked");
  // Smart Buttons state: after /api/unlock creates/reuses the pending order,
  // the JS SDK buttons render inline (no redirect → no abandonment at PayPal).
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [smartError, setSmartError] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState<number | null>(null);
  const [offerApplied, setOfferApplied] = useState(false);
  // email 采集 A/B: a=对照(可选输入), b=强化(强调文案+金框+helper)
  const [emailVariant, setEmailVariant] = useState<"a" | "b">("a");
  const variantAssigned = useRef(false);
  const smartEnabled = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (variantAssigned.current) return;
    variantAssigned.current = true;
    try {
      let v = localStorage.getItem("cc_paywall_email_ab");
      if (v !== "a" && v !== "b") {
        v = Math.random() < 0.5 ? "a" : "b";
        localStorage.setItem("cc_paywall_email_ab", v);
      }
      setEmailVariant(v as "a" | "b");
      trackClick("paywall_email_variant_" + v);
    } catch {
      setEmailVariant("a");
    }
  }, []);

  async function unlock() {
    setLoading(true);
    setSmartError(null);
    trackClick("paywall_unlock_click");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchase_id: purchaseId,
          email: email.trim() || undefined,
          mode: smartEnabled ? "smart" : "standard",
        }),
      });
      const data = await res.json();
      if (data.url && !data.purchase_id) {
        // Already-paid sibling: straight to the owned result page.
        window.location.href = data.url;
      } else if (data.purchase_id) {
        // Smart mode: pending order exists — show confirmation layer first,
        // PayPal buttons reveal only after the buyer confirms the price.
        setPendingId(data.purchase_id);
        setFallbackUrl(data.standard_url || null);
        if (typeof data.amount === "number") setPayAmount(data.amount);
        setOfferApplied(!!data.offer);
        setStage("confirm");
        trackClick("paywall_confirm_shown");
        if (data.offer) trackClick("paywall_offer_shown");
      } else if (data.url) {
        // Legacy path (Smart Buttons disabled server-side).
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function continueToPay() {
    if (email.trim()) trackClick("paywall_email_filled_" + emailVariant);
    trackClick("paywall_confirm_continue");
    setStage("pay");
    trackClick("pay_smart_buttons_revealed");
  }

  const features = lockedTitles || [t(featureKey1), t(featureKey2)];
  const amountLabel = payAmount ? `$${payAmount.toFixed(2)}` : "";

  return (
    <div className="relative my-6">
      {/* Divider with label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-medium)" }} />
        <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--gold)" }}>
          ✨ {t("unlockHeading")}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-medium)" }} />
      </div>

      {/* Upgrade card */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))",
          border: "1px solid var(--border-medium)",
        }}
      >
        {/* Confirmation layer — exact price + what-you-get + trust, BEFORE PayPal buttons */}
        {stage === "confirm" && (
          <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: "var(--bg-deep)", border: "1px solid var(--border-medium)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{t("confirmTitle")}</p>
            {offerApplied ? (
              <div>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1" style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>
                  {t("confirmOfferBadge")}
                </span>
                <p className="text-lg font-bold" style={{ color: "var(--gold)" }}>
                  {t("confirmOfferPrice", { amount: amountLabel })}
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold" style={{ color: "var(--gold)" }}>
                {t("confirmPrice", { amount: amountLabel })}
              </p>
            )}
            <p className="text-xs mt-2 mb-2" style={{ color: "var(--text-body)" }}>{t("confirmYouGet")}:</p>
            <ul className="space-y-1 mb-2">
              {features.map((title, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-body)" }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }}>✓</span>
                  <span>{title}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-xs" style={{ color: "var(--text-body)" }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }}>✓</span>
                <span>{t("confirmInstant")}</span>
              </li>
            </ul>
            <PaymentTrustBadges />
            <button
              onClick={continueToPay}
              className="w-full py-3 rounded-xl text-sm font-semibold btn-primary mt-3"
            >
              {t("continueCta")}
            </button>
            <button
              onClick={() => { setStage("locked"); setSmartError(null); }}
              className="w-full text-center text-xs underline mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              {t("confirmBack")}
            </button>
          </div>
        )}

        {stage !== "confirm" && (
          <>
            {/* Feature list */}
            <ul className="space-y-2 mb-4">
              {features.map((title, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-body)" }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }}>✓</span>
                  <span>{title}</span>
                </li>
              ))}
            </ul>

            {/* Email capture — last chance to reach the buyer if they abandon.
                A/B: a=对照可选输入; b=强化(强调文案+金框+helper) */}
            <div
              className="mb-3 rounded-lg p-3"
              style={emailVariant === "b"
                ? { border: "1px solid var(--gold)", backgroundColor: "var(--bg-deep)" }
                : {}}
            >
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-body)" }}>
                {emailVariant === "b" ? t("emailStrongLabel") : t("emailLabel")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                autoComplete="email"
                className="w-full rounded-lg px-3 py-2 text-sm border bg-white"
                style={{ borderColor: "var(--border-medium)", color: "var(--text-body)" }}
              />
              {emailVariant === "b" && (
                <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
                  {t("emailStrongHelper")}
                </p>
              )}
            </div>

            {stage === "pay" && pendingId ? (
              /* Inline Smart Buttons — PayPal balance + guest debit/credit card */
              <>
                <PayPalSmartButtons
                  purchaseId={pendingId}
                  onCancel={() => setSmartError(null)}
                  onError={(msg) => setSmartError(msg)}
                />
                {smartError && (
                  <p className="text-xs text-center my-2" style={{ color: "#b3261e" }}>
                    {smartError}
                  </p>
                )}
                {fallbackUrl && (
                  <a
                    href={fallbackUrl}
                    onClick={() => trackClick("pay_smart_fallback_click")}
                    className="block text-center text-xs underline mt-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t("smartFallback")}
                  </a>
                )}
              </>
            ) : (
              /* CTA — creates the pending order, then shows the confirmation layer */
              <button
                onClick={unlock}
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold btn-primary disabled:opacity-60 mb-2"
              >
                {loading ? "..." : t("unlockFullCta")}
              </button>
            )}

            {/* Price anchor — kills the "is it worth $5.99?" objection before it forms */}
            <p className="text-xs text-center mb-3" style={{ color: "var(--text-muted)" }}>
              {t("priceAnchor")}
            </p>

            {/* Payment trust badges */}
            <PaymentTrustBadges />

            {/* Note — paywall stays visible, no dismiss */}
            <p className="w-full pt-3 text-xs text-center" style={{ color: "var(--text-dim)" }}>
              {t("paywallPersistent")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
