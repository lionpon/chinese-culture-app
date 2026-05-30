import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "И-Цзин для Начинающих: Как Гадать на Книге Перемен | Chinese Culture Studio" : "I Ching for Beginners: How to Consult the Book of Changes | Chinese Culture Studio",
    description: isRu ? "Пошаговое руководство для начинающих: как задать вопрос, бросить монеты и понять гексаграмму И-Цзин. Древняя мудрость для современных решений." : "A step-by-step beginner's guide: how to ask a question, cast coins, and understand an I Ching hexagram. Ancient wisdom for modern decisions.",
    openGraph: { title: isRu ? "И-Цзин для Начинающих" : "I Ching for Beginners", description: isRu ? "Как гадать на И-Цзин: руководство с нуля." : "How to consult the I Ching: a guide from scratch." },
    robots: "index, follow",
  };
}

export default function IChingBeginnerGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "И-Цзин для Начинающих: Как Гадать на Книге Перемен" : "I Ching for Beginners: How to Consult the Book of Changes"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Полное руководство для новичков — от формулировки вопроса до интерпретации гексаграммы." : "A complete beginner's walkthrough — from forming your question to interpreting your hexagram."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Что Такое И-Цзин?" : "What Is the I Ching?"}</h2>
      {isRu ? (
        <p>И-Цзин (易经, Yì Jīng), или Книга Перемен — один из древнейших китайских классических текстов, которому более 3000 лет. Это одновременно оракул и философский трактат. И-Цзин состоит из 64 гексаграмм — шестилинейных фигур, каждая из которых представляет архетипическую ситуацию. Линии могут быть сплошными (ян) или прерывистыми (инь), а некоторые становятся «меняющимися», создавая вторую гексаграмму, показывающую развитие ситуации.</p>
      ) : (
        <p>The I Ching (易经, Yì Jīng), or Book of Changes, is one of the oldest Chinese classical texts, over 3,000 years old. It is both an oracle and a philosophical treatise. The I Ching consists of 64 hexagrams — six-line figures, each representing an archetypal situation. Lines can be solid (yang) or broken (yin), and some become &quot;changing lines,&quot; creating a second hexagram that shows how the situation evolves.</p>
      )}

      <h2>{isRu ? "Как Задать Вопрос" : "How to Ask a Question"}</h2>
      {isRu ? (
        <>
          <p>И-Цзин лучше всего отвечает на <strong>открытые вопросы</strong> о ситуациях, а не на вопросы «да/нет». Хорошие примеры:</p>
          <ul>
            <li>«Что мне нужно знать о смене работы?»</li>
            <li>«Как лучше подойти к этим отношениям?»</li>
            <li>«На чём мне сосредоточиться в этом месяце?»</li>
          </ul>
          <p>Избегайте вопросов вроде «Получу ли я работу?» — вместо этого спросите: «Что поможет мне найти правильную работу?»</p>
        </>
      ) : (
        <>
          <p>The I Ching answers <strong>open-ended questions</strong> about situations best — not yes/no questions. Good examples:</p>
          <ul>
            <li>&quot;What do I need to know about changing jobs?&quot;</li>
            <li>&quot;How should I approach this relationship?&quot;</li>
            <li>&quot;What should I focus on this month?&quot;</li>
          </ul>
          <p>Avoid questions like &quot;Will I get the job?&quot; — instead ask: &quot;What would help me find the right job?&quot;</p>
        </>
      )}

      <h2>{isRu ? "Три Способа Гадания" : "Three Casting Methods"}</h2>

      <h3>{isRu ? "1. Три Монеты (Традиционный)" : "1. Three Coins (Traditional)"}</h3>
      {isRu ? (
        <p>Самый распространённый метод. Возьмите три монеты. Назначьте сторонам значения: орёл = 3 (ян), решка = 2 (инь). Бросьте все три — сумма даёт тип линии (6, 7, 8 или 9). Повторите 6 раз, строя гексаграмму снизу вверх. Линии 6 и 9 — меняющиеся.</p>
      ) : (
        <p>The most common method. Take three coins. Assign values: heads = 3 (yang), tails = 2 (yin). Toss all three — the sum gives the line type (6, 7, 8, or 9). Repeat 6 times, building the hexagram from bottom to top. Lines of 6 and 9 are changing lines.</p>
      )}

      <h3>{isRu ? "2. Стебли Тысячелистника (Классический)" : "2. Yarrow Stalks (Classical)"}</h3>
      {isRu ? (
        <p>Традиционный метод с 50 стеблями тысячелистника. Сложный ритуал, занимающий 15-20 минут. Каждое бросание требует нескольких разделений и подсчётов. Считается более медитативным и точным.</p>
      ) : (
        <p>The traditional method using 50 yarrow stalks. A complex ritual taking 15-20 minutes. Each casting involves multiple divisions and counts. Considered more meditative and precise.</p>
      )}

      <h3>{isRu ? "3. Онлайн / Числовой (Современный)" : "3. Online / Numerical (Modern)"}</h3>
      {isRu ? (
        <p>Наш онлайн-инструмент использует проверенный числовой метод. Вы можете ввести свои числа или позволить системе сгенерировать их. Результат идентичен методу монет — гексаграмма с меняющимися линиями и производной гексаграммой.</p>
      ) : (
        <p>Our online tool uses a proven numerical method. You can input your own numbers or let the system generate them. The result is identical to the coin method — a hexagram with changing lines and a derived hexagram.</p>
      )}

      <h2>{isRu ? "Как Читать Гексаграмму" : "How to Read a Hexagram"}</h2>
      {isRu ? (
        <ol>
          <li><strong>Название и номер:</strong> Каждая из 64 гексаграмм имеет имя, отражающее её суть (например, Гексаграмма 1: «Творчество»).</li>
          <li><strong>Суждение (卦辞):</strong> Основной вердикт — описывает общую ситуацию и правильное отношение.</li>
          <li><strong>Образ (象辞):</strong> Символическое значение триграмм, составляющих гексаграмму.</li>
          <li><strong>Меняющиеся линии (爻辞):</strong> Если есть линии 6 или 9 — читайте текст для каждой из них. Это конкретные советы для вашей ситуации.</li>
          <li><strong>Производная гексаграмма:</strong> После изменения линий образуется вторая гексаграмма — она показывает, к чему идёт ситуация.</li>
        </ol>
      ) : (
        <ol>
          <li><strong>Name and number:</strong> Each of the 64 hexagrams has a name reflecting its essence (e.g., Hexagram 1: &quot;The Creative&quot;).</li>
          <li><strong>Judgment (卦辞):</strong> The main verdict — describes the overall situation and the correct attitude.</li>
          <li><strong>Image (象辞):</strong> The symbolic meaning of the two trigrams that compose the hexagram.</li>
          <li><strong>Changing lines (爻辞):</strong> If you have lines of 6 or 9 — read the text for each. These are specific guidance for your situation.</li>
          <li><strong>Derived hexagram:</strong> After changing lines, a second hexagram forms — this shows where the situation is heading.</li>
        </ol>
      )}

      <h2>{isRu ? "Советы для Начинающих" : "Tips for Beginners"}</h2>
      {isRu ? (
        <ul>
          <li>Начинайте с одного вопроса за сеанс.</li>
          <li>Записывайте свои вопросы и результаты — со временем увидите паттерны.</li>
          <li>Не переспрашивайте один и тот же вопрос многократно — И-Цзин даёт совет, а не предсказание.</li>
          <li>Медитируйте над ответом несколько минут, прежде чем искать «правильную» интерпретацию.</li>
        </ul>
      ) : (
        <ul>
          <li>Start with one question per session.</li>
          <li>Keep a journal of your questions and results — you will see patterns over time.</li>
          <li>Don&apos;t re-ask the same question repeatedly — the I Ching gives counsel, not prediction.</li>
          <li>Meditate on the answer for a few minutes before looking up the &quot;correct&quot; interpretation.</li>
        </ul>
      )}

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Нужно ли верить в И-Цзин, чтобы он работал?", a: "Нет. Многие используют И-Цзин как инструмент размышления — он предлагает новые перспективы, а не сверхъестественные пророчества. Психолог Карл Юнг считал его инструментом синхронистичности." },
        { q: "Сколько раз можно гадать в день?", a: "Рекомендуется один вопрос за сеанс. Традиция советует не более трёх гаданий в день — И-Цзин лучше всего работает при умеренном использовании." },
        { q: "Что если у меня нет монет?", a: "Вы можете использовать наш бесплатный онлайн-инструмент — он использует тот же математический принцип, что и метод монет." },
      ] : [
        { q: "Do I need to believe in the I Ching for it to work?", a: "No. Many use the I Ching as a reflection tool — it offers fresh perspectives, not supernatural prophecy. Psychologist Carl Jung saw it as a tool of synchronicity." },
        { q: "How many times can I consult it per day?", a: "One question per session is recommended. Tradition advises no more than three consultations per day — the I Ching works best with moderate use." },
        { q: "What if I don't have coins?", a: "You can use our free online tool — it uses the same mathematical principle as the coin method." },
      ]} />

      <div className="not-prose my-8 text-center">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Попробовать И-Цзин Сейчас — от $1" : "Try the I Ching Now — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{isRu ? "Для культурного ознакомления." : "For cultural appreciation only."}</p>
    </article>
  );
}
