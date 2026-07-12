import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whatTitle: string; whatBody: string;
  featuresTitle: string;
  faqs: { q: string; a: string }[];
  cta: string;
}> = {
  en: {
    title: "Mian Xiang Face Reading: What Your Facial Features Reveal (7 Features) | Chinese Culture Studio",
    desc: "Mian Xiang (face reading): what do your forehead, eyes, nose, mouth, ears & chin say about your personality, career & fortune? 7 facial features decoded.",
    ogTitle: "Mian Xiang Face Reading: 7 Facial Features & Their Meanings",
    ogDesc: "Mian Xiang face reading guide — 7 features: forehead, eyes, nose, mouth, ears, chin. What do yours reveal about your destiny?",
    heading: "Face Reading (Mian Xiang): Read Faces Like the Ancients",
    subtitle: "Mian Xiang (面相) is the 3,000-year-old Chinese practice of understanding a person's character, fortune, and destiny through their facial features. Alongside palm reading and I Ching, it forms one of the three pillars of Chinese metaphysical arts. Emperors used it to select officials; today, it's used for self-understanding and relationship insight.",
    whatTitle: "What Is Mian Xiang?",
    whatBody: "Mian Xiang divides the face into three zones (三停): the upper zone (forehead) governs youth and intellect, the middle zone (eyes to nose) governs career and relationships in midlife, and the lower zone (mouth to chin) governs later years and security. Each facial feature corresponds to an aspect of life: the nose represents wealth, the eyes represent wisdom, the mouth represents communication, and the ears represent longevity. The art is based on Taoist observation that internal character shapes external appearance over time.",
    featuresTitle: "Key Facial Features & Their Meanings",
    faqs: [
      { q: "What does a high forehead mean in face reading?", a: "A broad, high forehead indicates intelligence, curiosity, and early career success. It's associated with people who think strategically. A narrow or short forehead may suggest a more practical, hands-on nature." },
      { q: "What does the nose say about wealth?", a: "In Mian Xiang, the nose is the 'palace of wealth' (财帛宫). A strong, straight nose with a rounded tip suggests good financial fortune and leadership ability. The size should be proportional — a well-balanced nose matters more than a large one." },
      { q: "What do big eyes vs small eyes mean?", a: "Large, bright eyes suggest openness, expressiveness, and warmth. Small, sharp eyes indicate focus, analytical ability, and attention to detail. The shape matters more than size — upturned corners suggest optimism, downturned corners suggest sensitivity." },
      { q: "What do full lips reveal?", a: "Full lips suggest warmth, generosity, and strong communication skills. Thin lips indicate a more reserved, analytical personality. The mouth's shape when relaxed reveals how a person expresses emotions." },
      { q: "What do big ears mean in Chinese face reading?", a: "Large, thick earlobes are considered very auspicious — they suggest longevity, good fortune, and strong support from others. Many depictions of Buddha show elongated earlobes for this reason." },
      { q: "Can your face change with your fortune?", a: "Yes — Mian Xiang teaches that as your inner character and life circumstances change, your facial features subtly shift over time. This is why face reading is not considered 'fortune telling' but rather a reflection of your current path." },
    ],
    cta: "Try Palm Reading Instead",
  },
  ru: {
    title: "Чтение лица (Мянь Сян): значение лба, глаз, носа | Chinese Culture Studio",
    desc: "Откройте древнее китайское искусство чтения лица (面相 Мянь Сян). Узнайте, что ваш лоб, глаза, нос, рот, уши и подбородок говорят о личности и судьбе.",
    ogTitle: "Чтение лица (Мянь Сян): значение черт лица",
    ogDesc: "Древнее китайское чтение лица — что черты лица говорят о характере, карьере и удаче.",
    heading: "Мянь Сян: читайте лица как древние",
    subtitle: "Мянь Сян (面相) — 3000-летняя китайская практика понимания характера, удачи и судьбы через черты лица. Вместе с хиромантией и И-Цзин составляет три столпа китайской метафизики. Императоры использовали её для отбора чиновников; сегодня — для самопознания.",
    whatTitle: "Что такое Мянь Сян?",
    whatBody: "Мянь Сян делит лицо на три зоны (三停): верхняя (лоб) — молодость и интеллект, средняя (глаза до носа) — карьера и отношения в зрелости, нижняя (рот до подбородка) — поздние годы и безопасность. Каждая черта соответствует аспекту жизни: нос — богатство, глаза — мудрость, рот — общение, уши — долголетие. Искусство основано на даосском наблюдении, что внутренний характер формирует внешность.",
    featuresTitle: "Ключевые черты лица и их значение",
    faqs: [
      { q: "Что означает высокий лоб?", a: "Широкий, высокий лоб указывает на интеллект, любознательность и ранний карьерный успех. Узкий лоб предполагает практичный, приземлённый характер." },
      { q: "Что нос говорит о богатстве?", a: "В Мянь Сян нос — «дворец богатства» (财帛宫). Сильный, прямой нос с округлым кончиком сулит финансовую удачу и лидерство. Пропорциональность важнее размера." },
      { q: "Что означают большие и маленькие глаза?", a: "Большие, яркие глаза — открытость и теплота. Маленькие, острые глаза — фокус и аналитические способности. Форма важнее размера: приподнятые уголки — оптимизм, опущенные — чувствительность." },
      { q: "Что раскрывают полные губы?", a: "Полные губы — теплота, щедрость, хорошие коммуникативные навыки. Тонкие губы — сдержанный, аналитический характер. Форма рта в покое показывает, как человек выражает эмоции." },
      { q: "Что означают большие уши?", a: "Большие, толстые мочки ушей — очень благоприятный знак: долголетие, удача, сильная поддержка окружающих. Изображения Будды часто показывают удлинённые мочки именно поэтому." },
    ],
    cta: "Попробуйте чтение ладони",
  },
  ja: {
    title: "人相学（面相）：額・目・鼻の意味 | Chinese Culture Studio",
    desc: "古代中国の人相学（面相ミェンシャン）を発見。額、目、鼻、口、耳、あごが性格と運命について何を明らかにするかを学ぶ。",
    ogTitle: "人相学（面相）：顔の特徴の意味",
    ogDesc: "古代中国の人相学 — 顔の特徴が性格、キャリア、運勢について語ること。",
    heading: "面相（ミェンシャン）：古代のように顔を読む",
    subtitle: "面相は、顔の特徴を通じて人の性格、運勢、運命を理解する3,000年の歴史を持つ中国の実践です。手相、易経と並んで中国形而上学の三本柱を形成します。皇帝は官僚の選抜に使用し、今日では自己理解や人間関係の洞察に使われています。",
    whatTitle: "面相とは？",
    whatBody: "面相は顔を三つのゾーン（三停）に分けます：上部（額）は若年期と知性、中部（目から鼻）は中年期のキャリアと人間関係、下部（口からあご）は晩年と安定を司ります。各部位は人生の側面に対応：鼻は富、目は知恵、口はコミュニケーション、耳は長寿を表します。この技術は、内面の性格が時間とともに外見を形成するという道教の観察に基づいています。",
    featuresTitle: "主要な顔の特徴とその意味",
    faqs: [
      { q: "額が広いと何を意味しますか？", a: "広く高い額は知性、好奇心、早期のキャリア成功を示します。戦略的思考をする人に見られます。狭い額は実践的で地に足のついた性質を示唆します。" },
      { q: "鼻は富について何を語りますか？", a: "面相では、鼻は「財帛宮」（富の宮）です。強くまっすぐな鼻と丸みのある鼻先は、金運とリーダーシップを示します。大きさよりバランスが重要です。" },
      { q: "大きな目と小さな目は何を意味しますか？", a: "大きく明るい目は開放性、表現力、温かさを示します。小さく鋭い目は集中力と分析力を示します。形が重要で、上がった目尻は楽観、下がった目尻は感受性を示唆します。" },
      { q: "厚い唇は何を明らかにしますか？", a: "厚い唇は温かさ、寛大さ、優れたコミュニケーション力を示します。薄い唇はより控えめで分析的な性格を示します。リラックスした口元の形が感情表現の仕方を明らかにします。" },
      { q: "大きな耳は人相学で何を意味しますか？", a: "大きく厚い耳たぶは非常に縁起が良いとされ、長寿、幸運、周囲からの強い支援を示します。仏像の耳が長いのもこの理由からです。" },
    ],
    cta: "手相を見る",
  },
  ko: {
    title: "관상학 (면상): 이마・눈・코의 의미 | Chinese Culture Studio",
    desc: "고대 중국의 관상학(面相 미엔샹)을 발견하세요. 이마, 눈, 코, 입, 귀, 턱이 성격과 운명에 대해 무엇을 드러내는지 배우세요.",
    ogTitle: "관상학 (면상): 얼굴 특징의 의미",
    ogDesc: "고대 중국의 관상학 — 얼굴 특징이 성격, 경력, 운세에 대해 말해주는 것.",
    heading: "면상(미엔샹): 고대인처럼 얼굴을 읽다",
    subtitle: "면상(面相)은 얼굴 특징을 통해 사람의 성격, 운세, 운명을 이해하는 3,000년 된 중국의 실천법입니다. 수상, 주역과 함께 중국 형이상학의 세 기둥을 이룹니다. 황제는 관리를 선발하는 데 사용했고, 오늘날에는 자기 이해와 관계 통찰에 사용됩니다.",
    whatTitle: "면상이란?",
    whatBody: "면상은 얼굴을 세 구역(삼정)으로 나눕니다: 상부(이마)는 청년기와 지성, 중부(눈에서 코까지)는 중년의 경력과 관계, 하부(입에서 턱까지)는 노년과 안정을 관장합니다. 각 부위는 삶의 측면에 대응: 코는 부, 눈은 지혜, 입은 소통, 귀는 장수를 나타냅니다. 이 기술은 내면의 성격이 시간이 지남에 따라 외모를 형성한다는 도교의 관찰에 기초합니다.",
    featuresTitle: "주요 얼굴 특징과 그 의미",
    faqs: [
      { q: "넓은 이마는 무엇을 의미하나요?", a: "넓고 높은 이마는 지성, 호기심, 조기 경력 성공을 나타냅니다. 전략적 사고를 하는 사람들에게 보입니다. 좁은 이마는 실용적이고 현실적인 성격을 시사합니다." },
      { q: "코는 부에 대해 무엇을 말하나요?", a: "면상에서 코는 '재백궁'(부의 궁)입니다. 강하고 곧은 코와 둥근 코끝은 금전운과 리더십을 나타냅니다. 크기보다 균형이 중요합니다." },
      { q: "큰 눈과 작은 눈은 무엇을 의미하나요?", a: "크고 밝은 눈은 개방성, 표현력, 따뜻함을 나타냅니다. 작고 날카로운 눈은 집중력과 분석력을 나타냅니다. 모양이 중요하며, 올라간 눈꼬리는 낙관주의, 내려간 눈꼬리는 민감성을 시사합니다." },
      { q: "두꺼운 입술은 무엇을 드러내나요?", a: "두꺼운 입술은 따뜻함, 관대함, 뛰어난 소통 능력을 나타냅니다. 얇은 입술은 더 내성적이고 분석적인 성격을 나타냅니다. 편안한 입 모양이 감정 표현 방식을 드러냅니다." },
      { q: "큰 귀는 관상학에서 무엇을 의미하나요?", a: "크고 두꺼운 귓불은 매우 길한 것으로 여겨지며, 장수, 행운, 주변의 강한 지원을 나타냅니다. 부처님의 귀가 긴 것도 이 때문입니다." },
    ],
    cta: "수상 보기",
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
        en: `${BASE_URL}/guide/face-reading`,
        ru: `${BASE_URL}/ru/guide/face-reading`,
        ja: `${BASE_URL}/ja/guide/face-reading`,
        ko: `${BASE_URL}/ko/guide/face-reading`,
      },
    },
  };
}

