// 补充 E2E: 主套件未覆盖的路径 — unlock 付费墙 email 兜底 / IPN payer_email 合并 /
// IPN result 复用 / PDT 表单付费单结果生成 / naming·divination·dream 表单 email 采集
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
// 连接坑 (2026-09-29): 直连域名仅 IPv6，需显式 sslmode=prefer
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const { chromium } = require("D:/chinese culture/project2/node_modules/playwright");
const prisma = new PrismaClient();

const BASE = "http://localhost:3000";
const MARK = "E2E-SUPPLEMENT";
let failed = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
  if (!cond) failed++;
};

async function main() {
  const browser = await chromium.launch();
  const testIds = [];

  try {
    // 独立 UA 的 context，绕开按 IP+UA 指纹的免费额度限制
    const mkCtx = (ua) => browser.newContext({ userAgent: ua });
    const ctxA = await mkCtx("E2E-Supp-A/1.0"); // 服务器端 API 测试
    const pageA = await ctxA.newPage();
    await pageA.goto(`${BASE}/?test=1`); // 必须先导航，evaluate 里的相对 fetch 才有 origin

    // ── a. 付费墙 email 兜底：原单无 email，解锁时提供 → P2 记录；幂等复用不覆盖 ──
    const orig = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(), type: "calendar",
        input: JSON.stringify({ startDate: "2027-06-01", endDate: "2027-06-03", eventType: "travel", locale: "en", mark: MARK }),
        status: "completed", paid: false, result: JSON.stringify({ auspiciousDays: [{ date: "2027-06-01" }] }),
      },
    });
    testIds.push(orig.id);
    const u1 = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id, email: "wall-only@test.com" }) });
      return await r.json();
    }, orig.id);
    const P2 = new URL(u1.url).searchParams.get("custom");
    testIds.push(P2);
    const p2 = await prisma.purchase.findUnique({ where: { id: P2 } });
    ok("a1.原单无 email 时付费墙 email 写入 P2", JSON.parse(p2.input).email === "wall-only@test.com", JSON.parse(p2.input).email);

    const u2 = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id, email: "other@test.com" }) });
      return await r.json();
    }, orig.id);
    const P2b = new URL(u2.url).searchParams.get("custom");
    ok("a2.幂等复用同一 P2", P2b === P2);
    const p2b = await prisma.purchase.findUnique({ where: { id: P2 } });
    ok("a3.复用时不覆盖已有 email", JSON.parse(p2b.input).email === "wall-only@test.com", JSON.parse(p2b.input).email);
    // 清理 P2（a 场景结束）
    await prisma.purchase.deleteMany({ where: { id: { in: [P2, orig.id] } } });

    // ── b. IPN: 表单付费单（无 result 无 email）→ 生成结果 + payer_email 合并 ──
    const paid1 = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(), type: "calendar",
        input: JSON.stringify({ startDate: "2027-07-01", endDate: "2027-07-05", eventType: "wedding", locale: "en", mark: MARK }),
        status: "pending",
      },
    });
    testIds.push(paid1.id);
    const ipn1 = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/webhook/paypal", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "cmd=_notify-validate&custom=" + id + "&payment_status=Completed&payer_email=ipn-buyer%40test.com&mc_gross=5.99" });
      return { status: r.status, body: await r.json() };
    }, paid1.id);
    const paid1After = await prisma.purchase.findUnique({ where: { id: paid1.id } });
    ok("b1.IPN 完成表单付费单", ipn1.status === 200 && paid1After.status === "completed" && paid1After.paid === true, paid1After.status);
    ok("b2.IPN payer_email 合并进 input", JSON.parse(paid1After.input).email === "ipn-buyer@test.com");
    ok("b3.IPN 生成结果", !!paid1After.result && JSON.parse(paid1After.result).auspiciousDays?.length > 0);

    // ── c. IPN: unlock 型订单（result 已存在，无 email）→ 只标记 + 合并 email，不重生成 ──
    const paid2 = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(), type: "calendar",
        input: JSON.stringify({ startDate: "2027-08-01", endDate: "2027-08-03", eventType: "travel", locale: "en", mark: MARK }),
        status: "pending",
        result: JSON.stringify({ auspiciousDays: [{ date: "2027-08-01", score: 88, ORIGINAL: true }] }),
      },
    });
    testIds.push(paid2.id);
    const ipn2 = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/webhook/paypal", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "cmd=_notify-validate&custom=" + id + "&payment_status=Completed&payer_email=ipn2%40test.com" });
      return r.status;
    }, paid2.id);
    const paid2After = await prisma.purchase.findUnique({ where: { id: paid2.id } });
    ok("c1.IPN unlock 型只标记 completed+paid", ipn2 === 200 && paid2After.status === "completed" && paid2After.paid === true);
    ok("c2.IPN result 未被重生成(逐字节一致)", paid2After.result === JSON.stringify({ auspiciousDays: [{ date: "2027-08-01", score: 88, ORIGINAL: true }] }), paid2After.result);
    ok("c3.IPN payer_email 合并", JSON.parse(paid2After.input).email === "ipn2@test.com");

    // ── d. PDT: 表单付费单（无 result）→ 生成结果 ──
    const paid3 = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(), type: "calendar",
        input: JSON.stringify({ startDate: "2027-09-01", endDate: "2027-09-05", eventType: "wedding", locale: "en", mark: MARK }),
        status: "pending",
      },
    });
    testIds.push(paid3.id);
    const pdt = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/pdt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id, tx: "TEST_TX_PAID" }) });
      return { status: r.status, body: await r.json() };
    }, paid3.id);
    const paid3After = await prisma.purchase.findUnique({ where: { id: paid3.id } });
    ok("d1.PDT 完成表单付费单(生成路径)", pdt.status === 200 && pdt.body.status === "completed" && paid3After.status === "completed" && paid3After.paid === true, pdt.body.status + "/" + paid3After.status);
    ok("d2.PDT 生成结果", !!paid3After.result && JSON.parse(paid3After.result).auspiciousDays?.length > 0);

    // ── e/f/g. 三个表单的 UI email 采集（独立 UA 各自一次免费额度）──
    // naming analyze 模式只在 ja/ko 渲染（确定性算法，无 AI）；用 /ja/naming
    const ctxN = await mkCtx("E2E-Supp-Naming/1.0");
    const pageN = await ctxN.newPage();
    await pageN.goto(`${BASE}/ja/naming?test=1`);
    ok("e1.naming 表单含 email 框", await pageN.locator('input[name="email"]').isVisible().catch(() => false));
    // 表单内两个 type=button：create / analyze → 第二个是 analyze
    await pageN.locator('form button[type="button"]').nth(1).click();
    await pageN.fill('input[name="firstName"]', "一郎");
    await pageN.fill('input[name="lastName"]', "佐藤");
    await pageN.selectOption('select[name="gender"]', "female");
    await pageN.fill('input[name="email"]', "naming-e2e@test.com");
    await pageN.click('button[type="submit"]');
    await pageN.waitForURL(/\/success\?purchase_id=/, { timeout: 60000 });
    const pN = new URL(pageN.url()).searchParams.get("purchase_id");
    testIds.push(pN);
    const rowN = await prisma.purchase.findUnique({ where: { id: pN } });
    ok("e2.naming analyze 免费流程 + email 入库", rowN && JSON.parse(rowN.input).email === "naming-e2e@test.com", rowN ? JSON.parse(rowN.input).email : "no row");
    await ctxN.close();

    // divination time（确定性）
    const ctxD = await mkCtx("E2E-Supp-Div/1.0");
    const pageD = await ctxD.newPage();
    await pageD.goto(`${BASE}/divination?test=1`);
    ok("f1.divination 表单含 email 框", await pageD.locator('input[name="email"]').isVisible().catch(() => false));
    await pageD.fill('input[name="question"]', "E2E career question");
    await pageD.fill('input[name="email"]', "div-e2e@test.com");
    await pageD.click('button[type="submit"]');
    await pageD.waitForURL(/\/success\?purchase_id=/, { timeout: 60000 });
    const pD = new URL(pageD.url()).searchParams.get("purchase_id");
    testIds.push(pD);
    const rowD = await prisma.purchase.findUnique({ where: { id: pD } });
    ok("f2.divination 免费流程 + email 入库", rowD && JSON.parse(rowD.input).email === "div-e2e@test.com", rowD ? JSON.parse(rowD.input).email : "no row");
    await ctxD.close();

    // dream（确定性，无 AI）
    const ctxM = await mkCtx("E2E-Supp-Dream/1.0");
    const pageM = await ctxM.newPage();
    await pageM.goto(`${BASE}/dream-interpretation?test=1`);
    ok("g1.dream 表单含 email 框", await pageM.locator('input[name="email"]').isVisible().catch(() => false));
    await pageM.fill('textarea[name="dreamText"]', "E2E I dreamed of flying over mountains");
    await pageM.check('input[type="checkbox"]');
    await pageM.fill('input[name="email"]', "dream-e2e@test.com");
    await pageM.click('button[type="submit"]');
    await pageM.waitForURL(/\/success\?purchase_id=/, { timeout: 60000 });
    const pM = new URL(pageM.url()).searchParams.get("purchase_id");
    testIds.push(pM);
    const rowM = await prisma.purchase.findUnique({ where: { id: pM } });
    ok("g2.dream 免费流程 + email 入库", rowM && JSON.parse(rowM.input).email === "dream-e2e@test.com", rowM ? JSON.parse(rowM.input).email : "no row");
    await ctxM.close();


    // ── h. Smart Buttons (REST Orders v2): unlock smart 模式 → orders → capture → webhook ──
    const origS = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(), type: "calendar",
        input: JSON.stringify({ startDate: "2027-10-01", endDate: "2027-10-05", eventType: "wedding", locale: "en", mark: MARK }),
        status: "completed", paid: false, result: JSON.stringify({ auspiciousDays: [{ date: "2027-10-01", score: 91, SMART: true }] }),
      },
    });
    testIds.push(origS.id);
    const uS = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id, email: "smart-buyer@test.com", mode: "smart" }) });
      return await r.json();
    }, origS.id);
    ok("h1.smart unlock 返回 purchase_id + standard_url", !!uS.purchase_id && !!uS.standard_url, uS.purchase_id);
    testIds.push(uS.purchase_id);
    const pS = await prisma.purchase.findUnique({ where: { id: uS.purchase_id } });
    ok("h2.P2 result 复制自预览单(不重生成)", pS && pS.result === JSON.stringify({ auspiciousDays: [{ date: "2027-10-01", score: 91, SMART: true }] }));
    ok("h3.P2 email 由付费墙写入", pS && JSON.parse(pS.input).email === "smart-buyer@test.com");

    const oS = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/paypal/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ purchase_id: id }) });
      return { status: r.status, body: await r.json() };
    }, uS.purchase_id);
    ok("h4.orders 返回 TEST 订单号", oS.status === 200 && oS.body.order_id === "TEST_ORDER_" + uS.purchase_id, oS.body.order_id);

    const cS = await pageA.evaluate(async (oid) => {
      const r = await fetch("/api/paypal/capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_id: oid }) });
      return { status: r.status, body: await r.json() };
    }, oS.body.order_id);
    const pS2 = await prisma.purchase.findUnique({ where: { id: uS.purchase_id } });
    ok("h5.capture 完成订单 paid+completed", cS.status === 200 && cS.body.purchase_id === uS.purchase_id && pS2.paid === true && pS2.status === "completed", pS2.status);
    ok("h6.capture 不重生成 result(逐字节一致)", pS2.result === JSON.stringify({ auspiciousDays: [{ date: "2027-10-01", score: 91, SMART: true }] }));

    // 幂等: 重复 capture 同一订单 → 仍 200 且返回同一 purchase_id
    const cS2 = await pageA.evaluate(async (oid) => {
      const r = await fetch("/api/paypal/capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_id: oid }) });
      return { status: r.status, body: await r.json() };
    }, oS.body.order_id);
    ok("h7.重复 capture 幂等", cS2.status === 200 && cS2.body.purchase_id === uS.purchase_id, String(cS2.status));

    // 未知订单 → 4xx
    const cBad = await pageA.evaluate(async () => {
      const r = await fetch("/api/paypal/capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_id: "TEST_ORDER_nonexistent" }) });
      return r.status;
    });
    ok("h8.未知订单 404", cBad === 404, String(cBad));

    // REST webhook: PAYMENT_CAPTURE.COMPLETED 兜底完成另一笔 pending 单
    const wRow = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(), type: "calendar",
        input: JSON.stringify({ startDate: "2027-11-01", endDate: "2027-11-03", eventType: "travel", locale: "en", mark: MARK }),
        status: "pending", result: JSON.stringify({ auspiciousDays: [{ date: "2027-11-01", WEBHOOK: true }] }),
      },
    });
    testIds.push(wRow.id);
    const wh = await pageA.evaluate(async (id) => {
      const r = await fetch("/api/webhook/paypal-rest", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "PAYMENT.CAPTURE.COMPLETED",
          resource: { purchase_units: [{ custom_id: id, payments: { captures: [{ custom_id: id }] } }] },
          payer: { email_address: "webhook-payer@test.com" },
        }),
      });
      return r.status;
    }, wRow.id);
    const wRow2 = await prisma.purchase.findUnique({ where: { id: wRow.id } });
    ok("h9.REST webhook 完成 pending 单 + email 合并", wh === 200 && wRow2.paid === true && wRow2.status === "completed" && JSON.parse(wRow2.input).email === "webhook-payer@test.com", wRow2.status);

    await ctxA.close();
  } catch (e) {
    console.error("补充 E2E 异常:", e.message);
    failed++;
  } finally {
    const del = await prisma.purchase.deleteMany({ where: { id: { in: testIds.filter(Boolean) } } });
    const delMark = await prisma.purchase.deleteMany({ where: { input: { contains: MARK } } });
    console.log("清理: 按 id 删 " + del.count + " 行, 按标记词删 " + delMark.count + " 行");
    console.log(failed === 0 ? "补充套件全部通过 — 0 失败" : failed + " 项失败");
    await prisma.$disconnect().catch(() => {});
    process.exit(failed === 0 ? 0 : 1);
  }
}
main();
