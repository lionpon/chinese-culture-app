export interface ZodiacInfo {
  animal: string;
  animalZh: string;
  element: string;
  personality: string[];
  luckyNumbers: string;
  luckyColors: string;
  compatible: string;
  incompatible: string;
}

type LocaleRecord<T> = Record<"en" | "ru" | "ja" | "ko", T>;

const animals: LocaleRecord<string>[] = [
  { en: "Rat", ru: "Крыса", ja: "子 (ネズミ)", ko: "자 (쥐)" },
  { en: "Ox", ru: "Бык", ja: "丑 (ウシ)", ko: "축 (소)" },
  { en: "Tiger", ru: "Тигр", ja: "寅 (トラ)", ko: "인 (호랑이)" },
  { en: "Rabbit", ru: "Кролик", ja: "卯 (ウサギ)", ko: "묘 (토끼)" },
  { en: "Dragon", ru: "Дракон", ja: "辰 (タツ)", ko: "진 (용)" },
  { en: "Snake", ru: "Змея", ja: "巳 (ヘビ)", ko: "사 (뱀)" },
  { en: "Horse", ru: "Лошадь", ja: "午 (ウマ)", ko: "오 (말)" },
  { en: "Goat", ru: "Коза", ja: "未 (ヒツジ)", ko: "미 (양)" },
  { en: "Monkey", ru: "Обезьяна", ja: "申 (サル)", ko: "신 (원숭이)" },
  { en: "Rooster", ru: "Петух", ja: "酉 (トリ)", ko: "유 (닭)" },
  { en: "Dog", ru: "Собака", ja: "戌 (イヌ)", ko: "술 (개)" },
  { en: "Pig", ru: "Свинья", ja: "亥 (イノシシ)", ko: "해 (돼지)" },
];

const animalZh: string[] = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];

