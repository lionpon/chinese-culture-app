import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";
import GuideCTA from "@/components/GuideCTA";
import GuideToolEmbed from "@/components/GuideToolEmbed";

type Props = { params: { locale: string } };

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whyTitle: string; whyBody1: string; whyBody2: string;
  whatTitle: string; whatIntro: string;
  zTitle: string; zBody: string;
  dTitle: string; dBody: string;
  lTitle: string; lBody: string;
  lNew: string; lFull: string; lBad: string;
  lNewDesc: string; lFullDesc: string; lBadDesc: string;
  eventsTitle: string;
  wLabel: string; wDesc: string;
  bLabel: string; bDesc: string;
  mLabel: string; mDesc: string;
  tLabel: string; tDesc: string;
  findTitle: string; findBody: string;
  faqs: { q: string; a: string }[];
  cta: string; disclaimer: string;
}> = {
  en: {
    title: "How to Select Auspicious Dates: Chinese Calendar Guide for Weddings & Business | Chinese Culture Studio",
    desc: "Learn how to pick lucky dates using the Chinese almanac (Tong Shu). Find the best dates for weddings, business openings, travel, and important events.",
    ogTitle: "How to Select Auspicious Dates | Chinese Culture Studio",
    ogDesc: "Pick lucky dates using the Chinese almanac for weddings and business.",
    heading: "How to Select Auspicious Dates: A Chinese Calendar Guide",
    subtitle: "Master the art of choosing lucky dates — from wedding planning to business openings.",
    whyTitle: "Why Dates Matter in Chinese Culture",
    whyBody1: "In Chinese tradition, the timing of important events can influence their outcome. Starting a business on an auspicious day invites prosperity. Getting married on a carefully chosen day ensures harmony. This isn't mere superstition — it's a 2,000-year-old system rooted in Chinese astronomy, the lunar calendar, and the same philosophical framework as feng shui.",
    whyBody2: "The Chinese almanac, known as the Tong Shu (通书) or Huang Li (黄历), has been the go-to reference for date selection since the Han dynasty. Even today, many Chinese families consult the almanac before scheduling weddings, moving houses, or launching a business.",
    whatTitle: "What Makes a Date Auspicious?",
    whatIntro: "Several factors determine whether a date is favorable:",
    zTitle: "1. Chinese Zodiac Compatibility",
    zBody: "Each year, month, day, and hour is associated with an animal sign and an element. A good date harmonizes with the person's own zodiac sign and avoids clashes (冲, Chong). For example, if you were born in the Year of the Rat, you should avoid events on the Day of the Horse.",
    dTitle: "2. The 12 Day Officers (建除十二神)",
    dBody: "Each day in the Chinese calendar is governed by one of 12 spirits, cycling predictably. Some are lucky (Success, Receive, Open), while others are risky (Danger, Destroy, Close). The Tong Shu marks each day accordingly.",
    lTitle: "3. Lunar Calendar Phases",
    lBody: "",
    lNew: "New Moon (初一)",
    lFull: "Full Moon (十五)",
    lBad: "Days 3, 7, 23",
    lNewDesc: "good for beginnings, setting intentions",
    lFullDesc: "good for celebrations, weddings",
    lBadDesc: "generally inauspicious for major events",
    eventsTitle: "Good Dates for Common Events",
    wLabel: "Weddings",
    wDesc: "Avoid Ghost Month (7th lunar month) and Tomb Sweeping Festival. Seek dates with the \"Marriage\" (嫁娶) designation.",
    bLabel: "Business Opening",
    bDesc: "Look for \"Open Business\" (开业) days. Dragon and Snake days are traditionally powerful.",
    mLabel: "Moving House",
    mDesc: "Choose \"Moving\" (入宅) days, avoid days of personal zodiac clash.",
    tLabel: "Travel",
    tDesc: "\"Travel\" (出行) days with favorable directional energy.",
    findTitle: "Find Your Auspicious Date",
    findBody: "Our Auspicious Date Selection tool checks the Chinese almanac against your preferences and zodiac sign to find the most favorable dates for your specific event.",
    faqs: [
      { q: "What makes a date auspicious?", a: "A date's auspiciousness is determined by the Chinese almanac (Tong Shu), considering zodiac compatibility, moon phases, the 12 Day Officers, and Five Elements harmony." },
      { q: "What events can I find dates for?", a: "Weddings, engagements, business openings, travel, moving house, signing contracts, construction, medical treatment, and many more." },
      { q: "Is it paid?", a: "You choose the contribution amount — from $1. First 2 date selections are free (preview mode). It's a voluntary contribution." },
    ],
    cta: "Find Your Auspicious Date — from $1",
    disclaimer: "For cultural appreciation only. Not professional advice.",
  },
  ru: {
    title: "Как Выбрать Благоприятную Дату: Китайский Календарь для Свадеб и Бизнеса | Chinese Culture Studio",
    desc: "Узнайте, как выбирать удачные даты по китайскому альманаху (Тун Шу). Лучшие даты для свадеб, открытия бизнеса, путешествий и важных событий.",
    ogTitle: "Как Выбрать Благоприятную Дату | Chinese Culture Studio",
    ogDesc: "Выбирайте удачные даты по китайскому альманаху для свадеб и бизнеса.",
    heading: "Как Выбрать Благоприятные Даты: Гид по Китайскому Календарю",
    subtitle: "Искусство выбора удачных дат — от планирования свадьбы до открытия бизнеса.",
    whyTitle: "Почему Даты Важны в Китайской Культуре",
    whyBody1: "В китайской традиции время важных событий может влиять на их исход. Начало бизнеса в благоприятный день приглашает процветание. Свадьба в тщательно выбранный день обеспечивает гармонию. Это не просто суеверие — это 2000-летняя система, укоренённая в китайской астрономии, лунном календаре и той же философской основе, что и фэн-шуй.",
    whyBody2: "Китайский альманах, известный как Тун Шу (通书) или Хуан Ли (黄历), был основным справочником для выбора дат со времён династии Хань. Даже сегодня многие китайские семьи сверяются с альманахом перед свадьбой, переездом или запуском бизнеса.",
    whatTitle: "Что Делает Дату Благоприятной?",
    whatIntro: "Несколько факторов определяют, является ли дата благоприятной:",
    zTitle: "1. Совместимость по Китайскому Зодиаку",
    zBody: "Каждый год, месяц, день и час связаны со знаком животного и элементом. Хорошая дата гармонирует с собственным знаком зодиака человека и избегает столкновений (冲). Например, рождённым в Год Крысы следует избегать событий в День Лошади.",
    dTitle: "2. 12 Дневных Офицеров (建除十二神)",
    dBody: "Каждый день в китайском календаре управляется одним из 12 духов, циклически сменяющихся. Некоторые удачны (Успех, Получение, Открытие), другие рискованны (Опасность, Разрушение, Закрытие). Тун Шу отмечает каждый день соответственно.",
    lTitle: "3. Фазы Лунного Календаря",
    lBody: "",
    lNew: "Новолуние (初一)",
    lFull: "Полнолуние (十五)",
    lBad: "Дни 3, 7, 23",
    lNewDesc: "хорошо для начинаний",
    lFullDesc: "хорошо для празднований, свадеб",
    lBadDesc: "обычно неблагоприятны",
    eventsTitle: "Хорошие Даты для Разных Событий",
    wLabel: "Свадьбы",
    wDesc: "Избегайте Месяца Призраков (7-й лунный месяц) и Цинмин. Ищите дни с обозначением «Брак» (嫁娶).",
    bLabel: "Открытие Бизнеса",
    bDesc: "Ищите дни «Открытие Бизнеса» (开业). Дни Дракона и Змеи традиционно благоприятны.",
    mLabel: "Переезд",
    mDesc: "Выбирайте дни «Переезд» (入宅), избегайте дней личного зодиакального столкновения.",
    tLabel: "Путешествия",
    tDesc: "Дни «Путешествие» (出行) с благоприятной направленной энергией.",
    findTitle: "Найдите Вашу Благоприятную Дату",
    findBody: "Наш инструмент выбора дат проверяет китайский альманах с учётом ваших предпочтений и знака зодиака, чтобы найти самые благоприятные даты для вашего события.",
    faqs: [
      { q: "Что делает дату благоприятной?", a: "Благоприятность даты определяется по китайскому альманаху (Тун Шу) с учётом зодиакальной совместимости, фаз луны, 12 дневных офицеров и гармонии Пяти Элементов." },
      { q: "Для каких событий можно выбрать дату?", a: "Свадьба, помолвка, открытие бизнеса, путешествие, переезд, подписание контракта, строительство, лечение и многие другие." },
      { q: "Это платно?", a: "Вы сами выбираете сумму взноса — от $1. Первые 2 выбора дат бесплатны (в режиме предпросмотра). Это добровольный вклад." },
    ],
    cta: "Найти Благоприятную Дату — от $1",
    disclaimer: "Только для культурного ознакомления. Не является профессиональной консультацией.",
  },
  ja: {
    title: "吉日の選び方：結婚・ビジネスのための中国暦ガイド | Chinese Culture Studio",
    desc: "中国暦（通書）を使って縁起の良い日を選ぶ方法。結婚、開業、旅行、重要なイベントに最適な日を見つけましょう。",
    ogTitle: "吉日の選び方 | Chinese Culture Studio",
    ogDesc: "結婚やビジネスのための中国暦による吉日選び。",
    heading: "吉日の選び方：中国暦ガイド",
    subtitle: "結婚準備から開業まで — 縁起の良い日を選ぶ技術をマスターしましょう。",
    whyTitle: "中国文化において日取りが重要な理由",
    whyBody1: "中国の伝統では、重要なイベントのタイミングがその結果に影響を与えます。吉日にビジネスを始めることは繁栄を招き、慎重に選んだ日に結婚することは調和を確かなものにします。これは単なる迷信ではなく、中国天文学、太陰暦、風水と同じ哲学的枠組みに根ざした2000年の歴史を持つ体系です。",
    whyBody2: "通書（Tong Shu）または黄暦（Huang Li）として知られる中国暦は、漢王朝以来日取り選びの基本参考書でした。今日でも多くの中国の家族が結婚式や引越し、開業の前に暦を確認します。",
    whatTitle: "日を吉日にする要素は？",
    whatIntro: "日が吉かどうかを決めるいくつかの要素があります：",
    zTitle: "1. 干支の相性",
    zBody: "年、月、日、時間はそれぞれ動物のサインと元素に関連付けられています。良い日はその人の干支と調和し、冲（衝突）を避けます。例えば子年生まれの人は午の日のイベントを避けるべきです。",
    dTitle: "2. 十二直（建除十二神）",
    dBody: "中国暦の各日は12の神のいずれかに司られ、予測可能に循環します。吉（成、収、開）もあれば凶（危、破、閉）もあります。通書は各日をそれに応じて記します。",
    lTitle: "3. 月の満ち欠け",
    lBody: "",
    lNew: "新月（初一）",
    lFull: "満月（十五）",
    lBad: "3日、7日、23日",
    lNewDesc: "始まりや目標設定に良い",
    lFullDesc: "お祝いや結婚式に良い",
    lBadDesc: "大きなイベントには一般的に不吉",
    eventsTitle: "イベント別の良い日",
    wLabel: "結婚式",
    wDesc: "鬼月（旧暦7月）と清明節を避けましょう。「嫁娶」の指定がある日を探します。",
    bLabel: "開業",
    bDesc: "「開業」の日を探します。辰の日と巳の日は伝統的に強力です。",
    mLabel: "引越し",
    mDesc: "「入宅」の日を選び、個人の干支と衝突する日を避けます。",
    tLabel: "旅行",
    tDesc: "良い方位エネルギーを持つ「出行」の日。",
    findTitle: "あなたの吉日を見つける",
    findBody: "当サイトの吉日選択ツールはあなたの好みと干支に照らして中国暦をチェックし、あなたのイベントに最も縁起の良い日を見つけます。",
    faqs: [
      { q: "日が吉日かどうかは何で決まりますか？", a: "日の吉凶は中国暦（通書）によって決まり、干支の相性、月の満ち欠け、十二直、五行の調和が考慮されます。" },
      { q: "どんなイベントの日取りを探せますか？", a: "結婚式、婚約、開業、旅行、引越し、契約締結、建築、治療など多岐にわたります。" },
      { q: "有料ですか？", a: "支援額は$1からご自身で選べます。最初の2回の日取り選択は無料（プレビューモード）です。これは任意のご支援です。" },
    ],
    cta: "吉日を探す — $1から",
    disclaimer: "文化理解のためのものです。専門的なアドバイスではありません。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc },
    alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/auspicious-dates",
        ru: "https://www.culture-of-china.com/ru/guide/auspicious-dates",
        ja: "https://www.culture-of-china.com/ja/guide/auspicious-dates"
      },
    },
    robots: "index, follow"
  };
}

