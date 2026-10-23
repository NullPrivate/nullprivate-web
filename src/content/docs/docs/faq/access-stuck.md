---
title: "访问部分网站速度较慢"
description: "使用 NullPrivate DNS 时部分网站访问速度较慢的原因分析和解决方案，主要涉及 ECS（Extended Client Subnet）功能的支持问题"
---

## 访问部分视频网站速度较慢

如果您在使用 NullPrivate 时发现访问某些网站速度较慢，这可能是由于以下原因：

**ECS 支持:**

NullPrivate 的免费版本不支持 ECS（Extended Client Subnet）功能。 ECS 是一种 DNS 协议扩展，允许 DNS 服务器根据客户端的网络位置提供更准确的 DNS 响应。 许多 CDN（内容分发网络）使用 ECS 来将用户定向到最近的服务器，从而提高速度。免费版服务器位于上海和杭州, 

**影响:**

- **速度较慢:** 在没有 ECS 的情况下，NullPrivate 可能无法将您定向到最佳的 CDN 服务器，从而导致速度较慢。
- **地理位置不准确:** 您可能会被定向到距离您较远的服务器，从而增加延迟。

**解决方案:**

- **升级到付费版:** NullPrivate 的付费版本支持 ECS 功能，可以解决此问题并提高速度。
- **使用其他 DNS 服务器:** 您可以尝试使用支持 ECS 的其他 DNS 服务器。
