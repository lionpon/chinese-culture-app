import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whatTitle: string; whatBody: string;
  symbolsTitle: string;
  faqs: { q: string; a: string }[];
  cta: string;
}> = {
  en: {
    title: "Chinese Dream Interpretation (Zhou Gong Jie Meng): Dream Symbols Meaning | Chinese Culture Studio",
    desc: "Discover the ancient Chinese art of dream interpretation (周公解梦). Learn what common dream symbols — water, snakes, teeth, flying, death — mean in the Zhou Gong tradition.",
    ogTitle: "Chinese Dream Meaning: Zhou Gong's Dream Dictionary",
    ogDesc: "Ancient Chinese dream interpretation — what water, snakes, flying, death, and teeth falling out mean in your dreams.",
    heading: "Zhou Gong Jie Meng: Ancient Chinese Dream Interpretation",
    subtitle: "Zhou Gong Jie Meng (周公解梦, \"Duke of Zhou Explains Dreams\") is China's oldest dream interpretation system, dating back over 3,000 years. The Duke of Zhou — revered as the Sage of Dreams — categorized thousands of dream symbols and their meanings. To this day, when Chinese people have a vivid dream, they say \"I visited the Duke of Zhou\" (去见周公).",
    whatTitle: "The Duke of Zhou's Dream Theory",
    whatBody: "In Chinese tradition, dreams are not random — they are messages from the subconscious, omens of future events, or visits from ancestors. The Duke of Zhou classified dreams into six types: regular dreams (正梦), nightmares (噩梦), longing dreams (思梦), waking-state dreams (寤梦), joyful dreams (喜梦), and fearful dreams (惧梦). Each symbol in a dream is interpreted not literally but through cultural associations and homophonic wordplay — similar to how Chinese lucky numbers work.",
    symbolsTitle: "Common Dream Symbols & Their Meanings",
    faqs: [
      { q: "What does dreaming of water mean in Chinese interpretation?", a: "Water (水) is strongly associated with wealth (财) in Chinese culture. Clear, calm water suggests incoming prosperity. Turbulent or flooding water warns of financial instability or emotional overwhelm. Dreaming of drinking water is auspicious — it suggests absorbing new wisdom." },
      { q: "What does dreaming of snakes mean?", a: "Snakes (蛇) have a dual meaning. A snake in the house can be auspicious — it may indicate an upcoming pregnancy or windfall. Being chased by a snake suggests hidden worries. Killing a snake indicates overcoming a difficult obstacle. A coiled snake suggests hidden potential." },
      { q: "What does dreaming of teeth falling out mean?", a: "Teeth falling out (掉牙) is one of the most commonly reported dreams. In Chinese tradition, it often relates to concerns about aging parents (teeth = family roots) or anxiety about saying something regrettable. It can also symbolize a transition — losing the old to make way for the new." },
      { q: "What does dreaming of flying mean?", a: "Flying (飞) is generally very auspicious. Soaring high suggests career advancement and breaking free from limitations. Struggling to fly or flying low suggests ambition facing obstacles. Flying with others suggests collaborative success." },
      { q: "What does dreaming of death mean?", a: "Paradoxically, dreaming of someone's death is often auspicious in Chinese interpretation — it can mean that person will have a long life. Dreaming of your own death may signal a major life transformation or rebirth. Death dreams rarely predict actual death in the Duke of Zhou's system." },
      { q: "What does dreaming of fish mean?", a: "Fish (鱼, yú) sounds like 余 (surplus, abundance). Dreaming of fish is highly auspicious — it suggests prosperity, fertility, and abundance. Catching fish suggests actively seizing opportunities. A fish jumping out of water is especially lucky." },
      { q: "What does dreaming of a baby mean?", a: "Dreaming of a baby can signal a new beginning — a project, idea, or phase of life being born. In Chinese culture, it may also foretell an actual pregnancy or represent your inner child seeking attention and care." },
    ],
    cta: "Consult the I Ching for Guidance",
  },
  ru: {
    title: "Китайское толкование снов (Чжоу Гун): значение символов сна | Chinese Culture Studio",
    desc: "Откройте древнее китайское искусство толкования снов (周公解梦). Узнайте, что означают вода, змеи, зубы, полёт, смерть в традиции Чжоу Гуна.",
    ogTitle: "Китайское значение снов: сонник Чжоу Гуна",
    ogDesc: "Древнее китайское толкование снов — что означают вода, змеи, полёт, смерть и выпадение зубов.",
    heading: "Чжоу Гун Цзе Мэн: древнее китайское толкование снов",
    subtitle: "Чжоу Гун Цзе Мэн (周公解梦, «Чжоу-гун объясняет сны») — старейшая китайская система толкования снов, возраст которой более 3000 лет. Чжоу-гун — почитаемый как Мудрец Снов — классифицировал тысячи символов сна. До сих пор, видя яркий сон, китайцы говорят: «Я посетил Чжоу-гуна» (去见周公).",
    whatTitle: "Теория снов Чжоу-гуна",
    whatBody: "В китайской традиции сны не случайны — это послания подсознания, предзнаменования или визиты предков. Чжоу-гун классифицировал шесть типов снов: обычные (正梦), кошмары (噩梦), тоскующие (思梦), сны наяву (寤梦), радостные (喜梦) и пугающие (惧梦). Каждый символ толкуется не буквально, а через культурные ассоциации и омофоническую игру слов — подобно счастливым числам.",
    symbolsTitle: "Распространённые символы сна и их значение",
    faqs: [
      { q: "Что значит видеть воду во сне?", a: "Вода (水) тесно связана с богатством (财) в китайской культуре. Чистая, спокойная вода — к достатку. Бурная вода — к финансовой нестабильности или эмоциональному потрясению. Пить воду во сне — к обретению новой мудрости." },
      { q: "Что значит видеть змей во сне?", a: "Змеи (蛇) имеют двойное значение. Змея в доме — к беременности или неожиданному доходу. Преследование змеи — скрытые тревоги. Убить змею — преодолеть препятствие. Свернувшаяся змея — скрытый потенциал." },
      { q: "Что значит выпадение зубов во сне?", a: "Выпадение зубов (掉牙) — один из самых частых снов. В китайской традиции связано с беспокойством о стареющих родителях (зубы = семейные корни) или тревогой о сказанных словах. Также символизирует переход — потеря старого ради нового." },
      { q: "Что значит летать во сне?", a: "Полёт (飞) обычно очень благоприятен. Высокий полёт — карьерный рост и освобождение от ограничений. Трудный полёт — амбиции встречают препятствия. Полёт с другими — совместный успех." },
      { q: "Что значит смерть во сне?", a: "Парадоксально, но видеть чью-то смерть во сне часто благоприятно — это может означать, что человек проживёт долгую жизнь. Собственная смерть — к трансформации или перерождению. Сны о смерти редко предсказывают реальную смерть." },
      { q: "Что значит видеть рыбу во сне?", a: "Рыба (鱼, yú) созвучна с 余 (изобилие). Видеть рыбу — к процветанию, плодородию и изобилию. Ловить рыбу — активно использовать возможности. Рыба, выпрыгивающая из воды — особенно удачный знак." },
    ],
    cta: "Спросите И-Цзин о руководстве",
  },
  ja: {
    title: "中国の夢占い（周公解夢）：夢のシンボルの意味 | Chinese Culture Studio",
    desc: "古代中国の夢占い（周公解夢）を発見。水、蛇、歯、飛行、死など一般的な夢のシンボルが周公の伝統で何を意味するかを学ぶ。",
    ogTitle: "中国の夢の意味：周公の夢辞典",
    ogDesc: "古代中国の夢占い — 水、蛇、飛行、死、歯が抜ける夢が何を意味するか。",
    heading: "周公解夢：古代中国の夢占い",
    subtitle: "周公解夢（「周公が夢を説明する」）は、3,000年以上前にさかのぼる中国最古の夢判断システムです。夢の聖人として崇められる周公は、何千もの夢のシンボルとその意味を分類しました。今日でも、鮮明な夢を見た中国人は「周公に会いに行った」（去见周公）と言います。",
    whatTitle: "周公の夢理論",
    whatBody: "中国の伝統では、夢はランダムではなく、潜在意識からのメッセージ、未来の出来事の前兆、または先祖の訪問です。周公は夢を6つのタイプに分類：正夢、悪夢（噩梦）、思夢、寤夢、喜夢、懼夢。各シンボルは文字通りではなく、文化的な関連性と同音異義語の言葉遊びを通じて解釈されます—中国の縁起の良い数字と同様に。",
    symbolsTitle: "一般的な夢のシンボルとその意味",
    faqs: [
      { q: "水の夢は中国の解釈では何を意味しますか？", a: "水（水）は中国文化で富（財）と強く関連しています。澄んだ穏やかな水は繁栄の訪れを示唆します。荒れた水は金銭的不安定さや感情的な圧倒を警告します。夢で水を飲むことは縁起が良く、新しい知恵を吸収することを示唆します。" },
      { q: "蛇の夢は何を意味しますか？", a: "蛇（蛇）には二重の意味があります。家の中の蛇は妊娠や臨時収入の前兆かもしれません。蛇に追われることは隠れた心配事を示します。蛇を殺すことは困難な障害の克服を示します。とぐろを巻く蛇は隠れた可能性を示唆します。" },
      { q: "歯が抜ける夢は何を意味しますか？", a: "歯が抜ける夢（掉牙）は最もよく報告される夢の一つです。中国の伝統では、年老いた親への心配（歯＝家族のルーツ）や、後悔するようなことを言う不安と関連します。また、移行を象徴することも—新しいもののために古いものを失う。" },
      { q: "飛ぶ夢は何を意味しますか？", a: "飛ぶこと（飞）は一般的にとても縁起が良いです。高く舞い上がることはキャリアの進展と制限からの解放を示唆します。飛ぶのに苦労することは障害に直面する野心を示します。他の人と飛ぶことは協力的な成功を示唆します。" },
      { q: "死の夢は何を意味しますか？", a: "逆説的に、誰かの死の夢は中国の解釈ではしばしば縁起が良いです—その人が長寿であることを意味するかもしれません。自分の死の夢は大きな人生の変革や再生を示すかもしれません。周公の体系では、死の夢が実際の死を予測することはめったにありません。" },
      { q: "魚の夢は何を意味しますか？", a: "魚（鱼, yú）は余（余剰、豊かさ）と同じ音です。魚の夢は非常に縁起が良く、繁栄、多産、豊かさを示唆します。魚を捕まえることは積極的にチャンスをつかむことを示します。水から飛び出す魚は特に幸運です。" },
    ],
    cta: "易経で指針を求める",
  },
  ko: {
    title: "중국 꿈 해몽 (주공 해몽): 꿈 상징 의미 | Chinese Culture Studio",
    desc: "고대 중국의 꿈 해몽 (周公解梦)을 발견하세요. 물, 뱀, 이빨, 비행, 죽음 등 일반적인 꿈 상징이 주공 전통에서 무엇을 의미하는지 배우세요.",
    ogTitle: "중국 꿈 의미: 주공의 꿈 사전",
    ogDesc: "고대 중국의 꿈 해몽 — 물, 뱀, 비행, 죽음, 이빨 빠지는 꿈이 의미하는 것.",
    heading: "주공 해몽: 고대 중국의 꿈 해석",
    subtitle: "주공 해몽(周公解梦, '주공이 꿈을 설명하다')은 3,000년 이상 된 중국 최고의 꿈 해석 체계입니다. 꿈의 성인으로 숭배되는 주공은 수천 가지 꿈 상징과 그 의미를 분류했습니다. 오늘날에도 생생한 꿈을 꾼 중국인들은 '주공을 만나러 갔다'(去见周公)고 말합니다.",
    whatTitle: "주공의 꿈 이론",
    whatBody: "중국 전통에서 꿈은 무작위가 아닙니다—잠재의식의 메시지, 미래 사건의 전조, 또는 조상의 방문입니다. 주공은 꿈을 여섯 유형으로 분류했습니다: 정몽(正梦), 악몽(噩梦), 사몽(思梦), 오몽(寤梦), 희몽(喜梦), 구몽(惧梦). 각 상징은 문자 그대로가 아닌 문화적 연관성과 동음이의어 말장난을 통해 해석됩니다—중국의 행운의 숫자처럼.",
    symbolsTitle: "일반적인 꿈 상징과 그 의미",
    faqs: [
      { q: "물 꿈은 중국 해석에서 무엇을 의미하나요?", a: "물(水)은 중국 문화에서 부(财)와 강하게 연관됩니다. 맑고 고요한 물은 다가오는 번영을 암시합니다. 거친 물은 재정적 불안정이나 감정적 압도를 경고합니다. 꿈에서 물을 마시는 것은 길조로, 새로운 지혜를 흡수함을 암시합니다." },
      { q: "뱀 꿈은 무엇을 의미하나요?", a: "뱀(蛇)은 이중 의미를 가집니다. 집 안의 뱀은 임신이나 횡재를 암시할 수 있습니다. 뱀에게 쫓기는 것은 숨은 걱정을 나타냅니다. 뱀을 죽이는 것은 어려운 장애물을 극복함을 나타냅니다. 몸을 감은 뱀은 숨은 잠재력을 암시합니다." },
      { q: "이빨 빠지는 꿈은 무엇을 의미하나요?", a: "이빨 빠지는 꿈(掉牙)은 가장 흔히 보고되는 꿈 중 하나입니다. 중국 전통에서는 노화하는 부모에 대한 걱정(치아=가족의 뿌리)이나 후회할 말을 할 불안과 관련됩니다. 또한 전환을 상징할 수 있습니다—새로운 것을 위해 낡은 것을 잃는 것." },
      { q: "나는 꿈은 무엇을 의미하나요?", a: "나는 것(飞)은 일반적으로 매우 길한 의미입니다. 높이 솟아오르는 것은 경력 발전과 제한으로부터의 해방을 암시합니다. 나는 데 어려움을 겪는 것은 장애물에 직면한 야망을 나타냅니다. 다른 사람과 함께 나는 것은 협력적 성공을 암시합니다." },
      { q: "죽음 꿈은 무엇을 의미하나요?", a: "역설적으로, 누군가의 죽음 꿈은 중국 해석에서 종종 길한 의미입니다—그 사람이 장수할 것을 의미할 수 있습니다. 자신의 죽음 꿈은 큰 삶의 변화나 재탄생을 신호할 수 있습니다. 주공의 체계에서 죽음 꿈이 실제 죽음을 예측하는 경우는 드뭅니다." },
      { q: "물고기 꿈은 무엇을 의미하나요?", a: "물고기(鱼, yú)는 여유(余, 풍요)와 같은 소리입니다. 물고기 꿈은 매우 길한 의미로, 번영, 다산, 풍요를 암시합니다. 물고기를 잡는 것은 적극적으로 기회를 잡는 것을 나타냅니다. 물 밖으로 뛰어오르는 물고기는 특히 행운입니다." },
    ],
    cta: "주역에서 지침 구하기",
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
        en: `${BASE_URL}/guide/dream-meaning`,
        ru: `${BASE_URL}/ru/guide/dream-meaning`,
        ja: `${BASE_URL}/ja/guide/dream-meaning`,
        ko: `${BASE_URL}/ko/guide/dream-meaning`,
      },
    },
  };
}

