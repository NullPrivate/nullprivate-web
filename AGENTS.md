# AGENTS.md

本目录是宁屏 / NullPrivate 的 Astro 新站点工作区。

## 当前阶段

- 以迁移蓝图为准：`docs/ASTRO-MIGRATION-BLUEPRINT.md`
- 脚手架已初始化：Astro + Starlight + React + Tailwind
- 现网生产站点仍在 `../www.nullprivate.com/`（Hugo）
- 未完成切流前，不替换现网发布链路

## 本地命令

- `npm run dev`
- `npm run build:nullprivate`
- `npm run build:adguardprivate`

## 技术方向

- Astro 静态输出
- React + TypeScript Islands（定价、我的服务、少量动效）
- MDX 内容
- Tailwind + Design Tokens
- Starlight 文档
- Pagefind 搜索
- 双品牌同内容源：`nullprivate` / `adguardprivate`

## 内容与语言

- 源语言只维护 `zh-cn`
- 其他语言通过翻译流水线生成
- 优先保持现网关键 URL，尤其是 `/pages/pricing/` 与文档路径

## 推荐做法

- 品牌差异放进 `brands/*` 配置，不复制两套内容树
- 支付与查询逻辑集中在 React 组件，避免页面内联脚本扩散
- 动效只用于首屏与定价决策区
- 凭证与 rclone/wrangler 密钥走本地忽略文件或 CI secrets

## 完成迁移前的协作边界

- 内容编辑若仍服务现网，继续改 `../www.nullprivate.com/content/zh-cn/`
- 新站脚手架、组件、构建脚本只在本目录推进


## 内容迁移

- `npm run migrate:content`：导入 zh-cn
- `npm run migrate:content:all`：导入 5 语
- 源目录：`../www.nullprivate.com/content/<lang>/`
- 目标：
  - docs → `src/content/docs[/lang]/docs/**`
  - blog → `src/content/blog/<lang>/**`

## 上传

- 预览说明见 `docs/DEPLOY-PREVIEW.md`
- Cloudflare：`wrangler.jsonc` / `wrangler.preview.adguardprivate.jsonc`
- OSS：复用现网 rclone 二进制与配置，目标默认 preview bucket/prefix


## 文档导航

- 文档侧栏使用 `src/config/docs-sidebar.mjs` 手动分组，避免暴露英文目录名。
- 页面链接显示名取 frontmatter `title` / `sidebar.label`。
