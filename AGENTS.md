# AGENTS.md

本仓库是宁屏 / NullPrivate 与 AdGuardPrivate 官网的唯一源码与维护入口。

## 维护与发布

- 在本仓库维护页面、文档、公开资源、品牌配置与平台构建设置。
- `../www.nullprivate.com/` 作为 Hugo 历史归档，供追溯与显式手动导入使用。
- 生产说明以 [docs/DEPLOY-PRODUCTION.md](docs/DEPLOY-PRODUCTION.md) 为准；历史设计见 [迁移蓝图](docs/ASTRO-MIGRATION-BLUEPRINT.md)。
- GitHub Actions 在 PR、`main` push 和手动触发时执行双品牌构建、测试与类型检查，以只读权限和常规 Node 环境完成验证。
- 用户在 Cloudflare Pages 与 ESA Pages 自行创建项目并连接本仓库 Git，平台负责生产发布；CI 验证与平台构建独立运行。
- 用户手动完成域名切换，并在 Cloudflare 控制台停用绑定旧仓库的 Pages 自动构建；本地归档改动与平台设置分别交接。
- 当前交付为两仓本地文件调整，线上可能仍为旧发布；实际状态以平台部署记录和域名绑定为准。
- 平台根目录使用仓库默认根目录，Node.js 24，安装命令 `npm ci`；品牌由 npm 构建脚本内置。
- Cloudflare Pages 使用 `npm run build:nullprivate`，输出 `dist/nullprivate`；ESA Pages 使用 `npm run build:adguardprivate`，输出 `dist/adguardprivate`。
- 云端授权由平台 Git 集成管理；CI 使用常规构建环境即可完成验证。可选历史预览工具使用操作者独立配置与 PATH，预览空间与生产 Pages 项目分离。

## 本地命令

- `npm ci`
- `npm run dev`
- `npm run build:all`
- `npm test`
- `npm run typecheck`
- 构建后执行 `node --test scripts/test-site-migration.mjs`，验证公开资源与兼容入口。

## 技术与内容约定

- Astro 静态输出，Starlight 文档与 Pagefind 搜索，React + TypeScript Islands，Tailwind + Design Tokens。
- 品牌差异集中在 `brands/*`；双品牌共享内容源。
- 源语言维护 `zh-cn`，其他语言通过翻译流水线生成。
- 文档和博客维护于 `src/content/`，静态资源维护于 `public/`。
- 静态资源按新官网的实际用途维护，历史导入范围以当前资源清单和明确需求为准。
- 文档侧栏使用 `src/config/docs-sidebar.mjs` 手动分组；显示名称来自 frontmatter `title` / `sidebar.label`。
- 支付与服务查询逻辑集中在 React 组件；动效服务于首屏与定价决策。
- 保持实际使用的公开资产 URL、平台配置与 `/pages/pricing/`、`/pages/my-service/` 兼容入口；资源清理依据页面及配置的引用关系，外部消费入口按维护者确认的范围处理。
- robots 由 `src/pages/robots.txt.ts` 按品牌构建，引用实际生成的 `sitemap-index.xml`。
- 更新迁移资产时同步 `docs/site-migration-assets.json` 与相关正向集成测试。

## 历史导入

- `npm run migrate:content:dry` 用于显式审阅历史导入差异。
- `npm run migrate:content` / `npm run migrate:content:all` 作为人工选择的历史导入工具，使用前评估目标内容与图片覆盖范围。
- 日常构建、测试与部署直接使用本仓库已维护内容；单独检出本仓库即可完成。
