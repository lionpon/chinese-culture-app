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

## 近期状态 (2026-07-23)

- **线上版本**：`2ba5d55` Live on Render + Cloudflare
- **域名**：`www.culture-of-china.com` 正常运行
- **数据库**：Supabase (`vnktcrolpcyktduldpfm`) ✅
- **GitHub**：`git@github.com:lionpon/chinese-culture-app.git` (SSH deploy key)
- **最新 commit**：`2ba5d55`（fix: zodiac year calculation）

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
