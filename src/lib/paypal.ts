const PAYPAL_API =
  process.env.PAYPAL_SANDBOX === "true"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`PayPal auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

export const PRODUCT_NAMES: Record<string, string> = {
  naming: "Chinese Name Reading",
  calendar: "Auspicious Date Reading",
  divination: "I Ching Divination Reading",
};

export function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000";
}

interface CreatePayPalOrderParams {
  purchaseId: string;
  type: string;
}

export async function createPayPalOrder(params: CreatePayPalOrderParams) {
  const { purchaseId, type } = params;
  const token = await getAccessToken();
  const appUrl = getAppUrl();

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: purchaseId,
        amount: { currency_code: "USD", value: "1.00" },
        description: PRODUCT_NAMES[type] || "Chinese Culture Reading",
      },
    ],
    application_context: {
      brand_name: "Chinese Culture Studio",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${appUrl}/success?purchase_id=${purchaseId}`,
      cancel_url: `${appUrl}/`,
    },
  };

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`PayPal order creation failed: ${JSON.stringify(json)}`);
  return { orderId: json.id, status: json.status };
}

export async function capturePayPalOrder(orderId: string) {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`PayPal capture failed: ${JSON.stringify(json)}`);
  return json;
}
