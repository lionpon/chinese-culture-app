# Chinese Culture Studio — 产品信息总表

## 产品概览

| 项目 | 内容 |
|---|---|
| 产品名称 | Chinese Culture Studio |
| 定价 | $1.00 / 次 |
| 目标市场 | 国际用户（英语） |
| 产品定位 | 中国传统文化体验（娱乐及文化欣赏用途） |

## 服务清单

| 序号 | 服务 | 功能 | 定价 |
|---|---|---|---|
| 1 | Create a Chinese Name | 基于八字五行、易经起中文名 | $1 |
| 2 | Auspicious Date Selection | 传统黄历择吉日（婚嫁、开业、出行等 13 种） | $1 |
| 3 | I Ching Divination | 易经占卜（时间/随机/手动三种起卦方式） | $1 |

## 基础设施

| 项目 | 详情 |
|---|---|
| 代码仓库 | https://github.com/lionpon/chinese-culture-app |
| 生产地址 | https://www.culture-of-china.com |
| 管理后台 | https://www.culture-of-china.com/admin?token=(见 Render 环境变量 ADMIN_TOKEN) |
| 托管平台 | Render（oregon, free tier） |
| 数据库 | Neon PostgreSQL（us-east-1, ep-lucky-dust-aqcxp3j7） |
| 支付网关 | PayPal Standard Checkout |
| 保活服务 | cron-job.org（每 10 分钟） |

## 环境变量

| 变量 | 用途 |
|---|---|
| DATABASE_URL | Neon PostgreSQL 连接字符串 |
| ADMIN_TOKEN | 管理后台访问令牌 |
| NEXT_PUBLIC_APP_URL | 应用公开地址 |
| LEMON_SQUEEZY_API_KEY | (已废弃，项目已迁移至 PayPal) |
| LEMON_SQUEEZY_WEBHOOK_SECRET | (已废弃) |
| LEMON_SQUEEZY_STORE_ID | (已废弃) |
| LEMON_SQUEEZY_VARIANT_ID | (已废弃) |
| PAYPAL_EMAIL | PayPal 商户邮箱 |
| PAYPAL_SANDBOX | true=沙箱, false=正式 |
| PAYPAL_PDT_TOKEN | PayPal PDT 验证令牌 |
| OPENROUTER_API_KEY | AI 功能 API 密钥 |

## GitHub 信息

| 项目 | 内容 |
|---|---|
| 仓库地址 | https://github.com/lionpon/chinese-culture-app |
| 分支 | master |
| 认证方式 | SSH（ed25519） |
| 自动部署 | Render 监听 master 分支自动部署 |
| SSH Key 路径 | C:\Users\Administrator\.ssh\id_ed25519 |

## Render 信息

| 项目 | 内容 |
|---|---|
| Service ID | srv-d88ks0jbc2fs73eb6shg |
| Service Name | chinese-culture-app |
| Region | oregon |
| 运行时 | Node.js |
| 方案 | Free（15 分钟休眠，保活后自动唤醒） |
| Build Command | npm install && npx prisma generate && npx prisma db push && npx next build |
| Start Command | npm start |

## Neon 信息

| 项目 | 内容 |
|---|---|
| 项目名 | neondb |
| Region | us-east-1 |
| Endpoint | ep-lucky-dust-aqcxp3j7 |
| 数据库表 | Purchase, Visit, DailyReport |
| ORM | Prisma（postgresql provider） |

## Lemon Squeezy（已废弃）

| 项目 | 内容 |
|---|---|
| Store ID | 383990（历史记录） |
| Variant ID | 1690365（历史记录） |
| 状态 | ⚠️ 已迁移至 PayPal Standard Checkout |
| 原因 | Lemon Squeezy 不支持中国商家（Stripe Connect 不支持中国大陆） |

## 文件结构

| 路径 | 说明 |
|---|---|
| src/app/naming/page.tsx | 起名服务页 |
| src/app/calendar/page.tsx | 择日服务页 |
| src/app/divination/page.tsx | 占卜服务页 |
| src/app/admin/page.tsx | 管理后台 |
| src/app/api/checkout/route.ts | 支付结账 API |
| src/app/api/report/route.ts | 日报生成 API |
| prisma/schema.prisma | 数据库模型 |
| render.yaml | Render 部署配置 |
| .env.local | 本地环境变量（不提交 Git） |

## 关键操作记录

| 日期 | 操作 |
|---|---|
| 2026-05-23 | Neon 数据库创建并推送表结构 |
| 2026-05-23 | GitHub 仓库创建并推送代码 |
| 2026-05-23 | Render 部署上线 |
| 2026-05-23 | cron-job.org 保活配置 |
| 2026-05-23 | 关闭 Test Mode，切换为纯付费模式 |

## 运维备忘

- **本地推送代码**：需开 VPN，使用 SSH 认证（git@github.com:lionpon/...）
- **修改环境变量**：需开 VPN，登录 https://dashboard.render.com
- **查看管理后台**：无需 VPN，直接访问 https://www.culture-of-china.com/admin?token=(见 Render 环境变量)
- **首次访问慢**：Render free tier 休眠后首次访问需等待 30-60 秒唤醒
