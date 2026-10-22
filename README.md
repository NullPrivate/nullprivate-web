# nullprivate-web

宁屏 / NullPrivate 新一代静态站点（Astro + Starlight）。

现网 Hugo 站点仍在 `../www.nullprivate.com/`。本目录先并行建设，确认后再切流。

## 文档

- [Astro 完整迁移蓝图](docs/ASTRO-MIGRATION-BLUEPRINT.md)

## 技术栈

- Astro（`output: static`）
- Starlight（文档 + Pagefind）
- React + TypeScript Islands
- Tailwind CSS v4
- 双品牌：`nullprivate` / `adguardprivate`

## 已确认决策

- 博客 URL：保留 `/blog/:year/:month/:day/:slug/`
- 定价/我的服务：`/pricing/`、`/my-service/`；旧 `/pages/*` 301
- 第一期语言：5 语一起迁
- 包管理：npm

## 常用命令

```bash
npm install
npm run dev
npm run build:nullprivate
npm run build:adguardprivate
npm run build:all
```

开发默认品牌为 `nullprivate`。通过 `BRAND=adguardprivate` 切换。

## 当前脚手架已包含

- 营销首页 `/`
- 定价页骨架 `/pricing/`（含 `select_plan` / `begin_checkout` 事件坑位）
- 我的服务占位 `/my-service/`
- 旧路径兼容 `/pages/pricing/`、`/pages/my-service/`
- Starlight 多语言文档种子页
- `dist/<brand>/` 品牌产物分发脚本

## 下一步

1. 把现网定价页完整下单流迁入 `PricingPage`
2. 迁移 `zh-cn` 文档/博客内容
3. 明确 Starlight 最终挂载为 `/docs/*` 还是保持 `/guides/*`
4. 接入 Cloudflare Pages / OSS 上传脚本
