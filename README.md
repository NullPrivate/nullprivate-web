# nullprivate-web

宁屏 / NullPrivate 新一代静态站点（Astro + Starlight）。

现网 Hugo 站点仍在 `../www.nullprivate.com/`。本目录先并行建设，确认后再切流。

## 文档

- [Astro 完整迁移蓝图](docs/ASTRO-MIGRATION-BLUEPRINT.md)
- [预览域与上传](docs/DEPLOY-PREVIEW.md)

## 技术栈

- Astro（`output: static`）
- Starlight（文档 + Pagefind）
- React + TypeScript Islands
- Tailwind CSS v4
- 双品牌：`nullprivate` / `adguardprivate`

## 已确认决策

- 博客 URL：保留 `/blog/:year/:month/:day/:slug/`
- 定价/我的服务：`/pricing/`、`/my-service/`；旧 `/pages/*` 301
- 文档挂载：`/docs/*`
- 第一期语言：5 语一起迁
- 包管理：npm

## 常用命令

```bash
npm install
npm run dev
npm run build:nullprivate
npm run build:adguardprivate
npm run build:all

# 内容迁移
npm run migrate:content          # zh-cn
npm run migrate:content:all      # 5 语
npm run migrate:content:dry

# 预览上传
npm run upload:r2:preview
npm run upload:r2:preview:adguardprivate
npm run upload:aliyun:preview
```

开发默认品牌为 `nullprivate`。通过 `BRAND=adguardprivate` 切换。

## 当前进度

- [x] Starlight 挂到 `/docs/*`
- [x] 完整定价下单流迁入 `PricingPage`（邀请码校验、支付 loading、iframe）
- [x] 内容迁移脚本，已导入 5 语 docs/blog
- [x] Cloudflare / OSS 预览上传脚本与配置
- [x] 我的服务完整查询/续费流
- [ ] 博客多语言路由与图片资源迁移
- [ ] 生产切流与现网替换

## 产物

- `dist/nullprivate/`
- `dist/adguardprivate/`


## 文档图片

Hugo 的 `assets/images` 会同步到 `public/images`。

```bash
# 迁移内容时自动同步
npm run migrate:content -- --lang all

# 或手动同步
rsync -a ../www.nullprivate.com/assets/images/ public/images/
```

文档中统一使用绝对路径 `/images/...`。

## 本地联调支付

```bash
npm run dev
# 打开
# http://127.0.0.1:4330/pricing/?api=prod
# http://127.0.0.1:4330/my-service/?api=prod
```

说明：

- 本地默认通过 Vite 代理 `/api/v1` 到生产 API，避免 CORS。
- `?api=stage` 走 `/api/stage/v1`；当前 stage 支付接口返回 404。
- 支付成功后回跳仍由后端 `pay_return_new/pay_return_renew` 承接；前端提供“已支付，去我的服务查询”。


## 文档导航

文档侧栏使用 `src/config/docs-sidebar.mjs` 手动分组，避免暴露英文目录名。
