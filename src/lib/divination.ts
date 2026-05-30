// I Ching Divination (算卦) engine
// Based on 《周易》《梅花易数》Plum Blossom Numerology method
import { allHexagrams as hexagrams } from "../data/hexagrams";
import type { DivinationInput, DivinationResult } from "../types";

// Number → trigram (1-indexed)
const NUMBER_TO_TRIGRAM: Record<number, string> = {
  1: "乾", 2: "兑", 3: "离", 4: "震", 5: "巽", 6: "坎", 7: "艮", 8: "坤",
};

export function performDivination(input: DivinationInput, preview = false): DivinationResult {
  const full = _performDivination(input);
  if (!preview) return full;
  return {
    mainHexagram: {
      id: full.mainHexagram.id,
      nameZh: full.mainHexagram.nameZh,
      nameEn: full.mainHexagram.nameEn,
      pinyin: full.mainHexagram.pinyin,
      judgment: full.mainHexagram.judgment,
      judgmentEn: full.mainHexagram.judgmentEn,
      description: full.mainHexagram.description,
      descriptionEn: full.mainHexagram.descriptionEn,
      advice: full.mainHexagram.advice.slice(0, 150) + "... Unlock the full reading with a contribution.",
    },
  };
}

function _performDivination(input: DivinationInput): DivinationResult {
  const { method, numbers } = input;

  let upperNum: number;
  let lowerNum: number;
  let changingNum: number;

  switch (method) {
    case "time": {
      // Time-based divination (梅花易数 classic method)
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hour = now.getHours();

      // Upper trigram: (year + month + day) % 8
      upperNum = ((year + month + day) % 8) || 8;
      // Lower trigram: (year + month + day + hour) % 8
      lowerNum = ((year + month + day + hour) % 8) || 8;
      // Changing line: (year + month + day + hour) % 6
      changingNum = ((year + month + day + hour) % 6) || 6;
      break;
    }
    case "manual": {
      if (!numbers || numbers.length < 3) {
        // Fallback to random
        upperNum = Math.floor(Math.random() * 8) + 1;
        lowerNum = Math.floor(Math.random() * 8) + 1;
        changingNum = Math.floor(Math.random() * 6) + 1;
      } else {
        upperNum = ((numbers[0] % 8) || 8);
        lowerNum = ((numbers[1] % 8) || 8);
        changingNum = ((numbers[2] % 6) || 6);
      }
      break;
    }
    default: {
      // Random method
      upperNum = Math.floor(Math.random() * 8) + 1;
      lowerNum = Math.floor(Math.random() * 8) + 1;
      changingNum = Math.floor(Math.random() * 6) + 1;
    }
  }

  const upperTrigram = NUMBER_TO_TRIGRAM[upperNum];
  const lowerTrigram = NUMBER_TO_TRIGRAM[lowerNum];

  // Find the main hexagram by upper and lower trigrams
  const mainHexagram = findHexagramByTrigrams(upperTrigram, lowerTrigram);

  if (!mainHexagram) {
    // Fallback
    const fallback = hexagrams[0];
    return {
      mainHexagram: {
        id: fallback.id,
        nameZh: fallback.nameZh,
        nameEn: fallback.nameEn,
        pinyin: fallback.pinyin,
        judgment: fallback.judgment,
        judgmentEn: fallback.judgmentEn,
        description: fallback.description,
        descriptionEn: fallback.descriptionEn,
        advice: ADVICE_MAP[fallback.id] || "Take time to reflect. Trust your intuition and proceed with awareness.",
      },
    };
  }

  // Get lines, with fallback to alternating yin/yang
  const lines = mainHexagram.lines.length === 6
    ? mainHexagram.lines
    : Array.from({ length: 6 }, (_, i) => ({
        position: i + 1,
        text: "",
        textEn: "",
        isYang: i % 2 === 0,
      }));

  // Calculate the changed hexagram
  const changingLine = lines[changingNum - 1];
  const isYang = changingLine ? changingLine.isYang : true;
  const newLineValue = !isYang;

  // Build the changed hexagram's trigrams
  let changedUpper = upperTrigram;
  let changedLower = lowerTrigram;

  if (changingNum <= 3) {
    const lowerLines = lines.slice(0, 3).map((l, i) =>
      i + 1 === changingNum ? newLineValue : l.isYang
    );
    changedLower = trigramFromLines(lowerLines);
  } else {
    const upperLines = lines.slice(3, 6).map((l, i) =>
      i + 4 === changingNum ? newLineValue : l.isYang
    );
    changedUpper = trigramFromLines(upperLines);
  }

  const changedHexagram = findHexagramByTrigrams(changedUpper, changedLower);

  // Calculate mutual hexagram (互卦)
  const mutualLowerLines = [lines[1].isYang, lines[2].isYang, lines[3].isYang];
  const mutualUpperLines = [lines[2].isYang, lines[3].isYang, lines[4].isYang];
  const mutualLower = trigramFromLines(mutualLowerLines);
  const mutualUpper = trigramFromLines(mutualUpperLines);
  const mutualHexagram = findHexagramByTrigrams(mutualUpper, mutualLower);

  const question = input.question || "";
  const advice = getAdvice(mainHexagram.id, changedHexagram, changingNum, changingLine, question);

  const result: DivinationResult = {
    mainHexagram: {
      id: mainHexagram.id,
      nameZh: mainHexagram.nameZh,
      nameEn: mainHexagram.nameEn,
      pinyin: mainHexagram.pinyin,
      judgment: mainHexagram.judgment,
      judgmentEn: mainHexagram.judgmentEn,
      description: mainHexagram.description,
      descriptionEn: mainHexagram.descriptionEn,
      advice,
    },
  };

  if (changedHexagram && changedHexagram.id !== mainHexagram.id) {
    result.changedHexagram = {
      id: changedHexagram.id,
      nameZh: changedHexagram.nameZh,
      nameEn: changedHexagram.nameEn,
      pinyin: changedHexagram.pinyin,
      judgment: changedHexagram.judgment,
      judgmentEn: changedHexagram.judgmentEn,
      description: changedHexagram.description,
      descriptionEn: changedHexagram.descriptionEn,
    };
  }

  if (mutualHexagram) {
    result.mutualHexagram = {
      id: mutualHexagram.id,
      nameZh: mutualHexagram.nameZh,
      nameEn: mutualHexagram.nameEn,
      pinyin: mutualHexagram.pinyin,
    };
  }

  if (changingLine) {
    result.changingLine = {
      position: changingNum,
      text: changingLine.text,
      textEn: changingLine.textEn,
    };
  }

  return result;
}

