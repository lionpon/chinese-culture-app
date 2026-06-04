import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

async function computeFingerprint(req: NextRequest): Promise<string> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = req.headers.get("user-agent") || "";
  const raw = ip + "|" + ua;
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(req: NextRequest) {
  const purchaseId = req.nextUrl.searchParams.get("purchase_id");

  if (!purchaseId) {
    return NextResponse.json({ error: "Missing purchase_id" }, { status: 400 });
  }

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
  });

  if (!purchase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Require fingerprint match for free purchases (prevent enumeration)
  if (purchase.fingerprint) {
    const reqFingerprint = await computeFingerprint(req);
    if (reqFingerprint !== purchase.fingerprint) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  if (purchase.status === "pending") {
    return NextResponse.json({ status: "pending" });
  }

  if (purchase.status === "failed") {
    return NextResponse.json({ status: "failed", error: "Processing failed. Please contact support for assistance." });
  }

  return NextResponse.json({
    status: "completed",
    type: purchase.type,
    result: JSON.parse(purchase.result || "{}"),
  });
}
