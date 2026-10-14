// NFL 2026 season (107th) — featured games data
// 数据来源：ESPN scoreboard API（2026-10-14 抓取核实）+ PLAN_NFL_SUPERBOWL.md 已核实事实
// 维护约定：
//  • 每周焦点战 6 场人工选定（对抗性 + 季后赛悬念），排期由 ESPN 核实
//  • 赛果【自动更新】：每日 cron 抓 ESPN 写入 Supabase "NflResult"，页面读 DB（本文件 result 仅作种子/回退）

export interface NFLMatch {
  id: string;
  week: number;
  date: string;       // 美国本地日期 "2026-09-09"
  home: string;       // 球队缩写
  away: string;
  venue: string;
  note?: string;      // TNF / SNF / MNF / 国际赛 等
  result?: { home: number; away: number };
}

export const SUPER_BOWL_LXI = {
  name: "Super Bowl LXI",
  date: "2027-02-14",
  kickoffUtc: "2027-02-14T23:30:00Z", // 6:30 PM ET / 3:30 PM PT
  venue: "SoFi Stadium, Inglewood, CA",
  note: "史上首次情人节+总统日周末；SoFi 第 2 次承办",
};

export const PLAYOFF_SCHEDULE = [
  { round: "Wild Card Round", dates: "2027-01-16 – 2027-01-18" },
  { round: "Divisional Round", dates: "2027-01-23 – 2027-01-24" },
  { round: "Conference Championships", dates: "2027-01-31" },
  { round: "Super Bowl LXI", dates: "2027-02-14 — SoFi Stadium, Inglewood, CA" },
];

// 32 队缩写 → 全名
export const NFL_TEAMS: Record<string, string> = {
  BUF: "Buffalo Bills", MIA: "Miami Dolphins", NE: "New England Patriots", NYJ: "New York Jets",
  BAL: "Baltimore Ravens", CIN: "Cincinnati Bengals", CLE: "Cleveland Browns", PIT: "Pittsburgh Steelers",
  HOU: "Houston Texans", IND: "Indianapolis Colts", JAX: "Jacksonville Jaguars", TEN: "Tennessee Titans",
  KC: "Kansas City Chiefs", LAC: "Los Angeles Chargers", DEN: "Denver Broncos", LV: "Las Vegas Raiders",
  DAL: "Dallas Cowboys", NYG: "New York Giants", PHI: "Philadelphia Eagles", WSH: "Washington Commanders",
  CHI: "Chicago Bears", DET: "Detroit Lions", GB: "Green Bay Packers", MIN: "Minnesota Vikings",
  ATL: "Atlanta Falcons", CAR: "Carolina Panthers", NO: "New Orleans Saints", TB: "Tampa Bay Buccaneers",
  ARI: "Arizona Cardinals", LAR: "Los Angeles Rams", SF: "San Francisco 49ers", SEA: "Seattle Seahawks",
};

export interface NFLDivision {
  name: string;
  teams: string[]; // 缩写
}

export const DIVISIONS: NFLDivision[] = [
  { name: "AFC East", teams: ["BUF", "MIA", "NE", "NYJ"] },
  { name: "AFC North", teams: ["BAL", "CIN", "CLE", "PIT"] },
  { name: "AFC South", teams: ["HOU", "IND", "JAX", "TEN"] },
  { name: "AFC West", teams: ["KC", "LAC", "DEN", "LV"] },
  { name: "NFC East", teams: ["DAL", "NYG", "PHI", "WSH"] },
  { name: "NFC North", teams: ["CHI", "DET", "GB", "MIN"] },
  { name: "NFC South", teams: ["ATL", "CAR", "NO", "TB"] },
  { name: "NFC West", teams: ["ARI", "LAR", "SF", "SEA"] },
];

