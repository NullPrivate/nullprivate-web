---
title: "使用 list.adguardprivate.com 创建防沉迷清单"
description: "通过 list.adguardprivate.com 选择微博和 TikTok，生成防沉迷直链，并添加到宁屏防沉迷服务配置源的完整操作指南。"
pubDate: "2026-08-15T21:00:00+08:00"
slug: "list-adguardprivate-anti-addiction-guide"
categories: ["DNS", "使用指南"]
tags: ["防沉迷", "list.adguardprivate.com", "AdGuard Home", "DNS"]
---

[list.adguardprivate.com](https://list.adguardprivate.com) 用于从已收录的互联网服务中选择目标，生成可供宁屏防沉迷功能加载的规则清单。本指南以微博和 TikTok 为例，说明网页操作、生成结果的含义，以及如何将生成的直链保存到服务配置源。

> 生成的直链包含账号标识和服务选择信息。不要把完整直链、浏览器 Cookie、登录令牌或密码贴到公开页面、Issue 或聊天记录中。

## 操作演示

下面的视频从选择微博和 TikTok 开始，随后生成防沉迷清单，进入宁屏的“防沉迷”页面，展开“显示配置源”，添加并保存清单直链，最后勾选两个服务并保存。红色波纹标记了点击位置。

<video style="width: 100%; max-width: 1440px; display: block; margin: 1rem auto;" controls preload="metadata">
  <source src="anti-addiction-weibo-tiktok.webm" type="video/webm">
  您的浏览器不支持视频播放。
</video>

[下载演示视频](anti-addiction-weibo-tiktok.webm)

## 网页操作

### 1. 在名单站选择服务

1. 打开 [list.adguardprivate.com](https://list.adguardprivate.com)。
2. 在搜索框分别搜索“微博”和“TikTok”。
3. 选择目标条目：`www.weibo.com` 与 `www.tiktok.com`。
4. 打开顶部的“名单生成器”，确认已选择 2 个服务。
5. 保持“防沉迷规则 (JSON)”选项，等待“生成的名单”出现 `blocked_services` JSON。

服务名可能相同，但服务 ID 不一定相同。以域名 ID 精确确认，可以避免将 `tiktok` 这样的同名条目误加入清单。

### 2. 获取防沉迷直链

在名单生成器中点击“获取链接”。此功能需要名单站已登录。生成后的防沉迷直链大致包含：

```text
/api/lists/anti-addiction?username=<账号标识>&ids=www.weibo.com,www.tiktok.com
```

请始终使用页面生成的完整链接，不要手动拼接 URL。网页预览会受“包含域名”和“包含广告域名”选项影响；而防沉迷直链由服务端生成，按服务 ID 返回相应规则。

### 3. 保存到宁屏服务配置源

1. 打开宁屏管理页面，进入“过滤器”中的“防沉迷”。
2. 点击“显示配置源”。
3. 点击“添加URL”。
4. 将名单站生成的防沉迷直链粘贴到“输入服务配置源URL”输入框。
5. 点击配置源面板里的 `save`，等待服务列表重新加载。
6. 勾选“微博”和“TikTok”。
7. 点击页面底部的“保存”。

配置源保存后，服务列表会按清单内的服务重建。此时微博与 TikTok 的内部 ID 是完整域名，因此应确认页面上显示的服务名称，而不要依赖旧的简写 ID。

## 验收方式

保存后重新进入“防沉迷”页面，检查以下内容：

- “服务配置源”中包含刚生成的防沉迷直链。
- 服务列表中存在“微博”和“TikTok”。
- 两个服务均为已勾选状态。
- 保存后刷新页面，勾选状态仍保留。

若服务列表为空，先检查配置源是否可访问，再确认名单站内的两个服务都已成功选中。若“获取链接”不可用，请重新登录名单站后再试。

## 常见问题

### 选择后名单仍为空

名单站使用浏览器本地存储保存已选择服务。请返回首页重新选择，进入名单生成器后确认顶部显示“已选择 2 个服务”，并等待服务详情加载完成。

### 配置源保存后服务列表变化

这是正常现象。宁屏会按配置源中可用的服务规则重新加载列表。保存后再勾选微博和 TikTok，并点击页面“保存”。

完成保存后，防沉迷规则会按照所选服务生效。
