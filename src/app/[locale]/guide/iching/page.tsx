import type { Metadata } from "next";
import { Link } from "@/navigation";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu
      ? "И-Цзин Гадание: Руководство для Начинающих по Книге Перемен | Chinese Culture Studio"
      : "I Ching Divination: A Beginner's Guide to the Book of Changes",
    description: isRu
      ? "Что такое И-Цзин (Книга Перемен) и как работает гадание? Узнайте о гексаграммах, меняющихся линиях и толковании."
      : "What is the I Ching (Yijing) and how does divination work? Learn about hexagrams, changing lines, and how to interpret your reading.",
    openGraph: {
      title: isRu ? "И-Цзин Гадание: Руководство для Начинающих" : "I Ching Divination: A Beginner's Guide",
      description: isRu ? "Что такое И-Цзин и как работают гексаграммы. Полное руководство." : "What is the I Ching and how do hexagrams work. Complete guide.",
    },
    robots: "index, follow",
  };
}

export default function IChingGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "И-Цзин: Руководство для Начинающих" : "I Ching Divination: A Beginner's Guide"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu
          ? "Понимание 3000-летней Книги Перемен — от бросания монет до толкования гексаграмм."
          : "Understanding the 3,000-year-old Book of Changes — from tossing coins to interpreting hexagrams."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Что Такое И-Цзин?" : "What is the I Ching?"}</h2>
      {isRu ? (
        <>
          <p>И-Цзин (易经), или Книга Перемен, — один из древнейших китайских классических текстов, насчитывающий более 3000 лет. Первоначально руководство по гаданию для правителей династии Чжоу, он превратился в глубокое философское произведение, повлиявшее на конфуцианство, даосизм и китайскую мысль на тысячелетия.</p>
          <p>В своей основе И-Цзин — это система из 64 гексаграмм — шестилинейных символов, представляющих фундаментальные паттерны изменений во вселенной. Каждая гексаграмма описывает конкретную ситуацию или жизненный этап вместе с советом, как через него пройти.</p>
        </>
      ) : (
        <>
          <p>The I Ching (易经), or Book of Changes, is one of the oldest Chinese classical texts, dating back over 3,000 years. Originally a divination manual for Zhou dynasty rulers, it evolved into a profound philosophical work that influenced Confucianism, Taoism, and Chinese thought for millennia.</p>
          <p>At its core, the I Ching is a system of 64 hexagrams — six-line symbols representing fundamental patterns of change in the universe. Each hexagram describes a specific situation or life stage, along with advice on how to navigate it.</p>
        </>
      )}

      <h2>{isRu ? "Как Работает Гадание И-Цзин?" : "How Does I Ching Divination Work?"}</h2>
      {isRu ? (
        <p>Вы задаёте вопрос, бросаете шесть линий (используя монеты или стебли тысячелистника) и получаете гексаграмму. И-Цзин «отвечает» через текст гексаграммы — но в отличие от гадания, она не предсказывает будущее. Вместо этого она раскрывает скрытую динамику вашей ситуации и предлагает мудрейший образ действий.</p>
      ) : (
        <p>You ask a question, cast six lines (using coins or yarrow stalks), and receive a hexagram. The I Ching then &quot;answers&quot; through the hexagram&apos;s text — but unlike fortune-telling, it doesn&apos;t predict the future. Instead, it reveals the underlying dynamics of your situation and suggests the wisest course of action.</p>
      )}

      <h2>{isRu ? "Структура Гексаграммы (卦)" : "The Structure of a Hexagram (卦, Gua)"}</h2>
      <ul>
        <li><strong>{isRu ? "6 линий (爻, Яо)" : "6 lines (爻, Yao)"}</strong> — {isRu ? "каждая линия либо сплошная (Ян, активная), либо прерывистая (Инь, восприимчивая)" : "each line is either solid (Yang, active) or broken (Yin, receptive)"}</li>
        <li><strong>{isRu ? "2 триграммы (верхняя + нижняя)" : "2 trigrams (upper + lower)"}</strong> — {isRu ? "каждая представляет природную силу: Небо, Земля, Гром, Гора, Вода, Огонь, Озеро, Ветер" : "each represents a natural force: Heaven, Earth, Thunder, Mountain, Water, Fire, Lake, Wind"}</li>
        <li><strong>{isRu ? "Суждение (卦辞)" : "The Judgment (卦辞)"}</strong> — {isRu ? "основной оракульный текст" : "the main oracular text"}</li>
        <li><strong>{isRu ? "Утверждения Линий (爻辞)" : "Line Statements (爻辞)"}</strong> — {isRu ? "конкретный совет для каждой меняющейся линии" : "specific advice for each changing line"}</li>
      </ul>

      <h2>{isRu ? "8 Триграмм (八卦, Багуа)" : "The 8 Trigrams (八卦, Bagua)"}</h2>
      <table className="w-full text-sm border-collapse not-prose my-4">
        <thead><tr className="border-b border-stone-200"><th className="text-left py-2 pr-4">{isRu ? "Название" : "Name"}</th><th className="text-left py-2 pr-4">{isRu ? "Китайский" : "Chinese"}</th><th className="text-left py-2 pr-4">{isRu ? "Природа" : "Nature"}</th><th className="text-left py-2">{isRu ? "Символ" : "Symbol"}</th></tr></thead>
        <tbody>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Qian</td><td className="py-2 pr-4">乾</td><td className="py-2 pr-4">{isRu ? "Небо" : "Heaven"}</td><td className="py-2">☰</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Kun</td><td className="py-2 pr-4">坤</td><td className="py-2 pr-4">{isRu ? "Земля" : "Earth"}</td><td className="py-2">☷</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Zhen</td><td className="py-2 pr-4">震</td><td className="py-2 pr-4">{isRu ? "Гром" : "Thunder"}</td><td className="py-2">☳</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Gen</td><td className="py-2 pr-4">艮</td><td className="py-2 pr-4">{isRu ? "Гора" : "Mountain"}</td><td className="py-2">☶</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Kan</td><td className="py-2 pr-4">坎</td><td className="py-2 pr-4">{isRu ? "Вода" : "Water"}</td><td className="py-2">☵</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Li</td><td className="py-2 pr-4">离</td><td className="py-2 pr-4">{isRu ? "Огонь" : "Fire"}</td><td className="py-2">☲</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Dui</td><td className="py-2 pr-4">兑</td><td className="py-2 pr-4">{isRu ? "Озеро" : "Lake"}</td><td className="py-2">☱</td></tr>
          <tr><td className="py-2 pr-4">Xun</td><td className="py-2 pr-4">巽</td><td className="py-2 pr-4">{isRu ? "Ветер" : "Wind"}</td><td className="py-2">☴</td></tr>
        </tbody>
      </table>

      <h2>{isRu ? "Как Бросить Гексаграмму" : "How to Cast a Hexagram"}</h2>
      <ol>
        <li>{isRu ? "Возьмите 3 монеты и сосредоточьтесь на вопросе" : "Hold 3 coins and focus on your question"}</li>
        <li>{isRu ? "Бросьте монеты 6 раз (снизу вверх)" : "Toss the coins 6 times (from bottom to top)"}</li>
        <li>{isRu ? "Посчитайте: 3 орла = старый Ян (меняющийся), 2 орла = молодой Ян, 2 решки = молодая Инь, 3 решки = старая Инь (меняющаяся)" : "Count each toss: 3 heads = old Yang (changing), 2 heads = young Yang, 2 tails = young Yin, 3 tails = old Yin (changing)"}</li>
        <li>{isRu ? "Постройте гексаграмму — первый бросок = нижняя линия" : "Build your hexagram — first toss = bottom line"}</li>
        <li>{isRu ? "Прочитайте текст гексаграммы и меняющиеся линии" : "Read the hexagram text and any changing lines"}</li>
      </ol>

      <h2>{isRu ? "Попробуйте Гадание И-Цзин" : "Try an I Ching Reading"}</h2>
      {isRu ? (
        <p>Наш онлайн-инструмент И-Цзин выполняет бросание монет за вас и предоставляет чёткое толкование вашей гексаграммы с историческим контекстом и практическим советом.</p>
      ) : (
        <p>Our online I Ching tool handles the coin-tossing for you and provides a clear interpretation of your hexagram with historical context and practical advice.</p>
      )}

      <div className="not-prose my-8">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Задать Вопрос И-Цзин — от $1" : "Consult the I Ching — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">
        {isRu ? "Только для культурного ознакомления. Не является профессиональной консультацией." : "For cultural appreciation only. Not professional advice."}
      </p>
    </article>
  );
}
