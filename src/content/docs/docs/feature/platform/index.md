---
title: "支持平台"
description: "\"宁屏\"支持的平台及配置指南"
sidebar:
  order: 120
---

## 支持的协议

"宁屏"支持以下加密 DNS 协议：

- **DoT (DNS over TLS)** - 通过 TLS 加密的 DNS 查询
- **DoH (DNS over HTTPS)** - 通过 HTTPS 加密的 DNS 查询

## 支持的平台

### Windows 11

- 支持系统级 DoH 配置
- 通过设置->网络和 Internet->DNS 服务器进行配置

### macOS (Big Sur 及以上)

- 支持系统级 DoH/DoT 配置
- 可通过系统偏好设置->网络进行配置

### iOS (14.0 及以上)

- 支持系统级 DoH/DoT 配置
- 可在设置->通用->VPN 与设备管理中配置

### Android (9.0 及以上)

- 支持系统级私有 DNS (DoT)
- 在设置->网络和互联网->私有 DNS 中配置

### 浏览器支持

- Chrome/Edge/Brave：支持 DoH
- Firefox：支持 DoH/DoT
- Safari：遵循系统 DNS 设置

详细配置说明请参考各平台具体配置指南。
