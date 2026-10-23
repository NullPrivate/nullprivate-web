---
title: "公共服务"
description: "公共免费服务说明：基础广告拦截与隐私保护的加密 DNS 接入规则、选择建议与已启用的订阅列表。"
sidebar:
  order: 2
---

我们提供了免费的公共服务, 设置了一些被广泛使用域名列表.

## 公共服务规则

公共服务使用了较为均衡的广告拦截规则, 可能会存在误拦截或误放行, 规则列表如下:

- [AdGuard DNS filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt)
- [AdGuard DNS Popup Hosts filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt)
- [CHN: AdRules DNS List](https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt)
- [CHN: anti-AD](https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt)
- [AWAvenue Ads Rule](https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt)
- [WindowsSpyBlocker](https://adguardteam.github.io/HostlistsRegistry/assets/filter_23.txt)
- [anti-AD](https://anti-ad.net/adguard.txt)
- [easylist](https://anti-ad.net/easylist.txt)
- [OISD Blocklist Small](https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt)

一些用户会给老人设置保护, 因此我们还使用了一些安全拦截规则, 规则列表如下:

- [HaGeZi's Threat Intelligence Feeds](https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt)
- [HaGeZi's Badware Hoster Blocklist](https://adguardteam.github.io/HostlistsRegistry/assets/filter_55.txt)

此外公共服务还有以下规则, 以拦截某手机上常规手段无法处理的牛皮藓:

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

## 使用注意事项

由于公共服务是给大多数人使用, 因此不能带有个性化的需求, 有用户抱怨广告拦截效果未达预期, 也有抱怨误拦截导致游戏登录问题. 很抱歉公共服务很难满足所有人的需求, 一些互联网内容在一部分人看来是广告, 但在另一部分人看来是有用的信息, 这种情况我们将倾向优先满足将其视为有用信息的用户。

当出现误拦截, 导致微信支付宝小程序的加载问题时, 只需要暂时关闭手机的加密DNS设置, 即可打开需要的服务. 但根据我们的运营经验, 很多用户不了解需要的服务无法正常运行时要如何处理, 我们必须照顾到非专业用户的使用体验。

对了解DNS的用户, 如果存在误拦截, 或者拦截无法满足需求, 请考虑[购买私有服务](pages/price).

私有服务提供了**访问记录**, **拦截记录**, **统计信息**, **自定义规则**, **权威解析** 等功能, 以满足个性化需求.

如有其它大众需求, 

## 各平台设置方法

### Android

Android 自 Android 9 以后开始原生支持 DNS over TLS(`DoT`)，2019 年以后的手机都支持。您可以通过以下方法开启：

1.  打开`设置`
2.  打开`更多连接`
3.  打开`加密DNS`
4.  选中`指定加密DNS服务`, 填入: `public.adguardprivate.com`

自建 DNS 服务有各种实现方式, 如 AdGuard, dnsmasq, clash 等, 只有原生 DoT 是对手机性能开销 0 影响, 它不依赖任何三方应用, 不需要任何权限, 不占用任何资源, 也不会影响手机的电量。所以推荐使用原生 `DoT` 加密 DNS。

### iPhone

iOS 14 以上版本支持原生 Dns over HTTPS(DoH)和 DNS over TLS(DoT)加密 DNS, 您可以通过以下方法开启：

1.  打开自带浏览器 Safari, 下载配置文件: [dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  打开**设置**
3.  打开**通用**
4.  打开**VPN 和设备管理**
5.  选中**安装配置文件**

### macOS

macOS Big Sur 以上版本支持原生 Dns over HTTPS(DoH)和 DNS over TLS(DoT)加密 DNS, 您可以通过以下方法开启：

1.  打开自带浏览器 Safari, 下载配置文件: [dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  打开**系统偏好设置**
3.  打开**网络**
4.  选中**VPN 和设备管理**
5.  选中**安装配置文件**

<!-- ### Windows

Windows 11 21H2 之后的版本支持原生 Dns over HTTPS(`DoH`), 您可以通过以下方法开启：

1.  打开`设置`
2.  打开`网络和Internet`
3.  打开`以太网`
4.  找到`DNS服务器分配`, 点击`编辑`
    1.  选择`手动`
    2.  在`首选DNS服务器` IPv4 中填入: `111.229.178.206`
    3.  DNS over HTTPS(DoH)选择: 开(手动模板)
    4.  在`DoH模板`中填入: `https://public.adguardprivate.com/dns-query`
    5.  **不要**勾选`失败时使用未加密请求`
    6.  备选 DNS 服务器您可以选填`223.5.5.5`(阿里云公共 DNS 服务), `DNS over HTTS 关`, 勾选`失败时使用未加密请求`.

### Chromium 系浏览器(79+)

如果不希望引入系统级的加密 DNS，或者使用的 Windows 10 及以前的版本, 可以只在浏览器中设置加密 DNS, Chromium 79+的浏览器版本支持`DoH`, 以下是 Chromium 系(Chrome/Edge/360/QQ 等)浏览器的设置方法:

1.  打开 Chrome 浏览器`设置`
2.  打开`隐私、搜索和服务`
3.  滑动到`安全性`
4.  启用`使用安全的 DNS 指定如何查找网站的网络地址`
5.  在`选择服务提供商`中填入: `https://public.adguardprivate.com/dns-query`  -->
