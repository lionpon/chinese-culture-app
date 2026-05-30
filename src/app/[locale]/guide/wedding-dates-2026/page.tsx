import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "Благоприятные Даты для Свадьбы 2026: Китайский Календарь | Chinese Culture Studio" : "Auspicious Wedding Dates 2026: Chinese Calendar Guide | Chinese Culture Studio",
    description: isRu ? "Лучшие даты для свадьбы в 2026 году по китайскому календарю. Год Лошади — что это значит для брака, какие месяцы и дни самые удачные." : "Best wedding dates in 2026 according to the Chinese calendar. Year of the Horse — what it means for marriage, which months and days are luckiest.",
    openGraph: { title: isRu ? "Даты Свадьбы 2026 по Китайскому Календарю" : "Auspicious Wedding Dates 2026", description: isRu ? "Лучшие дни для бракосочетания в год Лошади." : "Best days to get married in the Year of the Horse." },
    robots: "index, follow",
  };
}

const MONTHS_EN = [
  { mo: "January 2026", notes: "After Chinese New Year (Feb 17) is better. Late Jan still in Year of the Ox — transitional." },
  { mo: "February 2026", notes: "Chinese New Year on Feb 17. Days after the 20th are especially fresh and auspicious for new beginnings." },
  { mo: "March 2026", notes: "Spring energy peaks. Excellent month for weddings — wood element supports growth and new family." },
  { mo: "May 2026", notes: "Warm, vibrant energy. Avoid days clashing with Horse (your zodiac day). Check individual dates." },
  { mo: "June 2026", notes: "Summer fire matches Horse year energy. Double-check for clash days." },
  { mo: "September 2026", notes: "Autumn metal brings clarity and structure. Good for formal ceremonies." },
  { mo: "October 2026", notes: "Golden autumn. One of the most popular wedding months in Chinese tradition." },
  { mo: "November 2026", notes: "Early November before winter sets in. Metal element supports commitment." },
];

const MONTHS_RU = [
  { mo: "Январь 2026", notes: "После Китайского Нового года (17 фев) лучше. Конец января ещё год Быка — переходный период." },
  { mo: "Февраль 2026", notes: "Китайский Новый год 17 февраля. Дни после 20-го особенно свежи и благоприятны." },
  { mo: "Март 2026", notes: "Весенняя энергия на пике. Отличный месяц для свадьбы — элемент дерева поддерживает рост." },
  { mo: "Май 2026", notes: "Тёплая, яркая энергия. Избегайте дней, конфликтующих с Лошадью." },
  { mo: "Июнь 2026", notes: "Летний огонь соответствует энергии года Лошади. Хорошее совпадение." },
  { mo: "Сентябрь 2026", notes: "Осенний металл приносит ясность и структуру. Хорошо для официальных церемоний." },
  { mo: "Октябрь 2026", notes: "Золотая осень. Один из самых популярных свадебных месяцев в китайской традиции." },
  { mo: "Ноябрь 2026", notes: "Начало ноября до наступления зимы. Элемент металла поддерживает обязательства." },
];

