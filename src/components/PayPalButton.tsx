"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}

interface PayPalButtonProps {
  orderId: string;
  purchaseId: string;
  onSuccess: (purchaseId: string) => void;
  onError: (msg: string) => void;
  onCancel: () => void;
}

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

export default function PayPalButton({
  orderId,
  purchaseId,
  onSuccess,
  onError,
  onCancel,
}: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (renderedRef.current) return;

    if (document.querySelector('script[src*="paypal.com/sdk"]')) {
      renderButton();
    } else {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`;
      script.onload = renderButton;
      script.onerror = () => onError("Failed to load PayPal");
      document.body.appendChild(script);
    }

    function renderButton() {
      if (!window.paypal || !containerRef.current) return;
      renderedRef.current = true;

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          createOrder: () => orderId,
          onApprove: async (data: Record<string, unknown>) => {
            try {
              const res = await fetch("/api/paypal/capture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: data.orderID, purchaseId }),
              });
              const result = await res.json();
              if (result.success) onSuccess(result.purchaseId);
              else onError(result.error || "Capture failed");
            } catch {
              onError("Network error during payment capture");
            }
          },
          onCancel: () => onCancel(),
          onError: (err: Record<string, unknown>) =>
            onError((err?.message as string) || "PayPal error"),
        })
        .render(containerRef.current);
    }

    const container = containerRef.current;
    return () => {
      if (container) container.innerHTML = "";
    };
  }, [orderId, purchaseId, onSuccess, onError, onCancel]);

  return <div ref={containerRef} className="paypal-button-container" />;
}
