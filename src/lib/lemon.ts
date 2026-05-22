import crypto from "crypto";

export function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const LS_API = "https://api.lemonsqueezy.com/v1";

interface CreateCheckoutParams {
  storeId: string;
  variantId: string;
  purchaseId: string;
  type: string;
}

const PRODUCT_NAMES: Record<string, string> = {
  naming: "Chinese Name Reading",
  calendar: "Auspicious Date Reading",
  divination: "I Ching Divination Reading",
};

export async function createLemonCheckout(params: CreateCheckoutParams) {
  const { storeId, variantId, purchaseId, type } = params;
  const appUrl = getAppUrl();

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        custom_price: 100,
        checkout_data: {
          custom: { purchaseId, type },
        },
        product_options: {
          redirect_url: `${appUrl}/success?purchase_id=${purchaseId}`,
          receipt_button_text: "Return to App",
          receipt_thank_you_note: "Thank you for supporting Chinese Culture Studio!",
        },
        checkout_options: {
          embed: false,
          media: false,
          logo: true,
          desc: true,
        },
      },
      relationships: {
        store: { data: { type: "stores", id: storeId } },
        variant: { data: { type: "variants", id: variantId } },
      },
    },
  };

  const res = await fetch(`${LS_API}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Lemon Squeezy checkout failed: ${err}`);
  }

  const json = await res.json();
  return {
    checkoutId: json.data.id,
    url: json.data.attributes.url,
  };
}

export function verifyLemonWebhook(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

export { PRODUCT_NAMES };
