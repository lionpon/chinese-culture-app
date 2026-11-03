const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
const q = (sql) => prisma.$queryRawUnsafe(sql);
(async () => {
  console.log("=== AI 引擎引荐流量 (终身 / 近14天) ===");
  const r = await q(`
    WITH t AS (
      SELECT CASE
        WHEN referrer LIKE '%chatgpt%' THEN 'ChatGPT'
        WHEN referrer LIKE '%copilot%' THEN 'Copilot'
        WHEN referrer LIKE '%perplexity%' THEN 'Perplexity'
        WHEN referrer LIKE '%gemini%' THEN 'Gemini'
        WHEN referrer LIKE '%claude.ai%' THEN 'Claude'
        WHEN referrer LIKE '%you.com%' THEN 'You.com'
        WHEN referrer LIKE '%qwant%' THEN 'Qwant(AI)'
        WHEN referrer LIKE '%openai%' THEN 'OpenAI'
        ELSE NULL END AS engine,
        "createdAt"
      FROM "Visit" WHERE referrer <> '' AND referrer NOT LIKE '%culture-of-china.com%'
    )
    SELECT engine, count(*)::int total,
           count(*) FILTER (WHERE "createdAt" >= now() - interval '14 days')::int last14d
    FROM t WHERE engine IS NOT NULL GROUP BY engine ORDER BY total DESC`);
  console.table(r.length ? r : [{engine: "(无 AI 引荐)", total: 0, last14d: 0}]);

  console.log("=== 近 14 天 AI 引荐明细 ===");
  const d = await q(`
    SELECT to_char("createdAt" + interval '8 hours','MM-DD HH24:MI') bj, left(referrer, 45) ref, left(page, 40) page
    FROM "Visit" WHERE "createdAt" >= now() - interval '14 days'
      AND (referrer LIKE '%chatgpt%' OR referrer LIKE '%copilot%' OR referrer LIKE '%perplexity%' OR referrer LIKE '%gemini%' OR referrer LIKE '%qwant%' OR referrer LIKE '%openai%')
    ORDER BY "createdAt" DESC LIMIT 10`);
  console.table(d.length ? d : [{bj: "-", ref: "(无)", page: "-"}]);
  process.exit(0);
})();
