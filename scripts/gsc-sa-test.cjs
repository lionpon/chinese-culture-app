// GSC 服务账号连通性测试（2026-10-29, 用户另一项目已验证的路径）
// 用法: 把服务账号 JSON 单行写入 .env.local: GOOGLE_SERVICE_ACCOUNT_JSON=<json>
//       然后 node scripts/gsc-sa-test.cjs
// 成功 = 打印页面维度样例; 失败 403 = GSC 拒绝服务账号, 回退 OAuth 路径
const fs = require("fs");
let sa = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
if (!sa) {
  try {
    const env = fs.readFileSync("D:/chinese culture/project2/.env.local", "utf8");
    sa = env.match(/^GOOGLE_SERVICE_ACCOUNT_JSON=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!sa) { console.error("缺少 GOOGLE_SERVICE_ACCOUNT_JSON（写入 .env.local 后重试）"); process.exit(1); }
const parsed = JSON.parse(sa);

// 本地测试走代理（默认 127.0.0.1:7890, 可用 --proxy 覆盖）; 生产 Render 无需代理
const proxyIdx = process.argv.indexOf("--proxy");
const proxyUrl = proxyIdx > -1 ? process.argv[proxyIdx + 1] : "http://127.0.0.1:7890";
const { ProxyAgent, request } = require("undici");
const dispatcher = new ProxyAgent(proxyUrl);

(async () => {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = b64({ alg: "RS256", typ: "JWT" }) + "." + b64({
    iss: parsed.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now, exp: now + 3600,
  });
  const crypto = require("crypto");
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const jwt = unsigned + "." + signer.sign(parsed.private_key, "base64url");

  const tr = await request("https://oauth2.googleapis.com/token", {
    dispatcher,
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }).toString(),
  });
  console.log("token:", tr.statusCode);
  const trBody = await tr.body.text();
  if (tr.statusCode !== 200) { console.error(trBody.slice(0, 400)); process.exit(1); }
  const token = JSON.parse(trBody).access_token;

  const site = encodeURIComponent("https://www.culture-of-china.com/");
  const day = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
  const res = await request(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
    dispatcher,
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate: day, endDate: day, dimensions: ["page"], rowLimit: 5 }),
  });
  console.log("query:", res.statusCode);
  const data = JSON.parse(await res.body.text());
  if (res.statusCode !== 200) { console.error(JSON.stringify(data).slice(0, 400)); process.exit(1); }
  console.log("=== 服务账号路径可用 ✅ 样例数据 ===");
  for (const r of (data.rows || []).slice(0, 5)) console.log("  " + r.keys[0].slice(0, 70) + " | " + r.clicks + "c / " + r.impressions + "i");
  console.log(""); console.log("下一步: 把同一 GOOGLE_SERVICE_ACCOUNT_JSON 写入 Render 环境变量 → Manual Deploy → 生效");
})();
