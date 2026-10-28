// 首单 offer 邮件 — 一次性召回（2026-10-28，用户授权）
// 收件人 = 历史留过邮箱的 Purchase 用户 + Subscriber（去重）
// 用法: node scripts/send-offer-email.cjs --dry       (预览收件人/时区/文案, 不发)
//       node scripts/send-offer-email.cjs --send      (立即发送)
//       node scripts/send-offer-email.cjs --schedule  (按收件人当地 19:00 定时发送, Resend scheduled_at)
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
let API_KEY = envRaw.match(/^RESEND_API_KEY=(.+)$/m)?.[1]?.trim() || "";
// 备用: .env.local（git 忽略, 本地存放密钥的安全位置）
if (!API_KEY) {
  try {
    const envLocal = fs.readFileSync("D:/chinese culture/project2/.env.local", "utf8");
    API_KEY = envLocal.match(/^RESEND_API_KEY=(.+)$/m)?.[1]?.trim() || "";
  } catch { /* .env.local 不存在 */ }
}

const SUBJECT = {
  en: "Your Chinese reading is waiting — first-reading offer inside",
  ru: "Ваше китайское прочтение ждёт — скидка первого заказа внутри",
};
const BODY = {
  en: `Hi,

You recently tried a reading at Chinese Culture Studio (culture-of-china.com) but didn't finish it.

As a one-time thank-you for trying us: your FIRST full reading is now $1.99 (regular $5.99).

Your reading is still saved and waiting:
→ https://www.culture-of-china.com/naming

One-time offer · no subscription · instant delivery.
For entertainment purposes only. This is a one-off message — reply to this email if you'd rather not hear from us again.

— Chinese Culture Studio`,
  ru: `Здравствуйте,

Вы недавно пробовали чтение на Chinese Culture Studio (culture-of-china.com), но не завершили его.

В качестве разовой благодарности: ваше ПЕРВОЕ полное чтение теперь за $1.99 (обычная цена $5.99).

Ваше чтение сохранено и ждёт вас:
→ https://www.culture-of-china.com/ru/naming

Разовая акция · без подписки · мгновенная доставка.
Только для развлекательных целей. Это единоразовое письмо — ответьте на него, если не хотите больше получать сообщения.

— Chinese Culture Studio`,
};

// 时区/语言映射 — 从本地文件加载（含真实客户邮箱, 不入仓库）
// 文件: scripts/offer-recipients.local.json, 形如 { "email": { "offset": 3, "lang": "ru" } }
// 判定证据见 WORK_LOG_2026-10-28 §④；缺文件时 --dry 仍可用, --schedule/--send 报错
let TZ = {};
try {
  TZ = JSON.parse(fs.readFileSync("D:/chinese culture/project2/scripts/offer-recipients.local.json", "utf8"));
} catch {
  console.log("提示: offer-recipients.local.json 缺失, 收件人时区将按默认 UTC-4/en 处理");
}

// 计算某时区下一个 19:00 本地时间对应的 UTC ISO 串
function next1900Local(offset) {
  const now = Date.now();
  let d = new Date(now + offset * 3600e3);
  d.setUTCHours(19, 0, 0, 0);
  d = new Date(d.getTime() - offset * 3600e3);
  if (d.getTime() < now) d = new Date(d.getTime() + 24 * 3600e3);
  return d.toISOString();
}

(async () => {
  const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
  const prisma = new PrismaClient();
  const purchases = await prisma.purchase.findMany({ select: { input: true } });
  const subs = await prisma.subscriber.findMany({ select: { email: true } });
  const emails = new Set();
  for (const p of purchases) {
    try { const i = JSON.parse(p.input || "{}"); if (typeof i.email === "string" && i.email.includes("@")) emails.add(i.email.trim().toLowerCase()); } catch {}
  }
  for (const s of subs) { if (s.email.includes("@")) emails.add(s.email.trim().toLowerCase()); }
  await prisma.$disconnect();

  // 过滤测试/一次性地址（历史 E2E 残留）
  const DISPOSABLE = ["test", "usaaxa.com", "mailinator", "tempmail", "example.com"];
  const list = [...emails].filter(e => !DISPOSABLE.some(d => e.includes(d)));

  const schedule = [];
  for (const e of list) {
    const t = TZ[e] || { offset: -4, lang: "en" };
    schedule.push({ email: e, offset: t.offset, lang: t.lang, sendAtUtc: next1900Local(t.offset) });
  }
  console.log(`收件人 ${list.length} 个 (已过滤 ${emails.size - list.length} 个测试/一次性地址):`);
  for (const s of schedule) {
    console.log(`  - ${s.email}  (UTC${s.offset >= 0 ? "+" : ""}${s.offset} · 当地19:00 = ${s.sendAtUtc.slice(11, 16)} UTC · ${s.lang})`);
  }

  const scheduleMode = process.argv.includes("--schedule");
  const sendMode = process.argv.includes("--send");
  if (!scheduleMode && !sendMode) {
    console.log("");
    console.log("--dry 模式: 未发送。实发: --send 立即 / --schedule 各时区当地19:00 定时");
    return;
  }
  if (!API_KEY) { console.error("RESEND_API_KEY 缺失"); process.exit(1); }

  for (const s of schedule) {
    const ru = s.lang === "ru";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        from: "Chinese Culture Studio <noreply@culture-of-china.com>",
        to: [s.email],
        subject: ru ? SUBJECT.ru : SUBJECT.en,
        text: ru ? BODY.ru : BODY.en,
        ...(scheduleMode ? { scheduled_at: s.sendAtUtc } : {}),
      }),
    });
    const j = await res.json().catch(() => ({}));
    const status = scheduleMode
      ? (res.status === 200 ? `scheduled @ ${s.sendAtUtc.slice(11, 16)} UTC ✅` : "FAIL " + res.status + " " + JSON.stringify(j).slice(0, 120))
      : (res.status === 200 ? "sent ✅" : "FAIL " + res.status + " " + JSON.stringify(j).slice(0, 120));
    console.log(`  ${s.email}: ${status}`);
    await new Promise(r => setTimeout(r, 400)); // 温和限速
  }
  console.log("done");
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
