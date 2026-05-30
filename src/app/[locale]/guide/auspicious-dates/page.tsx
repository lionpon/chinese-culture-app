import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu
      ? "Как Выбрать Благоприятную Дату: Китайский Календарь для Свадеб и Бизнеса | Chinese Culture Studio"
      : "How to Select Auspicious Dates: Chinese Calendar Guide for Weddings & Business",
    description: isRu
      ? "Узнайте, как выбирать удачные даты по китайскому альманаху (Тун Шу). Лучшие даты для свадеб, открытия бизнеса, путешествий и важных событий."
      : "Learn how to pick lucky dates using the Chinese almanac (Tong Shu). Find the best dates for weddings, business openings, travel, and important events.",
    openGraph: {
      title: isRu ? "Как Выбрать Благоприятную Дату | Chinese Culture Studio" : "How to Select Auspicious Dates: Chinese Calendar Guide",
      description: isRu ? "Выбирайте удачные даты по китайскому альманаху для свадеб и бизнеса." : "Pick lucky dates using the Chinese almanac for weddings and business.",
    },
    robots: "index, follow",
  };
}

export default function AuspiciousDatesGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Как Выбрать Благоприятные Даты: Гид по Китайскому Календарю" : "How to Select Auspicious Dates: A Chinese Calendar Guide"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu
          ? "Искусство выбора удачных дат — от планирования свадьбы до открытия бизнеса."
          : "Master the art of choosing lucky dates — from wedding planning to business openings."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Почему Даты Важны в Китайской Культуре" : "Why Dates Matter in Chinese Culture"}</h2>
      {isRu ? (
        <>
          <p>В китайской традиции время важных событий может влиять на их исход. Начало бизнеса в благоприятный день приглашает процветание. Свадьба в тщательно выбранный день обеспечивает гармонию. Это не просто суеверие — это 2000-летняя система, укоренённая в китайской астрономии, лунном календаре и той же философской основе, что и фэн-шуй.</p>
          <p>Китайский альманах, известный как Тун Шу (通书) или Хуан Ли (黄历), был основным справочником для выбора дат со времён династии Хань. Даже сегодня многие китайские семьи сверяются с альманахом перед свадьбой, переездом или запуском бизнеса.</p>
        </>
      ) : (
        <>
          <p>In Chinese tradition, the timing of important events can influence their outcome. Starting a business on an auspicious day invites prosperity. Getting married on a carefully chosen day ensures harmony. This isn&apos;t mere superstition — it&apos;s a 2,000-year-old system rooted in Chinese astronomy, the lunar calendar, and the same philosophical framework as feng shui.</p>
          <p>The Chinese almanac, known as the Tong Shu (通书) or Huang Li (黄历), has been the go-to reference for date selection since the Han dynasty. Even today, many Chinese families consult the almanac before scheduling weddings, moving houses, or launching a business.</p>
        </>
      )}

      <h2>{isRu ? "Что Делает Дату Благоприятной?" : "What Makes a Date Auspicious?"}</h2>
      <p>{isRu ? "Несколько факторов определяют, является ли дата благоприятной:" : "Several factors determine whether a date is favorable:"}</p>

      <h3>{isRu ? "1. Совместимость по Китайскому Зодиаку" : "1. Chinese Zodiac Compatibility"}</h3>
      {isRu ? (
        <p>Каждый год, месяц, день и час связаны со знаком животного и элементом. Хорошая дата гармонирует с собственным знаком зодиака человека и избегает столкновений (冲). Например, рождённым в Год Крысы следует избегать событий в День Лошади.</p>
      ) : (
        <p>Each year, month, day, and hour is associated with an animal sign and an element. A good date harmonizes with the person&apos;s own zodiac sign and avoids clashes (冲, Chong). For example, if you were born in the Year of the Rat, you should avoid events on the Day of the Horse.</p>
      )}

      <h3>{isRu ? "2. 12 Дневных Офицеров (建除十二神)" : "2. The 12 Day Officers (建除十二神)"}</h3>
      {isRu ? (
        <p>Каждый день в китайском календаре управляется одним из 12 духов, циклически сменяющихся. Некоторые удачны (Успех, Получение, Открытие), другие рискованны (Опасность, Разрушение, Закрытие). Тун Шу отмечает каждый день соответственно.</p>
      ) : (
        <p>Each day in the Chinese calendar is governed by one of 12 spirits, cycling predictably. Some are lucky (Success, Receive, Open), while others are risky (Danger, Destroy, Close). The Tong Shu marks each day accordingly.</p>
      )}

      <h3>{isRu ? "3. Фазы Лунного Календаря" : "3. Lunar Calendar Phases"}</h3>
      <ul>
        <li><strong>{isRu ? "Новолуние (初一)" : "New Moon (初一)"}</strong> — {isRu ? "хорошо для начинаний" : "good for beginnings, setting intentions"}</li>
        <li><strong>{isRu ? "Полнолуние (十五)" : "Full Moon (十五)"}</strong> — {isRu ? "хорошо для празднований, свадеб" : "good for celebrations, weddings"}</li>
        <li><strong>{isRu ? "Дни 3, 7, 23" : "Days 3, 7, 23"}</strong> — {isRu ? "обычно неблагоприятны" : "generally inauspicious for major events"}</li>
      </ul>

      <h2>{isRu ? "Хорошие Даты для Разных Событий" : "Good Dates for Common Events"}</h2>
      <ul>
        <li><strong>{isRu ? "Свадьбы" : "Weddings"}</strong> — {isRu ? "Избегайте Месяца Призраков (7-й лунный месяц) и Цинмин. Ищите дни с обозначением «Брак» (嫁娶)." : "Avoid Ghost Month (7th lunar month) and Tomb Sweeping Festival. Seek dates with the \"Marriage\" (嫁娶) designation."}</li>
        <li><strong>{isRu ? "Открытие Бизнеса" : "Business Opening"}</strong> — {isRu ? "Ищите дни «Открытие Бизнеса» (开业). Дни Дракона и Змеи традиционно благоприятны." : "Look for \"Open Business\" (开业) days. Dragon and Snake days are traditionally powerful."}</li>
        <li><strong>{isRu ? "Переезд" : "Moving House"}</strong> — {isRu ? "Выбирайте дни «Переезд» (入宅), избегайте дней личного зодиакального столкновения." : "Choose \"Moving\" (入宅) days, avoid days of personal zodiac clash."}</li>
        <li><strong>{isRu ? "Путешествия" : "Travel"}</strong> — {isRu ? "Дни «Путешествие» (出行) с благоприятной направленной энергией." : "\"Travel\" (出行) days with favorable directional energy."}</li>
      </ul>

      <h2>{isRu ? "Найдите Вашу Благоприятную Дату" : "Find Your Auspicious Date"}</h2>
      {isRu ? (
        <p>Наш инструмент выбора дат проверяет китайский альманах с учётом ваших предпочтений и знака зодиака, чтобы найти самые благоприятные даты для вашего события.</p>
      ) : (
        <p>Our Auspicious Date Selection tool checks the Chinese almanac against your preferences and zodiac sign to find the most favorable dates for your specific event.</p>
      )}

      <GuideFaq
        lang={locale}
        faqs={
          isRu
            ? [
                { q: "Что делает дату благоприятной?", a: "Благоприятность даты определяется по китайскому альманаху (Тун Шу) с учётом зодиакальной совместимости, фаз луны, 12 дневных офицеров и гармонии Пяти Элементов." },
                { q: "Для каких событий можно выбрать дату?", a: "Свадьба, помолвка, открытие бизнеса, путешествие, переезд, подписание контракта, строительство, лечение и многие другие." },
                { q: "Это платно?", a: "Вы сами выбираете сумму взноса — от $1. Первые 2 выбора дат бесплатны (в режиме предпросмотра). Это добровольный вклад." },
              ]
            : [
                { q: "What makes a date auspicious?", a: "A date's auspiciousness is determined by the Chinese almanac (Tong Shu), considering zodiac compatibility, moon phases, the 12 Day Officers, and Five Elements harmony." },
                { q: "What events can I find dates for?", a: "Weddings, engagements, business openings, travel, moving house, signing contracts, construction, medical treatment, and many more." },
                { q: "Is it paid?", a: "You choose the contribution amount — from $1. First 2 date selections are free (preview mode). It's a voluntary contribution." },
              ]
        }
      />

      <div className="not-prose my-8">
        <Link href="/calendar" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Найти Благоприятную Дату — от $1" : "Find Your Auspicious Date — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">
        {isRu ? "Только для культурного ознакомления. Не является профессиональной консультацией." : "For cultural appreciation only. Not professional advice."}
      </p>
    </article>
  );
}