// Detect the topic from the user's question using keyword matching
function detectTopic(question: string): { topic: string; isYesNo: boolean } {
  if (!question || question.trim().length === 0) {
    return { topic: "", isYesNo: false };
  }

  const q = question.toLowerCase();
  const isYesNo = /\b(should|could|would|will|shall|can|do|does|is it|are there|am i)\b/.test(q) ||
    /\?$/.test(q.trim());

  const patterns: [string, RegExp, string][] = [
    ["love", /\b(love|romance|dating|boyfriend|girlfriend|marriage|married|wedding|husband|wife|partner|ex\b|break ?up|divorce|crush|relationship|single)\b/i, "your love life and relationships"],
    ["career", /\b(career|job|work|promotion|salary|boss|colleague|interview|hire|fired|quit|resign|office|business|startup|company|profession)\b/i, "your career and work life"],
    ["money", /\b(money|finance|invest|saving|debt|loan|buy|sell|purchase|income|wealth|rich|poor|financial|stock|crypto|budget)\b/i, "your finances and money matters"],
    ["health", /\b(health|sick|illness|disease|pain|doctor|hospital|symptom|recover|heal|wellness|diet|exercise|mental|anxiety|stress|depress)\b/i, "your health and well-being"],
    ["decision", /\b(decide|decision|choice|option|choose|path|direction|which|whether|either|or\b|should i)\b/i, "a decision you need to make"],
    ["family", /\b(family|parent|mother|father|son|daughter|child|kid|brother|sister|relative|cousin|home)\b/i, "your family and home life"],
    ["travel", /\b(travel|trip|move|relocate|abroad|overseas|journey|flight|vacation|holiday)\b/i, "travel or relocation plans"],
    ["study", /\b(study|school|college|university|exam|test|learn|education|degree|student|course|class|teacher)\b/i, "your studies and education"],
  ];

  for (const [, regex, label] of patterns) {
    if (regex.test(q)) {
      return { topic: label, isYesNo };
    }
  }

  return { topic: "your current situation", isYesNo };
}

// Outcome tone based on hexagram nature
function getOutcome(hexId: number): "favorable" | "mixed" | "challenging" {
  if ([1, 11, 14, 16, 24, 35, 42, 45, 46, 55, 58].includes(hexId)) return "favorable";
  if ([3, 4, 12, 23, 29, 36, 39, 44, 47, 54].includes(hexId)) return "challenging";
  return "mixed";
}

