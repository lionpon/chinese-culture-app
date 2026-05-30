import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "Китайский Новый Год 2027: Год Козы — Даты, Традиции, Прогнозы | Chinese Culture Studio" : "Chinese New Year 2027: Year of the Goat — Dates, Traditions, Predictions | Chinese Culture Studio",
    description: isRu ? "Китайский Новый год 2027: когда начинается год Огненной Козы, традиции празднования, что готовить и какие прогнозы для каждого знака зодиака." : "Chinese New Year 2027: when the Year of the Fire Goat begins, celebration traditions, what to prepare, and zodiac predictions for every sign.",
    openGraph: { title: isRu ? "Китайский Новый Год 2027: Год Козы" : "Chinese New Year 2027: Year of the Goat", description: isRu ? "Даты, традиции и прогнозы на год Огненной Козы." : "Dates, traditions, and predictions for the Year of the Fire Goat." },
    robots: "index, follow",
  };
};

const PREDICTIONS_EN = [
  { sign: "Rat", forecast: "A steady year. Career opportunities in spring. Watch spending in summer. Good for building foundations." },
  { sign: "Ox", forecast: "Harmonious with Goat. Strong year for relationships and family. Professional recognition likely in the second half." },
  { sign: "Tiger", forecast: "A dynamic year. Travel and learning are favored. Caution with investments. Creative projects thrive." },
  { sign: "Rabbit", forecast: "Goat and Rabbit are friendly. Social life flourishes. Good year for collaboration and partnerships." },
  { sign: "Dragon", forecast: "A neutral year. Focus on health and routine. Steady progress rather than dramatic wins. Good for study." },
  { sign: "Snake", forecast: "Goat supports Snake's wisdom. Excellent for planning and strategy. Financial gains through careful choices." },
  { sign: "Horse", forecast: "Goat is Horse's best ally! An excellent year — luck in career, love, and creativity. One of the luckiest signs." },
  { sign: "Goat", forecast: "Your year (本命年)! Wear red for protection. A year of self-discovery. Be cautious with major decisions." },
  { sign: "Monkey", forecast: "A mixed year. Social opportunities abound but focus is needed. Good for networking, less so for solo work." },
  { sign: "Rooster", forecast: "A stable year. Hard work pays off. Good for career advancement. Watch health in winter." },
  { sign: "Dog", forecast: "A pleasant year. Emotional fulfillment. Good for home and family matters. Minor financial fluctuations." },
  { sign: "Pig", forecast: "Goat and Pig are harmonious. A joyful year with social celebrations. Good fortune in creative endeavors." },
];

const PREDICTIONS_RU = [
  { sign: "Крыса", forecast: "Стабильный год. Карьерные возможности весной. Следите за расходами летом. Хорошо для фундамента." },
  { sign: "Бык", forecast: "Гармония с Козой. Сильный год для отношений и семьи. Профессиональное признание во второй половине." },
  { sign: "Тигр", forecast: "Динамичный год. Путешествия и обучение благоприятны. Осторожность с инвестициями. Творчество процветает." },
  { sign: "Кролик", forecast: "Кролик и Коза дружественны. Социальная жизнь цветёт. Хороший год для партнёрства и коллабораций." },
  { sign: "Дракон", forecast: "Нейтральный год. Фокус на здоровье и режим. Стабильный прогресс. Хорошо для учёбы." },
  { sign: "Змея", forecast: "Коза поддерживает мудрость Змеи. Отлично для планирования и стратегии. Финансовые выгоды через осторожность." },
  { sign: "Лошадь", forecast: "Коза — лучший союзник Лошади! Отличный год — удача в карьере, любви и творчестве. Один из самых везучих знаков." },
  { sign: "Коза", forecast: "Ваш год (本命年)! Носите красное для защиты. Год самопознания. Осторожность с крупными решениями." },
  { sign: "Обезьяна", forecast: "Смешанный год. Много социальных возможностей, но нужен фокус. Хорошо для нетворкинга." },
  { sign: "Петух", forecast: "Стабильный год. Труд окупается. Хорошо для карьерного роста. Следите за здоровьем зимой." },
  { sign: "Собака", forecast: "Приятный год. Эмоциональное удовлетворение. Хорошо для дома и семьи. Небольшие финансовые колебания." },
  { sign: "Свинья", forecast: "Свинья и Коза гармоничны. Радостный год с праздниками. Удача в творческих начинаниях." },
];

