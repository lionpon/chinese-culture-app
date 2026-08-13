# Chinese Culture Studio

> https://www.culture-of-china.com | `D:\chinese culture\project2\`

## 产品

定价 `$1.00/次`，无订阅。目标市场：国际用户（英语为主），多语言 en/ru/ja/ko。

### 3 个付费服务
| 服务 | 路由 | 说明 |
|---|---|---|
| Create a Chinese Name | `/naming` | 八字五行、易经起中文名 |
| Auspicious Date Selection | `/calendar` | 黄历择吉日（婚嫁开业出行等13种） |
| I Ching Divination | `/divination` | 易经占卜（时间/随机/手动起卦） |

### 免费内容
`/palm-reading` `/dream-interpretation` `/daily` `/guide/*` `/tools/*` `/world-cup` `/snake-2027` `/tools/dream-ai`

## 技术栈

Next.js 14 · TypeScript · Prisma · Supabase PostgreSQL · Tailwind CSS · next-intl · PayPal Standard Checkout · OpenRouter AI · Resend

## 基础设施

| 项 | 值 |
|---|---|
| 仓库 | `git@github.com:lionpon/chinese-culture-app.git` (master) |
| 托管 | Render (oregon, free tier) |
| 数据库 | Supabase PostgreSQL (vnktcrolpcyktduldpfm) — migrated from Neon 2026-07-20 |
| 支付 | PayPal Standard Checkout (`22728717@qq.com`) |
| 保活 | cron-job.org 每10分钟 |

## 目录结构

```
src/
├── app/
│   ├── [locale]/          # 页面路由 (layout.tsx, page.tsx)
│   │   ├── naming/        # 起名
│   │   ├── calendar/      # 择日
│   │   ├── divination/    # 占卜
│   │   ├── palm-reading/  # 手相
│   │   ├── dream-interpretation/
│   │   ├── daily/         # 每日易经
│   │   ├── guide/         # 指南(14个子页面)
│   │   ├── tools/         # 工具
│   │   ├── world-cup/     # 世界杯
│   │   ├── snake-2027/    # 🐍 蛇年运势 (13页: 总览+12生肖)
│   │   ├── admin/         # 管理后台
│   │   ├── success/       # 支付成功
│   │   ├── about/privacy/terms/
│   │   └── daily/[date]/  # 每日详情
│   └── api/
│       ├── checkout/      # 支付结账
│       ├── unlock/        # 解锁结果
│       ├── webhook/paypal/# PayPal IPN
│       ├── pdt/           # PayPal PDT验证
│       ├── result/        # 获取结果
│       ├── report/        # 日报
│       ├── cron/          # 定时任务
│       ├── stats/         # 统计
│       ├── track/         # 埋点
│       ├── contact/       # 联系表单
│       ├── subscribe/     # 邮件订阅
│       ├── rss/           # RSS
│       ├── og/            # OG图片
│       ├── health/        # 健康检查
│       ├── palm-upload/   # 手相图片上传
│       ├── daily/         # 每日数据
│       ├── daily-social/  # 社交分享
│       ├── telegram-post/ # TG自动发布
│       └── twitter-post/  # Twitter自动发布
├── components/ (27个组件)
├── lib/ (26个工具模块)
├── data/ messages/
└── types/
```

### 关键组件
`PaywallOverlay` `NamingResultView` `CalendarResultView` `DivinationResultView` `PalmReadingResultView` `DreamInterpretationResultView` `WorldCupCTA` `GuideCTA` `SnakeYearCard` `ZodiacDetailCard` `FreeTierBadge` `AnalyticsTracker` `CookieConsent` `EmailCaptureForm` `LanguageSwitcher` `ShareButton`

### 关键 lib
`paypal.ts` `bazi.ts` `calendar.ts` `divination.ts` `naming.ts` `palm-reading.ts` `dream-interpretation.ts` `db.ts` `report.ts` `track.ts` `useCheckout.ts` `result-store.tsx` `free-tier.ts` `bot-filter.ts` `email.ts` `telegram.ts`

## 数据库 (Prisma)

4 表：`Purchase` `Visit` `DailyReport` `Subscriber`

## 环境变量

`DATABASE_URL` `ADMIN_TOKEN` `NEXT_PUBLIC_APP_URL` `PAYPAL_EMAIL` `PAYPAL_SANDBOX` `PAYPAL_PDT_TOKEN` `OPENROUTER_API_KEY`

## 支付流程

三层闭环：PDT (return) + 主动生成 (auto-create) + IPN (webhook)
PayPal Standard Checkout，支持信用卡支付。

## 开发工具

### 🧪 测试模式（跳过数据埋点）
在任意 URL 后加 `?test=1` 即可进入测试模式，当前浏览器 1 年内所有访问不写入 Visit 表、不影响日报统计。
- **开启**：访问任何页面 `?test=1`（cookie 自动设置，参数自动移除）
- **关闭**：访问任何页面 `?test=0`
- **实现**：middleware 设置 `cc_test_mode` cookie → AnalyticsTracker 客户端跳过 → `/api/track` 服务端跳过
- 部署前务必确认已关闭测试模式（或关闭不影响，只是你自己的访问不被统计）

