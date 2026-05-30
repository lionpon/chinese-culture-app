import { generateReport } from "@/lib/report";
import { pingSitemaps } from "@/lib/sitemap-ping";
import { prisma } from "@/lib/db";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://chinese-culture-app.onrender.com";

export default async function AutoDailyReport() {
  const today = new Date().toISOString().slice(0, 10);

  const existed = await prisma.dailyReport.findUnique({ where: { date: today } });

  await generateReport(today);

  // Only run once per day — on first report generation
  if (!existed) {
    pingSitemaps().catch(() => {});

    // Auto-post daily hexagram to Telegram (EN + RU)
    const secret = process.env.TELEGRAM_POST_SECRET;
    if (secret) {
      fetch(`${BASE_URL}/api/telegram-post?token=${secret}`).catch(() => {});
      fetch(`${BASE_URL}/api/telegram-post?token=${secret}&lang=ru`).catch(() => {});
    }
  }

  return null;
}
