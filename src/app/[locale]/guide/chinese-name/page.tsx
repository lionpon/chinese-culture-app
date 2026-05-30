import type { Metadata } from "next";
import { Link } from "@/navigation";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu
      ? "Полный Гид по Китайским Именам: Пять Элементов, Ба-цзы и Классическая Поэзия | Chinese Culture Studio"
      : "How to Choose an Authentic Chinese Name — A Complete Guide",
    description: isRu
      ? "Узнайте искусство китайского именования на основе Пяти Элементов, И-Цзин и классической поэзии. Найдите имя, балансирующее звучание, значение и судьбу."
      : "Learn the art of Chinese naming based on Five Elements, I Ching, and classical poetry. Discover how to find a name that balances sound, meaning, and destiny.",
    openGraph: {
      title: isRu ? "Полный Гид по Китайским Именам | Chinese Culture Studio" : "How to Choose an Authentic Chinese Name",
      description: isRu ? "Искусство китайского именования: Пять Элементов, Ба-цзы и классическая поэзия." : "Learn Chinese naming based on Five Elements, I Ching, and classical poetry.",
    },
    robots: "index, follow",
  };
}

export default function ChineseNameGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Как Выбрать Подлинное Китайское Имя" : "How to Choose an Authentic Chinese Name"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu
          ? "Искусство китайского именования — от классических текстов до современной жизни."
          : "A guide to the ancient art of Chinese naming — from classical texts to modern life."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Почему Китайские Имена Важны" : "Why Chinese Names Matter"}</h2>
      {isRu ? (
        <>
          <p>В китайской культуре имя — это не просто ярлык. Оно несёт надежды родителей, наследие семьи и видение вашей судьбы. Хорошо подобранное имя, как считается, приносит баланс Пяти Элементов (дерево, огонь, земля, металл, вода), гармонизирует с датой рождения и вдохновляет на успех в жизни.</p>
          <p>В отличие от западных имён, китайские имена тщательно конструируются с использованием принципов классической поэзии, И-Цзин (Книги Перемен) и теории Инь-Ян и Пяти Элементов.</p>
        </>
      ) : (
        <>
          <p>In Chinese culture, a name is not just a label — it carries your parents&apos; hopes, your family&apos;s heritage, and a vision of your destiny. A well-chosen name is believed to bring balance to the Five Elements (wood, fire, earth, metal, water), harmonize with your birth date, and inspire success in life.</p>
          <p>Unlike Western names that parents choose mainly by sound or family tradition, Chinese names are carefully constructed using principles from classical poetry, the I Ching (Book of Changes), and the theory of Yin-Yang and Five Elements.</p>
        </>
      )}

      <h2>{isRu ? "Структура Китайского Имени" : "The Structure of a Chinese Name"}</h2>
      <p>{isRu ? "Полное китайское имя состоит из двух частей:" : "A full Chinese name consists of two parts:"}</p>
      <ul>
        <li><strong>{isRu ? "Фамилия (姓)" : "Family name (姓)"}</strong> — {isRu ? "наследуется от отца, обычно один иероглиф (например, 李 Li, 王 Wang, 张 Zhang)" : "inherited from the father, usually one character (e.g., 李 Li, 王 Wang, 张 Zhang)"}</li>
        <li><strong>{isRu ? "Имя (名)" : "Given name (名)"}</strong> — {isRu ? "выбирается родителями, обычно один или два иероглифа (например, 伟 Wei, 小雅 Xiaoya)" : "chosen by parents, typically one or two characters (e.g., 伟 Wei, 小雅 Xiaoya)"}</li>
      </ul>
      <p>{isRu ? "Полное имя выглядит как: " : "So a complete name looks like: "}<strong>李伟 (Li Wei)</strong> {isRu ? "или" : "or"} <strong>王小明 (Wang Xiaoming)</strong>.</p>

      <h2>{isRu ? "Методы Выбора Имени: 5 Классических Подходов" : "How Chinese Names Are Chosen: The 5 Classical Methods"}</h2>

      <h3>{isRu ? "1. Баланс Пяти Элементов (五行)" : "1. Five Elements (五行) Balancing"}</h3>
      {isRu ? (
        <p>Это самый распространённый метод. Мастер имён анализирует дату и время рождения (Ба-цзы), чтобы определить, какой из Пяти Элементов в недостатке или избытке. Затем подбираются иероглифы, несущие нужный элемент: Дерево (木) — рост, жизненная сила; Огонь (火) — тепло, яркость; Земля (土) — стабильность; Металл (金) — сила, утончённость; Вода (水) — мудрость, адаптивность.</p>
      ) : (
        <p>This is the most common method. A naming expert analyzes the birth date and time (Bazi) to determine which of the Five Elements is lacking or excessive. The name is then crafted using characters that carry the needed element: Wood (木) — growth, vitality; Fire (火) — warmth, brilliance; Earth (土) — stability; Metal (金) — strength, refinement; Water (水) — wisdom, adaptability.</p>
      )}

      <h3>{isRu ? "2. Классическая Поэзия (诗经/楚辞)" : "2. Classical Poetry (诗经/楚辞)"}</h3>
      {isRu ? (
        <p>Родители часто обращаются к древней поэзии. «Шицзин» (Книга Песен) и «Чу Цы» (Чуские Строфы) — два самых уважаемых источника. Имена из поэзии несут культурную глубину и литературную красоту. Примеры: 徽因 (Huiyin) — из «Шицзин», 思成 (Sicheng) — из «Шуцзин».</p>
      ) : (
        <p>Chinese parents often turn to ancient poetry. The Book of Songs (诗经) and Songs of Chu (楚辞) are the two most respected sources. Names drawn from poetry carry cultural depth and literary beauty. Examples: 徽因 (Huiyin) — from 诗经, 思成 (Sicheng) — from 尚书.</p>
      )}

      <h3>{isRu ? "3. Родовое Имя (辈分)" : "3. Generation Name (辈分)"}</h3>
      {isRu ? (
        <p>Многие семьи следуют родовому стихотворению (字辈诗), где каждое поколение разделяет определённый иероглиф в имени. Это создаёт семейное древо, которое можно прочитать по именам.</p>
      ) : (
        <p>Many families follow a generation poem (字辈诗), where each generation shares a specific character in their name. This creates a family tree that you can read by looking at names.</p>
      )}

      <h3>{isRu ? "4. Благоприятное Значение" : "4. Auspicious Meaning"}</h3>
      {isRu ? (
        <p>Родители выбирают иероглифы с положительным значением: 智 (мудрость), 勇 (смелость), 美 (красота), 康 (здоровье), 安 (мир), 乐 (радость). Сочетание иероглифов должно звучать гармонично при произнесении.</p>
      ) : (
        <p>Parents choose characters with positive meanings: 智 (wisdom), 勇 (courage), 美 (beauty), 康 (health), 安 (peace), 乐 (happiness). The combination should also sound harmonious when spoken aloud.</p>
      )}

      <h3>{isRu ? "5. Баланс Звучания и Тонов" : "5. Sound and Tone Balance"}</h3>
      {isRu ? (
        <p>В мандаринском четыре тона. Хорошее имя балансирует тона, чтобы звучать музыкально. Иероглифы также должны избегать неудачных омофонов — имя, звучащее как оскорбление в любом китайском диалекте, неприемлемо.</p>
      ) : (
        <p>Mandarin has four tones. A good name balances the tones so it sounds musical, not flat. Characters should also avoid unfortunate homophones — a name that sounds like an insult in any major Chinese dialect.</p>
      )}

      <h2>{isRu ? "Получите Ваше Подлинное Китайское Имя" : "Get Your Authentic Chinese Name"}</h2>
      {isRu ? (
        <p>В Chinese Culture Studio наш инструмент имён черпает из классических текстов и теории Пяти Элементов, создавая персонализированные китайские имена на основе ваших предпочтений. Каждое чтение включает иероглифы, произношение, значение и культурный контекст.</p>
      ) : (
        <p>At Chinese Culture Studio, our naming tool draws from classical texts and Five Elements theory to generate personalized Chinese names based on your preferences. Each reading includes the characters, pronunciation, meaning, and cultural background.</p>
      )}

      <div className="not-prose my-8">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Создать Китайское Имя — от $1" : "Create Your Chinese Name — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">
        {isRu ? "Только для культурного ознакомления. Не является профессиональной консультацией." : "For cultural appreciation only. Not professional advice."}
      </p>
    </article>
  );
}
