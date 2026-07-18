import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whyTitle: string; whyBody1: string; whyBody2: string;
  structTitle: string; structIntro: string;
  famLabel: string; famDesc: string;
  givenLabel: string; givenDesc: string;
  structExample: string;
  methodsTitle: string;
  m1Title: string; m1Body: string;
  m2Title: string; m2Body: string;
  m3Title: string; m3Body: string;
  m4Title: string; m4Body: string;
  m5Title: string; m5Body: string;
  getTitle: string; getBody: string;
  faqs: { q: string; a: string }[];
  cta: string; disclaimer: string;
}> = {
  en: {
    title: "How to Choose a Chinese Name: 5 Elements, Bazi & Classical Poetry Guide | Chinese Culture Studio",
    desc: "Step-by-step guide to Chinese naming traditions. Learn how Five Elements, Bazi astrology, and classical poetry create names that balance meaning, sound & destiny. Try our free name generator.",
    ogTitle: "How to Choose a Chinese Name (2026 Complete Guide)",
    ogDesc: "Learn Chinese naming: Five Elements, Bazi, classical poetry. How to pick a name that balances meaning and destiny. Free name generator.",
    heading: "How to Choose an Authentic Chinese Name",
    subtitle: "A guide to the ancient art of Chinese naming — from classical texts to modern life.",
    whyTitle: "Why Chinese Names Matter",
    whyBody1: "In Chinese culture, a name is not just a label — it carries your parents' hopes, your family's heritage, and a vision of your destiny. A well-chosen name is believed to bring balance to the Five Elements (wood, fire, earth, metal, water), harmonize with your birth date, and inspire success in life.",
    whyBody2: "Unlike Western names that parents choose mainly by sound or family tradition, Chinese names are carefully constructed using principles from classical poetry, the I Ching (Book of Changes), and the theory of Yin-Yang and Five Elements.",
    structTitle: "The Structure of a Chinese Name",
    structIntro: "A full Chinese name consists of two parts:",
    famLabel: "Family name (姓)",
    famDesc: "inherited from the father, usually one character (e.g., 李 Li, 王 Wang, 张 Zhang)",
    givenLabel: "Given name (名)",
    givenDesc: "chosen by parents, typically one or two characters (e.g., 伟 Wei, 小雅 Xiaoya)",
    structExample: "So a complete name looks like: <strong>李伟 (Li Wei)</strong> or <strong>王小明 (Wang Xiaoming)</strong>.",
    methodsTitle: "How Chinese Names Are Chosen: 5 Classical Methods",
    m1Title: "1. Five Elements (五行) Balancing",
    m1Body: "This is the most common method. A naming expert analyzes the birth date and time (Bazi) to determine which of the Five Elements is lacking or excessive. The name is then crafted using characters that carry the needed element: Wood (木) — growth, vitality; Fire (火) — warmth, brilliance; Earth (土) — stability; Metal (金) — strength, refinement; Water (水) — wisdom, adaptability.",
    m2Title: "2. Classical Poetry (诗经/楚辞)",
    m2Body: "Chinese parents often turn to ancient poetry. The Book of Songs (诗经) and Songs of Chu (楚辞) are the two most respected sources. Names drawn from poetry carry cultural depth and literary beauty. Examples: 徽因 (Huiyin) — from 诗经, 思成 (Sicheng) — from 尚书.",
    m3Title: "3. Generation Name (辈分)",
    m3Body: "Many families follow a generation poem (字辈诗), where each generation shares a specific character in their name. This creates a family tree that you can read by looking at names.",
    m4Title: "4. Auspicious Meaning",
    m4Body: "Parents choose characters with positive meanings: 智 (wisdom), 勇 (courage), 美 (beauty), 康 (health), 安 (peace), 乐 (happiness). The combination should also sound harmonious when spoken aloud.",
    m5Title: "5. Sound and Tone Balance",
    m5Body: "Mandarin has four tones. A good name balances the tones so it sounds musical, not flat. Characters should also avoid unfortunate homophones — a name that sounds like an insult in any major Chinese dialect.",
    getTitle: "Get Your Authentic Chinese Name",
    getBody: "At Chinese Culture Studio, our naming tool draws from classical texts and Five Elements theory to generate personalized Chinese names based on your preferences. Each reading includes the characters, pronunciation, meaning, and cultural background.",
    faqs: [
      { q: "How are Chinese names created?", a: "Chinese names are created based on the Five Elements (Wu Xing), Bazi analysis, and classical texts. Each name is unique and reflects the person's elemental balance." },
      { q: "What is Bazi?", a: "Bazi (Eight Characters) is a destiny system based on the year, month, day, and hour of birth. It reveals a person's elemental composition and helps select a harmonious name." },
      { q: "How much does it cost?", a: "You choose the contribution amount — from $1. It's a voluntary contribution to support the app, not a purchase of a service." },
    ],
    cta: "Create Your Chinese Name — from $1",
    disclaimer: "For cultural appreciation only. Not professional advice.",
  },
  ru: {
    title: "Полный Гид по Китайским Именам: Пять Элементов, Ба-цзы и Классическая Поэзия | Chinese Culture Studio",
    desc: "Узнайте искусство китайского именования на основе Пяти Элементов, И-Цзин и классической поэзии. Найдите имя, балансирующее звучание, значение и судьбу.",
    ogTitle: "Полный Гид по Китайским Именам",
    ogDesc: "Искусство китайского именования: Пять Элементов, Ба-цзы и классическая поэзия.",
    heading: "Как Выбрать Подлинное Китайское Имя",
    subtitle: "Искусство китайского именования — от классических текстов до современной жизни.",
    whyTitle: "Почему Китайские Имена Важны",
    whyBody1: "В китайской культуре имя — это не просто ярлык. Оно несёт надежды родителей, наследие семьи и видение вашей судьбы. Хорошо подобранное имя, как считается, приносит баланс Пяти Элементов (дерево, огонь, земля, металл, вода), гармонизирует с датой рождения и вдохновляет на успех в жизни.",
    whyBody2: "В отличие от западных имён, китайские имена тщательно конструируются с использованием принципов классической поэзии, И-Цзин (Книги Перемен) и теории Инь-Ян и Пяти Элементов.",
    structTitle: "Структура Китайского Имени",
    structIntro: "Полное китайское имя состоит из двух частей:",
    famLabel: "Фамилия (姓)",
    famDesc: "наследуется от отца, обычно один иероглиф (например, 李 Li, 王 Wang, 张 Zhang)",
    givenLabel: "Имя (名)",
    givenDesc: "выбирается родителями, обычно один или два иероглифа (например, 伟 Wei, 小雅 Xiaoya)",
    structExample: "Полное имя выглядит как: <strong>李伟 (Li Wei)</strong> или <strong>王小明 (Wang Xiaoming)</strong>.",
    methodsTitle: "Методы Выбора Имени: 5 Классических Подходов",
    m1Title: "1. Баланс Пяти Элементов (五行)",
    m1Body: "Это самый распространённый метод. Мастер имён анализирует дату и время рождения (Ба-цзы), чтобы определить, какой из Пяти Элементов в недостатке или избытке. Затем подбираются иероглифы, несущие нужный элемент: Дерево (木) — рост, жизненная сила; Огонь (火) — тепло, яркость; Земля (土) — стабильность; Металл (金) — сила, утончённость; Вода (水) — мудрость, адаптивность.",
    m2Title: "2. Классическая Поэзия (诗经/楚辞)",
    m2Body: "Родители часто обращаются к древней поэзии. «Шицзин» (Книга Песен) и «Чу Цы» (Чуские Строфы) — два самых уважаемых источника. Имена из поэзии несут культурную глубину и литературную красоту. Примеры: 徽因 (Huiyin) — из «Шицзин», 思成 (Sicheng) — из «Шуцзин».",
    m3Title: "3. Родовое Имя (辈分)",
    m3Body: "Многие семьи следуют родовому стихотворению (字辈诗), где каждое поколение разделяет определённый иероглиф в имени. Это создаёт семейное древо, которое можно прочитать по именам.",
    m4Title: "4. Благоприятное Значение",
    m4Body: "Родители выбирают иероглифы с положительным значением: 智 (мудрость), 勇 (смелость), 美 (красота), 康 (здоровье), 安 (мир), 乐 (радость). Сочетание иероглифов должно звучать гармонично при произнесении.",
    m5Title: "5. Баланс Звучания и Тонов",
    m5Body: "В мандаринском четыре тона. Хорошее имя балансирует тона, чтобы звучать музыкально. Иероглифы также должны избегать неудачных омофонов — имя, звучащее как оскорбление в любом китайском диалекте, неприемлемо.",
    getTitle: "Получите Ваше Подлинное Китайское Имя",
    getBody: "В Chinese Culture Studio наш инструмент имён черпает из классических текстов и теории Пяти Элементов, создавая персонализированные китайские имена на основе ваших предпочтений. Каждое чтение включает иероглифы, произношение, значение и культурный контекст.",
    faqs: [
      { q: "Как создаются китайские имена?", a: "Китайские имена создаются на основе Пяти Элементов (У-Син), анализа Ба-цзы и классических текстов. Каждое имя уникально и отражает баланс элементов человека." },
      { q: "Что такое Ба-цзы?", a: "Ба-цзы (Восемь Иероглифов) — это система судьбы, основанная на годе, месяце, дне и часе рождения. Она показывает элементный состав человека и помогает подобрать гармоничное имя." },
      { q: "Сколько стоит создание имени?", a: "Вы сами выбираете сумму взноса — от $1. Это добровольный вклад в поддержку приложения, а не покупка услуги." },
    ],
    cta: "Создать Китайское Имя — от $1",
    disclaimer: "Только для культурного ознакомления. Не является профессиональной консультацией.",
  },
  ja: {
    title: "本格的な中国名の選び方 — 完全ガイド | Chinese Culture Studio",
    desc: "五行、易経、古典詩に基づく中国命名の芸術を学びましょう。音、意味、運命のバランスがとれた名前を見つけてください。",
    ogTitle: "本格的な中国名の選び方",
    ogDesc: "五行、易経、古典詩に基づく中国命名法。",
    heading: "本格的な中国名の選び方",
    subtitle: "古典テキストから現代生活まで — 中国命名の古代芸術ガイド。",
    whyTitle: "中国名が重要な理由",
    whyBody1: "中国文化において、名前は単なるラベルではありません — 親の希望、家族の遺産、そして運命のビジョンを宿しています。良い名前は五行（木・火・土・金・水）のバランスをもたらし、誕生日と調和し、人生の成功を導くと信じられています。",
    whyBody2: "主に音や家族の伝統で選ばれる西洋の名前とは異なり、中国名は古典詩、易経（変化の書）、陰陽五行説の原理を用いて注意深く構成されます。",
    structTitle: "中国名の構造",
    structIntro: "完全な中国名は二つの部分から成ります：",
    famLabel: "姓（姓）",
    famDesc: "父から受け継がれ、通常は一文字（例：李 Li、王 Wang、张 Zhang）",
    givenLabel: "名（名）",
    givenDesc: "両親が選び、通常は一文字または二文字（例：伟 Wei、小雅 Xiaoya）",
    structExample: "完全な名前は次のようになります：<strong>李伟（Li Wei）</strong> または <strong>王小明（Wang Xiaoming）</strong>。",
    methodsTitle: "名前の選び方：5つの古典的方法",
    m1Title: "1. 五行バランス",
    m1Body: "これが最も一般的な方法です。命名の専門家が生年月日時（八字）を分析し、五行のうちどれが不足または過剰かを判断します。そして必要な元素を持つ漢字で名前が作られます：木 — 成長、活力；火 — 温かさ、輝き；土 — 安定；金 — 強さ、洗練；水 — 知恵、適応力。",
    m2Title: "2. 古典詩（詩経/楚辞）",
    m2Body: "中国の親はしばしば古代の詩に頼ります。詩経と楚辞は最も尊重される二つの源泉です。詩から取られた名前は文化的深みと文学的美しさを持ちます。例：徽因（Huiyin）— 詩経より、思成（Sicheng）— 尚書より。",
    m3Title: "3. 輩分（世代名）",
    m3Body: "多くの家族は字輩詩（世代詩）に従い、各世代が名前に特定の一文字を共有します。これにより名前を見るだけで読める家系図が作られます。",
    m4Title: "4. 縁起の良い意味",
    m4Body: "親は肯定的な意味を持つ漢字を選びます：智（知恵）、勇（勇気）、美（美しさ）、康（健康）、安（平和）、楽（幸福）。組み合わせは声に出したときに調和して聞こえる必要もあります。",
    m5Title: "5. 音と声調のバランス",
    m5Body: "中国語には四声があります。良い名前は音楽的に聞こえるよう声調をバランスさせます。また、不幸な同音異義語を避ける必要があります — どの主要な中国方言でも侮辱に聞こえる名前は受け入れられません。",
    getTitle: "あなたの本格的な中国名を取得",
    getBody: "Chinese Culture Studioの命名ツールは古典テキストと五行理論に基づき、あなたの好みに合わせたパーソナライズされた中国名を生成します。各リーディングには漢字、発音、意味、文化的背景が含まれます。",
    faqs: [
      { q: "中国名はどのように作られますか？", a: "中国名は五行、八字分析、古典テキストに基づいて作られます。それぞれの名前は独自のもので、その人の元素バランスを反映しています。" },
      { q: "八字とは何ですか？", a: "八字（Eight Characters）は生年月日時に基づく運命学システムです。その人の元素構成を明らかにし、調和のとれた名前選びを助けます。" },
      { q: "料金はいくらですか？", a: "支援額は$1からご自身で選べます。これはサービスの購入ではなく、アプリを支援する任意のご寄付です。" },
    ],
    cta: "あなたの中国名を作成 — $1から",
    disclaimer: "文化理解のためのものです。専門的なアドバイスではありません。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc },
    alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/chinese-name",
        ru: "https://www.culture-of-china.com/ru/guide/chinese-name",
        ja: "https://www.culture-of-china.com/ja/guide/chinese-name"
      },
    },
    robots: "index, follow"
  };
}

export default function ChineseNameGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.whyTitle}</h2>
      <p>{c.whyBody1}</p>
      <p>{c.whyBody2}</p>

      <h2>{c.structTitle}</h2>
      <p>{c.structIntro}</p>
      <ul>
        <li><strong>{c.famLabel}</strong> — {c.famDesc}</li>
        <li><strong>{c.givenLabel}</strong> — {c.givenDesc}</li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: c.structExample }} />

      <h2>{c.methodsTitle}</h2>
      <h3>{c.m1Title}</h3>
      <p>{c.m1Body}</p>
      <h3>{c.m2Title}</h3>
      <p>{c.m2Body}</p>
      <h3>{c.m3Title}</h3>
      <p>{c.m3Body}</p>
      <h3>{c.m4Title}</h3>
      <p>{c.m4Body}</p>
      <h3>{c.m5Title}</h3>
      <p>{c.m5Body}</p>

      <h2>{c.getTitle}</h2>
      <p>{c.getBody}</p>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <div className="not-prose my-8">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>{c.cta}</Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