export default function AuspiciousDatesGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.whyTitle}</h2>
      <p>{c.whyBody1}</p>
      <p>{c.whyBody2}</p>

      <h2>{c.whatTitle}</h2>
      <p>{c.whatIntro}</p>

      <h3>{c.zTitle}</h3>
      <p>{c.zBody}</p>

      <h3>{c.dTitle}</h3>
      <p>{c.dBody}</p>

      <h3>{c.lTitle}</h3>
      <ul>
        <li><strong>{c.lNew}</strong> — {c.lNewDesc}</li>
        <li><strong>{c.lFull}</strong> — {c.lFullDesc}</li>
        <li><strong>{c.lBad}</strong> — {c.lBadDesc}</li>
      </ul>

      <h2>{c.eventsTitle}</h2>
      <ul>
        <li><strong>{c.wLabel}</strong> — {c.wDesc}</li>
        <li><strong>{c.bLabel}</strong> — {c.bDesc}</li>
        <li><strong>{c.mLabel}</strong> — {c.mDesc}</li>
        <li><strong>{c.tLabel}</strong> — {c.tDesc}</li>
      </ul>

      <h2>{c.findTitle}</h2>
      <p>{c.findBody}</p>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <GuideToolEmbed tool="dateCheck" />

      <div className="not-prose my-8">
        <Link href="/calendar" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>{c.cta}</Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>

      <GuideCTA href="/calendar" service="calendar" variant="sticky" />
    </article>
  );
}