const SYMBOLS: Record<string, { symbol: string; keyword: string; meaning: string; type: string }[]> = {
  en: [
    { symbol: "💧 Water", keyword: "Wealth & Emotion", meaning: "Clear water = incoming fortune. Murky water = confusion. Flooding = emotional overwhelm. Drinking water = absorbing wisdom.", type: "auspicious" },
    { symbol: "🐍 Snake", keyword: "Transformation", meaning: "In house = windfall or pregnancy. Chased by snake = hidden fear. Killing snake = overcoming obstacles. Coiled snake = hidden potential.", type: "mixed" },
    { symbol: "🦷 Falling Teeth", keyword: "Anxiety & Change", meaning: "Concerns about aging parents or words spoken in haste. Also signals a life transition — releasing the old to welcome the new.", type: "warning" },
    { symbol: "🕊️ Flying", keyword: "Freedom & Ambition", meaning: "Soaring high = career breakthrough. Struggling = obstacles. Flying with others = collaborative success.", type: "auspicious" },
    { symbol: "💀 Death", keyword: "Transformation", meaning: "Someone else's death = they will live long. Your own death = rebirth or major life change. Rarely predicts actual death.", type: "neutral" },
    { symbol: "🐟 Fish", keyword: "Abundance", meaning: "Fish = surplus (homophone: 鱼 yú = 余 yú). Catching fish = seizing opportunity. Jumping fish = exceptional luck.", type: "auspicious" },
    { symbol: "👶 Baby", keyword: "New Beginnings", meaning: "A new project or phase being born. May foretell pregnancy. Can represent your inner child needing attention.", type: "auspicious" },
    { symbol: "🔥 Fire", keyword: "Passion & Danger", meaning: "Controlled fire = vitality and passion. Uncontrolled fire = anger or crisis. Fireworks = celebration and joy ahead.", type: "mixed" },
    { symbol: "🏠 House", keyword: "Self & Security", meaning: "New house = new phase of life. Crumbling house = insecurity. Cleaning house = resolving past issues.", type: "neutral" },
  ],
  ru: [
    { symbol: "💧 Вода", keyword: "Богатство и эмоции", meaning: "Чистая вода = к богатству. Мутная = смятение. Наводнение = эмоциональное потрясение. Пить воду = обретение мудрости.", type: "auspicious" },
    { symbol: "🐍 Змея", keyword: "Трансформация", meaning: "В доме = к доходу или беременности. Преследует = скрытый страх. Убить = преодоление препятствий. Свернулась = скрытый потенциал.", type: "mixed" },
    { symbol: "🦷 Выпадение зубов", keyword: "Тревога и перемены", meaning: "Беспокойство о родителях или сказанных словах. Также сигнал перехода — отпустить старое для нового.", type: "warning" },
    { symbol: "🕊️ Полёт", keyword: "Свобода и амбиции", meaning: "Высоко = карьерный прорыв. С трудом = препятствия. С другими = совместный успех.", type: "auspicious" },
    { symbol: "💀 Смерть", keyword: "Трансформация", meaning: "Чужая смерть = к долгой жизни этого человека. Своя смерть = перерождение или большие перемены.", type: "neutral" },
    { symbol: "🐟 Рыба", keyword: "Изобилие", meaning: "Рыба = изобилие (鱼 yú созвучно 余 yú). Ловить = использовать шанс. Прыгающая из воды = исключительная удача.", type: "auspicious" },
    { symbol: "👶 Ребёнок", keyword: "Новые начала", meaning: "Рождение проекта или новой фазы. Может предвещать беременность. Внутренний ребёнок, требующий внимания.", type: "auspicious" },
    { symbol: "🔥 Огонь", keyword: "Страсть и опасность", meaning: "Контролируемый = жизненная сила. Неконтролируемый = гнев или кризис. Фейерверк = праздник и радость.", type: "mixed" },
    { symbol: "🏠 Дом", keyword: "Я и безопасность", meaning: "Новый дом = новый этап жизни. Разрушающийся = неуверенность. Уборка дома = решение проблем прошлого.", type: "neutral" },
  ],
  ja: [
    { symbol: "💧 水", keyword: "富と感情", meaning: "澄んだ水＝富の到来。濁った水＝混乱。洪水＝感情的な圧倒。水を飲む＝知恵の吸収。", type: "auspicious" },
    { symbol: "🐍 蛇", keyword: "変容", meaning: "家の中の蛇＝臨時収入や妊娠。追われる蛇＝隠れた恐怖。蛇を殺す＝障害の克服。とぐろを巻く蛇＝隠れた可能性。", type: "mixed" },
    { symbol: "🦷 歯が抜ける", keyword: "不安と変化", meaning: "年老いた親への心配や軽率な発言への不安。また、新しいものを迎えるために古いものを手放す人生の転換期のシグナル。", type: "warning" },
    { symbol: "🕊️ 飛ぶ", keyword: "自由と野心", meaning: "高く舞い上がる＝キャリアの突破口。苦労して飛ぶ＝障害。他者と飛ぶ＝協力的な成功。", type: "auspicious" },
    { symbol: "💀 死", keyword: "変容", meaning: "他人の死＝その人は長生きする。自分の死＝再生や大きな人生の変化。実際の死を予測することは稀。", type: "neutral" },
    { symbol: "🐟 魚", keyword: "豊かさ", meaning: "魚＝豊かさ（鱼 yú は 余 yú と同じ音）。魚を捕る＝チャンスをつかむ。水から飛び出す魚＝格別の幸運。", type: "auspicious" },
    { symbol: "👶 赤ちゃん", keyword: "新しい始まり", meaning: "新しいプロジェクトや段階の誕生。妊娠の予兆かもしれない。注意を求める内なる子どもの象徴。", type: "auspicious" },
    { symbol: "🔥 火", keyword: "情熱と危険", meaning: "制御された火＝活力と情熱。制御不能な火＝怒りや危機。花火＝祝福と喜び。", type: "mixed" },
    { symbol: "🏠 家", keyword: "自己と安全", meaning: "新しい家＝人生の新段階。崩れる家＝不安。家の掃除＝過去の問題の解決。", type: "neutral" },
  ],
  ko: [
    { symbol: "💧 물", keyword: "부와 감정", meaning: "맑은 물＝다가오는 부. 흐린 물＝혼란. 홍수＝감정적 압도. 물 마시기＝지혜 흡수.", type: "auspicious" },
    { symbol: "🐍 뱀", keyword: "변형", meaning: "집 안의 뱀＝횡재나 임신. 쫓아오는 뱀＝숨은 두려움. 뱀 죽이기＝장애물 극복. 몸 감은 뱀＝숨은 잠재력.", type: "mixed" },
    { symbol: "🦷 이빨 빠짐", keyword: "불안과 변화", meaning: "노화하는 부모에 대한 걱정이나 경솔한 말에 대한 불안. 또한 새로운 것을 맞이하기 위해 낡은 것을 놓는 인생 전환기 신호.", type: "warning" },
    { symbol: "🕊️ 비행", keyword: "자유와 야망", meaning: "높이 솟아오름＝경력 돌파. 어려움 겪으며 날기＝장애물. 타인과 함께＝협력적 성공.", type: "auspicious" },
    { symbol: "💀 죽음", keyword: "변형", meaning: "타인의 죽음＝그 사람이 장수할 것. 자신의 죽음＝재탄생이나 큰 삶의 변화. 실제 죽음을 예측하는 경우는 드묾.", type: "neutral" },
    { symbol: "🐟 물고기", keyword: "풍요", meaning: "물고기＝풍요 (鱼 yú 는 余 yú 와 같은 소리). 물고기 잡기＝기회 포착. 물 밖으로 뛰어오르는 물고기＝특별한 행운.", type: "auspicious" },
    { symbol: "👶 아기", keyword: "새로운 시작", meaning: "새로운 프로젝트나 단계의 탄생. 임신을 예고할 수도. 주의를 구하는 내면 아이의 상징.", type: "auspicious" },
    { symbol: "🔥 불", keyword: "열정과 위험", meaning: "통제된 불＝활력과 열정. 통제되지 않은 불＝분노나 위기. 불꽃놀이＝축하와 기쁨.", type: "mixed" },
    { symbol: "🏠 집", keyword: "자아와 안전", meaning: "새 집＝인생의 새 단계. 무너지는 집＝불안. 집 청소＝과거 문제 해결.", type: "neutral" },
  ],
};

export default function DreamMeaningPage({ params }: Props) {
  const c = CONTENT[params.locale] || CONTENT.en;
  const symbols = SYMBOLS[params.locale] || SYMBOLS.en;

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
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{c.symbolsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {symbols.map((s) => (
            <div key={s.symbol} className={`card-classic p-3 sm:p-4 border-l-2 ${
              s.type === "auspicious" ? "border-l-green-400" :
              s.type === "warning" ? "border-l-orange-400" :
              s.type === "mixed" ? "border-l-purple-400" : "border-l-stone-300"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{s.symbol.split(" ")[0]}</span>
                <span className="text-sm font-medium text-stone-700">{s.symbol.split(" ").slice(1).join(" ")}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500">{s.keyword}</span>
              </div>
              <p className="text-xs text-stone-500">{s.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-8 text-center">
        <p className="text-sm text-stone-600 mb-4">Dreams and divination both speak the language of symbols.</p>
        <Link href="/divination" className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
          {c.cta} →
        </Link>
      </section>

      <GuideFaq faqs={c.faqs} lang={params.locale} />
    </div>
  );
}
