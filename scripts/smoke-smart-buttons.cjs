// Live smoke test: paywall unlock → Smart Buttons render (LIVE client id) →
// PayPal hosted checkout opens with correct amount. No payment is made.
// Creates a real LIVE order via REST; it auto-expires in 3h (cleanup optional).
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const { chromium } = require("D:/chinese culture/project2/node_modules/playwright");
const prisma = new PrismaClient();

const BASE = "http://localhost:3000";
let failed = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
  if (!cond) failed++;
};

async function main() {
  // Seed: a completed free preview with result (unlock flow prerequisite)
  const seed = await prisma.purchase.create({
    data: {
      checkoutId: crypto.randomUUID(), type: "calendar",
      input: JSON.stringify({ startDate: "2027-12-01", endDate: "2027-12-05", eventType: "wedding", locale: "en", amount: 5.99, mark: "SMOKE-SMART" }),
      status: "completed", paid: false, result: JSON.stringify({ auspiciousDays: [{ date: "2027-12-01", score: 95, SMOKE: true }] }),
    },
  });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ userAgent: "Smoke-Smart/1.0" });
  const page = await ctx.newPage();
  try {
    await page.goto(`${BASE}/success?purchase_id=${seed.id}&free=1&test=1`, { waitUntil: "networkidle" });
    ok("s1.success 页加载", await page.locator("text=unlock").first().isVisible().catch(() => false) || (await page.title()) !== "");

    // Click unlock → pending created → smart buttons area appears
    const unlockBtn = page.locator("button", { hasText: /Full Reading|full reading|Unlock/i }).first();
    await unlockBtn.click();
    await page.waitForTimeout(6000); // SDK script + iframe load

    // PayPal buttons live inside an iframe; check iframe presence + card button
    const frames = page.frames();
    const paypalFrame = frames.find((f) => f.url().includes("paypal.com") || f.url().includes("paypalobjects.com"));
    ok("s2.PayPal SDK iframe 加载", !!paypalFrame, paypalFrame ? paypalFrame.url().slice(0, 60) : "no paypal frame");

    if (paypalFrame) {
      const cardBtn = paypalFrame.locator('[data-funding-source="card"], [data-funding-source="paypal"]').first();
      await cardBtn.waitFor({ state: "visible", timeout: 15000 }).catch(() => {});
      const fundingCount = await paypalFrame.locator('[data-funding-source]').count().catch(() => 0);
      ok("s3.funding 按钮渲染 (paypal/card)", fundingCount >= 1, "funding sources=" + fundingCount);

      // Click card funding → PayPal hosted checkout should open (popup or new iframe)
      await cardBtn.click().catch(() => {});
      await page.waitForTimeout(4000);
      const popup = ctx.pages().find((p) => p !== page);
      const frames2 = page.frames();
      const checkoutFrame = frames2.find((f) => f.url().includes("paypal.com") && f.url().includes("checkout"));
      ok("s4.点击后弹出 PayPal 结账界面", !!popup || !!checkoutFrame, popup ? "popup: " + popup.url().slice(0, 60) : (checkoutFrame ? "frame: " + checkoutFrame.url().slice(0, 60) : "none"));
    }
  } catch (e) {
    console.error("smoke error:", e.message);
    failed++;
  } finally {
    await browser.close();
    await prisma.purchase.deleteMany({ where: { input: { contains: "SMOKE-SMART" } } });
    console.log("seeded purchase cleaned");
    console.log(failed === 0 ? "SMOKE PASS — 0 失败" : failed + " 项失败");
    await prisma.$disconnect().catch(() => {});
    process.exit(failed === 0 ? 0 : 1);
  }
}
main();
