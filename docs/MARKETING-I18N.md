# 营销页面多语言与主题

## 内容与路由

- 简体中文源文案位于 `../src/i18n/zh-cn/`，按 `home`、`common`、`commerce` 分组。
- 其他四语词典由 `project-translator-cli` 生成，构建读取已生成文件。
- 默认语言 URL 保持 `/`、`/pricing/`、`/my-service/`、`/blog/`；其他语言增加 `en-us`、`zh-hk`、`ja-jp`、`ko-kr` 前缀。
- 首页、导航、商务组件和博客框架使用当前语言；第三方支付页面、后端消息由对应服务提供。
- 博客复用现有译文，以移除语言前缀后的内容 ID 对应文章。有效 `pubDate` 决定日期路由；语言菜单对缺少可发布译文的文章回退到该语言列表，hreflang 只声明真实文章。

## 翻译

工作目录：`nullprivate-web/`。

在本地安全环境中提供 `TRANSLATION_API_ENDPOINT`、`TRANSLATION_MODEL` 和 `CLIPROXYAPI_API_KEY` 后执行：

```bash
npm run translate:marketing
# 只处理一种语言
npm run translate:marketing -- en-us
```

脚本先验证配置，运行翻译，再检查结构化汇总。临时配置及缓存位于 Git 忽略目录 `.translation-cache/`；密钥仅通过环境变量读取。模型应从实际供应商可用模型列表中选择。首次执行由 npx 获取 CLI；网络与供应商调用依照本地环境配置。

更新源文件后重新运行翻译；保持对象键、href、slug、占位符与数组结构。生成结果可人工审阅，修改需求回到中文源与翻译提示。

## 主题与图标

- 主题 token 集中于 `../src/styles/marketing.css`，限定在 `html[data-marketing]`，与文档样式隔离。
- 使用 Starlight 的 `starlight-theme` 存储键，值为 `light`、`dark`，空字符串代表跟随系统。
- head 内预绘制脚本应用主题，存储不可用时使用系统偏好。
- 导航图标由静态 `NavIcon.astro` 输出，图标辅助文字并对屏幕阅读器隐藏。
- 现有品牌图标继续使用 `/favicon.svg`；开源入口指向 `https://github.com/NullPrivate/NullPrivate`。

## 验证

```bash
npm run typecheck
npm run build:all
npm run test:homepage
npm run test:marketing
```

集成测试覆盖五语词典结构、插值参数、技术标识、双品牌营销路径和首页内部链接。浏览器验收覆盖主题刷新保留、文档共享偏好、语言菜单、长文本与移动布局；支付验收可使用独立测试环境和模拟响应。

当前已有部分博客译文 frontmatter 缺少有效日期，构建输出具体文件提示。内容迁移时优先补齐源元数据并重新生成对应译文。
