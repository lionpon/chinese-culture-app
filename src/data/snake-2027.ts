// Year of the Fire Snake 2027 (Ding-Si)
// 12 zodiac animal predictions for SEO content pages
// 4 language support: en, ru, ja, ko

export interface ZodiacPrediction {
  animal: string; animalZh: string; ranking: number;
  career: string; love: string; health: string; wealth: string;
  luckyColor: string; luckyNumber: string; compatible: string; avoid: string;
  summary: string;
}

type L = Record<"en" | "ru" | "ja" | "ko", string>;

export const snakeYear = {
  yearTitle: { en: "Year of the Snake 2027", ru: "2027 — Год Змеи", ja: "2027年 巳年", ko: "2027년 뱀의 해" } as L,
  yearSubtitle: { en: "Fire Snake · Complete Zodiac Guide", ru: "Огненная Змея · Полный гид", ja: "火の巳 · 十二支ガイド", ko: "불의 뱀 · 12간지 가이드" } as L,
  element: { en: "Fire Snake (Ding-Si)", ru: "Огненная Змея (Дин-Сы)", ja: "火の巳 (丁巳)", ko: "불의 뱀 (정사)" } as L,
  overview: {
    en: "2027 is the Year of the Fire Snake, combining the Snake's wisdom with Fire's passion and transformation. The sixth animal in the Chinese zodiac, the Snake represents intelligence, grace, and mystery. Fire adds ambition, creativity, and decisive energy. This year favors strategic thinking, deep research, and meaningful relationships. An excellent year for artists, scholars, and entrepreneurs.",
    ru: "2027 — год Огненной Змеи, сочетающий мудрость Змеи со страстью Огня. Шестой знак китайского зодиака символизирует интеллект, грацию и тайну. Огонь добавляет амбиции и творчество. Год стратегического мышления и значимых отношений.",
    ja: "2027年は火の巳年。巳の知恵と直感に火の情熱と変革が加わります。十二支6番目の巳は知性と優雅さを象徴。火は野心と創造性を加えます。戦略的思考と深い人間関係が重視される年です。",
    ko: "2027년은 불의 뱀의 해로, 뱀의 지혜와 직관에 불의 열정이 더해집니다. 12간지 여섯 번째 뱀은 지성과 우아함을 상징합니다. 불은 야망과 창의성을 더합니다. 전략적 사고와 깊은 관계가 중요시됩니다.",
  } as L,
  seoDescription: {
    en: "Complete 2027 Year of the Fire Snake guide: 12 zodiac predictions, lucky colors, Feng Shui tips, and your personalized Chinese name for the Snake year.",
    ru: "Полный гид 2027 года Огненной Змеи: 12 прогнозов, счастливые цвета и китайское имя на год Змеи.",
    ja: "2027年火の巳年完全ガイド：十二支別運勢、ラッキーカラー、あなたの巳年中国名。",
    ko: "2027년 불의 뱀의 해 완벽 가이드: 12간지 운세, 행운 색상, 당신의 뱀띠 중국식 이름.",
  } as L,
};

