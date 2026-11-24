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
  // ===== Week 8 =====
  { id: "W8-1", week: 8, date: "2026-10-29", home: "GB", away: "CAR", venue: "Lambeau Field", note: "TNF", result: { home: 27, away: 19 } },
  { id: "W8-2", week: 8, date: "2026-11-02", home: "SEA", away: "CHI", venue: "Lumen Field", note: "MNF", result: { home: 17, away: 34 } },
  { id: "W8-3", week: 8, date: "2026-11-01", home: "WSH", away: "PHI", venue: "Northwest Stadium", note: "SNF", result: { home: 27, away: 10 } },
  { id: "W8-4", week: 8, date: "2026-11-01", home: "BUF", away: "BAL", venue: "Highmark Stadium", result: { home: 36, away: 10 } },
  { id: "W8-5", week: 8, date: "2026-11-01", home: "CIN", away: "TEN", venue: "Paycor Stadium", result: { home: 43, away: 36 } },
  { id: "W8-6", week: 8, date: "2026-11-01", home: "DAL", away: "ARI", venue: "AT&T Stadium", result: { home: 30, away: 33 } },
  // ===== Week 9 =====
  { id: "W9-1", week: 9, date: "2026-11-05", home: "BAL", away: "JAX", venue: "M&T Bank Stadium", note: "TNF", result: { home: 10, away: 33 } },
  { id: "W9-2", week: 9, date: "2026-11-09", home: "MIN", away: "BUF", venue: "U.S. Bank Stadium", note: "MNF", result: { home: 6, away: 23 } },
  { id: "W9-3", week: 9, date: "2026-11-08", home: "CHI", away: "TB", venue: "Soldier Field", note: "SNF", result: { home: 27, away: 24 } },
  { id: "W9-4", week: 9, date: "2026-11-08", home: "ATL", away: "CIN", venue: "Santiago Bernabéu", note: "International — Madrid", result: { home: 17, away: 34 } },
  { id: "W9-5", week: 9, date: "2026-11-08", home: "IND", away: "DAL", venue: "Lucas Oil Stadium", result: { home: 23, away: 27 } },
  { id: "W9-6", week: 9, date: "2026-11-08", home: "KC", away: "NYJ", venue: "Arrowhead Stadium", result: { home: 35, away: 12 } },
  // ===== Week 10 =====
  { id: "W10-1", week: 10, date: "2026-11-12", home: "NYG", away: "WSH", venue: "MetLife Stadium", note: "TNF", result: { home: 21, away: 24 } },
  { id: "W10-2", week: 10, date: "2026-11-16", home: "BAL", away: "LAC", venue: "M&T Bank Stadium", note: "MNF", result: { home: 20, away: 23 } },
  { id: "W10-3", week: 10, date: "2026-11-15", home: "CIN", away: "PIT", venue: "Paycor Stadium", note: "SNF", result: { home: 38, away: 18 } },
  { id: "W10-4", week: 10, date: "2026-11-15", home: "DET", away: "NE", venue: "FC Bayern Munich Stadium", note: "International — Munich", result: { home: 35, away: 10 } },
  { id: "W10-5", week: 10, date: "2026-11-15", home: "ATL", away: "KC", venue: "Mercedes-Benz Stadium", result: { home: 13, away: 35 } },
  { id: "W10-6", week: 10, date: "2026-11-15", home: "CLE", away: "HOU", venue: "Huntington Bank Field", result: { home: 27, away: 24 } },
  // ===== Week 11 =====
  { id: "W11-1", week: 11, date: "2026-11-19", home: "HOU", away: "IND", venue: "Reliant Stadium", note: "TNF", result: { home: 26, away: 3 } },
  { id: "W11-2", week: 11, date: "2026-11-23", home: "WSH", away: "CIN", venue: "Northwest Stadium", note: "MNF", result: { home: 22, away: 20 } },
  { id: "W11-3", week: 11, date: "2026-11-22", home: "SF", away: "MIN", venue: "Estadio Banorte", note: "SNF — Mexico City", result: { home: 35, away: 10 } },
  { id: "W11-4", week: 11, date: "2026-11-22", home: "BUF", away: "MIA", venue: "Highmark Stadium", result: { home: 26, away: 9 } },
  { id: "W11-5", week: 11, date: "2026-11-22", home: "CHI", away: "NO", venue: "Soldier Field", result: { home: 21, away: 13 } },
  { id: "W11-6", week: 11, date: "2026-11-22", home: "DAL", away: "TEN", venue: "AT&T Stadium", result: { home: 51, away: 30 } },
  // ===== Week 12 =====
  { id: "W12-1", week: 12, date: "2026-11-26", home: "DET", away: "CHI", venue: "Ford Field", note: "Thanksgiving" },
  { id: "W12-2", week: 12, date: "2026-11-30", home: "TB", away: "CAR", venue: "Raymond James Stadium", note: "MNF" },
  { id: "W12-3", week: 12, date: "2026-11-29", home: "CLE", away: "LV", venue: "Huntington Bank Field", note: "SNF" },
  { id: "W12-4", week: 12, date: "2026-11-25", home: "LAR", away: "GB", venue: "SoFi Stadium" },
  { id: "W12-5", week: 12, date: "2026-11-26", home: "DAL", away: "PHI", venue: "AT&T Stadium", note: "Thanksgiving" },
  { id: "W12-6", week: 12, date: "2026-11-26", home: "BUF", away: "KC", venue: "Highmark Stadium", note: "TNF" },
  // ===== Week 13 =====
  { id: "W13-1", week: 13, date: "2026-12-03", home: "LAR", away: "KC", venue: "SoFi Stadium", note: "TNF" },
  { id: "W13-2", week: 13, date: "2026-12-07", home: "SEA", away: "DAL", venue: "Lumen Field", note: "MNF" },
  { id: "W13-3", week: 13, date: "2026-12-06", home: "PIT", away: "HOU", venue: "Acrisure Stadium", note: "SNF" },
  { id: "W13-4", week: 13, date: "2026-12-06", home: "ATL", away: "DET", venue: "Mercedes-Benz Stadium" },
  { id: "W13-5", week: 13, date: "2026-12-06", home: "CHI", away: "JAX", venue: "Soldier Field" },
  { id: "W13-6", week: 13, date: "2026-12-06", home: "CLE", away: "CIN", venue: "Huntington Bank Field" },
  // ===== Week 14 =====
  { id: "W14-1", week: 14, date: "2026-12-10", home: "NE", away: "MIN", venue: "Gillette Stadium", note: "TNF" },
  { id: "W14-2", week: 14, date: "2026-12-14", home: "JAX", away: "PIT", venue: "EverBank Stadium", note: "MNF" },
  { id: "W14-3", week: 14, date: "2026-12-13", home: "GB", away: "BUF", venue: "Lambeau Field", note: "SNF" },
  { id: "W14-4", week: 14, date: "2026-12-13", home: "CLE", away: "ATL", venue: "Huntington Bank Field" },
  { id: "W14-5", week: 14, date: "2026-12-13", home: "DET", away: "TEN", venue: "Ford Field" },
  { id: "W14-6", week: 14, date: "2026-12-13", home: "MIA", away: "CHI", venue: "Hard Rock Stadium" },
  // ===== Week 15 =====
  { id: "W15-1", week: 15, date: "2026-12-17", home: "LAC", away: "SF", venue: "SoFi Stadium", note: "TNF" },
  { id: "W15-2", week: 15, date: "2026-12-21", home: "KC", away: "NE", venue: "Arrowhead Stadium", note: "MNF" },
  { id: "W15-3", week: 15, date: "2026-12-20", home: "MIN", away: "DET", venue: "U.S. Bank Stadium", note: "SNF" },
  { id: "W15-4", week: 15, date: "2026-12-19", home: "PHI", away: "SEA", venue: "Lincoln Financial Field" },
  { id: "W15-5", week: 15, date: "2026-12-19", home: "BUF", away: "CHI", venue: "Highmark Stadium" },
  { id: "W15-6", week: 15, date: "2026-12-20", home: "GB", away: "MIA", venue: "Lambeau Field" },
  // ===== Week 16 =====
  { id: "W16-1", week: 16, date: "2026-12-24", home: "PHI", away: "HOU", venue: "Lincoln Financial Field", note: "TNF" },
  { id: "W16-2", week: 16, date: "2026-12-28", home: "DET", away: "NYG", venue: "Ford Field", note: "MNF" },
  { id: "W16-3", week: 16, date: "2026-12-27", home: "DAL", away: "JAX", venue: "AT&T Stadium", note: "SNF" },
  { id: "W16-4", week: 16, date: "2026-12-25", home: "CHI", away: "GB", venue: "Soldier Field", note: "Christmas" },
  { id: "W16-5", week: 16, date: "2026-12-25", home: "DEN", away: "BUF", venue: "Empower Field at Mile High", note: "Christmas" },
  { id: "W16-6", week: 16, date: "2026-12-25", home: "SEA", away: "LAR", venue: "Lumen Field", note: "Christmas" },
  // ===== Week 17 =====
  { id: "W17-1", week: 17, date: "2026-12-31", home: "CIN", away: "BAL", venue: "Paycor Stadium", note: "TNF" },
  { id: "W17-2", week: 17, date: "2027-01-04", home: "GB", away: "HOU", venue: "Lambeau Field", note: "MNF" },
  { id: "W17-3", week: 17, date: "2027-01-03", home: "SF", away: "PHI", venue: "Levi's Stadium", note: "SNF" },
  { id: "W17-4", week: 17, date: "2027-01-03", home: "NE", away: "DEN", venue: "Gillette Stadium" },
  { id: "W17-5", week: 17, date: "2027-01-03", home: "LAC", away: "KC", venue: "SoFi Stadium" },
  { id: "W17-6", week: 17, date: "2027-01-03", home: "TB", away: "LAR", venue: "Raymond James Stadium" },
  // ===== Week 18 =====
  { id: "W18-1", week: 18, date: "2027-01-10", home: "BUF", away: "NYJ", venue: "Highmark Stadium" },
  { id: "W18-2", week: 18, date: "2027-01-10", home: "CIN", away: "CLE", venue: "Paycor Stadium" },
  { id: "W18-3", week: 18, date: "2027-01-10", home: "DEN", away: "LAC", venue: "Empower Field at Mile High" },
  { id: "W18-4", week: 18, date: "2027-01-10", home: "GB", away: "DET", venue: "Lambeau Field" },
  { id: "W18-5", week: 18, date: "2027-01-10", home: "IND", away: "JAX", venue: "Lucas Oil Stadium" },
  { id: "W18-6", week: 18, date: "2027-01-10", home: "KC", away: "LV", venue: "Arrowhead Stadium" },
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
