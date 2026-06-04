import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl } from "@/lib/paypal";
import { createLemonCheckout } from "@/lib/lemon";
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import type { NamingInput, CalendarInput, DivinationInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input, free, method = "paypal" } = body as { type: string; input: Record<string, unknown>; free?: boolean; method?: "paypal" | "lemon" };

    if (!["naming", "calendar", "divination", "palm-reading"].includes(type)) {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    if (free && type !== "palm-reading") {
      // Generate anonymous fingerprint from IP + User-Agent
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const ua = req.headers.get("user-agent") || "";
      const raw = ip + "|" + ua;
      const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
      const fingerprint = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");

      // Count existing free uses for this fingerprint
      const freeCount = await prisma.purchase.count({
        where: { fingerprint, paid: false, status: "completed" },
      });

      if (freeCount >= 2) {
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

      const remaining = 2 - freeCount - 1;
      return NextResponse.json({ purchase_id: purchase.id, free: true, remaining });
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

    // PayPal legacy fallback
    if (method === "paypal") {
      const url = buildPayPalCheckoutUrl(purchase.id, type, amount);
      return NextResponse.json({ url });
    }

    // Default: Lemon Squeezy (supports Alipay, WeChat Pay, PayPal, cards)
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;
    if (!storeId || !variantId) {
      return NextResponse.json({ error: "Payment configuration missing" }, { status: 500 });
    }
    const lemonResult = await createLemonCheckout({
      storeId,
      variantId,
      purchaseId: purchase.id,
      type,
      amount,
    });
    return NextResponse.json({ url: lemonResult.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create checkout" }, { status: 500 });
  }
}
