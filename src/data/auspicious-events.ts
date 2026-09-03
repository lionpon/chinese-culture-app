// Content factory data — 13 event types for programmatic date pages.
// English first batch (2027). Other languages follow content-factory SKILL.md standards.
// Event slugs MUST match EVENT_DATA keys in src/lib/calendar.ts.
// Dates are computed from the almanac engine at build time — never hand-written.
import type { EventType } from "@/types";

export interface DateEventContent {
  slug: EventType;
  name: string;        // full label
  shortName: string;   // for headings/titles
  emoji: string;
  title: string;       // template, placeholders {month} {year}
  desc: string;        // meta description template, {month} {year}
  introTitle: string;  // H2 above intro
  intro: string[];     // 2 paragraphs, {month} {year} {ghostMonth}
  avoidTitle: string;
  avoidNotes: string[]; // {ghostMonth} placeholder
  faqs: { q: string; a: string }[];
}

export const MONTHS_2027 = [
  { slug: "january", name: "January", short: "Jan" },
  { slug: "february", name: "February", short: "Feb" },
  { slug: "march", name: "March", short: "Mar" },
  { slug: "april", name: "April", short: "Apr" },
  { slug: "may", name: "May", short: "May" },
  { slug: "june", name: "June", short: "Jun" },
  { slug: "july", name: "July", short: "Jul" },
  { slug: "august", name: "August", short: "Aug" },
  { slug: "september", name: "September", short: "Sep" },
  { slug: "october", name: "October", short: "Oct" },
  { slug: "november", name: "November", short: "Nov" },
  { slug: "december", name: "December", short: "Dec" },
] as const;

export const YEAR = 2027;