const FEATURES: Record<string, { feature: string; meaning: string }[]> = {
  en: [
    { feature: "Forehead (額)", meaning: "Intellect, early fortune, parental influence. A broad, smooth forehead is highly auspicious — it suggests intelligence and noble character." },
    { feature: "Eyebrows (眉)", meaning: "Relationships, temperament, social skills. Thick, well-shaped brows without gaps indicate strong friendships. Thin, sparse brows suggest a more solitary nature." },
    { feature: "Eyes (眼)", meaning: "Wisdom, spirit, emotional depth. Clear, bright eyes with a defined iris suggest intelligence and vitality. The eyes are considered the most important feature in Mian Xiang." },
    { feature: "Nose (鼻)", meaning: "Wealth, ambition, leadership. The bridge represents career (high bridge = strong drive), the tip represents current finances (full tip = good savings)." },
    { feature: "Mouth (口)", meaning: "Communication, honesty, sensuality. Upward-turned corners suggest optimism; a well-defined cupid's bow suggests expressiveness." },
    { feature: "Ears (耳)", meaning: "Longevity, risk-taking, childhood fortune. Ears positioned higher than the eyebrows suggest early success. Long earlobes are a classic sign of wisdom and long life." },
    { feature: "Chin (頷)", meaning: "Later life, security, determination. A strong, slightly protruding chin suggests persistence and a comfortable retirement. A receding chin suggests a more adaptable nature." },
  ],
  ru: [
    { feature: "Лоб (額)", meaning: "Интеллект, ранняя удача, влияние родителей. Широкий гладкий лоб — благоприятный знак ума и благородства." },
    { feature: "Брови (眉)", meaning: "Отношения, темперамент, социальные навыки. Густые, хорошо оформленные брови — крепкая дружба. Тонкие брови — склонность к уединению." },
    { feature: "Глаза (眼)", meaning: "Мудрость, дух, эмоциональная глубина. Ясные, яркие глаза с чёткой радужкой — ум и жизненная сила. Глаза — важнейшая черта в Мянь Сян." },
    { feature: "Нос (鼻)", meaning: "Богатство, амбиции, лидерство. Переносица — карьера, кончик — текущие финансы. Полный кончик — хорошие сбережения." },
    { feature: "Рот (口)", meaning: "Общение, честность, чувственность. Приподнятые уголки — оптимизм. Чёткая дуга Купидона — выразительность." },
    { feature: "Уши (耳)", meaning: "Долголетие, склонность к риску, детская удача. Уши выше бровей — ранний успех. Длинные мочки — мудрость и долгая жизнь." },
    { feature: "Подбородок (頷)", meaning: "Поздние годы, безопасность, решительность. Сильный подбородок — настойчивость и комфортная старость. Скошенный — адаптивность." },
  ],
  ja: [
    { feature: "額（ひたい）", meaning: "知性、早期の運勢、親の影響。広く滑らかな額は非常に縁起が良く、知性と高貴な性格を示します。" },
    { feature: "眉（まゆ）", meaning: "人間関係、気質、社交性。太く整った眉は強い友情を示します。薄い眉はより孤高な性質を示唆します。" },
    { feature: "目（め）", meaning: "知恵、精神、感情の深さ。澄んだ明るい目とはっきりした虹彩は知性と活力を示します。目は面相で最も重要な特徴です。" },
    { feature: "鼻（はな）", meaning: "富、野心、リーダーシップ。鼻梁はキャリア（高い鼻梁＝強い意欲）、鼻先は現在の財政（豊かな鼻先＝良い貯蓄）。" },
    { feature: "口（くち）", meaning: "コミュニケーション、誠実さ、感受性。上がった口角は楽観主義を示します。明確なキューピッドボウは表現力を示します。" },
    { feature: "耳（みみ）", meaning: "長寿、リスク志向、幼年期の運勢。眉より高い位置の耳は早期の成功を示します。長い耳たぶは知恵と長寿の古典的な印です。" },
    { feature: "あご（頷）", meaning: "晩年、安定、決断力。強いあごは粘り強さと快適な老後を示します。後退したあごは適応力を示します。" },
  ],
  ko: [
    { feature: "이마 (額)", meaning: "지성, 초기 운세, 부모의 영향. 넓고 매끄러운 이마는 지성과 고귀한 성격을 나타내는 길한 신호입니다." },
    { feature: "눈썹 (眉)", meaning: "관계, 기질, 사회적 기술. 두껍고 잘 정리된 눈썹은 강한 우정을 나타냅니다. 얇은 눈썹은 더 고독한 성향을 시사합니다." },
    { feature: "눈 (眼)", meaning: "지혜, 정신, 감정의 깊이. 맑고 밝은 눈과 뚜렷한 홍채는 지성과 활력을 나타냅니다. 눈은 면상에서 가장 중요한 특징입니다." },
    { feature: "코 (鼻)", meaning: "부, 야망, 리더십. 콧대는 경력(높은 콧대=강한 의욕), 코끝은 현재 재정(풍만한 코끝=좋은 저축)." },
    { feature: "입 (口)", meaning: "소통, 정직, 감수성. 올라간 입꼬리는 낙관주의를 나타냅니다. 뚜렷한 큐피드 보우는 표현력을 나타냅니다." },
    { feature: "귀 (耳)", meaning: "장수, 위험 감수, 유년기 운세. 눈썹보다 높은 귀는 조기 성공을 나타냅니다. 긴 귓불은 지혜와 장수의 고전적 표시입니다." },
    { feature: "턱 (頷)", meaning: "노년, 안정, 결단력. 강한 턱은 끈기와 편안한 은퇴를 나타냅니다. 뒤로 물러난 턱은 적응력을 나타냅니다." },
  ],
};

export default function FaceReadingPage({ params }: Props) {
  const c = CONTENT[params.locale] || CONTENT.en;
  const features = FEATURES[params.locale] || FEATURES.en;

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

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{c.featuresTitle}</h2>
        <div className="space-y-3">
          {features.map((f) => (
            <div key={f.feature} className="card-classic p-3 sm:p-4 flex gap-4">
              <div className="text-xl sm:text-2xl w-10 text-center flex-shrink-0">{f.feature.split(" ")[1] || "◉"}</div>
              <div>
                <div className="text-sm font-medium text-stone-700">{f.feature}</div>
                <p className="text-xs text-stone-500 mt-0.5">{f.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-8 text-center">
        <p className="text-sm text-stone-600 mb-4">Face reading and palm reading are complementary arts.</p>
        <Link href="/palm-reading" className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
          {c.cta} →
        </Link>
      </section>

      <GuideFaq faqs={c.faqs} lang={params.locale} />
    </div>
  );
}
