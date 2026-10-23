# Astro 完整迁移蓝图

> 状态：草案，待评审后初始化脚手架  
> 日期：2026-10-23  
> 范围：`adguardprivate.com` / `nullprivate.com` 整站迁移到 Astro  
> 原则：静态优先、zh-cn 源语言、双品牌同内容源、分阶段切流、转化可度量

## 1. 目标与非目标

### 目标

1. 用 Astro 提升营销页感染力与定价转化路径。
2. 用 Starlight 承接现有文档体验，并保持静态搜索。
3. 继续静态部署：Cloudflare Pages（nullprivate）+ 阿里云 OSS（adguardprivate）。
4. 保留现有翻译流水线思路：只手改 `zh-cn`，其余语言生成。
5. 尽量复用现有 Markdown / 静态资源，降低内容重写成本。
6. 为 GA 关键事件与品牌分流预留清晰埋点边界。

### 非目标（第一期不做）

1. 不在第一期重写支付后端。
2. 不把租户控制台 `*.adguardprivate.com` 做成 Astro 应用。
3. 不一次删除 Hugo 仓库与历史内容。
4. 不上 SSR 作为默认运行时；默认 `output: static`。
5. 不为了动效引入整站重型 SPA。

## 2. 现状摘要（迁移输入）

来源仓库：`www.nullprivate.com/`

| 项 | 现状 |
| --- | --- |
| 框架 | Hugo + Docsy |
| 内容规模 | zh-cn 约 94 个内容文件；docs 66；blog 25；特殊页 2 |
| 语言 | `zh-cn`（源）、`zh-hk`、`en-us`、`ko-kr`、`ja-jp` |
| 双品牌 | 同内容，不同 `baseURL` / GA ID |
| 高交互页 | `pages/pricing/index.html`（约 850 行）、`pages/my-service/index.html`（约 767 行） |
| 部署 | `build:adguardprivate` → OSS；`build:nullprivate` → Cloudflare Pages / Wrangler |
| 菜单 | 文档 / 博客 / 购买 / 我的服务 / 外部 list 站 |

已确认品牌差异（当前配置级）：

| 字段 | nullprivate | adguardprivate |
| --- | --- | --- |
| 生产域名 | `https://www.nullprivate.com` | `https://www.adguardprivate.com` |
| GA Measurement ID | `G-CQZWQL8008` | `G-W6PMMZECGL` |
| API | 同为 `https://adguard.adguardprivate.com/api/v1` | 同左 |
| 构建产物 | `public-nullprivate/` | `public-adguardprivate/` |

补充观察：

1. GA 分析显示定价页到达率低，但进入后互动较好；新站点要把转化组件做成一等公民。
2. 租户子域流量会污染官网分析；新站点只承载 www 品牌站，不为租户面板做主题。
3. 现有博客/文档 Markdown 质量可迁移；感染力提升主要来自首页、定价、演示组件，而不是重写全部文档。

## 3. 推荐架构

```text
nullprivate-web/
  package.json
  astro.config.ts
  tsconfig.json
  wrangler.jsonc
  rclone.conf                 # 或沿用上层/CI secret，不入库明文
  brands/
    nullprivate.ts
    adguardprivate.ts
  public/
    robots.txt
    favicons/
    videos/
    services/                 # 如需继续提供静态 JSON
    filters/                  # 评估是否继续由本站托管
  src/
    content.config.ts
    content/
      docs/zh-cn/...
      blog/zh-cn/...
      pages/zh-cn/...         # 非 Starlight 的内容页（如法律页）
    i18n/
      zh-cn.json
      en-us.json
      zh-hk.json
      ko-kr.json
      ja-jp.json
    styles/
      tokens.css
      global.css
    layouts/
      MarketingLayout.astro
      BlogLayout.astro
    components/
      marketing/
        Hero.tsx
        FeatureGrid.astro
        ProofStrip.astro
        CtaBand.astro
      pricing/
        PricingPage.tsx
        PlanCard.tsx
        InviteCodeForm.tsx
        PaymentPanel.tsx
      my-service/
        MyServicePage.tsx
      analytics/
        GaClient.tsx
        track.ts
      ui/                     # 按钮、卡片、徽章等
    pages/
      index.astro             # 营销首页
      blog/
      pages/pricing.astro
      pages/my-service.astro
      [...slug].astro         # 视路由方案可拆
    lib/
      brand.ts
      urls.ts
      content.ts
  docs-site/                  # 或者 src/ 内集成 Starlight
  scripts/
    migrate-content.mjs
    sync-i18n-from-hugo.mjs
    build-brand.mjs
    upload-aliyun.mjs
    baidu-push.mjs
  tests/
```

