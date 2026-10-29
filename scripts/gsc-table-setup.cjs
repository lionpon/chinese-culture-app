// GSC 性能数据表建表脚本（幂等可重跑）— raw SQL + RLS 规矩
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
(async () => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "GscPerformance" (
      "id" TEXT PRIMARY KEY,
      "date" TEXT NOT NULL,
      "dimType" TEXT NOT NULL,
      "dimKey" TEXT NOT NULL,
      "clicks" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "impressions" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "ctr" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "position" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "fetchedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE ("date", "dimType", "dimKey")
    )`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "GscPerformance" ENABLE ROW LEVEL SECURITY`);
  await prisma.$executeRawUnsafe(`REVOKE ALL ON TABLE "GscPerformance" FROM anon, authenticated`);
  const check = await prisma.$queryRawUnsafe(`SELECT relrowsecurity AS rls FROM pg_class WHERE relname='GscPerformance'`);
  console.log("GscPerformance 表已建 + RLS:", check);
  process.exit(0);
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