// Practical, question-aware advice with a conclusive verdict
function getAdvice(
  mainId: number,
  changed: { id: number; nameEn: string; judgmentEn: string } | null | undefined,
  linePos: number,
  line: { textEn: string } | undefined,
  question: string,
): string {
  const { topic, isYesNo } = detectTopic(question);
  const base = ADVICE_MAP[mainId] || "Take time to reflect on your situation. Trust your intuition and proceed with awareness.";
  const outcome = getOutcome(mainId);
  const changedOutcome = changed ? getOutcome(changed.id) : null;

  // Verdict label
  const verdictLabel = outcome === "favorable" ? "Verdict: Auspicious 吉" : outcome === "challenging" ? "Verdict: Caution 凶" : "Verdict: Neutral 平";
  const verdictEmoji = outcome === "favorable" ? "☀️" : outcome === "challenging" ? "⚠️" : "⚖️";

  const parts: string[] = [];

  // 1. Opening sentence — include the user's question
  const hasQuestion = question && question.trim().length > 0;
  if (hasQuestion) {
    parts.push(`You asked: "${question.trim()}"`);
  } else if (topic) {
    parts.push(`Regarding ${topic}:`);
  }

  // 2. The core verdict (conclusive statement)
  parts.push(`${verdictEmoji} ${verdictLabel} — ${base}`);

  // 3. Yes/no answer if detected
  if (isYesNo) {
    if (outcome === "favorable") {
      parts.push("The answer is YES. The circumstances align in your favor — proceed with confidence.");
    } else if (outcome === "challenging") {
      parts.push("The answer is NO, or at least not now. The timing is wrong. Wait, prepare more, or reconsider your approach.");
    } else {
      parts.push("There is no simple yes or no here. Success depends entirely on your attitude and actions. Be thoughtful and adaptive.");
    }
  }

  // 4. Changing line insight
  if (line && line.textEn && line.textEn.length > 5) {
    parts.push(`The changing line (line ${linePos}) reveals: ${line.textEn}`);
  }

  // 5. Evolution direction
  if (changed && changed.id !== mainId) {
    const direction = changedOutcome === "favorable" ? "improving toward a favorable outcome" : changedOutcome === "challenging" ? "shifting into rougher terrain" : "evolving in a way that depends on you";
    parts.push(`The situation is ${direction}: "${changed.nameEn}". ${changed.judgmentEn}`);
  }

  // 6. Conclusive takeaway sentence
  if (outcome === "favorable") {
    parts.push("In conclusion: this reading is favorable. Take action while the energy supports you.");
  } else if (outcome === "challenging") {
    parts.push("In conclusion: this reading urges restraint. The wisest move is patience — not every battle must be fought now.");
  } else {
    parts.push("In conclusion: the outcome is in your hands. There is no fixed destiny here — your choices will shape the result.");
  }

  return parts.join(" ");
}

