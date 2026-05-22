// 64 Hexagram data with Chinese text and English translations
// Based on 周易 (I Ching / Book of Changes)

export interface Hexagram {
  id: number;
  nameZh: string;
  nameEn: string;
  pinyin: string;
  upperTrigram: string;
  lowerTrigram: string;
  judgment: string;
  judgmentEn: string;
  description: string;
  descriptionEn: string;
  lines: { position: number; text: string; textEn: string; isYang: boolean }[];
}

export const hexagrams: Hexagram[] = [
  // 1. 乾 (Qián) - The Creative
  {
    id: 1, nameZh: "乾为天", nameEn: "The Creative", pinyin: "Qián Wéi Tiān",
    upperTrigram: "乾", lowerTrigram: "乾",
    judgment: "元亨利贞。",
    judgmentEn: "Supreme success. Perseverance furthers.",
    description: "The Creative represents the primal power of Heaven, the active, creative principle. All six lines are yang, representing pure yang energy at its fullest. This hexagram signifies a time of great potential, strong leadership, and creative force.",
    descriptionEn: "The Creative represents the primal power of Heaven. All six lines are yang, signifying pure creative energy. A time of great potential and strong leadership. Take initiative and act with persistence.",
    lines: [
      { position: 1, text: "潜龙勿用。", textEn: "Hidden dragon. Do not act.", isYang: true },
      { position: 2, text: "见龙在田，利见大人。", textEn: "Dragon appearing in the field. It furthers one to see the great man.", isYang: true },
      { position: 3, text: "君子终日乾乾，夕惕若厉，无咎。", textEn: "The superior man is active all day; in the evening still alert. No blame.", isYang: true },
      { position: 4, text: "或跃在渊，无咎。", textEn: "Wavering flight over the depths. No blame.", isYang: true },
      { position: 5, text: "飞龙在天，利见大人。", textEn: "Flying dragon in the heavens. It furthers one to see the great man.", isYang: true },
      { position: 6, text: "亢龙有悔。", textEn: "Arrogant dragon will have cause to repent.", isYang: true },
    ],
  },
  // 2. 坤 (Kūn) - The Receptive
  {
    id: 2, nameZh: "坤为地", nameEn: "The Receptive", pinyin: "Kūn Wéi Dì",
    upperTrigram: "坤", lowerTrigram: "坤",
    judgment: "元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞吉。",
    judgmentEn: "Supreme success. The perseverance of a mare furthers. If the superior man undertakes something, he goes astray at first but later finds guidance. Resting in perseverance brings good fortune.",
    description: "The Receptive represents the earth, the yielding, receptive principle that complements the Creative. All six lines are yin. This hexagram counsels patience, receptivity, and following rather than leading.",
    descriptionEn: "The Receptive represents Earth, the yielding principle. All six lines are yin. A time for patience and receptivity — follow rather than lead, and let things develop naturally.",
    lines: [
      { position: 1, text: "履霜，坚冰至。", textEn: "When there is hoarfrost underfoot, solid ice is not far off.", isYang: false },
      { position: 2, text: "直方大，不习无不利。", textEn: "Straight, square, great. Without purpose, yet nothing remains unfurthered.", isYang: false },
      { position: 3, text: "含章可贞，或从王事，无成有终。", textEn: "Hidden lines. One is able to remain persevering. If serving a king, do not claim the work as yours — you will bring it to completion.", isYang: false },
      { position: 4, text: "括囊，无咎无誉。", textEn: "A tied-up sack. No blame, no praise.", isYang: false },
      { position: 5, text: "黄裳，元吉。", textEn: "Yellow lower garment. Supreme good fortune.", isYang: false },
      { position: 6, text: "龙战于野，其血玄黄。", textEn: "Dragons fight in the meadow. Their blood is black and yellow.", isYang: false },
    ],
  },
  // 3. 屯 (Zhūn) - Difficulty at the Beginning
  {
    id: 3, nameZh: "水雷屯", nameEn: "Difficulty at the Beginning", pinyin: "Shuǐ Léi Zhūn",
    upperTrigram: "坎", lowerTrigram: "震",
    judgment: "元亨利贞，勿用有攸往，利建侯。",
    judgmentEn: "Supreme success. Do not act yet — it furthers one to appoint helpers.",
    description: "Water over Thunder — the first difficulty. Like a newborn struggling, initial obstacles are natural. Persevere with care, seek support, and do not rush.",
    descriptionEn: "Initial difficulties are natural, like a newborn struggling. Proceed with care, seek support, and do not rush forward.",
    lines: [
      { position: 1, text: "磐桓，利居贞，利建侯。", textEn: "Hesitation and hindrance. It furthers one to remain persevering and to appoint helpers.", isYang: true },
      { position: 2, text: "屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。", textEn: "Difficulties pile up. The horse goes haltingly. Not a robber — a suitor. The maiden is chaste and does not pledge herself. After ten years she pledges.", isYang: false },
      { position: 3, text: "即鹿无虞，惟入于林中，君子几不如舍，往吝。", textEn: "Hunting deer without a forester leads into the forest. The superior man understands: better to give up. Going on brings humiliation.", isYang: false },
      { position: 4, text: "乘马班如，求婚媾，往吉，无不利。", textEn: "The horse goes haltingly. Seeking the union. Going brings good fortune.", isYang: false },
      { position: 5, text: "屯其膏，小贞吉，大贞凶。", textEn: "Difficulties in blessing. Small perseverance brings good fortune; great perseverance brings misfortune.", isYang: true },
      { position: 6, text: "乘马班如，泣血涟如。", textEn: "The horse goes haltingly. Tears of blood flow.", isYang: false },
    ],
  },
  // 4. 蒙 (Méng) - Youthful Folly
  {
    id: 4, nameZh: "山水蒙", nameEn: "Youthful Folly", pinyin: "Shān Shuǐ Méng",
    upperTrigram: "艮", lowerTrigram: "坎",
    judgment: "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。",
    judgmentEn: "Success. It is not I who seek the young fool; the young fool seeks me. The first oracle informs; repeated questioning is impertinence. Perseverance furthers.",
    description: "Mountain over Water — inexperience and learning. Like a student seeking a teacher, ask with sincerity. Repetitive demands bring confusion.",
    descriptionEn: "Youthful inexperience. Like a student seeking a teacher, approach with sincerity. Do not repeat the same questions — trust the guidance given.",
    lines: [
      { position: 1, text: "发蒙，利用刑人，用说桎梏，以往吝。", textEn: "To enlighten the fool, it furthers to apply discipline. To remove fetters brings humiliation.", isYang: false },
      { position: 2, text: "包蒙吉，纳妇吉，子克家。", textEn: "To bear with fools brings good fortune. To take a wife brings good fortune. The son is capable of managing the household.", isYang: true },
      { position: 3, text: "勿用取女，见金夫，不有躬，无攸利。", textEn: "Do not take this maiden. She loses herself at the sight of a man of bronze. Nothing furthers.", isYang: false },
      { position: 4, text: "困蒙，吝。", textEn: "Entangled folly. Humiliation.", isYang: false },
      { position: 5, text: "童蒙，吉。", textEn: "Childlike folly. Good fortune.", isYang: false },
      { position: 6, text: "击蒙，不利为寇，利御寇。", textEn: "Punishing folly. It does not further to commit transgressions, but to prevent them.", isYang: true },
    ],
  },
  // 5. 需 (Xū) - Waiting
  {
    id: 5, nameZh: "水天需", nameEn: "Waiting", pinyin: "Shuǐ Tiān Xū",
    upperTrigram: "坎", lowerTrigram: "乾",
    judgment: "有孚，光亨，贞吉。利涉大川。",
    judgmentEn: "Sincere confidence brings brilliant success. Perseverance brings good fortune. It furthers one to cross the great water.",
    description: "Water over Heaven — waiting with patience. Clouds gathering but rain not yet falling. Nourish yourself and wait for the right moment.",
    descriptionEn: "Patience is needed. Clouds gather but have not yet released rain. Nourish yourself and wait for the right moment to act.",
    lines: [
      { position: 1, text: "需于郊，利用恒，无咎。", textEn: "Waiting in the meadow. It furthers to abide in what endures. No blame.", isYang: true },
      { position: 2, text: "需于沙，小有言，终吉。", textEn: "Waiting on the sand. There is some gossip. The end brings good fortune.", isYang: true },
      { position: 3, text: "需于泥，致寇至。", textEn: "Waiting in the mud. Brings about the arrival of the enemy.", isYang: true },
      { position: 4, text: "需于血，出自穴。", textEn: "Waiting in blood. Get out of the pit.", isYang: false },
      { position: 5, text: "需于酒食，贞吉。", textEn: "Waiting at meat and drink. Perseverance brings good fortune.", isYang: true },
      { position: 6, text: "入于穴，有不速之客三人来，敬之终吉。", textEn: "Fallen into the pit. Three uninvited guests arrive. Honor them and good fortune comes.", isYang: false },
    ],
  },
  // 6. 讼 (Sòng) - Conflict
  {
    id: 6, nameZh: "天水讼", nameEn: "Conflict", pinyin: "Tiān Shuǐ Sòng",
    upperTrigram: "乾", lowerTrigram: "坎",
    judgment: "有孚窒惕，中吉，终凶。利见大人，不利涉大川。",
    judgmentEn: "Sincere confidence is blocked. Halfway brings good fortune. Going through to the end brings misfortune. It furthers one to see the great man but does not further one to cross the great water.",
    description: "Heaven over Water — opposing forces create conflict. Compromise and seek mediation rather than pursuing victory to the bitter end.",
    descriptionEn: "Conflict arises from opposing forces. Seek compromise and mediation rather than pursuing victory at all costs.",
    lines: [
      { position: 1, text: "不永所事，小有言，终吉。", textEn: "Do not perpetuate the matter. There is a little gossip — in the end, good fortune.", isYang: false },
      { position: 2, text: "不克讼，归而逋，其邑人三百户，无眚。", textEn: "Unable to win the conflict, he returns and flees. His city of three hundred households remains free of trouble.", isYang: true },
      { position: 3, text: "食旧德，贞厉，终吉。或从王事，无成。", textEn: "Nourishing oneself on ancient virtue. Perseverance amidst danger brings good fortune. If serving a king, do not seek works.", isYang: false },
      { position: 4, text: "不克讼，复即命，渝安贞，吉。", textEn: "Unable to win the conflict, he returns and submits to fate. He changes and finds peace in perseverance. Good fortune.", isYang: true },
      { position: 5, text: "讼，元吉。", textEn: "The conflict. Supreme good fortune.", isYang: true },
      { position: 6, text: "或锡之鞶带，终朝三褫之。", textEn: "Even if by chance a belt of honor is bestowed, by the end of morning it will have been snatched away three times.", isYang: true },
    ],
  },
  // 7. 师 (Shī) - The Army
  {
    id: 7, nameZh: "地水师", nameEn: "The Army", pinyin: "Dì Shuǐ Shī",
    upperTrigram: "坤", lowerTrigram: "坎",
    judgment: "贞，丈人吉，无咎。",
    judgmentEn: "The army needs perseverance and a strong man. Good fortune without blame.",
    description: "Earth over Water — the army, collective action. Requires strong, experienced leadership. Discipline and clear purpose are essential.",
    descriptionEn: "Collective action requires strong, experienced leadership. Maintain discipline and a clear, just purpose.",
    lines: [
      { position: 1, text: "师出以律，否臧凶。", textEn: "An army must set forth with discipline. Without it, misfortune.", isYang: false },
      { position: 2, text: "在师中吉无咎，王三锡命。", textEn: "In the midst of the army, good fortune and no blame. The king bestows a triple commission.", isYang: true },
      { position: 3, text: "师或舆尸，凶。", textEn: "Perchance the army carries corpses in the wagon. Misfortune.", isYang: false },
      { position: 4, text: "师左次，无咎。", textEn: "The army retreats. No blame.", isYang: false },
      { position: 5, text: "田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶。", textEn: "There is game in the field. It furthers to catch it. The elder leads the army; the younger carries corpses. Perseverance brings misfortune.", isYang: false },
      { position: 6, text: "大君有命，开国承家，小人勿用。", textEn: "The great prince issues commands, founds states, vests families with fiefs. Inferior people should not be employed.", isYang: false },
    ],
  },
  // 8. 比 (Bǐ) - Holding Together
  {
    id: 8, nameZh: "水地比", nameEn: "Holding Together", pinyin: "Shuǐ Dì Bǐ",
    upperTrigram: "坎", lowerTrigram: "坤",
    judgment: "吉。原筮，元永贞，无咎。不宁方来，后夫凶。",
    judgmentEn: "Good fortune. Inquire of the oracle once again whether you possess sincerity and constancy — then there is no blame. Those uncertain gradually join. He who comes too late meets misfortune.",
    description: "Water on Earth — union and cohesion. Leadership that unites people willingly. Community thrives through mutual support and shared purpose.",
    descriptionEn: "Unity and cohesion. People gather around sincere leadership. Community thrives through mutual support.",
    lines: [
      { position: 1, text: "有孚比之，无咎。有孚盈缶，终来有他，吉。", textEn: "Hold to him in sincerity. No blame. Sincerity filling the earthen bowl brings unexpected good fortune.", isYang: false },
      { position: 2, text: "比之自内，贞吉。", textEn: "Hold to him from within. Perseverance brings good fortune.", isYang: false },
      { position: 3, text: "比之匪人。", textEn: "You hold together with the wrong people.", isYang: false },
      { position: 4, text: "外比之，贞吉。", textEn: "Hold to him outwardly also. Perseverance brings good fortune.", isYang: false },
      { position: 5, text: "显比，王用三驱，失前禽。邑人不诫，吉。", textEn: "Manifestation of holding together. The king hunts on three sides only, letting the game escape forward. Citizens are not warned. Good fortune.", isYang: true },
      { position: 6, text: "比之无首，凶。", textEn: "He finds no head for holding together. Misfortune.", isYang: false },
    ],
  },
  // 9. 小畜 (Xiǎo Chù) - The Taming Power of the Small
  {
    id: 9, nameZh: "风天小畜", nameEn: "Small Taming", pinyin: "Fēng Tiān Xiǎo Chù",
    upperTrigram: "巽", lowerTrigram: "乾",
    judgment: "亨。密云不雨，自我西郊。",
    judgmentEn: "Success. Dense clouds, no rain from our western region.",
    description: "Wind over Heaven — small accumulation. Minor obstacles temporarily restrain great potential. Gentle persistence overcomes.",
    descriptionEn: "Minor obstacles temporarily restrain progress. Gentle and persistent effort will overcome them.",
    lines: [
      { position: 1, text: "复自道，何其咎，吉。", textEn: "Return to the way. How could there be blame? Good fortune.", isYang: true },
      { position: 2, text: "牵复，吉。", textEn: "Allowing oneself to be drawn back brings good fortune.", isYang: true },
      { position: 3, text: "舆说辐，夫妻反目。", textEn: "The spokes burst from the wagon wheel. Man and wife roll their eyes.", isYang: true },
      { position: 4, text: "有孚，血去惕出，无咎。", textEn: "Possessing sincerity, bloodshed is avoided and fear departs. No blame.", isYang: false },
      { position: 5, text: "有孚挛如，富以其邻。", textEn: "Possessing sincerity and drawing together, one is enriched by one's neighbors.", isYang: true },
      { position: 6, text: "既雨既处，尚德载，妇贞厉，月几望，君子征凶。", textEn: "The rain comes, rest comes. This is the carrying power of accumulated virtue. The wife's perseverance brings danger. The moon is nearly full. If the superior man marches, misfortune.", isYang: true },
    ],
  },
  // 10. 履 (Lǚ) - Treading
  {
    id: 10, nameZh: "天泽履", nameEn: "Treading", pinyin: "Tiān Zé Lǚ",
    upperTrigram: "乾", lowerTrigram: "兑",
    judgment: "履虎尾，不咥人，亨。",
    judgmentEn: "Treading upon the tail of the tiger. It does not bite the man. Success.",
    description: "Heaven over Lake — conduct and proper behavior. Tread carefully in a dangerous situation. Correct conduct ensures safety.",
    descriptionEn: "Conduct yourself carefully as if treading on a tiger's tail. Proper behavior ensures safety even in danger.",
    lines: [
      { position: 1, text: "素履，往无咎。", textEn: "Simple conduct. Progress without blame.", isYang: true },
      { position: 2, text: "履道坦坦，幽人贞吉。", textEn: "Treading the path smoothly. The perseverance of a quiet man brings good fortune.", isYang: true },
      { position: 3, text: "眇能视，跛能履，履虎尾，咥人，凶。武人为于大君。", textEn: "A one-eyed man can see; a lame man can tread — but they tread on the tiger's tail and it bites. Misfortune. A warrior acts thus for his great prince.", isYang: false },
      { position: 4, text: "履虎尾，愬愬终吉。", textEn: "Treading on the tiger's tail. Caution and fear lead to good fortune in the end.", isYang: true },
      { position: 5, text: "夬履，贞厉。", textEn: "Resolute conduct. Perseverance in the face of danger.", isYang: true },
      { position: 6, text: "视履考祥，其旋元吉。", textEn: "Look to your conduct and examine what is favorable. When the turn comes, supreme good fortune.", isYang: true },
    ],
  },
  // 11. 泰 (Tài) - Peace
  {
    id: 11, nameZh: "地天泰", nameEn: "Peace", pinyin: "Dì Tiān Tài",
    upperTrigram: "坤", lowerTrigram: "乾",
    judgment: "小往大来，吉亨。",
    judgmentEn: "The small departs, the great approaches. Good fortune and success.",
    description: "Earth above, Heaven below — harmony and peace. Heaven and Earth are in communication. A time of prosperity, harmony, and flowing abundance.",
    descriptionEn: "Harmony and peace. Heaven and Earth communicate freely. A time of prosperity and flowing abundance.",
    lines: [
      { position: 1, text: "拔茅茹，以其汇，征吉。", textEn: "When pulling up reed, the sod goes with it, each according to its kind. Undertakings bring good fortune.", isYang: true },
      { position: 2, text: "包荒，用冯河，不遐遗，朋亡，得尚于中行。", textEn: "Bearing with the uncultured, crossing the river, not forgetting the distant, not neglecting friends — thus one finds the middle way.", isYang: true },
      { position: 3, text: "无平不陂，无往不复，艰贞无咎。", textEn: "No plain not followed by a slope. No going not followed by return. He who remains persevering in danger has no blame.", isYang: true },
      { position: 4, text: "翩翩不富，以其邻，不戒以孚。", textEn: "Fluttering down, not boasting of wealth, together with one's neighbor, guileless and sincere.", isYang: false },
      { position: 5, text: "帝乙归妹，以祉元吉。", textEn: "The sovereign Yi gives his daughter in marriage. This brings blessings and supreme good fortune.", isYang: false },
      { position: 6, text: "城复于隍，勿用师，自邑告命，贞吝。", textEn: "The wall falls back into the moat. Do not use the army now. Declare your orders from your own city. Perseverance brings humiliation.", isYang: false },
    ],
  },
  // 12. 否 (Pǐ) - Standstill
  {
    id: 12, nameZh: "天地否", nameEn: "Standstill", pinyin: "Tiān Dì Pǐ",
    upperTrigram: "乾", lowerTrigram: "坤",
    judgment: "否之匪人，不利君子贞，大往小来。",
    judgmentEn: "Standstill caused by evil people does not further the perseverance of the superior man. The great departs, the small approaches.",
    description: "Heaven above, Earth below — separation and stagnation. Heaven and Earth are not in communication. Withdraw and preserve your integrity during adverse times.",
    descriptionEn: "Stagnation and separation. Heaven and Earth do not communicate. Withdraw and preserve your integrity during adverse times.",
    lines: [
      { position: 1, text: "拔茅茹，以其汇，贞吉亨。", textEn: "When pulling up reed, the sod goes with it. Perseverance brings good fortune and success.", isYang: false },
      { position: 2, text: "包承，小人吉，大人否亨。", textEn: "Bearing and enduring — small people have good fortune. The great man endures the standstill with success.", isYang: false },
      { position: 3, text: "包羞。", textEn: "They bear shame.", isYang: false },
      { position: 4, text: "有命无咎，畴离祉。", textEn: "He who acts at the command of the highest remains without blame. Those like-minded share in the blessing.", isYang: true },
      { position: 5, text: "休否，大人吉。其亡其亡，系于苞桑。", textEn: "Standstill is giving way. Good fortune for the great man. 'What if it should fail?' — thus he ties himself to the mulberry tree.", isYang: true },
      { position: 6, text: "倾否，先否后喜。", textEn: "The standstill is overthrown. First standstill, then joy.", isYang: true },
    ],
  },
  // 13. 同人 (Tóng Rén) - Fellowship
  {
    id: 13, nameZh: "天火同人", nameEn: "Fellowship with Men", pinyin: "Tiān Huǒ Tóng Rén",
    upperTrigram: "乾", lowerTrigram: "离",
    judgment: "同人于野，亨。利涉大川，利君子贞。",
    judgmentEn: "Fellowship with men in the open. Success. It furthers one to cross the great water. The perseverance of the superior man furthers.",
    description: "Heaven over Fire — fellowship and community. People united by shared ideals and clarity of purpose can achieve great things.",
    descriptionEn: "Community united by shared ideals. Clarity of purpose enables great achievements through collaboration.",
    lines: [
      { position: 1, text: "同人于门，无咎。", textEn: "Fellowship with men at the gate. No blame.", isYang: true },
      { position: 2, text: "同人于宗，吝。", textEn: "Fellowship with men in the clan. Humiliation.", isYang: false },
      { position: 3, text: "伏戎于莽，升其高陵，三岁不兴。", textEn: "Hiding weapons in the thicket, climbing the high hill. For three years he does not rise up.", isYang: true },
      { position: 4, text: "乘其墉，弗克攻，吉。", textEn: "He rides upon the wall but does not attack. Good fortune.", isYang: true },
      { position: 5, text: "同人先号啕而后笑，大师克相遇。", textEn: "Men bound in fellowship first weep and lament, then laugh. After great struggles they meet.", isYang: true },
      { position: 6, text: "同人于郊，无悔。", textEn: "Fellowship with men in the meadow. No remorse.", isYang: true },
    ],
  },
  // 14. 大有 (Dà Yǒu) - Great Possession
  {
    id: 14, nameZh: "火天大有", nameEn: "Great Possession", pinyin: "Huǒ Tiān Dà Yǒu",
    upperTrigram: "离", lowerTrigram: "乾",
    judgment: "元亨。",
    judgmentEn: "Supreme success.",
    description: "Fire over Heaven — great abundance. When inner strength is illuminated by clarity, prosperity flows naturally. Use abundance wisely and generously.",
    descriptionEn: "Great abundance. Inner strength illuminated by clarity. Use prosperity wisely and share generously.",
    lines: [
      { position: 1, text: "无交害，匪咎，艰则无咎。", textEn: "No relationship with what is harmful. Not a mistake. Through hardship comes no blame.", isYang: true },
      { position: 2, text: "大车以载，有攸往，无咎。", textEn: "A great wagon for loading. One may undertake something. No blame.", isYang: true },
      { position: 3, text: "公用亨于天子，小人弗克。", textEn: "A prince offers it to the Son of Heaven. A petty person cannot do this.", isYang: true },
      { position: 4, text: "匪其彭，无咎。", textEn: "He makes a difference between himself and his neighbor. No blame.", isYang: true },
      { position: 5, text: "厥孚交如，威如，吉。", textEn: "He whose sincerity is evident and commands respect brings good fortune.", isYang: false },
      { position: 6, text: "自天佑之，吉无不利。", textEn: "He is blessed by Heaven. Good fortune. Nothing that does not further.", isYang: true },
    ],
  },
  // 15-30 condensed
  // 15. 谦 (Qiān) - Modesty
  {
    id: 15, nameZh: "地山谦", nameEn: "Modesty", pinyin: "Dì Shān Qiān",
    upperTrigram: "坤", lowerTrigram: "艮",
    judgment: "亨，君子有终。", judgmentEn: "Success. The superior man carries things through.",
    description: "Mountain within Earth — modesty. True greatness lies hidden within. The modest person is respected and things come to completion naturally.",
    descriptionEn: "True greatness lies hidden within. Modesty brings respect and natural completion of matters.",
    lines: [
      { position: 1, text: "谦谦君子，用涉大川，吉。", textEn: "A superior man modest in his modesty may cross the great water. Good fortune.", isYang: false },
      { position: 2, text: "鸣谦，贞吉。", textEn: "Modesty that expresses itself. Perseverance brings good fortune.", isYang: false },
      { position: 3, text: "劳谦，君子有终吉。", textEn: "A superior man of meritorious modesty carries things through to good fortune.", isYang: true },
      { position: 4, text: "无不利，㧑谦。", textEn: "Nothing that does not further modesty.", isYang: false },
      { position: 5, text: "不富以其邻，利用侵伐，无不利。", textEn: "Not boasting of wealth before one's neighbor. It furthers to attack. Nothing that does not further.", isYang: false },
      { position: 6, text: "鸣谦，利用行师，征邑国。", textEn: "Modesty that expresses itself. It furthers to march the army against one's own city and country.", isYang: false },
    ],
  },
  // 16. 豫 (Yù) - Enthusiasm
  {
    id: 16, nameZh: "雷地豫", nameEn: "Enthusiasm", pinyin: "Léi Dì Yù",
    upperTrigram: "震", lowerTrigram: "坤",
    judgment: "利建侯行师。", judgmentEn: "It furthers one to install helpers and to set armies marching.",
    description: "Thunder over Earth — enthusiasm and joy. Enthusiasm inspires and mobilizes. Channel excitement into constructive action.",
    descriptionEn: "Joyful enthusiasm that inspires and mobilizes. Channel excitement into constructive action.",
    lines: [
      { position: 1, text: "鸣豫，凶。", textEn: "Enthusiasm that expresses itself brings misfortune.", isYang: false },
      { position: 2, text: "介于石，不终日，贞吉。", textEn: "Firm as a rock. Not a whole day. Perseverance brings good fortune.", isYang: false },
      { position: 3, text: "盱豫，悔，迟有悔。", textEn: "Enthusiasm that looks upward creates remorse. Hesitation brings remorse.", isYang: false },
      { position: 4, text: "由豫，大有得，勿疑，朋盍簪。", textEn: "The source of enthusiasm achieves great things. Do not doubt. Friends gather around.", isYang: true },
      { position: 5, text: "贞疾，恒不死。", textEn: "Persistently ill, but still does not die.", isYang: false },
      { position: 6, text: "冥豫，成有渝，无咎。", textEn: "Deluded enthusiasm. But if one changes after completion, there is no blame.", isYang: false },
    ],
  },
  // 51-64 key hexagrams
  // 51. 震 (Zhèn) - The Arousing
  {
    id: 51, nameZh: "震为雷", nameEn: "The Arousing", pinyin: "Zhèn Wéi Léi",
    upperTrigram: "震", lowerTrigram: "震",
    judgment: "亨。震来虩虩，笑言哑哑，震惊百里，不丧匕鬯。",
    judgmentEn: "Success. Shock comes — oh! Laughing words — ha! The shock terrifies for a hundred miles, but he does not let fall the sacrificial spoon.",
    description: "Thunder doubled — shock and awakening. Sudden events stir and awaken. The superior man examines himself and sets his life in order.",
    descriptionEn: "Sudden awakening through shock. The superior man examines himself and sets his affairs in order.",
    lines: [
      { position: 1, text: "震来虩虩，后笑言哑哑，吉。", textEn: "Shock comes — oh! Then laughing words — ha! Good fortune.", isYang: true },
      { position: 2, text: "震来厉，亿丧贝，跻于九陵，勿逐，七日得。", textEn: "Shock comes bringing danger. A hundred thousand cowries lost. Climb the nine hills. Do not pursue. After seven days you will get them back.", isYang: false },
      { position: 3, text: "震苏苏，震行无眚。", textEn: "Shock comes and makes one distraught. If shock stirs one to action, one remains free of misfortune.", isYang: false },
      { position: 4, text: "震遂泥。", textEn: "Shock is mired.", isYang: true },
      { position: 5, text: "震往来厉，亿无丧，有事。", textEn: "Shock goes and comes, dangerous. No loss, but there is business to attend to.", isYang: false },
      { position: 6, text: "震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言。", textEn: "Shock brings ruin and terrified gazing. Going brings misfortune. If it has not yet reached one's own body but the neighbor's, there is no blame. Marriage brings gossip.", isYang: false },
    ],
  },
  // 52. 艮 (Gèn) - Keeping Still
  {
    id: 52, nameZh: "艮为山", nameEn: "Keeping Still", pinyin: "Gèn Wéi Shān",
    upperTrigram: "艮", lowerTrigram: "艮",
    judgment: "艮其背，不获其身，行其庭，不见其人，无咎。",
    judgmentEn: "Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.",
    description: "Mountain doubled — stillness and rest. True stillness of the heart. Stop at the right place, rest when needed.",
    descriptionEn: "True stillness of the heart. Know when to stop and rest. Find peace within.",
    lines: [
      { position: 1, text: "艮其趾，无咎，利永贞。", textEn: "Keeping his toes still. No blame. Continued perseverance furthers.", isYang: false },
      { position: 2, text: "艮其腓，不拯其随，其心不快。", textEn: "Keeping his calves still. He cannot rescue the one he follows. His heart is not glad.", isYang: false },
      { position: 3, text: "艮其限，列其夤，厉薰心。", textEn: "Keeping his hips still. Making his sacrum stiff. Dangerous. The heart suffocates.", isYang: true },
      { position: 4, text: "艮其身，无咎。", textEn: "Keeping his trunk still. No blame.", isYang: false },
      { position: 5, text: "艮其辅，言有序，悔亡。", textEn: "Keeping his jaws still. Words have order. Remorse disappears.", isYang: false },
      { position: 6, text: "敦艮，吉。", textEn: "Noblehearted keeping still. Good fortune.", isYang: true },
    ],
  },
  // 63. 既济 (Jì Jì) - After Completion
  {
    id: 63, nameZh: "水火既济", nameEn: "After Completion", pinyin: "Shuǐ Huǒ Jì Jì",
    upperTrigram: "坎", lowerTrigram: "离",
    judgment: "亨，小利贞，初吉终乱。",
    judgmentEn: "Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.",
    description: "Water over Fire — completion achieved. Things are in perfect balance. But completion naturally leads to new beginnings — stay vigilant.",
    descriptionEn: "Completion achieved. Things are in balance. But stay vigilant — completion leads to change and new beginnings.",
    lines: [
      { position: 1, text: "曳其轮，濡其尾，无咎。", textEn: "He brakes his wheels. He gets his tail wet. No blame.", isYang: true },
      { position: 2, text: "妇丧其茀，勿逐，七日得。", textEn: "The woman loses her carriage curtain. Do not run after it; on the seventh day you will get it.", isYang: false },
      { position: 3, text: "高宗伐鬼方，三年克之，小人勿用。", textEn: "The Illustrious Ancestor attacks the Demon Region. After three years he conquers it. Inferior people must not be employed.", isYang: true },
      { position: 4, text: "繻有衣袽，终日戒。", textEn: "The finest clothes turn to rags. Be careful all day long.", isYang: false },
      { position: 5, text: "东邻杀牛，不如西邻之禴祭，实受其福。", textEn: "The neighbor in the east who slaughters an ox does not match the western neighbor's simple sacrifice that brings true blessing.", isYang: true },
      { position: 6, text: "濡其首，厉。", textEn: "He gets his head wet. Danger.", isYang: false },
    ],
  },
  // 64. 未济 (Wèi Jì) - Before Completion
  {
    id: 64, nameZh: "火水未济", nameEn: "Before Completion", pinyin: "Huǒ Shuǐ Wèi Jì",
    upperTrigram: "离", lowerTrigram: "坎",
    judgment: "亨，小狐汔济，濡其尾，无攸利。",
    judgmentEn: "Success. But if the little fox, almost across, gets his tail wet, there is nothing that would further.",
    description: "Fire over Water — transition before completion. The last hexagram of the I Ching. All things are in transition. Careful progress is needed to reach the goal.",
    descriptionEn: "Transition before completion. The final hexagram. Careful progress needed — don't rush the last steps.",
    lines: [
      { position: 1, text: "濡其尾，吝。", textEn: "He gets his tail wet. Humiliation.", isYang: false },
      { position: 2, text: "曳其轮，贞吉。", textEn: "He brakes his wheels. Perseverance brings good fortune.", isYang: true },
      { position: 3, text: "未济，征凶，利涉大川。", textEn: "Before completion, attack brings misfortune. It furthers one to cross the great water.", isYang: false },
      { position: 4, text: "贞吉，悔亡，震用伐鬼方，三年有赏于大国。", textEn: "Perseverance brings good fortune. Remorse disappears. Shock is used to attack the Demon Region. For three years, great kingdoms reward.", isYang: true },
      { position: 5, text: "贞吉，无悔，君子之光，有孚，吉。", textEn: "Perseverance brings good fortune. No remorse. The light of the superior man is sincere. Good fortune.", isYang: false },
      { position: 6, text: "有孚于饮酒，无咎，濡其首，有孚失是。", textEn: "There is sincerity in drinking wine. No blame. But if one wets his head, he loses sincerity.", isYang: true },
    ],
  },
];

