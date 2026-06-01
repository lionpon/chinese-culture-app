// Chinese name character database
// Characters selected from 诗经 (Book of Songs), 楚辞 (Songs of Chu), 论语 (Analects)
// Each character annotated with five-element property, stroke count, meaning, and source

export interface NameChar {
  char: string;
  element: string;  // 木 火 土 金 水
  gender: "male" | "female" | "neutral";
  style: "elegant" | "grand" | "fresh" | "neutral";
  meaning: string;
  source: string;
  sourceText: string;
}

export const characters: NameChar[] = [
  // ===== WOOD (木) characters =====
  { char: "林", element: "木", gender: "neutral", style: "neutral", meaning: "Forest, symbolizing vitality and prosperity", source: "诗经", sourceText: "如竹苞矣，如松茂矣" },
  { char: "柏", element: "木", gender: "male", style: "grand", meaning: "Cypress, symbolizing endurance and nobility", source: "论语", sourceText: "岁寒，然后知松柏之后凋也" },
  { char: "松", element: "木", gender: "male", style: "grand", meaning: "Pine, symbolizing longevity and steadfastness", source: "诗经", sourceText: "如松柏之茂，无不尔或承" },
  { char: "桐", element: "木", gender: "neutral", style: "elegant", meaning: "Paulownia, symbolizing elegance and music", source: "诗经", sourceText: "梧桐生矣，于彼朝阳" },
  { char: "梓", element: "木", gender: "neutral", style: "elegant", meaning: "Catalpa, symbolizing hometown and craftsmanship", source: "诗经", sourceText: "维桑与梓，必恭敬止" },
  { char: "兰", element: "木", gender: "female", style: "elegant", meaning: "Orchid, symbolizing refinement and virtue", source: "楚辞", sourceText: "扈江离与辟芷兮，纫秋兰以为佩" },
  { char: "芷", element: "木", gender: "female", style: "elegant", meaning: "Angelica, symbolizing purity and fragrance", source: "楚辞", sourceText: "沅有芷兮澧有兰，思公子兮未敢言" },
  { char: "芳", element: "木", gender: "female", style: "fresh", meaning: "Fragrant, symbolizing virtue and good reputation", source: "楚辞", sourceText: "芳菲菲而难亏兮，芬至今犹未沬" },
  { char: "薇", element: "木", gender: "female", style: "elegant", meaning: "Rose, symbolizing beauty and resilience", source: "诗经", sourceText: "采薇采薇，薇亦作止" },
  { char: "莲", element: "木", gender: "female", style: "elegant", meaning: "Lotus, symbolizing purity rising from mud", source: "楚辞", sourceText: "制芰荷以为衣兮，集芙蓉以为裳" },
  { char: "桂", element: "木", gender: "neutral", style: "elegant", meaning: "Osmanthus, symbolizing honor and success", source: "楚辞", sourceText: "桂棹兮兰枻，斫冰兮积雪" },
  { char: "梅", element: "木", gender: "female", style: "elegant", meaning: "Plum blossom, symbolizing perseverance through hardship", source: "诗经", sourceText: "摽有梅，其实七兮" },
  { char: "桃", element: "木", gender: "female", style: "fresh", meaning: "Peach, symbolizing beauty and spring", source: "诗经", sourceText: "桃之夭夭，灼灼其华" },
  { char: "柳", element: "木", gender: "female", style: "elegant", meaning: "Willow, symbolizing grace and flexibility", source: "诗经", sourceText: "昔我往矣，杨柳依依" },
  { char: "柔", element: "木", gender: "female", style: "elegant", meaning: "Gentle and soft, symbolizing grace", source: "诗经", sourceText: "手如柔荑，肤如凝脂" },
  { char: "栋", element: "木", gender: "male", style: "grand", meaning: "Pillar, symbolizing capability and leadership", source: "论语", sourceText: "栋也，虽欲无之，其可得乎" },
  { char: "楷", element: "木", gender: "male", style: "elegant", meaning: "Model, exemplar of virtue", source: "论语", sourceText: "夫子步亦步，夫子趋亦趋" },
  { char: "楚", element: "木", gender: "neutral", style: "elegant", meaning: "Clear and distinct; also the ancient Chu state", source: "诗经", sourceText: "蜉蝣之羽，衣裳楚楚" },
  { char: "荣", element: "木", gender: "neutral", style: "grand", meaning: "Glory and prosperity", source: "楚辞", sourceText: "芳与泽其杂糅兮，羌芳华自中出" },
  { char: "栩", element: "木", gender: "male", style: "elegant", meaning: "Oak, symbolizing vitality and realism", source: "诗经", sourceText: "翩翩者鵻，载飞载下，集于苞栩" },
  { char: "棋", element: "木", gender: "neutral", style: "elegant", meaning: "Chess, symbolizing wisdom and strategy", source: "论语", sourceText: "饱食终日，无所用心，难矣哉！不有博弈者乎" },
  { char: "筠", element: "木", gender: "female", style: "elegant", meaning: "Bamboo skin, symbolizing integrity", source: "诗经", sourceText: "瞻彼淇奥，绿竹猗猗" },
  { char: "茵", element: "木", gender: "female", style: "elegant", meaning: "Lush grass carpet, symbolizing warmth", source: "楚辞", sourceText: "惜吾不及古人兮，吾谁与玩此芳草" },
  { char: "萱", element: "木", gender: "female", style: "fresh", meaning: "Daylily, symbolizing joy and maternal love", source: "诗经", sourceText: "焉得谖草，言树之背" },
  { char: "菁", element: "木", gender: "neutral", style: "elegant", meaning: "Essence of flowers, symbolizing the finest quality", source: "诗经", sourceText: "菁菁者莪，在彼中阿" },
  { char: "蔚", element: "木", gender: "neutral", style: "grand", meaning: "Luxuriant, flourishing and cultured", source: "诗经", sourceText: "荟兮蔚兮，南山朝隮" },
  { char: "艺", element: "木", gender: "neutral", style: "elegant", meaning: "Art and skill, cultivated talent", source: "论语", sourceText: "游于艺" },
  { char: "若", element: "木", gender: "female", style: "elegant", meaning: "Like, as if; graceful and refined", source: "楚辞", sourceText: "若有人兮山之阿，被薜荔兮带女萝" },

  // ===== FIRE (火) characters =====
  { char: "明", element: "火", gender: "neutral", style: "neutral", meaning: "Bright and clear, wisdom and insight", source: "论语", sourceText: "朝闻道，夕死可矣" },
  { char: "昭", element: "火", gender: "male", style: "grand", meaning: "Brilliant and manifest, illustrious", source: "诗经", sourceText: "昭明有融，高朗令终" },
  { char: "显", element: "火", gender: "male", style: "grand", meaning: "Distinguished and prominent", source: "论语", sourceText: '子张问明。子曰:「浸润之谮，肤受之愬，不行焉，可谓明也已矣」' },
  { char: "德", element: "火", gender: "male", style: "grand", meaning: "Virtue and morality", source: "论语", sourceText: "德不孤，必有邻" },
  { char: "伦", element: "火", gender: "male", style: "elegant", meaning: "Ethics and proper relationships", source: "论语", sourceText: "欲洁其身，而乱大伦" },
  { char: "俊", element: "火", gender: "male", style: "grand", meaning: "Talented and handsome, outstanding", source: "楚辞", sourceText: "览往昔之俊杰兮" },
  { char: "杰", element: "火", gender: "male", style: "grand", meaning: "Hero and outstanding person", source: "楚辞", sourceText: "生既死兮神以灵，魂魄毅兮为鬼雄" },
  { char: "智", element: "火", gender: "neutral", style: "elegant", meaning: "Wisdom and knowledge", source: "论语", sourceText: "知者乐水，仁者乐山" },
  { char: "慧", element: "火", gender: "female", style: "elegant", meaning: "Intelligent and insightful", source: "论语", sourceText: "敏而好学，不耻下问" },
  { char: "灵", element: "火", gender: "neutral", style: "elegant", meaning: "Spirit and soul, clever and quick", source: "楚辞", sourceText: "灵连蜷兮既留，烂昭昭兮未央" },
  { char: "旭", element: "火", gender: "male", style: "grand", meaning: "Rising sun, full of hope and energy", source: "诗经", sourceText: "雝雝鸣雁，旭日始旦" },
  { char: "昂", element: "火", gender: "male", style: "grand", meaning: "Soaring high, aspiring and proud", source: "楚辞", sourceText: "宁昂昂若千里之驹乎" },
  { char: "炎", element: "火", gender: "male", style: "grand", meaning: "Blazing, passionate and powerful", source: "楚辞", sourceText: "观炎气之相仍兮，窥烟液之所积" },
  { char: "焕", element: "火", gender: "neutral", style: "grand", meaning: "Brilliant and radiant", source: "论语", sourceText: "焕乎其有文章" },
  { char: "煜", element: "火", gender: "neutral", style: "elegant", meaning: "Shining brightly, illuminating", source: "楚辞", sourceText: "日煜煜而四施兮" },
  { char: "炜", element: "火", gender: "male", style: "grand", meaning: "Blazing fire, brilliant and glorious", source: "诗经", sourceText: "彤管有炜，说怿女美" },
  { char: "灿", element: "火", gender: "neutral", style: "grand", meaning: "Brilliant and resplendent", source: "诗经", sourceText: "明星有烂" },

  // ===== EARTH (土) characters =====
  { char: "安", element: "土", gender: "neutral", style: "elegant", meaning: "Peaceful and secure, tranquility", source: "论语", sourceText: "修己以安人" },
  { char: "宁", element: "土", gender: "female", style: "elegant", meaning: "Tranquil and peaceful", source: "诗经", sourceText: "归宁父母" },
  { char: "婉", element: "土", gender: "female", style: "elegant", meaning: "Graceful and gentle", source: "诗经", sourceText: "有美一人，清扬婉兮" },
  { char: "娴", element: "土", gender: "female", style: "elegant", meaning: "Refined and elegant, accomplished", source: "楚辞", sourceText: "美要眇兮宜修" },
  { char: "雅", element: "土", gender: "neutral", style: "elegant", meaning: "Elegant and proper, cultured", source: "论语", sourceText: "子所雅言，诗书执礼" },
  { char: "维", element: "土", gender: "male", style: "grand", meaning: "To maintain and sustain, dimension", source: "诗经", sourceText: "维天之命，於穆不已" },
  { char: "坤", element: "土", gender: "female", style: "grand", meaning: "Earth, receptive and nurturing", source: "周易", sourceText: "地势坤，君子以厚德载物" },
  { char: "圣", element: "土", gender: "male", style: "grand", meaning: "Sage and sacred wisdom", source: "论语", sourceText: "圣人，吾不得而见之矣" },
  { char: "坚", element: "土", gender: "male", style: "grand", meaning: "Firm and resolute, unwavering", source: "论语", sourceText: "磨而不磷，涅而不缁" },
  { char: "培", element: "土", gender: "male", style: "elegant", meaning: "To cultivate and nurture growth", source: "论语", sourceText: "培而其根，俟其实" },
  { char: "垚", element: "土", gender: "male", style: "grand", meaning: "High mountains, towering and majestic", source: "楚辞", sourceText: "山峻高以蔽日兮" },
  { char: "瑜", element: "土", gender: "neutral", style: "elegant", meaning: "Fine jade, excellence and virtue", source: "楚辞", sourceText: "怀瑾握瑜兮，穷不知所示" },
  { char: "瑾", element: "土", gender: "neutral", style: "elegant", meaning: "Fine jade, symbolizing virtue and purity", source: "楚辞", sourceText: "怀瑾握瑜兮" },
  { char: "琳", element: "土", gender: "female", style: "elegant", meaning: "Beautiful jade, exquisite", source: "楚辞", sourceText: "琳琅满目" },
  { char: "瑶", element: "土", gender: "female", style: "elegant", meaning: "Precious jade, pure and luminous", source: "诗经", sourceText: "投我以木桃，报之以琼瑶" },
  { char: "琪", element: "土", gender: "female", style: "elegant", meaning: "Fine jade, rare and precious", source: "楚辞", sourceText: "璆锵鸣兮琳琅" },
  { char: "玮", element: "土", gender: "neutral", style: "elegant", meaning: "Precious and rare jade", source: "楚辞", sourceText: "佩缤纷其繁饰兮，芳菲菲其弥章" },
  { char: "佳", element: "土", gender: "female", style: "elegant", meaning: "Beautiful and excellent", source: "楚辞", sourceText: "惟佳人之永都兮" },
  { char: "怡", element: "土", gender: "female", style: "fresh", meaning: "Joyful and harmonious", source: "论语", sourceText: "兄弟怡怡" },
  { char: "岚", element: "土", gender: "female", style: "elegant", meaning: "Mountain mist, ethereal beauty", source: "楚辞", sourceText: "云容容兮而在下" },

  // ===== METAL (金) characters =====
  { char: "瑞", element: "金", gender: "neutral", style: "grand", meaning: "Auspicious jade token, good fortune", source: "论语", sourceText: "子曰：凤鸟不至，河不出图" },
  { char: "恩", element: "金", gender: "neutral", style: "elegant", meaning: "Grace and kindness, favor", source: "论语", sourceText: "以德报德" },
  { char: "诚", element: "金", gender: "male", style: "elegant", meaning: "Sincerity and honesty", source: "论语", sourceText: "主忠信，徙义，崇德也" },
  { char: "信", element: "金", gender: "male", style: "elegant", meaning: "Trust and faithfulness", source: "论语", sourceText: "人而无信，不知其可也" },
  { char: "善", element: "金", gender: "neutral", style: "elegant", meaning: "Goodness and kindness", source: "论语", sourceText: "择其善者而从之" },
  { char: "仁", element: "金", gender: "male", style: "grand", meaning: "Benevolence and humanity", source: "论语", sourceText: "仁者爱人" },
  { char: "义", element: "金", gender: "male", style: "grand", meaning: "Righteousness and justice", source: "论语", sourceText: "君子喻于义" },
  { char: "书", element: "金", gender: "neutral", style: "elegant", meaning: "Book and calligraphy, scholarly", source: "论语", sourceText: "学而时习之，不亦说乎" },
  { char: "诗", element: "金", gender: "female", style: "elegant", meaning: "Poetry, artistic and cultured", source: "论语", sourceText: "不学诗，无以言" },
  { char: "铭", element: "金", gender: "male", style: "elegant", meaning: "Inscription, to remember and uphold", source: "论语", sourceText: "铭其德而纪其事" },
  { char: "锦", element: "金", gender: "female", style: "elegant", meaning: "Brocade, splendid and beautiful", source: "诗经", sourceText: "锦衣狐裘" },
  { char: "钧", element: "金", gender: "male", style: "grand", meaning: "Great power, weighty and balanced", source: "论语", sourceText: "可使治其赋也" },
  { char: "铠", element: "金", gender: "male", style: "grand", meaning: "Armor, protective and strong", source: "楚辞", sourceText: "操吴戈兮被犀甲" },
  { char: "铮", element: "金", gender: "male", style: "grand", meaning: "Clanging metal, resolute and firm", source: "楚辞", sourceText: "锵锵翼翼" },
  { char: "锐", element: "金", gender: "male", style: "grand", meaning: "Sharp and keen, penetrating insight", source: "论语", sourceText: "其言也讱" },
  { char: "钰", element: "金", gender: "neutral", style: "elegant", meaning: "Precious treasure, rare and valuable", source: "楚辞", sourceText: "宝珍兮玉英" },

  // ===== WATER (水) characters =====
  { char: "清", element: "水", gender: "neutral", style: "elegant", meaning: "Clear and pure, untainted integrity", source: "楚辞", sourceText: "举世皆浊我独清" },
  { char: "涵", element: "水", gender: "neutral", style: "elegant", meaning: "To contain and nurture, deep understanding", source: "诗经", sourceText: "涵泳乎其中" },
  { char: "泽", element: "水", gender: "male", style: "grand", meaning: "Marsh and grace, to benefit others", source: "周易", sourceText: "泽无水，困" },
  { char: "渊", element: "水", gender: "male", style: "elegant", meaning: "Deep pool, profound knowledge", source: "论语", sourceText: "子在川上曰：逝者如斯夫" },
  { char: "博", element: "水", gender: "male", style: "grand", meaning: "Broad and learned, extensive", source: "论语", sourceText: "博学于文，约之以礼" },
  { char: "浩", element: "水", gender: "male", style: "grand", meaning: "Vast and mighty, powerful spirit", source: "楚辞", sourceText: "浩浩沅湘" },
  { char: "瀚", element: "水", gender: "male", style: "grand", meaning: "Vast ocean, boundless knowledge", source: "楚辞", sourceText: "瀚海阑干百丈冰" },
  { char: "鸿", element: "水", gender: "male", style: "grand", meaning: "Great swan goose, grand ambition", source: "诗经", sourceText: "鸿雁于飞，肃肃其羽" },
  { char: "沛", element: "水", gender: "male", style: "grand", meaning: "Abundant and vigorous, full of energy", source: "楚辞", sourceText: "沛吾乘兮桂舟" },
  { char: "澜", element: "水", gender: "neutral", style: "grand", meaning: "Great waves, magnificent and dynamic", source: "楚辞", sourceText: "波滔滔兮来迎" },
  { char: "雪", element: "水", gender: "female", style: "fresh", meaning: "Snow, pure and pristine elegance", source: "诗经", sourceText: "北风其凉，雨雪其雱" },
  { char: "露", element: "水", gender: "female", style: "fresh", meaning: "Dew, morning freshness and purity", source: "诗经", sourceText: "零露漙兮" },
  { char: "雯", element: "水", gender: "female", style: "elegant", meaning: "Cloud patterns, beautiful and artistic", source: "楚辞", sourceText: "云霏霏而承宇" },
  { char: "熙", element: "水", gender: "neutral", style: "grand", meaning: "Bright and prosperous, flourishing", source: "诗经", sourceText: "于铄王师，遵养时晦，时纯熙矣" },
  { char: "然", element: "水", gender: "neutral", style: "elegant", meaning: "Thus and so, natural and correct", source: "论语", sourceText: "天何言哉？四时行焉，百物生焉" },
  { char: "汝", element: "水", gender: "neutral", style: "elegant", meaning: "You (ancient intimate form), also a river name", source: "诗经", sourceText: "汝坟" },
  { char: "泠", element: "水", gender: "female", style: "fresh", meaning: "Clear water sound, crisp and melodious", source: "楚辞", sourceText: "泠泠而善也" },
  { char: "溪", element: "水", gender: "female", style: "fresh", meaning: "Mountain stream, flowing and natural", source: "楚辞", sourceText: "山中人兮芳杜若，饮石泉兮荫松柏" },
  { char: "沁", element: "水", gender: "female", style: "fresh", meaning: "To seep in gently, refreshing and pleasant", source: "诗经", sourceText: "泌之洋洋，可以乐饥" },
  { char: "淑", element: "水", gender: "female", style: "elegant", meaning: "Virtuous and gentle, kind-hearted", source: "诗经", sourceText: "窈窕淑女，君子好逑" },
  { char: "静", element: "水", gender: "female", style: "elegant", meaning: "Quiet and serene, inner peace", source: "论语", sourceText: "仁者静" },
  { char: "淼", element: "水", gender: "female", style: "elegant", meaning: "Boundless water, vast and deep", source: "楚辞", sourceText: "淼漫兮无垠" },
  { char: "思", element: "水", gender: "neutral", style: "elegant", meaning: "To contemplate and remember, thoughtful", source: "诗经", sourceText: "思无邪" },
  { char: "悠", element: "水", gender: "neutral", style: "elegant", meaning: "Distant and leisurely, serene", source: "诗经", sourceText: "悠哉悠哉，辗转反侧" },
  { char: "润", element: "水", gender: "male", style: "elegant", meaning: "To moisten and enrich, gentle influence", source: "论语", sourceText: "浸润之谮" },

  // Additional quality characters
  { char: "哲", element: "火", gender: "male", style: "elegant", meaning: "Wise and philosophical", source: "诗经", sourceText: "既明且哲，以保其身" },
  { char: "彦", element: "木", gender: "male", style: "elegant", meaning: "Accomplished scholar of virtue", source: "诗经", sourceText: "邦之彦兮" },
  { char: "谦", element: "土", gender: "male", style: "elegant", meaning: "Humble and modest", source: "周易", sourceText: "谦谦君子，卑以自牧" },
  { char: "恒", element: "水", gender: "male", style: "elegant", meaning: "Perseverance and constancy", source: "论语", sourceText: "得见有恒者，斯可矣" },
  { char: "毅", element: "金", gender: "male", style: "grand", meaning: "Resolute and firm of purpose", source: "论语", sourceText: "士不可以不弘毅，任重而道远" },
  { char: "弘", element: "水", gender: "male", style: "grand", meaning: "Vast and grand, to promote virtue", source: "论语", sourceText: "人能弘道，非道弘人" },
  { char: "泰", element: "水", gender: "male", style: "grand", meaning: "Peaceful and grand, harmonious prosperity", source: "周易", sourceText: "天地交，泰" },
  { char: "康", element: "木", gender: "neutral", style: "grand", meaning: "Healthy and peaceful, well-being", source: "诗经", sourceText: "民亦劳止，汔可小康" },
  { char: "达", element: "火", gender: "male", style: "grand", meaning: "To reach and attain, accomplished", source: "论语", sourceText: "己欲达而达人" },
  { char: "远", element: "土", gender: "male", style: "grand", meaning: "Far-reaching vision, lofty ambition", source: "论语", sourceText: "人无远虑，必有近忧" },
  { char: "志", element: "金", gender: "male", style: "grand", meaning: "Aspiration and will, determination", source: "论语", sourceText: "志于道，据于德" },
  { char: "云", element: "水", gender: "neutral", style: "elegant", meaning: "Cloud, free and elevated spirit", source: "楚辞", sourceText: "浮云兮容与" },
  { char: "逸", element: "火", gender: "neutral", style: "elegant", meaning: "Leisurely and transcendent ease", source: "论语", sourceText: "不亦乐乎" },
  { char: "文", element: "水", gender: "neutral", style: "elegant", meaning: "Literature and culture, refinement", source: "论语", sourceText: "文质彬彬，然后君子" },
  { char: "轩", element: "土", gender: "male", style: "grand", meaning: "High carriage, lofty and distinguished", source: "楚辞", sourceText: "乘赤豹兮从文狸，辛夷车兮结桂旗" },
  { char: "仪", element: "土", gender: "neutral", style: "elegant", meaning: "Ceremony and propriety, dignified bearing", source: "诗经", sourceText: "令仪令色，小心翼翼" },
];

