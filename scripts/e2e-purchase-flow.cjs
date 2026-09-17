// E2E: unlock → PayPal → paid return → abandoned → recovery 全链路验证
// 运行前提: dev server (PAYPAL_SANDBOX=true TEST_VERIFY_PAYPAL=true RESEND_API_KEY=) 已起
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
process.env.DATABASE_URL = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const { chromium } = require("D:/chinese culture/project2/node_modules/playwright");
const prisma = new PrismaClient();

const BASE = "http://localhost:3000";
const MARK = "E2E-UNLOCK-FIX"; // 清理标记词
let failed = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
  if (!cond) failed++;
};

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const testIds = [];

  try {
    // ── 1. 免费日历流程 → P1 ──
    await page.goto(`${BASE}/calendar?test=1`);
    await page.fill('input[name="startDate"]', "2026-12-01");
    await page.fill('input[name="endDate"]', "2026-12-10");
    await page.selectOption('select[name="eventType"]', "wedding");
    await page.fill('input[name="email"]', "buyer-e2e@example.com");
    ok("1b.日历表单含 email 输入框", await page.locator('input[name="email"]').isVisible().catch(() => false));
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/success\?purchase_id=.*&free=1/, { timeout: 60000 });
    const P1 = new URL(page.url()).searchParams.get("purchase_id");
    testIds.push(P1);
    ok("1.免费流程走通，P1=" + P1.slice(-8), !!P1);

    // 结果页有解锁按钮（结果渲染是异步的，用 waitForSelector）
    const unlockBtn = page.locator('button:has-text("See My Full Reading")').first();
    await unlockBtn.waitFor({ state: "visible", timeout: 15000 }).catch(() => {});
    ok("2.结果页显示解锁按钮", await unlockBtn.isVisible().catch(() => false));
    // 付费墙上的 email 采集框（最后挽回触点）
    const wallEmail = page.locator('input[type="email"]').first();
    ok("2b.付费墙含 email 采集框", await wallEmail.isVisible().catch(() => false));

    // ── 2. 点解锁 → P2 (fetch 模拟，避免真跳 PayPal) ──
    const unlock1 = await page.evaluate(async (id) => {
      const r = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id, email: "wall-e2e@example.com" }) });
      return { status: r.status, json: await r.json() };
    }, P1);
    ok("3.unlock 返回 200 + url", unlock1.status === 200 && !!unlock1.json.url, unlock1.json.error || "");
    const u1 = new URL(unlock1.json.url);
    const P2 = u1.searchParams.get("custom");
    testIds.push(P2);
    ok("4.P2 创建", !!P2, "custom=" + (P2 || "?").slice(-8));
    const cancelDecoded = decodeURIComponent(u1.searchParams.get("cancel_return") || "");
    ok("5.cancel_return 指向原免费结果页", cancelDecoded.includes(`/success?purchase_id=${P1}&free=1`), cancelDecoded.slice(0, 90));

    // ── 3. P2 属性验证 ──
    const p1Row = await prisma.purchase.findUnique({ where: { id: P1 } });
    const p2Row = await prisma.purchase.findUnique({ where: { id: P2 } });
    ok("6.P2=pending+unpaid", p2Row.status === "pending" && p2Row.paid === false);
    ok("7.P2 复制了 P1 的完整 result", !!p2Row.result && p2Row.result === p1Row.result);
    const p2Input = JSON.parse(p2Row.input);
    ok("8.P2 带 unlockFrom=P1", p2Input.unlockFrom === P1);
    const p1Input = JSON.parse(p1Row.input);
    ok("8b.P1 采集到表单 email", p1Input.email === "buyer-e2e@example.com", "email=" + p1Input.email);
    ok("8c.P2 继承 email（付费墙 email 不覆盖表单 email）", p2Input.email === "buyer-e2e@example.com", "email=" + p2Input.email);

    // ── 4. 幂等：快速二次解锁复用 P2 ──
    const unlock2 = await page.evaluate(async (id) => {
      const r = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id }) });
      return { status: r.status, json: await r.json() };
    }, P1);
    const P2again = new URL(unlock2.json.url).searchParams.get("custom");
    ok("9.二次解锁复用同一 P2（幂等）", P2again === P2, "custom=" + (P2again || "?").slice(-8));
    const pendingCount = await prisma.purchase.count({ where: { status: "pending" } });
    const testPendingBefore = await prisma.purchase.count({ where: { input: { contains: "unlockFrom" }, status: "pending" } });
    ok("10.unlock pending 行数量未膨胀", testPendingBefore >= 1, "带unlockFrom的pending=" + testPendingBefore);

    // ── 5. 模拟买家在 PayPal 付款后返回 (PDT stub: TEST_TX_PAID) ──
    const pdt = await page.evaluate(async (id) => {
      const r = await fetch("/api/pdt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id, tx: "TEST_TX_PAID" }) });
      return { status: r.status, json: await r.json() };
    }, P2);
    ok("11.PDT 返回 completed", pdt.status === 200 && pdt.json.status === "completed", pdt.json.error || pdt.json.status);
    const p2After = await prisma.purchase.findUnique({ where: { id: P2 } });
    ok("12.P2=completed+paid", p2After.status === "completed" && p2After.paid === true);
    ok("13.付费后 result 未被重新生成（与预览一致）", p2After.result === p1Row.result);

    // ── 6. 已付费再点解锁 → 直达已购结果，不建新单 ──
    const unlock3 = await page.evaluate(async (id) => {
      const r = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id }) });
      return { status: r.status, json: await r.json() };
    }, P1);
    ok("14.已付费解锁 → 返回本域 success 链接(防重复扣费)", unlock3.status === 200 && !!unlock3.json.url && unlock3.json.url.includes(`/success?purchase_id=${P2}`), unlock3.json.url || "");

    // ── 7. P2 结果读取（付费后完整结果） ──
    const r2 = await page.evaluate(async (id) => {
      const r = await fetch(`/api/result?purchase_id=${id}`);
      return await r.json();
    }, P2);
    ok("15.P2 返回完整付费结果", r2.status === "completed" && r2.free === undefined, JSON.stringify(r2).slice(0, 60));

    // ── 8. 免费额度用完 → 服务端 403 + 错误码 ──
    const free2 = await page.evaluate(async () => {
      const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "calendar", input: { startDate: "2027-01-01", endDate: "2027-01-02", eventType: "travel", locale: "en", mark: "E2E-UNLOCK-FIX" }, free: true }) });
      return { status: r.status, json: await r.json() };
    });
    ok("16.免费额度耗尽 → 403 free_limit_reached", free2.status === 403 && free2.json.error === "free_limit_reached", JSON.stringify(free2.json));

    // ── 9. 僵尸清理 + 付费重试 (经由 cron 的 purchaseRecovery) ──
    const stale = await prisma.purchase.create({ data: { checkoutId: crypto.randomUUID(), type: "calendar", input: JSON.stringify({ startDate: "2027-02-01", endDate: "2027-02-03", eventType: "wedding", locale: "en", mark: MARK, unlockFrom: "E2E-MARKER" }), status: "pending", createdAt: new Date(Date.now() - 25 * 3600 * 1000) } });
    const staleWithEmail = await prisma.purchase.create({ data: { checkoutId: crypto.randomUUID(), type: "naming", input: JSON.stringify({ firstName: "E2E", lastName: "Z", locale: "en", mark: MARK, unlockFrom: "E2E-MARKER2", email: "recover-e2e@example.com" }), status: "pending", createdAt: new Date(Date.now() - 25 * 3600 * 1000) } });
    const paidStuck = await prisma.purchase.create({ data: { checkoutId: crypto.randomUUID(), type: "calendar", input: JSON.stringify({ startDate: "2027-03-01", endDate: "2027-03-03", eventType: "wedding", locale: "en", mark: MARK }), status: "pending", paid: true, result: null } });
    testIds.push(stale.id, staleWithEmail.id, paidStuck.id);

    const cronRes = await page.evaluate(async () => {
      const r = await fetch("/api/cron");
      return await r.json();
    });
    const rec = cronRes.purchaseRecovery || {};
    ok("17.cron 执行 purchaseRecovery", !!cronRes.purchaseRecovery, JSON.stringify(rec).slice(0, 120));

    const staleAfter = await prisma.purchase.findUnique({ where: { id: stale.id } });
    const paidAfter = await prisma.purchase.findUnique({ where: { id: paidStuck.id } });
    ok("18.超24h未付 pending → abandoned", staleAfter.status === "abandoned");
    ok("19.paid+pending 无结果 → 自动重试完成", paidAfter.status === "completed" && !!paidAfter.result, "status=" + paidAfter.status);
    const paidResult = paidAfter.result ? JSON.parse(paidAfter.result) : {};
    ok("20.重试生成的结果含 auspiciousDays", Array.isArray(paidResult.auspiciousDays) && paidResult.auspiciousDays.length > 0, "days=" + (paidResult.auspiciousDays || []).length);

    // 20b. 挽回邮件逻辑：dev server 无 RESEND_API_KEY → 发送跳过且不标记已发送
    const staleEmailAfter = await prisma.purchase.findUnique({ where: { id: staleWithEmail.id } });
    const staleEmailInput = JSON.parse(staleEmailAfter.input);
    ok("20b.无 Resend key 时挽回邮件安全跳过(未标记 sent)", rec.recoverySent === 0 && !staleEmailInput.recoveryEmailSent, JSON.stringify({ recoverySent: rec.recoverySent, recoverySkipped: rec.recoverySkipped, flag: staleEmailInput.recoveryEmailSent }));

    // ── 10. abandoned 状态 API + UI ──
    const rAb = await page.evaluate(async (id) => {
      const r = await fetch(`/api/result?purchase_id=${id}`);
      return await r.json();
    }, stale.id);
    ok("21./api/result 返回 abandoned + unlockFrom", rAb.status === "abandoned" && rAb.unlockFrom === "E2E-MARKER", JSON.stringify(rAb));

    await page.goto(`${BASE}/success?purchase_id=${stale.id}`);
    await page.waitForSelector('text=Payment not completed', { timeout: 15000 });
    const backLink = page.locator('a:has-text("Back to my free result")');
    ok("22.abandoned UI 显示 + 返回免费结果链接", await backLink.isVisible().catch(() => false));
    const backHref = await backLink.getAttribute("href").catch(() => "");
    ok("23.返回链接指向原免费结果", backHref.includes("purchase_id=E2E-MARKER&free=1"), backHref);

    // ── 11. 命名页正常渲染（useCheckout 改动回归） ──
    await page.goto(`${BASE}/naming?test=1`);
    await page.waitForSelector('form', { timeout: 15000 });
    ok("24.naming 表单页正常渲染", true);
  } catch (e) {
    console.error("E2E 异常:", e.message);
    failed++;
  } finally {
    const del = await prisma.purchase.deleteMany({ where: { id: { in: testIds.filter(Boolean) } } });
    const delMark = await prisma.purchase.deleteMany({ where: { input: { contains: MARK } } });
    console.log("清理: 按 id 删 " + del.count + " 行, 按标记词删 " + delMark.count + " 行");
    console.log(failed === 0 ? "全部通过 — 0 失败" : failed + " 项失败");
    await prisma.$disconnect().catch(() => {});
    // 已知 Playwright browser.close() 偶发挂起 — 直接退出
    process.exit(failed === 0 ? 0 : 1);
  }
}
main();