export default function WeddingDates2026Guide({ params: { locale } }: Props) {
  const isRu = locale === "ru";
  const months = isRu ? MONTHS_RU : MONTHS_EN;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Благоприятные Даты для Свадьбы 2026: Китайский Календарь" : "Auspicious Wedding Dates 2026: Chinese Calendar Guide"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Выберите лучшую дату для бракосочетания в 2026 году — год Огненной Лошади." : "Choose the best wedding date in 2026 — the Year of the Fire Horse."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "2026 — Год Лошади: Что Это Значит для Брака" : "2026 Year of the Horse: What It Means for Marriage"}</h2>
      {isRu ? (
        <>
          <p>2026 — год Огненной Лошади (丙午, bǐng wǔ). Лошадь в китайской культуре символизирует <strong>свободу, энергию, страсть и движение вперёд</strong>. Для брака это означает:</p>
          <ul>
            <li><strong>Плюсы:</strong> Энергичный старт, страстная связь, общие приключения, динамичный рост семьи.</li>
            <li><strong>Внимание:</strong> Лошадь независима — паре важно уважать личное пространство друг друга. Следите за импульсивностью в год Огня.</li>
          </ul>
          <p>Год Лошади особенно благоприятен для пар, где один из партнёров — Тигр, Собака или Коза (знаки, гармонирующие с Лошадью).</p>
        </>
      ) : (
        <>
          <p>2026 is the Year of the Fire Horse (丙午, bǐng wǔ). The Horse in Chinese culture symbolizes <strong>freedom, energy, passion, and forward momentum</strong>. For marriage, this means:</p>
          <ul>
            <li><strong>Pros:</strong> Energetic start, passionate connection, shared adventures, dynamic family growth.</li>
            <li><strong>Watch for:</strong> The Horse is independent — couples should respect each other&apos;s personal space. Guard against impulsiveness in a Fire year.</li>
          </ul>
          <p>The Horse year is especially auspicious for couples where one partner is a Tiger, Dog, or Goat (signs harmonious with Horse).</p>
        </>
      )}

      <h2>{isRu ? "Лучшие Месяцы для Свадьбы в 2026" : "Best Months for a 2026 Wedding"}</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {months.map((m) => (
          <div key={m.mo} className="card-classic p-3 text-sm">
            <p className="font-bold text-accent">{m.mo}</p>
            <p className="text-xs text-stone-500 mt-1">{m.notes}</p>
          </div>
        ))}
      </div>

      <h2>{isRu ? "Чего Избегать" : "What to Avoid"}</h2>
      {isRu ? (
        <ul>
          <li><strong>Месяц Призраков (август-сентябрь 2026):</strong> Седьмой лунный месяц — традиционно избегают для свадеб.</li>
          <li><strong>День вашего знака зодиака (犯太岁):</strong> Не назначайте свадьбу на день, конфликтующий с вашим знаком или знаком партнёра.</li>
          <li><strong>Дни разрушения (破日):</strong> В китайском альманахе отмечены как неблагоприятные для начинаний.</li>
          <li><strong>Похоронные и поминальные дни:</strong> Культурно неподходящие для празднования.</li>
        </ul>
      ) : (
        <ul>
          <li><strong>Ghost Month (Aug-Sep 2026):</strong> The 7th lunar month — traditionally avoided for weddings.</li>
          <li><strong>Your zodiac clash day (犯太岁):</strong> Don&apos;t schedule on a day that clashes with your or your partner&apos;s zodiac sign.</li>
          <li><strong>Destruction days (破日):</strong> Marked in the Chinese almanac as inauspicious for beginnings.</li>
          <li><strong>Funeral and memorial days:</strong> Culturally inappropriate for celebrations.</li>
        </ul>
      )}

      <h2>{isRu ? "Как Выбрать Идеальную Дату" : "How to Pick the Perfect Date"}</h2>
      {isRu ? (
        <>
          <p>Идеальная дата учитывает три фактора:</p>
          <ol>
            <li><strong>Ваши знаки зодиака:</strong> Дата не должна конфликтовать со знаками жениха и невесты.</li>
            <li><strong>Альманах Тун-Шу (通书):</strong> Традиционный календарь отмечает каждый день как благоприятный или нет для конкретных дел.</li>
            <li><strong>Личные элементы Ба-Цзы:</strong> Самый точный метод — дата, гармонирующая с вашими картами рождения.</li>
          </ol>
          <p>Наш сервис календаря учитывает все три фактора, чтобы найти даты, персонализированные для вас и вашего партнёра.</p>
        </>
      ) : (
        <>
          <p>The perfect date considers three factors:</p>
          <ol>
            <li><strong>Your zodiac signs:</strong> The date should not clash with the bride&apos;s or groom&apos;s zodiac sign.</li>
            <li><strong>Tong Shu almanac (通书):</strong> The traditional calendar marks each day as auspicious or not for specific activities.</li>
            <li><strong>Personal Ba-Zi elements:</strong> The most precise method — a date that harmonizes with both of your birth charts.</li>
          </ol>
          <p>Our calendar service considers all three factors to find dates personalized for you and your partner.</p>
        </>
      )}

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Какой месяц самый благоприятный для свадьбы в 2026?", a: "Октябрь — самый популярный месяц для свадеб в китайской традиции. Март и май 2026 также отличные варианты с сильной весенней энергией." },
        { q: "Можно ли жениться в год Лошади, если я Крыса?", a: "Да, но стоит выбрать дату особенно тщательно. Крыса и Лошадь в оппозиции, поэтому дата свадьбы должна гармонизировать эту энергию." },
        { q: "Нужно ли консультироваться с календарём, если мы не китайцы?", a: "Календарь основан на универсальных циклах природы. Многие пары по всему миру используют его для дополнительной уверенности в выборе даты." },
      ] : [
        { q: "Which month is most auspicious for a 2026 wedding?", a: "October is the most popular wedding month in Chinese tradition. March and May 2026 are also excellent choices with strong spring energy." },
        { q: "Can I marry in a Horse year if I'm a Rat?", a: "Yes, but choose your date especially carefully. Rat and Horse are in opposition, so the wedding date should harmonize this energy." },
        { q: "Do we need to consult the calendar if we're not Chinese?", a: "The calendar is based on universal natural cycles. Many couples worldwide use it for extra confidence in their date choice." },
      ]} />

      <div className="not-prose my-8 text-center">
        <Link href="/calendar" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Найти Свою Идеальную Дату — от $1" : "Find Your Perfect Wedding Date — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{isRu ? "Для культурного ознакомления." : "For cultural appreciation only."}</p>
    </article>
  );
}
