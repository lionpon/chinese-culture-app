import { NextRequest, NextResponse } from "next/server";

// 临时路由（GSC 401 修复用, 2026-11-03）: 在 Render 上完成 OAuth 授权码兑换
// → refresh token 家族锚定 Render 出口。鉴权 = CRON_SECRET（与 cron 同级信任）。用完即删。
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  if (url.searchParams.get("token") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { code } = await req.json();
  if (!code) return NextResponse.json({ error: "missing code" }, { status: 400 });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirect_uri: "http://localhost:8123",
      code,
    }),
  });
  const text = await res.text();
  if (!res.ok) return NextResponse.json({ error: "exchange " + res.status + " " + text.slice(0, 200) }, { status: 502 });
  const data = JSON.parse(text);
  return NextResponse.json({ refresh_token: data.refresh_token, tokenLen: String(data.access_token || "").length });
}