## 近期状态 (2026-08-13)

- **线上版本**：`ca9d417` Live on Render + Cloudflare
- **域名**：`www.culture-of-china.com` 正常运行 ✅
- **数据库**：Supabase (`vnktcrolpcyktduldpfm`) ✅
- **GitHub**：`git@github.com:lionpon/chinese-culture-app.git` (SSH deploy key)
- **最新 commit**：`ca9d417` 付款闭环修复 + datecheck 限流

### 8月13日：付款闭环修复（P0）+ datecheck 次数限制

#### 📊 8/9 逾期复核结论（数据直查）
| 项 | 结果 |
|---|---|
| RU 爬虫限流 | ✅ 8/8 起稳定 3-5条/天（配额 5/day 生效），无需再降 |
| 新埋点 | `guide_tool_datecheck` 46次爆火（auspicious-dates 页）；`dream_search`/`elements` 零数据 |
| 付费页访问 | 17次/7天（vs 整改前 10次/5天），提升 ~20% |
| 付费转化 | **0 笔真实付费**。ZA 用户走完起名漏斗+免费试用未付费；AU 用户点了 paywall unlock 后 9 秒从 PayPal 放弃 |
| 关键洞察 | AU 用户连查 31 个吉日却没点 CTA → 免费工具答案太完整，反噬转化 |

#### 🔴 修复1：PDT 快速确认通道从未工作（致命）
- **Bug**：`rm=2` 使 PayPal 将 `tx` POST 到回调 URL 的**请求体**，但 success 页是客户端组件只读 URL 查询串 → `tx` 永远为 null → PDT 从不触发
- **修复**：新增 `src/app/api/paypal/return/route.ts` — 接收 PayPal POST（tx/custom/cm），303 重定向到 `/success?purchase_id=X&tx=Y`，既有 /api/pdt 流程立即生效
- `paypal.ts` return URL 改为 `/api/paypal/return?purchase_id=X`（保留 rm=2）
- 三层保障：POST/GET 回退 + 无 tx 时降级轮询 → IPN 兜底

#### 🔴 修复2：删除支付绕过漏洞
- **Bug**：`/api/result` 对 <10 分钟的 pending 订单**未经支付验证**自动生成结果并标记 `paid=true` → 任何人可 POST /api/checkout 后直接 GET 结果白嫖
- **修复**：彻底移除 auto-create。现在只有 PDT（`/api/pdt`）和 IPN（`/api/webhook/paypal`）两个 PayPal 已验证通道能标记 paid
- success 页付费轮询 90→150 次（5 分钟），给 IPN 留足时间

#### 🎯 修复3：datecheck 工具 3 次/天限制
- localStorage 计数（每日重置），3 次免费后用升级卡片替换工具：「查完整 13 类吉日 + 时辰 → /calendar」
- 新埋点：`guide_tool_datecheck_limit`（触发限制）、`guide_tool_datecheck_cta`（升级点击）
- 目标：把 46 次高热度查询转化为付费动机

#### ✅ 已验证（本地 dev + 生产双环境）
- checkout URL：return 指向 `/api/paypal/return?purchase_id=X` ✅
- POST 回调 → 303 → `/success?purchase_id=X&tx=Y` ✅
- pending 单调 /api/result 返回 pending（不自动完成）✅
- 假 tx 打 /api/pdt 被拒 ✅
- unlock 免费单 → 生成新 pending + PayPal URL ✅
- `.env.local` PDT token 已与生产同步（jvQnzkct...）

#### 🔧 追加修复：闭环弹性 — AI 降级链 + 已验证订单自愈（commit `c3ce440`）

**代测中发现真实 bug**：付费 dream-interpretation 在本机触发 `403 gpt-4o-mini region blocked` → `/api/pdt` 500 → **用户已付钱拿不到结果**；IPN 路径甚至把订单标 failed。生产（Render 美国）虽无地域问题，但 AI 限流/宕机同样会触发。

修复（4 处）：
1. **`src/lib/ai.ts`**（新）：模型降级链 `gpt-4o-mini → qwen-2.5-72b → deepseek-chat`（视觉：`qwen2.5-vl → gpt-4o-mini → gemini-2.0-flash`）。qwen/deepseek 国内可直连 → 本地开发不再需要代理
2. **`/api/pdt`**：支付已验证但生成失败 → 标 `paid=true, status=pending`（不再 500），客户端继续轮询
3. **`/api/webhook/paypal`**：生成失败 → `paid=true, pending`（**绝不标 failed**），PayPal 会重发 IPN 形成天然重试
4. **`/api/result`**：`paid=true && pending` → 自动重试生成（60s 节流）。安全性：只有 PayPal 验证过的订单才可能 paid=true

**测试桩**：`paypal.ts` 内 `TEST_VERIFY_PAYPAL`（需同时 `PAYPAL_SANDBOX=true` 才生效，生产永远不触发）— 用于本地模拟 PayPal 全流程。

