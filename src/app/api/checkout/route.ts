import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { interpretDream } from "@/lib/dream-interpretation";
import type { NamingInput, CalendarInput, DivinationInput, DreamInterpretationInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input, free } = body as { type: string; input: Record<string, unknown>; free?: boolean };

    if (!["naming", "calendar", "divination", "palm-reading", "dream-interpretation"].includes(type)) {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    if (free && type !== "palm-reading") {
      // Check persistent cookie first — survives localStorage clear
      const cookieFreeUsed = req.cookies.get("cc_free_used");
      if (cookieFreeUsed?.value === "1") {
        return NextResponse.json(
          { error: "free_limit_reached", remaining: 0 },
          { status: 403 }
        );
      }

      // Generate anonymous fingerprint from IP + User-Agent
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const ua = req.headers.get("user-agent") || "";
      const raw = ip + "|" + ua;
      const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
      const fingerprint = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");

      // Count existing free uses for this fingerprint (catches IP changes)
      const freeCount = await prisma.purchase.count({
        where: { fingerprint, paid: false, status: "completed" },
      });

      if (freeCount >= 1) {
        return NextResponse.json(
          { error: "free_limit_reached", remaining: 0 },
          { status: 403 }
        );
      }

      let result: unknown;
      switch (type) {
        case "naming": result = (input.mode === "analyze") ? analyzeName(input as unknown as NamingInput) : generateNames(input as unknown as NamingInput, true); break;
        case "calendar": result = selectAuspiciousDays(input as unknown as CalendarInput, true); break;
        case "divination": result = performDivination(input as unknown as DivinationInput, true); break;
        case "dream-interpretation": result = await interpretDream(input as unknown as DreamInterpretationInput, true); break;
      }

      const purchase = await prisma.purchase.create({
        data: {
          checkoutId: crypto.randomUUID(),
          type,
          input: JSON.stringify(input),
          status: "completed",
          paid: false,
          fingerprint,
          result: JSON.stringify(result),
        },
      });

      const response = NextResponse.json({ purchase_id: purchase.id, free: true, remaining: 0 });
      // Persistent HTTP-only cookie — survives localStorage/cache clear
      response.cookies.set("cc_free_used", "1", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: "/",
      });
      return response;
    }

    // Paid flow — create pending purchase, return payment URL
    const tempId = crypto.randomUUID();
    const purchase = await prisma.purchase.create({
      data: {
        checkoutId: tempId,
        type,
        input: JSON.stringify(input),
        status: "pending",
      },
    });

    const amount = typeof input.amount === "number" && input.amount >= 1 ? input.amount : 1;

    // PayPal — LS dropped support for Chinese merchants (2025-06-17)
    const url = buildPayPalCheckoutUrl(purchase.id, type, amount);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Payment service temporarily unavailable" }, { status: 500 });
  }
}
