// 爻辞 (line texts) for hexagrams 17–50 and 53–62 — fills the `lines: []` gaps in hexagrams.ts
// (hexagrams 1–16, 51–52, 63–64 carry their lines inline; 29/30 included here).
// Chinese: received Zhouyi text. English: Wilhelm/Baynes translation tradition,
// polished for modern native-speaker readability (see content-factory SKILL.md §3 EN).

export interface HexagramLine {
  position: number;
  text: string; // 爻辞 (Chinese)
  textEn: string; // English translation
  isYang: boolean;
}

export const midHexagramLines: Record<number, HexagramLine[]> = {
  // 17. 随 (Following) — 兑上震下
  17: [
    { position: 1, text: "官有渝，贞吉。出门交有功。", textEn: "The standard is changing. Perseverance brings good fortune. To step out the door and act brings achievement.", isYang: true },
    { position: 2, text: "系小子，失丈夫。", textEn: "If you cling to the little boy, you lose the strong man.", isYang: false },
    { position: 3, text: "系丈夫，失小子。随有求得，利居贞。", textEn: "If you cling to the strong man, you lose the little boy. Through following you find what you seek. It furthers you to remain persevering.", isYang: false },
    { position: 4, text: "随有获，贞凶。有孚在道，以明，何咎。", textEn: "Following brings gain, but persistence in it brings misfortune. Walk the road with sincerity and clarity — then what blame could there be?", isYang: true },
    { position: 5, text: "孚于嘉，吉。", textEn: "Sincere in what is good. Good fortune.", isYang: true },
    { position: 6, text: "拘系之，乃从维之。王用亨于西山。", textEn: "Held fast and bound, then released to follow. The king makes offering on the Western Mountain.", isYang: false },
  ],
  // 18. 蛊 (Decay) — 艮上巽下
  18: [
    { position: 1, text: "干父之蛊，有子，考无咎，厉终吉。", textEn: "Repairing the damage done by the father. If there is a son, the departed father escapes blame. Danger, but in the end good fortune.", isYang: false },
    { position: 2, text: "干母之蛊，不可贞。", textEn: "Repairing the damage done by the mother. One must not be too persevering in this.", isYang: true },
    { position: 3, text: "干父之蛊，小有悔，无大咎。", textEn: "Repairing the damage done by the father. There will be a little remorse, but no great blame.", isYang: true },
    { position: 4, text: "裕父之蛊，往见吝。", textEn: "Tolerating the damage done by the father. In continuing, one sees humiliation.", isYang: false },
    { position: 5, text: "干父之蛊，用誉。", textEn: "Repairing the damage done by the father. One meets with praise.", isYang: false },
    { position: 6, text: "不事王侯，高尚其事。", textEn: "He does not serve kings and princes; he sets himself higher goals.", isYang: true },
  ],
  // 19. 临 (Approach) — 坤上兑下
  19: [
    { position: 1, text: "咸临，贞吉。", textEn: "Joint approach. Perseverance brings good fortune.", isYang: true },
    { position: 2, text: "咸临，吉无不利。", textEn: "Joint approach. Good fortune. Everything furthers.", isYang: true },
    { position: 3, text: "甘临，无攸利。既忧之，无咎。", textEn: "Sweet approach. Nothing that would further. But once you become anxious about it, no blame.", isYang: false },
    { position: 4, text: "至临，无咎。", textEn: "Complete approach. No blame.", isYang: false },
    { position: 5, text: "知临，大君之宜，吉。", textEn: "Wise approach. This is right for a great prince. Good fortune.", isYang: false },
    { position: 6, text: "敦临，吉无咎。", textEn: "Generous approach. Good fortune, no blame.", isYang: false },
  ],
  // 20. 观 (Contemplation) — 巽上坤下
  20: [
    { position: 1, text: "童观，小人无咎，君子吝。", textEn: "Childlike contemplation. For the inferior man, no blame; for the superior man, humiliation.", isYang: false },
    { position: 2, text: "窥观，利女贞。", textEn: "Contemplation through the crack of the door. Furthers the perseverance of a woman.", isYang: false },
    { position: 3, text: "观我生，进退。", textEn: "Contemplation of my own life decides the choice between advance and retreat.", isYang: false },
    { position: 4, text: "观国之光，利用宾于王。", textEn: "Contemplation of the light of the kingdom. It furthers one to exert influence as the guest of a king.", isYang: false },
    { position: 5, text: "观我生，君子无咎。", textEn: "Contemplation of my life. The superior man is without blame.", isYang: true },
    { position: 6, text: "观其生，君子无咎。", textEn: "Contemplation of his life. The superior man is without blame.", isYang: true },
  ],
  // 21. 噬嗑 (Biting Through) — 离上震下
  21: [
    { position: 1, text: "屦校灭趾，无咎。", textEn: "His feet are fastened in the stocks, so that his toes disappear. No blame.", isYang: true },
    { position: 2, text: "噬肤灭鼻，无咎。", textEn: "He bites through tender meat, so that his nose disappears. No blame.", isYang: false },
    { position: 3, text: "噬腊肉，遇毒。小吝，无咎。", textEn: "He bites on old dried meat and strikes on something poisonous. Slight humiliation. No blame.", isYang: false },
    { position: 4, text: "噬干胏，得金矢。利艰贞，吉。", textEn: "He bites on dried gristly meat and receives metal arrows. It furthers him to be mindful of difficulties and to persevere. Good fortune.", isYang: true },
    { position: 5, text: "噬干肉，得黄金。贞厉，无咎。", textEn: "He bites on dried lean meat and receives yellow gold. Perseveringly aware of danger. No blame.", isYang: false },
    { position: 6, text: "何校灭耳，凶。", textEn: "His neck is fastened in the wooden cangue, so that his ears disappear. Misfortune.", isYang: true },
  ],
  // 22. 贲 (Grace) — 艮上离下
  22: [
    { position: 1, text: "贲其趾，舍车而徒。", textEn: "He lends grace to his toes, leaves the carriage, and walks.", isYang: true },
    { position: 2, text: "贲其须。", textEn: "He lends grace to the beard on his chin.", isYang: false },
    { position: 3, text: "贲如濡如，永贞吉。", textEn: "Graceful and moist. Everlasting perseverance brings good fortune.", isYang: true },
    { position: 4, text: "贲如皤如，白马翰如。匪寇婚媾。", textEn: "Grace or simplicity? A white horse comes as if on wings. He is not a robber; he will woo at the right time.", isYang: false },
    { position: 5, text: "贲于丘园，束帛戋戋。吝，终吉。", textEn: "Grace in the hills and gardens. The roll of silk is meager and small. Humiliation, but in the end good fortune.", isYang: false },
    { position: 6, text: "白贲，无咎。", textEn: "Simple grace. No blame.", isYang: true },
  ],
  // 23. 剥 (Splitting Apart) — 艮上坤下
  23: [
    { position: 1, text: "剥床以足，蔑贞凶。", textEn: "The leg of the bed is split. Those who persevere are destroyed. Misfortune.", isYang: false },
    { position: 2, text: "剥床以辨，蔑贞凶。", textEn: "The bed is split at the edge. Those who persevere are destroyed. Misfortune.", isYang: false },
    { position: 3, text: "剥之，无咎。", textEn: "He splits with them. No blame.", isYang: false },
    { position: 4, text: "剥床以肤，凶。", textEn: "The bed is split up to the skin. Misfortune.", isYang: false },
    { position: 5, text: "贯鱼，以宫人宠，无不利。", textEn: "A shoal of fishes. Favor comes through the court ladies. Everything acts to further.", isYang: false },
    { position: 6, text: "硕果不食，君子得舆，小人剥庐。", textEn: "A large fruit still uneaten. The superior man receives a carriage; the house of the inferior man is split apart.", isYang: true },
  ],
  // 24. 复 (Return) — 坤上震下
  24: [
    { position: 1, text: "不远复，无祗悔，元吉。", textEn: "Return from a short distance. No need for remorse. Great good fortune.", isYang: true },
    { position: 2, text: "休复，吉。", textEn: "Quiet return. Good fortune.", isYang: false },
    { position: 3, text: "频复，厉无咎。", textEn: "Repeated return. Danger, but no blame.", isYang: false },
    { position: 4, text: "中行独复。", textEn: "Walking in the midst of others, one returns alone.", isYang: false },
    { position: 5, text: "敦复，无悔。", textEn: "Noblehearted return. No remorse.", isYang: false },
    { position: 6, text: "迷复，凶，有灾眚。用行师，终有大败。以其国君凶，至于十年不克征。", textEn: "Missing the return. Misfortune, and misfortune of both inner and outer kinds. If armies are set marching in this way, one will in the end suffer a great defeat, disastrous for the ruler of the country. For ten years it will not be possible to attack again.", isYang: false },
  ],
  // 25. 无妄 (Innocence) — 乾上震下
  25: [
    { position: 1, text: "无妄，往吉。", textEn: "Innocent behavior brings good fortune.", isYang: true },
    { position: 2, text: "不耕获，不菑畬，则利有攸往。", textEn: "If one does not count on the harvest while plowing, nor on the use of the ground while clearing it, it furthers one to undertake something.", isYang: false },
    { position: 3, text: "无妄之灾，或系之牛，行人之得，邑人之灾。", textEn: "Undeserved misfortune. The cow that was tethered by someone is the wanderer's gain, the citizen's loss.", isYang: false },
    { position: 4, text: "可贞，无咎。", textEn: "He who can be persevering remains without blame.", isYang: true },
    { position: 5, text: "无妄之疾，勿药有喜。", textEn: "Use no medicine in an illness incurred through no fault of your own. It will pass of itself.", isYang: true },
    { position: 6, text: "无妄，行有眚，无攸利。", textEn: "Innocent action brings misfortune. Nothing furthers.", isYang: true },
  ],
  // 26. 大畜 (Great Taming) — 艮上乾下
  26: [
    { position: 1, text: "有厉，利已。", textEn: "Danger is at hand. It furthers one to desist.", isYang: true },
    { position: 2, text: "舆说輹。", textEn: "The axletrees are taken from the wagon.", isYang: true },
    { position: 3, text: "良马逐，利艰贞。曰闲舆卫，利有攸往。", textEn: "A good horse that follows others. Awareness of danger, with perseverance, furthers. Practice chariot driving and armed defense daily. It furthers one to have somewhere to go.", isYang: true },
    { position: 4, text: "童牛之牿，元吉。", textEn: "The headboard of a young bull. Great good fortune.", isYang: false },
    { position: 5, text: "豮豕之牙，吉。", textEn: "The tusk of a gelded boar. Good fortune.", isYang: false },
    { position: 6, text: "何天之衢，亨。", textEn: "One attains the way of heaven. Success.", isYang: true },
  ],
  // 27. 颐 (Nourishment) — 艮上震下
  27: [
    { position: 1, text: "舍尔灵龟，观我朵颐，凶。", textEn: "You let your magic tortoise go, and look at me with the corners of your mouth drooping. Misfortune.", isYang: true },
    { position: 2, text: "颠颐，拂经于丘颐，征凶。", textEn: "Turning to the summit for nourishment, deviating from the path to seek nourishment from the hill. Continuing this brings misfortune.", isYang: false },
    { position: 3, text: "拂颐，贞凶，十年勿用，无攸利。", textEn: "Turning away from nourishment. Perseverance brings misfortune. Do not act thus for ten years. Nothing serves to further.", isYang: false },
    { position: 4, text: "颠颐吉，虎视眈眈，其欲逐逐，无咎。", textEn: "Turning to the summit for provision of nourishment brings good fortune. Spying about with sharp eyes like a tiger with insatiable craving. No blame.", isYang: false },
    { position: 5, text: "拂经，居贞吉，不可涉大川。", textEn: "Turning away from the path. To remain persevering brings good fortune. One should not cross the great water.", isYang: false },
    { position: 6, text: "由颐，厉吉，利涉大川。", textEn: "The source of nourishment. Awareness of danger brings good fortune. It furthers one to cross the great water.", isYang: true },
  ],
  // 28. 大过 (Great Excess) — 兑上巽下
  28: [
    { position: 1, text: "藉用白茅，无咎。", textEn: "To spread white grass underneath. No blame.", isYang: false },
    { position: 2, text: "枯杨生稊，老夫得其女妻，无不利。", textEn: "A dry poplar sprouts at the root. An older man takes a young wife. Everything furthers.", isYang: true },
    { position: 3, text: "栋桡，凶。", textEn: "The ridgepole sags to the breaking point. Misfortune.", isYang: true },
    { position: 4, text: "栋隆，吉。有它吝。", textEn: "The ridgepole is braced. Good fortune. If there are ulterior motives, humiliation.", isYang: true },
    { position: 5, text: "枯杨生华，老妇得其士夫，无咎无誉。", textEn: "A withered poplar puts forth flowers. An older woman takes a young husband. No blame. No praise.", isYang: true },
    { position: 6, text: "过涉灭顶，凶，无咎。", textEn: "One must go through the water. It goes over one's head. Misfortune, but no blame.", isYang: false },
  ],
  // 29. 坎 (The Abysmal) — 坎上坎下
  29: [
    { position: 1, text: "习坎，入于坎窞，凶。", textEn: "Repetition of the Abysmal. In the abyss one falls into a pit. Misfortune.", isYang: false },
    { position: 2, text: "坎有险，求小得。", textEn: "The abyss is dangerous. Strive to attain small things only.", isYang: true },
    { position: 3, text: "来之坎坎，险且枕，入于坎窞，勿用。", textEn: "Forward and backward, abyss on abyss. In danger like this, pause at first and wait, otherwise you will fall into a pit in the abyss. Do not act in this way.", isYang: false },
    { position: 4, text: "樽酒簋贰，用缶，纳约自牖，终无咎。", textEn: "A jug of wine, a bowl of rice with it; earthen vessels simply handed in through the window. There is certainly no blame in this.", isYang: false },
    { position: 5, text: "坎不盈，祗既平，无咎。", textEn: "The abyss is not filled to overflowing; it is filled only to the rim. No blame.", isYang: true },
    { position: 6, text: "系用徽纆，寘于丛棘，三岁不得，凶。", textEn: "Bound with cords and ropes, shut in between thorn-hedged prison walls: for three years one does not find the way. Misfortune.", isYang: false },
  ],
  // 30. 离 (The Clinging) — 离上离下
  30: [
    { position: 1, text: "履错然，敬之无咎。", textEn: "The footprints run crisscross. If one is seriously intent, no blame.", isYang: true },
    { position: 2, text: "黄离，元吉。", textEn: "Yellow light. Supreme good fortune.", isYang: false },
    { position: 3, text: "日昃之离，不鼓缶而歌，则大耋之嗟，凶。", textEn: "In the light of the setting sun, men either beat the pot and sing or loudly bewail the approach of old age. Misfortune.", isYang: true },
    { position: 4, text: "突如其来如，焚如，死如，弃如。", textEn: "Its coming is sudden; it flames up, dies down, is thrown away.", isYang: true },
    { position: 5, text: "出涕沱若，戚嗟若，吉。", textEn: "Tears in floods, sighing and lamenting. Good fortune.", isYang: false },
    { position: 6, text: "王用出征，有嘉折首，获匪其丑，无咎。", textEn: "The king uses him to march forth and chastise. Then it is best to kill the leaders and take captive the followers. No blame.", isYang: true },
  ],
  // 31. 咸 (Influence) — 兑上艮下
  31: [
    { position: 1, text: "咸其拇。", textEn: "The influence shows itself in the big toe.", isYang: false },
    { position: 2, text: "咸其腓，凶，居吉。", textEn: "The influence shows itself in the calves of the legs. Misfortune. Tarrying brings good fortune.", isYang: false },
    { position: 3, text: "咸其股，执其随，往吝。", textEn: "The influence shows itself in the thighs. He holds to that which follows it. To continue is humiliating.", isYang: true },
    { position: 4, text: "贞吉悔亡。憧憧往来，朋从尔思。", textEn: "Perseverance brings good fortune. Remorse disappears. If a man is agitated in mind and his thoughts go this way and that, only those friends on whom he fixes his conscious thoughts will follow.", isYang: true },
    { position: 5, text: "咸其脢，无悔。", textEn: "The influence shows itself in the back of the neck. No remorse.", isYang: true },
    { position: 6, text: "咸其辅颊舌。", textEn: "The influence shows itself in the jaws, cheeks, and tongue.", isYang: false },
  ],
  // 32. 恒 (Duration) — 震上巽下
  32: [
    { position: 1, text: "浚恒，贞凶，无攸利。", textEn: "Seeking duration too hastily brings misfortune persistently. Nothing that would further.", isYang: false },
    { position: 2, text: "悔亡。", textEn: "Remorse disappears.", isYang: true },
    { position: 3, text: "不恒其德，或承之羞，贞吝。", textEn: "He who does not give duration to his character meets with disgrace. Persistent humiliation.", isYang: true },
    { position: 4, text: "田无禽。", textEn: "No game in the field.", isYang: true },
    { position: 5, text: "恒其德，贞，妇人吉，夫子凶。", textEn: "Giving duration to one's character through perseverance. This is good fortune for a woman, misfortune for a man.", isYang: false },
    { position: 6, text: "振恒，凶。", textEn: "Restlessness as an enduring condition brings misfortune.", isYang: false },
  ],
  // 33. 遁 (Retreat) — 乾上艮下
  33: [
    { position: 1, text: "遁尾，厉，勿用有攸往。", textEn: "At the tail in retreat. This is dangerous. One must not wish to undertake anything.", isYang: false },
    { position: 2, text: "执之用黄牛之革，莫之胜说。", textEn: "He holds him fast with yellow oxhide. No one can tear him loose.", isYang: false },
    { position: 3, text: "系遁，有疾厉，畜臣妾吉。", textEn: "A halted retreat is nerve-wracking and dangerous. To retain people as men- and maidservants brings good fortune.", isYang: true },
    { position: 4, text: "好遁，君子吉，小人否。", textEn: "Voluntary retreat brings good fortune to the superior man and downfall to the inferior man.", isYang: true },
    { position: 5, text: "嘉遁，贞吉。", textEn: "Friendly retreat. Perseverance brings good fortune.", isYang: true },
    { position: 6, text: "肥遁，无不利。", textEn: "Cheerful retreat. Everything serves to further.", isYang: true },
  ],
  // 34. 大壮 (Great Power) — 震上乾下
  34: [
    { position: 1, text: "壮于趾，征凶，有孚。", textEn: "Power in the toes. Continuing brings misfortune. This is certainly true.", isYang: true },
    { position: 2, text: "贞吉。", textEn: "Perseverance brings good fortune.", isYang: true },
    { position: 3, text: "小人用壮，君子用罔，贞厉。羝羊触藩，羸其角。", textEn: "The inferior man works through power; the superior man does not act thus. To continue is dangerous. A goat butts against a hedge and gets its horns entangled.", isYang: true },
    { position: 4, text: "贞吉悔亡。藩决不羸，壮于大舆之輹。", textEn: "Perseverance brings good fortune. Remorse disappears. The hedge opens; there is no entanglement. Power depends upon the axle of a big cart.", isYang: true },
    { position: 5, text: "丧羊于易，无悔。", textEn: "Loses the goat with ease. No remorse.", isYang: false },
    { position: 6, text: "羝羊触藩，不能退，不能遂，无攸利，艰则吉。", textEn: "A goat butts against a hedge. It cannot go backward, it cannot go forward. Nothing serves to further. If one notes the difficulty, this brings good fortune.", isYang: false },
  ],
  // 35. 晋 (Progress) — 离上坤下
  35: [
    { position: 1, text: "晋如摧如，贞吉。罔孚，裕无咎。", textEn: "Progressing, but turned back. Perseverance brings good fortune. If one meets with no confidence, one should remain calm. No mistake.", isYang: false },
    { position: 2, text: "晋如愁如，贞吉。受兹介福，于其王母。", textEn: "Progressing, but in sorrow. Perseverance brings good fortune. Then one obtains great happiness from one's ancestress.", isYang: false },
    { position: 3, text: "众允，悔亡。", textEn: "All are in accord. Remorse disappears.", isYang: false },
    { position: 4, text: "晋如鼫鼠，贞厉。", textEn: "Progress like a hamster. Perseverance brings danger.", isYang: true },
    { position: 5, text: "悔亡，失得勿恤，往吉，无不利。", textEn: "Remorse disappears. Take not gain and loss to heart. Undertakings bring good fortune. Everything serves to further.", isYang: false },
    { position: 6, text: "晋其角，维用伐邑，厉吉无咎，贞吝。", textEn: "Making progress with the horns is permissible only for the purpose of punishing one's own city. To be conscious of danger brings good fortune. No blame. Perseverance brings humiliation.", isYang: true },
  ],
  // 36. 明夷 (Darkening of the Light) — 坤上离下
  36: [
    { position: 1, text: "明夷于飞，垂其翼。君子于行，三日不食。有攸往，主人有言。", textEn: "Darkening of the light during flight. He lowers his wings. The superior man does not eat for three days on his wanderings, but he has somewhere to go. The host has occasion to gossip about him.", isYang: true },
    { position: 2, text: "明夷，夷于左股，用拯马壮，吉。", textEn: "Darkening of the light injures him in the left thigh. He gives aid with the strength of a horse. Good fortune.", isYang: false },
    { position: 3, text: "明夷于南狩，得其大首，不可疾贞。", textEn: "Darkening of the light during the hunt in the south. Their great leader is captured. One must not expect perseverance too soon.", isYang: true },
    { position: 4, text: "入于左腹，获明夷之心，于出门庭。", textEn: "He penetrates the left side of the belly. One gets at the very heart of the darkening of the light, and leaves gate and courtyard.", isYang: false },
    { position: 5, text: "箕子之明夷，利贞。", textEn: "Darkening of the light as with Prince Chi. Perseverance furthers.", isYang: false },
    { position: 6, text: "不明晦，初登于天，后入于地。", textEn: "Not light but darkness. First he climbed up to heaven, then he plunged into the depths of the earth.", isYang: false },
  ],
  // 37. 家人 (The Family) — 巽上离下
  37: [
    { position: 1, text: "闲有家，悔亡。", textEn: "Firm seclusion within the family. Remorse disappears.", isYang: true },
    { position: 2, text: "无攸遂，在中馈，贞吉。", textEn: "She should not follow her whims. She must attend to the food within. Perseverance brings good fortune.", isYang: false },
    { position: 3, text: "家人嗃嗃，悔厉吉。妇子嘻嘻，终吝。", textEn: "When tempers flare up in the family, too great severity brings remorse. Good fortune nonetheless. When woman and child dally and laugh, it leads in the end to humiliation.", isYang: true },
    { position: 4, text: "富家，大吉。", textEn: "She is the treasure of the house. Great good fortune.", isYang: false },
    { position: 5, text: "王假有家，勿恤，吉。", textEn: "As a king he approaches his family. Fear not. Good fortune.", isYang: true },
    { position: 6, text: "有孚威如，终吉。", textEn: "His work commands respect. In the end good fortune comes.", isYang: true },
  ],
  // 38. 睽 (Opposition) — 离上兑下
  38: [
    { position: 1, text: "悔亡。丧马勿逐，自复。见恶人，无咎。", textEn: "Remorse disappears. If you lose your horse, do not run after it; it will come back of its own accord. When you see evil people, guard yourself against mistakes.", isYang: true },
    { position: 2, text: "遇主于巷，无咎。", textEn: "One meets his lord in a narrow street. No blame.", isYang: true },
    { position: 3, text: "见舆曳，其牛掣，其人天且劓。无初有终。", textEn: "One sees the wagon dragged back, the oxen held fast, a man's hair and nose cut off. Not a good beginning, but a good end.", isYang: false },
    { position: 4, text: "睽孤，遇元夫，交孚，厉无咎。", textEn: "Isolated through opposition, one meets a like-minded man with whom one can associate in good faith. Despite the danger, no blame.", isYang: true },
    { position: 5, text: "悔亡，厥宗噬肤，往何咎。", textEn: "Remorse disappears. The companion bites his way through the wrappings. If one goes to him, how could it be a mistake?", isYang: false },
    { position: 6, text: "睽孤，见豕负涂，载鬼一车。先张之弧，后说之弧。匪寇婚媾，往遇雨则吉。", textEn: "Isolated through opposition, one sees one's companion as a pig covered with dirt, as a wagon full of devils. First one draws a bow against him, then one lays the bow aside. He is not a robber; he will woo at the right time. As one goes, rain falls; then good fortune comes.", isYang: true },
  ],
  // 39. 蹇 (Obstruction) — 坎上艮下
  39: [
    { position: 1, text: "往蹇，来誉。", textEn: "Going leads to obstructions; coming meets with praise.", isYang: false },
    { position: 2, text: "王臣蹇蹇，匪躬之故。", textEn: "The king's servant is beset by obstruction upon obstruction, but it is not his own fault.", isYang: false },
    { position: 3, text: "往蹇，来反。", textEn: "Going leads to obstructions; hence he comes back.", isYang: true },
    { position: 4, text: "往蹇，来连。", textEn: "Going leads to obstructions; coming leads to union.", isYang: false },
    { position: 5, text: "大蹇，朋来。", textEn: "In the midst of the greatest obstructions, friends come.", isYang: true },
    { position: 6, text: "往蹇，来硕，吉，利见大人。", textEn: "Going leads to obstructions; coming leads to great good fortune. It furthers one to see the great man.", isYang: false },
  ],
  // 40. 解 (Deliverance) — 震上坎下
  40: [
    { position: 1, text: "无咎。", textEn: "Without blame.", isYang: false },
    { position: 2, text: "田获三狐，得黄矢，贞吉。", textEn: "One kills three foxes in the field and receives a yellow arrow. Perseverance brings good fortune.", isYang: true },
    { position: 3, text: "负且乘，致寇至，贞吝。", textEn: "If a man carries a burden on his back and nonetheless rides in a carriage, he thereby encourages robbers to draw near. Perseverance leads to humiliation.", isYang: false },
    { position: 4, text: "解而拇，朋至斯孚。", textEn: "Deliver yourself from your great toe. Then the companion comes, and him you can trust.", isYang: true },
    { position: 5, text: "君子维有解，吉，有孚于小人。", textEn: "If only the superior man can deliver himself, it brings good fortune. Thus he proves to inferior men that he is in earnest.", isYang: false },
    { position: 6, text: "公用射隼于高墉之上，获之，无不利。", textEn: "The prince shoots at a hawk on a high wall. He kills it. Everything serves to further.", isYang: false },
  ],
  // 41. 损 (Decrease) — 艮上兑下
  41: [
    { position: 1, text: "已事遄往，无咎，酌损之。", textEn: "Going quickly when one's tasks are finished is without blame. But one must reflect on how much one may decrease others.", isYang: true },
    { position: 2, text: "利贞，征凶，弗损益之。", textEn: "Perseverance furthers. To undertake something brings misfortune. Without decreasing oneself, one is able to bring increase to others.", isYang: true },
    { position: 3, text: "三人行，则损一人；一人行，则得其友。", textEn: "When three people journey together, their number decreases by one. When one man journeys alone, he finds a companion.", isYang: false },
    { position: 4, text: "损其疾，使遄有喜，无咎。", textEn: "If a man decreases his faults, it makes the other hasten to come and rejoice. No blame.", isYang: false },
    { position: 5, text: "或益之十朋之龟，弗克违，元吉。", textEn: "Someone does indeed increase him. Ten pairs of tortoises cannot oppose it. Supreme good fortune.", isYang: false },
    { position: 6, text: "弗损益之，无咎，贞吉，利有攸往，得臣无家。", textEn: "If one is increased without depriving others, there is no blame. Perseverance brings good fortune. It furthers one to undertake something. One obtains servants but no longer has a separate home.", isYang: true },
  ],
  // 42. 益 (Increase) — 巽上震下
  42: [
    { position: 1, text: "利用为大作，元吉，无咎。", textEn: "It furthers one to accomplish great deeds. Supreme good fortune. No blame.", isYang: true },
    { position: 2, text: "或益之十朋之龟，弗克违，永贞吉。王用享于帝，吉。", textEn: "Someone does indeed increase him. Ten pairs of tortoises cannot oppose it. Constant perseverance brings good fortune. The king presents him before God. Good fortune.", isYang: false },
    { position: 3, text: "益之用凶事，无咎。有孚中行，告公用圭。", textEn: "One is enriched through unfortunate events. No blame, if you are sincere and walk in the middle, and report with a seal to the prince.", isYang: false },
    { position: 4, text: "中行，告公从，利用为依迁国。", textEn: "If you walk in the middle and report to the prince, he will follow. It furthers one to be used in the removal of the capital.", isYang: false },
    { position: 5, text: "有孚惠心，勿问元吉。有孚惠我德。", textEn: "If in truth you have a kind heart, ask not. Supreme good fortune. Truly, kindness will be recognized as your virtue.", isYang: true },
    { position: 6, text: "莫益之，或击之，立心勿恒，凶。", textEn: "He brings increase to no one. Indeed, someone even strikes him. He does not keep his heart constantly steady. Misfortune.", isYang: true },
  ],
  // 43. 夬 (Breakthrough) — 兑上乾下
  43: [
    { position: 1, text: "壮于前趾，往不胜为咎。", textEn: "Mighty in the forward-going toes. When one goes and is not equal to the task, one makes a mistake.", isYang: true },
    { position: 2, text: "惕号，莫夜有戎，勿恤。", textEn: "A cry of alarm. Arms at evening and at night. Fear nothing.", isYang: true },
    { position: 3, text: "壮于頄，有凶。君子夬夬，独行遇雨，若濡有愠，无咎。", textEn: "To be powerful in the cheekbones brings misfortune. The superior man is firmly resolved. He walks alone and is caught in the rain. He is bespattered, and people murmur against him. No blame.", isYang: true },
    { position: 4, text: "臀无肤，其行次且。牵羊悔亡，闻言不信。", textEn: "There is no skin on his thighs, and walking comes hard. If a man were led like a sheep, remorse would disappear. But if these words are heard, they will not be believed.", isYang: true },
    { position: 5, text: "苋陆夬夬，中行无咎。", textEn: "In dealing with weeds, firm resolution is necessary. Walking in the middle remains free of blame.", isYang: true },
    { position: 6, text: "无号，终有凶。", textEn: "No cry. In the end misfortune comes.", isYang: false },
  ],
  // 44. 姤 (Coming to Meet) — 乾上巽下
  44: [
    { position: 1, text: "系于金柅，贞吉。有攸往，见凶，羸豕孚蹢躅。", textEn: "It must be checked with a brake of bronze. Perseverance brings good fortune. If one lets it take its course, one experiences misfortune. Even a lean pig has it in him to rage around.", isYang: false },
    { position: 2, text: "包有鱼，无咎，不利宾。", textEn: "There is a fish in the tank. No blame. Does not further guests.", isYang: true },
    { position: 3, text: "臀无肤，其行次且，厉，无大咎。", textEn: "There is no skin on his thighs, and walking comes hard. If one is mindful of the danger, no great mistake is made.", isYang: true },
    { position: 4, text: "包无鱼，起凶。", textEn: "No fish in the tank. This leads to misfortune.", isYang: true },
    { position: 5, text: "以杞包瓜，含章，有陨自天。", textEn: "A melon covered with willow leaves. Hidden lines. Then it drops down to one from heaven.", isYang: true },
    { position: 6, text: "姤其角，吝，无咎。", textEn: "He comes to meet with his horns. Humiliation. No blame.", isYang: true },
  ],
  // 45. 萃 (Gathering Together) — 兑上坤下
  45: [
    { position: 1, text: "有孚不终，乃乱乃萃。若号，一握为笑，勿恤，往无咎。", textEn: "If you are sincere, but not to the end, there will sometimes be confusion, sometimes gathering together. If you call out, then after one grasp of the hand you can laugh again. Regret not. Going is without blame.", isYang: false },
    { position: 2, text: "引吉，无咎，孚乃利用禴。", textEn: "Letting oneself be drawn brings good fortune and remains blameless. If one is sincere, it furthers one to bring even a small offering.", isYang: false },
    { position: 3, text: "萃如嗟如，无攸利。往无咎，小吝。", textEn: "Gathering together amid sighs. Nothing that would further. Going is without blame. Slight humiliation.", isYang: false },
    { position: 4, text: "大吉，无咎。", textEn: "Great good fortune. No blame.", isYang: true },
    { position: 5, text: "萃有位，无咎。匪孚，元永贞，悔亡。", textEn: "If in gathering together one has position, this brings no blame. If there are some who are not yet sincere in the work, sublime and enduring perseverance is needed. Then remorse disappears.", isYang: true },
    { position: 6, text: "赍咨涕洟，无咎。", textEn: "Lamenting and sighing, floods of tears. No blame.", isYang: false },
  ],
  // 46. 升 (Pushing Upward) — 坤上巽下
  46: [
    { position: 1, text: "允升，大吉。", textEn: "Pushing upward that meets with confidence brings great good fortune.", isYang: false },
    { position: 2, text: "孚乃利用禴，无咎。", textEn: "If one is sincere, it furthers one to bring even a small offering. No blame.", isYang: true },
    { position: 3, text: "升虚邑。", textEn: "One pushes upward into an empty city.", isYang: true },
    { position: 4, text: "王用亨于岐山，吉，无咎。", textEn: "The king offers him Mount Ch'i. Good fortune. No blame.", isYang: false },
    { position: 5, text: "贞吉，升阶。", textEn: "Perseverance brings good fortune. One pushes upward by steps.", isYang: false },
    { position: 6, text: "冥升，利于不息之贞。", textEn: "Pushing upward in darkness. It furthers one to be unremittingly persevering.", isYang: false },
  ],
  // 47. 困 (Oppression) — 兑上坎下
  47: [
    { position: 1, text: "臀困于株木，入于幽谷，三岁不觌。", textEn: "A man sits oppressed under a bare tree and strays into a gloomy valley. For three years he sees nothing.", isYang: false },
    { position: 2, text: "困于酒食，朱绂方来，利用亨祀，征凶，无咎。", textEn: "One is oppressed while at meat and drink. The man with the scarlet knee bands is just coming. It furthers one to offer sacrifice. To set forth brings misfortune. No blame.", isYang: true },
    { position: 3, text: "困于石，据于蒺藜，入于其宫，不见其妻，凶。", textEn: "A man is oppressed by stones that lie on what ought to grow from the ground, and rests on nettles. He enters his house and does not see his wife. Misfortune.", isYang: false },
    { position: 4, text: "来徐徐，困于金车，吝，有终。", textEn: "He comes very quietly, oppressed in a golden carriage. Humiliation, but the end is reached.", isYang: true },
    { position: 5, text: "劓刖，困于赤绂。乃徐有说，利用祭祀。", textEn: "His nose and feet are cut off. Oppression at the hands of the man with the purple knee bands. Joy comes softly. It furthers one to make offerings and libations.", isYang: true },
    { position: 6, text: "困于葛藟，于臲卼，曰动悔有悔，征吉。", textEn: "He is oppressed by creeping vines. He moves uncertainly and says, 'Movement brings remorse.' If he feels remorse over this and makes a start, good fortune comes.", isYang: false },
  ],
  // 48. 井 (The Well) — 坎上巽下
  48: [
    { position: 1, text: "井泥不食，旧井无禽。", textEn: "One does not drink the mud of the well. No animals come to an old well.", isYang: false },
    { position: 2, text: "井谷射鲋，瓮敝漏。", textEn: "At the wellhole one shoots fishes. The jug is broken and leaks.", isYang: true },
    { position: 3, text: "井渫不食，为我心恻，可用汲，王明，并受其福。", textEn: "The well is cleaned, but no one drinks from it. This is my heart's sorrow, for one might draw from it. If the king were clear-minded, good fortune might be enjoyed in common.", isYang: true },
    { position: 4, text: "井甃，无咎。", textEn: "The well is being lined. No blame.", isYang: false },
    { position: 5, text: "井冽，寒泉食。", textEn: "In the well there is a clear, cold spring from which one can drink.", isYang: true },
    { position: 6, text: "井收勿幕，有孚元吉。", textEn: "One draws from the well without hindrance. It is dependable. Supreme good fortune.", isYang: false },
  ],
  // 49. 革 (Revolution) — 兑上离下
  49: [
    { position: 1, text: "巩用黄牛之革。", textEn: "Wrapped in the hide of a yellow cow.", isYang: true },
    { position: 2, text: "己日乃革之，征吉，无咎。", textEn: "When one's own day comes, one may create revolution. Starting brings good fortune. No blame.", isYang: false },
    { position: 3, text: "征凶，贞厉。革言三就，有孚。", textEn: "Starting brings misfortune. Perseverance brings danger. When talk of revolution has gone the rounds three times, one may commit oneself, and men will believe him.", isYang: true },
    { position: 4, text: "悔亡，有孚改命，吉。", textEn: "Remorse disappears. Men believe him. Changing the form of government brings good fortune.", isYang: true },
    { position: 5, text: "大人虎变，未占有孚。", textEn: "The great man changes like a tiger. Even before he questions the oracle he is believed.", isYang: true },
    { position: 6, text: "君子豹变，小人革面。征凶，居贞吉。", textEn: "The superior man changes like a panther. The inferior man molts in the face. Starting brings misfortune. To remain persevering brings good fortune.", isYang: false },
  ],
  // 50. 鼎 (The Cauldron) — 离上巽下
  50: [
    { position: 1, text: "鼎颠趾，利出否，得妾以其子，无咎。", textEn: "A cauldron with legs turned upward. Furthers removal of stagnating stuff. One takes a concubine for the sake of her son. No blame.", isYang: false },
    { position: 2, text: "鼎有实，我仇有疾，不我能即，吉。", textEn: "There is food in the cauldron. My comrades are envious, but they cannot harm me. Good fortune.", isYang: true },
    { position: 3, text: "鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉。", textEn: "The handle of the cauldron is altered. One is impeded in his way of life. The fat of the pheasant is not eaten. Once rain falls, remorse is spent. Good fortune comes in the end.", isYang: true },
    { position: 4, text: "鼎折足，覆公餗，其形渥，凶。", textEn: "The legs of the cauldron are broken. The prince's meal is spilled, and his person is soiled. Misfortune.", isYang: true },
    { position: 5, text: "鼎黄耳金铉，利贞。", textEn: "The cauldron has yellow handles and golden carrying rings. Perseverance furthers.", isYang: false },
    { position: 6, text: "鼎玉铉，大吉，无不利。", textEn: "The cauldron has rings of jade. Great good fortune. Nothing that would not act to further.", isYang: true },
  ],
  // 53. 渐 (Gradual Development) — 巽上艮下
  53: [
    { position: 1, text: "鸿渐于干，小子厉，有言，无咎。", textEn: "The wild goose gradually draws near the shore. The young son is in danger. There is talk. No blame.", isYang: false },
    { position: 2, text: "鸿渐于磐，饮食衎衎，吉。", textEn: "The wild goose gradually draws near the cliff. Eating and drinking in peace and concord. Good fortune.", isYang: false },
    { position: 3, text: "鸿渐于陆，夫征不复，妇孕不育，凶。利御寇。", textEn: "The wild goose gradually draws near the plateau. The man goes forth and does not return. The woman carries a child but does not give birth. Misfortune. It furthers one to fight off robbers.", isYang: true },
    { position: 4, text: "鸿渐于木，或得其桷，无咎。", textEn: "The wild goose gradually draws near the tree. Perhaps it will find a flat branch. No blame.", isYang: false },
    { position: 5, text: "鸿渐于陵，妇三岁不孕，终莫之胜，吉。", textEn: "The wild goose gradually draws near the summit. For three years the woman has no child. In the end nothing can hinder her. Good fortune.", isYang: true },
    { position: 6, text: "鸿渐于陆，其羽可用为仪，吉。", textEn: "The wild goose gradually draws near the cloud heights. Its feathers can be used for the sacred dance. Good fortune.", isYang: true },
  ],
  // 54. 归妹 (The Marrying Maiden) — 震上兑下
  54: [
    { position: 1, text: "归妹以娣，跛能履，征吉。", textEn: "The marrying maiden as a concubine. A lame man who is able to tread. Undertakings bring good fortune.", isYang: true },
    { position: 2, text: "眇能视，利幽人之贞。", textEn: "A one-eyed man who is able to see. The perseverance of a solitary man furthers.", isYang: true },
    { position: 3, text: "归妹以须，反归以娣。", textEn: "The marrying maiden as a slave. She marries as a concubine.", isYang: false },
    { position: 4, text: "归妹愆期，迟归有时。", textEn: "The marrying maiden draws out the allotted time. A late marriage comes in due course.", isYang: true },
    { position: 5, text: "帝乙归妹，其君之袂，不如其娣之袂良。月几望，吉。", textEn: "The sovereign Yi gives his daughter in marriage. The embroidered garments of the princess were not as gorgeous as those of the serving maid. The moon that is nearly full brings good fortune.", isYang: false },
    { position: 6, text: "女承筐无实，士刲羊无血，无攸利。", textEn: "The woman holds the basket, but there are no fruits in it. The man stabs the sheep, but no blood flows. Nothing that acts to further.", isYang: false },
  ],
  // 55. 丰 (Abundance) — 震上离下
  55: [
    { position: 1, text: "遇其配主，虽旬无咎，往有尚。", textEn: "When a man meets his destined ruler, they can be together ten days, and it is not a mistake. Going meets with recognition.", isYang: true },
    { position: 2, text: "丰其蔀，日中见斗，往得疑疾，有孚发若，吉。", textEn: "The curtain is of such fullness that the polestars can be seen at noon. Through going one suffers from suspicion and envy. If one rouses him through truth, good fortune comes.", isYang: false },
    { position: 3, text: "丰其沛，日中见沫，折其右肱，无咎。", textEn: "The underbrush is of such abundance that the small stars can be seen at noon. He breaks his right arm. But there is no blame.", isYang: true },
    { position: 4, text: "丰其蔀，日中见斗，遇其夷主，吉。", textEn: "The curtain is of such fullness that the polestars can be seen at noon. He meets his ruler, who is of like kind. Good fortune.", isYang: true },
    { position: 5, text: "来章，有庆誉，吉。", textEn: "Lines are coming; blessing and fame draw near. Good fortune.", isYang: false },
    { position: 6, text: "丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶。", textEn: "His house is in a state of fullness. He screens off his family. He peers through the gate and no longer perceives anyone. For three years he sees nothing. Misfortune.", isYang: false },
  ],
  // 56. 旅 (The Wanderer) — 离上艮下
  56: [
    { position: 1, text: "旅琐琐，斯其所取灾。", textEn: "If the wanderer busies himself with trivial things, he draws down misfortune upon himself.", isYang: false },
    { position: 2, text: "旅即次，怀其资，得童仆贞。", textEn: "The wanderer comes to an inn. He has his property with him. He wins the steadfastness of a young servant.", isYang: false },
    { position: 3, text: "旅焚其次，丧其童仆，贞厉。", textEn: "The wanderer's inn burns down. He loses the steadfastness of his young servant. Danger.", isYang: true },
    { position: 4, text: "旅于处，得其资斧，我心不快。", textEn: "The wanderer rests in a shelter. He obtains his property and an ax. My heart is not glad.", isYang: true },
    { position: 5, text: "射雉一矢亡，终以誉命。", textEn: "He shoots a pheasant. It drops with the first arrow. In the end this brings both praise and office.", isYang: false },
    { position: 6, text: "鸟焚其巢，旅人先笑后号啕。丧牛于易，凶。", textEn: "The bird's nest burns up. The wanderer laughs at first, then must needs lament and weep. Through carelessness he loses his cow. Misfortune.", isYang: true },
  ],
  // 57. 巽 (The Gentle) — 巽上巽下
  57: [
    { position: 1, text: "进退，利武人之贞。", textEn: "In advancing and in retreating, the perseverance of a warrior furthers.", isYang: false },
    { position: 2, text: "巽在床下，用史巫纷若，吉无咎。", textEn: "Penetration under the bed. Priests and magicians are used in great number. Good fortune. No blame.", isYang: true },
    { position: 3, text: "频巽，吝。", textEn: "Repeated penetration. Humiliation.", isYang: true },
    { position: 4, text: "悔亡，田获三品。", textEn: "Remorse vanishes. During the hunt three kinds of game are caught.", isYang: false },
    { position: 5, text: "贞吉悔亡，无不利。无初有终，先庚三日，后庚三日，吉。", textEn: "Perseverance brings good fortune. Remorse vanishes. Nothing that does not further. No beginning, but an end. Before the change, three days. After the change, three days. Good fortune.", isYang: true },
    { position: 6, text: "巽在床下，丧其资斧，贞凶。", textEn: "Penetration under the bed. He loses his property and his ax. Perseverance brings misfortune.", isYang: true },
  ],
  // 58. 兑 (The Joyous) — 兑上兑下
  58: [
    { position: 1, text: "和兑，吉。", textEn: "Contented joyousness. Good fortune.", isYang: true },
    { position: 2, text: "孚兑，吉，悔亡。", textEn: "Sincere joyousness. Good fortune. Remorse disappears.", isYang: true },
    { position: 3, text: "来兑，凶。", textEn: "Coming joyousness. Misfortune.", isYang: false },
    { position: 4, text: "商兑未宁，介疾有喜。", textEn: "Joyousness that is weighed is not at peace. After ridding himself of mistakes a man has joy.", isYang: true },
    { position: 5, text: "孚于剥，有厉。", textEn: "Sincerity toward disintegrating influences is dangerous.", isYang: true },
    { position: 6, text: "引兑。", textEn: "Seductive joyousness.", isYang: false },
  ],
  // 59. 涣 (Dispersion) — 巽上坎下
  59: [
    { position: 1, text: "用拯马壮，吉。", textEn: "He brings help with the strength of a horse. Good fortune.", isYang: false },
    { position: 2, text: "涣奔其机，悔亡。", textEn: "At the dissolution he hurries to that which supports him. Remorse disappears.", isYang: true },
    { position: 3, text: "涣其躬，无悔。", textEn: "He dissolves his self. No remorse.", isYang: false },
    { position: 4, text: "涣其群，元吉。涣有丘，匪夷所思。", textEn: "He dissolves his bond with his group. Supreme good fortune. Through dispersion one accumulates to a mountain height. That is something that ordinary men do not think of.", isYang: false },
    { position: 5, text: "涣汗其大号，涣王居，无咎。", textEn: "His loud cries are as dissolving as sweat. Dissolution! A king abides without blame.", isYang: true },
    { position: 6, text: "涣其血，去逖出，无咎。", textEn: "He dissolves his blood. Departing, keeping at a distance, going out, is without blame.", isYang: true },
  ],
  // 60. 节 (Limitation) — 坎上兑下
  60: [
    { position: 1, text: "不出户庭，无咎。", textEn: "Not going out of the door and the courtyard is without blame.", isYang: true },
    { position: 2, text: "不出门庭，凶。", textEn: "Not going out of the gate and the courtyard brings misfortune.", isYang: true },
    { position: 3, text: "不节若，则嗟若，无咎。", textEn: "He who knows no limitation will have cause to lament. No blame.", isYang: false },
    { position: 4, text: "安节，亨。", textEn: "Contented limitation. Success.", isYang: false },
    { position: 5, text: "甘节，吉，往有尚。", textEn: "Sweet limitation brings good fortune. Going brings esteem.", isYang: true },
    { position: 6, text: "苦节，贞凶，悔亡。", textEn: "Galling limitation. Perseverance brings misfortune. Remorse disappears.", isYang: false },
  ],
  // 61. 中孚 (Inner Truth) — 巽上兑下
  61: [
    { position: 1, text: "虞吉，有它不燕。", textEn: "Being prepared brings good fortune. If there are secret designs, it is disquieting.", isYang: true },
    { position: 2, text: "鸣鹤在阴，其子和之。我有好爵，吾与尔靡之。", textEn: "A crane calling in the shade. Its young answers it. I have a good goblet. I will share it with you.", isYang: true },
    { position: 3, text: "得敌，或鼓或罢，或泣或歌。", textEn: "He finds a comrade. Now he beats the drum, now he stops. Now he sobs, now he sings.", isYang: false },
    { position: 4, text: "月几望，马匹亡，无咎。", textEn: "The moon nearly at the full. The team horse goes astray. No blame.", isYang: false },
    { position: 5, text: "有孚挛如，无咎。", textEn: "He possesses truth, which links together. No blame.", isYang: true },
    { position: 6, text: "翰音登于天，贞凶。", textEn: "Cockcrow penetrating to heaven. Perseverance brings misfortune.", isYang: true },
  ],
  // 62. 小过 (Small Excess) — 震上艮下
  62: [
    { position: 1, text: "飞鸟以凶。", textEn: "The bird meets with misfortune through flying.", isYang: false },
    { position: 2, text: "过其祖，遇其妣。不及其君，遇其臣，无咎。", textEn: "She passes by her ancestor and meets her ancestress. He does not reach his prince and meets the official. No blame.", isYang: false },
    { position: 3, text: "弗过防之，从或戕之，凶。", textEn: "If one is not extremely careful, somebody may come up from behind and strike him. Misfortune.", isYang: true },
    { position: 4, text: "无咎，弗过遇之。往厉必戒，勿用永贞。", textEn: "No blame. He meets him without passing by. Going brings danger. One must be on guard. Do not act and be persistently firm.", isYang: true },
    { position: 5, text: "密云不雨，自我西郊，公弋取彼在穴。", textEn: "Dense clouds, no rain from our western territory. The prince shoots and hits him who is in the cave.", isYang: false },
    { position: 6, text: "弗遇过之，飞鸟离之，凶，是谓灾眚。", textEn: "He passes him by, not meeting him. The flying bird leaves him. Misfortune. This means bad luck and injury.", isYang: false },
  ],
};