**闭环四场景全过**（模拟 PayPal 角色 curl 全链路）：
| 场景 | 路径 | 结果 |
|------|------|------|
| A | checkout → rm=2 POST 回调 → PDT 验证 → 完整结果 | ✅ paid=true |
| B | checkout → IPN 推送 → 完整结果 | ✅ paid=true |
| C | 免费试用 → unlock → 付费 → PDT（AI 降级链 403→qwen 成功）| ✅ 免费单 paid=false / 付费单 paid=true |
| D | 构造 paid=true+pending → 轮询自愈生成 | ✅ completed |

#### ⏳ 待办：真实支付最终验证（需本人操作，见下）
- 大陆 PayPal 账户间不能互付 + 不能自付 → 用 **PayPal Sandbox** 或找海外朋友代付
- 沙盒测试路径：开发者后台确认沙盒买家账户 → 本地 `PAYPAL_SANDBOX=true` + cpolar 隧道 → 浏览器沙盒支付 $1
- 或海外朋友真实支付 $1 → 查 DB `paid=true` → 商户后台退款
- 生产已部署 `c3ce440`，代码层闭环已全部验证，只差 PayPal 平台的实弹确认

### ⏳ 8月9日复核清单（2天后）

1. **RU 爬虫限流验证**：直查 Visit 表，对比 RU 日写入量
   - 旧基线：~9条/天 → 新预期：≤5条/天（配额已从 10→5）
   - 若仍 >5条/天 → 降配额至 3/day
2. **新埋点验证**：检查以下事件是否有数据
   - `guide_tool_dream_search`（dream-meaning 页搜索）
   - `guide_tool_zodiac`（zodiac calculator 在各 guide 页）
   - `guide_tool_elements`（elements quiz 在 face-reading 页）
3. **转化漏斗复核**：
   - 付费服务页访问量是否突破 5天10次
   - CTA 点击率是否从 ~8% 提升
   - 免费试用/付费是否破零
4. **若微工具有效**：扩展到其余 guide 页面（iching、feng-shui、five-elements、lucky-numbers 等）

### 8月7日：P0 转化修复

#### 🛡️ RU 爬虫配额 10→5（`bot-filter.ts`）
- 5天流量分析（8/3-8/7）显示 RU 每天稳定 9 次写入，爬虫仍持续
- `COUNTRY_DAILY_MAX`: 10 → 5

#### 🎯 4个高流量 SEO 页面嵌入交互微工具
| 页面 | 真实流量 (5天) | 新增工具 | 转化路径 |
|------|:------:|----------|----------|
| `/guide/dream-meaning` | 14 | 🔍 Dream Search（关键词→即时解梦预览） | → `/dream-interpretation` |
| `/guide/chinese-new-year-2027` | 13 | 🐉 Zodiac Calculator（出生年→生肖五行） | → `/divination` |
| `/guide/face-reading` | 13 | 🔥 Five Elements Quiz（2题自测→五行） | → `/palm-reading` |
| `/guide/chinese-name-boy` | 7 | 🐉 Zodiac Calculator | → `/naming` |

策略：被动 SEO 浏览者 → 主动工具使用者 → "下一步是什么？"好奇心 → 点击付费 CTA

---

### 8月4日：流量复核 + 爬虫限流强化

#### 📊 8/2-8/4 三天流量复核（数据库直查）
| 指标 | 8/2 | 8/3 | 8/4 | 合计 |
|------|-----|-----|-----|------|
| 总访问 | 79 | 57 | 16 | **157** |
| 真实用户 | 33 | 35 | 4 | 77 (49%) |
| 爬虫/DC | 46 | 22 | 12 | 80 (51%) |
| 埋点事件 | 1 | 4 | 0 | **5** |
| 付费订单 | 0 | 0 | 0 | **0** |
| 免费试用 | 0 | 0 | 0 | **0** |
| 新订阅 | 0 | 1 | 0 | **1** |

- 8/4 为部分天数据（截至北京时间15:00）
- 俄罗斯爬虫仍占爬虫流量的 95%（76/80），慢速低频（~2次/小时），未被旧版 30/min 阈值拦截
- 美国用户占 42.9%（33/77），日语 10.4%（8/77），多语言 SEO 初显成效
- CN 8 次访问中 7 次来自杭州（开发者测试），实际境外真实用户约 69 人

#### 🛡️ 爬虫限流三层强化（bot-filter.ts）
- 旧版：仅分钟级 30/min 阈值 → 对慢速爬虫无效
- 新版三层：
  1. **分钟级**：5/min 爆冲检测（与 IP 限流一致）
  2. **小时级**：10/hr 累计配额（捕获中速爬虫）
  3. **日级**：10/day 累计配额（捕获慢速爬虫 ← 俄罗斯问题）
- 逻辑：RU/UA 每天写入 10 条后，此后 24 小时内所有写入直接跳过
- Render 冷启动限制：内存 Map 在实例休眠后清空，首次启动后 10 条内不限流

