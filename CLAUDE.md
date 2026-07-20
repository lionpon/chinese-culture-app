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
`/palm-reading` `/dream-interpretation` `/daily` `/guide/*` `/tools/*` `/world-cup`

## 技术栈

Next.js 14 · TypeScript · Prisma · Neon PostgreSQL · Tailwind CSS · next-intl · PayPal Standard Checkout · OpenRouter AI

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
`PaywallOverlay` `NamingResultView` `CalendarResultView` `DivinationResultView` `PalmReadingResultView` `DreamInterpretationResultView` `WorldCupCTA` `GuideCTA` `FreeTierBadge` `AnalyticsTracker` `CookieConsent` `EmailCaptureForm` `LanguageSwitcher` `ShareButton`

### 关键 lib
`paypal.ts` `bazi.ts` `calendar.ts` `divination.ts` `naming.ts` `palm-reading.ts` `dream-interpretation.ts` `db.ts` `report.ts` `track.ts` `useCheckout.ts` `result-store.tsx` `free-tier.ts` `bot-filter.ts` `email.ts` `telegram.ts`

## 数据库 (Prisma)

4 表：`Purchase` `Visit` `DailyReport` `Subscriber`

## 环境变量

`DATABASE_URL` `ADMIN_TOKEN` `NEXT_PUBLIC_APP_URL` `PAYPAL_EMAIL` `PAYPAL_SANDBOX` `PAYPAL_PDT_TOKEN` `OPENROUTER_API_KEY`

## 支付流程

三层闭环：PDT (return) + 主动生成 (auto-create) + IPN (webhook)
PayPal Standard Checkout，支持信用卡支付。

## 近期状态 (2026-07-20 傍晚)

- **线上版本**：旧 P2 仍在跑（`Y6Ib4fIBwS7t7MlOzFVs1`）
- **数据库**：Supabase (`vnktcrolpcyktduldpfm`) ✅ 已迁移
- **GitHub**：全量同步，本地领先 origin 2 commits

### 今日完成
- ✅ **Supabase 迁移**：Neon → Supabase，4 表已同步，本地验证通过
- ✅ **Git push**：P3+P4+埋点+迁移代码全部推送 GitHub
- ✅ **修复**：移除 `prisma db push`（PgBouncer 不兼容）、补俄语翻译、AutoDailyReport try-catch
- ✅ **PayPal**：企业审批已通过
- 🔴 **Render 部署**：构建时报 `PrismaClientInitializationError` 仍连旧 Neon 地址

### 🔴 当前阻塞：Render 构建连不上 Supabase

构建日志报错连接 `ep-lucky-dust-aqcxp3j7`（旧 Neon），但 DATABASE_URL 已正确设置为 Supabase。疑似 Render 构建缓存残留。

### 晚上继续的步骤
1. Render → **Clear build cache**
2. 确认环境变量：DATABASE_URL（Supabase pooler）+ DIRECT_URL（Supabase direct）
3. **Cancel** 所有卡住的部署
4. **Manual Deploy → Deploy latest commit**
5. 观察构建日志 → 应该走通

### 连接信息
```
Supabase Pooler: postgresql://postgres.vnktcrolpcyktduldpfm:***@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
Supabase Direct: postgresql://postgres:***@db.vnktcrolpcyktduldpfm.supabase.co:5432/postgres
```
