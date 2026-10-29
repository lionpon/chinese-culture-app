// 程序化文章表建表脚本（幂等可重跑）— raw SQL 表, 与 NflResult/DailyEmailLog 同模式
// 规矩: 建表 → 立即 ENABLE RLS → REVOKE anon/authenticated（数据仅经 Prisma postgres 角色访问）
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
(async () => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ProgrammaticArticle" (
      "id" TEXT PRIMARY KEY,
      "slug" TEXT NOT NULL UNIQUE,
      "type" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "metaDesc" TEXT NOT NULL,
      "intro" TEXT NOT NULL,
      "sections" TEXT NOT NULL,
      "faqs" TEXT NOT NULL,
      "source" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'published',
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "ProgrammaticArticle" ENABLE ROW LEVEL SECURITY`);
  await prisma.$executeRawUnsafe(`REVOKE ALL ON TABLE "ProgrammaticArticle" FROM anon, authenticated`);
  const check = await prisma.$queryRawUnsafe(`SELECT relrowsecurity AS rls FROM pg_class WHERE relname='ProgrammaticArticle'`);
  console.log("表已建 + RLS:", check);
  process.exit(0);
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
