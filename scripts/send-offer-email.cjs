// 首单 offer 邮件 — 一次性召回（2026-10-28，用户授权）
// 收件人 = 历史留过邮箱的 Purchase 用户 + Subscriber（去重）
// 用法: node scripts/send-offer-email.cjs --dry    (预览收件人与文案, 不发)
//       node scripts/send-offer-email.cjs --send   (真实发送)
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const API_KEY = envRaw.match(/^RESEND_API_KEY=(.+)$/m)?.[1]?.trim() || "";

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

  const list = [...emails];
  console.log(`收件人 ${list.length} 个:`);
  for (const e of list) console.log("  - " + e);
  const isRu = (e) => /\.(ru|by|kz)$/.test(e) || e.startsWith("bk.");
  console.log("  (俄语系 " + list.filter(isRu).length + " / 其他 " + list.filter(e => !isRu(e)).length + ")");

  if (!process.argv.includes("--send")) {
    console.log("\n--dry 模式: 未发送。确认后用 --send 实发");
    return;
  }
  if (!API_KEY) { console.error("RESEND_API_KEY 缺失"); process.exit(1); }

  for (const e of list) {
    const ru = isRu(e);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        from: "Chinese Culture Studio <noreply@culture-of-china.com>",
        to: [e],
        subject: ru ? SUBJECT.ru : SUBJECT.en,
        text: ru ? BODY.ru : BODY.en,
      }),
    });
    const j = await res.json().catch(() => ({}));
    console.log(`  ${e}: ${res.status === 200 ? "sent ✅" : "FAIL " + res.status + " " + JSON.stringify(j).slice(0, 120)}`);
    await new Promise(r => setTimeout(r, 400)); // 温和限速
  }
  console.log("done");
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
