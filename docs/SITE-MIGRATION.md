# 官网资源迁移与历史退役

## 唯一维护源

官网页面、文档与公开资源统一维护在 `nullprivate-web`。`www.nullprivate.com` 保留 Hugo 历史供追溯与显式人工导入。`migrate-content.mjs` 保留手动工具身份，日常 build/test/deploy 直接使用本仓库内容；该工具会复制旧站图片和视频目录，确需重新导入时应重新审计资产引用，并按本页范围核对资源差异。

目标生产域名为 `www.nullprivate.com`（Cloudflare Pages）与 `www.adguardprivate.com`（ESA Pages）。用户自行创建项目连接新仓库 Git，由平台发布对应品牌全量产物；CI 仅验证，无需发布 secrets，也不执行 Wrangler/rclone 生产上传。具体设置见 [生产部署](DEPLOY-PRODUCTION.md)。当前只有两仓本地改动，未生效到线上，线上仍可能是旧发布。

## 公开资产核对

按新官网实际引用保留 **1 个迁入服务列表（17,038 字节）**，以及已有的 5 个视频文件。此前为旧站 URL 兼容迁入的 30 个过滤文件已删除；本轮进一步删除 20 个无引用媒体文件，以及维护者确认移除的 7 个特殊资源（2 个百度验证文件、游戏列表、服务 schema、开发者白名单、品牌预览页和旧 ICO）。这些已移除资源的旧 URL 不再提供，也不设置兼容重定向。

| 路径 | 文件数 | 字节数 | 处理 |
| --- | ---: | ---: | --- |
| `public/services/i18n/zh-cn.json` | 1 | 17,038 | 文档实际引用的服务列表 |
| `public/videos/*.mp4` | 5 | 23,696,548 | 与已有新版文件完全一致，保留原文件 |
| `robots.txt` | 1 | 旧版 560 | 使用品牌动态生成端点替代旧固定域名版本 |

逐文件路径、长度与 SHA-256 见 [site-migration-assets.json](site-migration-assets.json)，覆盖 6 项迁入或保留资产。`public/` 现有 59 个文件：58 个通过页面及资源依赖链使用，另有平台读取的 `_redirects`。实际使用的媒体和 `favicon.svg` 保留。

本轮依据源码、双品牌生成页面、CSS/JS 及公共资源间的传递引用进行清理；迁移清单和测试中的提及不作为业务引用。百度验证文件由维护者确认删除，如后续需要站长验证，按平台提供的新验证方式单独配置。

审计还发现多语言页面原有的 25 个图片目标路径不存在（主要为翻译改变了文件名），与本轮删除无关。后续应独立修正翻译中的资源链接，并验证页面媒体目标。

复制范围仅限已核对的普通公开文件；旧 Git 元数据、子模块 `.git`、符号链接及配置凭据均未导入。旧 `rclone.conf` 未读取或复制。

## robots

旧 robots 固定引用 NullPrivate 的 `/sitemap.xml` 与 `/zh-cn/sitemap.xml`，且专用爬虫分组可能覆盖通用限制。现由 `src/pages/robots.txt.ts` 使用品牌配置生成统一爬虫规则，保留 `/admin/`、`/api/`、`/private/`、JSON 与查询参数索引限制，指向对应品牌实际生成的 `/sitemap-index.xml`。JSON 抓取限制不影响资源正常 HTTP 访问。

## 历史退役

- 旧工作流仅接受 `workflow_dispatch`，只输出归档提示，无构建、上传或自动 push/tag 发布步骤。
- 旧 VS Code 上传任务仅执行 `scripts/archive-notice.cjs`，保留 Hugo 本地构建任务。
- 打开旧目录时的自动百度推送已停用，历史手动工具保留。
- 旧 README、AGENTS、deploy、部署说明、CLAUDE 和 SEO 入口明确历史归档状态。
- 旧 `package.json` 的 `upload_aliyun` 与 `upload_r2` 均改为 `node scripts/archive-notice.cjs`，只显示归档提示。
- 以上为本地文件状态；用户提交推送后才会更新远端仓库。用户还需在 Cloudflare 控制台停用绑定旧仓库的 Pages 自动构建，该平台 Git 集成独立于旧 Actions，不能仅靠归档 workflow 停用。
- 新项目 Git 连接、构建验收与生产域名切换均由用户手动完成；本次没有线上操作。

## URL 兼容与待办

### 已实现并纳入产物测试

- 清单中的 6 项公开资产保持原根路径。
- `/pages/pricing/` → `/pricing/`、`/pages/my-service/` → `/my-service/`，保留静态 meta refresh 兼容页与 `_redirects` 声明。
- 五语文档入口可生成；双品牌 robots 使用各自域名与实际 sitemap 文件。

### 后续确认

1. **未检出子模块**：旧 `.gitmodules` 声明 `static/adguardprivate-filters`，本地没有内容。此次未联网拉取；该路径历史订阅 URL 的完整性待维护者提供公开快照或确认其已退役。
2. **平台重定向**：Cloudflare Pages 与 ESA Pages 的规则能力分别确认；不能假定 ESA Pages 按 Cloudflare `_redirects` 执行 HTTP 301。静态兼容页可导航，但严格状态码需平台规则配置与验收。本次未访问生产验证平台行为。
3. **历史语言前缀**：旧 Hugo `/zh-cn/docs/*`、`/zh-cn/blog/*`、各语言 `/pages/*` 与新路由的全量映射尚未在此次范围内补齐；需结合历史 URL 清单处理，不以抽样兼容冒充全量验收。
4. **旧 sitemap URL**：新的 robots 使用 `/sitemap-index.xml`；旧 `/sitemap.xml`、`/zh-cn/sitemap.xml` 的重定向及站长平台提交地址待独立确认。
5. **全量资产与旧线上资源**：平台发布对应品牌完整产物，兼容资源应明确包含在新源码和产物中，不能依赖旧存储残留对象。旧线上项目、对象存储与域名绑定的保留或清理由用户在 URL 对账后单独审核。

## 测试与交接

工作目录：`nullprivate-web`。

```bash
# 无需构建产物的源资源检查
node --test --test-name-pattern='源资源' scripts/test-site-migration.mjs
npm run typecheck

# 双品牌构建后执行完整迁移验收
npm run build:all
node --test scripts/test-site-migration.mjs
```

完整测试读取真实构建产物，校验 SHA-256、资源复制、品牌 robots 与 sitemap、兼容入口。测试本身只使用新仓库及临时目录；源码独立性检查覆盖正常构建命令与页面内容引用。独立检出环境的完整构建仍由新仓库 CI 验证。
