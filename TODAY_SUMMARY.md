# Chinese Culture Studio — 今日工作总结 (2026-05-23)

## 一、部署上线

| 项目 | 详情 |
|---|---|
| 数据库 | Neon PostgreSQL `ep-lucky-dust-aqcxp3j7` (us-east-1) |
| 托管 | Render `srv-d88ks0jbc2fs73eb6shg` (oregon, free) |
| 地址 | https://chinese-culture-app.onrender.com |
| 管理后台 | https://chinese-culture-app.onrender.com/admin?token=chinese-culture-admin-2024 |
| GitHub | https://github.com/lionpon/chinese-culture-app |
| 自动部署 | Render 监听 master 分支 |
| 保活 | cron-job.org 每 10 分钟 ping |

## 二、代码改动

| 改动 | 提交 |
|---|---|
| 添加 render.yaml 部署配置 | `055193a` |
| 移除 Test Mode 复选框（3 页面） | `30dae3c` |
| 添加 SEO 优化（sitemap/robots/OG/结构化数据） | `fb676a3` |
| Lemon Squeezy 语言修复尝试后撤回 | `0ef55f4` |

## 三、环境变量（全配齐）

DATABASE_URL / ADMIN_TOKEN / NEXT_PUBLIC_APP_URL / LEMON_SQUEEZY_API_KEY / LEMON_SQUEEZY_WEBHOOK_SECRET / LEMON_SQUEEZY_STORE_ID / LEMON_SQUEEZY_VARIANT_ID

## 四、推广执行

| 渠道 | 结果 |
|---|---|
| Reddit r/SideProject | ✅ 已发布 |
| Reddit r/iching | ✅ 已发布 |
| Reddit r/taoism | ✅ 已发布 |
| Reddit r/ChineseLanguage | ❌ Rule 3 |
| Reddit r/InternetIsBeautiful | ❌ Rule 5 |
| Reddit r/somethingimade | ❌ Rule 1 |
| Reddit r/webdev | ❌ Rule 5 |
| Product Hunt | ✅ 已预约 5月27日上线 |
| Tiny Startups 目录 | ✅ 已提交 |
| 10words 目录 | ❌ 网站故障 |

## 五、已知问题

| 问题 | 状态 |
|---|---|
| VPN 保加利亚 IP → 付款页保加利亚语 | 不影响真实用户，可忽略 |
| Lemon Squeezy 商店未激活 | 待处理（需在 app.lemonsqueezy.com 激活商店） |
| Git HTTPS 被防火墙拦截 | 已配 SSH，不影响使用 |

## 六、本地文件

| 文件 | 内容 |
|---|---|
| PROJECT_SUMMARY.md | 项目完整信息总表 |
| PROMOTION.md | 推广文案与计划 |
| TODAY_SUMMARY.md | 本文件 |
| promotion/reddit/*.txt | 各 Reddit 帖子标题与正文 |

## 七、PayPal 支付迁移 (2026-05-23)

| 项目 | 详情 |
|---|---|
| 原因 | Lemon Squeezy 不支持中国商家（Stripe Connect 不支持中国大陆） |
| 新方案 | PayPal REST API Checkout（JS SDK） |
| 状态 | Sandbox 测试通过，正式收款待切换 Live 凭证 |

**新建文件：**
| 文件 | 作用 |
|---|---|
| `src/lib/paypal.ts` | PayPal API（create order, capture） |
| `src/app/api/paypal/capture/route.ts` | 扣款 + 生成结果 |
| `src/components/PayPalButton.tsx` | 页面内嵌 PayPal 按钮 |

**坑与修复：**
- `checkoutId` 字段 `@unique` 约束 → 初始值 `""` 导致第二次创建冲突 → 改用 `crypto.randomUUID()` 作临时值
- `PAYPAL_SANDBOX` 控制 API 端点 → Sandbox 凭证不能连正式 API，反之亦然
- Render env var 改动后需要重新部署才能生效

**当前凭证状态：** Sandbox（测试），待用户获取 Live 凭证后切换

## 八、后续待办

- [ ] 获取 PayPal Live 凭证，切换正式收款
- [ ] 5月27日 Product Hunt 自动发布后查看数据
- [ ] 继续提交剩余免费目录（Betalist, AlternativeTo, SaaS Hub 等）
- [ ] 在 Twitter/X 上为 Product Hunt 预热
- [ ] 查看 Reddit 3 个帖子的评论并回复
