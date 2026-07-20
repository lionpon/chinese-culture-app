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

## 近期状态 (2026-07-20 深夜)

- **线上版本**：`aeda292` Live on Render + Cloudflare
- **域名**：`www.culture-of-china.com` 正常运行
- **数据库**：Supabase (`vnktcrolpcyktduldpfm`) ✅
- **GitHub**：`git@github.com:lionpon/chinese-culture-app.git` (SSH deploy key)

### 今日完成
- ✅ **Render 部署修复**：移除 `prisma db push`（PgBouncer 不兼容），构建成功
- ✅ **世界杯结束**：西班牙 1-0 阿根廷夺冠，页面更新为冠军回顾模式，4 语言
- ✅ **支付闭环上线**：PayPal 企业商户，三层闭环（PDT + 自动生成 + IPN）
- ✅ **信用卡直付**：Account Optional 已开启，Visa/Mastercard 无需 PayPal 账号
- ✅ **安全修复**：`/api/result` 自动生成加入 10 分钟窗口限制
- ✅ **环境变量**：全新 PDT Token 已部署，SANDBOX=false

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
`DATABASE_URL` `DIRECT_URL` `NEXT_PUBLIC_APP_URL` `ADMIN_TOKEN` `OPENROUTER_API_KEY` `PAYPAL_PDT_TOKEN` `PAYPAL_SANDBOX` `CONTACT_EMAIL` `CRON_SECRET`（缺 `RESEND_API_KEY` 待找回）

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
