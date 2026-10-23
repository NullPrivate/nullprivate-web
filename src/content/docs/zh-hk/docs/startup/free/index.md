---
title: "公共服務"
description: "公共免費服務說明：基礎廣告攔截與私隱保護的加密 DNS 接入規則、選擇建議與已啟用的訂閱列表。"
sidebar:
  order: 2
---

我們提供了免費的公共服務，設定了一些被廣泛使用域名列表。

## 公共服務規則

公共服務使用了較為均衡的廣告攔截規則，可能會存在誤攔截或誤放行，規則列表如下：

- [AdGuard DNS filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt)
- [AdGuard DNS Popup Hosts filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt)
- [CHN: AdRules DNS List](https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt)
- [CHN: anti-AD](https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt)
- [AWAvenue Ads Rule](https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt)
- [WindowsSpyBlocker](https://adguardteam.github.io/HostlistsRegistry/assets/filter_23.txt)
- [anti-AD](https://anti-ad.net/adguard.txt)
- [easylist](https://anti-ad.net/easylist.txt)
- [OISD Blocklist Small](https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt)

一些用戶會給長者設定保護，因此我們還使用了一些安全攔截規則，規則列表如下：

- [HaGeZi's Threat Intelligence Feeds](https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt)
- [HaGeZi's Badware Hoster Blocklist](https://adguardteam.github.io/HostlistsRegistry/assets/filter_55.txt)

此外公共服務還有以下規則，以攔截某手機上常規手段無法處理的牛皮癬：

```
# huawei search && browser
hisearch-drcn.dt.dbankcloud.com
uc-drcn.hispace.dbankcloud.cn
connect-drcn.hispace.hicloud.com
adx-drcn.op.dbankcloud.cn
hisearch-static-drcn.dbankcdn.com
||configserver.hicloud.com
||configserver.platform.hicloud.com
||configdownload.dbankcdn.cn
||browsercfg-drcn.cloud.dbankcloud.cn
```

## 使用注意事項

由於公共服務是給大多數人使用，因此不能帶有個性化的需求，有用戶抱怨廣告攔截效果未達預期，也有抱怨誤攔截導致遊戲登入問題。很抱歉公共服務很難滿足所有人的需求，一些互聯網內容在一部分人看來是廣告，但在另一部分人看來是有用的資訊，這種情況我們將傾向優先滿足將其視為有用資訊的用戶。

當出現誤攔截，導致微信支付寶小程序的加載問題時，只需要暫時關閉手機的加密DNS設定，即可打開需要的服務。但根據我們的營運經驗，很多用戶不了解需要的服務無法正常運行時要如何處理，我們必須照顧到非專業用戶的使用體驗。

對了解DNS的用戶，如果存在誤攔截，或者攔截無法滿足需求，請考慮[購買私有服務](pages/price)。

私有服務提供了**訪問記錄**、**攔截記錄**、**統計資訊**、**自訂規則**、**權威解析**等功能，以滿足個性化需求。

如有其它大眾需求，

## 各平台設定方法

### Android

Android 自 Android 9 以後開始原生支援 DNS over TLS(`DoT`)，2019 年以後的手機都支援。您可以透過以下方法開啟：

1.  打開`設定`
2.  打開`更多連接`
3.  打開`加密DNS`
4.  選中`指定加密DNS服務`，填入：`public.adguardprivate.com`

自建 DNS 服務有各種實現方式，如 AdGuard、dnsmasq、clash 等，只有原生 DoT 是對手機性能開銷 0 影響，它不依賴任何三方應用，不需要任何權限，不佔用任何資源，也不會影響手機的電量。所以推薦使用原生 `DoT` 加密 DNS。

### iPhone

iOS 14 以上版本支援原生 Dns over HTTPS(DoH)和 DNS over TLS(DoT)加密 DNS，您可以透過以下方法開啟：

1.  打開自帶瀏覽器 Safari，下載設定檔：[dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  打開**設定**
3.  打開**一般**
4.  打開**VPN 和裝置管理**
5.  選中**安裝設定檔**

### macOS

macOS Big Sur 以上版本支援原生 Dns over HTTPS(DoH)和 DNS over TLS(DoT)加密 DNS，您可以透過以下方法開啟：

1.  打開自帶瀏覽器 Safari，下載設定檔：[dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  打開**系統偏好設定**
3.  打開**網絡**
4.  選中**VPN 和裝置管理**
5.  選中**安裝設定檔**

<!-- ### Windows

Windows 11 21H2 之後的版本支援原生 Dns over HTTPS(`DoH`)，您可以透過以下方法開啟：

1.  打開`設定`
2.  打開`網絡和Internet`
3.  打開`以太網`
4.  找到`DNS伺服器分配`，點擊`編輯`
    1.  選擇`手動`
    2.  在`首選DNS伺服器` IPv4 中填入：`111.229.178.206`
    3.  DNS over HTTPS(DoH)選擇：開(手動模板)
    4.  在`DoH模板`中填入：`https://public.adguardprivate.com/dns-query`
    5.  **不要**勾選`失敗時使用未加密請求`
    6.  備選 DNS 伺服器您可以選填`223.5.5.5`(阿里雲公共 DNS 服務)，`DNS over HTTS 關`，勾選`失敗時使用未加密請求`。

### Chromium 系瀏覽器(79+)

如果不希望引入系統級的加密 DNS，或者使用的 Windows 10 及以前的版本，可以只在瀏覽器中設定加密 DNS，Chromium 79+的瀏覽器版本支援`DoH`，以下是 Chromium 系(Chrome/Edge/360/QQ 等)瀏覽器的設定方法：

1.  打開 Chrome 瀏覽器`設定`
2.  打開`私隱、搜尋和服務`
3.  滑動到`安全性`
4.  啟用`使用安全的 DNS 指定如何查找網站的網絡地址`
5.  在`選擇服務提供商`中填入：`https://public.adguardprivate.com/dns-query`  -->