### 架构原则

1. **内容与品牌分离**：内容只有一份；品牌通过 `BRAND=nullprivate|adguardprivate` 注入。
2. **文档与营销分层**：
   - 营销/转化：Astro 页面 + React Islands
   - 文档：Starlight
3. **重交互隔离**：定价、我的服务做成 React 组件，避免散落 HTML `<script>`。
4. **动效收敛**：仅 Hero 与 Pricing 使用 Motion；其余保持 CSS transition。
5. **搜索静态化**：Pagefind 建索引，适合 OSS / Pages 双部署。

## 4. 技术选型落地

| 能力 | 选型 | 说明 |
| --- | --- | --- |
| 站点框架 | Astro 5.x | `output: 'static'` |
| 语言 | TypeScript | strict |
| UI 岛屿 | React 19 + `@astrojs/react` | 仅定价/我的服务/少量动效 |
| 内容 | Content Layer + MDX | blog/docs/pages |
| 文档主题 | Starlight | 侧栏、目录、i18n、文档导航 |
| 样式 | Tailwind CSS v4 + CSS tokens | 品牌色、间距、字体统一 |
| 动效 | `motion`（原 Framer Motion）或 Motion One | 只用于首屏与定价 |
| 搜索 | Pagefind | 构建后索引 `dist/` |
| 图标 | Lucide 或保留少量 Font Awesome | 新站优先 Lucide，减少 CSS 体积 |
| 包管理 | pnpm（推荐）或 npm | 与仓库其他项目统一即可 |
| 测试 | Vitest + Playwright | 组件单测 + 定价关键路径 e2e |
| 分析 | GA4 gtag | 双品牌不同 Measurement ID |

## 5. 双品牌设计

### 5.1 Brand Config

```ts
// brands/nullprivate.ts
export default {
  id: 'nullprivate',
  siteName: '宁屏',
  siteUrl: 'https://www.nullprivate.com',
  gaId: 'G-CQZWQL8008',
  apiBase: 'https://adguard.adguardprivate.com/api/v1',
  beian: '鄂ICP备2024055931号-3',
  primaryHost: 'www.nullprivate.com',
  theme: {
    primary: '#...',
    accent: '#...',
  },
} as const;
```

```ts
// brands/adguardprivate.ts
export default {
  id: 'adguardprivate',
  siteName: '宁屏',
  siteUrl: 'https://www.adguardprivate.com',
  gaId: 'G-W6PMMZECGL',
  apiBase: 'https://adguard.adguardprivate.com/api/v1',
  beian: '鄂ICP备2024055931号-3', // 以现网为准复核
  primaryHost: 'www.adguardprivate.com',
  theme: {
    primary: '#...',
    accent: '#...',
  },
} as const;
```

### 5.2 构建矩阵

```bash
# 开发：默认 nullprivate + zh-cn
pnpm dev

# 生产构建
BRAND=nullprivate pnpm build        # -> dist/nullprivate
BRAND=adguardprivate pnpm build     # -> dist/adguardprivate

# 上传
pnpm upload:r2                      # Cloudflare Pages / Wrangler
pnpm upload:aliyun                  # rclone sync -> OSS
```

实现建议：

1. `astro.config.ts` 读取 `process.env.BRAND`。
2. `site`、`base`、sitemap、canonical、GA、页脚备案都从 brand config 来。
3. 不要复制两套 `src/content`。
4. stage 环境继续按 hostname 切换 `apiBase`（保留现定价页逻辑）。

## 6. 路由与 URL 兼容

迁移时优先保持现网 URL，避免 SEO 回归。

