import { proxyReady } from "@/lib/net";

export const PAYPAL_EMAIL = process.env.PAYPAL_EMAIL || "22728717@qq.com";

const PAYPAL_URL =
  process.env.PAYPAL_SANDBOX === "true"
    ? "https://www.sandbox.paypal.com/cgi-bin/webscr"
    : "https://www.paypal.com/cgi-bin/webscr";

export function getAppUrl(): string {
  // Match config.ts priority chain — critical for PayPal return/IPN URLs
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  if (typeof process !== "undefined" && process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, "");
  return "https://www.culture-of-china.com";
}

export const PRODUCT_NAMES: Record<string, string> = {
  naming: "Chinese Name Reading — Chinese Culture Studio",
  calendar: "Auspicious Date Selection — Chinese Culture Studio",
  divination: "I Ching Reading — Chinese Culture Studio",
  "palm-reading": "Palm Reading — Chinese Culture Studio",
  "dream-interpretation": "Dream Interpretation — Chinese Culture Studio",
};

export function buildPayPalCheckoutUrl(purchaseId: string, type: string, amount = 1): string {
  const appUrl = getAppUrl();
  const itemName = PRODUCT_NAMES[type] || "Chinese Culture Reading";

  const params = new URLSearchParams({
    cmd: "_xclick",
    business: PAYPAL_EMAIL,
    item_name: itemName,
    item_number: type,
    amount: Math.max(1, amount).toFixed(2),
    currency_code: "USD",
    custom: purchaseId,
    // rm=2 → PayPal POSTs all vars (tx, custom) to this server route,
    // which converts them into a GET redirect for the success page.
    return: `${appUrl}/api/paypal/return?purchase_id=${purchaseId}`,
    cancel_return: `${appUrl}/`,
    notify_url: `${appUrl}/api/webhook/paypal`,
    rm: "2",  // POST with tx param → enables PDT instant verification
    no_note: "1",
    no_shipping: "1",
  });

  return `${PAYPAL_URL}?${params.toString()}`;
}

export async function verifyIPN(rawBody: string): Promise<boolean> {
  // TEST-ONLY stub: local closed-loop harness (never active in production —
  // requires PAYPAL_SANDBOX=true which Render has set to "false")
  if (process.env.PAYPAL_SANDBOX === "true" && process.env.TEST_VERIFY_PAYPAL === "true") {
    return true;
  }
  await proxyReady;
  const verifyBody = "cmd=_notify-validate&" + rawBody;

  const res = await fetch(PAYPAL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: verifyBody,
  });

  const text = await res.text();
  return text.trim() === "VERIFIED";
}

export async function verifyPDT(tx: string): Promise<{ ok: boolean; paymentStatus?: string; purchaseId?: string; amount?: string }> {
  // TEST-ONLY stub: local closed-loop harness (never active in production)
  if (process.env.PAYPAL_SANDBOX === "true" && process.env.TEST_VERIFY_PAYPAL === "true") {
    if (tx === "TEST_TX_PAID") {
      return { ok: true, paymentStatus: "Completed", amount: "0" };
    }
    return { ok: false };
  }
  await proxyReady;
  const token = process.env.PAYPAL_PDT_TOKEN;
  if (!token) return { ok: false };

  const body = new URLSearchParams({ cmd: "_notify-synch", tx, at: token });

  const res = await fetch(PAYPAL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const text = await res.text();

  if (!text.startsWith("SUCCESS")) return { ok: false };

  // Parse PDT response lines: SUCCESS\nkey=value\nkey=value...
  const lines = text.split("\n");
  const data: Record<string, string> = {};
  for (let i = 1; i < lines.length; i++) {
    const eq = lines[i].indexOf("=");
    if (eq > 0) data[lines[i].substring(0, eq)] = lines[i].substring(eq + 1);
  }

  return {
    ok: true,
    paymentStatus: data.payment_status,
    purchaseId: data.custom || data.cm,
    amount: data.mc_gross,
  };
}
