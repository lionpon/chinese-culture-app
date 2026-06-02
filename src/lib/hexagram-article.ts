// Generates a unique SEO article for each daily hexagram page
import type { DivinationResult } from "@/types";
import { judgmentJa, judgmentRu, descriptionJa, descriptionRu, adviceJa, adviceRu } from "@/data/hexagram-content";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";

const HEXAGRAM_GUIDE: Record<number, { theme: string; lifeAreas: string; practicalTip: string }> = {
  1: { theme: "creativity and initiative", lifeAreas: "career advancement, starting new projects, and taking leadership roles", practicalTip: "Today is ideal for launching initiatives. Write down your top 3 goals and commit to the first step before noon." },
  2: { theme: "receptivity and patience", lifeAreas: "teamwork, supporting others, and letting things unfold naturally", practicalTip: "Practice active listening today. Let others speak first — you'll learn more by receiving than by pushing." },
  3: { theme: "beginnings and overcoming initial chaos", lifeAreas: "new jobs, new relationships, and navigating uncertainty", practicalTip: "Break overwhelming tasks into tiny steps. Even 5 minutes of progress moves you past the initial hurdle." },
  4: { theme: "learning and seeking guidance", lifeAreas: "education, mentorship, and asking the right questions", practicalTip: "Reach out to someone more experienced today. A single well-framed question can save months of trial and error." },
  5: { theme: "patience and waiting for the right moment", lifeAreas: "timing, preparation, and gathering resources", practicalTip: "Use this waiting period to sharpen your skills. Read one chapter, watch one tutorial — small accumulations pay off." },
  6: { theme: "conflict and finding resolution", lifeAreas: "disputes, negotiations, and finding common ground", practicalTip: "Before escalating, ask yourself: what would a compromise that preserves the relationship look like? Seek that first." },
  7: { theme: "discipline and organized action", lifeAreas: "team leadership, military precision, and structured effort", practicalTip: "Create a simple checklist for your most important project. Order brings clarity — clarity brings results." },
  8: { theme: "unity and belonging", lifeAreas: "community, finding your tribe, and shared purpose", practicalTip: "Connect with one like-minded person today. The right alliance multiplies your strength." },
  9: { theme: "small obstacles and gentle persistence", lifeAreas: "minor setbacks, patience with delays, and refining details", practicalTip: "Don't force the big door — look for the small one. A slight course correction often bypasses the obstacle entirely." },
  10: { theme: "treading carefully and proper conduct", lifeAreas: "delicate situations, workplace etiquette, and navigating power dynamics", practicalTip: "Mind your manners today. In sensitive situations, correct behavior is your armor." },
  11: { theme: "harmony and prosperity", lifeAreas: "abundance, collaboration, and celebration", practicalTip: "Share your good fortune today — a compliment, a coffee, a connection. Prosperity deepens through generosity." },
  12: { theme: "stagnation and withdrawal", lifeAreas: "blocked progress, isolation, and inner reflection", practicalTip: "Stop pushing on locked doors. Turn inward: journal, meditate, or take a quiet walk. Clarity comes in stillness." },
  13: { theme: "fellowship and broad collaboration", lifeAreas: "networking, partnerships beyond your circle, and shared goals", practicalTip: "Reach beyond your usual group today. The person you need is outside your existing network." },
  14: { theme: "abundance and stewardship", lifeAreas: "wealth, resources, and wise distribution", practicalTip: "Count your blessings — literally. List 10 things you already have that you're grateful for. Abundance starts with awareness." },
  15: { theme: "modesty and humility", lifeAreas: "self-awareness, quiet confidence, and letting results speak", practicalTip: "Hold back from self-promotion today. Let your work speak — it's louder than any boast." },
  16: { theme: "enthusiasm and motivation", lifeAreas: "inspiration, rallying others, and joyful action", practicalTip: "Channel your excitement into one concrete action today. Enthusiasm without action fades — harness it now." },
  17: { theme: "adaptability and following the flow", lifeAreas: "flexibility, changing plans, and going with circumstances", practicalTip: "If plans change today, don't resist. Ask: what opportunity does this unexpected turn create?" },
  18: { theme: "repairing what is broken", lifeAreas: "fixing relationships, correcting mistakes, and cleanup work", practicalTip: "Name one thing you've been avoiding fixing. Take 10 minutes to start the repair today — momentum is everything." },
  19: { theme: "approaching good fortune", lifeAreas: "opportunity, welcoming change, and staying discerning", practicalTip: "Stay open but not naive. When opportunity knocks, verify before you invite it in." },
  20: { theme: "observation and contemplation", lifeAreas: "reflection, seeing the big picture, and patient awareness", practicalTip: "Before any important decision today, pause and observe for 5 full minutes. The right move will become clear." },
  21: { theme: "decisive action to remove obstacles", lifeAreas: "cutting through problems, justice, and firm resolution", practicalTip: "Identify one obstacle in your life. Address it directly today — polite but firm. Delay only feeds the problem." },
  22: { theme: "form and substance", lifeAreas: "appearance vs reality, aesthetics, and inner quality", practicalTip: "Polish your presentation, but don't forget the foundation. Today, spend equal time on what shows and what's underneath." },
  23: { theme: "collapse and renewal", lifeAreas: "ending cycles, letting go, and natural decline", practicalTip: "Let what's falling, fall. Clear the ground rather than propping up what's already crumbling. New growth needs space." },
  24: { theme: "return and fresh starts", lifeAreas: "recovery, new beginnings, and renewal", practicalTip: "Take one small step toward a fresh start today. The light is returning — don't underestimate a single step." },
  25: { theme: "innocence and sincerity", lifeAreas: "pure intentions, honest action, and simplicity", practicalTip: "Strip away complexity today. Ask: what would I do if I weren't trying to be clever? Do that." },
  26: { theme: "building inner strength", lifeAreas: "preparation, accumulation, and self-cultivation", practicalTip: "Invest in yourself today — read, exercise, learn. Your future power depends on what you accumulate now." },
  27: { theme: "nourishment and self-care", lifeAreas: "health, diet, mental wellness, and sustainable habits", practicalTip: "Audit what you consume today — food, media, company. Good inputs create good outcomes. Cut one toxic input." },
  28: { theme: "extreme pressure and bold action", lifeAreas: "crisis management, unconventional solutions, and breakthrough", practicalTip: "When the usual approach fails, try the opposite. Bold times call for bold moves — calculate the risk, then act." },
  29: { theme: "danger and inner calm", lifeAreas: "crisis, navigating deep water, and emotional resilience", practicalTip: "In chaos, focus on what you can control: your breathing, your next move, your response. Steady wins the deep water." },
  30: { theme: "clarity and illumination", lifeAreas: "insight, wisdom, and guiding others", practicalTip: "Shine your light on one dark corner today — a problem you've been avoiding. Clarity dissolves fear." },
  31: { theme: "attraction and connection", lifeAreas: "romance, friendship, and magnetic relationships", practicalTip: "Don't chase — attract. Be the person you want to meet. Genuine connection grows from authentic presence." },
  32: { theme: "endurance and commitment", lifeAreas: "marriage, long-term projects, and consistency", practicalTip: "Show up again today, even if it's small. The one who endures wins. Consistency beats intensity." },
  33: { theme: "strategic retreat", lifeAreas: "withdrawal, self-preservation, and choosing battles", practicalTip: "Not every hill is worth dying on. Step back from one draining situation today — you'll return with more strength." },
  34: { theme: "great power and restraint", lifeAreas: "authority, influence, and responsible leadership", practicalTip: "You hold more power than you realize. Wield it carefully today — one kind word can change someone's trajectory." },
  35: { theme: "steady progress and recognition", lifeAreas: "career advancement, visibility, and reward", practicalTip: "Keep moving forward steadily. The sun rises one degree at a time — your progress, though gradual, is real." },
  36: { theme: "darkness and protecting your light", lifeAreas: "adversity, hiding strength, and surviving difficulty", practicalTip: "In hostile environments, protect your inner fire. Stay low, stay sharp, and know that darkness always passes." },
  37: { theme: "family and home harmony", lifeAreas: "relationships, household, and inner circle", practicalTip: "Reach out to one family member today. Strong families are built one conversation at a time." },
  38: { theme: "opposition and bridging differences", lifeAreas: "disagreement, diversity, and finding small connections", practicalTip: "You don't need to agree on everything. Find one small point of connection — it can bridge a wide divide." },
  39: { theme: "obstacles and finding another way", lifeAreas: "roadblocks, detours, and seeking wise counsel", practicalTip: "Stop banging on the wall. Turn around, ask for directions, or find the path around. Stubbornness is not strength." },
  40: { theme: "liberation and release", lifeAreas: "letting go, forgiveness, and moving forward", practicalTip: "Forgive one grudge today — not for them, for you. Release the weight. You'll walk lighter immediately." },
  41: { theme: "decrease and simplification", lifeAreas: "minimalism, cutting costs, and essentialism", practicalTip: "Remove one unnecessary thing from your life today — a subscription, a commitment, a worry. Less is truly more." },
  42: { theme: "increase and growth", lifeAreas: "abundance, expansion, and seizing opportunity", practicalTip: "When the tide rises, launch. Say yes to one growth opportunity today — and share the gains when they arrive." },
  43: { theme: "decisive separation", lifeAreas: "breakups, quitting, and clean breaks", practicalTip: "Make the cut clean and dignified. State your truth directly but kindly. A clean break heals faster than a ragged one." },
  44: { theme: "unexpected encounters", lifeAreas: "new people, surprises, and cautious attraction", practicalTip: "A new person or idea may appear today. Welcome them, but don't rush in — assess character before commitment." },
  45: { theme: "gathering and community", lifeAreas: "events, teams, and collective purpose", practicalTip: "Bring people together today — even a small gathering around a shared goal creates unstoppable momentum." },
  46: { theme: "steady ascent", lifeAreas: "career growth, gradual improvement, and patience", practicalTip: "You're climbing higher than you realize. Each small step counts. Trust the slow, steady rise." },
  47: { theme: "exhaustion and limitation", lifeAreas: "burnout, feeling trapped, and resilience", practicalTip: "When you can't change the situation, change your response. Rest, breathe, and focus only on what you control." },
  48: { theme: "the well — enduring foundations", lifeAreas: "fundamentals, tradition, and what never changes", practicalTip: "Return to basics today. The fundamentals that worked before still work. Tend to your foundation." },
  49: { theme: "revolution and fundamental change", lifeAreas: "transformation, reform, and systemic change", practicalTip: "Surface tweaks won't cut it. Identify one area where deep change is needed — and take the first bold step." },
  50: { theme: "transformation and alchemy", lifeAreas: "personal growth, refinement, and becoming", practicalTip: "You're being refined. Trust the process — raw ingredients become nourishing food. What you're building will feed many." },
  51: { theme: "shock and awakening", lifeAreas: "surprise, wake-up calls, and course correction", practicalTip: "That disruption is a wake-up call, not a disaster. After the jolt, ask: what needs to change? Then fix it." },
  52: { theme: "stillness and meditation", lifeAreas: "rest, inner peace, and non-action", practicalTip: "Stop everything for 10 minutes today. Sit in silence. No phone, no music, no agenda. Stillness is productive." },
  53: { theme: "gradual progress", lifeAreas: "slow development, patience, and steady relationships", practicalTip: "Trust the slow pace. Like a courtship becoming marriage, lasting results take time. Don't rush what's growing steadily." },
  54: { theme: "unequal partnerships", lifeAreas: "imbalanced relationships, caution in commitments, and power dynamics", practicalTip: "Before entering a new partnership, check the power balance. If you're the weaker party, proceed with extreme care." },
  55: { theme: "peak abundance and clarity", lifeAreas: "celebration, peak moments, and savoring success", practicalTip: "You're at a high point — enjoy it fully. Celebrate today, knowing that all peaks pass and that's okay." },
  56: { theme: "the traveler — unfamiliar territory", lifeAreas: "travel, new environments, and being a guest", practicalTip: "In new territory, be humble and observant. Treat every interaction as if you're a guest — because in some sense, you are." },
  57: { theme: "gentle influence and persistence", lifeAreas: "persuasion, subtlety, and wind-like penetration", practicalTip: "Don't force — influence. Small, consistent nudges change minds more than one big push. Be the wind, not the hammer." },
  58: { theme: "joy and open communication", lifeAreas: "happiness, social connection, and sharing", practicalTip: "Share joy today — a genuine compliment, a laugh, a good story. Joy is contagious and costs nothing to spread." },
  59: { theme: "dissolution and reconnection", lifeAreas: "healing divisions, melting barriers, and reunion", practicalTip: "Reach out to someone you've been separated from. Old ice is melting — a simple message can rekindle what was frozen." },
  60: { theme: "limitation and boundaries", lifeAreas: "discipline, structure, and healthy limits", practicalTip: "Set one healthy boundary today. Saying no to what drains you is saying yes to what matters. Limits create freedom." },
  61: { theme: "inner truth and sincerity", lifeAreas: "authenticity, heartfelt communication, and integrity", practicalTip: "Speak from the heart today. Genuine truth, simply expressed, moves people more than the cleverest argument." },
  62: { theme: "smallness and humility", lifeAreas: "small acts, attention to detail, and modesty", practicalTip: "Small is powerful today. One thoughtful gesture, one detail done right — tiny ripples create big waves." },
  63: { theme: "completion and vigilance", lifeAreas: "finishing, achievement, and maintaining order", practicalTip: "You've reached a milestone — celebrate it. Then look ahead. Every completion is also a new beginning in disguise." },
  64: { theme: "before completion — the final stretch", lifeAreas: "near-success, finishing touches, and careful progress", practicalTip: "You're almost there. Don't rush the final 5%. Careful, deliberate steps across the finish line bring true completion." },
};