| 现网路径 | Astro 目标 | 备注 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 全新营销首页 |
| `/docs/` 及子树 | Starlight docs | 尽量保持路径 |
| `/blog/` | blog index | 列表页重做信息架构 |
| `/blog/:year/:month/:day/:slug/` | 兼容旧 permalink | 或 301 到 `/blog/:slug/` |
| `/pages/pricing/` | `src/pages/pages/pricing.astro` | 路径保持，降低外链损坏 |
| `/pages/my-service/` | `src/pages/pages/my-service.astro` | 同上 |
| `/zh-hk/...` 等 | i18n 路由 | 默认语言 zh-cn 可不带前缀 |

### URL 决策（需评审确认）

**推荐默认：**

1. zh-cn 无前缀：`/docs/...`
2. 其他语言带前缀：`/en-us/docs/...`、`/zh-hk/docs/...`
3. 博客第一期保留旧日期 permalink，或提供映射表做 301
4. `/pages/pricing/`、`/pages/my-service/` 第一期不改路径

若后续要净化 URL，再做：

- `/pages/pricing/` → `/pricing/`
- `/blog/2025/08/20/slug/` → `/blog/slug/`

必须配套完整 redirect map。

## 7. 内容模型与映射

### 7.1 Content Collections

```ts
// 伪代码
docs  -> Starlight docs collection
blog  -> Astro collection (md/mdx)
legal/pages -> Astro collection
```

### 7.2 Front Matter 映射

Hugo → Astro/Starlight：

| Hugo 字段 | 目标字段 | 处理 |
| --- | --- | --- |
| `title` | `title` | 直迁 |
| `description` | `description` | 直迁 |
| `date` | `pubDate` / `date` | 统一 Date |
| `draft` | `draft` | 直迁 |
| `weight` | `sidebar.order` / `order` | docs 用 |
| `slug` | `slug` | blog 保留 |
| `categories` | `categories` | blog 保留 |
| `tags` | `tags` | 保留 |
| `toc` | Starlight 默认 TOC | 可省略 |
| `comments` / `giscus_comments` | 第一期可忽略或后置 | |
| `layout: docs/blog/home/pages` | 由路径/collection 决定 | 删除 layout 依赖 |
| shortcodes `{{% %}}` / `{{< >}}` | MDX 组件 | 迁移脚本改写 |

### 7.3 目录映射

```text
www.nullprivate.com/content/zh-cn/docs/**      -> src/content/docs/zh-cn/**
www.nullprivate.com/content/zh-cn/blog/**      -> src/content/blog/zh-cn/**
www.nullprivate.com/content/zh-cn/_index.md     -> src/pages/index.astro 的文案源 / content module
www.nullprivate.com/content/zh-cn/pages/*.html -> React 页面组件（不再当 Markdown）
www.nullprivate.com/static/**                   -> public/**（按需）
www.nullprivate.com/i18n/*.yaml                -> src/i18n/*.json
www.nullprivate.com/config/_default/menus.*.yaml -> src/i18n 或 site nav config
```

### 7.4 Shortcode / 特殊语法迁移

| 现有写法 | 新写法 |
| --- | --- |
| `{{% blocks/cover %}}` 等 | Astro/React 营销区块组件 |
| `{{% blocks/feature %}}` | `<FeatureCard />` |
| `{{< api_base >}}` | `import.meta.env` / brand.apiBase |
| `{{< help >}}` | `<HelpPanel />` |
| Hugo heading attributes / unsafe HTML | MDX + 明确允许的组件 |

定价页与我的服务页不走 Markdown 迁移，直接抽成 React：

1. `PricingPage`：套餐数据、邀请码、下单、支付 iframe、loading 态
2. `MyServicePage`：服务查询、续费、邀请码展示、重启服务

现有集成测试思路保留：`payment-loading` 等关键路径迁到 Playwright。

## 8. i18n 与翻译流水线

### 规则（沿用现站）

1. **唯一手改源语言：`zh-cn`**
2. `en-us` / `zh-hk` / `ko-kr` / `ja-jp` 由翻译流水线生成
3. UI 文案与内容文案分开：
   - UI：`src/i18n/*.json`
   - 内容：`src/content/**/<lang>/**`

