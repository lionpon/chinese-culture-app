import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

type Sign = { name: string; zh: string; years: string; traits: string; element: string };

const SIGNS: Record<string, Sign[]> = {
  en: [
    { name: "Rat", zh: "鼠", years: "1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020", traits: "Quick-witted, resourceful, versatile, kind", element: "Water" },
    { name: "Ox", zh: "牛", years: "1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021", traits: "Diligent, dependable, strong, determined", element: "Earth" },
    { name: "Tiger", zh: "虎", years: "1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022", traits: "Brave, confident, competitive, unpredictable", element: "Wood" },
    { name: "Rabbit", zh: "兔", years: "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023", traits: "Gentle, quiet, elegant, responsible", element: "Wood" },
    { name: "Dragon", zh: "龙", years: "1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024", traits: "Confident, intelligent, enthusiastic, ambitious", element: "Earth" },
    { name: "Snake", zh: "蛇", years: "1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025", traits: "Intelligent, wise, enigmatic, intuitive", element: "Fire" },
    { name: "Horse", zh: "马", years: "1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026", traits: "Energetic, independent, warm-hearted, impatient", element: "Fire" },
    { name: "Goat", zh: "羊", years: "1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027", traits: "Gentle, creative, sympathetic, resilient", element: "Earth" },
    { name: "Monkey", zh: "猴", years: "1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028", traits: "Clever, curious, sociable, mischievous", element: "Metal" },
    { name: "Rooster", zh: "鸡", years: "1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029", traits: "Observant, hardworking, courageous, confident", element: "Metal" },
    { name: "Dog", zh: "狗", years: "1934, 1946, 1958, 1970, 1971, 1982, 1994, 2006, 2018, 2030", traits: "Goyal, honest, prudent, amiable", element: "Earth" },
    { name: "Pig", zh: "猪", years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031", traits: "Compassionate, generous, diligent, warm", element: "Water" },
  ],
  ru: [
    { name: "Крыса", zh: "鼠", years: "1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020", traits: "Остроумная, находчивая, разносторонняя", element: "Вода" },
    { name: "Бык", zh: "牛", years: "1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021", traits: "Усердный, надёжный, сильный, решительный", element: "Земля" },
    { name: "Тигр", zh: "虎", years: "1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022", traits: "Храбрый, уверенный, конкурентоспособный", element: "Дерево" },
    { name: "Кролик", zh: "兔", years: "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023", traits: "Мягкий, спокойный, элегантный, ответственный", element: "Дерево" },
    { name: "Дракон", zh: "龙", years: "1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024", traits: "Уверенный, умный, полный энтузиазма", element: "Земля" },
    { name: "Змея", zh: "蛇", years: "1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025", traits: "Умная, мудрая, загадочная, интуитивная", element: "Огонь" },
    { name: "Лошадь", zh: "马", years: "1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026", traits: "Энергичная, независимая, сердечная", element: "Огонь" },
    { name: "Коза", zh: "羊", years: "1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027", traits: "Нежная, творческая, отзывчивая", element: "Земля" },
    { name: "Обезьяна", zh: "猴", years: "1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028", traits: "Умная, любопытная, общительная", element: "Металл" },
    { name: "Петух", zh: "鸡", years: "1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029", traits: "Наблюдательный, трудолюбивый, смелый", element: "Металл" },
    { name: "Собака", zh: "狗", years: "1934, 1946, 1958, 1970, 1972, 1982, 1994, 2006, 2018, 2030", traits: "Верная, честная, благоразумная", element: "Земля" },
    { name: "Свинья", zh: "猪", years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031", traits: "Сострадательная, щедрая, усердная", element: "Вода" },
  ],
  ja: [
    { name: "子（ねずみ）", zh: "鼠", years: "1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020", traits: "機知に富み、臨機応変で多才", element: "水" },
    { name: "丑（うし）", zh: "牛", years: "1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021", traits: "勤勉で信頼でき、意志が強い", element: "土" },
    { name: "寅（とら）", zh: "虎", years: "1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022", traits: "勇敢で自信家、競争心が強い", element: "木" },
    { name: "卯（うさぎ）", zh: "兔", years: "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023", traits: "穏やかで静か、上品で責任感がある", element: "木" },
    { name: "辰（たつ）", zh: "龙", years: "1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024", traits: "自信に満ち、知的で熱意がある", element: "土" },
    { name: "巳（み）", zh: "蛇", years: "1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025", traits: "知的で賢く、神秘的で直感的", element: "火" },
    { name: "午（うま）", zh: "马", years: "1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026", traits: "活動的で独立心が強く、心温かい", element: "火" },
    { name: "未（ひつじ）", zh: "羊", years: "1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027", traits: "優しく創造的で、思いやりがある", element: "土" },
    { name: "申（さる）", zh: "猴", years: "1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028", traits: "賢く好奇心旺盛で社交的", element: "金" },
    { name: "酉（とり）", zh: "鸡", years: "1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029", traits: "観察力があり勤勉で勇敢", element: "金" },
    { name: "戌（いぬ）", zh: "狗", years: "1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030", traits: "忠実で正直、慎重で親しみやすい", element: "土" },
    { name: "亥（いのしし）", zh: "猪", years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031", traits: "情け深く寛大で勤勉", element: "水" },
  ],
};

const CONTENT: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; howItWorks: string; howBody: string; signsHeading: string; yearsLabel: string; elementLabel: string; note: string; faqs: { q: string; a: string }[]; cta: string; disclaimer: string }> = {
  en: {
    title: "12 Chinese Zodiac Signs 2026: Which Animal Are You? (Free Calculator) | Chinese Culture Studio",
    desc: "Find your Chinese zodiac animal by birth year. Discover personality traits, love compatibility, and lucky elements for all 12 signs. Try our free zodiac calculator.",
    ogTitle: "2026 Chinese Zodiac: Which Animal Are You? (Free Calculator)",
    ogDesc: "Discover your Chinese zodiac sign in seconds. 12 animals, personality traits, compatibility & lucky elements. Free zodiac calculator included.",
    heading: "Chinese Zodiac: 12 Animal Signs & Their Meanings",
    subtitle: "A complete guide to the 12 Chinese zodiac signs — personality, elements, and compatibility.",
    howItWorks: "How the Chinese Zodiac Works",
    howBody: "The Chinese zodiac (生肖, shēngxiào) is a 12-year cycle where each year is represented by an animal. Unlike the Western zodiac based on months, the Chinese zodiac is determined by your birth year. Each animal is associated with one of the Five Elements (Wood, Fire, Earth, Metal, Water), creating a 60-year cycle. Your zodiac sign influences personality, relationships, and destiny according to Chinese tradition.",
    signsHeading: "The 12 Zodiac Signs",
    yearsLabel: "Years",
    elementLabel: "Element",
    note: "2026 is the Year of the Horse (Fire). 2027 will be the Year of the Goat (Earth).",
    faqs: [
      { q: "What is my Chinese zodiac sign?", a: "Find your birth year in the table above. Important: Chinese New Year falls on different dates (late Jan — early Feb). If born in January, check the exact date. For a quick answer, try our free zodiac calculator." },
      { q: "Are Chinese zodiac signs compatible?", a: "Yes! Some signs are considered especially compatible: Rat + Dragon, Ox + Snake, Tiger + Horse. Others may clash — but compatibility is nuanced and depends on elements too." },
      { q: "What are the 12 Chinese zodiac animals in order?", a: "The 12 Chinese zodiac animals are: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig. The cycle repeats every 12 years, and each animal is associated with one of the Five Elements (Wood, Fire, Earth, Metal, Water) for a full 60-year cycle." },
      { q: "What is the Chinese zodiac for 2026?", a: "2026 is the Year of the Horse (Fire Horse). The Horse represents energy, independence, and warmth. People born in 2026 will be Fire Horses — known for being passionate, adventurous, and charismatic with strong leadership qualities." },
      { q: "How do I find my Chinese element?", a: "Your Chinese element is determined by the last digit of your birth year: 0-1 = Metal, 2-3 = Water, 4-5 = Wood, 6-7 = Fire, 8-9 = Earth. But this is simplified — the full calculation includes heavenly stems and earthly branches for a complete Bazi (Eight Characters) reading." },
    ],
    cta: "Get a Personal I Ching Reading — from $1",
    disclaimer: "For cultural appreciation only.",
  },
  ru: {
    title: "Китайский Зодиак: 12 Знаков и Их Значения | Chinese Culture Studio",
    desc: "Узнайте о 12 знаках китайского зодиака: Крыса, Бык, Тигр и другие. Характер, совместимость и элемент для каждого знака.",
    ogTitle: "Китайский Зодиак: 12 Знаков",
    ogDesc: "Характер и совместимость 12 знаков китайского зодиака.",
    heading: "Китайский Зодиак: 12 Знаков и Их Значения",
    subtitle: "Полный гид по 12 знакам китайского зодиака — характер, стихии и совместимость.",
    howItWorks: "Как Работает Китайский Зодиак",
    howBody: "Китайский зодиак (生肖, shēngxiào) — это 12-летний цикл, где каждый год представлен животным. В отличие от западного зодиака, основанного на месяцах, китайский зодиак определяется годом рождения. Каждое животное связано с одним из Пяти Элементов (Дерево, Огонь, Земля, Металл, Вода), создавая 60-летний цикл. Ваш знак зодиака влияет на личность, отношения и судьбу согласно китайской традиции.",
    signsHeading: "12 Знаков Зодиака",
    yearsLabel: "Годы",
    elementLabel: "Элемент",
    note: "2026 — Год Лошади (Огонь). 2027 — Год Козы (Земля).",
    faqs: [
      { q: "Какой у меня знак китайского зодиака?", a: "Найдите свой год рождения в таблице выше. Важно: китайский Новый год выпадает на разные даты (конец января — начало февраля). Если вы родились в январе, проверьте точную дату." },
      { q: "Совместимы ли знаки зодиака?", a: "Да, некоторые знаки считаются особенно совместимыми: Крыса + Дракон, Бык + Змея, Тигр + Лошадь. Другие могут конфликтовать." },
    ],
    cta: "Получить Персональное Чтение И-Цзин — от $1",
    disclaimer: "Для культурного ознакомления.",
  },
  ja: {
    title: "十二支：12の動物とその意味 | Chinese Culture Studio",
    desc: "十二支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）の性格、相性、五行を詳しく解説します。",
    ogTitle: "十二支：12の動物",
    ogDesc: "中国の十二支12動物の性格と相性を解説。",
    heading: "十二支：12の動物とその意味",
    subtitle: "十二支12動物の完全ガイド — 性格、五行、相性。",
    howItWorks: "十二支の仕組み",
    howBody: "十二支（生肖, shēngxiào）は12年周期で各年を動物が表します。月に基づく西洋占星術とは異なり、生まれた年によって決まります。各動物は五行（木・火・土・金・水）のいずれかと結びつき、60年の周期を作ります。中国の伝統では、干支は性格、人間関係、運命に影響を与えるとされています。",
    signsHeading: "12の干支",
    yearsLabel: "年",
    elementLabel: "五行",
    note: "2026年は午年（火）。2027年は未年（土）です。",
    faqs: [
      { q: "自分の干支は何ですか？", a: "上の表で自分の生まれた年を探してください。注意：旧正月は毎年日付が変わります（1月下旬〜2月上旬）。1月生まれの方は正確な日付を確認してください。" },
      { q: "干支の相性はありますか？", a: "はい！特に相性が良いとされる組み合わせ：子＋辰、丑＋巳、寅＋午。相性が悪い組み合わせもありますが、五行も考慮する必要があります。" },
    ],
    cta: "易経で個人的なリーディングを受ける — $1から",
    disclaimer: "文化理解のためのものです。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return {
    title: c.title,
    description: c.desc,
    openGraph: { title: c.ogTitle, description: c.ogDesc },
        alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/chinese-zodiac",
        ru: "https://www.culture-of-china.com/ru/guide/chinese-zodiac",
        ja: "https://www.culture-of-china.com/ja/guide/chinese-zodiac",
      },
    },
      robots: "index, follow",
  };
}

export default function ChineseZodiacGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;
  const signs = SIGNS[locale] || SIGNS.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.howItWorks}</h2>
      <p>{c.howBody}</p>

      <h2>{c.signsHeading}</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {signs.map((s) => (
          <div key={s.name} className="card-classic p-3 text-sm">
            <p className="font-bold text-accent">{s.zh} {s.name}</p>
            <p className="text-xs text-stone-500">{c.yearsLabel}: {s.years}</p>
            <p className="text-xs text-stone-600 mt-1">{s.traits}</p>
            <p className="text-xs text-stone-400">{c.elementLabel}: {s.element}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400">{c.note}</p>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <div className="not-prose my-8 text-center">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {c.cta}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
