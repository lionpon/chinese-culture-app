// NFL 赛果 — Supabase "NflResult" 表（raw SQL，无 Prisma 模型，与 DailyEmailLog 同模式）
// 赛果由每日 cron（daily-seo.yml → /api/cron）自动抓取 ESPN 写入；本文件只负责读 + 合并。
import { prisma } from "@/lib/db";
import { type NFLMatch } from "@/data/nfl-2026";

export type NflDbResult = { home: number; away: number };

interface NflResultRow {
  id: string;
  homeScore: number;
  awayScore: number;
}

export async function fetchNflResults(): Promise<Record<string, NflDbResult>> {
  try {
    const rows = await prisma.$queryRawUnsafe<NflResultRow[]>(
      `SELECT id, "homeScore", "awayScore" FROM "NflResult"`
    );
    const out: Record<string, NflDbResult> = {};
    for (const r of rows) out[r.id] = { home: r.homeScore, away: r.awayScore };
    return out;
  } catch (err) {
    // DB 不可用时静默回退静态数据，页面仍可用
    console.error("[nfl-results] read failed (fallback to static):", String(err));
    return {};
  }
}

// DB 赛果优先；缺失时回退 TS 静态 result（周 1-5 种子数据）
export function mergeNflResults(
  matches: NFLMatch[],
  dbResults: Record<string, NflDbResult>
): NFLMatch[] {
  return matches.map((m) => {
    const db = dbResults[m.id];
    return db ? { ...m, result: { home: db.home, away: db.away } } : m;
  });
}
