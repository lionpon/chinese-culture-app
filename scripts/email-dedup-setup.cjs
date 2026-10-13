// 每日邮件去重表 — 生产建表 + 验证（幂等，可重复执行）
// 用法: node scripts/email-dedup-setup.cjs
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env.local", "utf8")
  .split(/\r?\n/).map((l) => l.trim()).join("\n"); // CRLF 安全
const m = envRaw.match(/^DATABASE_URL=(.+)$/m);
if (!m) { console.error("DATABASE_URL not found in .env.local"); process.exit(1); }
let dbUrl = m[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("① 建表（幂等）+ RLS");
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "DailyEmailLog" ("date" TEXT PRIMARY KEY, "sentAt" TIMESTAMP NOT NULL DEFAULT now())`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "DailyEmailLog" ENABLE ROW LEVEL SECURITY`);
  console.log("   完成");

  console.log("② 表与 RLS 状态");
  const reg = await prisma.$queryRawUnsafe(`SELECT to_regclass('public."DailyEmailLog"')::text AS t`);
  console.log("   to_regclass:", reg[0].t);
  const rls = await prisma.$queryRawUnsafe(`SELECT relrowsecurity AS rls, relowner::regrole::text AS owner FROM pg_class WHERE oid = 'public."DailyEmailLog"'::regclass`);
  console.log("   RLS:", rls[0].rls, "| owner:", rls[0].owner);

  console.log("③ anon 实弹探测（应被拒）");
  let anonBlocked = false;
  try {
    await prisma.$executeRawUnsafe(`SET ROLE anon`);
    try {
      await prisma.$queryRawUnsafe(`SELECT count(*) FROM "DailyEmailLog"`);
      anonBlocked = false;
    } catch (e) {
      anonBlocked = true;
      console.log("   anon 读取被拒 ✅:", String(e.message).split("\n")[0].slice(0, 80));
    }
  } finally {
    await prisma.$executeRawUnsafe(`RESET ROLE`);
  }
  if (!anonBlocked) console.log("   ⚠️ anon 竟可读，需检查!");

  console.log("④ 抢占去重逻辑自检（2099 占位行，测完即删）");
  const first = await prisma.$queryRawUnsafe(`INSERT INTO "DailyEmailLog" ("date") VALUES ('2099-01-01') ON CONFLICT ("date") DO NOTHING RETURNING "date"`);
  console.log("   第一次抢占 rows:", first.length, first.length === 1 ? "✅ 抢到" : "❌");
  const second = await prisma.$queryRawUnsafe(`INSERT INTO "DailyEmailLog" ("date") VALUES ('2099-01-01') ON CONFLICT ("date") DO NOTHING RETURNING "date"`);
  console.log("   第二次抢占 rows:", second.length, second.length === 0 ? "✅ 被挡（去重生效）" : "❌");
  await prisma.$executeRawUnsafe(`DELETE FROM "DailyEmailLog" WHERE "date" = '2099-01-01'`);
  const remain = await prisma.$queryRawUnsafe(`SELECT count(*)::int AS n FROM "DailyEmailLog"`);
  console.log("   清理后表内行数:", remain[0].n);

  console.log("\nALL DONE");
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); }).finally(() => prisma.$disconnect());
