---
title: "Windows"
description: "详细介绍如何在Windows上配置DNS加密"
sidebar:
  order: 13
---

## Windows 11 21H2 之后版本

Windows 11 21H2 之后开始支持原生Dns over HTTPS(DoH), 您可以通过以下方法开启：

1. 打开`设置`
2. 打开`网络和Internet`
3. 打开`以太网`
4. 找到`DNS服务器分配`, 点击`编辑`
   1. 选择`手动`
   2. 在`首选DNS服务器` IPv4中填入`111.229.178.206`
   <!-- IPv6地址为`2408:4005:3de:8500:4da1:169e:dc47:1707` -->
   3. DNS over HTTPS(DoH)选择: 开(手动模板)
   4. 在`DoH模板`中填入`https://public.adguardprivate.com/dns-query`
   5. **不要**勾选`失败时使用未加密请求`
   6. 备选DNS服务器您可以选填`223.5.5.5`(阿里云公共DNS服务), `DNS over HTTS 关`, 勾选`失败时使用未加密请求`.

> 免费版本目前仅提供IPv4, 如果您需要使用`IPv6`访问请考虑付费私有服务.

<!--
## Windows 11 24H2 之后版本

Windows 11 24H2 之后版本支持原生Dns over HTTPS(DoH)和Dns over TLS(DoT)加密DNS, 开启DoH方法同[Windows 11 21H2 之后版本](#windows-11-21h2-之后版本). 您可以通过以下方法开启 DoT：

1. 打开`设置`
2. 打开`网络和Internet`
3. 打开`以太网`
4. 找到`DNS服务器分配`, 点击`编辑`
   1. 选择`手动`
   1. 在`首选DNS服务器`中填入`111.229.178.206`, `DNS over HTTPS(DoH)`选择: 关, **不要**勾选`失败时使用未加密请求`
   1. 备选DNS服务器您可以选填`223.5.5.5`(阿里云公共DNS服务), `DNS over HTTS 关`, **勾选**`失败时使用未加密请求`.
   1. 执行以下命令开启DoT

```powershell
netsh dns add global dot=yes
netsh dns show global
netsh dns add encryption server=111.229.178.206 dothost=public.adguardprivate.com:853 autoupgrade=yes
netsh dns show encryption
``` -->

## Windows 10 及更早版本

Windows 10 及更早版本不支持原生加密DNS, 但您可能使用了较新的**浏览器**如Chrome/Edge及各种使用了Chromium内核的浏览器, 那么您可以在浏览器中设置使用`DoH`加密DNS. 以下是Chrome浏览器的设置方法:

1. 打开Chrome浏览器`设置`
1. 打开`隐私、搜索和服务`
1. 滑动到`安全性`
1. 启用`使用安全的 DNS 指定如何查找网站的网络地址`
1. 在`选择服务提供商`中填入`https://public.adguardprivate.com/dns-query`
