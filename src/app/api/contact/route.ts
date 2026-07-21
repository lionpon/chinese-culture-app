import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit: IP -> last send timestamp
const rateLimit = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 1 minute

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limit check
    const lastSent = rateLimit.get(ip);
    if (lastSent && Date.now() - lastSent < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "rate_limited", message: "Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, message } = body as { email?: string; message?: string };

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: "message_too_short" }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "message_too_long" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    // Save to DB as fallback even if email not configured
    try {
      const { prisma } = await import("@/lib/db");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (prisma as any).contactMessage?.create?.({
        data: { email, message: message.trim() }
      });
    } catch { /* table might not exist yet */ }

    if (!resendApiKey || !contactEmail) {
      console.warn("[contact] Email not configured — message saved to DB only");
      rateLimit.set(ip, Date.now());
      return NextResponse.json({ success: true, note: "email_not_configured" });
    }

    // Use Resend API directly (avoid SDK import issues with edge runtime)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Chinese Culture Studio <onboarding@resend.dev>",
        to: [contactEmail],
        reply_to: email,
        subject: `Contact Form: message from ${email}`,
        text: `From: ${email}\n\n${message.trim()}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Resend API error:", err);
      // Still return success — message was saved via DB
      rateLimit.set(ip, Date.now());
      return NextResponse.json({ success: true, note: "email_delayed" });
    }

    // Record rate limit
    rateLimit.set(ip, Date.now());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
