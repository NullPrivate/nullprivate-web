---
title: "设置信任的服务商"
---

---
layout: docs
title: 設定信任的服務商
draft: false
categories: 指南
tags: [指南, faq]
date: 2024-11-12 22:24:38 +0800
toc: false
comments: false
weight: 0
description: null
---

付費服務創建時，預設使用國內較快的上游服務，包括阿里的IPv4和IPv6及DoT服務。

一些服務商可能存在解析錯誤問題，將一些海外網站解析到錯誤的IP地址，造成無法訪問。常見的表現是瀏覽器報證書錯誤。

如果需要避免解析錯誤，可以更換上游服務商，使用`Cloudflare`的服務，使用這類服務時，請確保使用的是`DoH`或`DoT`協議，以免被劫持。

同時，還需要關閉國內的上游服務，因為它們離得近，速度更快，AdGuard會優先使用它們。

在對應的服務IP前加上`#`即可禁用該上游服務。

![避免解析錯誤](/images/docs-startup-tutorial-trusted-vendor-202501031710444.png)

設定好後，需要`測試上游`以確保上游伺服器可用，確認可用後`應用`。

![避免解析錯誤-應用](/images/docs-startup-tutorial-trusted-vendor-202501031711475.png)

但是，只使用海外服務，會導致國內各App的訪問體驗下降，因為國內的App通常將供海外的解析設定到特定的對外伺服器，國內訪問速度較慢。

如果您只需要避免常用服務的解析錯誤，可以自行將被解析錯誤的域名指定特定的解析地址，未指定的域名仍然使用預設的國內上游服務。

在AdGuard控制台中，選中 `設定` -> `DNS 設定` -> `上游DNS伺服器`，將被解析錯誤的域名以`[/example1.com/example2.com/]tls://1.0.0.1`的格式添加到 `自訂DNS伺服器` 中，然後點擊 `儲存設定` 即可。

![設定上游伺服器](/images/docs-startup-tutorial-trusted-vendor-202411261430607.png)

![設定上游伺服器](/images/docs-startup-tutorial-trusted-vendor-202501031712566.png)

`public2.adguardprivate.svc.cluster.local` 是我們內部提供的無解析錯誤解析，上游選擇了*Cloudflare*，相較於用戶自行指定海外上游，有更快的解析速度，代價是域名解析更新時會產生少量的延遲。如果用戶沒有專業需求，都可以使用我們提供的無解析錯誤解析。

如果需要使用*Cloudflare*或*Google*的外部解析地址，需要指定IP使用DoT/DoH，可參考使用：

```
#tls://1.1.1.1
tls://1.0.0.1
tls://[2606:4700:4700::1111]
tls://[2606:4700:4700::1001]
tls://[2606:4700:4700::64]
tls://[2606:4700:4700::6400]
https://1.1.1.1/dns-query
https://1.0.0.1/dns-query
https://[2606:4700:4700::1111]/dns-query
https://[2606:4700:4700::1001]/dns-query
#tls://8.8.8.8
#tls://8.8.4.4
tls://[2001:4860:4860::8888]
tls://[2001:4860:4860::8844]
tls://[2001:4860:4860::64]
tls://[2001:4860:4860::6464]
#https://8.8.8.8/dns-query
#https://8.8.4.4/dns-query
#https://[2001:4860:4860::8888]/dns-query
https://[2001:4860:4860::8844]/dns-query
```

> 其中`#`註釋的地址表示已被防火牆攔截，暫時無法使用。

**本站全棧支援IPv6，這是我們的優勢之一**，可以使用IPv6地址的上游，獲得更穩定的解析速度。
