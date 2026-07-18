import type { Metadata } from "next";
import GuideFaq from "@/components/GuideFaq";
import GuideCTA from "@/components/GuideCTA";
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
    title: "Chinese Dream Dictionary: What Do Snakes, Water, Teeth & Death Mean in Dreams? | Chinese Culture Studio",
    desc: "Zhou Gong's 3,000-year dream dictionary decoded. Find out what your dreams about snakes, water, teeth falling out, flying, death & fish really mean in Chinese tradition.",
    ogTitle: "Chinese Dream Dictionary: Snakes, Water, Teeth & More Explained",
    ogDesc: "What do snakes, water, teeth falling out, flying & death mean in your dreams? Zhou Gong's ancient Chinese dream dictionary reveals all.",
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
        { symbol: "🏃 Being Chased", keyword: "Anxiety & Avoidance", meaning: "Being chased = running from a problem or emotion. Unknown pursuer = unnamed fear. Unable to move = feeling powerless. Turning to face pursuer = readiness to confront.", type: "warning" },
      { symbol: "⬇️ Falling", keyword: "Loss of Control", meaning: "Falling = losing grip on a situation. Falling from height = fear of failure. Landing safely = reassurance from subconscious. Endless falling = deep insecurity.", type: "warning" },
      { symbol: "👤 Naked in Public", keyword: "Vulnerability & Shame", meaning: "Being naked = feeling exposed or vulnerable. Others not noticing = your fear is internal. Intense shame = hiding a true part of yourself. Feeling comfortable naked = self-acceptance.", type: "warning" },
      { symbol: "📝 Exam / Test", keyword: "Self-Evaluation", meaning: "Taking an exam = feeling judged or tested. Unprepared for exam = imposter syndrome. Failing an exam = fear of inadequacy. Passing with ease = confidence and readiness.", type: "warning" },
      { symbol: "🗺️ Lost / Wandering", keyword: "Direction & Purpose", meaning: "Being lost = uncertainty about life direction. Lost in a forest = overwhelmed by choices. Finding a path = clarity emerging. Lost in a city = social confusion or identity search.", type: "neutral" },
      { symbol: "🩸 Blood", keyword: "Life Force & Pain", meaning: "Blood = vital energy or emotional wounding. Bleeding = losing life force or energy. Menstrual blood = feminine power and renewal. Someone else's blood = absorbing others' pain.", type: "mixed" },
      { symbol: "💰 Money / Wealth", keyword: "Self-Worth & Abundance", meaning: "Finding money = discovering hidden talents. Losing money = fear of loss or insecurity. Giving money away = generosity or guilt. Counterfeit money = feeling deceived in a situation.", type: "mixed" },
      { symbol: "💒 Wedding / Marriage", keyword: "Union & Commitment", meaning: "Your own wedding = new commitment or life phase. Someone else's wedding = witnessing a transition. Wedding disaster = anxiety about commitment. Marrying a stranger = integrating an unknown aspect of self.", type: "mixed" },
      { symbol: "👻 Ghost / Spirit", keyword: "Unresolved Past", meaning: "Seeing a ghost = unresolved past or lingering guilt. Friendly ghost = comforting memory or guidance. Being haunted = past trauma resurfacing. Ghost of a loved one = unfinished emotional business.", type: "mixed" },
      { symbol: "🌊 Flood", keyword: "Overwhelming Emotion", meaning: "Flood = emotions overwhelming conscious control. Surviving a flood = emotional resilience. Flood destroying your home = major life upheaval. Rising floodwater = building emotional pressure needing release.", type: "warning" },
      { symbol: "🚗 Car / Driving", keyword: "Life Direction & Control", meaning: "Driving a car = sense of control over your life. Someone else driving = letting others steer your decisions. Brakes failing = feeling out of control. Car crash = sudden life disruption or warning to slow down.", type: "neutral" },
      { symbol: "🕷️ Spider", keyword: "Patience & Creativity", meaning: "Spider = patience and creative weaving of destiny. Spider web = feeling trapped or entangled in a situation. Large spider = a dominant female figure or maternal anxiety. Killing a spider = rejecting feminine or creative energy.", type: "mixed" },
      { symbol: "🐕 Dog", keyword: "Loyalty & Protection", meaning: "Friendly dog = loyal friendship and protection. Aggressive dog = feeling threatened or betrayed. Lost dog = losing a trusted companion. A dying dog = fear of abandonment or loss.", type: "auspicious" },
      { symbol: "🐈 Cat", keyword: "Independence & Intuition", meaning: "Cat = independence and feminine mystery. Aggressive cat = hidden betrayal or jealousy. Black cat = intuition about impending danger. Many cats = feeling overwhelmed by feminine or intuitive energy.", type: "mixed" },
      { symbol: "🤰 Pregnancy / Birth", keyword: "Creation & New Beginnings", meaning: "Being pregnant = birthing a new idea, project, or phase of life. Giving birth = creative breakthrough. Someone else pregnant = witnessing growth or change in others. Difficult birth = creative struggle or delayed outcome.", type: "auspicious" },
      { symbol: "🏊 Swimming", keyword: "Emotional Navigation", meaning: "Swimming easily = navigating emotions with grace. Struggling to swim = emotional overwhelm. Diving deep underwater = exploring subconscious depths. Swimming against current = fighting life circumstances.", type: "neutral" },
      { symbol: "🧗 Climbing", keyword: "Ambition & Struggle", meaning: "Climbing upward = ambition and career progress. Climbing down = retreat or reconsideration. Falling while climbing = setback in goals. Reaching the summit = achieving a major life milestone.", type: "auspicious" },
      { symbol: "🚪 Door", keyword: "Opportunity & Transition", meaning: "Open door = new opportunity awaiting you. Closed door = obstacle or rejection. Locked door = feeling blocked or excluded from something. Many doors = multiple life choices and paths ahead.", type: "auspicious" },
      { symbol: "🪞 Mirror", keyword: "Self-Reflection & Identity", meaning: "Looking in a mirror = honest self-assessment. Broken mirror = shattered self-image or identity crisis. Distorted reflection = self-deception or denial. Mirror showing someone else = projected identity or aspiration.", type: "neutral" },
      { symbol: "🌧️ Rain", keyword: "Cleansing & Sadness", meaning: "Gentle rain = emotional cleansing and renewal. Heavy rainstorm = emotional turmoil or grief. Rainbow after rain = hope emerging after difficulty. Being soaked in rain = fully immersed in your emotions.", type: "mixed" },
      { symbol: "🌍 Earthquake", keyword: "Upheaval & Shaking Foundations", meaning: "Earthquake = fundamental life change or instability. Surviving an earthquake = resilience through crisis. Ground opening up beneath you = fear of the unknown. Aftershocks = lingering effects of past trauma.", type: "warning" },
      { symbol: "🏫 School / Classroom", keyword: "Learning & Insecurity", meaning: "Being back in school = facing a life lesson or personal growth challenge. Lost in a school = searching for purpose or direction. Old school building = revisiting past lessons. Failing a class = fear of being inadequate.", type: "neutral" },
      { symbol: "🚂 Train / Journey", keyword: "Life Path & Destiny", meaning: "Boarding a train = embarking on a new life path. Missing the train = fear of missed opportunity. Train going through a tunnel = journey through a dark period. Train derailing = life plans falling apart unexpectedly.", type: "neutral" },
      { symbol: "✈️ Airplane / Flight", keyword: "Aspiration & Escape", meaning: "Airplane taking off = launching a new endeavor or chapter. Smooth flight = life progressing according to plan. Turbulence = instability or anxiety in your path. Plane crash = catastrophic fear of failure or loss.", type: "auspicious" },
      { symbol: "🌉 Bridge", keyword: "Transition & Connection", meaning: "Crossing a bridge = moving into a new phase of life. Broken bridge = severed connection or blocked transition. Building a bridge = creating new relationships or opportunities. Bridge collapsing = fear of change or transition failure.", type: "auspicious" },
      { symbol: "⛰️ Mountain", keyword: "Obstacle & Achievement", meaning: "Climbing a mountain = overcoming major life challenge. Standing on a mountain top = achievement and clarity of vision. Mountain in the distance = long-term goal on the horizon. Mountain crumbling = a seemingly impossible obstacle dissolving.", type: "auspicious" },
      { symbol: "🌳 Tree", keyword: "Growth & Roots", meaning: "Flourishing tree = personal growth and stability. Dead or bare tree = stagnation or loss of vitality. Climbing a tree = seeking higher perspective on a situation. Deep tree roots = connection to heritage and family foundation.", type: "auspicious" },
      { symbol: "🌸 Flowers", keyword: "Beauty & Transience", meaning: "Blooming flowers = beauty, romance, and new love. Wilting flowers = fading beauty or missed opportunity. Receiving flowers = feeling appreciated and valued. Planting flowers = investing in future happiness and growth.", type: "auspicious" },
      { symbol: "🍽️ Food / Eating", keyword: "Nourishment & Desire", meaning: "Eating delicious food = satisfaction and fulfillment in life. Unable to eat = unmet needs or unfulfilled desires. Spoiled or rotten food = toxic situation or unhealthy relationship. Sharing a meal = connection, community, and belonging.", type: "neutral" },
      { symbol: "💇 Hair Falling / Cutting", keyword: "Identity & Change", meaning: "Hair falling out in clumps = fear of aging or losing vitality. Cutting your own hair = desiring a major life change. Someone else cutting your hair = feeling loss of control over identity. Beautiful flowing hair = confidence and high self-esteem.", type: "warning" },
      { symbol: "😢 Crying", keyword: "Release & Healing", meaning: "Crying alone = pent-up emotions needing expression. Crying in public = fear of being seen as weak or vulnerable. Unable to cry despite sadness = deeply suppressed emotions. Someone else crying = empathy, guilt, or emotional connection.", type: "neutral" },
      { symbol: "🌊 Drowning", keyword: "Overwhelm & Suffocation", meaning: "Drowning = overwhelmed by emotions or life responsibilities. Being rescued from drowning = help is available if you reach out. Watching someone drown = guilt about not helping others. Surviving drowning = emotional rebirth and second chance.", type: "warning" },
      { symbol: "⏰ Being Late", keyword: "Anxiety & Missed Opportunity", meaning: "Being late for an event = fear of missing out or falling behind. Rushing but unable to move fast = feeling stuck despite your efforts. Missing an important event entirely = fear of social exclusion. Waiting for someone who is late = feeling undervalued or disrespected.", type: "warning" },
      { symbol: "👊 Fighting / Conflict", keyword: "Inner Struggle & Anger", meaning: "Fighting someone = internal conflict or suppressed anger surfacing. Being attacked = feeling victimized or defensive in waking life. Winning a fight = overcoming inner demons or obstacles. Avoiding a fight = choosing peace over confrontation.", type: "mixed" },
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
        { symbol: "🏃 Преследование", keyword: "Тревога и избегание", meaning: "Преследование = бегство от проблемы или эмоции. Неизвестный преследователь = безымянный страх. Невозможность двигаться = бессилие. Поворот лицом = готовность к конфронтации.", type: "warning" },
      { symbol: "⬇️ Падение", keyword: "Потеря контроля", meaning: "Падение = потеря контроля над ситуацией. Падение с высоты = страх неудачи. Мягкое приземление = успокоение от подсознания. Бесконечное падение = глубокая неуверенность.", type: "warning" },
      { symbol: "👤 Нагота на публике", keyword: "Уязвимость и стыд", meaning: "Быть обнажённым = чувство незащищённости. Другие не замечают = страх только внутри вас. Сильный стыд = скрываете часть себя. Комфортная нагота = самопринятие.", type: "warning" },
      { symbol: "📝 Экзамен / Тест", keyword: "Самооценка", meaning: "Сдавать экзамен = чувство осуждения или проверки. Неподготовленность = синдром самозванца. Провал = страх несостоятельности. Лёгкая сдача = уверенность.", type: "warning" },
      { symbol: "🗺️ Потерялся / Блуждание", keyword: "Направление и цель", meaning: "Потеряться = неопределённость в жизни. В лесу = подавленность выбором. Найти путь = появление ясности. В городе = социальное замешательство.", type: "neutral" },
      { symbol: "🩸 Кровь", keyword: "Жизненная сила и боль", meaning: "Кровь = жизненная энергия или эмоциональная рана. Кровотечение = потеря энергии. Менструальная кровь = женская сила. Чужая кровь = поглощение чужой боли.", type: "mixed" },
      { symbol: "💰 Деньги / Богатство", keyword: "Самоценность и изобилие", meaning: "Найти деньги = открытие скрытых талантов. Терять деньги = страх потери. Отдавать деньги = щедрость или вина. Фальшивые деньги = чувство обмана.", type: "mixed" },
      { symbol: "💒 Свадьба / Брак", keyword: "Союз и обязательства", meaning: "Своя свадьба = новый этап жизни. Чужая свадьба = свидетельство перемен. Катастрофа на свадьбе = страх обязательств. Брак с незнакомцем = интеграция неизвестного аспекта себя.", type: "mixed" },
      { symbol: "👻 Призрак / Дух", keyword: "Нерешённое прошлое", meaning: "Видеть призрака = неразрешённое прошлое или вина. Дружественный призрак = утешительное воспоминание. Преследование = всплывающая травма. Призрак близкого = незавершённые дела.", type: "mixed" },
      { symbol: "🌊 Наводнение", keyword: "Переполняющие эмоции", meaning: "Наводнение = эмоции захлёстывают контроль. Выжить в наводнении = эмоциональная устойчивость. Разрушение дома = жизненный переворот. Поднимающаяся вода = растущее давление.", type: "warning" },
      { symbol: "🚗 Машина / Вождение", keyword: "Жизненное направление", meaning: "Вести машину = контроль над жизнью. Кто-то другой ведёт = другие управляют вашими решениями. Отказ тормозов = потеря контроля. Авария = внезапное нарушение планов.", type: "neutral" },
      { symbol: "🕷️ Паук", keyword: "Терпение и творчество", meaning: "Паук = терпение и плетение судьбы. Паутина = чувство ловушки. Большой паук = доминирующая женская фигура. Убить паука = отвержение женской или творческой энергии.", type: "mixed" },
      { symbol: "🐕 Собака", keyword: "Верность и защита", meaning: "Дружелюбная собака = верная дружба и защита. Агрессивная собака = угроза или предательство. Потерянная собака = потеря друга. Умирающая собака = страх покинутости.", type: "auspicious" },
      { symbol: "🐈 Кошка", keyword: "Независимость и интуиция", meaning: "Кошка = независимость и женская тайна. Агрессивная кошка = скрытое предательство. Чёрная кошка = интуиция об опасности. Много кошек = перегрузка женской энергией.", type: "mixed" },
      { symbol: "🤰 Беременность / Рождение", keyword: "Созидание и новые начала", meaning: "Быть беременной = рождение новой идеи или проекта. Рожать = творческий прорыв. Чужая беременность = свидетельство роста в других. Трудные роды = творческая борьба.", type: "auspicious" },
      { symbol: "🏊 Плавание", keyword: "Эмоциональная навигация", meaning: "Легко плыть = изящная навигация в эмоциях. Трудно плыть = эмоциональный перегруз. Глубокое погружение = исследование подсознания. Против течения = борьба с обстоятельствами.", type: "neutral" },
      { symbol: "🧗 Восхождение", keyword: "Амбиции и борьба", meaning: "Подъём вверх = карьерный прогресс. Спуск = отступление. Падение при подъёме = неудача в целях. Достижение вершины = важная веха в жизни.", type: "auspicious" },
      { symbol: "🚪 Дверь", keyword: "Возможность и переход", meaning: "Открытая дверь = новая возможность. Закрытая дверь = препятствие. Запертая дверь = чувство блокировки. Много дверей = множество выборов впереди.", type: "auspicious" },
      { symbol: "🪞 Зеркало", keyword: "Саморефлексия и идентичность", meaning: "Смотреть в зеркало = честная самооценка. Разбитое зеркало = кризис идентичности. Искажённое отражение = самообман. Чужое отражение = проецируемая идентичность.", type: "neutral" },
      { symbol: "🌧️ Дождь", keyword: "Очищение и печаль", meaning: "Тихий дождь = эмоциональное очищение. Сильная гроза = душевное смятение. Радуга после дождя = надежда после трудностей. Промокнуть = полное погружение в эмоции.", type: "mixed" },
      { symbol: "🌍 Землетрясение", keyword: "Переворот и шаткие основы", meaning: "Землетрясение = фундаментальные перемены. Выжить = устойчивость в кризис. Земля раскрывается = страх неизвестности. Афтершоки = последствия травмы.", type: "warning" },
      { symbol: "🏫 Школа / Класс", keyword: "Обучение и неуверенность", meaning: "Вернуться в школу = жизненный урок. Потеряться в школе = поиск цели. Старая школа = пересмотр прошлых уроков. Провалить экзамен = страх неполноценности.", type: "neutral" },
      { symbol: "🚂 Поезд / Путешествие", keyword: "Жизненный путь и судьба", meaning: "Сесть на поезд = новый жизненный путь. Опоздать на поезд = страх упущенной возможности. Поезд в туннеле = путь через тьму. Крушение поезда = крах планов.", type: "neutral" },
      { symbol: "✈️ Самолёт / Полёт", keyword: "Стремление и побег", meaning: "Взлёт = запуск нового дела. Спокойный полёт = жизнь по плану. Турбулентность = нестабильность. Крушение = катастрофический страх провала.", type: "auspicious" },
      { symbol: "🌉 Мост", keyword: "Переход и связь", meaning: "Переходить мост = переход в новую фазу. Сломанный мост = разрыв связи. Строить мост = создание новых отношений. Мост рушится = страх перемен.", type: "auspicious" },
      { symbol: "⛰️ Гора", keyword: "Препятствие и достижение", meaning: "Подниматься на гору = преодоление трудностей. Стоять на вершине = достижение и ясность. Гора вдали = долгосрочная цель. Гора рушится = препятствие исчезает.", type: "auspicious" },
      { symbol: "🌳 Дерево", keyword: "Рост и корни", meaning: "Цветущее дерево = личный рост и стабильность. Мёртвое дерево = застой. Залезть на дерево = поиск высшей перспективы. Корни = связь с наследием и семьёй.", type: "auspicious" },
      { symbol: "🌸 Цветы", keyword: "Красота и быстротечность", meaning: "Цветущие цветы = красота и новая любовь. Увядшие цветы = упущенная возможность. Получать цветы = признание. Сажать цветы = инвестиция в будущее счастье.", type: "auspicious" },
      { symbol: "🍽️ Еда / Приём пищи", keyword: "Питание и желание", meaning: "Вкусная еда = удовлетворение жизнью. Невозможность поесть = неудовлетворённые потребности. Испорченная еда = токсичные отношения. Совместная трапеза = связь и общность.", type: "neutral" },
      { symbol: "💇 Выпадение волос / Стрижка", keyword: "Идентичность и перемены", meaning: "Выпадение волос = страх старения. Стричь себе волосы = желание перемен. Кто-то стрижёт вас = потеря контроля. Красивые волосы = уверенность в себе.", type: "warning" },
      { symbol: "😢 Плач", keyword: "Освобождение и исцеление", meaning: "Плакать в одиночестве = подавленные эмоции. Плакать на публике = страх показаться слабым. Невозможность плакать = глубоко скрытые эмоции. Кто-то плачет = эмпатия или вина.", type: "neutral" },
      { symbol: "🌊 Утопление", keyword: "Перегрузка и удушье", meaning: "Тонуть = перегруженность эмоциями. Быть спасённым = помощь доступна. Смотреть как кто-то тонет = вина за бездействие. Выжить = эмоциональное возрождение.", type: "warning" },
      { symbol: "⏰ Опоздание", keyword: "Тревога и упущенный шанс", meaning: "Опоздать = страх упустить или отстать. Спешить но не двигаться = чувство застревания. Пропустить событие = страх исключения. Ждать опаздывающего = чувство недооценённости.", type: "warning" },
      { symbol: "👊 Драка / Конфликт", keyword: "Внутренняя борьба и гнев", meaning: "Драться с кем-то = внутренний конфликт. Быть атакованным = чувство жертвы. Выиграть бой = преодоление демонов. Избегать драки = выбор мира вместо конфронтации.", type: "mixed" },
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
        { symbol: "🏃 追われる", keyword: "不安と回避", meaning: "追われる夢＝問題や感情からの逃避。未知の追跡者＝名付けられない恐怖。動けない＝無力感。追跡者に向き合う＝対決する準備。", type: "warning" },
      { symbol: "⬇️ 落下", keyword: "コントロール喪失", meaning: "落下＝状況のコントロール喪失。高所からの落下＝失敗への恐怖。無事に着地＝潜在意識からの安心。終わりのない落下＝深い不安感。", type: "warning" },
      { symbol: "👤 人前での裸", keyword: "脆弱性と恥", meaning: "裸でいる＝露出感や脆弱性。誰も気づかない＝恐れは内的なもの。強い恥＝本当の自分を隠している。裸で快適＝自己受容。", type: "warning" },
      { symbol: "📝 試験", keyword: "自己評価", meaning: "試験を受ける＝審判されている感覚。準備不足＝詐欺師症候群。試験に落ちる＝不十分さへの恐れ。簡単に合格＝自信と準備完了。", type: "warning" },
      { symbol: "🗺️ 迷子", keyword: "方向性と目的", meaning: "迷子になる＝人生の方向性の不確かさ。森で迷う＝選択に圧倒。道を見つける＝明晰さの出現。街で迷う＝社会的混乱やアイデンティティ探索。", type: "neutral" },
      { symbol: "🩸 血", keyword: "生命力と痛み", meaning: "血＝生命エネルギーや感情的な傷。出血＝生命力の喪失。月経血＝女性の力と再生。他人の血＝他者の痛みを吸収。", type: "mixed" },
      { symbol: "💰 お金 / 富", keyword: "自己価値と豊かさ", meaning: "お金を見つける＝隠れた才能の発見。お金を失う＝喪失や不安への恐れ。お金をあげる＝寛大さや罪悪感。偽札＝騙されている感覚。", type: "mixed" },
      { symbol: "💒 結婚式", keyword: "結合と約束", meaning: "自分の結婚式＝新しい約束や人生の段階。他人の結婚式＝転換の目撃。結婚式の大失敗＝約束への不安。見知らぬ人との結婚＝未知の自己の統合。", type: "mixed" },
      { symbol: "👻 幽霊 / 霊", keyword: "未解決の過去", meaning: "幽霊を見る＝未解決の過去や罪悪感。友好的な幽霊＝慰めの記憶。憑りつかれる＝過去のトラウマの再浮上。故人の幽霊＝未完の感情的用事。", type: "mixed" },
      { symbol: "🌊 洪水", keyword: "圧倒的な感情", meaning: "洪水＝感情が制御を圧倒。洪水を生き延びる＝感情的回復力。家が破壊される＝人生の大変動。水位上昇＝溜まる感情的プレッシャー。", type: "warning" },
      { symbol: "🚗 車 / 運転", keyword: "人生の方向性と制御", meaning: "車を運転する＝人生のコントロール感。他人が運転＝他人に決断を任せている。ブレーキ故障＝制御不能感。車の事故＝突然の人生の混乱。", type: "neutral" },
      { symbol: "🕷️ 蜘蛛", keyword: "忍耐と創造性", meaning: "蜘蛛＝忍耐と運命の創造的紡ぎ。蜘蛛の巣＝罠や絡まりの感覚。大きな蜘蛛＝支配的な女性像。蜘蛛を殺す＝女性的・創造的エネルギーの拒絶。", type: "mixed" },
      { symbol: "🐕 犬", keyword: "忠誠と保護", meaning: "友好的な犬＝忠実な友情と保護。攻撃的な犬＝脅威や裏切りの感覚。迷子の犬＝信頼できる仲間の喪失。死にかけの犬＝見捨てられる恐怖。", type: "auspicious" },
      { symbol: "🐈 猫", keyword: "独立と直感", meaning: "猫＝独立と女性的な謎。攻撃的な猫＝隠れた裏切りや嫉妬。黒猫＝迫る危険への直感。たくさんの猫＝女性的エネルギーに圧倒。", type: "mixed" },
      { symbol: "🤰 妊娠 / 出産", keyword: "創造と新しい始まり", meaning: "妊娠している＝新しいアイデアや計画の誕生。出産する＝創造的突破口。他人の妊娠＝他者の成長の目撃。難産＝創造的葛藤や遅れた結果。", type: "auspicious" },
      { symbol: "🏊 水泳", keyword: "感情のナビゲーション", meaning: "楽に泳ぐ＝感情を優雅に扱う。泳ぎに苦労＝感情的な圧倒。深く潜る＝潜在意識の深層探索。流れに逆らって泳ぐ＝人生の状況との闘い。", type: "neutral" },
      { symbol: "🧗 登山 / クライミング", keyword: "野心と闘争", meaning: "上に登る＝野心とキャリア進展。下に降りる＝撤退や再考。登りながら落ちる＝目標の後退。頂上到達＝人生の重要なマイルストーン達成。", type: "auspicious" },
      { symbol: "🚪 ドア", keyword: "機会と転換", meaning: "開いたドア＝新しい機会が待っている。閉じたドア＝障害や拒絶。鍵のかかったドア＝ブロック感や排除感。たくさんのドア＝複数の人生の選択肢。", type: "auspicious" },
      { symbol: "🪞 鏡", keyword: "自己反省とアイデンティティ", meaning: "鏡を見る＝正直な自己評価。割れた鏡＝粉々になった自己像。歪んだ反射＝自己欺瞞。他人が映る鏡＝投影されたアイデンティティ。", type: "neutral" },
      { symbol: "🌧️ 雨", keyword: "浄化と悲しみ", meaning: "穏やかな雨＝感情の浄化と再生。激しい嵐＝感情の混乱や悲嘆。雨の後の虹＝困難の後の希望。雨に濡れる＝感情への完全な没入。", type: "mixed" },
      { symbol: "🌍 地震", keyword: "大変動と揺れる基盤", meaning: "地震＝根本的な人生の変化や不安定。地震を生き延びる＝危機での回復力。地面が開く＝未知への恐怖。余震＝過去のトラウマの余波。", type: "warning" },
      { symbol: "🏫 学校 / 教室", keyword: "学びと不安", meaning: "学校に戻る＝人生の教訓や成長の挑戦に直面。学校で迷う＝目的の探索。古い校舎＝過去の教訓の再訪。授業に落ちる＝不十分さへの恐怖。", type: "neutral" },
      { symbol: "🚂 電車 / 旅", keyword: "人生の道筋と運命", meaning: "電車に乗る＝新しい人生の道への出発。電車に乗り遅れる＝機会損失への恐怖。トンネルの中の電車＝暗い時期を通る旅。脱線＝予期せぬ計画の崩壊。", type: "neutral" },
      { symbol: "✈️ 飛行機 / フライト", keyword: "向上心と逃避", meaning: "離陸＝新しい事業や章の始まり。順調な飛行＝計画通りの人生。乱気流＝進路の不安定や不安。墜落＝失敗や喪失への破滅的恐怖。", type: "auspicious" },
      { symbol: "🌉 橋", keyword: "移行とつながり", meaning: "橋を渡る＝人生の新しい段階への移行。壊れた橋＝断たれたつながり。橋を建設する＝新しい関係の創造。橋の崩壊＝変化や移行への恐怖。", type: "auspicious" },
      { symbol: "⛰️ 山", keyword: "障害と達成", meaning: "山を登る＝大きな人生の課題の克服。山頂に立つ＝達成と明晰な視野。遠くの山＝長期的な目標。山が崩れる＝不可能と思われた障害の消滅。", type: "auspicious" },
      { symbol: "🌳 木", keyword: "成長とルーツ", meaning: "繁る木＝個人の成長と安定。枯れた木＝停滞や活力の喪失。木に登る＝より高い視点を求める。深い根＝遺産や家族の基盤とのつながり。", type: "auspicious" },
      { symbol: "🌸 花", keyword: "美しさとはかなさ", meaning: "咲く花＝美と新しい恋。枯れた花＝消えゆく美しさや機会損失。花を贈られる＝感謝されている。花を植える＝未来の幸福への投資。", type: "auspicious" },
      { symbol: "🍽️ 食べ物 / 食事", keyword: "栄養と欲望", meaning: "美味しい食事＝人生の満足と充足。食べられない＝満たされない欲求。腐った食べ物＝有害な状況や関係。食事を分かち合う＝つながりと共同体。", type: "neutral" },
      { symbol: "💇 抜け毛 / 髪を切る", keyword: "アイデンティティと変化", meaning: "髪が抜ける＝老化や活力喪失への恐怖。自分で髪を切る＝大きな人生の変化を望む。他人に髪を切られる＝アイデンティティの制御喪失。美しい髪＝自信と高い自尊心。", type: "warning" },
      { symbol: "😢 泣く", keyword: "解放と癒し", meaning: "一人で泣く＝表現を必要とする溜め込んだ感情。人前で泣く＝弱く見られる恐怖。悲しいのに泣けない＝深く抑圧された感情。誰かが泣いている＝共感や罪悪感。", type: "neutral" },
      { symbol: "🌊 溺れる", keyword: "圧倒と窒息", meaning: "溺れる＝感情や責任に圧倒される。救助される＝助けは手を伸ばせば利用可能。誰かが溺れるのを見る＝助けない罪悪感。溺れて生き延びる＝感情的な再生。", type: "warning" },
      { symbol: "⏰ 遅刻", keyword: "不安と逃した機会", meaning: "遅刻する＝取り残される恐怖。急いでも動けない＝努力にもかかわらず停滞。大事なイベントを逃す＝社会的排除の恐怖。遅刻者を待つ＝軽視されている感覚。", type: "warning" },
      { symbol: "👊 喧嘩 / 闘争", keyword: "内なる闘いと怒り", meaning: "誰かと喧嘩＝内なる葛藤や抑圧された怒り。攻撃される＝被害者意識。喧嘩に勝つ＝内なる悪魔の克服。喧嘩を避ける＝対立より平和を選ぶ。", type: "mixed" },
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
        { symbol: "🏃 쫓기는 꿈", keyword: "불안과 회피", meaning: "쫓기는 꿈＝문제나 감정에서 도망침. 알 수 없는 추격자＝이름 붙일 수 없는 두려움. 움직일 수 없음＝무력감. 추격자를 마주함＝직면할 준비.", type: "warning" },
      { symbol: "⬇️ 추락", keyword: "통제력 상실", meaning: "추락＝상황에 대한 통제력 상실. 높은 곳에서 추락＝실패에 대한 두려움. 안전하게 착지＝잠재의식의 안심. 끝없는 추락＝깊은 불안감.", type: "warning" },
      { symbol: "👤 공공장소에서의 나체", keyword: "취약함과 수치심", meaning: "나체로 있음＝노출되거나 취약한 느낌. 아무도 눈치채지 못함＝두려움은 내면의 것. 강한 수치심＝진정한 자신을 숨김. 편안한 나체＝자기 수용.", type: "warning" },
      { symbol: "📝 시험", keyword: "자기 평가", meaning: "시험을 봄＝심판받는 느낌. 준비 부족＝가면 증후군. 시험에 떨어짐＝부적합에 대한 두려움. 쉽게 통과＝자신감과 준비 완료.", type: "warning" },
      { symbol: "🗺️ 길을 잃음", keyword: "방향과 목적", meaning: "길을 잃음＝인생 방향의 불확실성. 숲에서 길을 잃음＝선택에 압도됨. 길을 찾음＝명확성의 출현. 도시에서 길을 잃음＝사회적 혼란이나 정체성 탐색.", type: "neutral" },
      { symbol: "🩸 피", keyword: "생명력과 고통", meaning: "피＝생명 에너지나 감정적 상처. 출혈＝생명력이나 에너지 상실. 월경혈＝여성의 힘과 재생. 타인의 피＝타인의 고통을 흡수.", type: "mixed" },
      { symbol: "💰 돈 / 재물", keyword: "자기 가치와 풍요", meaning: "돈을 발견함＝숨은 재능의 발견. 돈을 잃음＝상실이나 불안에 대한 두려움. 돈을 줌＝관대함이나 죄책감. 위조지폐＝속고 있다는 느낌.", type: "mixed" },
      { symbol: "💒 결혼식", keyword: "결합과 약속", meaning: "자신의 결혼식＝새로운 약속이나 인생 단계. 타인의 결혼식＝변화의 목격. 결혼식 재앙＝약속에 대한 불안. 낯선 사람과의 결혼＝미지의 자아 통합.", type: "mixed" },
      { symbol: "👻 유령 / 영혼", keyword: "해결되지 않은 과거", meaning: "유령을 봄＝해결되지 않은 과거나 죄책감. 친근한 유령＝위안이 되는 기억. 유령에게 시달림＝과거 트라우마의 재부상. 고인의 유령＝미완의 감정적 과제.", type: "mixed" },
      { symbol: "🌊 홍수", keyword: "압도적인 감정", meaning: "홍수＝감정이 통제를 압도함. 홍수에서 살아남기＝감정적 회복력. 집이 파괴됨＝인생의 대변동. 물이 차오름＝쌓여가는 감정적 압박.", type: "warning" },
      { symbol: "🚗 자동차 / 운전", keyword: "인생의 방향과 통제", meaning: "운전하기＝인생에 대한 통제감. 타인이 운전＝타인이 당신의 결정을 조종. 브레이크 고장＝통제 불능. 자동차 사고＝갑작스러운 인생의 혼란.", type: "neutral" },
      { symbol: "🕷️ 거미", keyword: "인내와 창의성", meaning: "거미＝인내와 운명의 창조적 엮기. 거미줄＝덫에 걸리거나 얽힌 느낌. 큰 거미＝지배적인 여성상. 거미 죽이기＝여성적 또는 창의적 에너지 거부.", type: "mixed" },
      { symbol: "🐕 개", keyword: "충성과 보호", meaning: "친근한 개＝충실한 우정과 보호. 공격적인 개＝위협이나 배신감. 잃어버린 개＝믿었던 동반자의 상실. 죽어가는 개＝버려질 것에 대한 두려움.", type: "auspicious" },
      { symbol: "🐈 고양이", keyword: "독립과 직관", meaning: "고양이＝독립과 여성적 신비. 공격적인 고양이＝숨은 배신이나 질투. 검은 고양이＝다가올 위험에 대한 직관. 많은 고양이＝여성적 에너지에 압도됨.", type: "mixed" },
      { symbol: "🤰 임신 / 출산", keyword: "창조와 새로운 시작", meaning: "임신 중＝새로운 아이디어나 계획의 탄생. 출산＝창조적 돌파. 타인의 임신＝타인의 성장 목격. 난산＝창조적 투쟁이나 지연된 결과.", type: "auspicious" },
      { symbol: "🏊 수영", keyword: "감정의 항해", meaning: "쉽게 수영＝감정을 우아하게 다룸. 수영에 어려움＝감정적 압도. 깊이 잠수＝잠재의식의 심층 탐험. 물살을 거슬러 수영＝인생 상황과의 싸움.", type: "neutral" },
      { symbol: "🧗 클라이밍", keyword: "야망과 투쟁", meaning: "위로 오르기＝야망과 경력 진전. 아래로 내려가기＝후퇴나 재고. 오르다 추락＝목표의 좌절. 정상 도달＝인생의 주요 이정표 달성.", type: "auspicious" },
      { symbol: "🚪 문", keyword: "기회와 전환", meaning: "열린 문＝새로운 기회가 기다림. 닫힌 문＝장애물이나 거절. 잠긴 문＝차단되거나 배제된 느낌. 많은 문＝앞에 놓인 다양한 인생 선택지.", type: "auspicious" },
      { symbol: "🪞 거울", keyword: "자기 반성과 정체성", meaning: "거울 보기＝정직한 자기 평가. 깨진 거울＝산산조각난 자아상. 왜곡된 반사＝자기 기만. 타인이 비치는 거울＝투영된 정체성.", type: "neutral" },
      { symbol: "🌧️ 비", keyword: "정화와 슬픔", meaning: "잔잔한 비＝감정의 정화와 재생. 심한 폭풍우＝감정적 혼란이나 슬픔. 비 온 뒤 무지개＝어려움 후의 희망. 비에 흠뻑 젖음＝감정에 완전히 몰입.", type: "mixed" },
      { symbol: "🌍 지진", keyword: "대변동과 흔들리는 기반", meaning: "지진＝근본적인 인생 변화나 불안정. 지진에서 살아남기＝위기 속 회복력. 땅이 갈라짐＝미지에 대한 두려움. 여진＝과거 트라우마의 잔재.", type: "warning" },
      { symbol: "🏫 학교 / 교실", keyword: "배움과 불안", meaning: "학교로 돌아감＝인생의 교훈이나 성장 도전에 직면. 학교에서 길을 잃음＝목적 탐색. 오래된 학교 건물＝과거 교훈 재방문. 수업 낙제＝부적합에 대한 두려움.", type: "neutral" },
      { symbol: "🚂 기차 / 여행", keyword: "인생의 길과 운명", meaning: "기차 탑승＝새로운 인생 여정의 시작. 기차 놓침＝기회 상실에 대한 두려움. 터널 속 기차＝어두운 시기를 통과하는 여정. 탈선＝예상치 못한 계획의 붕괴.", type: "neutral" },
      { symbol: "✈️ 비행기 / 비행", keyword: "포부와 탈출", meaning: "이륙＝새로운 사업이나 장의 시작. 순조로운 비행＝계획대로 진행되는 인생. 난기류＝경로의 불안정이나 불안. 추락＝실패나 상실에 대한 파멸적 두려움.", type: "auspicious" },
      { symbol: "🌉 다리", keyword: "전환과 연결", meaning: "다리 건너기＝인생의 새로운 단계로 이동. 부서진 다리＝단절된 연결이나 막힌 전환. 다리 건설＝새로운 관계나 기회 창출. 다리 붕괴＝변화나 전환 실패에 대한 두려움.", type: "auspicious" },
      { symbol: "⛰️ 산", keyword: "장애물과 성취", meaning: "산 오르기＝주요 인생 도전 극복. 산 정상에 서기＝성취와 시야의 명확성. 멀리 보이는 산＝장기적 목표. 산이 무너짐＝불가능해 보이던 장애물이 사라짐.", type: "auspicious" },
      { symbol: "🌳 나무", keyword: "성장과 뿌리", meaning: "무성한 나무＝개인적 성장과 안정. 죽은 나무＝정체나 활력 상실. 나무 오르기＝상황에 대한 더 높은 시각 추구. 깊은 뿌리＝유산과 가족 기반과의 연결.", type: "auspicious" },
      { symbol: "🌸 꽃", keyword: "아름다움과 덧없음", meaning: "활짝 핀 꽃＝아름다움과 새로운 사랑. 시든 꽃＝사라지는 아름다움이나 놓친 기회. 꽃을 받음＝인정받고 소중히 여겨짐. 꽃 심기＝미래의 행복에 투자.", type: "auspicious" },
      { symbol: "🍽️ 음식 / 식사", keyword: "영양과 욕망", meaning: "맛있는 음식 먹기＝인생의 만족과 충족. 먹을 수 없음＝충족되지 않은 욕구. 상한 음식＝유독한 상황이나 관계. 식사 나누기＝연결과 공동체 의식.", type: "neutral" },
      { symbol: "💇 탈모 / 머리 자르기", keyword: "정체성과 변화", meaning: "머리카락 빠짐＝노화나 활력 상실에 대한 두려움. 스스로 머리 자르기＝큰 인생 변화를 원함. 타인이 머리 자름＝정체성 통제 상실. 아름다운 머리카락＝자신감과 높은 자존감.", type: "warning" },
      { symbol: "😢 울음", keyword: "해방과 치유", meaning: "혼자 울기＝표현이 필요한 억눌린 감정. 공개적으로 울기＝약해 보이는 것에 대한 두려움. 슬픈데도 못 울음＝깊이 억압된 감정. 누군가 울고 있음＝공감이나 죄책감.", type: "neutral" },
      { symbol: "🌊 익사", keyword: "압도와 질식", meaning: "익사＝감정이나 책임에 압도됨. 구조됨＝도움은 손을 뻗으면 이용 가능. 누군가 익사하는 것을 봄＝돕지 않은 죄책감. 익사에서 살아남기＝감정적 재생.", type: "warning" },
      { symbol: "⏰ 지각", keyword: "불안과 놓친 기회", meaning: "지각＝놓치거나 뒤처지는 것에 대한 두려움. 서두르지만 움직이지 못함＝노력에도 불구하고 정체. 중요한 행사 놓침＝사회적 배제의 두려움. 지각한 사람을 기다림＝과소평가되는 느낌.", type: "warning" },
      { symbol: "👊 싸움 / 갈등", keyword: "내적 투쟁과 분노", meaning: "누군가와 싸움＝내적 갈등이나 억압된 분노. 공격당함＝피해자 의식이나 방어적 태도. 싸움에서 이김＝내면의 악마 극복. 싸움 피하기＝대립보다 평화 선택.", type: "mixed" },
],
};

