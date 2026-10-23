---
title: "支援平台"
description: "\"寧屏\"支援的平台及配置指南"
sidebar:
  order: 120
---

## 支援的協議

"寧屏"支援以下加密 DNS 協議：

- **DoT (DNS over TLS)** - 透過 TLS 加密的 DNS 查詢
- **DoH (DNS over HTTPS)** - 透過 HTTPS 加密的 DNS 查詢

## 支援的平台

### Windows 11

- 支援系統級 DoH 配置
- 透過設定->網絡與網際網路->DNS 伺服器進行配置

### macOS (Big Sur 及以上)

- 支援系統級 DoH/DoT 配置
- 可透過系統偏好設定->網絡進行配置

### iOS (14.0 及以上)

- 支援系統級 DoH/DoT 配置
- 可在設定->一般->VPN 與裝置管理中配置

### Android (9.0 及以上)

- 支援系統級私有 DNS (DoT)
- 在設定->網絡與網際網路->私有 DNS 中配置

### 瀏覽器支援

- Chrome/Edge/Brave：支援 DoH
- Firefox：支援 DoH/DoT
- Safari：遵循系統 DNS 設定

詳細配置說明請參考各平台具體配置指南。
