// NFL 赛果自动同步 — ESPN scoreboard API → Supabase "NflResult"
// 由 /api/cron 每日调用（Render 美区可直连 ESPN）；幂等 upsert，可反复执行。
import { prisma } from "@/lib/db";
import { FEATURED_MATCHES } from "@/data/nfl-2026";

const ESPN_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=";

interface EspnCompetitor {
  homeAway: string;
  score?: string | number;
  team?: { abbreviation?: string };
}
interface EspnCompetition {
  competitors?: EspnCompetitor[];
  status?: { type?: { completed?: boolean; detail?: string } };
}
interface EspnEvent {
  competitions?: EspnCompetition[];
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

async function fetchScoreboard(dateStr: string): Promise<EspnEvent[]> {
  const res = await fetch(`${ESPN_URL}${dateStr}`, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`ESPN HTTP ${res.status} for ${dateStr}`);
  const j = await res.json();
  return j.events || [];
}

export interface NflSyncSummary {
  datesFetched: number;
  completedFound: number;
  upserted: number;
  errors: string[];
}

export async function syncNflResultsFromEspn(): Promise<NflSyncSummary> {
  const summary: NflSyncSummary = { datesFetched: 0, completedFound: 0, upserted: 0, errors: [] };

  const today = new Date();
  const lookback = addDays(today, -14);

  // 已入库场次：超过 14 天的终局比分不再变化，跳过不扫（首次运行表为空 → 全量种子化）
  let dbIds = new Set<string>();
  try {
    const rows = await prisma.$queryRawUnsafe<{ id: string }[]>(`SELECT id FROM "NflResult"`);
    dbIds = new Set(rows.map((r) => r.id));
  } catch (err) {
    summary.errors.push(`NflResult read failed: ${String(err).split("\n")[0].slice(0, 100)}`);
    return summary;
  }

  const toSync = FEATURED_MATCHES.filter((m) => {
    const md = new Date(`${m.date}T12:00:00Z`); // 美国本地日期当天的中午，避免时区漂移
    if (md < lookback && dbIds.has(m.id)) return false; // 旧场次已入库 → 跳过
    return true;
  });
  if (toSync.length === 0) return summary;

  // 每个比赛日取当天 UTC 计分板；夜赛在 UTC 属次日 → 也取次日板，缓存去重
  const cache = new Map<string, EspnEvent[]>();
  const getEvents = async (date: string): Promise<EspnEvent[]> => {
    const key = ymd(new Date(`${date}T12:00:00Z`));
    if (!cache.has(key)) {
      const evs = await fetchScoreboard(key);
      cache.set(key, evs);
      summary.datesFetched++;
    }
    return cache.get(key)!;
  };

  for (const m of toSync) {
    const md = new Date(`${m.date}T12:00:00Z`);
    try {
      let evs = await getEvents(m.date);
      if (evs.length === 0) evs = await getEvents(addDays(md, 1).toISOString().slice(0, 10));

      const event = evs.find((e) => {
        const comp = e.competitions?.[0];
        if (!comp) return false;
        const home = comp.competitors?.find((c) => c.homeAway === "home");
        const away = comp.competitors?.find((c) => c.homeAway === "away");
        return home?.team?.abbreviation === m.home && away?.team?.abbreviation === m.away;
      });
      if (!event) continue;

      const comp = event.competitions![0];
      if (!comp.status?.type?.completed) continue;
      const home = comp.competitors?.find((c) => c.homeAway === "home");
      const away = comp.competitors?.find((c) => c.homeAway === "away");
      const homeScore = Number(home?.score);
      const awayScore = Number(away?.score);
      if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) continue;

      summary.completedFound++;
      await prisma.$executeRawUnsafe(
        `INSERT INTO "NflResult" ("id", "homeScore", "awayScore", "updatedAt") VALUES ('${m.id}', ${homeScore}, ${awayScore}, now()) ON CONFLICT ("id") DO UPDATE SET "homeScore" = EXCLUDED."homeScore", "awayScore" = EXCLUDED."awayScore", "updatedAt" = now()`
      );
      summary.upserted++;
    } catch (err) {
      const msg = `${m.id}: ${String(err).split("\n")[0].slice(0, 100)}`;
      summary.errors.push(msg);
    }
  }

  return summary;
}
