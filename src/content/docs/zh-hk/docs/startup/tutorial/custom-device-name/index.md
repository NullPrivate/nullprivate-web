---
title: "使用自定义设备名"
---

---
layout: docs
title: 使用自訂裝置名稱
draft: false
categories: 指南
tags: [指南, tutorial]
date: 2025-01-03 15:56:04 +0800
toc: false
comments: false
weight: 0
description: '為裝置自訂識別名稱：透過擴展域名/URL路徑區分終端，精確查看「客戶端排行」和日誌，便於規則與時間表管理。'
---

如果直接使用服務的監聽地址，例如：

- `tls://xxxxxxxx.adguardprivate.com`
- `https://xxxxxxxx.adguardprivate.com/dns-query`

在後台看到的`客戶端排行`的IP是負載平衡器的叢集IP，對用戶無意義，無法區分不同裝置。

![客戶端排行](/images/docs-startup-tutorial-custom-device-name-202501031714999.png)

可以透過`擴展域名`和`增加URL路徑`的方式來識別不同裝置。

![自訂客戶端名稱](/images/docs-startup-tutorial-custom-device-name-202501031714031.png)

- DoT使用擴展域名方式，例如`tls://device1.xxxxxxxx.adguardprivate.com`
- DoH使用增加URL路徑方式，例如`https://xxxxxxxx.adguardprivate.com/dns-query/device2`

注意：

- 安卓裝置設定時不需要輸入協議前綴 `tls://`，只需要輸入 `device1.xxxxxxxx.adguardprivate.com`
- 蘋果裝置在設定指導中，輸入客戶端ID，下載設定檔以進行設定，無需手動輸入

![蘋果裝置設定指導](/images/docs-startup-tutorial-custom-device-name-202501031715127.png)

> 個人服務的所有裝置共享服務的查詢限制每秒`30`次請求。