const ADVICE_MAP: Record<number, string> = {
  1: "This is a time for bold, decisive action. Take the initiative now — launch that project, make the first move, step into leadership. Your momentum will be rewarded.",
  2: "The yielding, receptive approach wins here. Let others lead while you support and nurture. Patience and quiet strength will achieve more than pushing forward.",
  3: "Initial chaos and confusion are inevitable at this stage. Don't try to solve everything at once — seek guidance, take small steps, and persist through the difficulty. Things will settle.",
  4: "You lack the experience to proceed alone. Ask for help sincerely, but don't demand it. A teacher or mentor will appear when you show genuine willingness to learn.",
  5: "The timing is not yet right. Waiting is the correct strategy — use this period to prepare, gather resources, and strengthen your position. Forcing things now will backfire.",
  6: "A conflict is brewing. The best outcome comes from compromise and de-escalation, not from winning. Seek middle ground before positions harden. Litigation brings loss to both sides.",
  7: "Discipline, organization, and strong ethical leadership are what the situation demands. Rally your team, clarify roles, and act with clear purpose. Decisive order must be established.",
  8: "Unite with like-minded people. This is a time to build community and find where you truly belong. The right alliances will bring strength — choose your affiliations carefully.",
  9: "Small obstacles are slowing you but won't stop you. Gentle persistence wins here, not brute force. Refine your approach and keep moving — the restraints are temporary.",
  10: "You are treading on thin ice. The situation is delicate but survivable if you follow protocol and act correctly. Mind your manners and even risky circumstances will resolve safely.",
  11: "Harmony and prosperity are flowing freely. This is an excellent time for collaboration, celebration, and bringing people together. Seize the positive momentum — it strongly favors you.",
  12: "Progress is blocked and will remain so for now. Stop forcing it. Withdraw, protect your integrity, and use this stagnation for inner work. The standstill is temporary.",
  13: "Success requires looking beyond your immediate circle. Collaborate widely with people outside your usual group. Shared purpose will unlock what you cannot reach alone.",
  14: "You hold abundance and advantage. The right course is to share generously and use resources wisely. True prosperity deepens through giving, not hoarding.",
  15: "Modesty, even when you have much to be proud of, will bring lasting success. Humility opens doors that self-promotion cannot. Let your results speak — they are strong enough.",
  16: "Enthusiasm is your engine now — channel it into productive action and others will follow. But keep one foot on the ground; passion alone can mislead without planning.",
  17: "Adapt rather than resist. The circumstances are changing and flexibility will serve you far better than stubbornness. Follow the natural flow and you'll find your way through.",
  18: "Something has been neglected and must be fixed. Stop avoiding it — roll up your sleeves and do the repair work. Prepare carefully, then act. The problem is solvable.",
  19: "Good developments are approaching. Stay open and welcoming, but remain discerning — not every opportunity that glitters is gold. The overall direction is positive.",
  20: "Before acting, step back and observe deeply. Study the whole picture. The right course will become clear through patient contemplation, not hasty judgment. Clarity is coming.",
  21: "An obstacle must be decisively removed. Be direct and firm — bite through the problem. Justice and clarity are on your side. Swift action resolves what delay would worsen.",
  22: "Form must follow substance. A polished exterior is fine, but what's genuine matters far more than what's pretty. Focus on inner quality rather than outer appearance.",
  23: "Things are crumbling — let them fall. This collapse clears the ground for something new. Protect only your core values and wait for the natural cycle to turn upward again.",
  24: "Light returns after darkness. This is a genuine turning point — take the first small step now. Energy is renewing, fresh starts are favored. Recovery is real and beginning.",
  25: "Act with pure, simple intentions and you cannot go wrong. Avoid clever schemes. Unexpected events may come, but sincerity navigates them. The honest path is the safe path.",
  26: "Build up your inner resources before making your move. This is preparation time — study, train, accumulate strength. Your power is growing. When it's time, you'll be ready.",
  27: "Pay close attention to what nourishes you — physically, mentally, and spiritually. Good inputs produce good outcomes. Choose your sustenance wisely and health follows.",
  28: "The situation is under extreme pressure and the usual approach will fail. A bold, unconventional move is required. The unexpected action is the right one — don't be afraid.",
  29: "You are in deep and dangerous waters. Don't panic — stay centered and flow around obstacles. This is a test of inner calm. Keep moving forward steadily and you will pass through.",
  30: "Clarity and illumination guide you now. Attach yourself to what is true and bright. Your inner light can guide others too, but you must stay fueled. Seek what illuminates.",
  31: "A genuine connection is forming — be receptive rather than aggressive. Gentle attraction builds stronger bonds than forceful pursuit. Let things develop naturally between you.",
  32: "Commit for the long term. Endurance in relationships and projects brings lasting rewards. Consistency over time beats short bursts of intensity. Stay the course.",
  33: "A strategic retreat is the wisest move right now. Step back from a disadvantageous position to preserve your strength. This withdrawal is temporary — you will return stronger.",
  34: "You wield great power at this moment. Wield it with restraint and only for worthy causes. Force without justice will ultimately destroy itself. Great strength demands great care.",
  35: "Steady, bright progress — like the sun rising. Keep advancing with warmth and integrity. Recognition and reward are coming. Stay grounded as your visibility grows.",
  36: "Your light is being suppressed — this is a dark time. Keep your inner fire alive but don't display it openly yet. Protect yourself, stay cautious, and wait for the darkness to pass.",
  37: "The foundation of everything is harmony at home. Focus on your closest relationships and inner circle. When the family is in order, all else follows naturally.",
  38: "You and another see things in fundamentally different ways. Don't force agreement — small points of connection can bridge big divides. Peaceful coexistence beats total victory.",
  39: "You have hit a real obstacle. Stop pushing forward — turn back and find another route. Seek a wiser perspective. The direct path is blocked for good reason.",
  40: "A problem is finally resolving. Release old grudges and move forward lightly. Liberation is here — focus on the new possibilities, not on what went wrong before.",
  41: "Less is genuinely more right now. Trim excess — expenses, commitments, habits. This simplification may feel like loss but is actually strengthening. What remains will be solid.",
  42: "A time of genuine growth and increase. Seize opportunities boldly. When abundance flows in, share it generously — the flow will return to you multiplied. Expansion is favored.",
  43: "A clean break is necessary. Make it decisively but without aggression — state your truth clearly and act firmly. The separation, though difficult, is the right course.",
  44: "An unexpected encounter — a person or idea — is arriving. It may seem powerfully attractive, but be cautious. Don't rush into a deep bond without honestly assessing the longer-term consequences.",
  45: "Gather people around a shared purpose — there is great power in unity. Whether formal or casual, bringing the right people together around a common goal creates unstoppable momentum.",
  46: "Steady, patient growth upward — like a tree. Each small step builds on the last. Don't rush and don't stop. You will reach heights you cannot yet imagine.",
  47: "You feel trapped and exhausted — this is real, but temporary. When words fail, rely on inner strength. Focus only on what you can control: your own response. The confinement will ease.",
  48: "Some things are constant and nourishing like a village well. Tend to the fundamentals — they don't change even when everything else does. What is deeply true endures.",
  49: "Real, fundamental change is called for — not surface tweaks. Wait for the right moment, then act with conviction. People will support the transformation once they see it is necessary.",
  50: "A profound transformation is underway — raw ingredients becoming something nourishing. Trust the process. What you are building can sustain and inspire many people.",
  51: "A shock arrives — it's a wake-up call, not a catastrophe. After the initial jolt, examine what needs to change and set things right. The disruption ultimately serves your growth.",
  52: "Stop everything. Be still. Your mind and body genuinely need rest now. True peace comes from within, not from rearranging external circumstances. Meditation and quiet are your medicine.",
  53: "Progress is happening, just slowly — like a courtship leading steadily to marriage. Be patient with the gradual pace. Steady, measured development brings lasting, trustworthy results.",
  54: "A partnership or arrangement is on unequal footing. Be very careful about entering commitments where your position is weaker. Impulsive unions often bring lasting trouble.",
  55: "You are at a peak moment of abundance and clarity. Enjoy it fully, but know that all peaks pass. Savor this brilliance without clinging — it naturally gives way to the next phase.",
  56: "You are in unfamiliar territory — literally or figuratively. Be adaptable, unassuming, and careful. As a guest in new circumstances, humility and awareness open the right doors.",
  57: "Gentle, persistent influence achieves what force cannot. Like wind shaping stone over time, small consistent efforts create profound change. Penetrate softly and steadily.",
  58: "Joy and open communication are your path now. Share happiness, engage in good conversations, let warmth draw people in. This is a genuinely social, uplifted period.",
  59: "What was frozen or stuck is dissolving. Old rigidities are melting. Use this flowing energy to reconnect — with people, with projects, with parts of yourself you've been separated from.",
  60: "Set healthy boundaries and live by them. Structure and discipline bring genuine freedom — but don't be harsh. The sweet spot is firm but not rigid. Limits create space.",
  61: "Inner sincerity has real power to move others, even skeptics. Speak from the heart. Genuine truth, simply expressed, reaches further than the most clever argument.",
  62: "Keep things small and modest. This is not the season for grand gestures — small acts of kindness and precise attention to detail matter most right now. Humility wins.",
  63: "You have reached a genuine completion — things are in good order. Enjoy this achievement. But stay watchful: completion always leads to new beginnings, and order can slip.",
  64: "You are almost at the finish line — but not quite. Don't rush the final stretch. Careful, deliberate progress across these last steps will bring true completion rather than near-success.",
};