const TYPE_GROUPS = [
  { type: "auspicious", color: "green", icon: "🟢", border: "border-l-green-400", bg: "bg-green-50/50" },
  { type: "mixed", color: "purple", icon: "🟣", border: "border-l-purple-400", bg: "bg-purple-50/50" },
  { type: "warning", color: "orange", icon: "🟠", border: "border-l-orange-400", bg: "bg-orange-50/50" },
  { type: "neutral", color: "stone", icon: "⚪", border: "border-l-stone-300", bg: "bg-stone-50/50" },
] as const;

const GROUP_LABELS: Record<string, Record<string, string>> = {
  auspicious: {
    en: "🟢 Auspicious Signs", ru: "🟢 Благоприятные знаки",
    ja: "🟢 吉兆", ko: "🟢 길조",
  },
  mixed: {
    en: "🟣 Mixed Meanings", ru: "🟣 Смешанные значения",
    ja: "🟣 混合的な意味", ko: "🟣 혼합된 의미",
  },
  warning: {
    en: "🟠 Warnings & Cautions", ru: "🟠 Предупреждения",
    ja: "🟠 警告サイン", ko: "🟠 경고 신호",
  },
  neutral: {
    en: "⚪ Neutral Symbols", ru: "⚪ Нейтральные символы",
    ja: "⚪ 中立的なシンボル", ko: "⚪ 중립적 상징",
  },
};

