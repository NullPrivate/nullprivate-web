---
title: "Windows"
---

---
layout: docs
title: Windows
draft: false
categories: 指南
tags: [指南]
date: 2024-04-15 22:48:16 +0800
toc: true
comments: false
weight: 13
description: 'Windows 配置 DoH/DoT 加密 DNS：系統級設定與瀏覽器內置 DoH 方案，確保廣告攔截與私隱保護穩定生效。'
---

## Windows 11

Windows 11 21H2 之後開始支援原生 Dns over HTTPS(DoH)，您可以透過以下方法開啟：

1. 開啟「設定」
2. 開啟「網絡和網際網絡」
3. 開啟「乙太網絡」
4. 找到「DNS伺服器分配」，點擊「編輯」
   1. 選擇「手動」
   2. 在「首選DNS伺服器」IPv4中填入`120.26.96.167`，IPv6地址為`2408:4005:3de:8500:4da1:169e:dc47:1707`
   3. DNS over HTTPS(DoH)選擇：開（手動模板）
   4. 在「DoH模板」中填入`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/windows1`，`{xxxxxxxxxxxxxxxx}`是您的加密DNS服務用戶名，`windows1`是您的操作系統編號。
   5. **不要**勾選「失敗時使用未加密請求」
   6. 備選DNS伺服器您可以選填`223.5.5.5`（阿里雲公共DNS服務），「DNS over HTTPS 關」，勾選「失敗時使用未加密請求」。

## Windows 10 及更早版本

Windows 10 及更早版本不支援原生加密DNS，但您可能使用了較新的**瀏覽器**如 Chrome/Edge 及各種使用 Chromium 內核的瀏覽器（360/QQ等國產瀏覽器），那麼您可以在瀏覽器中設定使用`DoH`加密DNS。以下是 Chrome 瀏覽器的設定方法：

1. 開啟 Chrome 瀏覽器「設定」
2. 開啟「私隱、搜尋和服務」
3. 滑動到「安全性」
4. 啟用「使用安全的 DNS 指定如何查找網站的網絡地址」
5. 在「選擇服務供應商」中填入`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1`，`{xxxxxxxxxxxxxxxx}`是您的加密DNS服務用戶名，`browser1`是您的瀏覽器編號。

其他瀏覽器請參考各自的設定方法，一般在「設定」→「私隱」→「安全」中可以找到相關設定。