### 推荐工作流

```text
编辑 zh-cn
  -> git commit
  -> translator 生成其他语言内容与 UI 文案
  -> Astro build（5 语言）
  -> 品牌构建（2 brand）
```

### 实施要点

1. 第一期可先只开发 `zh-cn`，但目录与路由预留多语言。
2. 迁移脚本先搬 zh-cn；其他语言可第二期批量导入或重新生成。
3. `scripts/prune-non-zhcn.js` 的思想保留：防止翻译残留脏文件。
4. Starlight i18n 与营销页 i18n 使用同一语言码：`zh-cn`、`en-us`、`zh-hk`、`ko-kr`、`ja-jp`。

## 9. 视觉与转化设计系统

### 9.1 Design Tokens

在 `src/styles/tokens.css` 定义：

- 颜色：primary / accent / surface / text / success / danger
- 字体：中文优先系统栈 + 英文兜底
- 间距、圆角、阴影、容器宽度
- 品牌可覆盖 CSS variables

### 9.2 首页信息架构（感染力优先）

建议首屏叙事顺序：

1. 一句话价值：保护隐私，守护家人，智能防沉迷
2. 可感知演示：广告拦截 / 成人内容过滤 / 设备策略 前后对比
3. 主 CTA：立即体验；次 CTA：查看方案对比
4. 信任条：无注册、DoH/DoT、多平台、开源透明
5. 场景卡：家长 / 个人隐私 / 家庭多设备
6. 文档快捷入口：Android / iOS / Windows 三分钟上手
7. 底部转化带：试用与定价

### 9.3 定价页转化架构

1. 顶部：如何选择（体验 / 个人 / 家庭）
2. 套餐卡：价格、设备数、请求上限、独立规则差异
3. 主按钮事件：`select_plan`
4. 拉起支付：`begin_checkout`
5. 支付成功回跳后由后端页或查询页补 `purchase`
6. 邀请码与帮助区后置，不抢首屏决策

动效范围：

- 套餐卡入场
- 选中态与支付面板展开
- 不做整页粒子/重 Lottie 背景

## 10. 搜索、SEO、分析

### 搜索

1. 构建完成后对 `dist/<brand>` 跑 Pagefind
2. 文档与博客进入索引
3. 定价/我的服务可索引页面内容，但支付状态区不依赖搜索

### SEO

1. 每页 canonical 指向当前 brand 的正式域名
2. hreflang 覆盖 5 语言
3. sitemap 分 brand 生成
4. `robots.txt` 分 brand；继续允许 `/blog/` `/docs/` `/pages/`
5. 租户子域不在本项目输出；避免再制造可索引复制站
6. JSON-LD：Organization / WebSite；文档与文章可补 Breadcrumb / Article

### GA4

| Brand | Measurement ID |
| --- | --- |
| nullprivate | `G-CQZWQL8008` |
| adguardprivate | `G-W6PMMZECGL` |

必做事件：

1. `select_plan`
2. `begin_checkout`
3. `purchase`（有交易数据时）
4. `view_docs_start`
5. `cta_click`（首页主按钮）

只在 www 品牌站统计获客；不要把租户面板混进同一营销漏斗看板。

## 11. 部署与 CI/CD

### 本地命令（目标态）

```bash
pnpm install
pnpm dev                          # zh-cn + 默认 brand
pnpm build:nullprivate
pnpm build:adguardprivate
pnpm test
pnpm upload:r2                    # nullprivate
pnpm upload:aliyun                # adguardprivate
pnpm baidu:push
```

### 产物

```text
dist/nullprivate/**
dist/adguardprivate/**
```

### CI 建议

分阶段：

**阶段 A：并行发布（推荐）**

1. Hugo 现网继续部署
2. Astro 先发到预览域：
   - `astro-preview.nullprivate.com`
   - `astro-preview.adguardprivate.com`
3. 用 Playwright + 人工验收首页/定价/文档

**阶段 B：按路径切流**

1. 先切 `/`、`/pages/pricing/`
2. 再切 `/blog/`
3. 最后切 `/docs/`

