# nullprivate-web

宁屏 / NullPrivate 与 AdGuardPrivate **官网唯一源码和维护入口**。采用 Astro 静态输出、Starlight 文档、React Islands、Tailwind 与 Pagefind，双品牌共享五语内容。

旧 `../www.nullprivate.com/` Hugo 仓库保留历史；日常编辑与构建直接使用本仓库。本轮仅完成两仓本地文件调整，尚未生效到线上，也未操作线上平台。生产由用户自行创建的 Cloudflare Pages / ESA Pages 项目直连本仓库 Git，线上仍可能是旧发布，实际状态以平台部署记录与域名绑定为准。

## 开发与验证

工作目录：本仓库根目录。Node.js 24，npm。

```bash
npm ci
npm run dev
npm run build:all
npm test
npm run typecheck
```

默认开发地址为 `http://localhost:4321`，默认品牌为 `nullprivate`，通过 `BRAND=adguardprivate` 切换。

| 品牌 | 单独构建 | 产物 | 生产域名 | 平台 |
| --- | --- | --- | --- | --- |
| NullPrivate | `npm run build:nullprivate` | `dist/nullprivate` | `https://www.nullprivate.com` | Cloudflare Pages |
| AdGuardPrivate | `npm run build:adguardprivate` | `dist/adguardprivate` | `https://www.adguardprivate.com` | ESA Pages |

## 维护位置

- 文档、博客：`src/content/`；源语言 `zh-cn`，其余四语通过翻译流水线生成。
- 页面与组件：`src/pages/`、`src/components/`。
- 文档侧栏：`src/config/docs-sidebar.mjs`，链接显示名来自 frontmatter。
- 页面使用的图片、视频、服务 JSON 与平台重定向配置：`public/`。
- 品牌域名、文案与主题：`brands/`。
- robots：`src/pages/robots.txt.ts`，按品牌指向 `/sitemap-index.xml`。

保留 `/blog/:year/:month/:day/:slug/`、`/docs/*` 与公开资源原路径；`/pages/pricing/`、`/pages/my-service/` 提供兼容跳转。静态托管的 HTTP 重定向差异见迁移说明。

## 生产部署

用户在两个平台分别创建 Pages 项目，连接本仓库 Git，生产分支选 `main`。根目录使用仓库默认根目录，Node.js 24，安装命令 `npm ci`，构建命令与产物目录见上表。`BRAND` 已由 npm 脚本内置，无需另外设置。

`.github/workflows/deploy.yml` 仅在 PR、`main` push 和手动触发时执行双品牌构建、测试、类型检查；无需云端发布 secrets 或上传环境变量。生产发布由平台 Git 集成负责，CI 验证与平台构建独立运行，不构成自动发布门禁。平台授权在各平台完成，GitHub 工作流不执行 Wrangler/rclone 生产上传。

用户需手动完成新平台项目的 Git 连接、构建验收及域名切换，并在 Cloudflare 控制台停用仍绑定旧仓库的 Pages 自动构建。旧仓库本地归档 workflow/npm/任务的改动不会自动停用平台 Git 集成。可选历史预览工具与生产 Pages 项目分离。

- [生产部署](docs/DEPLOY-PRODUCTION.md)
- [预览部署](docs/DEPLOY-PREVIEW.md)
- [资源迁移、历史退役与兼容清单](docs/SITE-MIGRATION.md)
- [历史迁移蓝图](docs/ASTRO-MIGRATION-BLUEPRINT.md)

## 历史内容导入

`scripts/migrate-content.mjs` 仅作为显式手动导入工具保留，读取相邻历史仓库。日常构建直接使用已迁入内容，与旧目录独立。

```bash
# 人工导入前先审阅；正式导入可能覆盖现有内容及图片
npm run migrate:content:dry
```

## 本地 API 联调

本地 Vite 的 `/api/v1` 代理默认连接生产 API；`?api=stage` 使用 stage API。仅开发静态 UI 时使用测试数据；需要真实支付联调时先确认环境与操作范围。