export default function ChineseNewYear2027Guide({ params: { locale } }: Props) {
  const isRu = locale === "ru";
  const predictions = isRu ? PREDICTIONS_RU : PREDICTIONS_EN;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Китайский Новый Год 2027: Год Козы — Полный Гид" : "Chinese New Year 2027: Year of the Goat — Complete Guide"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Всё о китайском Новом годе 2027: дата, традиции, еда и прогнозы для каждого знака зодиака." : "Everything about Chinese New Year 2027: date, traditions, food, and zodiac predictions for every sign."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Когда Китайский Новый Год 2027?" : "When Is Chinese New Year 2027?"}</h2>
      {isRu ? (
        <>
          <p>Китайский Новый год 2027 выпадает на <strong>6 февраля 2027 года</strong>. Это начало года Огненной Козы (丁未, dīng wèi). Празднование длится 15 дней и завершается Фестивалем Фонарей 20 февраля 2027.</p>
          <p>Канун Нового года — 5 февраля 2027, время для традиционного семейного ужина (年夜饭).</p>
        </>
      ) : (
        <>
          <p>Chinese New Year 2027 falls on <strong>February 6, 2027</strong>. This marks the beginning of the Year of the Fire Goat (丁未, dīng wèi). The celebration lasts 15 days, ending with the Lantern Festival on February 20, 2027.</p>
          <p>New Year&apos;s Eve is February 5, 2027 — time for the traditional reunion dinner (年夜饭).</p>
        </>
      )}

      <h2>{isRu ? "Год Козы: Символика и Энергия" : "Year of the Goat: Symbolism & Energy"}</h2>
      {isRu ? (
        <>
          <p>Коза (羊, yáng) — восьмой знак китайского зодиака. Она символизирует <strong>мягкость, творчество, сочувствие и стойкость</strong>. В отличие от агрессивных знаков, Коза достигает целей через гармонию и настойчивость.</p>
          <p>2027 — год Огненной Козы. Огонь придаёт Козе дополнительную энергию и харизму. Это год для:</p>
          <ul>
            <li><strong>Творческих проектов:</strong> Коза — самый артистичный знак зодиака. Прекрасное время для искусства, музыки и дизайна.</li>
            <li><strong>Укрепления отношений:</strong> Коза ценит семью и сообщество — идеальный год для сближения.</li>
            <li><strong>Самозаботы:</strong> Энергия Козы мягкая — не перегружайте себя, находите время для отдыха.</li>
          </ul>
        </>
      ) : (
        <>
          <p>The Goat (羊, yáng) is the eighth sign of the Chinese zodiac. It symbolizes <strong>gentleness, creativity, empathy, and resilience</strong>. Unlike aggressive signs, the Goat achieves goals through harmony and persistence.</p>
          <p>2027 is a Fire Goat year. Fire gives the Goat extra energy and charisma. This is a year for:</p>
          <ul>
            <li><strong>Creative projects:</strong> The Goat is the most artistic zodiac sign. Excellent time for art, music, and design.</li>
            <li><strong>Strengthening relationships:</strong> The Goat values family and community — a perfect year for bonding.</li>
            <li><strong>Self-care:</strong> Goat energy is gentle — don&apos;t overload yourself, make time for rest.</li>
          </ul>
        </>
      )}

      <h2>{isRu ? "Традиции и Обычаи" : "Traditions & Customs"}</h2>
      {isRu ? (
        <ol>
          <li><strong>Уборка дома (大扫除):</strong> За несколько дней до Нового года — вымести неудачу и освободить место для удачи.</li>
          <li><strong>Красные конверты (红包):</strong> Деньги в красных конвертах дарят детям и неженатым — символ благословения и удачи.</li>
          <li><strong>Новогодний ужин (年夜饭):</strong> Рыба (изобилие), пельмени (богатство), клейкий рис (единство) — каждое блюдо символично.</li>
          <li><strong>Фейерверки и петарды:</strong> Отпугивают злых духов и приветствуют Новый год.</li>
          <li><strong>Фестиваль Фонарей (元宵节):</strong> 15-й день — завершение праздника с фонарями и клейкими шариками танъюань.</li>
        </ol>
      ) : (
        <ol>
          <li><strong>House cleaning (大扫除):</strong> Days before New Year — sweep away bad luck and make room for good fortune.</li>
          <li><strong>Red envelopes (红包):</strong> Money in red envelopes given to children and unmarried adults — a blessing of luck.</li>
          <li><strong>Reunion dinner (年夜饭):</strong> Fish (abundance), dumplings (wealth), sticky rice (unity) — every dish is symbolic.</li>
          <li><strong>Fireworks and firecrackers:</strong> Scare away evil spirits and welcome the New Year.</li>
          <li><strong>Lantern Festival (元宵节):</strong> Day 15 — ends the celebration with lanterns and sweet glutinous rice balls (tāngyuán).</li>
        </ol>
      )}

      <h2>{isRu ? "Прогнозы для Каждого Знака в 2027" : "2027 Predictions for Each Zodiac Sign"}</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {predictions.map((p) => (
          <div key={p.sign} className="card-classic p-3 text-sm">
            <p className="font-bold text-accent">{p.sign}</p>
            <p className="text-xs text-stone-500 mt-1">{p.forecast}</p>
          </div>
        ))}
      </div>

      <h2>{isRu ? "Что Приготовить на Новый Год" : "What to Prepare for New Year"}</h2>
      {isRu ? (
        <ul>
          <li><strong>Рыба (鱼, yú):</strong> Оставьте немного — символ изобилия, переходящего в следующий год.</li>
          <li><strong>Пельмени (饺子, jiǎozi):</strong> Форма как у древних золотых слитков — к богатству.</li>
          <li><strong>Весенние рулеты (春卷, chūnjuǎn):</strong> Золотистые и хрустящие — символ золотых слитков.</li>
          <li><strong>Рисовый пирог (年糕, niángāo):</strong> Название звучит как «год выше» — к повышению и росту.</li>
          <li><strong>Клейкие рисовые шарики (汤圆, tāngyuán):</strong> Круглые — символ семейного единства и полноты.</li>
        </ul>
      ) : (
        <ul>
          <li><strong>Fish (鱼, yú):</strong> Leave some leftover — symbolizes abundance carrying into the next year.</li>
          <li><strong>Dumplings (饺子, jiǎozi):</strong> Shaped like ancient gold ingots — for wealth.</li>
          <li><strong>Spring rolls (春卷, chūnjuǎn):</strong> Golden and crispy — symbolizing gold bars.</li>
          <li><strong>Rice cake (年糕, niángāo):</strong> The name sounds like &quot;year higher&quot; — for promotion and growth.</li>
          <li><strong>Glutinous rice balls (汤圆, tāngyuán):</strong> Round — symbolizing family unity and completeness.</li>
        </ul>
      )}

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Почему дата китайского Нового года меняется?", a: "Китайский календарь — лунно-солнечный. Новый год выпадает на второе новолуние после зимнего солнцестояния, между 21 января и 20 февраля." },
        { q: "Что надеть на китайский Новый год?", a: "Красное! Красный цвет отпугивает злых духов и приносит удачу. Избегайте чёрного и белого (цвета траура). В год Козы — ваш знак (если вы Коза), носите красное бельё для защиты." },
        { q: "Можно ли мыть голову в Новый год?", a: "По традиции нельзя мыть голову или убираться в первый день — можно «смыть» удачу. Уборку делают заранее." },
      ] : [
        { q: "Why does the Chinese New Year date change?", a: "The Chinese calendar is lunisolar. New Year falls on the second new moon after the winter solstice, between January 21 and February 20." },
        { q: "What to wear for Chinese New Year?", a: "Red! Red wards off evil spirits and brings luck. Avoid black and white (mourning colors). In your zodiac year (if you're a Goat), wear red underwear for protection." },
        { q: "Can I wash my hair on New Year's Day?", a: "Traditionally no — washing hair or cleaning on Day 1 may wash away good luck. Clean beforehand." },
      ]} />

      <div className="not-prose my-8 text-center">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Узнать Свой Прогноз на 2027 — от $1" : "Get Your 2027 I Ching Forecast — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{isRu ? "Для культурного ознакомления." : "For cultural appreciation only."}</p>
    </article>
  );
}