#### 📊 之前 48h 流量分析（8/2-8/3）
- 8/2-8/3：143次访问 → 真实用户仅~51人，57次为数据中心爬虫
- 美国用户占84% · 日/韩SEO页面开始有自然流量
- **致命问题**：所有流量停留在免费SEO内容页，付费服务页零访问
- 48h内仅4个埋点事件 · 0次表单提交 · 0笔付费 · 0次免费试用

#### 🔧 优化1：爬虫过滤增强（`bot-filter.ts` + `track/route.ts`）
- 新增 Hetzner/OVH/俄罗斯Selectel/乌克兰 数据中心IP段
- 新增13个DC城市（圣彼得堡、法兰克福、都柏林、硅谷等）
- 国家级限流：RU/UA >30次/分钟自动拒绝写入
- 三级过滤：IP限流 → 国家级限流 → DC标记

#### 🔗 优化2：SEO页面转化CTA
- **蛇年生肖详情页**（12页）：运势网格后插入上下文CTA → `/naming`
  - 埋点事件：`snake_mid_cta_naming`
- **起名指南页** (`chinese-name-boy`)：名字表格后插入内联CTA
- **解梦指南页** (`dream-meaning`)：CTA前置引导文案

#### 💬 优化3：付费墙文案重写（4 locales）
- 标题 "Continue Your Reading" → **"Your Answer Is Just the Beginning"**
- 所有解锁项从"功能列表"改为"好奇心缺口"叙事
- CTA按钮 → **"See My Full Reading"**

#### 📝 优化4：内容拦截策略评估（已记录，待后续实施）
- 策略："给钩子，不给鱼" — 免费层制造好奇心缺口，付费层给完整答案+故事
- 下一步需实施的具体改动见下方 TODO

---

### ⏳ 8月5日待办（明天复核）

1. **RU 爬虫限流验证**：直查 Visit 表，对比 8/4 vs 8/5 的 RU 写入量
   - 旧基线：~25条/天 → 新预期：≤10条/天（日配额截断）
   - 若仍 >15条/天 → 降低日配额至 5/day 或 3/day
2. **埋点验证**：检查 `snake_mid_cta_naming` 和 `seo_cta_*` 事件是否有数据，评估新CTA的点击率
3. **CTA扩展**：如果中段CTA有效，扩展到 `chinese-name-girl`、`chinese-new-year-2027`、`wedding-dates-2026` 等SEO页面
4. **内容拦截进阶**：选择起名服务（流量最大的付费页）做激进测试 —
   - 免费层：只给第1个名字的**汉字** + 一句五行钩子（隐藏拼音/含义/叙事）
   - 观察免费→付费转化率变化

---

### 7月31日：首页 500 修复 + 用户评价区改版

#### 🐛 首页 500 错误修复
- **症状**：`www.culture-of-china.com` 首页返回 HTTP 500，其他页面正常
- **根因**：`TestimonialSection` 通过 `t("testimonials.items")` 从 next-intl 获取数组数据，SSR 阶段序列化客户端组件 props 时崩溃
- **修复**：extract testimonials 数据到 `src/data/testimonials.ts` 静态文件，组件直接 import，仅 heading 保留 `t()` 翻译
- **Commit**：`2f6ef2c`

#### 🔄 用户评价区 ("What people are saying") 改版
- **之前**：水平滚动容器（`overflow-x-auto` + snap），用户以为是轮播但实际是手动滑动，体验困惑
- **现在**：静态 CSS Grid 2 列布局（手机 1 列 / 桌面 2 列），全部内容一览无余
- 前 2 张卡片顶部金色边框强调 · 左上角大号引号装饰 · hover 微动效
- 移除 "← swipe for more →" 提示和 scroll 埋点，仅保留 impression 埋点
- **Commit**：`09591cb`

### 7月26日：整改后流量复核 + 测试过滤系统

#### 📊 大整改后 24h 流量复核
- 7/25 显示 178 次访问，但其中 150 次为开发者自身测试流量（VPN HK 99 + 本地杭州 51）
- 真实外部用户仅 **~28 人**（PH 热度自然衰减：7/23→75 → 7/24→61 → 7/25→28）
- 28 人全部访问免费内容/SEO 页面，无人进入付费服务页 → **整改效果尚无法评估**
- 定价变化（$1→$5.99）、钩子文案、信任信号等改动尚未被真实用户"触碰"

#### 🧪 测试模式过滤系统
- **开启**：访问 `?test=1` → cookie 自动设置，1 年内所有访问不写入 Visit 表
- **关闭**：访问 `?test=0`
- **三层防护**：
  1. Middleware：拦截 `?test=1`/`?test=0`，设置/清除 `cc_test_mode` cookie
  2. AnalyticsTracker：客户端读 cookie，直接 return 不发请求
  3. `/api/track`：服务端读 cookie，跳过 DB insert
- **Commit**：`0968ef5`

### 7月25日晚：Bug 修复汇总

