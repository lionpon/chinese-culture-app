import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

// Load divination, pick a question, cast a preview (no payment needed)
await page.goto("http://localhost:3000/divination", { waitUntil: "networkidle" });
const textarea = page.locator("textarea, input[type=text]").first();
if (await textarea.count()) {
  await textarea.fill("Should I change my job this year?");
}
const previewBtn = page.getByRole("button", { name: /preview|预览|preview/i }).first();
let clicked = false;
for (const sel of ["button:has-text('Preview')", "button:has-text('🔮')"]) {
  const btn = page.locator(sel).first();
  if (await btn.count()) { await btn.click(); clicked = true; break; }
}
await page.waitForTimeout(4000);
const content = await page.content();
const hasLines = /lines|Line \d|—\s|⚊|⚋/.test(content);
console.log("clicked:", clicked, "| hexagram content present:", /hexagram|Hexagram/i.test(content), "| lines visible:", hasLines);
console.log("page errors:", errors.length ? errors.slice(0, 3) : "none");
await browser.close();