function SymbolCard({ s }: { s: { symbol: string; keyword: string; meaning: string; type: string } }) {
  const borderColor =
    s.type === "auspicious" ? "border-l-green-400" :
    s.type === "warning" ? "border-l-orange-400" :
    s.type === "mixed" ? "border-l-purple-400" : "border-l-stone-300";
  const emoji = s.symbol.split(" ")[0];
  const name = s.symbol.split(" ").slice(1).join(" ");
  return (
    <div className={`card-classic p-2.5 sm:p-3 border-l-2 ${borderColor} hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-lg sm:text-xl leading-none">{emoji}</span>
        <span className="text-xs sm:text-sm font-medium text-stone-700 truncate">{name}</span>
        <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 shrink-0">{s.keyword}</span>
      </div>
      <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed">{s.meaning}</p>
    </div>
  );
}

export default function DreamMeaningPage({ params }: Props) {
  const c = CONTENT[params.locale] || CONTENT.en;
  const symbols = SYMBOLS[params.locale] || SYMBOLS.en;
  const lang = params.locale;

  const grouped = TYPE_GROUPS.map(g => ({
    ...g,
    label: (GROUP_LABELS[g.type] || GROUP_LABELS.auspicious)[lang] || GROUP_LABELS[g.type].en,
    items: symbols.filter((s: { type: string }) => s.type === g.type),
  })).filter(g => g.items.length > 0);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 text-center" style={{ color: "var(--accent)" }}>
        {c.heading}
      </h1>
      <p className="text-xs sm:text-sm text-stone-500 text-center mb-6 sm:mb-8 leading-relaxed">{c.subtitle}</p>

      <section className="card-classic p-3 sm:p-6 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-stone-700 mb-2 sm:mb-3">{c.whatTitle}</h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{c.whatBody}</p>
      </section>

      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-stone-700">{c.symbolsTitle}</h2>
          <span className="text-[11px] sm:text-xs text-stone-400">{symbols.length} symbols</span>
        </div>

        <div className="space-y-4">
          {grouped.map((group) => (
            <details key={group.type} open className="group">
              <summary className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg -ml-1 hover:bg-stone-50 text-stone-600 marker:hidden`}>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide opacity-60 transition-transform group-open:rotate-90">▶</span>
                <span className="text-xs sm:text-sm font-semibold">{group.label}</span>
                <span className="text-[10px] sm:text-xs text-stone-400 ml-auto">{group.items.length}</span>
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3">
                {group.items.map((s: { symbol: string; keyword: string; meaning: string; type: string }) => (
                  <SymbolCard key={s.symbol} s={s} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-8 text-center">
        <p className="text-sm text-stone-600 mb-4">Dreams and divination both speak the language of symbols.</p>
        <GuideCTA href="/dream-interpretation" service="dream-interpretation" />
      </section>

      <GuideFaq faqs={c.faqs} lang={params.locale} />

      <GuideCTA href="/dream-interpretation" service="dream-interpretation" variant="sticky" />
    </div>
  );
}
