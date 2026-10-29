// GSC OAuth 一次性授权脚本（2026-10-29）
// 前置: 用户已在 Google Cloud 建 OAuth 桌面客户端(见会话指引)。
// 用法: node scripts/oauth-setup.cjs <CLIENT_ID> <CLIENT_SECRET> [--proxy http://127.0.0.1:7890]
//   (凭证也可以先写入 .env.local: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)
// 流程: 启动本地 8123 回调 → 打印授权 URL → 浏览器点允许(VPN/代理均可, 不挑地区) →
//       Google 回跳 localhost 取 code → 经本地代理换 refresh_token → 打印(仅终端, 不落盘)
const http = require("http");
const fs = require("fs");

// 位置参数与 --proxy 分离解析
const posArgs = process.argv.slice(2).filter((a, i, arr) => a !== "--proxy" && !(i > 0 && arr[i - 1] === "--proxy"));
let clientId = posArgs[0];
let clientSecret = posArgs[1];
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
  // 用同实例 undici request + ProxyAgent（全局 fetch 与项目 ProxyAgent 跨实例不兼容）
  const { ProxyAgent, request } = require("undici");
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT,
      code,
    }).toString(),
  };
  if (proxyUrl) opts.dispatcher = new ProxyAgent(proxyUrl);
  let lastErr = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await request("https://oauth2.googleapis.com/token", opts);
      const text = await res.body.text();
      const data = JSON.parse(text);
      if (res.statusCode !== 200) throw new Error(text.slice(0, 300));
      return data;
    } catch (e) {
      lastErr = e.message;
      if (attempt < 3) await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error(lastErr || "exchange failed");
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
    // 保持服务存活，用户可重新打开授权链接重试（新 code 会再次回调）
    console.log("Exchange 失败: " + e.message + "（可重新打开授权链接重试）");
    res.end("Exchange failed (retry allowed): " + e.message + " — you can reopen the auth link to try again.");
  }
});

server.listen(8123, () => {
  console.log("打开浏览器（开 VPN）访问以下授权地址:");
  console.log(""); console.log(AUTH_URL); console.log("");
  console.log("(等待回调中...)");
});
