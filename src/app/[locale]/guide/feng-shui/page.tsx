import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whatTitle: string; whatBody: string;
  principlesTitle: string;
  baguaTitle: string; baguaBody: string;
  homeTitle: string; homeBody: string;
  officeTitle: string; officeBody: string;
  faqs: { q: string; a: string }[];
  cta: string; ctaLink: string;
}> = {
  en: {
    title: "Feng Shui Basics: Home, Office & Bagua Guide | Chinese Culture Studio",
    desc: "Learn Feng Shui fundamentals: qi energy, yin-yang balance, five elements, bagua map. Practical tips for home and office arrangement to attract good fortune.",
    ogTitle: "Feng Shui Basics: Home & Office Guide",
    ogDesc: "Master the ancient art of placement — from bagua map to five elements, create harmony in your space.",
    heading: "Feng Shui: The Ancient Art of Placement",
    subtitle: "Feng Shui (风水, literally \"wind-water\") is a 3,000-year-old Chinese practice of arranging spaces to harmonize with natural energy (qi). It influences everything from building orientation to furniture placement — and is still widely practiced today.",
    whatTitle: "What Is Feng Shui?",
    whatBody: "Feng Shui is based on the idea that our surroundings affect our wellbeing. By arranging spaces in harmony with qi — the vital life force that flows through all things — we can improve health, relationships, and prosperity. The practice draws on Taoist philosophy, the I Ching, and observational astronomy. Major corporations including HSBC, Disney, and Mandarin Oriental use Feng Shui consultants when designing their buildings.",
    principlesTitle: "Core Principles",
    baguaTitle: "The Bagua Map",
    baguaBody: "The Bagua (八卦) is an octagonal energy map used to analyze any space. Each of the 8 sectors corresponds to a life area: Career (North), Knowledge (Northeast), Family (East), Wealth (Southeast), Fame (South), Relationships (Southwest), Creativity (West), and Helpful People (Northwest). The center represents health and balance. Overlay the bagua on your floor plan to identify which areas need attention.",
    homeTitle: "Home Feng Shui Tips",
    homeBody: "1. Keep the entrance clear — the front door is the \"mouth of qi.\" 2. Position your bed diagonally from the door but not directly in line with it (\"coffin position\"). 3. Use mirrors wisely — never facing the bed or reflecting clutter. 4. Balance the five elements: add wood (plants) for growth, fire (candles) for passion, earth (ceramics) for stability, metal (white/grey decor) for clarity, water (fountain) for abundance. 5. Fix broken items promptly — they represent stagnant energy.",
    officeTitle: "Office & Desk Feng Shui",
    officeBody: "Place your desk in the \"command position\" — facing the door but not directly in line with it, with a solid wall behind you. Keep the desk clutter-free. Add a plant in the wealth corner (far left from your seated position). Use warm lighting in the fame area (center back wall). Avoid sitting under exposed beams or facing a blank wall.",
    faqs: [
      { q: "What is Feng Shui in simple terms?", a: "Feng Shui is the Chinese practice of arranging your environment to create harmony and invite positive energy (qi) into your life. It's about placing things where they naturally belong." },
      { q: "Does Feng Shui really work?", a: "Many people report feeling calmer, more focused, and more prosperous after applying Feng Shui principles. While results vary, the practice encourages intentional, mindful living — which itself has measurable benefits." },
      { q: "What are the five elements in Feng Shui?", a: "Wood (growth, vitality), Fire (passion, transformation), Earth (stability, nourishment), Metal (clarity, precision), and Water (wisdom, abundance). Each element supports or controls others in cycles." },
      { q: "How do I find the wealth corner?", a: "Stand at your front door facing in. The far left corner is your wealth area (Southeast on the bagua). Enhance it with purple, gold, or green decor, a healthy plant, or a small water feature." },
      { q: "What should not be in a bedroom for Feng Shui?", a: "Avoid mirrors facing the bed, electronics (disrupt sleep qi), clutter under the bed, water features, and sharp-cornered furniture pointing at the bed (\"poison arrows\")." },
      { q: "Can I apply Feng Shui in a small apartment?", a: "Absolutely. Focus on the entrance, bed placement, and desk position first. Even a single plant in the right corner or clearing clutter can shift the energy flow significantly." },
    ],
    cta: "Find Your Auspicious Date",
    ctaLink: "/calendar",
  },
  ru: {
    title: "Фэн-шуй для дома и офиса: основы, багуа, 5 элементов | Chinese Culture Studio",
    desc: "Изучите основы фэн-шуй: энергия ци, баланс инь-ян, пять элементов, карта багуа. Практические советы для дома и офиса для привлечения удачи.",
    ogTitle: "Фэн-шуй: основы для дома и офиса",
    ogDesc: "Освойте древнее искусство размещения — от карты багуа до пяти элементов, создайте гармонию в пространстве.",
    heading: "Фэн-шуй: древнее искусство размещения",
    subtitle: "Фэн-шуй (风水, буквально «ветер-вода») — это 3000-летняя китайская практика организации пространства для гармонии с природной энергией (ци). От ориентации зданий до расстановки мебели — фэн-шуй широко применяется и сегодня.",
    whatTitle: "Что такое фэн-шуй?",
    whatBody: "Фэн-шуй основан на идее, что наше окружение влияет на благополучие. Гармонизируя пространство с потоком ци — жизненной энергии — можно улучшить здоровье, отношения и достаток. Практика опирается на даосскую философию, И-Цзин и астрономические наблюдения. Корпорации HSBC, Disney и Mandarin Oriental используют консультантов фэн-шуй при проектировании зданий.",
    principlesTitle: "Основные принципы",
    baguaTitle: "Карта Багуа",
    baguaBody: "Багуа (八卦) — восьмиугольная энергетическая карта для анализа пространства. Каждый из 8 секторов соответствует жизненной сфере: Карьера (Север), Знания (Северо-восток), Семья (Восток), Богатство (Юго-восток), Слава (Юг), Отношения (Юго-запад), Творчество (Запад), Помощники (Северо-запад). Центр — здоровье и баланс. Наложите багуа на план помещения.",
    homeTitle: "Фэн-шуй для дома",
    homeBody: "1. Держите вход свободным — входная дверь это «рот ци». 2. Кровать — по диагонали от двери, но не на одной линии («позиция гроба»). 3. Зеркала — не напротив кровати и не отражают беспорядок. 4. Баланс пяти элементов: дерево (растения) для роста, огонь (свечи) для страсти, земля (керамика) для стабильности, металл (белый/серый декор) для ясности, вода (фонтан) для изобилия. 5. Сломанные вещи чините сразу — они символизируют застой энергии.",
    officeTitle: "Фэн-шуй офиса и стола",
    officeBody: "Разместите стол в «командной позиции» — лицом к двери, но не на одной линии, с твёрдой стеной за спиной. Держите стол в порядке. Добавьте растение в углу богатства (дальний левый от вас). Тёплый свет в зоне славы (центр задней стены). Избегайте сидеть под балками или лицом к глухой стене.",
    faqs: [
      { q: "Что такое фэн-шуй простыми словами?", a: "Фэн-шуй — китайская практика организации среды для гармонии и привлечения позитивной энергии (ци). О том, чтобы вещи стояли на своих местах." },
      { q: "Работает ли фэн-шуй на самом деле?", a: "Многие люди чувствуют себя спокойнее, сосредоточеннее и успешнее после применения принципов фэн-шуй. Сама практика поощряет осознанный образ жизни." },
      { q: "Какие пять элементов в фэн-шуй?", a: "Дерево (рост), Огонь (страсть), Земля (стабильность), Металл (ясность) и Вода (мудрость). Элементы поддерживают или контролируют друг друга в циклах." },
      { q: "Как найти угол богатства?", a: "Встаньте у входной двери лицом внутрь. Дальний левый угол — зона богатства (юго-восток по багуа). Усильте фиолетовым, золотым, зелёным декором или растением." },
      { q: "Что нельзя размещать в спальне по фэн-шуй?", a: "Зеркала напротив кровати, электронику, беспорядок под кроватью, водные объекты и остроугольную мебель, направленную на кровать («ядовитые стрелы»)." },
    ],
    cta: "Найти благоприятную дату",
    ctaLink: "/calendar",
  },
  ja: {
    title: "風水の基本：家庭・オフィス・八卦ガイド | Chinese Culture Studio",
    desc: "風水の基礎を学ぶ：気のエネルギー、陰陽バランス、五行、八卦図。家庭とオフィスの実用的な配置のコツで運気を引き寄せる。",
    ogTitle: "風水の基本：家庭とオフィスのガイド",
    ogDesc: "八卦図から五行まで、古代の配置術をマスターし、空間に調和をもたらす。",
    heading: "風水：古代の配置術",
    subtitle: "風水（文字通り「風と水」）は、自然エネルギー（気）と調和するように空間を整える3000年の歴史を持つ中国の実践です。建物の向きから家具の配置まで影響を与え、今日も広く実践されています。",
    whatTitle: "風水とは？",
    whatBody: "風水は、環境が幸福に影響するという考えに基づいています。万物を流れる生命力「気」と調和して空間を整えることで、健康、人間関係、繁栄を向上できます。道教哲学、易経、観測天文学に基づいています。HSBC、ディズニー、マンダリンオリエンタルなどの大手企業も建物設計に風水コンサルタントを起用しています。",
    principlesTitle: "核心原理",
    baguaTitle: "八卦図（バグアマップ）",
    baguaBody: "八卦は空間分析のための八角形のエネルギー図です。8つの区域は人生の領域に対応：キャリア（北）、知識（北東）、家族（東）、富（南東）、名声（南）、人間関係（南西）、創造性（西）、援助者（北西）。中心は健康とバランス。八卦を間取りに重ねて注意が必要な領域を特定します。",
    homeTitle: "家庭の風水のコツ",
    homeBody: "1. 玄関をすっきりと—玄関は「気の口」。2. ベッドはドアの斜め向かいに配置し、一直線を避ける。3. 鏡は賢く使う—ベッドに向けず、散らかりを映さない。4. 五行のバランス：木（植物）で成長、火（キャンドル）で情熱、土（陶器）で安定、金（白/灰色の装飾）で明晰さ、水（噴水）で豊かさ。5. 壊れたものはすぐに修理—停滞したエネルギーを表します。",
    officeTitle: "オフィスとデスクの風水",
    officeBody: "デスクを「コマンドポジション」に—ドアに面しつつ一直線を避け、背後にしっかりした壁がある位置。デスクは整理整頓。富の角（座った位置から遠い左）に植物を。名声エリア（中央後方の壁）に暖かい照明を。梁の下や空白の壁に向かって座るのは避けましょう。",
    faqs: [
      { q: "風水とは簡単に言うと何ですか？", a: "風水とは、環境を整えて調和を生み出し、ポジティブなエネルギー（気）を人生に招く中国の実践です。物を自然に属する場所に置くことです。" },
      { q: "風水は本当に効果がありますか？", a: "多くの人が風水の原則を適用した後、より落ち着き、集中力が増し、繁栄を感じると報告しています。結果は様々ですが、この実践は意図的で mindful な生活を奨励します。" },
      { q: "風水の五行とは？", a: "木（成長・活力）、火（情熱・変容）、土（安定・滋養）、金（明晰さ・精密さ）、水（知恵・豊かさ）。各要素はサイクルの中で互いに支え合い、制御し合います。" },
      { q: "富の角の見つけ方は？", a: "玄関に立って中を向きます。遠い左の角が富のエリア（八卦では南東）。紫、金、緑の装飾、健康な植物、小さな水の装飾で強化します。" },
    ],
    cta: "吉日を探す",
    ctaLink: "/calendar",
  },
  ko: {
    title: "풍수 기본: 가정・사무실・팔괘 가이드 | Chinese Culture Studio",
    desc: "풍수의 기초 배우기: 기 에너지, 음양 균형, 오행, 팔괘도. 가정과 사무실 배치에 대한 실용적인 팁으로 행운을 불러들이세요.",
    ogTitle: "풍수 기본: 가정과 사무실 가이드",
    ogDesc: "팔괘도에서 오행까지, 고대의 배치 기술을 마스터하여 공간에 조화를 창조하세요.",
    heading: "풍수: 고대의 배치 기술",
    subtitle: "풍수(风水, 문자 그대로 '바람-물')는 자연 에너지(기)와 조화를 이루도록 공간을 배치하는 3,000년 된 중국의 실천법입니다. 건물 방향에서 가구 배치까지 영향을 미치며 오늘날에도 널리 사용됩니다.",
    whatTitle: "풍수란 무엇인가?",
    whatBody: "풍수는 환경이 웰빙에 영향을 미친다는 생각에 기초합니다. 만물을 흐르는 생명력 '기'와 조화롭게 공간을 배치함으로써 건강, 관계, 번영을 향상시킬 수 있습니다. 도교 철학, 주역, 관측 천문학에 기반을 둡니다. HSBC, 디즈니, 만다린 오리엔탈 등 주요 기업들도 건물 설계 시 풍수 컨설턴트를 고용합니다.",
    principlesTitle: "핵심 원리",
    baguaTitle: "팔괘도 (바구아 맵)",
    baguaBody: "팔괘(八卦)는 공간 분석을 위한 팔각형 에너지 지도입니다. 8개 구역은 각각 삶의 영역에 대응: 직업(북), 지식(북동), 가족(동), 부(남동), 명성(남), 관계(남서), 창의성(서), 조력자(북서). 중심은 건강과 균형. 팔괘를 평면도에 겹쳐서 주의가 필요한 영역을 파악하세요.",
    homeTitle: "가정 풍수 팁",
    homeBody: "1. 현관을 깨끗하게—현관문은 '기의 입'. 2. 침대는 문과 대각선으로 배치하되 일직선을 피하세요. 3. 거울은 현명하게—침대를 향하지 않도록. 4. 오행 균형: 목(식물)은 성장, 화(양초)는 열정, 토(도자기)는 안정, 금(흰색/회색 장식)은 명확함, 수(분수)는 풍요를 위해. 5. 고장난 물건은 즉시 수리—정체된 에너지를 상징합니다.",
    officeTitle: "사무실과 책상 풍수",
    officeBody: "책상을 '커맨드 포지션'에—문을 향하되 일직선을 피하고 등 뒤에 단단한 벽이 있는 위치. 책상을 깔끔하게 유지. 부의 코너(앉은 위치에서 먼 왼쪽)에 식물을. 명성 구역(중앙 뒷벽)에 따뜻한 조명. 들보 아래나 빈 벽을 향해 앉는 것은 피하세요.",
    faqs: [
      { q: "풍수를 간단히 말하면 무엇인가요?", a: "풍수는 환경을 정리하여 조화를 만들고 긍정적인 에너지(기)를 삶에 초대하는 중국의 실천법입니다. 물건을 자연스럽게 속한 곳에 두는 것입니다." },
      { q: "풍수는 실제로 효과가 있나요?", a: "많은 사람들이 풍수 원칙을 적용한 후 더 차분해지고, 집중력이 높아지고, 더 번영한다고 보고합니다. 결과는 다양하지만, 이 실천은 의도적이고 mindful 한 생활을 장려합니다." },
      { q: "풍수의 오행이란?", a: "목(성장·활력), 화(열정·변형), 토(안정·자양), 금(명확함·정밀함), 수(지혜·풍요). 각 요소는 순환 속에서 서로를 지원하거나 제어합니다." },
      { q: "부의 코너를 찾는 방법은?", a: "현관에 서서 안쪽을 향합니다. 먼 왼쪽 코너가 부의 영역(팔괘에서는 남동쪽). 보라색, 금색, 녹색 장식, 건강한 식물, 작은 물 장식으로 강화하세요." },
    ],
    cta: "길일 찾기",
    ctaLink: "/calendar",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return {
    title: c.title,
    description: c.desc,
    openGraph: { title: c.ogTitle, description: c.ogDesc },
    robots: "index, follow",
    alternates: {
      languages: {
        en: `${BASE_URL}/guide/feng-shui`,
        ru: `${BASE_URL}/ru/guide/feng-shui`,
        ja: `${BASE_URL}/ja/guide/feng-shui`,
        ko: `${BASE_URL}/ko/guide/feng-shui`,
      },
    },
  };
}

export default function FengShuiPage({ params }: Props) {
  const c = CONTENT[params.locale] || CONTENT.en;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center" style={{ color: "var(--accent)" }}>
        {c.heading}
      </h1>
      <p className="text-sm text-stone-500 text-center mb-8">{c.subtitle}</p>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.whatTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{c.whatBody}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.baguaTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{c.baguaBody}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.homeTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{c.homeBody}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.officeTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{c.officeBody}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-8 text-center">
        <p className="text-sm text-stone-600 mb-4">Apply Feng Shui principles starting with the right timing.</p>
        <Link href={c.ctaLink} className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
          {c.cta} →
        </Link>
      </section>

      <GuideFaq faqs={c.faqs} lang={params.locale} />
    </div>
  );
}
