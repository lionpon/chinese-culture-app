type LocaleRecord<T> = Record<"en" | "ru" | "ja" | "ko", T>;

export interface QuizQuestion {
  id: number;
  question: LocaleRecord<string>;
  options: { label: LocaleRecord<string>; scores: Record<string, number> }[];
}

export interface ElementResult {
  element: LocaleRecord<string>;
  elementZh: string;
  description: LocaleRecord<string>;
  career: LocaleRecord<string>;
  compatible: LocaleRecord<string>;
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: {
      en: "How do you prefer to spend your free time?",
      ru: "Как вы предпочитаете проводить свободное время?",
      ja: "自由時間をどのように過ごすのが好きですか？",
      ko: "자유 시간을 어떻게 보내는 것을 좋아하나요?",
    },
    options: [
      { label: { en: "Exploring nature, hiking", ru: "Исследуя природу, походы", ja: "自然探索、ハイキング", ko: "자연 탐험, 하이킹" }, scores: { Wood: 3, Fire: 0, Earth: 1, Metal: 1, Water: 0 } },
      { label: { en: "Socializing with friends", ru: "Общаясь с друзьями", ja: "友達と交流する", ko: "친구들과 어울리기" }, scores: { Wood: 0, Fire: 3, Earth: 1, Metal: 0, Water: 1 } },
      { label: { en: "Reading or quiet reflection", ru: "Читая или размышляя", ja: "読書や静かな内省", ko: "독서 또는 조용한 사색" }, scores: { Wood: 1, Fire: 0, Earth: 2, Metal: 1, Water: 2 } },
      { label: { en: "Organizing or planning things", ru: "Организуя или планируя", ja: "整理整頓や計画を立てる", ko: "정리하거나 계획 세우기" }, scores: { Wood: 1, Fire: 0, Earth: 1, Metal: 3, Water: 0 } },
    ],
  },
  {
    id: 2,
    question: {
      en: "What drives you most?",
      ru: "Что вас больше всего мотивирует?",
      ja: "あなたを最も駆り立てるものは？",
      ko: "당신을 가장 움직이게 하는 것은?",
    },
    options: [
      { label: { en: "Growth and new possibilities", ru: "Рост и новые возможности", ja: "成長と新しい可能性", ko: "성장과 새로운 가능성" }, scores: { Wood: 3, Fire: 0, Earth: 0, Metal: 1, Water: 1 } },
      { label: { en: "Passion and excitement", ru: "Страсть и волнение", ja: "情熱と興奮", ko: "열정과 흥분" }, scores: { Wood: 1, Fire: 3, Earth: 0, Metal: 0, Water: 1 } },
      { label: { en: "Stability and harmony", ru: "Стабильность и гармония", ja: "安定と調和", ko: "안정과 조화" }, scores: { Wood: 0, Fire: 0, Earth: 3, Metal: 1, Water: 1 } },
      { label: { en: "Excellence and precision", ru: "Совершенство и точность", ja: "卓越性と正確さ", ko: "탁월함과 정밀성" }, scores: { Wood: 0, Fire: 1, Earth: 0, Metal: 3, Water: 1 } },
      { label: { en: "Wisdom and deep understanding", ru: "Мудрость и глубокое понимание", ja: "知恵と深い理解", ko: "지혜와 깊은 이해" }, scores: { Wood: 1, Fire: 0, Earth: 1, Metal: 0, Water: 3 } },
    ],
  },
  {
    id: 3,
    question: {
      en: "When facing a challenge, you tend to:",
      ru: "Сталкиваясь с трудностью, вы склонны:",
      ja: "困難に直面したとき、あなたは：",
      ko: "도전에 직면했을 때, 당신은:",
    },
    options: [
      { label: { en: "Push through with direct action", ru: "Действовать напрямую", ja: "直接行動で押し進む", ko: "직접 행동으로 밀고 나간다" }, scores: { Wood: 3, Fire: 1, Earth: 0, Metal: 0, Water: 0 } },
      { label: { en: "Inspire others to tackle it together", ru: "Вдохновлять других решать вместе", ja: "他の人を鼓舞して一緒に取り組む", ko: "다른 사람들과 함께 해결하도록 독려한다" }, scores: { Wood: 0, Fire: 3, Earth: 1, Metal: 0, Water: 1 } },
      { label: { en: "Stay calm and mediate between sides", ru: "Сохранять спокойствие и посредничать", ja: "冷静さを保ち、仲裁する", ko: "차분하게 중재한다" }, scores: { Wood: 0, Fire: 0, Earth: 3, Metal: 1, Water: 1 } },
      { label: { en: "Analyze the situation thoroughly first", ru: "Сначала тщательно анализировать", ja: "まず徹底的に分析する", ko: "먼저 철저히 분석한다" }, scores: { Wood: 1, Fire: 0, Earth: 0, Metal: 2, Water: 2 } },
    ],
  },
  {
    id: 4,
    question: {
      en: "Which environment feels most like home?",
      ru: "Какая обстановка больше всего похожа на дом?",
      ja: "どの環境が最も家のように感じますか？",
      ko: "어떤 환경이 가장 집처럼 느껴지나요?",
    },
    options: [
      { label: { en: "A lush forest or garden", ru: "Пышный лес или сад", ja: "緑豊かな森や庭", ko: "무성한 숲이나 정원" }, scores: { Wood: 3, Fire: 0, Earth: 1, Metal: 0, Water: 0 } },
      { label: { en: "A lively party or festival", ru: "Оживлённая вечеринка или фестиваль", ja: "賑やかなパーティーや祭り", ko: "활기찬 파티나 축제" }, scores: { Wood: 0, Fire: 3, Earth: 1, Metal: 0, Water: 0 } },
      { label: { en: "A cozy family kitchen", ru: "Уютная семейная кухня", ja: "居心地の良い家族の台所", ko: "아늑한 가족 주방" }, scores: { Wood: 0, Fire: 0, Earth: 3, Metal: 1, Water: 0 } },
      { label: { en: "A quiet library or study", ru: "Тихая библиотека или кабинет", ja: "静かな図書館や書斎", ko: "조용한 도서관이나 서재" }, scores: { Wood: 1, Fire: 0, Earth: 0, Metal: 2, Water: 2 } },
      { label: { en: "A peaceful lake or seaside", ru: "Спокойное озеро или побережье", ja: "穏やかな湖や海辺", ko: "평화로운 호수나 해변" }, scores: { Wood: 0, Fire: 0, Earth: 1, Metal: 0, Water: 3 } },
    ],
  },
  {
    id: 5,
    question: {
      en: "How do you make important decisions?",
      ru: "Как вы принимаете важные решения?",
      ja: "重要な決定をどのように下しますか？",
      ko: "중요한 결정을 어떻게 내리나요?",
    },
    options: [
      { label: { en: "Trust my gut instinct", ru: "Доверяю интуиции", ja: "直感を信じる", ko: "직감을 신뢰한다" }, scores: { Wood: 1, Fire: 2, Earth: 1, Metal: 0, Water: 1 } },
      { label: { en: "Follow my passion and excitement", ru: "Следую страсти и волнению", ja: "情熱と興奮に従う", ko: "열정과 흥분을 따른다" }, scores: { Wood: 0, Fire: 3, Earth: 0, Metal: 1, Water: 1 } },
      { label: { en: "Consider what's best for everyone involved", ru: "Думаю, что лучше для всех", ja: "関係者全員にとって何が最善か考える", ko: "관련된 모두에게 가장 좋은 것을 고려한다" }, scores: { Wood: 1, Fire: 0, Earth: 3, Metal: 1, Water: 0 } },
      { label: { en: "Weigh pros and cons systematically", ru: "Систематически взвешиваю за и против", ja: "体系的に賛否を比較検討する", ko: "체계적으로 장단점을 비교한다" }, scores: { Wood: 0, Fire: 0, Earth: 0, Metal: 3, Water: 2 } },
    ],
  },
  {
    id: 6,
    question: {
      en: "Which of these appeals to you most?",
      ru: "Что из этого вас больше всего привлекает?",
      ja: "これらのうち、最も魅力的なのは？",
      ko: "다음 중 가장 마음에 드는 것은?",
    },
    options: [
      { label: { en: "Starting a new creative project", ru: "Начать новый творческий проект", ja: "新しい創造的プロジェクトを始める", ko: "새로운 창의적 프로젝트 시작하기" }, scores: { Wood: 3, Fire: 1, Earth: 0, Metal: 0, Water: 0 } },
      { label: { en: "Being recognized for my achievements", ru: "Получить признание за достижения", ja: "成果が認められること", ko: "성취에 대한 인정을 받는 것" }, scores: { Wood: 0, Fire: 3, Earth: 0, Metal: 1, Water: 0 } },
      { label: { en: "Helping someone through a tough time", ru: "Помочь кому-то в трудную минуту", ja: "困っている人を助ける", ko: "어려운 시간을 겪는 누군가를 돕는 것" }, scores: { Wood: 0, Fire: 0, Earth: 3, Metal: 0, Water: 2 } },
      { label: { en: "Mastering a difficult skill", ru: "Овладеть сложным навыком", ja: "難しいスキルを習得する", ko: "어려운 기술을 숙달하는 것" }, scores: { Wood: 1, Fire: 0, Earth: 0, Metal: 3, Water: 1 } },
    ],
  },
];