const personalities: LocaleRecord<ZodiacInfo>[] = [
  {
    en: { animal: "Rat", animalZh: "鼠", element: "Water", personality: ["Quick-witted", "Resourceful", "Versatile", "Kind"], luckyNumbers: "2, 3", luckyColors: "Blue, Gold", compatible: "Ox, Dragon, Monkey", incompatible: "Horse" },
    ru: { animal: "Крыса", animalZh: "鼠", element: "Вода", personality: ["Остроумная", "Находчивая", "Универсальная", "Добрая"], luckyNumbers: "2, 3", luckyColors: "Синий, Золотой", compatible: "Бык, Дракон, Обезьяна", incompatible: "Лошадь" },
    ja: { animal: "子 (ネズミ)", animalZh: "鼠", element: "水", personality: ["機知に富む", "臨機応変", "多才", "親切"], luckyNumbers: "2, 3", luckyColors: "青, 金", compatible: "丑, 辰, 申", incompatible: "午" },
    ko: { animal: "자 (쥐)", animalZh: "鼠", element: "물", personality: ["재치 있는", "지혜로운", "다재다능", "친절한"], luckyNumbers: "2, 3", luckyColors: "파랑, 금색", compatible: "소, 용, 원숭이", incompatible: "말" },
  },
  {
    en: { animal: "Ox", animalZh: "牛", element: "Earth", personality: ["Diligent", "Dependable", "Strong", "Determined"], luckyNumbers: "1, 4", luckyColors: "White, Yellow", compatible: "Rat, Snake, Rooster", incompatible: "Goat" },
    ru: { animal: "Бык", animalZh: "牛", element: "Земля", personality: ["Усердный", "Надёжный", "Сильный", "Решительный"], luckyNumbers: "1, 4", luckyColors: "Белый, Жёлтый", compatible: "Крыса, Змея, Петух", incompatible: "Коза" },
    ja: { animal: "丑 (ウシ)", animalZh: "牛", element: "土", personality: ["勤勉", "頼りになる", "強い", "決断力がある"], luckyNumbers: "1, 4", luckyColors: "白, 黄", compatible: "子, 巳, 酉", incompatible: "未" },
    ko: { animal: "축 (소)", animalZh: "牛", element: "토", personality: ["근면한", "신뢰할 수 있는", "강한", "결단력 있는"], luckyNumbers: "1, 4", luckyColors: "흰색, 노랑", compatible: "쥐, 뱀, 닭", incompatible: "양" },
  },
  {
    en: { animal: "Tiger", animalZh: "虎", element: "Wood", personality: ["Brave", "Confident", "Competitive", "Unpredictable"], luckyNumbers: "1, 3, 4", luckyColors: "Blue, Grey", compatible: "Horse, Dog, Pig", incompatible: "Monkey" },
    ru: { animal: "Тигр", animalZh: "虎", element: "Дерево", personality: ["Храбрый", "Уверенный", "Конкурентный", "Непредсказуемый"], luckyNumbers: "1, 3, 4", luckyColors: "Синий, Серый", compatible: "Лошадь, Собака, Свинья", incompatible: "Обезьяна" },
    ja: { animal: "寅 (トラ)", animalZh: "虎", element: "木", personality: ["勇敢", "自信がある", "競争心が強い", "予測不能"], luckyNumbers: "1, 3, 4", luckyColors: "青, 灰", compatible: "午, 戌, 亥", incompatible: "申" },
    ko: { animal: "인 (호랑이)", animalZh: "虎", element: "목", personality: ["용감한", "자신감 있는", "경쟁적인", "예측 불가능한"], luckyNumbers: "1, 3, 4", luckyColors: "파랑, 회색", compatible: "말, 개, 돼지", incompatible: "원숭이" },
  },
  {
    en: { animal: "Rabbit", animalZh: "兔", element: "Wood", personality: ["Gentle", "Elegant", "Alert", "Quick"], luckyNumbers: "3, 4, 6", luckyColors: "Pink, Purple", compatible: "Goat, Dog, Pig", incompatible: "Rooster" },
    ru: { animal: "Кролик", animalZh: "兔", element: "Дерево", personality: ["Нежный", "Элегантный", "Бдительный", "Быстрый"], luckyNumbers: "3, 4, 6", luckyColors: "Розовый, Фиолетовый", compatible: "Коза, Собака, Свинья", incompatible: "Петух" },
    ja: { animal: "卯 (ウサギ)", animalZh: "兔", element: "木", personality: ["優しい", "エレガント", "警戒心が強い", "素早い"], luckyNumbers: "3, 4, 6", luckyColors: "ピンク, 紫", compatible: "未, 戌, 亥", incompatible: "酉" },
    ko: { animal: "묘 (토끼)", animalZh: "兔", element: "목", personality: ["온화한", "우아한", "기민한", "빠른"], luckyNumbers: "3, 4, 6", luckyColors: "분홍, 보라", compatible: "양, 개, 돼지", incompatible: "닭" },
  },
  {
    en: { animal: "Dragon", animalZh: "龍", element: "Earth", personality: ["Confident", "Intelligent", "Enthusiastic", "Ambitious"], luckyNumbers: "1, 6, 7", luckyColors: "Gold, Silver", compatible: "Rat, Monkey, Rooster", incompatible: "Dog" },
    ru: { animal: "Дракон", animalZh: "龍", element: "Земля", personality: ["Уверенный", "Умный", "Энтузиаст", "Амбициозный"], luckyNumbers: "1, 6, 7", luckyColors: "Золотой, Серебряный", compatible: "Крыса, Обезьяна, Петух", incompatible: "Собака" },
    ja: { animal: "辰 (タツ)", animalZh: "龍", element: "土", personality: ["自信がある", "知的", "熱心", "野心的"], luckyNumbers: "1, 6, 7", luckyColors: "金, 銀", compatible: "子, 申, 酉", incompatible: "戌" },
    ko: { animal: "진 (용)", animalZh: "龍", element: "토", personality: ["자신감 있는", "지적인", "열정적인", "야심찬"], luckyNumbers: "1, 6, 7", luckyColors: "금색, 은색", compatible: "쥐, 원숭이, 닭", incompatible: "개" },
  },
  {
    en: { animal: "Snake", animalZh: "蛇", element: "Fire", personality: ["Wise", "Mysterious", "Intuitive", "Determined"], luckyNumbers: "2, 8, 9", luckyColors: "Black, Red", compatible: "Ox, Rooster, Monkey", incompatible: "Pig" },
    ru: { animal: "Змея", animalZh: "蛇", element: "Огонь", personality: ["Мудрая", "Таинственная", "Интуитивная", "Решительная"], luckyNumbers: "2, 8, 9", luckyColors: "Чёрный, Красный", compatible: "Бык, Петух, Обезьяна", incompatible: "Свинья" },
    ja: { animal: "巳 (ヘビ)", animalZh: "蛇", element: "火", personality: ["賢い", "神秘的", "直感的", "決断力がある"], luckyNumbers: "2, 8, 9", luckyColors: "黒, 赤", compatible: "丑, 酉, 申", incompatible: "亥" },
    ko: { animal: "사 (뱀)", animalZh: "蛇", element: "화", personality: ["지혜로운", "신비로운", "직관적인", "결단력 있는"], luckyNumbers: "2, 8, 9", luckyColors: "검정, 빨강", compatible: "소, 닭, 원숭이", incompatible: "돼지" },
  },
  {
    en: { animal: "Horse", animalZh: "馬", element: "Fire", personality: ["Energetic", "Independent", "Adventurous", "Warm-hearted"], luckyNumbers: "2, 3, 7", luckyColors: "Green, Red", compatible: "Tiger, Goat, Dog", incompatible: "Rat" },
    ru: { animal: "Лошадь", animalZh: "馬", element: "Огонь", personality: ["Энергичная", "Независимая", "Авантюрная", "Добросердечная"], luckyNumbers: "2, 3, 7", luckyColors: "Зелёный, Красный", compatible: "Тигр, Коза, Собака", incompatible: "Крыса" },
    ja: { animal: "午 (ウマ)", animalZh: "馬", element: "火", personality: ["エネルギッシュ", "独立的", "冒険好き", "心温かい"], luckyNumbers: "2, 3, 7", luckyColors: "緑, 赤", compatible: "寅, 未, 戌", incompatible: "子" },
    ko: { animal: "오 (말)", animalZh: "馬", element: "화", personality: ["활기찬", "독립적인", "모험적인", "마음 따뜻한"], luckyNumbers: "2, 3, 7", luckyColors: "초록, 빨강", compatible: "호랑이, 양, 개", incompatible: "쥐" },
  },
  {
    en: { animal: "Goat", animalZh: "羊", element: "Earth", personality: ["Calm", "Creative", "Thoughtful", "Persevering"], luckyNumbers: "2, 7", luckyColors: "Brown, Gold", compatible: "Rabbit, Horse, Pig", incompatible: "Ox" },
    ru: { animal: "Коза", animalZh: "羊", element: "Земля", personality: ["Спокойная", "Творческая", "Вдумчивая", "Настойчивая"], luckyNumbers: "2, 7", luckyColors: "Коричневый, Золотой", compatible: "Кролик, Лошадь, Свинья", incompatible: "Бык" },
    ja: { animal: "未 (ヒツジ)", animalZh: "羊", element: "土", personality: ["穏やか", "創造的", "思慮深い", "粘り強い"], luckyNumbers: "2, 7", luckyColors: "茶, 金", compatible: "卯, 午, 亥", incompatible: "丑" },
    ko: { animal: "미 (양)", animalZh: "羊", element: "토", personality: ["차분한", "창의적인", "사려 깊은", "인내심 있는"], luckyNumbers: "2, 7", luckyColors: "갈색, 금색", compatible: "토끼, 말, 돼지", incompatible: "소" },
  },
  {
    en: { animal: "Monkey", animalZh: "猴", element: "Metal", personality: ["Witty", "Clever", "Curious", "Mischievous"], luckyNumbers: "1, 7, 8", luckyColors: "White, Gold", compatible: "Rat, Dragon, Snake", incompatible: "Tiger" },
    ru: { animal: "Обезьяна", animalZh: "猴", element: "Металл", personality: ["Остроумная", "Умная", "Любопытная", "Озорная"], luckyNumbers: "1, 7, 8", luckyColors: "Белый, Золотой", compatible: "Крыса, Дракон, Змея", incompatible: "Тигр" },
    ja: { animal: "申 (サル)", animalZh: "猴", element: "金", personality: ["機知に富む", "賢い", "好奇心旺盛", "いたずら好き"], luckyNumbers: "1, 7, 8", luckyColors: "白, 金", compatible: "子, 辰, 巳", incompatible: "寅" },
    ko: { animal: "신 (원숭이)", animalZh: "猴", element: "금", personality: ["재치 있는", "영리한", "호기심 많은", "장난기 많은"], luckyNumbers: "1, 7, 8", luckyColors: "흰색, 금색", compatible: "쥐, 용, 뱀", incompatible: "호랑이" },
  },
  {
    en: { animal: "Rooster", animalZh: "雞", element: "Metal", personality: ["Observant", "Hardworking", "Courageous", "Confident"], luckyNumbers: "5, 7, 8", luckyColors: "Gold, Brown", compatible: "Ox, Dragon, Snake", incompatible: "Rabbit" },
    ru: { animal: "Петух", animalZh: "雞", element: "Металл", personality: ["Наблюдательный", "Трудолюбивый", "Смелый", "Уверенный"], luckyNumbers: "5, 7, 8", luckyColors: "Золотой, Коричневый", compatible: "Бык, Дракон, Змея", incompatible: "Кролик" },
    ja: { animal: "酉 (トリ)", animalZh: "雞", element: "金", personality: ["観察力がある", "勤勉", "勇気がある", "自信がある"], luckyNumbers: "5, 7, 8", luckyColors: "金, 茶", compatible: "丑, 辰, 巳", incompatible: "卯" },
    ko: { animal: "유 (닭)", animalZh: "雞", element: "금", personality: ["관찰력 있는", "근면한", "용기 있는", "자신감 있는"], luckyNumbers: "5, 7, 8", luckyColors: "금색, 갈색", compatible: "소, 용, 뱀", incompatible: "토끼" },
  },
  {
    en: { animal: "Dog", animalZh: "狗", element: "Earth", personality: ["Loyal", "Honest", "Amiable", "Prudent"], luckyNumbers: "3, 4, 9", luckyColors: "Green, Red", compatible: "Tiger, Rabbit, Horse", incompatible: "Dragon" },
    ru: { animal: "Собака", animalZh: "狗", element: "Земля", personality: ["Верная", "Честная", "Дружелюбная", "Благоразумная"], luckyNumbers: "3, 4, 9", luckyColors: "Зелёный, Красный", compatible: "Тигр, Кролик, Лошадь", incompatible: "Дракон" },
    ja: { animal: "戌 (イヌ)", animalZh: "狗", element: "土", personality: ["忠実", "正直", "愛想が良い", "慎重"], luckyNumbers: "3, 4, 9", luckyColors: "緑, 赤", compatible: "寅, 卯, 午", incompatible: "辰" },
    ko: { animal: "술 (개)", animalZh: "狗", element: "토", personality: ["충성스러운", "정직한", "붙임성 좋은", "신중한"], luckyNumbers: "3, 4, 9", luckyColors: "초록, 빨강", compatible: "호랑이, 토끼, 말", incompatible: "용" },
  },
  {
    en: { animal: "Pig", animalZh: "豬", element: "Water", personality: ["Compassionate", "Generous", "Diligent", "Sincere"], luckyNumbers: "2, 5, 8", luckyColors: "Yellow, Grey", compatible: "Tiger, Rabbit, Goat", incompatible: "Snake" },
    ru: { animal: "Свинья", animalZh: "豬", element: "Вода", personality: ["Сострадательная", "Щедрая", "Усердная", "Искренняя"], luckyNumbers: "2, 5, 8", luckyColors: "Жёлтый, Серый", compatible: "Тигр, Кролик, Коза", incompatible: "Змея" },
    ja: { animal: "亥 (イノシシ)", animalZh: "豬", element: "水", personality: ["思いやりがある", "寛大", "勤勉", "誠実"], luckyNumbers: "2, 5, 8", luckyColors: "黄, 灰", compatible: "寅, 卯, 未", incompatible: "巳" },
    ko: { animal: "해 (돼지)", animalZh: "豬", element: "물", personality: ["자비로운", "관대한", "근면한", "성실한"], luckyNumbers: "2, 5, 8", luckyColors: "노랑, 회색", compatible: "호랑이, 토끼, 양", incompatible: "뱀" },
  },
];

export function getZodiacName(year: number, locale: string): string {
  const idx = (year - 4) % 12;
  const a = animals[idx];
  const l = locale as keyof LocaleRecord<string>;
  return a?.[l] ?? a.en;
}

export function getZodiacAnimalZh(year: number): string {
  return animalZh[(year - 4) % 12];
}

export function getZodiacInfo(year: number, locale: string): ZodiacInfo {
  const idx = (year - 4) % 12;
  const p = personalities[idx];
  const l = locale as keyof LocaleRecord<ZodiacInfo>;
  return p?.[l] ?? p.en ?? personalities[idx].en;
}