#### 🔧 FreeTierBadge 布局闪烁修复
- **Bug**：FreeTierBadge 用 `useState(0)` + `useEffect(localStorage)` 导致 badge 初始隐藏，~1s 后突然出现 → 表单内容下跳 60px（CLS）
- **根因**：badge 忽略了服务端 cookie (`cc_free_used`) 已读取的 `initialHasFree`
- **修复**：新增 `initialRemaining` prop，用服务端 cookie 值初始化，useEffect 仅做跨标签页同步
- **影响**：naming / calendar / divination 三个表单页不再闪烁 ✅
- **Commit**：`ebcf76a`

#### 🔗 Product Hunt 横幅链接 404 修复
- **Bug**：首页 PH 横幅链接 `/posts/chinese-culture-studio` → 404
- **修复**：改为 `/products/chinese-culture-studio?launch=chinese-culture-studio-2`
- **Commit**：`5329dbb`

#### ✅ 钩子整改复核
- 确认 commit `13d1480` + `0fdfee2` 已上线，4 locales × 55 处文案全部生效

### 7月25日：全站大整改——定价、叙事、多语言、支付信任

#### 🔴 P0：起名 AI narrative（核心功能改动）
- `naming.ts` 接入 OpenRouter gpt-4o-mini，付费用户自动生成个性化叙事
- 以 "you/your" 人称写 3-5 句，将 Bazi + 名字含义编织成故事
- `NamingResultView` 顶部金色卡片展示 narrative
- `generateNames()` 改为 async，所有 API 路由 await

#### 🔴 P0：定价重构
- 默认价格 `$1` → `$5.99`，预设 `[$5.99, $9.99, $14.99, $19.99]`
- 自定义入口缩小（需点击 "Custom" 才出现输入框）
- `AmountPicker` 新增 `amount_changed_{amt}` + `amount_custom_mode` 埋点
- 5 个服务页面 + SubmitButton + checkout API fallback 全部更新

#### 🟡 P1：全站文案去 "Support" 化
- `en.json` 30+ 处：submit、amount、pricing、success、payment、guide CTA
- PayPal 商品名（`paypal.ts` PRODUCT_NAMES）去 "Support"，补 dream-interpretation
- Terms §3 重写：从 "赞助/捐赠" 改为购买服务语言 + 退款政策
- Footer paymentNote、freeText、heroPricing 全部更新

#### 🟡 P1：解梦/手相结果叙事连贯化
- `DreamInterpretationResultView`：symbols/latentMeaning/wishFulfillment → 合成 "What Your Dream Is Telling You" 叙事 + 折叠详情
- `PalmReadingResultView`：同样 narrative-first 结构
- 付费用户先看到完整叙事，细节可展开

#### 🟢 P2：PDF 下载
- 新增 `DownloadPDF` 组件（jsPDF + html2canvas）
- 5 个 ResultView 全部接入，仅付费用户可见
- 埋点 `pdf_download`

#### 🟢 P2：免费试用 1 次
- 代码 `MAX_FREE=1`，前端 localStorage + 服务端 cookie + SHA-256 指纹三重校验
- 四语言 freeTier 文案统一为温暖风格

#### 🌐 四语言同步
- ru/ja/ko 三个 locale 文件全面同步：定价、去 Support、免费次数、paywall 叙事
- 10 个 guide 页面硬编码价格 `$1`→`$5.99`，FAQ "赞助"→"购买"
- `PaymentTrustBadges` 国际化（trustBadges key × 4 locale）
- submit.paidNote/cardNote 增强：安全 + 即时 + 免注册 × 4 语言

#### 🤖 多语言 AI 结果（双层保障）
- 第一层：dream/palm/naming AI prompt 注入语言指令 → 直接用 ru/ja/ko 生成
- 第二层：`translate.ts` 翻译兜底（calendar/divination/wuxing 算法内容）
- `looksLikeEnglish()` 检测跳过已本地化字段，防止重复翻译
- `useCheckout` 自动从 URL 读 locale，全程透传

#### 🔐 支付信任全链路
- PayPal 商品名去 Support（paypal.ts）
- PDT 金额比对 `mc_gross` vs `input.amount`，差异告警
- `PaymentTrustBadges` 三行信任：SSL · Instant · Refund
- SubmitButton 增加 "or unlock everything" 分隔引导
- 5 个表单页 pricing 横幅新增 `pricing.secure` 信任行

#### 📊 埋点全量覆盖
- 34 个事件覆盖所有交互点（locale-agnostic，自动带路径前缀）
- 新增：amount_changed、amount_custom_mode、pdf_download、form_submit_dream_paid

#### 🔒 合规更新
- Terms §3：定价说明 + 购买性质 + 退款政策
- Privacy：Neon → Supabase（5 处），contribution → purchase
- 日期统一更新为 25 July 2026

#### 📦 本次推送 commits
```
0fa1be7 fix: double-cast NamingInput to access locale field
f189813 fix: ru/ja/ko — payment trust, guide prices, compliance
```
共 20+ 文件，~500 行改动

