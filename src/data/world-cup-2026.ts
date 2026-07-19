export interface WCMatch {
  id: string;
  date: string;       // "2026-06-11"
  home: string;
  away: string;
  group: string;      // "A".."L" | "R32" | "R16" | "QF" | "SF" | "3RD" | "FINAL"
  venue: string;
  stage: "group" | "round32" | "round16" | "quarter" | "semi" | "third" | "final";
  result?: { home: number; away: number };
}

export interface WCGroup {
  name: string;
  teams: string[];
}

export const GROUPS: WCGroup[] = [
  { name: "A", teams: ["Mexico", "South Africa", "Korea Republic", "Czechia"] },
  { name: "B", teams: ["Canada", "Bosnia & Herzegovina", "Switzerland", "Qatar"] },
  { name: "C", teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  { name: "D", teams: ["USA", "Paraguay", "Türkiye", "Australia"] },
  { name: "E", teams: ["Germany", "Curaçao", "Côte d'Ivoire", "Ecuador"] },
  { name: "F", teams: ["Netherlands", "Japan", "Sweden", "Tunisia"] },
  { name: "G", teams: ["Belgium", "Egypt", "IR Iran", "New Zealand"] },
  { name: "H", teams: ["Spain", "Cabo Verde", "Saudi Arabia", "Uruguay"] },
  { name: "I", teams: ["France", "Senegal", "Iraq", "Norway"] },
  { name: "J", teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  { name: "K", teams: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"] },
  { name: "L", teams: ["England", "Croatia", "Ghana", "Panama"] },
];

export const MATCHES: WCMatch[] = [
  // ===== June 11 =====
  { id: "A1", date: "2026-06-11", home: "Mexico", away: "South Africa", group: "A", venue: "Mexico City", stage: "group", result: { home: 2, away: 0 } },
  { id: "A2", date: "2026-06-11", home: "Korea Republic", away: "Czechia", group: "A", venue: "Guadalajara", stage: "group", result: { home: 2, away: 1 } },

  // ===== June 12 =====
  { id: "B1", date: "2026-06-12", home: "Canada", away: "Bosnia & Herzegovina", group: "B", venue: "Toronto", stage: "group", result: { home: 1, away: 1 } },
  { id: "D1", date: "2026-06-12", home: "USA", away: "Paraguay", group: "D", venue: "Los Angeles", stage: "group", result: { home: 4, away: 1 } },

  // ===== June 13 =====
  { id: "C1", date: "2026-06-13", home: "Haiti", away: "Scotland", group: "C", venue: "Boston", stage: "group", result: { home: 0, away: 1 } },
  { id: "D2", date: "2026-06-13", home: "Australia", away: "Türkiye", group: "D", venue: "Vancouver", stage: "group", result: { home: 2, away: 0 } },
  { id: "C2", date: "2026-06-13", home: "Brazil", away: "Morocco", group: "C", venue: "New York/New Jersey", stage: "group", result: { home: 1, away: 1 } },
  { id: "B2", date: "2026-06-13", home: "Qatar", away: "Switzerland", group: "B", venue: "San Francisco Bay Area", stage: "group", result: { home: 1, away: 1 } },

  // ===== June 14 =====
  { id: "E1", date: "2026-06-14", home: "Côte d'Ivoire", away: "Ecuador", group: "E", venue: "Philadelphia", stage: "group", result: { home: 1, away: 0 } },
  { id: "E2", date: "2026-06-14", home: "Germany", away: "Curaçao", group: "E", venue: "Houston", stage: "group", result: { home: 7, away: 1 } },
  { id: "F1", date: "2026-06-14", home: "Netherlands", away: "Japan", group: "F", venue: "Dallas", stage: "group", result: { home: 2, away: 2 } },
  { id: "F2", date: "2026-06-14", home: "Sweden", away: "Tunisia", group: "F", venue: "Monterrey", stage: "group", result: { home: 5, away: 1 } },

  // ===== June 15 =====
  { id: "H1", date: "2026-06-15", home: "Saudi Arabia", away: "Uruguay", group: "H", venue: "Miami", stage: "group", result: { home: 1, away: 1 } },
  { id: "H2", date: "2026-06-15", home: "Spain", away: "Cabo Verde", group: "H", venue: "Atlanta", stage: "group", result: { home: 0, away: 0 } },
  { id: "G1", date: "2026-06-15", home: "IR Iran", away: "New Zealand", group: "G", venue: "Los Angeles", stage: "group", result: { home: 2, away: 2 } },
  { id: "G2", date: "2026-06-15", home: "Belgium", away: "Egypt", group: "G", venue: "Seattle", stage: "group", result: { home: 1, away: 1 } },

  // ===== June 16 =====
  { id: "I1", date: "2026-06-16", home: "France", away: "Senegal", group: "I", venue: "New York/New Jersey", stage: "group" },
  { id: "I2", date: "2026-06-16", home: "Iraq", away: "Norway", group: "I", venue: "Boston", stage: "group" },
  { id: "J1", date: "2026-06-16", home: "Argentina", away: "Algeria", group: "J", venue: "Kansas City", stage: "group" },
  { id: "J2", date: "2026-06-16", home: "Austria", away: "Jordan", group: "J", venue: "San Francisco Bay Area", stage: "group" },

  // ===== June 17 =====
  { id: "L1", date: "2026-06-17", home: "Ghana", away: "Panama", group: "L", venue: "Toronto", stage: "group" },
  { id: "L2", date: "2026-06-17", home: "England", away: "Croatia", group: "L", venue: "Dallas", stage: "group" },
  { id: "K1", date: "2026-06-17", home: "Portugal", away: "DR Congo", group: "K", venue: "Houston", stage: "group" },
  { id: "K2", date: "2026-06-17", home: "Uzbekistan", away: "Colombia", group: "K", venue: "Mexico City", stage: "group" },

  // ===== June 18 =====
  { id: "A3", date: "2026-06-18", home: "Czechia", away: "South Africa", group: "A", venue: "Atlanta", stage: "group" },
  { id: "B3", date: "2026-06-18", home: "Switzerland", away: "Bosnia & Herzegovina", group: "B", venue: "Los Angeles", stage: "group" },
  { id: "B4", date: "2026-06-18", home: "Canada", away: "Qatar", group: "B", venue: "Vancouver", stage: "group" },
  { id: "A4", date: "2026-06-18", home: "Mexico", away: "Korea Republic", group: "A", venue: "Guadalajara", stage: "group" },

  // ===== June 19 =====
  { id: "C3", date: "2026-06-19", home: "Brazil", away: "Haiti", group: "C", venue: "Philadelphia", stage: "group" },
  { id: "C4", date: "2026-06-19", home: "Scotland", away: "Morocco", group: "C", venue: "Boston", stage: "group" },
  { id: "D3", date: "2026-06-19", home: "Türkiye", away: "Paraguay", group: "D", venue: "San Francisco", stage: "group" },
  { id: "D4", date: "2026-06-19", home: "USA", away: "Australia", group: "D", venue: "Seattle", stage: "group" },

  // ===== June 20 =====
  { id: "E3", date: "2026-06-20", home: "Germany", away: "Côte d'Ivoire", group: "E", venue: "Toronto", stage: "group" },
  { id: "E4", date: "2026-06-20", home: "Ecuador", away: "Curaçao", group: "E", venue: "Kansas City", stage: "group" },
  { id: "F3", date: "2026-06-20", home: "Netherlands", away: "Sweden", group: "F", venue: "Houston", stage: "group" },
  { id: "F4", date: "2026-06-20", home: "Tunisia", away: "Japan", group: "F", venue: "Monterrey", stage: "group" },

  // ===== June 21 =====
  { id: "H3", date: "2026-06-21", home: "Uruguay", away: "Cabo Verde", group: "H", venue: "Miami", stage: "group" },
  { id: "H4", date: "2026-06-21", home: "Spain", away: "Saudi Arabia", group: "H", venue: "Atlanta", stage: "group" },
  { id: "G3", date: "2026-06-21", home: "Belgium", away: "IR Iran", group: "G", venue: "Los Angeles", stage: "group" },
  { id: "G4", date: "2026-06-21", home: "New Zealand", away: "Egypt", group: "G", venue: "Vancouver", stage: "group" },

  // ===== June 22 =====
  { id: "I3", date: "2026-06-22", home: "Norway", away: "Senegal", group: "I", venue: "New York/New Jersey", stage: "group" },
  { id: "I4", date: "2026-06-22", home: "France", away: "Iraq", group: "I", venue: "Philadelphia", stage: "group" },
  { id: "J3", date: "2026-06-22", home: "Argentina", away: "Austria", group: "J", venue: "Dallas", stage: "group" },
  { id: "J4", date: "2026-06-22", home: "Jordan", away: "Algeria", group: "J", venue: "San Francisco Bay Area", stage: "group" },

  // ===== June 23 =====
  { id: "L3", date: "2026-06-23", home: "England", away: "Ghana", group: "L", venue: "Boston", stage: "group" },
  { id: "L4", date: "2026-06-23", home: "Panama", away: "Croatia", group: "L", venue: "Toronto", stage: "group" },
  { id: "K3", date: "2026-06-23", home: "Portugal", away: "Uzbekistan", group: "K", venue: "Houston", stage: "group" },
  { id: "K4", date: "2026-06-23", home: "Colombia", away: "DR Congo", group: "K", venue: "Guadalajara", stage: "group" },

  // ===== June 24 ===== (6 matches)
  { id: "C5", date: "2026-06-24", home: "Scotland", away: "Brazil", group: "C", venue: "Miami", stage: "group" },
  { id: "C6", date: "2026-06-24", home: "Morocco", away: "Haiti", group: "C", venue: "Atlanta", stage: "group" },
  { id: "B5", date: "2026-06-24", home: "Switzerland", away: "Canada", group: "B", venue: "Vancouver", stage: "group" },
  { id: "B6", date: "2026-06-24", home: "Bosnia & Herzegovina", away: "Qatar", group: "B", venue: "Seattle", stage: "group" },
  { id: "A5", date: "2026-06-24", home: "Czechia", away: "Mexico", group: "A", venue: "Mexico City", stage: "group" },
  { id: "A6", date: "2026-06-24", home: "South Africa", away: "Korea Republic", group: "A", venue: "Monterrey", stage: "group" },

  // ===== June 25 ===== (6 matches)
  { id: "E5", date: "2026-06-25", home: "Curaçao", away: "Côte d'Ivoire", group: "E", venue: "Philadelphia", stage: "group" },
  { id: "E6", date: "2026-06-25", home: "Ecuador", away: "Germany", group: "E", venue: "New York/New Jersey", stage: "group" },
  { id: "F5", date: "2026-06-25", home: "Japan", away: "Sweden", group: "F", venue: "Dallas", stage: "group" },
  { id: "F6", date: "2026-06-25", home: "Tunisia", away: "Netherlands", group: "F", venue: "Kansas City", stage: "group" },
  { id: "D5", date: "2026-06-25", home: "Türkiye", away: "USA", group: "D", venue: "Los Angeles", stage: "group" },
  { id: "D6", date: "2026-06-25", home: "Paraguay", away: "Australia", group: "D", venue: "San Francisco", stage: "group" },

  // ===== June 26 ===== (6 matches)
  { id: "I5", date: "2026-06-26", home: "Norway", away: "France", group: "I", venue: "Boston", stage: "group" },
  { id: "I6", date: "2026-06-26", home: "Senegal", away: "Iraq", group: "I", venue: "Toronto", stage: "group" },
  { id: "G5", date: "2026-06-26", home: "Egypt", away: "IR Iran", group: "G", venue: "Seattle", stage: "group" },
  { id: "G6", date: "2026-06-26", home: "New Zealand", away: "Belgium", group: "G", venue: "Vancouver", stage: "group" },
  { id: "H5", date: "2026-06-26", home: "Cabo Verde", away: "Saudi Arabia", group: "H", venue: "Houston", stage: "group" },
  { id: "H6", date: "2026-06-26", home: "Uruguay", away: "Spain", group: "H", venue: "Guadalajara", stage: "group" },

  // ===== June 27 ===== (6 matches)
  { id: "L5", date: "2026-06-27", home: "Panama", away: "England", group: "L", venue: "New York/New Jersey", stage: "group" },
  { id: "L6", date: "2026-06-27", home: "Croatia", away: "Ghana", group: "L", venue: "Philadelphia", stage: "group" },
  { id: "J5", date: "2026-06-27", home: "Algeria", away: "Austria", group: "J", venue: "Kansas City", stage: "group" },
  { id: "J6", date: "2026-06-27", home: "Jordan", away: "Argentina", group: "J", venue: "Dallas", stage: "group" },
  { id: "K5", date: "2026-06-27", home: "Colombia", away: "Portugal", group: "K", venue: "Miami", stage: "group" },
  { id: "K6", date: "2026-06-27", home: "DR Congo", away: "Uzbekistan", group: "K", venue: "Atlanta", stage: "group" },

  // ===== Knockout: Round of 32 (June 29 - July 4) =====
  { id: "R1", date: "2026-06-29", home: "South Africa", away: "Canada", group: "R32", venue: "Los Angeles", stage: "round32", result: { home: 0, away: 1 } },
  { id: "R2", date: "2026-06-30", home: "Brazil", away: "Japan", group: "R32", venue: "Boston", stage: "round32", result: { home: 2, away: 1 } },
  { id: "R3", date: "2026-06-30", home: "Germany", away: "Paraguay", group: "R32", venue: "Monterrey", stage: "round32", result: { home: 4, away: 5 } },
  { id: "R4", date: "2026-06-30", home: "Netherlands", away: "Morocco", group: "R32", venue: "Houston", stage: "round32", result: { home: 3, away: 4 } },
  { id: "R5", date: "2026-07-01", home: "Côte d'Ivoire", away: "Norway", group: "R32", venue: "New York/New Jersey", stage: "round32", result: { home: 1, away: 2 } },
  { id: "R6", date: "2026-07-01", home: "France", away: "Sweden", group: "R32", venue: "Dallas", stage: "round32", result: { home: 3, away: 0 } },
  { id: "R7", date: "2026-07-01", home: "Mexico", away: "Ecuador", group: "R32", venue: "Mexico City", stage: "round32", result: { home: 2, away: 0 } },
  { id: "R8", date: "2026-07-02", home: "England", away: "DR Congo", group: "R32", venue: "Atlanta", stage: "round32", result: { home: 2, away: 1 } },
  { id: "R9", date: "2026-07-02", home: "Belgium", away: "Senegal", group: "R32", venue: "Seattle", stage: "round32", result: { home: 3, away: 2 } },
  { id: "R10", date: "2026-07-02", home: "USA", away: "Bosnia & Herzegovina", group: "R32", venue: "San Francisco", stage: "round32", result: { home: 2, away: 0 } },
  { id: "R11", date: "2026-07-03", home: "Spain", away: "Austria", group: "R32", venue: "Toronto", stage: "round32", result: { home: 3, away: 0 } },
  { id: "R12", date: "2026-07-03", home: "Portugal", away: "Croatia", group: "R32", venue: "Los Angeles", stage: "round32", result: { home: 2, away: 1 } },
  { id: "R13", date: "2026-07-03", home: "Switzerland", away: "Algeria", group: "R32", venue: "Vancouver", stage: "round32", result: { home: 2, away: 0 } },
  { id: "R14", date: "2026-07-04", home: "Australia", away: "Egypt", group: "R32", venue: "Miami", stage: "round32", result: { home: 3, away: 5 } },
  { id: "R15", date: "2026-07-04", home: "Argentina", away: "Cabo Verde", group: "R32", venue: "Kansas City", stage: "round32", result: { home: 3, away: 2 } },
  { id: "R16", date: "2026-07-04", home: "Colombia", away: "Ghana", group: "R32", venue: "Dallas", stage: "round32", result: { home: 1, away: 0 } },

  // ===== Round of 16 (July 5-8) =====
  { id: "16-1", date: "2026-07-05", home: "Canada", away: "Morocco", group: "R16", venue: "Philadelphia", stage: "round16", result: { home: 0, away: 3 } },
  { id: "16-2", date: "2026-07-05", home: "Paraguay", away: "France", group: "R16", venue: "Houston", stage: "round16", result: { home: 0, away: 1 } },
  { id: "16-3", date: "2026-07-06", home: "Brazil", away: "Norway", group: "R16", venue: "New York/New Jersey", stage: "round16", result: { home: 1, away: 2 } },
  { id: "16-4", date: "2026-07-06", home: "Mexico", away: "England", group: "R16", venue: "Mexico City", stage: "round16", result: { home: 2, away: 3 } },
  { id: "16-5", date: "2026-07-07", home: "Portugal", away: "Spain", group: "R16", venue: "Dallas", stage: "round16", result: { home: 0, away: 1 } },
  { id: "16-6", date: "2026-07-07", home: "USA", away: "Belgium", group: "R16", venue: "Seattle", stage: "round16", result: { home: 1, away: 4 } },
  { id: "16-7", date: "2026-07-08", home: "Argentina", away: "Egypt", group: "R16", venue: "Atlanta", stage: "round16", result: { home: 3, away: 2 } },
  { id: "16-8", date: "2026-07-08", home: "Switzerland", away: "Colombia", group: "R16", venue: "Vancouver", stage: "round16", result: { home: 4, away: 3 } },

  // ===== Quarter-finals (July 10-12) =====
  { id: "QF1", date: "2026-07-10", home: "France", away: "Morocco", group: "QF", venue: "Boston", stage: "quarter", result: { home: 2, away: 0 } },
  { id: "QF2", date: "2026-07-11", home: "Spain", away: "Belgium", group: "QF", venue: "Los Angeles", stage: "quarter", result: { home: 2, away: 1 } },
  { id: "QF3", date: "2026-07-12", home: "Norway", away: "England", group: "QF", venue: "Miami", stage: "quarter", result: { home: 1, away: 2 } },
  { id: "QF4", date: "2026-07-12", home: "Argentina", away: "Switzerland", group: "QF", venue: "Kansas City", stage: "quarter", result: { home: 3, away: 1 } },

  // ===== Semi-finals (July 15-16) =====
  { id: "SF1", date: "2026-07-15", home: "France", away: "Spain", group: "SF", venue: "Dallas", stage: "semi", result: { home: 0, away: 2 } },
  { id: "SF2", date: "2026-07-16", home: "England", away: "Argentina", group: "SF", venue: "Atlanta", stage: "semi", result: { home: 1, away: 2 } },

  // ===== Third Place & Final =====
  { id: "3RD", date: "2026-07-18", home: "England", away: "France", group: "3RD", venue: "Miami", stage: "third", result: { home: 6, away: 4 } },
  { id: "FINAL", date: "2026-07-19", home: "Argentina", away: "Spain", group: "FINAL", venue: "New York/New Jersey", stage: "final" },
];

export function getMatchesByDate(date: string): WCMatch[] {
  return MATCHES.filter(m => m.date === date);
}

export function getTodayMatches(): WCMatch[] {
  const today = new Date().toISOString().slice(0, 10);
  return getMatchesByDate(today);
}

export function getUpcomingMatches(limit?: number): WCMatch[] {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = MATCHES.filter(m => m.date >= today && m.home !== "TBD");
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getKnockoutMatches(): WCMatch[] {
  return MATCHES.filter(m => m.stage !== "group");
}
