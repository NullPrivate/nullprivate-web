---
title: "iOS设备恢复设置"
---

---
layout: docs
title: iOS裝置恢復設定
draft: false
categories: 指南
tags: [指南, FAQ, iOS, DNS設定]
date: 2025-01-28 11:27:37 +0800
toc: true
comments: false
weight: 0
description: 本文介紹如何在iOS裝置上恢復DNS設定的方法
---

如果您在iOS裝置上遇到誤攔截問題，可以通過以下兩種方式恢復原始DNS設定。

## 方案一：臨時關閉DNS加密

此方法適用於臨時測試是否由DNS設定引起問題：

1. 打開`設定`應用
2. 進入`一般` > `VPN與裝置管理`
3. 在`存取限制和代理`部分找到`DNS`選項
4. 選擇`自動`即可暫時恢復系統預設設定

## 方案二：完全移除配置

如需徹底移除DNS加密設定：

1. 打開`設定`應用
2. 進入`一般` > `VPN與裝置管理`
3. 在`配置描述檔`下找到`public.adguardprivate.com DoT`
4. 點擊`移除描述檔`並確認

> 如果您決定永久不再使用NullPrivate，那一定是我們的服務給您帶來了不好的體驗，非常抱歉給您帶來的困擾。  
> 公共服務使用了流行的攔截規則，由於人力的有限，我們無法知曉所有App的漏攔截或誤攔截情況。  
> 如果您希望能自訂規則以適應個性化需求，可以考慮購買私有服務，私有服務以極高的性價比提供了專用的服務，以滿足各種需求。

## 配置演示

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281147590.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
