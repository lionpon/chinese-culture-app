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

    if (!resendApiKey || !contactEmail) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL");
      return NextResponse.json({ error: "config_error" }, { status: 500 });
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
      console.error("Resend API error:", err);
      return NextResponse.json({ error: "send_failed" }, { status: 500 });
    }

    // Record rate limit
    rateLimit.set(ip, Date.now());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
