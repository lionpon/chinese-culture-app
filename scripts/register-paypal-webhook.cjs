// Register/verify the REST webhook subscription for Smart Buttons.
// Prints the webhook ID (config value, not a secret) and stores it in .env.local.
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");
const env = {};
for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}
const SANDBOX = env.PAYPAL_SANDBOX === "true";
const API_BASE = SANDBOX ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
// LIVE registration always targets production (PayPal validates the URL is public)
const WEBHOOK_URL = (SANDBOX
  ? (env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "") // sandbox: local URLs are rejected by PayPal → stub mode only
  : "https://www.culture-of-china.com") + "/api/webhook/paypal-rest";

async function token() {
  const auth = Buffer.from(env.PAYPAL_CLIENT_ID + ":" + env.PAYPAL_CLIENT_SECRET).toString("base64");
  const res = await fetch(API_BASE + "/v1/oauth2/token", {
    method: "POST",
    headers: { Authorization: "Basic " + auth, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const j = await res.json();
  if (!j.access_token) throw new Error("OAuth failed: " + (j.error || res.status));
  return j.access_token;
}

async function main() {
  const t = await token();
  const list = await (await fetch(API_BASE + "/v1/notifications/webhooks", { headers: { Authorization: "Bearer " + t } })).json();
  const webhooks = list.webhooks || [];
  console.log("existing webhooks:", webhooks.length, "| environment:", SANDBOX ? "sandbox" : "LIVE");

  if (SANDBOX) {
    console.log("sandbox mode: webhook registration skipped (use TEST_VERIFY_PAYPAL stub locally)");
    process.exit(0);
  }
  let webhook = webhooks.find((w) => w.url === WEBHOOK_URL);
  if (!webhook) {
    const res = await fetch(API_BASE + "/v1/notifications/webhooks", {
      method: "POST",
      headers: { Authorization: "Bearer " + t, "Content-Type": "application/json" },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        event_types: [
          { name: "PAYMENT.CAPTURE.COMPLETED" },
          { name: "CHECKOUT.ORDER.APPROVED" },
          { name: "PAYMENT.CAPTURE.DENIED" },
        ],
      }),
    });
    webhook = await res.json();
    if (!webhook.id) throw new Error("create failed: " + JSON.stringify(webhook));
    console.log("created webhook:", webhook.id);
  } else {
    console.log("reusing webhook:", webhook.id);
  }

  // store PAYPAL_WEBHOOK_ID in .env.local
  let s = fs.readFileSync(envPath, "utf8");
  const key = "PAYPAL_WEBHOOK_ID";
  if (new RegExp("^" + key + "=", "m").test(s)) {
    s = s.replace(new RegExp("^" + key + "=.*$", "m"), key + "=" + webhook.id);
  } else {
    s = s.replace(/\s*$/, "\n" + key + "=" + webhook.id + "\n");
  }
  fs.writeFileSync(envPath, s);
  console.log("PAYPAL_WEBHOOK_ID written to .env.local");
  console.log("WEBHOOK_ID=" + webhook.id);
}

main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
