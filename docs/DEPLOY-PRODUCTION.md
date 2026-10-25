# 生产部署

`nullprivate-web` 是两个品牌官网的唯一源码与维护入口。用户自行在 Cloudflare Pages / ESA Pages 创建项目并连接本仓库 Git，由平台构建和发布全量静态资产。旧 Hugo 仓库只作历史归档，正常构建不依赖相邻仓库。

**当前仅完成本地文件调整，未创建或修改线上项目、连接 Git、切换域名或执行上传。线上仍可能是旧发布。** 实际状态以各平台部署记录、发布版本和域名绑定为准，GitHub Actions 成功不代表生产已发布。

## 平台构建设置

| 设置 | NullPrivate | AdGuardPrivate |
| --- | --- | --- |
| 平台 | Cloudflare Pages | ESA Pages |
| 生产域名 | `www.nullprivate.com` | `www.adguardprivate.com` |
| Git 来源 | `nullprivate-web` 仓库 | 同左 |
| 生产分支 | `main` | `main` |
| 根目录 | 默认仓库根目录（留空或 `.`） | 同左 |
| Node.js | 24（在平台构建环境中选择） | 同左 |
| 安装命令 | `npm ci` | `npm ci` |
| 构建命令 | `npm run build:nullprivate` | `npm run build:adguardprivate` |
| 输出目录 | `dist/nullprivate` | `dist/adguardprivate` |

品牌已内置于 npm 构建脚本，无需另设 `BRAND` 或其他品牌环境变量。平台 Git 授权由用户在平台完成，GitHub CI 不需要发布 secrets，也不使用 Wrangler/rclone 生产上传或 OSS sync/copy 流程。

## CI 只验证

`.github/workflows/deploy.yml` 虽保留历史文件名，但仅在 PR、`main` push 和手动触发时以只读仓库权限执行：

1. 安装 Node.js 24 与 `npm ci`。
2. `npm run build:all`。
3. `npm test`。
4. `npm run typecheck`。

CI 与平台 Git 构建独立运行，当前没有“CI 通过才触发平台发布”的自动门禁。用户应在合并生产分支前确认验证结果；平台发布策略在平台项目内管理。

## 用户手动交接

1. 审阅、提交并推送两仓改动；本地文件修改本身不会改变远端工作流或线上状态。
2. 按上表在两个平台创建项目并连接 **新仓库** Git，确认实际安装日志为 `npm ci`、Node 为 24，并检查双品牌产物。
3. 使用平台预览地址验收页面、搜索、品牌域名、公开资产与兼容入口，核对 [迁移清单](SITE-MIGRATION.md) 中的待办。
4. 在 Cloudflare 控制台停用仍绑定 **旧仓库** 的 Pages 自动构建。旧 Actions 归档并不会停用独立的平台 Git 集成；其他旧平台自动发布入口也由用户核查停用。
5. 由用户手动将生产域名绑定切换至新项目，按平台要求调整 DNS，并确认 TLS、路由与品牌对应关系。
6. 记录生效部署版本、域名切换结果与兼容验收结果；旧线上资源的保留或清理作为独立审核事项。

上述步骤是待用户执行的交接说明，本次没有进行任何线上操作。

## 本地验证

工作目录：新仓库根目录。Node.js 24。

```bash
npm ci
npm run build:all
npm test
npm run typecheck
node --test scripts/test-site-migration.mjs
```

平台发布完整的对应品牌产物，而非向旧 OSS 目录增量复制。公开资源应明确包含在新源码与产物中。预览边界见 [预览部署](DEPLOY-PREVIEW.md)。

## 迁移验收

- 两品牌 robots 指向各自产物中的 `/sitemap-index.xml`。
- `node --test scripts/test-site-migration.mjs` 验证公开资源 SHA-256、双品牌产物复制和已实现的兼容页。
- 平台级 HTTP 301、历史语言路径、旧 sitemap 和未检出子模块的兼容待办见 [迁移清单](SITE-MIGRATION.md)。
- Cloudflare Pages 与 ESA Pages 的重定向能力以各自配置及实际响应为准，静态兼容页与平台 HTTP 301 分别验收。
- 本次变更仅完成本地源码与归档配置；实际线上是否已发布，以平台部署记录与域名绑定为准。