### 7月25日晚：钩子专项整改——预览缺口感设计

基于分析：免费预览给得太水 → 用户觉得不值钱；钩子设计错了方向 → 欧美用户吃"解决我的问题"而非"大师亲算"。

#### 改动原则
每个 hook 必须制造具体的、可感知的、带私人定制感的"缺口感"：
- ❌ "免费看手相" → ✅ "Your hand reveals what you don't say. One hidden strength, one blind spot."
- ❌ "大师为你择吉日" → ✅ "3 dates in your window score 90+. Check before you commit."
- ❌ "免费取名" → ✅ "See what the Chinese would have named you — based on the exact day you were born."

#### 覆盖范围（4 locales × 55 处）
| 层级 | 内容 |
|------|------|
| 首页 | 5 个 feature card desc |
| 服务页 | 5 个 subtitle |
| 免费工具 | 5 个 subtitle |
| 预览区 | freeTier badge、naming teaser、calendar ctaSub、divination hint/ctaSub |
| Guide CTA | 5 个 desc |

#### Commit
`13d1480` feat: hook redesign — curiosity-driven preview copy × 4 locales

#### 🔍 支付全链路审计
逐节点排查了提交→checkout→PayPal→PDT→结果生成的完整路径，**路径单一干净**，无多余跳转。

#### 🐛 发现并修复：dream-interpretation "Support $X" 按钮无效
- **Bug**：`SubmitButton` 缺少 `onPaidClick` 和 `amount` props，用户有免费次数时点击"Support $X"无反应
- **影响**：解梦的真实用户想付费支持，按钮点击无效，可能直接流失
- **修复**：添加 `handlePaidClick` 函数 + 传递 `onPaidClick` + `amount` props
- **同时修复**：palm-reading 按钮金额显示补齐（之前写死 $1 不反映 AmountPicker 选择）
- **Commit**：`4096ffd`

#### 🏷️ 首页 Hero 价格前置
- Hero 标题下方新增金色价格行："From $1 — pay what you feel it's worth"（4 locales）
- **目的**：用户进站第一眼就知道定价模式，不用走 3 步填完表才看到价格

#### 🔓 PaywallOverlay 信任信号强化
- CTA 按钮：`"Unlock Full Result · $1"` → `"Support & Unlock Full Result"`（去掉 $1 硬编码）
- 底部文案：`"One-time payment · no subscription · instant unlock"` → `"...pay what you think it's worth · from $1"`
- 4 locales 同步更新

#### 📊 新增漏斗埋点
| 事件 | 触发点 |
|------|--------|
| `free_result_viewed` | 免费用户落地 success 页面（看到预览+付费墙） |
| `paywall_unlock_click` | 用户点击付费墙"Support & Unlock"按钮 |

#### 📊 日报分析
- 7/20-7/23 共 10 笔订单，6 笔测试 + 2 笔真实用户（解梦+择日 free trial），0 笔真实付费
- 7/23 PH 上线日：78 访问/18 国，有 pay_click 但未完成支付
- 7/24：32 访问但 93% 为数据中心流量

### 7月23日：🚀 Product Hunt 正式上线

- ✅ **PH 页面**：https://www.producthunt.com/posts/chinese-culture-studio
- ✅ **上线时间**：2026-07-23 00:01 PST（北京时间 15:01）
- ✅ **Tagline**：Chinese Name, I Ching, Palm & Dream Reading — 5 Tools, $1
- ✅ **First Comment**：已发布
- ✅ **网站横幅**：首页 PH 橙红横幅已激活（7/23-7/31）
- ✅ **PH 互动**：已开始给同天上线产品留言

**推广渠道现状**：
| 渠道 | 状态 |
|------|------|
| PH 社区互动 | 🔄 进行中 |
| HN (Hacker News) | ❌ 注册被封（VPN IP 被拉黑） |
| 邮件推广 | ❌ 订阅用户 ~0 |
| Twitter/X | ❌ 无账号（TWITTER_ENABLED 未激活） |
| Reddit | ❌ r/astrology Rule 4, r/InternetIsBeautiful Rule 10 |

**上线前准备提交（7/22）**：
| 提交 | 内容 |
|------|------|
| `0fca8df` | PH 启动计划 + 首页横幅 |
| `0f073d9` | 支付墙重设计（Visa/MC/PayPal 徽章） |
| `f7154e0` | 占卜英文优先布局 |
| `8cbcd44` | 小六壬（PH 后上线用） |

### 7月22日晚：生肖计算器 Bug 修复
- 🐛 **Bug**：生肖计算器年份索引用 `year % 12` 导致所有生肖偏移 4 位（1980 年显示鼠→应为猴）
- ✅ **修复**：`(year - 4) % 12`，中国生肖以甲子年（公元4年）为起点
- 📄 **文件**：`src/data/zodiac-data.ts`（3 行）
- ✅ Build 通过，已推送上线 `2ba5d55`

### 7月22日日间：AI 原生增长引擎 v1（完整版）

