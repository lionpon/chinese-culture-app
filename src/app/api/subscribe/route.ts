import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const rateLimit = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const lastSent = rateLimit.get(ip);
    if (lastSent && Date.now() - lastSent < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "rate_limited", message: "Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, source } = body as { email?: string; source?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const validSources = ["zodiac-calculator", "five-elements-test", "divination", "naming", "calendar", "palm-reading", "homepage", "dream-interpretation", "dream-ai", "zodiac-match", "daily-fortune", "name-preview", "quick-oracle"];
    if (!source || !validSources.includes(source)) {
      return NextResponse.json({ error: "invalid_source" }, { status: 400 });
    }

    await prisma.subscriber.upsert({
      where: { email },
      update: { source },
      create: { email, source },
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const sourceLabels: Record<string, string> = {
        "zodiac-calculator": "Zodiac Calculator",
        "five-elements-test": "Five Elements Test",
        "divination": "I Ching Divination",
        "naming": "Chinese Name",
        "calendar": "Auspicious Dates",
        "palm-reading": "Palm Reading",
      };
      const sourceLabel = sourceLabels[source] || source;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Chinese Culture Studio <noreply@culture-of-china.com>",
          to: [email],
          subject: `Your ${sourceLabel} Report from Chinese Culture Studio`,
          text: `Thank you for using the ${sourceLabel}!\n\nExplore more about your Chinese cultural destiny:\n- Get your personalized Chinese name: https://www.culture-of-china.com/naming\n- Consult the I Ching oracle: https://www.culture-of-china.com/divination\n- Find your auspicious dates: https://www.culture-of-china.com/calendar\n\nWarm regards,\nChinese Culture Studio`,
          html: `<div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 24px;">
<h2 style="color: #9B4A3A;">Thank You for Using the ${sourceLabel}</h2>
<p>We hope you enjoyed discovering your Chinese cultural connection.</p>
<p>Ready to explore more?</p>
<ul>
<li><a href="https://www.culture-of-china.com/naming">Get your personalized Chinese name</a></li>
<li><a href="https://www.culture-of-china.com/divination">Consult the I Ching oracle</a></li>
<li><a href="https://www.culture-of-china.com/calendar">Find your auspicious dates</a></li>
</ul>
<p style="color: #888; font-size: 12px; margin-top: 24px;">Chinese Culture Studio — For cultural appreciation only.</p>
</div>`,
        }),
        signal: AbortSignal.timeout(10_000),
      }).catch(() => {});
    }

    rateLimit.set(ip, Date.now());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