export function generateHexagramArticle(r: DivinationResult, locale = "en"): string {
  const main = r.mainHexagram;
  const guide = HEXAGRAM_GUIDE[main.id] || { theme: "self-reflection", lifeAreas: "personal growth and awareness", practicalTip: "Take a moment to reflect on your current path. Clarity comes from quiet contemplation." };

  const id = main.id;
  const localizedName = locale === "ja" ? hexagramNameJa[id] : locale === "ru" ? hexagramNameRu[id] : main.nameEn;
  const displayName = localizedName || main.nameEn;
  const localJudgment = locale === "ja" ? judgmentJa[id] : locale === "ru" ? judgmentRu[id] : main.judgmentEn;
  const localAdvice = locale === "ja" ? adviceJa[id] : locale === "ru" ? adviceRu[id] : main.advice;

  const changedId = r.changedHexagram?.id;
  const changedLocalName = changedId ? (locale === "ja" ? hexagramNameJa[changedId] : locale === "ru" ? hexagramNameRu[changedId] : r.changedHexagram?.nameEn) : undefined;
  const changedDisplayName = changedLocalName || r.changedHexagram?.nameEn;
  const changedLocalDesc = changedId ? (locale === "ja" ? descriptionJa[changedId] : locale === "ru" ? descriptionRu[changedId] : r.changedHexagram?.descriptionEn) : undefined;

  const mutualId = r.mutualHexagram?.id;
  const mutualLocalName = mutualId ? (locale === "ja" ? hexagramNameJa[mutualId] : locale === "ru" ? hexagramNameRu[mutualId] : r.mutualHexagram?.nameEn) : undefined;

  const parts: string[] = [];

  // Opening — describes the hexagram in context
  parts.push(`Today's I Ching hexagram is ${main.nameZh} (${main.pinyin}), known as "${displayName}". This hexagram speaks to ${guide.theme}, offering guidance for those seeking clarity in ${guide.lifeAreas}.`);

  // The judgment — core message
  parts.push(`The ancient judgment for this hexagram reads: "${localJudgment || main.judgmentEn}" This wisdom, passed down through millennia, reminds us that the patterns of heaven and earth are reflected in our daily affairs.`);

  // Practical interpretation
  parts.push(`In practical terms, ${displayName} appears when we are being called to focus on ${guide.theme}. ${guide.practicalTip} The hexagram's energy is particularly relevant for matters of ${guide.lifeAreas}.`);

  // If there's a changing line, describe the evolution
  if (r.changingLine && r.changingLine.textEn && r.changedHexagram) {
    parts.push(`The ${ordinal(r.changingLine.position)} line is changing, which transforms the reading into ${r.changedHexagram?.nameZh} (${changedDisplayName}). This indicates that the situation is shifting toward ${(changedLocalDesc || r.changedHexagram?.descriptionEn || "").toLowerCase()} The changing line reveals a pivotal moment — the direction of events hinges on how you respond right now.`);
  }

  // If there's a mutual hexagram (inner dynamics)
  if (r.mutualHexagram) {
    parts.push(`The mutual hexagram (互卦) is ${r.mutualHexagram.nameZh} (${mutualLocalName || r.mutualHexagram.nameEn}), which reveals the inner dynamics at play behind the surface situation. Understanding these hidden forces helps you navigate the visible challenges with deeper wisdom.`);
  }

  // The advice — synthesized guidance
  const adviceRaw = localAdvice || main.advice;
  parts.push(`The I Ching's counsel for today is clear: ${adviceRaw.replace(/^[⚖️☀️⚠️]+\s*Verdict: [^—]+—\s*/, "")}`);

  // Closing — how to use the reading
  parts.push(`Whether you are facing decisions about ${guide.lifeAreas}, or simply seeking daily guidance, this hexagram invites you to embody ${guide.theme} in your thoughts and actions. The ancient Chinese believed that heaven, earth, and humanity form a single interconnected system — your choices today ripple through this web. Use this reading as a mirror, not a map. It reflects your current situation and suggests the wisest path forward, but the steps you take are yours alone.`);

  return parts.join("\n\n");
}

function ordinal(n: number): string {
  if (n === 1) return "first";
  if (n === 2) return "second";
  if (n === 3) return "third";
  if (n === 4) return "fourth";
  if (n === 5) return "fifth";
  return "sixth";
}