#### 🚀 4 个 AI 病毒传播工具（全部上线，API 验证通过）
| 工具 | 路由 | 病毒点 | 转化目标 |
|------|------|--------|----------|
| 🔮 AI Dream Decoder | `/tools/dream-ai` | 梦境解读截图分享 | → `/dream-interpretation` $1 |
| 💕 Zodiac Love Match | `/tools/zodiac-match` | 配对百分比截图疯传 | → `/naming` $1 |
| 🔮 Daily Fortune | `/tools/daily-fortune` | 每日运势卡片分享 | → `/divination` $1 |
| ✨ Name Preview | `/tools/name-preview` | 中文名预览分享 | → `/naming` $1 |

每个工具：免费 · 即时 AI · 分享按钮（Twitter/WhatsApp/复制）· $1 转化漏斗 · 4语言 · 邮件订阅入口

#### 📧 邮件增长引擎
- ✅ 每日邮件发给所有 DB 订阅者（Prisma 查询 Subscriber 表）
- ✅ 邮件内含 4 个 AI 工具推广卡片
- ✅ 4 个工具页面均有 EmailCaptureForm
- ✅ Resend 每日自动发送，已验证通过

#### ⏰ Cron 计时任务
- ✅ 预热新页面（28个: snake-2027 + 4 tools × 4 locales）
- ✅ IndexNow 新增页面推送
- ✅ 日报生成 · sitemap ping · 邮件发送

#### 🐛 修过的坑
- `react/no-unescaped-entities` — name-preview JSX 引号
- em dash `—` 导致 HTTP header ByteString 错误（4 个 API）
- Render 部署流程：Push → 自动构建 → ~2min 上线

#### 📣 冷启动实验
- ❌ r/astrology — Rule 4: No self-promotion
- ❌ r/InternetIsBeautiful — Rule 10: AI-Generated Content
- ⚠️ Reddit 新账号限流 494s
- 🔜 **下一步：Product Hunt 发布**（明天周三最佳时机）
  - 文案已备好（Tagline/Description/First comment）
  - 注册 → https://www.producthunt.com

#### 📦 新增文件清单
```
src/app/api/dream-ai/route.ts
src/app/api/zodiac-match/route.ts
src/app/api/daily-fortune/route.ts
src/app/api/name-preview/route.ts
src/app/[locale]/tools/dream-ai/page.tsx
src/app/[locale]/tools/zodiac-match/page.tsx
src/app/[locale]/tools/daily-fortune/page.tsx
src/app/[locale]/tools/name-preview/page.tsx
```

#### 修改文件
`messages/*.json` · `layout.tsx` · `NavMenu.tsx` · `email.ts` · `cron/route.ts` · `sitemap-ping.ts` · `subscribe/route.ts` · `EmailCaptureForm.tsx` · `CLAUDE.md`

#### 🚀 4 个 AI 病毒传播工具
| 工具 | 路由 | 病毒点 | 转化目标 |
|------|------|--------|----------|
| 🔮 **AI Dream Decoder** | `/tools/dream-ai` | 梦境解读截图分享 | → `/dream-interpretation` $1 |
| 💕 **Zodiac Love Match** | `/tools/zodiac-match` | 配对百分比截图疯传 | → `/naming` $1 |
| 🔮 **Daily Fortune** | `/tools/daily-fortune` | 每日运势卡片分享 | → `/divination` $1 |
| ✨ **Name Preview** | `/tools/name-preview` | 中文名预览分享 | → `/naming` $1 |

**共同特征**：
- ✅ 全部免费使用，无需登录/支付
- ✅ 所有结果设计为可分享卡片（Twitter / WhatsApp / 复制）
- ✅ 每个工具都有清晰的 $1 转化 CTA
- ✅ 4 语言完整支持（en/ru/ja/ko）
- ✅ 埋点追踪完整（submit / result / share / upsell）
- ✅ 全部通过 `next build` 编译，0 错误

**增长逻辑**：免费工具 → 用户体验 wow moment → 社交分享 → 新用户进入 → 循环 → 部分转化 $1

**新增 API 路由**：`/api/dream-ai` `/api/zodiac-match` `/api/daily-fortune` `/api/name-preview`

**新增页面**：`/tools/dream-ai` `/tools/zodiac-match` `/tools/daily-fortune` `/tools/name-preview`

### 7月21日（回顾）

#### 🐍 蛇年 2027 预热（SEO 引流新频道）
- ✅ **13 个新页面上线**：蛇年总览 + 12 生肖运势（`/snake-2027`，4 语言）
- ✅ **SEO 优化**：每页独立 meta title/description，sitemap 已收录
- ✅ **追踪埋点**：AnalyticsTracker 接入所有蛇年页面
- ✅ **首页入口**：guides 区域新增蛇年链接（4 locales）
- ✅ 世界杯引流模式复用到蛇年：**热点事件 → 生肖运势 → SEO 引流 → 转化**

