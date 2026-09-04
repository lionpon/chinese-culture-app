// Shared token check for social posting endpoints.
// A caller must present ?token=TELEGRAM_POST_SECRET or ADMIN_TOKEN.
// Cron passes the post secret; the admin dashboard passes the admin token.

import type { NextRequest } from "next/server";

export function isAuthorizedPost(req: NextRequest): boolean {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return false;
  const postSecret = process.env.TELEGRAM_POST_SECRET;
  const adminToken = process.env.ADMIN_TOKEN;
  if (postSecret && token === postSecret) return true;
  if (adminToken && token === adminToken) return true;
  return false;
}

