// GSC OAuth 一次性授权脚本（2026-10-29）
// 前置: 用户已在 Google Cloud 建 OAuth 桌面客户端(见会话指引)。
// 用法: node scripts/oauth-setup.cjs <CLIENT_ID> <CLIENT_SECRET> [--proxy http://127.0.0.1:7890]
//   (凭证也可以先写入 .env.local: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)
// 流程: 启动本地 8123 回调 → 打印授权 URL → 浏览器点允许(VPN/代理均可, 不挑地区) →
//       Google 回跳 localhost 取 code → 经本地代理换 refresh_token → 打印(仅终端, 不落盘)
const http = require("http");
const fs = require("fs");

let clientId = process.argv[2];
let clientSecret = process.argv[3];
const proxyIdx = process.argv.indexOf("--proxy");
const proxyUrl = proxyIdx > -1 ? process.argv[proxyIdx + 1] : null;

if ((!clientId || !clientSecret)) {
  try {
    const env = fs.readFileSync("D:/chinese culture/project2/.env.local", "utf8");
    clientId = clientId || env.match(/^GOOGLE_CLIENT_ID=(.+)$/m)?.[1]?.trim();
    clientSecret = clientSecret || env.match(/^GOOGLE_CLIENT_SECRET=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!clientId || !clientSecret) {
  console.error("缺少凭证。用法: node scripts/oauth-setup.cjs <CLIENT_ID> <CLIENT_SECRET> [--proxy http://127.0.0.1:7890]");
  process.exit(1);
}

const REDIRECT = "http://localhost:8123";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + encodeURIComponent(clientId) +
  "&redirect_uri=" + encodeURIComponent(REDIRECT) +
  "&response_type=code&scope=" + encodeURIComponent("https://www.googleapis.com/auth/webmasters.readonly") +
  "&access_type=offline&prompt=consent";

async function exchange(code) {
  const { ProxyAgent } = require("undici");
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT,
      code,
    }),
  };
  if (proxyUrl) opts.dispatcher = new ProxyAgent(proxyUrl);
  const res = await fetch("https://oauth2.googleapis.com/token", opts);
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data).slice(0, 300));
  return data;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get("code");
  if (!code) { res.end("No code in callback. Close this tab."); return; }
  try {
    const data = await exchange(code);
    console.log(""); console.log("===== 授权成功，请复制以下 refresh_token =====");
    console.log(data.refresh_token);
    console.log("==============================================");
    console.log("后续动作:");
    console.log("1. 把 refresh_token 写入 D:/chinese culture/project2/.env.local: GOOGLE_REFRESH_TOKEN=<token>");
    console.log("2. Render 环境变量同样加 GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN 三个值");
    console.log("3. 下次 Render cron 自动开始每日取数 (无需再开 VPN)");
    res.end("Authorization OK. You can close this tab.");
    setTimeout(() => { server.close(); process.exit(0); }, 500);
  } catch (e) {
    res.end("Exchange failed: " + e.message);
    server.close();
    process.exit(1);
  }
});

server.listen(8123, () => {
  console.log("打开浏览器（开 VPN）访问以下授权地址:");
  console.log(""); console.log(AUTH_URL); console.log("");
  console.log("(等待回调中...)");
});