export const elementResults: Record<string, ElementResult> = {
  Wood: {
    element: { en: "Wood", ru: "Дерево", ja: "木", ko: "목" },
    elementZh: "木",
    description: {
      en: "You are like a strong, growing tree — ambitious, flexible, and always reaching upward. Wood types are natural-born leaders who thrive on growth and new beginnings. You're creative, idealistic, and generous with your energy.",
      ru: "Вы как сильное, растущее дерево — амбициозный, гибкий и всегда стремящийся вверх. Люди типа Дерева — прирождённые лидеры, которые процветают от роста и новых начинаний. Вы творческие, идеалистичные и щедрые своей энергией.",
      ja: "あなたは強く成長する木のような存在 — 野心的で柔軟、常に上を目指します。木タイプは生まれながらのリーダーで、成長と新しい始まりに活気づきます。創造的で理想主義的、エネルギーを惜しみなく与えます。",
      ko: "당신은 강하게 자라는 나무와 같습니다 — 야심 차고 유연하며 항상 위를 향합니다. 목 타입은 타고난 리더로 성장과 새로운 시작에서 번창합니다. 창의적이고 이상주의적이며 에너지를 아낌없이 나눕니다.",
    },
    career: {
      en: "You excel in roles requiring vision and growth: entrepreneurship, education, coaching, environmental work, or any role where you can nurture ideas into reality.",
      ru: "Вы преуспеваете в ролях, требующих видения и роста: предпринимательство, образование, коучинг, экология или любая роль, где вы можете воплощать идеи в реальность.",
      ja: "ビジョンと成長が求められる役割で優れた力を発揮します：起業、教育、コーチング、環境関連の仕事、アイデアを現実に育てる役割です。",
      ko: "비전과 성장이 필요한 역할에서 탁월합니다: 기업가 정신, 교육, 코칭, 환경 관련 일, 아이디어를 현실로 키워내는 모든 역할.",
    },
    compatible: {
      en: "You work best with Fire types (they fuel your growth) and Water types (they nourish you). Earth types may feel too restrictive.",
      ru: "Вы лучше всего работаете с типами Огня (они питают ваш рост) и Воды (они питают вас). Типы Земли могут казаться слишком ограничивающими.",
      ja: "火タイプ（あなたの成長を促進する）や水タイプ（あなたを育む）と最も相性が良いです。土タイプは制限的に感じるかもしれません。",
      ko: "화 타입(성장을 촉진) 및 수 타입(양분을 공급)과 가장 잘 맞습니다. 토 타입은 너무 제한적으로 느껴질 수 있습니다.",
    },
    color: "#4a8c3f",
  },
  Fire: {
    element: { en: "Fire", ru: "Огонь", ja: "火", ko: "화" },
    elementZh: "火",
    description: {
      en: "You burn bright like a flame — passionate, charismatic, and full of life. Fire types light up every room and inspire those around them. You're warm-hearted, expressive, and thrive on connection and excitement.",
      ru: "Вы горите ярко, как пламя — страстный, харизматичный и полный жизни. Люди типа Огня освещают каждую комнату и вдохновляют окружающих. Вы добросердечные, выразительные и процветаете от связей и волнения.",
      ja: "あなたは炎のように明るく燃え上がります — 情熱的で、カリスマ性があり、生命力に溢れています。火タイプはどんな場も明るくし、周囲の人を鼓舞します。心温かく、表現力豊かで、つながりと興奮に生きます。",
      ko: "당신은 불꽃처럼 밝게 타오릅니다 — 열정적이고 카리스마 있으며 생명력이 넘칩니다. 화 타입은 모든 공간을 밝히고 주변 사람들에게 영감을 줍니다. 마음이 따뜻하고 표현력이 풍부하며 연결과 흥분에서 번창합니다.",
    },
    career: {
      en: "You shine in dynamic, people-facing roles: performing arts, marketing, public speaking, event planning, sales, or any career where your natural charisma can inspire others.",
      ru: "Вы блистаете в динамичных, ориентированных на людей ролях: исполнительское искусство, маркетинг, публичные выступления, организация мероприятий, продажи или любая карьера, где ваша природная харизма может вдохновлять других.",
      ja: "ダイナミックで人と接する役割で輝きます：舞台芸術、マーケティング、講演、イベント企画、営業など、あなたの天性のカリスマ性が他者を鼓舞できるキャリアです。",
      ko: "역동적이고 사람을 대하는 역할에서 빛납니다: 공연 예술, 마케팅, 대중 연설, 이벤트 기획, 영업 등 타고난 카리스마로 다른 사람들에게 영감을 줄 수 있는 모든 직업.",
    },
    compatible: {
      en: "You connect easily with Wood types (they feed your fire) and Earth types (your warmth nurtures them). Water types may dampen your spirit at times.",
      ru: "Вы легко соединяетесь с типами Дерева (они питают ваш огонь) и Земли (ваше тепло питает их). Типы Воды могут иногда гасить ваш дух.",
      ja: "木タイプ（あなたの火を燃やす）や土タイプ（あなたの温かさが彼らを育てる）と簡単につながります。水タイプは時にあなたの精神をくじくかもしれません。",
      ko: "목 타입(당신의 불을 키움) 및 토 타입(당신의 따뜻함이 그들을 키움)과 쉽게 연결됩니다. 수 타입은 때때로 당신의 기운을 꺾을 수 있습니다.",
    },
    color: "#c0392b",
  },
  Earth: {
    element: { en: "Earth", ru: "Земля", ja: "土", ko: "토" },
    elementZh: "土",
    description: {
      en: "You are grounded like the earth — stable, nurturing, and deeply reliable. Earth types are the foundation that others depend on. You're patient, empathetic, and have a natural gift for creating harmony.",
      ru: "Вы заземлены, как земля — стабильный, питающий и глубоко надёжный. Люди типа Земли — это основа, на которую полагаются другие. Вы терпеливые, эмпатичные и обладаете природным даром создавать гармонию.",
      ja: "あなたは大地のようにしっかりと地に足をつけています — 安定し、育み、深く信頼できます。土タイプは他人が頼りにする基盤です。忍耐強く、共感力があり、調和を生み出す天性の才能を持っています。",
      ko: "당신은 대지처럼 안정되어 있습니다 — 안정적이고, 양육하며, 깊이 신뢰할 수 있습니다. 토 타입은 다른 사람들이 의지하는 기초입니다. 인내심이 있고 공감 능력이 뛰어나며 조화를 만드는 타고난 재능이 있습니다.",
    },
    career: {
      en: "You thrive in supportive, caring roles: healthcare, counseling, human resources, teaching, community work, or any role where your steady presence makes others feel safe.",
      ru: "Вы процветаете в поддерживающих, заботливых ролях: здравоохранение, консультирование, управление персоналом, преподавание, общественная работа или любая роль, где ваше устойчивое присутствие даёт другим чувство безопасности.",
      ja: "支援的で思いやりのある役割で力を発揮します：医療、カウンセリング、人事、教育、コミュニティワークなど、あなたの安定した存在が他者に安心感を与える役割です。",
      ko: "지원적이고 돌보는 역할에서 번창합니다: 의료, 상담, 인사, 교육, 지역사회 활동 등 당신의 안정된 존재가 다른 사람들에게 안전함을 주는 모든 역할.",
    },
    compatible: {
      en: "You pair well with Fire types (they warm your heart) and Metal types (you create fertile ground for their ideas). Wood types may feel like they're competing for space.",
      ru: "Вы хорошо сочетаетесь с типами Огня (они согревают ваше сердце) и Металла (вы создаёте плодородную почву для их идей). Типы Дерева могут казаться конкурирующими за пространство.",
      ja: "火タイプ（あなたの心を温める）や金タイプ（彼らのアイデアの肥沃な土壌となる）と良い組み合わせです。木タイプは空間を競っているように感じるかもしれません。",
      ko: "화 타입(당신의 마음을 따뜻하게 함) 및 금 타입(아이디어의 비옥한 토양이 됨)과 잘 어울립니다. 목 타입은 공간을 두고 경쟁하는 것처럼 느껴질 수 있습니다.",
    },
    color: "#b8860b",
  },
  Metal: {
    element: { en: "Metal", ru: "Металл", ja: "金", ko: "금" },
    elementZh: "金",
    description: {
      en: "You are refined like precious metal — disciplined, principled, and sharp-minded. Metal types value structure, precision, and excellence. You're organized, determined, and have an innate sense of justice and rightness.",
      ru: "Вы изысканы, как драгоценный металл — дисциплинированный, принципиальный и остроумный. Люди типа Металла ценят структуру, точность и совершенство. Вы организованные, решительные и обладаете врождённым чувством справедливости.",
      ja: "あなたは貴金属のように洗練されています — 規律があり、原理原則を重んじ、鋭い思考の持ち主です。金タイプは構造、正確さ、卓越性を重視します。整理整頓ができ、決断力があり、正義と正しさへの生来の感覚を持っています。",
      ko: "당신은 귀금속처럼 정제되어 있습니다 — 규율 있고 원칙적이며 예리한 사고를 지녔습니다. 금 타입은 구조, 정밀성, 탁월함을 중시합니다. 조직적이고 결단력 있으며 정의와 올바름에 대한 타고난 감각이 있습니다.",
    },
    career: {
      en: "You excel in structured, precision-based roles: law, engineering, finance, data science, quality assurance, architecture, or any field that rewards discipline and attention to detail.",
      ru: "Вы преуспеваете в структурированных, требующих точности ролях: право, инженерия, финансы, наука о данных, контроль качества, архитектура или любая область, где ценятся дисциплина и внимание к деталям.",
      ja: "構造化された精密な役割で優れた力を発揮します：法律、工学、金融、データサイエンス、品質保証、建築など、規律と細部への注意力が報われる分野です。",
      ko: "구조화되고 정밀성이 요구되는 역할에서 탁월합니다: 법률, 공학, 금융, 데이터 과학, 품질 보증, 건축 등 규율과 세부 사항에 대한 주의가 보상받는 모든 분야.",
    },
    compatible: {
      en: "You work best with Earth types (they ground and support you) and Water types (they bring out your reflective side). Fire types may feel too chaotic for your tastes.",
      ru: "Вы лучше всего работаете с типами Земли (они заземляют и поддерживают вас) и Воды (они раскрывают вашу рефлексивную сторону). Типы Огня могут казаться слишком хаотичными для вашего вкуса.",
      ja: "土タイプ（あなたを支え、安定させる）や水タイプ（あなたの内省的な側面を引き出す）と最も良く協働できます。火タイプはあなたにとって混沌としすぎに感じるかもしれません。",
      ko: "토 타입(당신을 지지하고 안정시킴) 및 수 타입(당신의 성찰적 측면을 끌어냄)과 가장 잘 맞습니다. 화 타입은 당신의 취향에 너무 혼란스럽게 느껴질 수 있습니다.",
    },
    color: "#7f8c8d",
  },
  Water: {
    element: { en: "Water", ru: "Вода", ja: "水", ko: "수" },
    elementZh: "水",
    description: {
      en: "You flow like water — deep, intuitive, and quietly powerful. Water types are the wisest of the elements, with profound inner resources. You're perceptive, adaptable, and often know things without being told.",
      ru: "Вы течёте, как вода — глубокий, интуитивный и тихо мощный. Люди типа Воды — мудрейшие из элементов, с глубокими внутренними ресурсами. Вы проницательные, адаптивные и часто знаете вещи без объяснений.",
      ja: "あなたは水のように流れます — 深く、直感的で、静かに力強い。水タイプは五行の中で最も知恵があり、深い内的資源を持っています。洞察力があり、適応力が高く、しばしば説明されなくても物事を知っています。",
      ko: "당신은 물처럼 흐릅니다 — 깊고 직관적이며 조용히 강력합니다. 수 타입은 오행 중 가장 지혜로우며 깊은 내적 자원을 가지고 있습니다. 통찰력 있고 적응력이 뛰어나며 종종 설명 없이도 사물을 압니다.",
    },
    career: {
      en: "You flourish in thoughtful, introspective roles: research, writing, psychology, philosophy, art, music, or any field where depth of insight and creativity are valued over speed.",
      ru: "Вы процветаете в вдумчивых, интроспективных ролях: исследования, писательство, психология, философия, искусство, музыка или любая область, где глубина понимания и творчество ценятся выше скорости.",
      ja: "思慮深く内省的な役割で花開きます：研究、執筆、心理学、哲学、芸術、音楽など、洞察の深さと創造性が速度よりも重視される分野です。",
      ko: "사려 깊고 내성적인 역할에서 번창합니다: 연구, 글쓰기, 심리학, 철학, 예술, 음악 등 통찰의 깊이와 창의성이 속도보다 중요시되는 모든 분야.",
    },
    compatible: {
      en: "You resonate with Metal types (they give you form and clarity) and Wood types (you naturally nourish them). Earth types may feel like they're containing your freedom.",
      ru: "Вы резонируете с типами Металла (они дают вам форму и ясность) и Дерева (вы естественно питаете их). Типы Земли могут казаться ограничивающими вашу свободу.",
      ja: "金タイプ（あなたに形と明晰さを与える）や木タイプ（あなたが自然に育む）と共鳴します。土タイプはあなたの自由を制限しているように感じるかもしれません。",
      ko: "금 타입(당신에게 형태와 명확성을 줌) 및 목 타입(당신이 자연스럽게 양육함)과 공명합니다. 토 타입은 당신의 자유를 제한하는 것처럼 느껴질 수 있습니다.",
    },
    color: "#2c3e50",
  },
};

export const elementNames: string[] = ["Wood", "Fire", "Earth", "Metal", "Water"];

export function calculateElement(scores: Record<string, number>): string {
  let best = "Wood";
  let bestScore = 0;
  for (const el of elementNames) {
    if (scores[el] > bestScore) {
      best = el;
      bestScore = scores[el];
    }
  }
  return best;
}
