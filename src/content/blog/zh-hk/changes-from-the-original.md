---
title: "寧屏 - 基於AdGuard Home的增強版DNS服務"
description: "寧屏提供開箱即用的私隱保護DNS服務，支援廣告過濾、DoT、DoH等特性。相比原版AdGuard Home增加了SSL證書管理、安全特性優化、代理功能等企業級功能"
pubDate: "2025-01-20 19:36:59 +0800"
categories: [faq, 產品介紹]
tags: [faq, blog, dns, privacy, adguard, 私隱保護, 廣告攔截]
---

# 寧屏: 專注私隱保護的DNS服務

訪問官網了解更多: [寧屏](https://www.nullprivate.com)

本項目基於`AdGuard Home`進行二次開發，遵循 `GPL 3.0` 開源協議。

源代碼開放在：[GitHub - NullPrivate/NullPrivate](https://github.com/NullPrivate/NullPrivate)

## 功能增強

相比原版AdGuard Home，我們增加了以下特性：

- 📜 自動化SSL證書管理
  - 自動申請與更新證書
  - 支援泛域名證書配置
- 🛡️ 增強的安全特性
  - 智能限流保護
  - 優化的大陸地區訪問體驗
- ⚙️ 優化的系統配置
  - 禁用DHCP服務，專注DNS功能
- 🔄 支援DDNS
- 🌉 支援代理功能
  - 通過代理下載配置文件
  - 支援DoH/DoT代理
- 🚦 支援DNS分流功能
- 🚫 支援防沉迷app名單

## 託管服務優勢

我們提供專業的DNS託管服務，具有以下特點：

- 🏢 阿里雲杭州節點部署
- 🌐 全面的協議支援
  - IPv6支援，直連主流IPv6上游
  - DoT (DNS over TLS)
  - DoH (DNS over HTTPS)
  - HTTP/3 支援，顯著降低延遲
- 📊 強大的規則管理
  - 支援第三方黑白名單導入
  - 100萬條規則容量
- 📝 完善的日誌與統計
  - 72小時查詢記錄保留
  - 24小時詳細統計分析
- ⚖️ 負載均衡
  - 多伺服器分佈式部署
  - 智能負載分配
- 💰 具有競爭力的價格

## 性能與效果評估

DNS層面的廣告攔截具有其獨特優勢：

- 💪 優勢
  - 零額外功耗
  - 全設備覆蓋
  - 降低設備網絡喚醒頻率
  - 減少無效數據加載

- ⚠️ 局限性
  - 攔截精度低於瀏覽器插件
  - 無法達到MITM方案的過濾效果

特別適合移動設備使用場景，在保護私隱的同時兼顧設備續航。
