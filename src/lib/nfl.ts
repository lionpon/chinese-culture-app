import { allHexagrams, type Hexagram } from "@/data/hexagrams";
import { type NFLMatch } from "@/data/nfl-2026";

function hashMatch(match: NFLMatch): number {
  const seed = `${match.date}|${match.home}|${match.away}|${match.id}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % 64;
}

export type Prediction = "home" | "away";

export function predictWinner(hexagramId: number): Prediction {
  // NFL 无平局分支：奇 → home，偶 → away
  return hexagramId % 2 === 1 ? "home" : "away";
}

export interface MatchPrediction {
  match: NFLMatch;
  hexagram: Hexagram;
  footballInterpretation: string;
  prediction: Prediction;
  correct?: boolean;
}

export interface AccuracyStats {
  total: number;
  correct: number;
  percentage: number;
  byPrediction: Record<Prediction, { total: number; correct: number }>;
}

export function getAccuracyStats(matches: NFLMatch[]): AccuracyStats {
  const today = new Date().toISOString().slice(0, 10);
  const playedMatches = matches.filter((m) => m.result && m.date <= today);
  const predictions = playedMatches.map(predictMatch);

  let correct = 0;
  const byPrediction: AccuracyStats["byPrediction"] = {
    home: { total: 0, correct: 0 },
    away: { total: 0, correct: 0 },
  };

  for (const p of predictions) {
    const actual = p.match.result!;
    // 常规赛偶有平局（OT tie）：home/away 预测均算未中
    let actualOutcome: Prediction | "draw" = "draw";
    if (actual.home > actual.away) actualOutcome = "home";
    else if (actual.away > actual.home) actualOutcome = "away";

    byPrediction[p.prediction].total++;
    if (p.prediction === actualOutcome) {
      byPrediction[p.prediction].correct++;
      correct++;
    }
  }

  return {
    total: predictions.length,
    correct,
    percentage: predictions.length > 0 ? Math.round((correct / predictions.length) * 100) : 0,
    byPrediction,
  };
}

// 64 卦 NFL 语汇文案（不沿用足球 goal/set pieces 语汇）
const NFL_THEMES: Record<number, string> = {
  1: "Pure yang energy — the offense will impose its will. Expect a dominant ground game and an early lead that never shrinks.",
  2: "The receptive force favors the disciplined underdog. Bend-don't-break defense will frustrate a favored opponent all four quarters.",
  3: "A chaotic start with early struggles. The team that adjusts fastest after the opening drive takes control of the game.",
  4: "Youthful energy meets experience. The side with nothing to lose may surprise — beware the overlooked underdog in the fourth quarter.",
  5: "A waiting game. Don't expect early fireworks — the decisive sequence comes after the two-minute warning.",
  6: "Tension and confrontation. A physical, hard-fought battle with penalties likely. Composure in the trenches wins it.",
  7: "Discipline and organization carry the day. The better-drilled unit advances — special teams could decide this one.",
  8: "Unity and chemistry make the difference. The team that plays as one outlasts individual brilliance.",
  9: "Small margins. One turnover, one red-zone stop, one referee call — this one is razor-thin.",
  10: "Walk carefully. Costly mistakes will be punished. The team that protects the football advances.",
  11: "Harmony and flow. A beautiful, free-flowing game where both offenses move the ball. The sharper attack wins.",
  12: "Stagnation and stalemate. A frustrating deadlock — field-position chess, possibly overtime.",
  13: "Fellowship and teamwork. The collective spirit outshines any star player. Trust the system over the superstar.",
  14: "Great possession. The team that controls the clock controls the game. Dominate time of possession.",
  15: "Modesty brings success. The humble, hardworking team will be rewarded. No room for arrogance.",
  16: "Enthusiasm and momentum. An electric atmosphere favors the passionate team. Ride the crowd's energy.",
  17: "Following the flow. Adapt to the game's rhythm — the side that adjusts its game plan at halftime prevails.",
  18: "Correcting past mistakes. A team with something to prove finds extra reserves of strength.",
  19: "Approach with confidence. A strong start sets the tone — the first touchdown is decisive.",
  20: "Contemplation before action. A tactical chess match — the smarter play-caller wins from the booth.",
  21: "Biting through obstacles. Grit and determination overcome flair. A gritty, hard-earned victory.",
  22: "Grace under pressure. Elegant offense wins highlight reels — but does it win games? Style meets substance.",
  23: "Things fall apart. A favorite may crumble under pressure. The crumbling offensive line decides it.",
  24: "The return. Comeback energy — a team that falls behind early may roar back after halftime.",
  25: "Innocence and instinct. Play without overthinking. Natural talent beats rigid scheme.",
  26: "Great accumulation. A powerhouse performance — the stronger side shows its class decisively.",
  27: "Nourishment. Line play feeds the offense. The team that wins the line of scrimmage wins the game.",
  28: "Excess and crossing the line. A shootout. Defense optional — expect points from both sides.",
  29: "Danger and the abyss. A nervy, tense encounter. The team that holds its nerve on fourth down wins.",
  30: "Clinging fire. Sustained pressure and relentless blitzing. A siege that eventually breaks through.",
  31: "Mutual attraction. Two evenly matched sides. A balanced, competitive duel decided by one possession.",
  32: "Endurance. A marathon, not a sprint. The deeper, more consistent roster prevails late.",
  33: "Strategic retreat. Prevent defense and the counterattack. The defensive side catches the aggressor on the break.",
  34: "Great power. Physical dominance — short-yardage situations and goal-line stands favor the stronger side.",
  35: "Progress and advancement. A team on the rise. Momentum is everything — the in-form side advances.",
  36: "Darkening of the light. A favorite facing unexpected difficulty. Wisdom over brute force needed.",
  37: "The family. Home-field advantage matters. The crowd in the stands gives the home team a lift.",
  38: "Opposition and polarity. Clash of styles — offense vs defense, run vs pass. A fascinating duel.",
  39: "Obstruction. A tough, grinding game. The side that handles adversity better scrapes through.",
  40: "Deliverance. Tension released. Late drama and a decisive drive when all seems lost.",
  41: "Decrease. Winning with fewer yards, fewer possessions. Efficiency over volume — clinical red-zone finishing.",
  42: "Increase. A team growing into the season. Peaking at the right time — watch this side.",
  43: "Breakthrough. A bold, decisive moment changes everything. One play, one pick-six, one victory.",
  44: "Coming to meet. An unexpected encounter. The wildcard factor — a trick play or shock upset.",
  45: "Gathering together. Collective strength. The team that unites under pressure produces a result.",
  46: "Pushing upward. A team on an upward trajectory. Steady progress through the gears.",
  47: "Exhaustion and oppression. A tired, weary performance. The fresher legs win — roster depth matters.",
  48: "The well. Deep reserves of strength. A team drawing on tradition and history finds a way.",
  49: "Revolution and change. A scheme shake-up. The bold quarterback change or halftime adjustment wins it.",
  50: "The cauldron. Transformation. A team reinventing itself mid-season finds a winning formula.",
  51: "Shock and thunder. Sudden, explosive plays. A game decided by deep shots and kick returns.",
  52: "Stillness. A tactical standstill. Few big plays, tight coverage — a defensive masterclass or a low-scoring grind.",
  53: "Gradual development. Slow build-up, patient probing. The scoring drive comes when least expected.",
  54: "The marrying maiden. A mismatch on paper. The presumed underdog plays without pressure.",
  55: "Abundance and fullness. Points, drama, entertainment. An instant classic in the making.",
  56: "The wanderer. No fixed advantage on neutral ground. The adaptable, road-tested side wins.",
  57: "Gentle penetration. A subtle, intelligent performance. Precision passing over brute force.",
  58: "Joy and openness. An open, attacking spectacle. Both offenses go for it — entertainment guaranteed.",
  59: "Dispersion and dissolution. A fragmented performance. The more cohesive unit advances.",
  60: "Limitation and measure. A tightly controlled game. Discipline and clock management define the outcome.",
  61: "Inner truth. Conviction and belief. The team that truly believes it can win, does.",
  62: "Small exceeding. The underdog's hexagram. A smaller-market team punching above its weight.",
  63: "Already fording. Everything in place. The prepared, organized side executes its game plan perfectly.",
  64: "Not yet fording. Unfinished business. The game hangs in the balance until the final whistle.",
};

export function predictMatch(match: NFLMatch): MatchPrediction {
  const hexagramIndex = hashMatch(match);
  const hexagram = allHexagrams[hexagramIndex];
  const footballInterpretation = NFL_THEMES[hexagram.id] || "The I Ching offers no clear answer — this game is truly unpredictable.";
  const prediction = predictWinner(hexagram.id);

  let correct: boolean | undefined;
  if (match.result) {
    const r = match.result;
    let actual: Prediction | "draw" = "draw";
    if (r.home > r.away) actual = "home";
    else if (r.away > r.home) actual = "away";
    correct = prediction === actual;
  }

  return { match, hexagram, footballInterpretation, prediction, correct };
}

export function getWeekPredictions(week: number, matches: NFLMatch[]): MatchPrediction[] {
  return matches.filter((m) => m.week === week).map(predictMatch);
}
