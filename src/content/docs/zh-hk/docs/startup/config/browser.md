---
title: "浏览器"
---

---
layout: docs
title: 瀏覽器
draft: false
categories: 指南
tags: [指南, startup]
date: 2024-10-23 18:25:24 +0800
toc: false
comments: false
weight: 15
description: 'Chrome/Edge 等 Chromium 瀏覽器啟用 DoH：開啟「安全 DNS」，填寫專屬 DoH 端點，獲得更強私隱與穩定解析。'
---

Chromium 79+ 的瀏覽器版本支援 `DoH`，以下是 Chromium 系 (Chrome/Edge/360/QQ等) 瀏覽器的設定方法：

1.  開啟 Chrome 瀏覽器「設定」
2.  開啟「私隱、搜尋和服務」
3.  滑動到「安全性」
4.  啟用「使用安全的 DNS 指定如何尋找網站的網絡地址」
5.  在「選擇服務供應商」中填入 `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1`，其中 `{xxxxxxxxxxxxxxxx}` 是您的專用加密 DNS 服務用戶名，`browser1` 是您的瀏覽器編號。