#### 📧 Resend 邮件系统完善
- ✅ 发件人地址正式化：`onboarding@resend.dev` → `noreply@culture-of-china.com`
- ✅ Contact 表单容错：缺少 `RESEND_API_KEY` 时优雅降级，不报错
- ✅ i18n 表单验证：浏览器默认英文提示 → 四语言本地化错误消息
- ✅ Resend 域名验证已在 Resend 控制台配置

#### 📊 竞品分析
- ✅ `COMPETITOR_ANALYSIS.md` 完成：5 家竞品深度分析（Astrology.com / Cafe Astrology / Astro-Charts / Feng Shui Web / Your Chinese Astrology）
- ✅ 核心发现：**$1 定价远低于市场 ($5-$35)，是巨大优势但被隐藏了**
- ✅ P0-P3 转化优化路线图已制定（Hero 重构 / 定价前置 / Paywall 免费预览等）

#### 🔧 组件修复
- ✅ GuideCTA 使用正确 props（service + href）
- ✅ AnalyticsTracker 移除多余 props
- ✅ snake-2027 页面清理未使用变量

### 7月21日 Git 提交
| Commit | 内容 |
|--------|------|
| `9059506` | docs: update CLAUDE.md + competitor analysis |
| `16cd493` | fix: use correct GuideCTA props (service + href) |
| `ebacc0d` | fix: remove AnalyticsTracker props |
| `fd6f442` | fix: remove unused variable in snake-2027 page |
| `015bbbd` | feat: add snake-2027 link to homepage guides section (4 locales) |
| `6d945ae` | feat: Year of the Snake 2027 pages — 12 zodiac + overview |
| `c670fda` | fix: change sender from onboarding@resend.dev to noreply@culture-of-china.com |
| `e8c1717` | fix: add eslint-disable for any type in contact fallback |
| `7435eaf` | fix: contact form gracefully handles missing email config |
| `86da2c8` | fix: i18n form validation — locale-aware messages |

### 7月20日（回顾）
- Render 部署修复（移除 prisma db push）
- 世界杯结束（西班牙夺冠，冠军回顾模式）
- PayPal 支付闭环上线（PDT + 自动生成 + IPN 三层）
- 信用卡直付开启（Account Optional）
- 安全修复（/api/result 10分钟窗口）
- Neon → Supabase 数据库迁移完成

### PayPal 商户配置
| 设置 | 状态 |
|------|------|
| 商户账号 | `22728717@qq.com` 企业已审批 |
| 自动返回 | ✅ → `/success` |
| PDT | ✅ Token: `jvQnzkc...` |
| Account Optional | ✅ 信用卡直付 |
| IPN URL | `https://www.culture-of-china.com/api/webhook/paypal` |
| Sandbox | `false` |

### Render 环境变量
`DATABASE_URL` `DIRECT_URL` `NEXT_PUBLIC_APP_URL` `ADMIN_TOKEN` `OPENROUTER_API_KEY` `PAYPAL_PDT_TOKEN` `PAYPAL_SANDBOX` `RESEND_API_KEY` `CONTACT__EMAIL` `CRON_SECRET` ✅ 全部就绪

### Git 配置
```
Remote: git@github.com:lionpon/chinese-culture-app.git (SSH, deploy key)
Key: ~/.ssh/id_ed25519_temp
Push: GIT_SSH_COMMAND="ssh -i ~/.ssh/id_ed25519_temp -o IdentitiesOnly=yes" git push
```

### 连接信息
```
Supabase Pooler: postgresql://postgres.vnktcrolpcyktduldpfm:***@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
Supabase Direct: postgresql://postgres:***@db.vnktcrolpcyktduldpfm.supabase.co:5432/postgres
Render API: rnd_H4DDOqi0rEVQBJmdBmGUgRAAw7n3 | Service: srv-d88ks0jbc2fs73eb6shg
Proxy: 127.0.0.1:7897
```

## 引流路线图（待选）

世界杯 `I Ching x World Cup` 模式跑通：**全球热点事件 → 易经预测 → SEO 引流 → 转化**

待选事件（按时间线）：

| 事件 | 时间 | 全球搜索量 | 适合度 |
|------|------|-----------|--------|
| 🏈 Super Bowl LX | 2026.2 | 🔥🔥🔥🔥🔥 | 美国+全球，胜负明确 |
| 🎬 奥斯卡 2027 | 2027.3 | 🔥🔥🔥🔥 | 预测获奖，卦对应提名 |
| 🗳️ 美国中期选举 | 2026.11 | 🔥🔥🔥🔥 | 国会归属预测 |
| 🏆 欧冠决赛 | 2027.5 | 🔥🔥🔥🔥🔥 | 同世界杯模板 |
| 🐍 蛇年运势 | ~2027.1 | 🔥🔥🔥 | 天然文化契合 |
| 🎵 Eurovision | 2027.5 | 🔥🔥🔥 | 欧洲市场 |

### 可做的优化
- 移动端 PayPal Deep Link（检测手机 → 直接唤起 PayPal App）
- 支付按钮旁加 Visa/Mastercard 图标（增强信任）
```
