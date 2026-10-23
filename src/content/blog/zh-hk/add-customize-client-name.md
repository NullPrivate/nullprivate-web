---
title: "推出自訂用戶端名稱功能"
description: "NullPrivate 推出自訂用戶端名稱功能，讓用戶可以更直觀地識別和管理不同裝置的 DNS 設定，大幅提升管理體驗。"
pubDate: "2024-12-29 14:01:19 +0800"
categories: 開發
tags: [開發, DoT, DoH, DNS設定]
---

## 功能介紹

為提升用戶體驗，NullPrivate 現已支援自訂用戶端名稱功能。透過這項功能，您可以為不同裝置設定獨特的識別名稱，使裝置管理更加直觀和便捷。

![用戶端管理介面](/images/blog-add-customize-client-name-Sgg2AdobuU.png)

## 設定指南

根據不同裝置類型，設定方式略有不同：

### Android 裝置

只需在域名前添加自訂前綴即可，格式如下：
```
{裝置名稱}.{原有域名}
```
示例：`xiaomi-15pro.xxxxxxxx.nullprivate.com`

### iOS 裝置

1. 進入「設定指導」頁面
2. 在「用戶端ID」輸入框中填入自訂名稱
3. 下載並應用新的設定檔

![iOS設定介面](/images/blog-add-customize-client-name-202412291426394.png)

### 瀏覽器設定（DoH）

在原有 DoH 地址後添加自訂標識：

原有格式：
```
https://xxxxxxxx.nullprivate.com/dns-query
```

新格式：
```
https://xxxxxxxx.nullprivate.com/dns-query/{裝置標識}
```

示例：`https://xxxxxxxx.nullprivate.com/dns-query/pc1-browser`

![瀏覽器設定示例](/images/blog-add-customize-client-name-202412291434042.png)

## 使用建議

- 裝置名稱建議使用有意義的標識，如裝置型號、位置或用途
- 避免使用特殊字符，建議使用字母、數字和連字號
- 保持命名規範統一，便於後期管理

## 注意事項

- 自訂名稱僅影響顯示，不會影響服務效能
- 修改名稱後需要重新應用設定才能生效
- 建議保存好各裝置的設定資訊，以便日後參考
