"use client";

import { useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { trackClick } from "@/lib/track";

// Smart Buttons (JS SDK) — inline PayPal balance + guest card checkout.
// Renders only when NEXT_PUBLIC_PAYPAL_CLIENT_ID is set (the gray-scale switch);
// PaywallOverlay keeps the legacy Standard link as fallback.
//
// 埋点(2026-10-19 补,结束 unlock→pay 0 捕获盲区):
//   pay_smart_render_ok  — SDK 按钮渲染成功(onInit)
//   pay_smart_click      — 用户点击 PayPal 按钮(onClick)
//   pay_smart_approve    — 用户在弹窗内完成批准(onApprove)
//   pay_smart_error      — SDK/建单/捕获任一环节报错(onError)
export default function PayPalSmartButtons({
  purchaseId,
  onCancel,
  onError,
}: {
  purchaseId: string;
  onCancel?: () => void;
  onError?: (message: string) => void;
}) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [busy, setBusy] = useState(false);
  // onInit 在按钮重渲染时会重复触发,只记一次渲染成功
  const initTracked = useRef(false);

  if (!clientId) return null;

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
        components: "buttons",
      }}
    >
      <div className={busy ? "pointer-events-none opacity-60" : ""}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", color: "gold", height: 44, label: "pay" }}
          onInit={() => {
            if (!initTracked.current) {
              initTracked.current = true;
              trackClick("pay_smart_render_ok");
            }
          }}
          onClick={() => {
            trackClick("pay_smart_click");
          }}
          createOrder={async () => {
            setBusy(true);
            try {
              const res = await fetch("/api/paypal/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ purchase_id: purchaseId }),
              });
              const data = await res.json();
              if (!data.order_id) {
                onError?.(data.error || "Order creation failed");
                throw new Error(data.error || "Order creation failed");
              }
              return data.order_id;
            } finally {
              setBusy(false);
            }
          }}
          onApprove={async (data) => {
            trackClick("pay_smart_approve");
            setBusy(true);
            try {
              const res = await fetch("/api/paypal/capture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: data.orderID }),
              });
              const j = await res.json();
              if (!j.purchase_id) {
                onError?.(j.error || "Payment could not be completed");
                throw new Error(j.error || "Payment could not be completed");
              }
              // Server marked the purchase paid+completed — show the result.
              window.location.href = `/success?purchase_id=${j.purchase_id}`;
            } catch (e) {
              onError?.(e instanceof Error ? e.message : "Payment could not be completed");
            } finally {
              setBusy(false);
            }
          }}
          onCancel={() => onCancel?.()}
          onError={() => {
            trackClick("pay_smart_error");
            onError?.("PayPal could not be loaded");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