export const EVENTS: DateEventContent[] = [
  {
    slug: "wedding",
    name: "Wedding & Marriage",
    shortName: "Wedding",
    emoji: "💍",
    title: "Auspicious Wedding Dates in {month} {year}",
    desc: "The highest-scoring wedding days in {month} {year}, computed from the Chinese almanac — plus the dates most couples avoid and what makes each day lucky.",
    introTitle: "Why the Wedding Date Matters",
    intro: [
      "In Chinese tradition, a wedding date isn't left to chance. Couples — or their families — consult the almanac (the tōngshū) to find a day when the stars, the elements, and the couple's own zodiac signs line up. The practice is called zéjí: picking the auspicious.",
      "Below are the highest-scoring wedding days in {month} {year}, computed one by one from the traditional calendar. Each date is rated on its jianchu star, its heavenly stems and earthly branches, and the lucky gods presiding over it.",
    ],
    avoidTitle: "Dates Most Couples Avoid",
    avoidNotes: [
      "Ghost Month ({ghostMonth}): the seventh lunar month — the one stretch of the year most couples skip entirely.",
      "Qingming Festival (early April): a day for honoring ancestors, not for celebrations.",
      "Any day whose earthly branch clashes with either partner's zodiac sign — worth checking before you commit.",
      "Lunar-calendar days 3, 7, 17, and 23 carry a long-standing reputation for bad luck.",
    ],
    faqs: [
      {
        q: "What actually makes a wedding date auspicious?",
        a: "A date scores well when its jianchu star suits marriage (chéng, kāi, or dìng days), its day-branch doesn't clash with either partner's zodiac, and lucky gods like Tiānxǐ — Heavenly Joy — are in charge. Traditional families also avoid Ghost Month and Qingming, which is why spring and autumn weekends fill up fastest.",
      },
      {
        q: "How early should we book a 2027 wedding date?",
        a: "For popular weekends, 9–12 months ahead isn't unusual — especially double-number dates like June 6 or August 8, which carry extra appeal in Chinese culture. If a specific day matters to you, lock it in early.",
      },
    ],
  },
  {
    slug: "engagement",
    name: "Engagement & Betrothal",
    shortName: "Engagement",
    emoji: "💐",
    title: "Auspicious Engagement Dates in {month} {year}",
    desc: "The best engagement days in {month} {year} from the Chinese almanac — how the betrothal date is chosen, which days to avoid, and what makes a day lucky.",
    introTitle: "The Betrothal Sets the Tone",
    intro: [
      "Before the wedding comes the betrothal — dìnghūn, the formal promise between two families. In Chinese custom, the engagement date is chosen with the same almanac care as the wedding itself: it's the first step of the journey, and tradition says it sets the tone for everything that follows.",
      "These are the best-scoring engagement days in {month} {year}, computed from the traditional calendar — plus the dates to avoid, and what makes each lucky day lucky.",
    ],
    avoidTitle: "Dates to Skip for an Engagement",
    avoidNotes: [
      "Ghost Month ({ghostMonth}) — engagements, like weddings, are usually kept out of it.",
      "Days that clash with either partner's zodiac branch.",
      "Qingming Festival week — a time for remembrance, not proposals.",
    ],
    faqs: [
      {
        q: "Is the engagement date as important as the wedding date?",
        a: "Traditionally, yes. Dìnghūn is the formal promise between families, so it deserves its own auspicious day. In modern practice, couples often pick one date carefully and keep the other flexible.",
      },
      {
        q: "Which season suits a 2027 engagement?",
        a: "Spring and autumn are the favorites, matching wedding-season logic. Steer clear of Ghost Month ({ghostMonth}) and Qingming week, and you're in the clear.",
      },
    ],
  },
  {
    slug: "business",
    name: "Business Opening",
    shortName: "Business Opening",
    emoji: "🏪",
    title: "Auspicious Business Opening Dates in {month} {year}",
    desc: "The best-rated days to open a shop or launch a company in {month} {year}, scored from the Chinese almanac — plus the days tradition says to avoid.",
    introTitle: "Opening Day Is Part of the Plan",
    intro: [
      "In Chinese business culture, opening day is part of the business plan. Shopkeepers and founders pick a date when the almanac favors commerce — a kāi (open) or chéng (complete) day with a wealth god presiding — on the belief that a shop opened on the right day opens wide.",
      "Here are the top-rated business-opening days in {month} {year}, scored day by day from the traditional calendar.",
    ],
    avoidTitle: "Days to Avoid for an Opening",
    avoidNotes: [
      "Days ruled by pò (break) or bì (close) stars — the almanac's least commercial days.",
      "Ghost Month ({ghostMonth}): many Chinese-owned businesses avoid launching during it.",
      "Chinese New Year week: shops traditionally open after the holiday, on an auspicious day rather than during it.",
    ],
    faqs: [
      {
        q: "Which days suit opening a shop or launching a company?",
        a: "Days marked kāi (开, opening) or chéng (成, completion) score highest for commerce. Many founders also like days with a wealth god in charge — you'll see the god's name in each date card below.",
      },
      {
        q: "Does this apply to online businesses?",
        a: "Plenty of modern founders apply the same logic to any launch — a website, a product drop, a side project. The tradition is about beginning well, whatever the storefront looks like.",
      },
    ],
  },
  {
    slug: "travel",
    name: "Travel & Journey",
    shortName: "Travel",
    emoji: "✈️",
    title: "Auspicious Travel Dates in {month} {year}",
    desc: "The most travel-friendly days in {month} {year} according to the Chinese almanac — when to set out, when to stay put, and why it still matters.",
    introTitle: "Some Days Favor Movement",
    intro: [
      "For centuries, Chinese travelers checked the almanac before a long journey. The habit survives today — for trips abroad, for moving cities, for the first trip of the year — because the logic is simple: some days favor movement, and some days fight it.",
      "These are the most travel-friendly days in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "Days to Stay Put",
    avoidNotes: [
      "Days ruled by bì (闭, closed) — the almanac's signal to stay put.",
      "Ghost Month ({ghostMonth}): long-distance travel is traditionally avoided, especially at night.",
      "Days that clash with your own zodiac branch.",
    ],
    faqs: [
      {
        q: "What makes a travel day auspicious?",
        a: "A good travel day has a supportive jianchu star and a day-branch that doesn't clash with your zodiac. The almanac also prefers days with travel-friendly gods in charge — you'll see them listed on each date below.",
      },
      {
        q: "Do people still follow this?",
        a: "Yes — especially for big journeys like moving abroad or the first trip after the New Year. Even families that skip it for daily commutes often check before something major.",
      },
    ],
  },
  {
    slug: "moving",
    name: "Moving House",
    shortName: "Moving",
    emoji: "📦",
    title: "Auspicious Moving Dates in {month} {year}",
    desc: "The best days to move house in {month} {year}, scored from the Chinese almanac — the traditional logic behind moving days and which dates to avoid.",
    introTitle: "The Day You Step Through the Door",
    intro: [
      "Moving is one of the most consulted categories in the Chinese almanac — second only to weddings. The idea is simple: the day you step through your new front door sets the energy of your life there. So families pick a day that opens well.",
      "Here are the best-rated moving days in {month} {year}, scored from the traditional calendar, with the dates to skip listed below.",
    ],
    avoidTitle: "Dates to Avoid When Moving",
    avoidNotes: [
      "Ghost Month ({ghostMonth}) — moving house is one of the classic don'ts.",
      "Days marked pò (break) or bì (close).",
      "Your zodiac-clash day: the day whose branch opposes your birth year's animal.",
    ],
    faqs: [
      {
        q: "What's the luckiest day to move house?",
        a: "Days marked chéng (成) or kāi (开) with a favorable branch score highest. Some families also coordinate with the feng shui of the new home — the almanac date is the first piece, not the last.",
      },
      {
        q: "What if my move date isn't on the list?",
        a: "The list shows the strongest days in {month}. If you're flexible, aim for a top-scoring day; if not, most families prioritize logistics and treat the calendar as one input among several.",
      },
    ],
  },
  {
    slug: "contract",
    name: "Signing Contracts",
    shortName: "Signing a Contract",
    emoji: "📝",
    title: "Auspicious Dates to Sign Contracts in {month} {year}",
    desc: "The best days to sign agreements in {month} {year} from the Chinese almanac — which stars favor commitment, and the days tradition warns against.",
    introTitle: "Sign on a Day That Holds",
    intro: [
      "In Chinese practice, big commitments — partnerships, property deals, major purchases — are often signed on a chosen day. The reasoning: sign on a day ruled by dìng (settling) or chéng (completion), and the agreement is more likely to hold.",
      "These are the highest-scoring days to sign contracts in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "Days Not to Sign",
    avoidNotes: [
      "Days marked pò (break) — traditionally the worst day to commit to anything.",
      "Ghost Month ({ghostMonth}) — some parties avoid closing major deals during it.",
      "Days that clash with the zodiac branch of either signatory.",
    ],
    faqs: [
      {
        q: "Which days suit signing a contract?",
        a: "Look for dìng (定) and chéng (成) days with supportive gods. People also avoid pò (破) days, which the almanac associates with things breaking apart — not the energy you want in a contract.",
      },
      {
        q: "Does the same rule apply to registering a marriage?",
        a: "It does — couples often register their marriage on an auspicious day, too. The calendar doesn't distinguish between a business signature and a life signature.",
      },
    ],
  },
  {
    slug: "sacrifice",
    name: "Ancestral Ceremony",
    shortName: "Ancestral Ceremony",
    emoji: "🕯️",
    title: "Auspicious Ancestral Ceremony Dates in {month} {year}",
    desc: "The best-rated days for ancestral ceremonies in {month} {year} from the Chinese almanac — the jìsì tradition, festival days, and how families choose.",
    introTitle: "The Oldest Ritual in the Calendar",
    intro: [
      "Ancestral veneration — jìsì — is the oldest ritual in the Chinese calendar. Families hold ceremonies on days the almanac marks for offerings, most importantly at Qingming, the Ghost Festival, and the winter solstice — and the specific day within each festival is chosen with the same care.",
      "These are the best-rated ancestral ceremony days in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "Days to Avoid for Offerings",
    avoidNotes: [
      "Days marked bì (closed) — offerings are traditionally avoided when the almanac says the gate is shut.",
      "Days that clash with the family's ancestral branch, usually the patriarch's zodiac.",
    ],
    faqs: [
      {
        q: "When are the major ancestral ceremony days in 2027?",
        a: "Qingming (early April), the Ghost Festival in the seventh lunar month ({ghostMonth}), and the winter solstice in late December. Within those windows, families pick a specific day using the almanac.",
      },
      {
        q: "What happens during a jìsì ceremony?",
        a: "Families clean the altar or gravesite, present food and incense, and bow in order of seniority. The date matters, but so does doing it together — the ceremony is as much for the living as for the ancestors.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction & Building",
    shortName: "Construction",
    emoji: "🏗️",
    title: "Auspicious Dates to Start Construction in {month} {year}",
    desc: "The best days to break ground in {month} {year}, scored from the Chinese almanac — which stars favor building, and the days crews avoid.",
    introTitle: "Breaking Ground on a Firm Day",
    intro: [
      "Breaking ground is a big moment in Chinese custom. The first day of construction is chosen from the almanac so the project rises on a firm footing — traditionally a jiàn (establish) or chéng (complete) day, chosen with the land and the builder in mind.",
      "Here are the top-scoring days to start construction in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "Days Not to Break Ground",
    avoidNotes: [
      "Days marked pò (break) — not the day to break ground, despite how it sounds.",
      "Ghost Month ({ghostMonth}) — ground-breaking is traditionally paused.",
      "Rainy-season days are avoided for practical reasons as much as calendar ones.",
    ],
    faqs: [
      {
        q: "Which days are best to break ground?",
        a: "Jiàn (建) and chéng (成) days with favorable branches score highest. On site, many crews still hold a small ground-breaking ceremony on the chosen morning.",
      },
      {
        q: "Does this apply to home renovations too?",
        a: "Renovations have their own category — see our renovation pages — with the same underlying logic: begin on a day that favors change done well.",
      },
    ],
  },
  {
    slug: "medical",
    name: "Medical Treatment",
    shortName: "Medical Treatment",
    emoji: "🏥",
    title: "Auspicious Dates for Medical Treatment in {month} {year}",
    desc: "The almanac's best-rated days for medical visits in {month} {year} — a cultural custom explained, with the dates and an important caveat.",
    introTitle: "A Custom, Not Medical Advice",
    intro: [
      "The traditional Chinese almanac marks some days as more favorable than others for seeking treatment — a custom from a time when visiting the doctor was itself a journey. Today it survives as a cultural habit, not medical advice: your health decisions belong to you and your doctor.",
      "For those who follow the custom, here are the best-rated days for medical visits in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "What the Custom Avoids",
    avoidNotes: [
      "The almanac's pò (break) days — traditionally avoided for beginning treatment.",
      "Ghost Month ({ghostMonth}) — elective procedures are sometimes postponed.",
      "Important: never delay necessary care for a calendar date. The almanac is custom; your doctor's advice is care.",
    ],
    faqs: [
      {
        q: "Is this medical advice?",
        a: "No. This is a cultural tradition, recorded for interest. For anything health-related, consult your doctor — the almanac is something some families follow alongside modern medicine, never instead of it.",
      },
      {
        q: "Which days does the almanac favor for seeking care?",
        a: "Days with supportive stars and no clash with the person's zodiac. In practice, families using the custom book appointments on these days when the choice is elective.",
      },
    ],
  },
  {
    slug: "funeral",
    name: "Funeral & Burial",
    shortName: "Funeral & Burial",
    emoji: "⚱️",
    title: "Auspicious Funeral & Burial Dates in {month} {year}",
    desc: "How Chinese families choose burial dates, and the almanac's best-rated days in {month} {year} — written with care, for those who follow the custom.",
    introTitle: "A Solemn Matter, Chosen with Care",
    intro: [
      "In Chinese tradition, arranging a burial — ānzàng — includes choosing a day when the almanac favors farewell and rest. It's a solemn matter, and families typically work with a temple or feng shui practitioner rather than relying on the calendar alone.",
      "For families following the custom, these are the best-rated days for burial in {month} {year}, computed from the traditional calendar. We've written this page with care and respect.",
    ],
    avoidTitle: "Days Traditionally Avoided",
    avoidNotes: [
      "Ghost Month ({ghostMonth}) — burials are traditionally scheduled outside it.",
      "Days that clash with the deceased's or the family's zodiac branches.",
      "For this event above all others, we recommend consulting a practitioner rather than the calendar alone.",
    ],
    faqs: [
      {
        q: "How do families choose a burial date?",
        a: "Traditionally, the date is chosen with a feng shui practitioner or temple, weighing the almanac, the family's zodiac branches, and the gravesite. The calendar below is a starting point, not a substitute for that guidance.",
      },
      {
        q: "Are there days to avoid for funerals?",
        a: "Ghost Month ({ghostMonth}) and zodiac-clash days are the main ones. Practice varies by region and family tradition, so local custom always takes precedence.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education & Study",
    shortName: "Starting School",
    emoji: "🎓",
    title: "Auspicious Dates to Start School in {month} {year}",
    desc: "The best days to start school or begin a course in {month} {year}, scored from the Chinese almanac — an old custom for a good head start.",
    introTitle: "A Head Start, Taken Seriously",
    intro: [
      "The first day of school matters in Chinese culture. Families have long consulted the almanac when a child begins formal education, looking for a day when the stars favor study, memory, and growth — a head start that's mostly symbolic, and taken seriously all the same.",
      "These are the best-rated days to start school or begin a course in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "Days to Avoid for Beginnings",
    avoidNotes: [
      "Days marked bì (closed) — traditionally avoided for beginnings of any kind.",
      "Days that clash with the student's zodiac branch.",
    ],
    faqs: [
      {
        q: "Which days are good to start school in {month}?",
        a: "Days with supportive stars and no zodiac clash. In many families the date matters most for a child's first day of primary school — the symbolic opening of their education.",
      },
      {
        q: "Does this apply to adults starting a course?",
        a: "The same logic applies — plenty of adults pick an auspicious day to start a degree, a language course, or a new certification. Begin on a day that favors growth, the thinking goes.",
      },
    ],
  },
  {
    slug: "meeting",
    name: "Meeting & Gathering",
    shortName: "Meetings & Gatherings",
    emoji: "🤝",
    title: "Auspicious Dates for Meetings in {month} {year}",
    desc: "The best days for important meetings and gatherings in {month} {year} from the Chinese almanac — the huìyǒu tradition for when relationships are on the line.",
    introTitle: "When Relationships Are on the Line",
    intro: [
      "Important gatherings — reunions, business dinners, meeting someone who matters — have their own almanac category: huìyǒu, meeting friends. A well-chosen day is one that favors harmony and connection, which is exactly what you want when relationships are on the line.",
      "These are the best-rated days for meetings and gatherings in {month} {year}, computed from the traditional calendar.",
    ],
    avoidTitle: "Days to Avoid for Gatherings",
    avoidNotes: [
      "Days marked pò (break) — traditionally the worst day for relationships.",
      "Days that clash with your zodiac branch.",
    ],
    faqs: [
      {
        q: "Which days favor important meetings?",
        a: "Days with harmonious stars and no zodiac clash. If you can choose when to meet a future partner or in-law, the almanac's huìyǒu days are the traditional pick.",
      },
      {
        q: "Is huìyǒu only for friends, or business too?",
        a: "Both — the category covers any gathering where connection matters. Business dinners, family introductions, reunions: the same days apply.",
      },
    ],
  },
  {
    slug: "renovation",
    name: "Renovation & Decoration",
    shortName: "Renovation",
    emoji: "🛠️",
    title: "Auspicious Renovation Dates in {month} {year}",
    desc: "The best days to start a home renovation in {month} {year}, scored from the Chinese almanac — and the dates tradition says to leave the walls alone.",
    introTitle: "Begin on a Day That Favors Change",
    intro: [
      "Home renovations in Chinese households often start on a date chosen from the almanac. The logic mirrors construction: begin when the day's stars favor change and improvement, and the work — and the household — comes out better for it.",
      "Here are the top-scoring renovation days in {month} {year}, computed from the traditional calendar, with the dates to skip below.",
    ],
    avoidTitle: "Dates to Leave the Walls Alone",
    avoidNotes: [
      "Days marked pò (break) — traditionally avoided for starting work on your home.",
      "Ghost Month ({ghostMonth}) — renovations are usually paused, especially for the front door and kitchen.",
      "Zodiac-clash days for the head of the household.",
    ],
    faqs: [
      {
        q: "Which days are best to start a renovation?",
        a: "Days with supportive stars score highest — the date cards below show the score and the gods behind each one. Some families also time the first hammer blow to an auspicious hour.",
      },
      {
        q: "What's the difference between renovation and construction days?",
        a: "Renovation (zhuāngxiū) concerns existing homes; construction (xiūzào) concerns new builds and major structural work. Both follow the same calendar logic but have separate categories in the almanac — and separate pages here.",
      },
    ],
  },
];

export function getEvent(slug: string): DateEventContent | undefined {
  return EVENTS.find(e => e.slug === slug);
}

// Replace {month} {year} {ghostMonth} placeholders in any template string.
export function fill(template: string, vars: { month?: string; year?: number; ghostMonth?: string }): string {
  return template
    .replace(/\{month\}/g, vars.month ?? "")
    .replace(/\{year\}/g, String(vars.year ?? YEAR))
    .replace(/\{ghostMonth\}/g, vars.ghostMonth ?? "");
}
