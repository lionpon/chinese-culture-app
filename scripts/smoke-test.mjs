import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

// 1. Admin page (no token → should render shell without crash)
await page.goto(BASE + "/admin", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
console.log("admin title:", await page.title());

// 2. Divination page (hexagram explanation EN)
await page.goto(BASE + "/divination", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const hasIChing = (await page.content()).includes("I Ching");
console.log("divination page contains 'I Ching':", hasIChing);

// 3. Daily hexagram article page
await page.goto(BASE + "/daily/2026-09-04", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const body = await page.content();
console.log("daily page contains hexagram name:", body.includes("山水蒙") || body.includes("Youthful Folly"));

// 4. Social card endpoint through browser fetch
const cardStatus = await page.evaluate(async () => {
  const r = await fetch("/api/social/card?date=2026-09-04");
  return r.status + " " + r.headers.get("content-type");
});
console.log("card endpoint:", cardStatus);

console.log("JS errors:", errors.length ? errors.slice(0, 5) : "none");
await browser.close();
