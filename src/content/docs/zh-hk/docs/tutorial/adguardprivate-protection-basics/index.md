---
title: "NullPrivate基本原理"
---

---
layout: docs
title: NullPrivate基本原理
draft: false
categories: 指南
tags: [指南, tutorial, dns, privacy]
date: 2025-01-15 17:02:25 +0800
toc: true
comments: false
weight: 2
description: 透過DNS層面的攔截，NullPrivate能有效阻止廣告、追蹤器和惡意網站
---

## 工作原理概述

NullPrivate透過DNS層面的攔截來保護您的網絡安全和私隱。它就像一個智能守門人，對所有域名請求進行篩查：

- ✅ 安全網站：正常訪問
- ❌ 廣告域名：攔截
- ❌ 追蹤器：攔截
- ❌ 惡意網站：攔截

## 攔截流程圖解

![NullPrivate攔截基本原理](/images/docs-tutorial-adguardprivate-protection-basics-202501151802544.svg)

## 主要特點

1. **DNS級別攔截**：在請求發生前就進行攔截，更高效
2. **無需安裝插件**：網絡層面的保護，對所有設備都有效
3. **低資源消耗**：只處理DNS請求，對設備性能影響極小
4. **全設備覆蓋**：一次配置，保護所有接入設備