function findHexagramByTrigrams(upper: string, lower: string) {
  return hexagrams.find(
    h => h.upperTrigram === upper && h.lowerTrigram === lower
  ) || null;
}

// Convert three yin/yang lines to a trigram
function trigramFromLines(lines: boolean[]): string {
  // Lines are bottom to top: line[0] = bottom, line[2] = top
  // ☰ 乾 (Heaven)    = ☰ (three yang)
  // ☱ 兑 (Lake)      = ☱ (yang, yang, yin from top)
  // ☲ 离 (Fire)      = ☲ (yang, yin, yang)
  // ☳ 震 (Thunder)   = ☳ (yin, yin, yang)
  // ☴ 巽 (Wind)      = ☴ (yang, yang, yin)
  // ☵ 坎 (Water)     = ☵ (yin, yang, yin)
  // ☶ 艮 (Mountain)  = ☶ (yin, yang, yang)
  // ☷ 坤 (Earth)     = ☷ (three yin)

  if (lines.length < 3) return "坤";

  const [bottom, middle, top] = lines;

  if (top && middle && bottom) return "乾";     // ☰
  if (!top && middle && bottom) return "兑";     // ☱
  if (top && !middle && bottom) return "离";     // ☲
  if (!top && !middle && bottom) return "震";    // ☳
  if (top && middle && !bottom) return "巽";     // ☴
  if (!top && middle && !bottom) return "坎";    // ☵
  if (top && !middle && !bottom) return "艮";    // ☶
  return "坤";                                   // ☷
}
