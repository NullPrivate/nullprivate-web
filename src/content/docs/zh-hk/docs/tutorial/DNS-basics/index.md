---
title: "DNS是什么"
---

---
layout: docs
title: DNS是什麼
draft: false
categories: 指南
tags: [指南, tutorial, DNS]
date: 2025-01-15 16:28:23 +0800
toc: true
comments: false
weight: 1
description: DNS（域名系統）是互聯網的基礎設施之一，本文介紹DNS的基本概念和工作原理
---

> 本質上，DNS服務就是一本新華字典, 通過查詢字典，我們可以找到域名對應的IP地址。

## DNS簡介

DNS（Domain Name System，域名系統）是互聯網的基礎設施之一，就像一本新華字典，負責將人類易讀的域名轉換為電腦可理解的IP地址。

![DNS解析原理](/images/docs-tutorial-DNS-basics-202501151801448.svg)

## DNS的工作原理

當你在瀏覽器中輸入一個網址時：

1. 瀏覽器首先檢查本地緩存
2. 若未找到，向DNS伺服器發起查詢
3. DNS伺服器返回對應的IP地址
4. 瀏覽器使用該IP地址訪問目標網站

## 重要概念

- **域名（Domain Name）**: 網站的可讀地址，如 `www.nullprivate.com`
- **URL（統一資源定位符）**: 完整的網址，包含協議、域名和路徑，如 `https://www.nullprivate.com`
- **IP地址**: 網絡設備的數字標識，如 `1.1.1.1`
- **DNS伺服器**: 提供域名解析服務的電腦
- **網站託管**: 將網站文件存儲在伺服器上，使其能夠通過互聯網訪問