export const zodiacPredictions: Record<string, ZodiacPrediction> = {
  rat: { animal:"Rat",animalZh:"鼠",ranking:3, career:"Your resourcefulness aligns with the Snake's strategy. Recognition in Q2. Best months: March, August, November.", love:"Romance flourishes. Singles find connections through work. Couples deepen bonds.", health:"Good. Watch digestion. Walks and hydration help.", wealth:"Steady. Avoid speculation. Snake favors calculated moves.", luckyColor:"Sky Blue, Silver",luckyNumber:"2, 3",compatible:"Ox, Dragon, Monkey",avoid:"Horse", summary:"A harmonious year where cleverness meets wisdom. Trust your instincts." },
  ox: { animal:"Ox",animalZh:"牛",ranking:2, career:"One of your best years! Diligence rewarded with breakthroughs. Promotion around May.", love:"Warm and stable. Singles attract partners who value reliability. Autumn is romantic.", health:"Excellent vitality. Try a new sport. Watch joints.", wealth:"Strong for savings and property. Family-related windfall possible.", luckyColor:"Emerald Green, Gold",luckyNumber:"5, 8",compatible:"Rat, Snake, Rooster",avoid:"Goat, Horse", summary:"The Snake rewards your patience and hard work. Step into the spotlight." },
  tiger: { animal:"Tiger",animalZh:"虎",ranking:7, career:"A year of adjustment. Slow down and strategize. Mid-year brings allies.", love:"Mixed signals. Listen more, speak less. September clarifies.", health:"Manage stress. Fire clash creates nervous energy. Meditation helps.", wealth:"Moderate. Control spending. Creative side venture promising.", luckyColor:"Deep Purple, White",luckyNumber:"1, 6",compatible:"Horse, Dog, Pig",avoid:"Monkey", summary:"Patience is your superpower. Stillness is more powerful than force." },
  rabbit: { animal:"Rabbit",animalZh:"兔",ranking:5, career:"Creative breakthroughs. Artistic side flourishes. Team projects succeed with diplomacy.", love:"Romantic year. Charm amplified. Single Rabbits meet through cultural events.", health:"Good. Guard against anxiety. Prioritize sleep and creativity.", wealth:"Steady with creative bonuses. Freelance or art brings extra income.", luckyColor:"Pink, Lavender",luckyNumber:"4, 9",compatible:"Sheep, Dog, Pig",avoid:"Rooster", summary:"Let creativity lead. The Snake amplifies your artistic gifts." },
  dragon: { animal:"Dragon",animalZh:"龙",ranking:1, career:"The #1 sign for 2027! Dragon-Snake alliance. Leadership and recognition. June & December peak.", love:"Magnetic energy. Admirers attracted. Proposal possible around October.", health:"Robust. Channel Fire into sports. Stay hydrated.", wealth:"Excellent. Multiple income streams. Bold ideas attract funding.", luckyColor:"Crimson Red, Gold",luckyNumber:"6, 9",compatible:"Rat, Monkey, Rooster",avoid:"Dog", summary:"Your year to shine! The most dynamic combination. Dream big." },
  snake: { animal:"Snake",animalZh:"蛇",ranking:4, career:"Your Ben Ming Nian! Self-reflection brings clarity. Wisdom gained shapes the next 12-year cycle.", love:"Deep connections. Superficial relationships fall away. Soulmate possible. Authenticity is magnetic.", health:"Protect your energy. Wear red accessories. Prioritize rest.", wealth:"Stable. A planning year. Build foundations. Save, don't speculate.", luckyColor:"Red, Black, Gold",luckyNumber:"2, 7",compatible:"Ox, Rooster",avoid:"Tiger, Pig", summary:"A sacred pause. Reflect, realign, emerge transformed." },
  horse: { animal:"Horse",animalZh:"马",ranking:9, career:"Challenging dynamics. Horse-Snake opposites. Avoid office politics. Focus on independent projects.", love:"Turbulence possible. Clear boundaries essential. November resolves.", health:"Watch heart. Fire clash stresses cardiovascular system. Cardio helps moderately.", wealth:"Cautious spending. Unexpected expenses. Build emergency fund.", luckyColor:"Orange, Brown",luckyNumber:"3, 7",compatible:"Tiger, Sheep, Dog",avoid:"Rat, Ox", summary:"Learning through contrast. Develop patience and strategic depth." },
  goat: { animal:"Goat",animalZh:"羊",ranking:6, career:"Quiet progress. Gentle persistence wins allies. Creative professions thrive.", love:"Tender and nurturing. You are the emotional anchor. Romance in serene settings.", health:"Good. Protect emotional wellbeing. Tai chi or swimming ideal.", wealth:"Moderate. Artistic talents generate side income. Spend on experiences.", luckyColor:"Sage Green, Cream",luckyNumber:"5, 10",compatible:"Rabbit, Horse, Pig",avoid:"Ox, Dog", summary:"The Snake supports your creative soul. Slow progress brings lasting rewards." },
  monkey: { animal:"Monkey",animalZh:"猴",ranking:8, career:"Clever solutions from chaos. Wit is your asset. Innovation rewarded but avoid shortcuts.", love:"Playful energy. Snake year favors depth over breadth. Quality over quantity.", health:"Restless mind needs calming. Try mindfulness. Watch sleep.", wealth:"Smart gains. Quick thinking brings wins. Snake warns against greed.", luckyColor:"Turquoise, Silver",luckyNumber:"4, 9",compatible:"Rat, Dragon, Snake",avoid:"Tiger, Pig", summary:"Cleverness is a gift. The Snake respects intelligent strategy." },
  rooster: { animal:"Rooster",animalZh:"鸡",ranking:10, career:"A testing year. Metal-root friction. Document everything. Rise above pettiness.", love:"Honest conversations heal wounds. Frankness builds stronger bonds.", health:"Guard respiratory system. Metal clash affects lungs. Nature time helps.", wealth:"Tighten budget. Conservation year. Audit expenses for hidden savings.", luckyColor:"Golden Yellow, Brown",luckyNumber:"5, 8",compatible:"Ox, Snake, Dragon",avoid:"Rabbit, Dog", summary:"The Snake tests your integrity. Challenge is temporary, growth permanent." },
  dog: { animal:"Dog",animalZh:"狗",ranking:11, career:"Loyalty tested. Dynamics feel unfair. Your steadfast nature is your shield. Late year vindication.", love:"Deep bonds through difficulty. Relationships tested emerge stronger or reveal truth.", health:"Stress manifests physically. Guard stomach. Set emotional boundaries.", wealth:"Slow and steady. Avoid risk. Consistent saving beats speculation.", luckyColor:"Navy Blue, Forest Green",luckyNumber:"3, 7",compatible:"Tiger, Rabbit, Horse",avoid:"Dragon, Goat", summary:"The Snake challenges your justice. Truth prevails before year end." },
  pig: { animal:"Pig",animalZh:"猪",ranking:12, career:"Most challenging sign. Water-Fire clash. Step back from conflicts. Focus on skill-building.", love:"Misunderstandings test patience. Give partner space. Self-reflection first.", health:"Prioritize self-care. Clash drains vitality. Gentle exercise and rest essential.", wealth:"Guard resources. Not a year for risk. Build security through frugality.", luckyColor:"Ocean Blue, Pearl White",luckyNumber:"2, 6",compatible:"Rabbit, Sheep, Tiger",avoid:"Snake, Monkey", summary:"A humbling year but purposeful. The Snake teaches resilience." },
};

export const zodiacAnimals = [
  { key:"rat",order:1,nameEn:"Rat",nameZh:"鼠" },{ key:"ox",order:2,nameEn:"Ox",nameZh:"牛" },
  { key:"tiger",order:3,nameEn:"Tiger",nameZh:"虎" },{ key:"rabbit",order:4,nameEn:"Rabbit",nameZh:"兔" },
  { key:"dragon",order:5,nameEn:"Dragon",nameZh:"龙" },{ key:"snake",order:6,nameEn:"Snake",nameZh:"蛇" },
  { key:"horse",order:7,nameEn:"Horse",nameZh:"马" },{ key:"goat",order:8,nameEn:"Goat",nameZh:"羊" },
  { key:"monkey",order:9,nameEn:"Monkey",nameZh:"猴" },{ key:"rooster",order:10,nameEn:"Rooster",nameZh:"鸡" },
  { key:"dog",order:11,nameEn:"Dog",nameZh:"狗" },{ key:"pig",order:12,nameEn:"Pig",nameZh:"猪" },
] as const;