**阶段 C：Hugo 只读归档**

1. 停止 Hugo 生产构建
2. 保留仓库只读一段时间
3. 百度推送与 Search Console 改指向新 sitemap

### 双通道上传

1. nullprivate：Wrangler / Cloudflare Pages，对齐现 `wrangler.jsonc`
2. adguardprivate：rclone sync OSS，对齐现 `upload_aliyun`
3. 凭证继续走 CI secrets / 本地忽略文件，不写入蓝图或仓库明文

## 12. 迁移阶段计划

### Phase 0：准备（0.5–1 天）

1. 确认本蓝图中的 URL、品牌、i18n 决策
2. 冻结“第一期页面清单”
3. 盘点 static 资产哪些必须迁（favicon、验证文件、videos、services）

### Phase 1：脚手架（1–2 天）

1. 初始化 Astro + React + Tailwind + Starlight
2. 建立 brand config 与双构建脚本
3. 打通 `pnpm dev` / `pnpm build:*`

### Phase 2：高杠杆页面（3–5 天）

1. 新首页
2. 定价页 React 化（功能对齐现网）
3. 我的服务页 React 化（功能对齐现网）
4. GA 事件接入
5. Playwright：下单 loading、邀请码、查询服务

### Phase 3：内容迁移（3–6 天）

1. 写 `scripts/migrate-content.mjs`
2. 迁 zh-cn docs → Starlight
3. 迁 zh-cn blog → MD/MDX
4. 修 broken shortcodes / 图片路径
5. Pagefind 接入

### Phase 4：多语言与 SEO（2–4 天）

1. 导入或生成其余语言
2. hreflang / sitemap / robots
3. 旧 URL redirect 表
4. Search Console / 百度验证文件迁移

### Phase 5：切流与观察（1–2 周）

1. 预览域验收
2. 分路径切流
3. 观察 GA：首页 CTA、pricing 到达、begin_checkout
4. 观察 SEO：抓取、收录、404

## 13. 验收标准

### 功能

1. 双品牌均可静态构建，域名、GA、canonical 正确。
2. 定价页可完成：选套餐 → 支付面板 → 与现 API 互通。
3. 我的服务页可完成：查询、续费入口、邀请码展示。
4. 文档可浏览、可搜索、侧栏/目录正常。
5. zh-cn 源语言工作流明确；其他语言可生成或导入。

### 体验

1. 移动端首页首屏可读且主 CTA 可见。
2. 定价页核心决策信息无需深滚才能看懂。
3. 动效不阻塞 LCP；低端机可降级。

### 数据

1. GA 能区分 brand。
2. `select_plan` / `begin_checkout` 有事件。
3. 官网报表默认只看 www host。

### 兼容

1. 主要现网 URL 无大面积 404。
2. 百度/Google 验证文件仍可访问。
3. OSS 与 Cloudflare 两套上传链路可用。

## 14. 风险与缓解

| 风险 | 影响 | 缓解 |
| --- | --- | --- |
| 定价页逻辑迁到 React 时行为漂移 | 转化直接受损 | 先对齐现网行为，再用 Playwright 锁关键路径 |
| Starlight 与营销视觉不统一 | 品牌割裂 | 共享 tokens；Starlight 主题变量覆盖 |
| 博客 permalink 变更 | SEO 下跌 | 第一期保留旧路径或完整 301 |
| 多语言一次迁不全 | 工期失控 | 先 zh-cn 上线能力，再批量语言 |
| 双品牌配置分叉 | 长期维护成本 | 强制单一 brand config，禁止复制内容树 |
| 静态资源/过滤器体积过大 | 构建与发布变慢 | 评估 `filters/` 是否仍需挂在营销站 |
| 翻译流水线未同步改造 | 出现脏翻译或漏译 | 同步更新 translator 输入输出目录约定 |

## 15. 目录级内容迁移清单（第一期）

### 必迁

