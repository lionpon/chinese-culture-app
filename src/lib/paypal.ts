export const PAYPAL_EMAIL = "lionpon@sina.com";

const PAYPAL_URL =
  process.env.PAYPAL_SANDBOX === "true"
    ? "https://www.sandbox.paypal.com/cgi-bin/webscr"
    : "https://www.paypal.com/cgi-bin/webscr";

export function getAppUrl(host?: string) {
  if (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL !== "http://localhost:3000") {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (host) return `https://${host}`;
  return "http://localhost:3000";
}

export const PRODUCT_NAMES: Record<string, string> = {
  naming: "Chinese Name Reading",
  calendar: "Auspicious Date Reading",
  divination: "I Ching Divination Reading",
};

export function buildPayPalCheckoutUrl(purchaseId: string, type: string, host?: string): string {
  const appUrl = getAppUrl(host);
  const itemName = PRODUCT_NAMES[type] || "Chinese Culture Reading";

  const params = new URLSearchParams({
    cmd: "_xclick",
    business: PAYPAL_EMAIL,
    item_name: itemName,
    item_number: type,
    amount: "1.00",
    currency_code: "USD",
    custom: purchaseId,
    return: `${appUrl}/success?purchase_id=${purchaseId}`,
    cancel_return: `${appUrl}/`,
    notify_url: `${appUrl}/api/webhook/paypal`,
    no_note: "1",
    no_shipping: "1",
  });

  return `${PAYPAL_URL}?${params.toString()}`;
}

export async function verifyIPN(rawBody: string): Promise<boolean> {
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
  const token = process.env.PAYPAL_PDT_TOKEN;
  if (!token) return { ok: false };

  const body = new URLSearchParams({ cmd: "_notify-synch", tx, at: token });

  const res = await fetch("https://www.paypal.com/cgi-bin/webscr", {
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
