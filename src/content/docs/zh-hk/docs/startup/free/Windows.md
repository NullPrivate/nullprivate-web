---
title: "Windows"
description: "詳細介紹如何在Windows上配置DNS加密"
sidebar:
  order: 13
---

## Windows 11 21H2 之後版本

Windows 11 21H2 之後開始支援原生Dns over HTTPS(DoH), 您可以透過以下方法開啟：

1. 開啟`設定`
2. 開啟`網路和網際網路`
3. 開啟`乙太網路`
4. 找到`DNS伺服器分配`, 點擊`編輯`
   1. 選擇`手動`
   2. 在`首選DNS伺服器` IPv4中填入`111.229.178.206`
   <!-- IPv6地址為`2408:4005:3de:8500:4da1:169e:dc47:1707` -->
   3. DNS over HTTPS(DoH)選擇: 開(手動模板)
   4. 在`DoH模板`中填入`https://public.adguardprivate.com/dns-query`
   5. **不要**勾選`失敗時使用未加密請求`
   6. 備選DNS伺服器您可以選填`223.5.5.5`(阿里雲公共DNS服務), `DNS over HTTS 關`, 勾選`失敗時使用未加密請求`.

> 免費版本目前僅提供IPv4, 如果您需要使用`IPv6`訪問請考慮付費私有服務.

<!--
## Windows 11 24H2 之後版本

Windows 11 24H2 之後版本支援原生Dns over HTTPS(DoH)和Dns over TLS(DoT)加密DNS, 開啟DoH方法同[Windows 11 21H2 之後版本](#windows-11-21h2-之後版本). 您可以透過以下方法開啟 DoT：

1. 開啟`設定`
2. 開啟`網路和網際網路`
3. 開啟`乙太網路`
4. 找到`DNS伺服器分配`, 點擊`編輯`
   1. 選擇`手動`
   1. 在`首選DNS伺服器`中填入`111.229.178.206`, `DNS over HTTPS(DoH)`選擇: 關, **不要**勾選`失敗時使用未加密請求`
   1. 備選DNS伺服器您可以選填`223.5.5.5`(阿里雲公共DNS服務), `DNS over HTTS 關`, **勾選**`失敗時使用未加密請求`.
   1. 執行以下命令開啟DoT

```powershell
netsh dns add global dot=yes
netsh dns show global
netsh dns add encryption server=111.229.178.206 dothost=public.adguardprivate.com:853 autoupgrade=yes
netsh dns show encryption
``` -->

## Windows 10 及更早版本

Windows 10 及更早版本不支援原生加密DNS, 但您可能使用了較新的**瀏覽器**如Chrome/Edge及各種使用了Chromium內核的瀏覽器, 那麼您可以在瀏覽器中設置使用`DoH`加密DNS. 以下是Chrome瀏覽器的設置方法:

1. 開啟Chrome瀏覽器`設置`
1. 開啟`隱私、搜尋和服務`
1. 滑動到`安全性`
1. 啟用`使用安全的 DNS 指定如何查找網站的網路地址`
1. 在`選擇服務提供商`中填入`https://public.adguardprivate.com/dns-query`
