// PayPal REST API (Orders v2) — Smart Buttons server side.
// Complements the legacy Standard Checkout (paypal.ts). Shares the same
// Purchase state machine: pending → (capture/webhook) → paid+completed,
// result never regenerated, payer_email merged.
import { proxyReady } from "@/lib/net";
import { PRODUCT_NAMES } from "@/lib/paypal";

const SANDBOX = process.env.PAYPAL_SANDBOX === "true";
const API_BASE = SANDBOX
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com";

export function smartButtonsEnabled(): boolean {
  return !!process.env.PAYPAL_CLIENT_ID && !!process.env.PAYPAL_CLIENT_SECRET;
}

// TEST-ONLY stub gate — mirrors paypal.ts (never active in production:
// requires PAYPAL_SANDBOX=true which Render has set to "false").
const TEST_STUB =
  process.env.PAYPAL_SANDBOX === "true" && process.env.TEST_VERIFY_PAYPAL === "true";

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.token;
  await proxyReady;
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID || ""}:${process.env.PAYPAL_CLIENT_SECRET || ""}`
  ).toString("base64");
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(`PayPal OAuth failed: ${j.error || res.status}`);
  }
  const j = await res.json();
  cachedToken = { token: j.access_token, expiresAt: Date.now() + (j.expires_in || 32400) * 1000 };
  return cachedToken.token;
}

/** Create a CAPTURE-intent order server-side. Returns the order ID for the JS SDK. */
export async function createOrder(params: {
  purchaseId: string;
  type: string;
  amount: number;
}): Promise<string> {
  if (TEST_STUB) return `TEST_ORDER_${params.purchaseId}`;
  const token = await getAccessToken();
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: params.purchaseId,
        custom_id: params.purchaseId,
        description: (PRODUCT_NAMES[params.type] || "Chinese Culture Reading").slice(0, 127),
        amount: { currency_code: "USD", value: Math.max(1, params.amount).toFixed(2) },
      },
    ],
  };
  const res = await fetch(`${API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(`PayPal order create failed: ${j.message || j.error || res.status}`);
  }
  const j = await res.json();
  if (!j.id) throw new Error("PayPal order create: missing order id");
  return j.id;
}

export interface CaptureInfo {
  purchaseId: string; // custom_id — authoritative mapping set at order creation
  amount: string;
  currency: string;
  payerEmail: string;
  status: string;
}

/** Capture a created order (authoritative). Returns the purchase mapping. */
export async function captureOrder(orderId: string): Promise<CaptureInfo> {
  if (TEST_STUB) {
    const m = orderId.match(/^TEST_ORDER_(.+)$/);
    if (!m) throw new Error("TEST capture: unknown order id");
    return {
      purchaseId: m[1],
      amount: "0",
      currency: "USD",
      payerEmail: "test-payer@example.com",
      status: "COMPLETED",
    };
  }
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(`PayPal capture failed: ${j.message || j.error || res.status}`);
  }
  const j = await res.json();
  const unit = j.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  return {
    purchaseId: capture?.custom_id || unit?.custom_id || "",
    amount: capture?.amount?.value || "",
    currency: capture?.amount?.currency_code || "USD",
    payerEmail: j.payer?.email_address || "",
    status: j.status || "",
  };
}

/** Void an uncaptured order (cleanup after tests / abandoned checkout). */
export async function voidOrder(orderId: string): Promise<boolean> {
  if (TEST_STUB) return true;
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/v2/checkout/orders/${encodeURIComponent(orderId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok || res.status === 204;
}

interface WebhookHeaders {
  "paypal-auth-algo": string;
  "paypal-cert-url": string;
  "paypal-transmission-id": string;
  "paypal-transmission-sig": string;
  "paypal-transmission-time": string;
}

/** Verify a REST webhook notification signature (required before acting on events). */
export async function verifyWebhookSignature(
  headers: WebhookHeaders,
  rawBody: string
): Promise<boolean> {
  if (TEST_STUB) return true;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return false;
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_algo: headers["paypal-auth-algo"],
      cert_url: headers["paypal-cert-url"],
      transmission_id: headers["paypal-transmission-id"],
      transmission_sig: headers["paypal-transmission-sig"],
      transmission_time: headers["paypal-transmission-time"],
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBody),
    }),
  });
  const j = await res.json().catch(() => ({}));
  return j.verification_status === "SUCCESS";
}
