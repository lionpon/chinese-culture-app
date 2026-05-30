import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "Пять Элементов (У-Син): Дерево, Огонь, Земля, Металл, Вода | Chinese Culture Studio" : "Five Elements (Wu Xing): Wood, Fire, Earth, Metal, Water | Chinese Culture Studio",
    description: isRu ? "Полный гид по Пяти Элементам китайской философии: циклы порождения и контроля, характер каждого элемента и как узнать свой." : "A complete guide to the Five Elements of Chinese philosophy: generating & controlling cycles, traits of each element, and how to find yours.",
    openGraph: { title: isRu ? "Пять Элементов (У-Син)" : "Five Elements (Wu Xing)", description: isRu ? "Циклы порождения и контроля, значение каждого элемента." : "Generating & controlling cycles, meaning of each element." },
    robots: "index, follow",
  };
}

const ELEMENTS_EN = [
  { name: "Wood", zh: "木", direction: "East", season: "Spring", color: "Green", organ: "Liver", trait: "Growth, flexibility, creativity, idealism", planet: "Jupiter" },
  { name: "Fire", zh: "火", direction: "South", season: "Summer", color: "Red", organ: "Heart", trait: "Passion, warmth, dynamism, charisma", planet: "Mars" },
  { name: "Earth", zh: "土", direction: "Center", season: "Late Summer", color: "Yellow", organ: "Spleen", trait: "Stability, nourishment, patience, reliability", planet: "Saturn" },
  { name: "Metal", zh: "金", direction: "West", season: "Autumn", color: "White", organ: "Lung", trait: "Structure, discipline, clarity, righteousness", planet: "Venus" },
  { name: "Water", zh: "水", direction: "North", season: "Winter", color: "Black/Blue", organ: "Kidney", trait: "Wisdom, adaptability, introspection, willpower", planet: "Mercury" },
];

const ELEMENTS_RU = [
  { name: "Дерево", zh: "木", direction: "Восток", season: "Весна", color: "Зелёный", organ: "Печень", trait: "Рост, гибкость, творчество, идеализм", planet: "Юпитер" },
  { name: "Огонь", zh: "火", direction: "Юг", season: "Лето", color: "Красный", organ: "Сердце", trait: "Страсть, тепло, динамизм, харизма", planet: "Марс" },
  { name: "Земля", zh: "土", direction: "Центр", season: "Позднее лето", color: "Жёлтый", organ: "Селезёнка", trait: "Стабильность, питание, терпение, надёжность", planet: "Сатурн" },
  { name: "Металл", zh: "金", direction: "Запад", season: "Осень", color: "Белый", organ: "Лёгкие", trait: "Структура, дисциплина, ясность, справедливость", planet: "Венера" },
  { name: "Вода", zh: "水", direction: "Север", season: "Зима", color: "Чёрный/Синий", organ: "Почки", trait: "Мудрость, адаптивность, воля", planet: "Меркурий" },
];