export const FEATURED_MATCHES: NFLMatch[] = [
  // ===== Week 1 =====
  { id: "W1-1", week: 1, date: "2026-09-09", home: "SEA", away: "NE", venue: "Lumen Field", note: "Season opener", result: { home: 13, away: 10 } },
  { id: "W1-2", week: 1, date: "2026-09-10", home: "LAR", away: "SF", venue: "Melbourne Cricket Ground", note: "International — Melbourne", result: { home: 7, away: 27 } },
  { id: "W1-3", week: 1, date: "2026-09-13", home: "HOU", away: "BUF", venue: "Reliant Stadium", result: { home: 31, away: 36 } },
  { id: "W1-4", week: 1, date: "2026-09-13", home: "CAR", away: "CHI", venue: "Bank of America Stadium", result: { home: 37, away: 59 } },
  { id: "W1-5", week: 1, date: "2026-09-13", home: "MIN", away: "GB", venue: "U.S. Bank Stadium", result: { home: 39, away: 22 } },
  { id: "W1-6", week: 1, date: "2026-09-13", home: "IND", away: "BAL", venue: "Lucas Oil Stadium", result: { home: 23, away: 41 } },

  // ===== Week 2 =====
  { id: "W2-1", week: 2, date: "2026-09-17", home: "BUF", away: "DET", venue: "Highmark Stadium", note: "TNF", result: { home: 41, away: 31 } },
  { id: "W2-2", week: 2, date: "2026-09-20", home: "NE", away: "PIT", venue: "Gillette Stadium", result: { home: 20, away: 3 } },
  { id: "W2-3", week: 2, date: "2026-09-20", home: "DAL", away: "WSH", venue: "AT&T Stadium", result: { home: 37, away: 20 } },
  { id: "W2-4", week: 2, date: "2026-09-20", home: "BAL", away: "NO", venue: "M&T Bank Stadium", result: { home: 17, away: 24 } },
  { id: "W2-5", week: 2, date: "2026-09-20", home: "KC", away: "IND", venue: "Arrowhead Stadium", result: { home: 33, away: 30 } },
  { id: "W2-6", week: 2, date: "2026-09-20", home: "SF", away: "MIA", venue: "Levi's Stadium", result: { home: 35, away: 13 } },

  // ===== Week 3 =====
  { id: "W3-1", week: 3, date: "2026-09-24", home: "GB", away: "ATL", venue: "Lambeau Field", note: "TNF", result: { home: 14, away: 35 } },
  { id: "W3-2", week: 3, date: "2026-09-27", home: "BUF", away: "LAC", venue: "Highmark Stadium", result: { home: 24, away: 16 } },
  { id: "W3-3", week: 3, date: "2026-09-27", home: "PIT", away: "CIN", venue: "Acrisure Stadium", result: { home: 30, away: 27 } },
  { id: "W3-4", week: 3, date: "2026-09-27", home: "WSH", away: "SEA", venue: "Northwest Stadium", result: { home: 33, away: 31 } },
  { id: "W3-5", week: 3, date: "2026-09-27", home: "DAL", away: "BAL", venue: "Maracanã Stadium", note: "International — Rio de Janeiro", result: { home: 31, away: 34 } },
  { id: "W3-6", week: 3, date: "2026-09-27", home: "MIA", away: "KC", venue: "Hard Rock Stadium", result: { home: 10, away: 24 } },

  // ===== Week 4 =====
  { id: "W4-1", week: 4, date: "2026-10-01", home: "CLE", away: "PIT", venue: "Huntington Bank Field", note: "TNF", result: { home: 27, away: 24 } },
  { id: "W4-2", week: 4, date: "2026-10-04", home: "WSH", away: "IND", venue: "Tottenham Hotspur Stadium", note: "International — London", result: { home: 13, away: 30 } },
  { id: "W4-3", week: 4, date: "2026-10-04", home: "BUF", away: "NE", venue: "Highmark Stadium", result: { home: 26, away: 29 } },
  { id: "W4-4", week: 4, date: "2026-10-04", home: "BAL", away: "TEN", venue: "M&T Bank Stadium", result: { home: 24, away: 18 } },
  { id: "W4-5", week: 4, date: "2026-10-04", home: "HOU", away: "DAL", venue: "Reliant Stadium", result: { home: 30, away: 34 } },
  { id: "W4-6", week: 4, date: "2026-10-04", home: "LV", away: "KC", venue: "Allegiant Stadium", result: { home: 27, away: 30 } },

  // ===== Week 5 =====
  { id: "W5-1", week: 5, date: "2026-10-08", home: "DAL", away: "TB", venue: "AT&T Stadium", note: "TNF", result: { home: 16, away: 24 } },
  { id: "W5-2", week: 5, date: "2026-10-11", home: "JAX", away: "PHI", venue: "Tottenham Hotspur Stadium", note: "International — London", result: { home: 19, away: 17 } },
  { id: "W5-3", week: 5, date: "2026-10-11", home: "GB", away: "CHI", venue: "Lambeau Field", result: { home: 31, away: 7 } },
  { id: "W5-4", week: 5, date: "2026-10-11", home: "PIT", away: "IND", venue: "Acrisure Stadium", result: { home: 34, away: 22 } },
  { id: "W5-5", week: 5, date: "2026-10-11", home: "SEA", away: "SF", venue: "Lumen Field", result: { home: 29, away: 32 } },
  { id: "W5-6", week: 5, date: "2026-10-12", home: "LAR", away: "BUF", venue: "SoFi Stadium", note: "MNF", result: { home: 34, away: 37 } },

  // ===== Week 6 =====
  { id: "W6-1", week: 6, date: "2026-10-15", home: "DEN", away: "SEA", venue: "Empower Field at Mile High", note: "TNF" },
  { id: "W6-2", week: 6, date: "2026-10-18", home: "JAX", away: "HOU", venue: "Wembley Stadium", note: "International — London" },
  { id: "W6-3", week: 6, date: "2026-10-18", home: "KC", away: "LAC", venue: "Arrowhead Stadium" },
  { id: "W6-4", week: 6, date: "2026-10-18", home: "TB", away: "PIT", venue: "Raymond James Stadium" },
  { id: "W6-5", week: 6, date: "2026-10-18", home: "GB", away: "DAL", venue: "Lambeau Field", note: "SNF" },
  { id: "W6-6", week: 6, date: "2026-10-19", home: "SF", away: "WSH", venue: "Levi's Stadium", note: "MNF" },

  // ===== Week 7 =====
  { id: "W7-1", week: 7, date: "2026-10-22", home: "CHI", away: "NE", venue: "Soldier Field", note: "TNF" },
  { id: "W7-2", week: 7, date: "2026-10-25", home: "NO", away: "PIT", venue: "Stade de France", note: "International — Paris" },
  { id: "W7-3", week: 7, date: "2026-10-25", home: "BAL", away: "CIN", venue: "M&T Bank Stadium" },
  { id: "W7-4", week: 7, date: "2026-10-25", home: "DET", away: "GB", venue: "Ford Field" },
  { id: "W7-5", week: 7, date: "2026-10-25", home: "SEA", away: "KC", venue: "Lumen Field", note: "SNF" },
  { id: "W7-6", week: 7, date: "2026-10-26", home: "PHI", away: "DAL", venue: "Lincoln Financial Field", note: "MNF" },
];

export function getMatchesByWeek(week: number, matches: NFLMatch[] = FEATURED_MATCHES): NFLMatch[] {
  return matches.filter((m) => m.week === week);
}

export function getCurrentWeek(matches: NFLMatch[] = FEATURED_MATCHES): number {
  const today = new Date().toISOString().slice(0, 10);
  // 当前周 = 第一个含未开打比赛的周（若有）；否则最后一周
  const pendingWeek = matches.find((m) => m.date >= today && !m.result)?.week;
  if (pendingWeek !== undefined) return pendingWeek;
  let lastWeek = 1;
  for (const m of matches) {
    if (m.week > lastWeek) lastWeek = m.week;
  }
  return lastWeek;
}

export function getPlayedMatches(matches: NFLMatch[] = FEATURED_MATCHES): NFLMatch[] {
  return matches.filter((m) => m.result);
}
