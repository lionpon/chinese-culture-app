import { NextRequest, NextResponse } from "next/server";
import { generateReport, getReports } from "@/lib/report";

function checkAuth(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token") || "";
  const expected = process.env.ADMIN_TOKEN || "";
  if (!expected) return false;
  // constant-time-ish comparison
  if (token.length !== expected.length) return false;
  let ok = true;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== expected[i]) ok = false;
  }
  return ok;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const date = searchParams.get("date");
  const days = parseInt(searchParams.get("days") || "7");
  const locale = searchParams.get("locale") || undefined;

  if (date) {
    const report = await generateReport(date, locale);
    return NextResponse.json(report);
  }

  const today = new Date().toISOString().slice(0, 10);
  await generateReport(today);

  const reports = await getReports(days, locale);
  return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const report = await generateReport(today);
  return NextResponse.json(report);
}
