import { NextRequest, NextResponse } from "next/server";
import { getAppUrl } from "@/lib/paypal";

/**
 * PayPal Standard return endpoint (rm=2 → PayPal POSTs all variables here).
 *
 * rm=2 means PayPal redirects the buyer's browser back with a POST whose
 * body contains tx / custom / cm etc. The success page is a client
 * component and can only read the URL query string — so this tiny server
 * route converts the PayPal POST into a GET redirect that carries both
 * purchase_id and tx, letting the existing /api/pdt flow run instantly.
 *
 * Fallbacks:
 * - GET handler: covers the case where PayPal returns via GET (rm fallback).
 * - If tx is missing (PDT disabled in account), the success page simply
 *   polls /api/result and IPN completes the purchase.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const form = new URLSearchParams(body);
  return redirect(form, req.nextUrl.searchParams);
}

export async function GET(req: NextRequest) {
  return redirect(req.nextUrl.searchParams, req.nextUrl.searchParams);
}

function redirect(form: URLSearchParams, query: URLSearchParams) {
  const appUrl = getAppUrl();
  const tx = form.get("tx") || query.get("tx") || "";
  const purchaseId =
    form.get("custom") || form.get("cm") || query.get("purchase_id") || "";

  const qs = new URLSearchParams();
  if (purchaseId) qs.set("purchase_id", purchaseId);
  if (tx) qs.set("tx", tx);

  // 303 See Other → forces the browser to GET the success page
  return NextResponse.redirect(
    `${appUrl}/success${qs.size ? `?${qs.toString()}` : ""}`,
    { status: 303 }
  );
}
