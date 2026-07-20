import { generateReport } from "@/lib/report";
import { pingSitemaps } from "@/lib/sitemap-ping";
import { sendDailyHexagramEmail } from "@/lib/email";
import { prisma } from "@/lib/db";
import { BASE_URL } from "@/lib/config";

export default async function AutoDailyReport() {
  try {
    const today = new Date().toISOString().slice(0, 10);

    let existed: { date: string } | null = null;
    try {
      existed = await prisma.dailyReport.findUnique({ where: { date: today } });
    } catch (dbErr) {
      console.error("[AutoDailyReport] DB findUnique failed:", dbErr instanceof Error ? dbErr.message : String(dbErr));
      // DB unavailable — skip report generation, don't crash the page
      return null;
    }

    try {
      await generateReport(today);
    } catch (reportErr) {
      console.error("[AutoDailyReport] generateReport failed:", reportErr instanceof Error ? reportErr.message : String(reportErr));
      // Report generation failed — non-critical, don't crash
    }

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
  } catch (err) {
    // Catch-all: never crash the page due to background tasks
    console.error("[AutoDailyReport] Unexpected error:", err instanceof Error ? err.message : String(err));
  }

  return null;
}
