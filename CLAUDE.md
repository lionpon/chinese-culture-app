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
| 数据库 | Neon PostgreSQL (us-east-1, ep-lucky-dust-aqcxp3j7) |
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

## 近期状态 (2026-07-19 深夜)

- **线上版本：P2 (72aab46)** — P3 构建失败，P4 未推送
- Render 状态：P3 failed deploy (exit code 1)
- 7日数据：225访问 3点击 3免费试用 $0收入

### 部署链路
```
本地 master (7d62e15) ← P0+P2+P3+P4+埋点 全部就绪
        │
        ├── GitHub origin (72aab46) ← 仅 P0+P2（P3 推送成功但构建失败）
        │
        └── Render 线上 ← P2 (72aab46) ← 当前运行版本
```

### 已完成的本地工作（待推送修复）
- **P0**: 起名页 Bazi 预览 ✅ 已部署
- **P2**: 导航栏+邮件订阅 ✅ 已部署
- **P3**: 择日/占卜预览 ❌ 构建失败（需排查）
- **P4**: 指南页互动工具 ⏳ 本地就绪
- **埋点**: preview_bazi/calendar/divination 等 24 个事件 ⏳ 本地就绪

### 下一步（明天）
1. 排查 P3 构建失败原因（Render build log）
2. 修复后合并推送到 GitHub
3. Render 自动部署上线
4. 站点的间歇 806308665 错误 → Render 免费实例冷启动，升级 Starter $7/月可解决

### 推送命令（网络通时）
```bash
cd "/d/chinese culture/project2"
git push --force-with-lease origin master
```
注：已配置 `http.version=HTTP/1.1` 防墙；如仍失败用 SSH over 443 或等网络恢复
