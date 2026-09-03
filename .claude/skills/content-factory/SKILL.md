---
name: content-factory
description: Chinese Culture Studio 程序化 SEO 内容工厂标准。固化语气、SEO 页面结构、多语言（en/ru/ja/ko）结构差异标准、数据真实性与 QA 清单。适用于：日期长尾页（13 事件×12 月×4 语言）、生肖×主题矩阵、节日页等批量内容产出的任何会话。使用时机：任何"新批量 SEO 页面 / 新语言批次 / 内容页复审"任务开始时必读。
---

# Content Factory — 程序化 SEO 内容标准

> 用途：让每一批程序化 SEO 内容产出都符合同一标准，避免逐次重新探索。
> 当前批次进度：日期长尾页 en 第一批（2027 全年 13×12=156 页）已上线（2026-09-03）；ru/ja/ko 批次与生肖×主题矩阵、节日页待做。

## 0. 产品与合规背景（不可违反）

- 目标读者：**国际用户**（英语为主 + 俄/日/韩侨民），不针对大陆买家。
- 服务：起名 / 择日 / 占卜（$5.99 起，一次性付费），免费工具与指南页做引流。
- **合规红线**：
  - 每页必须标注 "For entertainment purposes only"（或对应语言等价表达），放在页尾 disclaimer。
  - 医疗/丧葬/签约类内容绝不提供"建议"——只讲文化传统，明确"非医疗/法律/财务建议"。
  - AI 生成内容按平台要求打 AI 标签（社媒场景）。
  - 转化 CTA 一律指向 `/naming` `/calendar` `/divination` 等自有服务页。

## 1. 语气标准（所有语言通用）

- **第二人称 "you/your"**，像朋友说话，不用机构腔。
- **好奇心钩子优先**：先给"为什么这对你重要"，再给答案。❌ "We offer accurate predictions" → ✅ "The day you choose sets the tone for everything that follows."
- 短句为主（≤25 词），一段一个观点；主动语态。
- 尊重传统但不过度神秘化：讲"习俗/传统/信念"，不讲"我们保证"。
- 数字、日期、名称必须来自代码计算或权威数据——**绝不编造**。

## 2. SEO 页面结构标准（模板）

统一结构（顺序固定，H2/H3 层级）：

```
H1  = 页面核心关键词（见各语言标题标准）
subtitle（一句话价值主张）
Intro 2 段（文化背景 + 本页内容承诺）
[交互工具嵌入 GuideToolEmbed]（意图匹配优先）
[GuideCTA inline → 对应付费服务]
H2 核心内容（真实计算数据 / 列表卡片）
H2 Dates to Avoid（文化禁忌 + 当月真实节令）
[月份/主题导航链接块（prev/next + 兄弟页，内链闭环）]
[GuideFaq FAQ 2-3 条（含 FAQPage JSON-LD schema）]
[GuideCTA 底部 + sticky]
页尾 disclaimer（entertainment only）
```

- Meta：title ≤60 字符含主关键词 · desc 140-160 字符含动词 + 关键词 · og 同 title 简化版 · robots "index, follow" · alternates 必须包含**所有已存在语言版本**的 hreflang（en 无前缀，其他带 /ru /ja /ko）。
- 每页必须有 ≥5 条站内链接（兄弟页互链 + 上级 hub + 服务页）。
- URL：全小写、连字符、关键词前置（`/guide/auspicious-dates/wedding-january-2027`）。

## 3. 多语言结构差异标准（重要：禁止逐字翻译）

每种语言有独立的标题句式、标点、敬体、日期格式。**en 是内容源，其余语言必须按本语言习惯重写，不是翻译。**

### 🇺🇸 EN（native 水准，硬性要求）

