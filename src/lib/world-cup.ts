import { allHexagrams, type Hexagram } from "@/data/hexagrams";
import { type WCMatch, MATCHES } from "@/data/world-cup-2026";

function hashMatch(match: WCMatch): number {
  const seed = `${match.date}|${match.home}|${match.away}|${match.id}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % 64;
}

export interface MatchPrediction {
  match: WCMatch;
  hexagram: Hexagram;
  footballInterpretation: string;
}

const FOOTBALL_THEMES: Record<number, string> = {
  1: "Pure yang energy — the attacking side will dominate. Expect bold, aggressive play and a clear winner.",
  2: "The receptive force favours the defensive underdog. Patience and discipline will frustrate a stronger opponent.",
  3: "A chaotic start with early struggles. The team that adapts fastest after kick-off takes control.",
  4: "Youthful energy meets experience. The side with nothing to lose may surprise — beware the underdog.",
  5: "A waiting game. Don't expect early fireworks — the decisive moment comes in the second half.",
  6: "Tension and confrontation. A physical, hard-fought battle with cards likely. Composure wins it.",
  7: "Discipline and organization carry the day. The better-drilled side advances — set pieces could decide.",
  8: "Unity and chemistry make the difference. The team that plays as one will outlast individual brilliance.",
  9: "Small margins. A single goal, a moment of luck, a referee decision — this one is razor-thin.",
  10: "Walk carefully. Defensive errors will be punished. The side that makes fewer mistakes advances.",
  11: "Harmony and flow. A beautiful, free-flowing match where both sides create chances. Attack wins.",
  12: "Stagnation and stalemate. A frustrating deadlock — extra time or penalties may be needed.",
  13: "Fellowship and teamwork. The collective spirit outshines any star player. Trust the system.",
  14: "Great possession. The team that controls the ball controls the match. Dominate the midfield.",
  15: "Modesty brings success. The humble, hardworking side will be rewarded. No room for arrogance.",
  16: "Enthusiasm and momentum. An electric atmosphere favours the passionate team. Ride the energy.",
  17: "Following the flow. Adapt to the match rhythm — the side that adjusts tactics mid-game prevails.",
  18: "Correcting past mistakes. A team with something to prove will find extra reserves of strength.",
  19: "Approach with confidence. A strong start sets the tone — the first goal is decisive.",
  20: "Contemplation before action. A tactical chess match — the smarter manager wins from the sideline.",
  21: "Biting through obstacles. Grit and determination overcome flair. A gritty, hard-earned victory.",
  22: "Grace under pressure. Elegant football wins hearts — but does it win matches? Style meets substance.",
  23: "Things fall apart. A favourite may crumble under pressure. The crumbling defense decides it.",
  24: "The return. Comeback energy — a team that concedes first may roar back stronger.",
  25: "Innocence and instinct. Play without overthinking. Natural talent beats tactical rigidity.",
  26: "Great accumulation. A powerhouse performance — the stronger side shows its class decisively.",
  27: "Nourishment. Midfield control feeds the attack. The team that wins the middle wins the match.",
  28: "Excess and crossing the line. High-scoring affair. Defense optional — expect goals at both ends.",
  29: "Danger and the abyss. A nervy, tense encounter. The team that holds its nerve in key moments wins.",
  30: "Clinging fire. Sustained pressure and relentless attack. A siege that eventually breaks through.",
  31: "Mutual attraction. Two evenly matched sides. A balanced, competitive draw or one-goal difference.",
  32: "Endurance. A marathon, not a sprint. The fitter, more consistent side prevails late.",
  33: "Strategic retreat. Counter-attacking football. The defensive side catches the aggressor on the break.",
  34: "Great power. Physical dominance — aerial duels and set pieces favour the stronger side.",
  35: "Progress and advancement. A team on the rise. Momentum is everything — the in-form side advances.",
  36: "Darkening of the light. A favourite facing unexpected difficulty. Wisdom over brute force needed.",
  37: "The family. Home advantage matters. The team with more supporters in the stands gets a lift.",
  38: "Opposition and polarity. Clash of styles — attack vs defense, possession vs counter. Fascinating duel.",
  39: "Obstruction. A tough, grinding match. The side that handles adversity better scrapes through.",
  40: "Deliverance. Tension released. Late drama and a decisive breakthrough when all seems lost.",
  41: "Decrease. Winning with less possession, fewer shots. Efficiency over volume — clinical finishing.",
  42: "Increase. A team growing into the tournament. Peaking at the right time — watch this side.",
  43: "Breakthrough. A bold, decisive moment changes everything. One play, one goal, one victory.",
  44: "Coming to meet. An unexpected encounter. The wildcard factor — a tactical surprise or shock result.",
  45: "Gathering together. Collective strength. The team that unites under pressure produces a result.",
  46: "Pushing upward. A team on an upward trajectory. Steady progress through the gears.",
  47: "Exhaustion and oppression. A tired, weary performance. The fresher legs win — squad depth matters.",
  48: "The well. Deep reserves of strength. A team drawing on tradition and history finds a way.",
  49: "Revolution and change. A tactical shake-up. The bold substitution or formation change wins it.",
  50: "The cauldron. Transformation. A team reinventing itself mid-tournament finds a winning formula.",
  51: "Shock and thunder. Sudden, explosive moments. A match decided by flashes of brilliance.",
  52: "Stillness. A tactical standstill. Few chances, tight marking — a defensive masterclass or dull draw.",
  53: "Gradual development. Slow build-up, patient probing. The goal comes when least expected.",
  54: "The marrying maiden. A mismatch on paper. The presumed underdog plays without pressure.",
  55: "Abundance and fullness. Goals, drama, entertainment. A World Cup classic in the making.",
  56: "The wanderer. Away from home, no fixed advantage. Neutral ground favours the adaptable side.",
  57: "Gentle penetration. A subtle, intelligent performance. Skill and finesse over brute force.",
  58: "Joy and openness. An open, attacking spectacle. Both teams go for it — entertainment guaranteed.",
  59: "Dispersion and dissolution. A fragmented performance. The more cohesive unit advances.",
  60: "Limitation and measure. A tightly controlled match. Discipline and structure define the outcome.",
  61: "Inner truth. Conviction and belief. The team that truly believes it can win, does.",
  62: "Small exceeding. The underdog's hexagram. A smaller nation punching above its weight.",
  63: "Already fording. Everything in place. The prepared, organized side executes its plan perfectly.",
  64: "Not yet fording. Unfinished business. The match hangs in the balance until the final whistle.",
};

export function predictMatch(match: WCMatch): MatchPrediction {
  const hexagramIndex = hashMatch(match);
  const hexagram = allHexagrams[hexagramIndex];
  const footballInterpretation = FOOTBALL_THEMES[hexagram.id] || "The I Ching offers no clear answer — this match is truly unpredictable.";

  return { match, hexagram, footballInterpretation };
}

export function getDailyPredictions(): MatchPrediction[] {
  const today = new Date().toISOString().slice(0, 10);
  const todayMatches = MATCHES.filter(m => m.date === today);
  return todayMatches.map(predictMatch);
}

export function getUpcomingPredictions(limit?: number): MatchPrediction[] {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = MATCHES.filter(m => m.date >= today && m.home !== "TBD");
  const limited = limit ? upcoming.slice(0, limit) : upcoming;
  return limited.map(predictMatch);
}

const STAGE_NAMES: Record<string, Record<string, string>> = {
  en: { group: "Group Stage", round32: "Round of 32", round16: "Round of 16", quarter: "Quarter-final", semi: "Semi-final", third: "3rd Place", final: "FINAL" },
  ru: { group: "Групповой этап", round32: "1/16 финала", round16: "1/8 финала", quarter: "Четвертьфинал", semi: "Полуфинал", third: "3-е место", final: "ФИНАЛ" },
  ja: { group: "グループステージ", round32: "ラウンド32", round16: "ラウンド16", quarter: "準々決勝", semi: "準決勝", third: "3位決定戦", final: "決勝" },
  ko: { group: "그룹 스테이지", round32: "32강", round16: "16강", quarter: "8강", semi: "준결승", third: "3위 결정전", final: "결승" },
};

export function getStageName(stage: string, locale: string): string {
  return (STAGE_NAMES[locale] || STAGE_NAMES.en)[stage] || stage;
}