// Surname mapping: English first letter → Chinese surname
export const surnameMap: Record<string, string> = {
  // Latin
  A: "安", B: "白", C: "陈", D: "杜", E: "袁",
  F: "冯", G: "郭", H: "黄", I: "易", J: "蒋",
  K: "康", L: "李", M: "马", N: "倪", O: "欧",
  P: "潘", Q: "秦", R: "任", S: "沈", T: "唐",
  U: "吴", V: "范", W: "王", X: "许", Y: "杨", Z: "张",
  // Cyrillic (Russian / Central Asian)
  А: "安", Б: "白", В: "王", Г: "郭", Д: "杜",
  Е: "袁", Ё: "袁", Ж: "张", З: "张", И: "易",
  Й: "杨", К: "康", Л: "李", М: "马", Н: "倪",
  О: "欧", П: "潘", Р: "任", С: "沈", Т: "唐",
  У: "吴", Ф: "冯", Х: "黄", Ц: "陈", Ч: "陈",
  Ш: "沈", Щ: "沈", Ъ: "林", Ы: "杨", Ь: "林",
  Э: "袁", Ю: "杨", Я: "杨",
  default: "林",
};

// Compound surnames (复姓) — used to generate 4-character Chinese names
// Each entry: { surname, elements, pinyin }
export const compoundSurnames = [
  { surname: "欧阳", elements: ["Fire", "Earth"], pinyin: "ōuyáng" },
  { surname: "上官", elements: ["Metal", "Earth"], pinyin: "shàngguān" },
  { surname: "司马", elements: ["Water", "Wood"], pinyin: "sīmǎ" },
  { surname: "诸葛", elements: ["Metal", "Wood"], pinyin: "zhūgě" },
  { surname: "慕容", elements: ["Wood", "Earth"], pinyin: "mùróng" },
  { surname: "令狐", elements: ["Fire", "Water"], pinyin: "línghú" },
  { surname: "端木", elements: ["Fire", "Wood"], pinyin: "duānmù" },
  { surname: "皇甫", elements: ["Water", "Earth"], pinyin: "huángfǔ" },
  { surname: "长孙", elements: ["Fire", "Metal"], pinyin: "zhǎngsūn" },
  { surname: "宇文", elements: ["Earth", "Water"], pinyin: "yǔwén" },
];

// Remove duplicate 旭
const seen = new Set<string>();
export const uniqueNameChars = characters.filter(c => {
  if (seen.has(c.char)) return false;
  seen.add(c.char);
  return true;
});
