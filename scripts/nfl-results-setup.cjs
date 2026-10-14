// NFL 赛果表 — 生产建表 + RLS + 自检（幂等，可重复执行）
// 用途: /api/cron 每日自动抓 ESPN 比分写入；/nfl 页面读取展示
// 用法: node scripts/nfl-results-setup.cjs
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env.local", "utf8")
  .split(/\r?\n/).map((l) => l.trim()).join("\n"); // CRLF 安全
const m = envRaw.match(/^DATABASE_URL=(.+)$/m);
if (!m) { console.error("DATABASE_URL not found in .env.local"); process.exit(1); }
let dbUrl = m[1].trim();
// 连接坑 (2026-09-29): 直连域名仅 IPv6，需显式 sslmode=prefer
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("① 建表（幂等）+ RLS");
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "NflResult" ("id" TEXT PRIMARY KEY, "homeScore" INT NOT NULL, "awayScore" INT NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now())`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "NflResult" ENABLE ROW LEVEL SECURITY`);
  console.log("   完成");

  console.log("② 表与 RLS 状态");
  const reg = await prisma.$queryRawUnsafe(`SELECT to_regclass('public."NflResult"')::text AS t`);
  console.log("   to_regclass:", reg[0].t);
  const rls = await prisma.$queryRawUnsafe(`SELECT relrowsecurity AS rls, relowner::regrole::text AS owner FROM pg_class WHERE oid = 'public."NflResult"'::regclass`);
  console.log("   RLS:", rls[0].rls, "| owner:", rls[0].owner);

  console.log("③ anon 实弹探测（应被拒）");
  let anonBlocked = false;
  try {
    await prisma.$executeRawUnsafe(`SET ROLE anon`);
    try {
      await prisma.$queryRawUnsafe(`SELECT count(*) FROM "NflResult"`);
      anonBlocked = false;
    } catch (e) {
      anonBlocked = true;
      console.log("   anon 读取被拒 ✅:", String(e.message).split("\n")[0].slice(0, 80));
    }
  } finally {
    await prisma.$executeRawUnsafe(`RESET ROLE`);
  }
  if (!anonBlocked) console.log("   ⚠️ anon 竟可读，需检查!");

  console.log("④ upsert 自检（2099 占位行，测完即删）");
  const first = await prisma.$queryRawUnsafe(`INSERT INTO "NflResult" ("id", "homeScore", "awayScore") VALUES ('TEST-2099', 10, 20) ON CONFLICT ("id") DO NOTHING RETURNING "id"`);
  console.log("   第一次写入 rows:", first.length, first.length === 1 ? "✅" : "❌");
  await prisma.$executeRawUnsafe(`INSERT INTO "NflResult" ("id", "homeScore", "awayScore", "updatedAt") VALUES ('TEST-2099', 21, 14, now()) ON CONFLICT ("id") DO UPDATE SET "homeScore" = EXCLUDED."homeScore", "awayScore" = EXCLUDED."awayScore", "updatedAt" = now()`);
  const check = await prisma.$queryRawUnsafe(`SELECT "homeScore", "awayScore" FROM "NflResult" WHERE "id" = 'TEST-2099'`);
  console.log("   upsert 后值:", JSON.stringify(check[0]), check[0].homeScore === 21 && check[0].awayScore === 14 ? "✅ 覆盖生效" : "❌");
  await prisma.$executeRawUnsafe(`DELETE FROM "NflResult" WHERE "id" = 'TEST-2099'`);
  const remain = await prisma.$queryRawUnsafe(`SELECT count(*)::int AS n FROM "NflResult"`);
  console.log("   清理后表内行数:", remain[0].n);

  console.log("\nALL DONE");
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); }).finally(() => prisma.$disconnect());
