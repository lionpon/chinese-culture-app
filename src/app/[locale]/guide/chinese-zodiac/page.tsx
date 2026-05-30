import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "Китайский Зодиак: 12 Знаков и Их Значения | Chinese Culture Studio" : "Chinese Zodiac: 12 Animal Signs & Their Meanings | Chinese Culture Studio",
    description: isRu ? "Узнайте о 12 знаках китайского зодиака: Крыса, Бык, Тигр и другие. Характер, совместимость и элемент для каждого знака." : "Discover the 12 Chinese zodiac signs: Rat, Ox, Tiger & more. Personality, compatibility, and element for each animal sign.",
    openGraph: { title: isRu ? "Китайский Зодиак: 12 Знаков" : "Chinese Zodiac: 12 Animal Signs", description: isRu ? "Характер и совместимость 12 знаков китайского зодиака." : "Personality and compatibility of all 12 Chinese zodiac signs." },
    robots: "index, follow",
  };
}

const SIGNS_EN = [
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
  { name: "Dog", zh: "狗", years: "1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030", traits: "Loyal, honest, prudent, amiable", element: "Earth" },
  { name: "Pig", zh: "猪", years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031", traits: "Compassionate, generous, diligent, warm", element: "Water" },
];

const SIGNS_RU = [
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
  { name: "Собака", zh: "狗", years: "1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030", traits: "Верная, честная, благоразумная", element: "Земля" },
  { name: "Свинья", zh: "猪", years: "1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031", traits: "Сострадательная, щедрая, усердная", element: "Вода" },
];

export default function ChineseZodiacGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";
  const signs = isRu ? SIGNS_RU : SIGNS_EN;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Китайский Зодиак: 12 Знаков и Их Значения" : "Chinese Zodiac: 12 Animal Signs & Their Meanings"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Полный гид по 12 знакам китайского зодиака — характер, стихии и совместимость." : "A complete guide to the 12 Chinese zodiac signs — personality, elements, and compatibility."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Как Работает Китайский Зодиак" : "How the Chinese Zodiac Works"}</h2>
      {isRu ? (
        <p>Китайский зодиак (生肖, shēngxiào) — это 12-летний цикл, где каждый год представлен животным. В отличие от западного зодиака, основанного на месяцах, китайский зодиак определяется годом рождения. Каждое животное связано с одним из Пяти Элементов (Дерево, Огонь, Земля, Металл, Вода), создавая 60-летний цикл. Ваш знак зодиака влияет на личность, отношения и судьбу согласно китайской традиции.</p>
      ) : (
        <p>The Chinese zodiac (生肖, shēngxiào) is a 12-year cycle where each year is represented by an animal. Unlike the Western zodiac based on months, the Chinese zodiac is determined by your birth year. Each animal is associated with one of the Five Elements (Wood, Fire, Earth, Metal, Water), creating a 60-year cycle. Your zodiac sign influences personality, relationships, and destiny according to Chinese tradition.</p>
      )}

      <h2>{isRu ? "12 Знаков Зодиака" : "The 12 Zodiac Signs"}</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {signs.map((s) => (
          <div key={s.name} className="card-classic p-3 text-sm">
            <p className="font-bold text-accent">{s.zh} {s.name}</p>
            <p className="text-xs text-stone-500">{isRu ? "Годы" : "Years"}: {s.years}</p>
            <p className="text-xs text-stone-600 mt-1">{s.traits}</p>
            <p className="text-xs text-stone-400">{isRu ? "Элемент" : "Element"}: {s.element}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400">
        {isRu ? "2026 — Год Лошади (Огонь). 2027 — Год Козы (Земля)." : "2026 is the Year of the Horse (Fire). 2027 will be the Year of the Goat (Earth)."}
      </p>

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Какой у меня знак китайского зодиака?", a: "Найдите свой год рождения в таблице выше. Важно: китайский Новый год выпадает на разные даты (конец января — начало февраля). Если вы родились в январе, проверьте точную дату." },
        { q: "Совместимы ли знаки зодиака?", a: "Да, некоторые знаки считаются особенно совместимыми: Крыса + Дракон, Бык + Змея, Тигр + Лошадь. Другие могут конфликтовать." },
      ] : [
        { q: "What is my Chinese zodiac sign?", a: "Find your birth year in the table above. Important: Chinese New Year falls on different dates (late Jan — early Feb). If born in January, check the exact date." },
        { q: "Are Chinese zodiac signs compatible?", a: "Yes! Some signs are considered especially compatible: Rat + Dragon, Ox + Snake, Tiger + Horse. Others may clash — but compatibility is nuanced and depends on elements too." },
      ]} />

      <div className="not-prose my-8 text-center">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Получить Персональное Чтение И-Цзин — от $1" : "Get a Personal I Ching Reading — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{isRu ? "Для культурного ознакомления." : "For cultural appreciation only."}</p>
    </article>
  );
}