1. `content/zh-cn/_index.md` → 首页文案组件源
2. `content/zh-cn/docs/**`
3. `content/zh-cn/blog/**`
4. `content/zh-cn/pages/pricing/index.html` → `PricingPage`
5. `content/zh-cn/pages/my-service/index.html` → `MyServicePage`
6. `i18n/zh-cn.yaml` → `src/i18n/zh-cn.json`
7. `config/_default/menus.zh-cn.yaml` → nav config
8. `static/robots.txt`、百度验证文件、必要 favicon/视频

### 评估后决定

1. `static/filters/**`：是否改由 list/产品站托管
2. `static/services/**`：保留静态 JSON 或改 API
3. `layouts/partials/help.html`：迁为共享组件
4. 其他语言内容：导入 vs 重新翻译生成

### 不迁入 Astro

1. 租户实例站点主题
2. Hugo `public-*` 构建产物
3. Docsy module 本身

## 16. 已确认决策

| 项 | 决策 | 日期 |
| --- | --- | --- |
| 博客 URL | 保留 `/blog/:year/:month/:day/:slug/` | 2026-10-23 |
| 定价/我的服务路径 | 改为 `/pricing/`、`/my-service/`，旧 `/pages/*` 做 301 | 2026-10-23 |
| 第一期语言 | 5 种语言一起迁：`zh-cn` / `zh-hk` / `en-us` / `ko-kr` / `ja-jp` | 2026-10-23 |
| 包管理器 | npm（与现网 `www.nullprivate.com` 保持一致） | 2026-10-23 |
| 下一步 | 初始化 Astro + Starlight 脚手架 | 2026-10-23 |
| 脚手架状态 | 已初始化，`build:nullprivate` / `build:adguardprivate` 通过 | 2026-10-23 |

### 路径兼容要求

1. 新站主路径：`/pricing/`、`/my-service/`
2. 兼容跳转：
   - `/pages/pricing/` → `/pricing/`
   - `/pages/my-service/` → `/my-service/`
3. 博客继续输出日期 permalink，避免既有外链与搜索结果失效。
4. 当前 Starlight 默认内容路径为 `/guides/*`；`/docs/` 暂做入口跳转。后续需决定：
   - 继续用 Starlight 默认路径并 301 `/docs/*` → 新路径，或
   - 调整路由/内容映射，保持现网 `/docs/*`

## 17. 推荐下一步

1. 迁入现网定价页完整下单流到 `PricingPage`。
2. 明确文档最终挂载路径（保持 `/docs/*` 优先）。
3. 编写内容迁移脚本，导入 5 语言 docs/blog。
4. 接入 Cloudflare Pages / OSS 上传脚本与预览域。

---

## 附录 A. 与现网命令对照

| 现网 | 新站目标 |
| --- | --- |
| `npm run serve:zh-cn:dev` | `pnpm dev` |
| `npm run build:nullprivate` | `pnpm build:nullprivate` |
| `npm run build:adguardprivate` | `pnpm build:adguardprivate` |
| `npm run upload_r2` | `pnpm upload:r2` |
| `npm run upload_aliyun` | `pnpm upload:aliyun` |
| `npm run baidu:push` | `pnpm baidu:push` |

## 附录 B. 成功后的仓库关系

```text
nullprivate/
  www.nullprivate.com/     # 迁移完成前保留；完成后可归档
  nullprivate-web/         # 新生产站点
  adguard_private_backend/ # API / 支付 / 回跳页，不变
  nullprivate-list/        # 列表站，继续外链
```

本蓝图确认后，脚手架初始化应只发生在 `nullprivate-web/`，不直接改现网 Hugo 生产链路。


## 18. 执行进度（2026-10-23）

### 已完成

1. Starlight 内容挂载到 `/docs/*`（5 语）
2. `PricingPage` 对齐现网关键下单流：选套餐、邀请码校验、支付请求、loading、iframe
3. `scripts/migrate-content.mjs` 支持 zh-cn / all / dry-run，并已导入 5 语
4. 预览上传：
   - `upload:r2:preview`
   - `upload:r2:preview:adguardprivate`
   - `upload:aliyun:preview`
5. `build:nullprivate` 已验证通过（含 docs/pricing/blog）

### 待完成

1. `MyServicePage` 完整迁移
2. 博客图片/附件与多语言 permalink
3. 生产域名切流与旧 Hugo 下线策略