export default function FiveElementsGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";
  const elements = isRu ? ELEMENTS_RU : ELEMENTS_EN;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Пять Элементов (У-Син): Полный Гид" : "Five Elements (Wu Xing): A Complete Guide"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Понимание Пяти Элементов — ключ к китайской метафизике, медицине и именованию." : "Understanding the Five Elements is the key to Chinese metaphysics, medicine, and naming."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Что Такое У-Син?" : "What Is Wu Xing?"}</h2>
      {isRu ? (
        <p>У-Син (五行, Wǔ Xíng) — это пять фаз или элементов, лежащих в основе китайской философии. В отличие от греческих четырёх элементов, У-Син описывает не вещества, а <strong>процессы и циклы изменений</strong>. Каждый элемент представляет собой фазу энергии Ци, и все пять постоянно взаимодействуют друг с другом через циклы порождения и контроля. Эта система используется в традиционной китайской медицине, фэн-шуй, астрологии, боевых искусствах и именовании.</p>
      ) : (
        <p>Wu Xing (五行, Wǔ Xíng) — the Five Phases or Five Elements — form the foundation of Chinese philosophy. Unlike the Greek four elements, Wu Xing describes not substances but <strong>processes and cycles of change</strong>. Each element represents a phase of Qi energy, and all five constantly interact through generating and controlling cycles. This system is used in Traditional Chinese Medicine, Feng Shui, astrology, martial arts, and Chinese naming.</p>
      )}

      <h2>{isRu ? "Два Главных Цикла" : "The Two Main Cycles"}</h2>
      <h3>{isRu ? "Цикл Порождения (生)" : "Generating Cycle (生, Shēng)"}</h3>
      {isRu ? (
        <p>Дерево порождает Огонь (горит) → Огонь порождает Землю (пепел) → Земля порождает Металл (руда) → Металл порождает Воду (конденсат) → Вода порождает Дерево (питает). Этот цикл описывает поддержку и рост — как мать питает ребёнка.</p>
      ) : (
        <p>Wood generates Fire (burns) → Fire generates Earth (ash) → Earth generates Metal (ore) → Metal generates Water (condensation) → Water generates Wood (nourishes). This cycle describes support and growth — like a mother nourishing a child.</p>
      )}

      <h3>{isRu ? "Цикл Контроля (克)" : "Controlling Cycle (克, Kè)"}</h3>
      {isRu ? (
        <p>Дерево контролирует Землю (корни) → Земля контролирует Воду (плотины) → Вода контролирует Огонь (тушит) → Огонь контролирует Металл (плавит) → Металл контролирует Дерево (рубит). Этот цикл обеспечивает баланс — ни один элемент не должен доминировать.</p>
      ) : (
        <p>Wood controls Earth (roots) → Earth controls Water (dams) → Water controls Fire (extinguishes) → Fire controls Metal (melts) → Metal controls Wood (cuts). This cycle maintains balance — no single element should dominate.</p>
      )}

      <h2>{isRu ? "Пять Элементов: Таблица" : "The Five Elements: Reference Table"}</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-stone-100">
              <th className="p-2 text-left">{isRu ? "Элемент" : "Element"}</th>
              <th className="p-2 text-left">{isRu ? "Хань" : "Hanzi"}</th>
              <th className="p-2 text-left">{isRu ? "Направление" : "Direction"}</th>
              <th className="p-2 text-left">{isRu ? "Сезон" : "Season"}</th>
              <th className="p-2 text-left">{isRu ? "Цвет" : "Color"}</th>
              <th className="p-2 text-left">{isRu ? "Орган" : "Organ"}</th>
              <th className="p-2 text-left">{isRu ? "Характер" : "Personality"}</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((el) => (
              <tr key={el.name} className="border-t border-stone-200">
                <td className="p-2 font-medium">{el.name}</td>
                <td className="p-2">{el.zh}</td>
                <td className="p-2">{el.direction}</td>
                <td className="p-2">{el.season}</td>
                <td className="p-2">{el.color}</td>
                <td className="p-2">{el.organ}</td>
                <td className="p-2 text-xs">{el.trait}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{isRu ? "Как Узнать Свой Элемент" : "How to Find Your Element"}</h2>
      {isRu ? (
        <>
          <p>Ваш личный элемент определяется по дате рождения через систему Ба-Цзы (Восемь Иероглифов). Каждый из четырёх столпов (год, месяц, день, час) имеет небесный ствол и земную ветвь — комбинацию элемента и животного.</p>
          <p>У большинства людей есть <strong>основной элемент</strong> (элемент дня), но также присутствуют и другие элементы в разной степени. Баланс всех пяти элементов определяет характер, здоровье и удачу.</p>
          <p>Попробуйте наш сервис китайского имени — он включает полный анализ Ба-Цзы с вашими элементами.</p>
        </>
      ) : (
        <>
          <p>Your personal element is determined by your birth date through the Ba-Zi (Eight Characters) system. Each of the four pillars (year, month, day, hour) has a heavenly stem and earthly branch — a combination of element and animal.</p>
          <p>Most people have a <strong>dominant element</strong> (the day element), but other elements also appear in varying degrees. The balance of all five elements shapes personality, health, and fortune.</p>
          <p>Try our Chinese name service — it includes a full Ba-Zi analysis with your elements.</p>
        </>
      )}

      <h2>{isRu ? "Применение Пяти Элементов" : "Applications of the Five Elements"}</h2>
      {isRu ? (
        <ul>
          <li><strong>Китайская медицина:</strong> Каждый элемент связан с органами. Болезнь — это дисбаланс элементов; лечение восстанавливает гармонию.</li>
          <li><strong>Фэн-шуй:</strong> Расположение дома, цвета и материалы выбираются по элементам для гармонизации энергии.</li>
          <li><strong>Именование:</strong> Китайские имена часто включают радикалы, связанные с элементом, которого ребёнку не хватает в Ба-Цзы.</li>
          <li><strong>Кулинария:</strong> Продукты классифицируются по пяти вкусам (кислый, горький, сладкий, острый, солёный), соответствующим элементам.</li>
          <li><strong>Боевые искусства:</strong> Движения и стратегии в таких стилях, как Син-И, основаны на циклах У-Син.</li>
        </ul>
      ) : (
        <ul>
          <li><strong>Chinese Medicine:</strong> Each element links to organs. Illness is an element imbalance; treatment restores harmony.</li>
          <li><strong>Feng Shui:</strong> Home layout, colors, and materials are chosen by element to harmonize energy flow.</li>
          <li><strong>Naming:</strong> Chinese names often include radicals linked to the element a child lacks in their Ba-Zi chart.</li>
          <li><strong>Cooking:</strong> Foods are classified by five tastes (sour, bitter, sweet, pungent, salty) matching the elements.</li>
          <li><strong>Martial Arts:</strong> Movements and strategies in styles like Xing Yi are based on Wu Xing cycles.</li>
        </ul>
      )}

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Какой у меня элемент?", a: "Ваш элемент дня определяется по Ба-Цзы (Восемь Иероглифов) на основе полной даты рождения. Попробуйте наш сервис имени — он покажет ваш доминирующий элемент." },
        { q: "Может ли у меня быть больше одного элемента?", a: "Да! У каждого есть все пять элементов в разной степени. Цель — баланс между ними, а не доминирование одного." },
        { q: "Как элементы связаны с китайским зодиаком?", a: "Каждый знак зодиака имеет фиксированный элемент (например, Крыса — Вода), но год также имеет элемент небесного ствола, создавая 60-летний цикл." },
      ] : [
        { q: "What is my element?", a: "Your day element is determined by your Ba-Zi (Eight Characters) based on your full birth date. Try our naming service — it reveals your dominant element." },
        { q: "Can I have more than one element?", a: "Yes! Everyone has all five elements in varying degrees. The goal is balance among them, not dominance of one." },
        { q: "How do elements relate to Chinese zodiac?", a: "Each zodiac sign has a fixed element (e.g., Rat = Water), but the year also has a heavenly stem element, creating a 60-year cycle." },
      ]} />

      <div className="not-prose my-8 text-center">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Узнать Свой Элемент и Ба-Цзы — от $1" : "Discover Your Element & Ba-Zi — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{isRu ? "Для культурного ознакомления." : "For cultural appreciation only."}</p>
    </article>
  );
}