- 母语者语感：用缩略式（you're, it's, don't）、自然习语（"lock it in", "a big moment", "left to chance"）、口语节奏。
- ❌ 中式英语特征清单（自查）：无端 "very/more and more"、直译中文四字结构（"smooth and successful" 堆砌）、"we hope you..." 代 "if you..."、无生命主语堆叠、被动滥用。
- 标题 Title Case；美式拼写（favorable, center）；日期 "January 9, 2027"。
- 数字场景：给读者"可行动"信息（"weekends book out 9–12 months ahead"）。

### 🇯🇵 JA

- 句尾统一：**页面正文用 です/ます体**；标题/卡片标签可用体言止め（名词结尾）。
- 标题句式 ≠ en 直译："Auspicious Wedding Dates in January 2027" → **「2027年1月の結婚吉日：中国暦で選ぶ縁起の良い日取り」**（名词短语 + 副题式冒号，不出现冗长动词句）。
- 标点：全角「、。」「」（），长音符号正确（コーヒー）；数字后接助数词（1日=ついたち 读音场景注意）。
- 日期格式：2027年1月9日；周几用（土）（日）。
- 价格：「$5.99から」「〜」；避免直译 "less than a coffee" 的文化错位——用「コーヒー1杯分ほどのお値段で」类表达或本地化换锚点。
- 敬称：不用「あなた」过度重复，主语句可省略。

### 🇰🇷 KO

- 句尾统一：**합니다체（正式）或 해요체（亲切）全页二选一**，不得混用。
- 标题句式：名词短语为主："Auspicious Wedding Dates in January 2027" → **「2027년 1월 결혼 길일: 중국 달력으로 고르는 최적의 날짜」**（不需要 "~입니다" 结尾）。
- 分写法（띄어쓰기）严格：조사（이/가/을/를/은/는）前不空格；数字+년/월 连写（2027년 1월）。
- 日期格式：2027년 1월 9일 (토)；价格「$5.99부터」。
- 语气：与英语同级亲切度，避免过度直译英文被动。

### 🇷🇺 RU

- 页面用 Вы（尊称）统一；动词变位正确。
- 标题句式：名词化开头（"Свадебные даты в январе 2027: лучшие дни по китайскому календарю"）。
- 月份小写（января 属格）；日期 "9 января 2027"；「」引号。
- 价格「от $5.99」。

### 多语言批次铁律

1. 每语言一批，**en 先行验证**（收录/排名/CTR 数据）后再做下一语言；不得四语言同批裸奔。
2. 新语言批次 = 重写内容 + 独立 alternates + 独立 sitemap 注册 + 该语言 hub 页加链。
3. 检查已有 messages/*.json 中可复用键，避免重复造轮子；**顺带扫陈旧价格/文案**（历史上 $1→$5.99 迁移遗留过 8 处）。

## 4. 数据真实性标准

- 日期/卦象/五行/生肖数据一律调用 `src/lib/` 现有引擎（`calendar.ts` `divination.ts` `bazi.ts` 等），**禁止手写"看起来像"的吉日**。
- 节令日期（清明/春节/鬼月）用 `solarToLunar` 计算范围，写进文案时给出真实日期。
- 文化禁忌内容来源：《协纪辩方书》等通书常识 + 项目内 `EVENT_DATA`，不编造出处。

## 5. QA 清单（每批交付前逐项过）

- [ ] 每页 title/desc 唯一（模板必须带事件名+月份，防止 duplicate meta）
- [ ] 每页真实数据可见（日期、评分、农历）且与 `/calendar` 服务结果口径一致
- [ ] 内链 ≥5；无死链（`dynamicParams=false` 时非生成页必须 404 且 sitemap 不含）
- [ ] alternates/hreflang 只含已上线语言
- [ ] disclaimer 在页尾
- [ ] `next build` 通过且生成页数 = 预期页数
- [ ] sitemap.ts 与 sitemap-ping.ts 的 IndexNow 列表同步注册新页
- [ ] 生产验证：Render deploy live + 抽样 curl 200 + 新键/新文案出现在 chunk
- [ ] 埋点：新页 PV 由 AnalyticsTracker 自动覆盖；CTA/工具事件用既有 trackClick 事件名
