import { generateReport } from "@/lib/report";
import { pingSitemaps } from "@/lib/sitemap-ping";
import { sendDailyHexagramEmail } from "@/lib/email";
import { prisma } from "@/lib/db";
import { BASE_URL } from "@/lib/config";

export default async function AutoDailyReport() {
  const today = new Date().toISOString().slice(0, 10);

  const existed = await prisma.dailyReport.findUnique({ where: { date: today } });

  await generateReport(today);

  // Only run once per day — on first report generation
  if (!existed) {
    pingSitemaps().catch(() => {});

    // Send daily email digest via Resend
    sendDailyHexagramEmail().catch(() => {});

    // Auto-post daily hexagram to Telegram (all 4 locales, if configured)
    const secret = process.env.TELEGRAM_POST_SECRET;
    if (secret) {
      for (const lang of ["en", "ru", "ja", "ko"]) {
        fetch(`${BASE_URL}/api/telegram-post?token=${secret}&lang=${lang}`).catch(() => {});
      }
    }
  }

  return null;
}