// Fill in remaining hexagrams 17-50 and 53-62 with abbreviated data
const midHexagrams: Hexagram[] = [
  { id: 17, nameZh: "泽雷随", nameEn: "Following", pinyin: "Zé Léi Suí", upperTrigram: "兑", lowerTrigram: "震", judgment: "元亨利贞，无咎。", judgmentEn: "Supreme success. Perseverance furthers. No blame.", description: "Lake over Thunder — following the times. Adapt to circumstances without losing your principles.", descriptionEn: "Follow the natural flow of events. Adapt while staying true to your principles.", lines: [] },
  { id: 18, nameZh: "山风蛊", nameEn: "Decay", pinyin: "Shān Fēng Gǔ", upperTrigram: "艮", lowerTrigram: "巽", judgment: "元亨，利涉大川，先甲三日，后甲三日。", judgmentEn: "Supreme success. It furthers one to cross the great water. Before the starting point, three days. After the starting point, three days.", description: "Mountain over Wind — decay and renewal. What has been neglected must be restored with careful work.", descriptionEn: "Address what has been neglected. Restoration requires careful, deliberate work.", lines: [] },
  { id: 19, nameZh: "地泽临", nameEn: "Approach", pinyin: "Dì Zé Lín", upperTrigram: "坤", lowerTrigram: "兑", judgment: "元亨利贞，至于八月有凶。", judgmentEn: "Supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.", description: "Earth over Lake — approaching. Good things draw near. Be welcoming but discerning.", descriptionEn: "Good things approach. Be welcoming yet discerning of what draws near.", lines: [] },
  { id: 20, nameZh: "风地观", nameEn: "Contemplation", pinyin: "Fēng Dì Guān", upperTrigram: "巽", lowerTrigram: "坤", judgment: "盥而不荐，有孚颙若。", judgmentEn: "The ritual washing has been made but not yet the offering. Full of sincerity, they look up.", description: "Wind over Earth — contemplation. Observe carefully before acting. Understanding comes through patient watching.", descriptionEn: "Observe carefully before acting. Understanding comes through patient contemplation.", lines: [] },
  { id: 21, nameZh: "火雷噬嗑", nameEn: "Biting Through", pinyin: "Huǒ Léi Shì Kè", upperTrigram: "离", lowerTrigram: "震", judgment: "亨，利用狱。", judgmentEn: "Success. It furthers one to administer justice.", description: "Fire over Thunder — biting through obstacles. Clear away obstructions decisively.", descriptionEn: "Obstacles must be decisively removed. Justice and clarity prevail.", lines: [] },
  { id: 22, nameZh: "山火贲", nameEn: "Grace", pinyin: "Shān Huǒ Bì", upperTrigram: "艮", lowerTrigram: "离", judgment: "亨，小利有攸往。", judgmentEn: "Success. In small matters, it furthers one to undertake something.", description: "Mountain over Fire — grace and adornment. Form enhances substance but should not replace it.", descriptionEn: "Grace and form enhance substance. Beauty supports but does not replace inner truth.", lines: [] },
  { id: 23, nameZh: "山地剥", nameEn: "Splitting Apart", pinyin: "Shān Dì Bō", upperTrigram: "艮", lowerTrigram: "坤", judgment: "不利有攸往。", judgmentEn: "It does not further one to undertake anything.", description: "Mountain over Earth — deterioration. Things are falling apart. Stay still and wait for renewal.", descriptionEn: "Deterioration and collapse. Do not act now — wait for the cycle to turn.", lines: [] },
  { id: 24, nameZh: "地雷复", nameEn: "Return", pinyin: "Dì Léi Fù", upperTrigram: "坤", lowerTrigram: "震", judgment: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。", judgmentEn: "Success. Going out and coming in without error. Friends come without blame. The way returns. After seven days comes return. It furthers one to undertake something.", description: "Earth over Thunder — return and renewal. The turning point. New energy rises from below.", descriptionEn: "The turning point. New energy rises. A fresh start after difficulty.", lines: [] },
  { id: 25, nameZh: "天雷无妄", nameEn: "Innocence", pinyin: "Tiān Léi Wú Wàng", upperTrigram: "乾", lowerTrigram: "震", judgment: "元亨利贞。其匪正有眚，不利有攸往。", judgmentEn: "Supreme success. Perseverance furthers. If someone is not correct, he has misfortune. It does not further to undertake anything.", description: "Heaven over Thunder — innocence and naturalness. Act from pure intent, free of ulterior motives.", descriptionEn: "Act from pure, natural intent. Free from calculation and ulterior motives.", lines: [] },
  { id: 26, nameZh: "山天大畜", nameEn: "Great Taming", pinyin: "Shān Tiān Dà Chù", upperTrigram: "艮", lowerTrigram: "乾", judgment: "利贞，不家食吉，利涉大川。", judgmentEn: "Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.", description: "Mountain over Heaven — great accumulation. Nurture great strength through restraint and self-discipline.", descriptionEn: "A time of great cultivation. Build strength through self-discipline and restraint.", lines: [] },
  { id: 27, nameZh: "山雷颐", nameEn: "Nourishment", pinyin: "Shān Léi Yí", upperTrigram: "艮", lowerTrigram: "震", judgment: "贞吉。观颐，自求口实。", judgmentEn: "Perseverance brings good fortune. Pay heed to nourishment and to what a person seeks to fill his own mouth.", description: "Mountain over Thunder — nourishment. Care for both physical and spiritual sustenance.", descriptionEn: "Nourish both body and spirit. Be mindful of what you take in.", lines: [] },
  { id: 28, nameZh: "泽风大过", nameEn: "Great Excess", pinyin: "Zé Fēng Dà Guò", upperTrigram: "兑", lowerTrigram: "巽", judgment: "栋桡，利有攸往，亨。", judgmentEn: "The ridgepole sags. It furthers one to undertake something. Success.", description: "Lake over Wind — great excess. The center cannot bear the weight. Bold action in crisis is needed.", descriptionEn: "The weight is too much for the center. Bold, unconventional action required.", lines: [] },
  { id: 29, nameZh: "坎为水", nameEn: "The Abysmal", pinyin: "Kǎn Wéi Shuǐ", upperTrigram: "坎", lowerTrigram: "坎", judgment: "习坎，有孚，维心亨，行有尚。", judgmentEn: "Repeated danger. With sincerity, the heart penetrates. Action is esteemed.", description: "Water doubled — the abyss, danger. Face danger with sincerity and inner truth. Flow like water around obstacles.", descriptionEn: "Danger doubled. Face it with sincerity. Flow like water around obstacles.", lines: [] },
  { id: 30, nameZh: "离为火", nameEn: "The Clinging", pinyin: "Lí Wéi Huǒ", upperTrigram: "离", lowerTrigram: "离", judgment: "利贞，亨。畜牝牛吉。", judgmentEn: "Perseverance furthers. It brings success. Caring for a cow brings good fortune.", description: "Fire doubled — clarity and illumination. Cling to what is true and bright. Illuminate the path ahead.", descriptionEn: "Clarity and illumination. Cling to what is true. Brighten the path ahead.", lines: [] },
  { id: 31, nameZh: "泽山咸", nameEn: "Influence", pinyin: "Zé Shān Xián", upperTrigram: "兑", lowerTrigram: "艮", judgment: "亨，利贞，取女吉。", judgmentEn: "Success. Perseverance furthers. To take a maiden to wife brings good fortune.", description: "Lake over Mountain — mutual influence, attraction. Gentle influence through openness and receptivity.", descriptionEn: "Mutual attraction and influence. Win others through openness and gentle persuasion.", lines: [] },
  { id: 32, nameZh: "雷风恒", nameEn: "Duration", pinyin: "Léi Fēng Héng", upperTrigram: "震", lowerTrigram: "巽", judgment: "亨，无咎，利贞，利有攸往。", judgmentEn: "Success. No blame. Perseverance furthers. It furthers one to undertake something.", description: "Thunder over Wind — endurance and constancy. Lasting relationships require renewal within stability.", descriptionEn: "Endurance. Lasting relationships need both stability and renewal.", lines: [] },
  { id: 33, nameZh: "天山遁", nameEn: "Retreat", pinyin: "Tiān Shān Dùn", upperTrigram: "乾", lowerTrigram: "艮", judgment: "亨，小利贞。", judgmentEn: "Success. In small matters, perseverance furthers.", description: "Heaven over Mountain — strategic retreat. Withdraw from a disadvantageous situation to preserve strength.", descriptionEn: "Strategic withdrawal. Preserve your strength for a better time.", lines: [] },
  { id: 34, nameZh: "雷天大壮", nameEn: "Great Power", pinyin: "Léi Tiān Dà Zhuàng", upperTrigram: "震", lowerTrigram: "乾", judgment: "利贞。", judgmentEn: "Perseverance furthers.", description: "Thunder over Heaven — great strength and power. Use power wisely and with restraint.", descriptionEn: "Great power. Use strength wisely and with just restraint.", lines: [] },
  { id: 35, nameZh: "火地晋", nameEn: "Progress", pinyin: "Huǒ Dì Jìn", upperTrigram: "离", lowerTrigram: "坤", judgment: "康侯用锡马蕃庶，昼日三接。", judgmentEn: "The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.", description: "Fire over Earth — steady progress. The sun rises over the earth. Advance with clarity.", descriptionEn: "Steady advancement. Like the rising sun, progress comes with clarity and warmth.", lines: [] },
  { id: 36, nameZh: "地火明夷", nameEn: "Darkening of the Light", pinyin: "Dì Huǒ Míng Yí", upperTrigram: "坤", lowerTrigram: "离", judgment: "利艰贞。", judgmentEn: "Perseverance in hardship furthers.", description: "Earth over Fire — light hidden. In dark times, keep your inner light burning. Be cautious and patient.", descriptionEn: "Light is hidden. Keep inner brightness alive. Be cautious and patient in dark times.", lines: [] },
  { id: 37, nameZh: "风火家人", nameEn: "The Family", pinyin: "Fēng Huǒ Jiā Rén", upperTrigram: "巽", lowerTrigram: "离", judgment: "利女贞。", judgmentEn: "The perseverance of the woman furthers.", description: "Wind over Fire — family and household. Harmony at home comes from each member fulfilling their proper role.", descriptionEn: "Family harmony. Each member fulfilling their role with care and love.", lines: [] },
  { id: 38, nameZh: "火泽睽", nameEn: "Opposition", pinyin: "Huǒ Zé Kuí", upperTrigram: "离", lowerTrigram: "兑", judgment: "小事吉。", judgmentEn: "In small matters, good fortune.", description: "Fire over Lake — opposition and contrast. Differences can coexist productively if handled with tact.", descriptionEn: "Opposition and contrast. Differences can enrich when handled wisely.", lines: [] },
  { id: 39, nameZh: "水山蹇", nameEn: "Obstruction", pinyin: "Shuǐ Shān Jiǎn", upperTrigram: "坎", lowerTrigram: "艮", judgment: "利西南，不利东北，利见大人，贞吉。", judgmentEn: "The southwest furthers. The northeast does not further. It furthers to see the great man. Perseverance brings good fortune.", description: "Water over Mountain — obstacles ahead. When blocked, retreat and seek a different path. Seek wise counsel.", descriptionEn: "Obstacles ahead. Retreat and find another path. Seek wise guidance.", lines: [] },
  { id: 40, nameZh: "雷水解", nameEn: "Deliverance", pinyin: "Léi Shuǐ Xiè", upperTrigram: "震", lowerTrigram: "坎", judgment: "利西南，无所往，其来复吉，有攸往，夙吉。", judgmentEn: "The southwest furthers. If there is nowhere to go, return brings good fortune. If there is somewhere to go, hastening brings good fortune.", description: "Thunder over Water — liberation. Obstacles dissolve. Forgive and move forward lightly.", descriptionEn: "Liberation from obstacles. Forgive the past and move forward freely.", lines: [] },
  { id: 41, nameZh: "山泽损", nameEn: "Decrease", pinyin: "Shān Zé Sǔn", upperTrigram: "艮", lowerTrigram: "兑", judgment: "有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。", judgmentEn: "Sincerity brings supreme good fortune. No blame. One may remain persevering. Even two small bowls can be used for the sacrifice.", description: "Mountain over Lake — decrease for increase. Sometimes less is more. Reduce excess to strengthen what matters.", descriptionEn: "Decrease leads to increase. Reduce excess to strengthen the essential.", lines: [] },
  { id: 42, nameZh: "风雷益", nameEn: "Increase", pinyin: "Fēng Léi Yì", upperTrigram: "巽", lowerTrigram: "震", judgment: "利有攸往，利涉大川。", judgmentEn: "It furthers one to undertake something. It furthers one to cross the great water.", description: "Wind over Thunder — increase and growth. A time of abundance. Share generously and seize opportunities.", descriptionEn: "Growth and increase. Share abundance and seize the moment.", lines: [] },
  { id: 43, nameZh: "泽天夬", nameEn: "Breakthrough", pinyin: "Zé Tiān Guài", upperTrigram: "兑", lowerTrigram: "乾", judgment: "扬于王庭，孚号有厉，告自邑，不利即戎，利有攸往。", judgmentEn: "One must make the matter known at the king's court, crying out with sincerity that there is danger. Do not resort to arms. It furthers one to undertake something.", description: "Lake over Heaven — decisive breakthrough. The truth must be declared openly before action.", descriptionEn: "Decisive breakthrough. Declare the truth openly before taking action.", lines: [] },
  { id: 44, nameZh: "天风姤", nameEn: "Coming to Meet", pinyin: "Tiān Fēng Gòu", upperTrigram: "乾", lowerTrigram: "巽", judgment: "女壮，勿用取女。", judgmentEn: "The maiden is powerful. One should not marry such a maiden.", description: "Heaven over Wind — encounter. An unexpected meeting. Be cautious of powerful seductive forces.", descriptionEn: "Unexpected encounter. Be cautious of what seems too attractive.", lines: [] },
  { id: 45, nameZh: "泽地萃", nameEn: "Gathering Together", pinyin: "Zé Dì Cuì", upperTrigram: "兑", lowerTrigram: "坤", judgment: "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。", judgmentEn: "Success. The king approaches his temple. It furthers to see the great man. Success and perseverance. Great sacrifice brings good fortune. It furthers to undertake something.", description: "Lake over Earth — gathering together. People unite around a common purpose or leader.", descriptionEn: "People gather around a common purpose. Unity brings strength.", lines: [] },
  { id: 46, nameZh: "地风升", nameEn: "Pushing Upward", pinyin: "Dì Fēng Shēng", upperTrigram: "坤", lowerTrigram: "巽", judgment: "元亨，用见大人，勿恤，南征吉。", judgmentEn: "Supreme success. It furthers to see the great man. Do not worry. Advance toward the south brings good fortune.", description: "Earth over Wind — gradual ascent. Steady growth upward, like a tree growing from the earth.", descriptionEn: "Steady, gradual rise. Like a tree growing — persistent upward progress.", lines: [] },
  { id: 47, nameZh: "泽水困", nameEn: "Oppression", pinyin: "Zé Shuǐ Kùn", upperTrigram: "兑", lowerTrigram: "坎", judgment: "亨，贞，大人吉，无咎，有言不信。", judgmentEn: "Success. Perseverance. The great man brings good fortune. No blame. When one has something to say, it is not believed.", description: "Lake over Water — exhaustion and oppression. When confined, inner strength is what matters. Words are not heeded now.", descriptionEn: "Exhaustion and confinement. Words carry little weight — rely on inner strength.", lines: [] },
  { id: 48, nameZh: "水风井", nameEn: "The Well", pinyin: "Shuǐ Fēng Jǐng", upperTrigram: "坎", lowerTrigram: "巽", judgment: "改邑不改井，无丧无得，往来井井。汔至亦未繘井，羸其瓶，凶。", judgmentEn: "The town may be changed, but the well cannot. Neither decrease nor increase. People come and go and draw from the well. If one gets down almost to the water and the rope does not go all the way, or the jug breaks, misfortune.", description: "Water over Wind — the well, enduring source. Nourish the common good. The source sustains all unchanged.", descriptionEn: "The enduring source that sustains all. Nurture what benefits everyone unchanged.", lines: [] },
  { id: 49, nameZh: "泽火革", nameEn: "Revolution", pinyin: "Zé Huǒ Gé", upperTrigram: "兑", lowerTrigram: "离", judgment: "己日乃孚，元亨利贞，悔亡。", judgmentEn: "On the day of change, there will be confidence. Supreme success. Perseverance furthers. Remorse disappears.", description: "Lake over Fire — revolution and transformation. The old must give way to the new at the right moment.", descriptionEn: "Transformation. The old gives way to the new when the time is right.", lines: [] },
  { id: 50, nameZh: "火风鼎", nameEn: "The Cauldron", pinyin: "Huǒ Fēng Dǐng", upperTrigram: "离", lowerTrigram: "巽", judgment: "元吉，亨。", judgmentEn: "Supreme good fortune. Success.", description: "Fire over Wind — the sacred cauldron, transformation. Nourishment transformed into higher culture and civilization.", descriptionEn: "The sacred vessel of transformation. Raw nourishment becomes culture and civilization.", lines: [] },
  { id: 53, nameZh: "风山渐", nameEn: "Gradual Development", pinyin: "Fēng Shān Jiàn", upperTrigram: "巽", lowerTrigram: "艮", judgment: "女归吉，利贞。", judgmentEn: "The maiden is given in marriage. Good fortune. Perseverance furthers.", description: "Wind over Mountain — gradual progress. Slow and steady development, like courtship leading to marriage.", descriptionEn: "Slow, steady development. Like courtship — patient progress brings lasting results.", lines: [] },
  { id: 54, nameZh: "雷泽归妹", nameEn: "The Marrying Maiden", pinyin: "Léi Zé Guī Mèi", upperTrigram: "震", lowerTrigram: "兑", judgment: "征凶，无攸利。", judgmentEn: "Undertakings bring misfortune. Nothing that would further.", description: "Thunder over Lake — improper union. A relationship built on impulse rather than proper procedure. Proceed with care.", descriptionEn: "A union formed on impulse. Proceed with caution in relationships.", lines: [] },
  { id: 55, nameZh: "雷火丰", nameEn: "Abundance", pinyin: "Léi Huǒ Fēng", upperTrigram: "震", lowerTrigram: "离", judgment: "亨，王假之，勿忧，宜日中。", judgmentEn: "Success. The king attains it. Do not worry. Be like the sun at midday.", description: "Thunder over Fire — fullness and abundance. A time of peak prosperity. Enjoy it but don't cling — all peaks pass.", descriptionEn: "Peak abundance. Enjoy prosperity but know all peaks eventually pass.", lines: [] },
  { id: 56, nameZh: "火山旅", nameEn: "The Wanderer", pinyin: "Huǒ Shān Lǚ", upperTrigram: "离", lowerTrigram: "艮", judgment: "小亨，旅贞吉。", judgmentEn: "Success in small matters. Perseverance in wandering brings good fortune.", description: "Fire over Mountain — the wanderer, the stranger. In unfamiliar territory, be adaptable and unassuming.", descriptionEn: "The wanderer in unfamiliar territory. Be adaptable, humble, and careful.", lines: [] },
  { id: 57, nameZh: "巽为风", nameEn: "The Gentle", pinyin: "Xùn Wéi Fēng", upperTrigram: "巽", lowerTrigram: "巽", judgment: "小亨，利有攸往，利见大人。", judgmentEn: "Success in small matters. It furthers one to undertake something and to see the great man.", description: "Wind doubled — gentle penetration. Influence through persistent, gentle effort rather than force.", descriptionEn: "Gentle, persistent influence. Wind penetrates where force cannot.", lines: [] },
  { id: 58, nameZh: "兑为泽", nameEn: "The Joyous", pinyin: "Duì Wéi Zé", upperTrigram: "兑", lowerTrigram: "兑", judgment: "亨，利贞。", judgmentEn: "Success. Perseverance furthers.", description: "Lake doubled — joy and communication. Open exchange brings happiness. Share joy freely.", descriptionEn: "Joy and open communication. Share happiness freely with others.", lines: [] },
  { id: 59, nameZh: "风水涣", nameEn: "Dispersion", pinyin: "Fēng Shuǐ Huàn", upperTrigram: "巽", lowerTrigram: "坎", judgment: "亨。王假有庙，利涉大川，利贞。", judgmentEn: "Success. The king approaches his temple. It furthers to cross the great water. Perseverance furthers.", description: "Wind over Water — dissolution and dispersal. What was frozen or stuck now melts and flows again.", descriptionEn: "Dissolution of rigidity. What was stuck now flows. Reunite what was scattered.", lines: [] },
  { id: 60, nameZh: "水泽节", nameEn: "Limitation", pinyin: "Shuǐ Zé Jié", upperTrigram: "坎", lowerTrigram: "兑", judgment: "亨。苦节不可贞。", judgmentEn: "Success. Galling limitation must not be persevered in.", description: "Water over Lake — limitation and measure. Healthy boundaries bring order. Excessive restriction breeds rebellion.", descriptionEn: "Healthy boundaries. Limitation brings order, but excessive restriction brings rebellion.", lines: [] },
  { id: 61, nameZh: "风泽中孚", nameEn: "Inner Truth", pinyin: "Fēng Zé Zhōng Fú", upperTrigram: "巽", lowerTrigram: "兑", judgment: "豚鱼吉，利涉大川，利贞。", judgmentEn: "Pigs and fishes. Good fortune. It furthers to cross the great water. Perseverance furthers.", description: "Wind over Lake — inner truth and sincerity. Genuine sincerity moves even the most insensitive.", descriptionEn: "Inner sincerity that moves all. Truth from the heart reaches far.", lines: [] },
  { id: 62, nameZh: "雷山小过", nameEn: "Small Excess", pinyin: "Léi Shān Xiǎo Guò", upperTrigram: "震", lowerTrigram: "艮", judgment: "亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上，宜下，大吉。", judgmentEn: "Success. Perseverance furthers. Small things may be done; great things should not. The flying bird leaves its message: it is not good to strive upward; it is good to remain below. Great good fortune.", description: "Thunder over Mountain — small excess in modest matters. Prefer humility and restraint over grand ambitions now.", descriptionEn: "Small excess in minor matters. Stay humble — this is not the time for grand ambitions.", lines: [] },
];

export const allHexagrams = [...hexagrams, ...midHexagrams].sort((a, b) => a.id - b.id);
