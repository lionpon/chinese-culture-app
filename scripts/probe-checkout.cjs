// 生产支付通道探测 — 判断 sandbox/live + 收款邮箱 + 新代码特征，自动清理探测行
// 用法: node scripts/probe-checkout.cjs [free|paid]
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
process.env.DATABASE_URL = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
const MARK = "ProbeRun";

async function main() {
  const mode = process.argv[2] || "paid";
  const free = mode === "free";
  const res = await fetch("https://www.culture-of-china.com/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "naming",
      input: { firstName: MARK, lastName: "X", gender: "female", style: "elegant", mode: "create", amount: 5.99, locale: "en" },
      free,
    }),
  });
  const data = await res.json();
  console.log("HTTP", res.status);
  if (data.url) {
    const u = new URL(data.url);
    const biz = u.searchParams.get("business");
    console.log("域名:", u.hostname, u.hostname.includes("sandbox") ? "❌ 沙盒模式!" : "✅ LIVE");
    console.log("收款邮箱:", biz);
    console.log("purchase_id:", u.searchParams.get("custom"));
    console.log("新代码特征(cookie)仅 free 路径, 见 Set-Cookie: cc_purchase_id");
    console.log("Set-Cookie:", res.headers.get("set-cookie") || "(无)");
  } else {
    console.log("响应:", JSON.stringify(data).slice(0, 200));
  }
  // 清理本次探测行
  const d = await prisma.purchase.deleteMany({ where: { input: { contains: MARK } } });
  console.log(`已自动清理探测行: ${d.count}`);
}

main().catch(e => { console.error("ERROR:", e.message); process.exit(1); }).finally(() => prisma.$disconnect());
