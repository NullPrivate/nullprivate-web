# 预览部署

工作目录：`nullprivate-web` 仓库根目录。生产流程以 [生产部署](DEPLOY-PRODUCTION.md) 为准。

## 平台 Git 预览

用户自行创建 Cloudflare Pages / ESA Pages 项目并连接本仓库 Git，再按平台能力配置预览分支与访问控制。构建根目录为默认仓库根目录，Node.js 24，安装命令 `npm ci`：

| 平台 | 构建命令 | 输出目录 |
| --- | --- | --- |
| Cloudflare Pages | `npm run build:nullprivate` | `dist/nullprivate` |
| ESA Pages | `npm run build:adguardprivate` | `dist/adguardprivate` |

品牌由脚本内置，无需额外品牌变量。GitHub Actions 只做构建、测试与类型检查，无需发布 secrets，不执行预览或生产上传。平台预览发布与 CI 独立运行。

预览验收覆盖首页、定价、服务查询界面、文档搜索、公开资产和兼容入口。涉及 API 的操作应先确认环境与授权范围。

## 可选历史预览工具

以下 npm 入口保留用于操作者明确选择的独立历史预览空间，**不是生产发布流程，也不是平台 Git 构建的前置条件**。它们会先构建再上传，本次没有执行。

| 命令 | 配置或目标 |
| --- | --- |
| `npm run upload:r2:preview` | `wrangler.jsonc`，NullPrivate 历史 Worker 预览 |
| `npm run upload:r2:preview:adguardprivate` | `wrangler.preview.adguardprivate.jsonc`，AdGuardPrivate 历史 Worker 预览 |
| `npm run upload:aliyun:preview` | 默认 `aliyun_oss_hangzhou:www-adguardprivate-com-astro-preview`，历史 OSS 预览 |

历史工具需要操作者单独准备本仓库 Wrangler 登录或独立 rclone 配置与 PATH 工具；不复用旧仓库凭据，也不要求在 GitHub CI 配置 secrets。实际运行前应审阅脚本与目标，并取得相应操作授权。

| 环境变量 | 用途 |
| --- | --- |
| `RCLONE_CONFIG` | 安全配置文件路径，相对路径以本仓库根目录解析 |
| `OSS_PREVIEW_TARGET` | 自定义独立预览 bucket/prefix |

预览产物使用品牌生产 canonical 和 robots sitemap；预览环境的访问控制和索引隔离由用户在平台配置。当前仅有本地改动，平台 Git 连接、旧 Pages 自动构建停用和生产域名切换均由用户手动完成，线上仍可能是旧发布。
