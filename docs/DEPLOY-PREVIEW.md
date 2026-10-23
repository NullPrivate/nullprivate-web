# 预览域与上传

## 构建

```bash
npm run build:nullprivate
npm run build:adguardprivate
```

产物：

- `dist/nullprivate/`
- `dist/adguardprivate/`

## Cloudflare Pages（nullprivate 预览）

```bash
npm run upload:r2:preview
```

默认读取 `wrangler.jsonc`，上传 `dist/nullprivate`。

adguardprivate 预览可使用：

```bash
npm run upload:r2:preview:adguardprivate
```

建议预览域名：

- `astro-preview.nullprivate.com`
- `astro-preview.adguardprivate.com`

## 阿里云 OSS（adguardprivate）

复用现网 rclone 配置（推荐符号链接或 CI secret）：

```bash
# 本地可先链接现网配置
ln -s ../www.nullprivate.com/rclone.conf ./rclone.conf

npm run upload:aliyun:preview
```

默认目标（可按环境变量覆盖）：

- 本地源：`dist/adguardprivate/`
- 远端：`aliyun_oss_hangzhou:www-adguardprivate-com-astro-preview`

生产切流前，请先使用独立 preview bucket / 子目录，不要直接覆盖现网 `www-adguardprivate-com`。

## 环境变量

| 变量 | 用途 |
| --- | --- |
| `RCLONE_CONFIG` | rclone 配置路径 |
| `OSS_PREVIEW_TARGET` | OSS 预览目标，如 `aliyun_oss_hangzhou:bucket/prefix` |
