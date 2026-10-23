---
title: "Windows"
description: "Windows 配置 DoH/DoT 加密 DNS：系统级设置与浏览器内置 DoH 方案，确保广告拦截与隐私保护稳定生效。"
sidebar:
  order: 13
---

## Windows 11

Windows 11 21H2 之后开始支持原生Dns over HTTPS(DoH), 您可以通过以下方法开启：

1. 打开`设置`
2. 打开`网络和Internet`
3. 打开`以太网`
4. 找到`DNS服务器分配`, 点击`编辑`
   1. 选择`手动`
   2. 在`首选DNS服务器` IPv4中填入`120.26.96.167`, IPv6地址为`2408:4005:3de:8500:4da1:169e:dc47:1707`
   3. DNS over HTTPS(DoH)选择: 开(手动模板)
   4. 在`DoH模板`中填入`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/windows1`, `{xxxxxxxxxxxxxxxx}`是您的加密DNS服务的用户名,`windows1`是您的操作系统编号。
   5. **不要**勾选`失败时使用未加密请求`
   6. 备选DNS服务器您可以选填`223.5.5.5`(阿里云公共DNS服务), `DNS over HTTS 关`, 勾选`失败时使用未加密请求`.

## Windows 10 及更早版本

Windows 10 及更早版本不支持原生加密DNS, 但您可能使用了较新的**浏览器**如Chrome/Edge及各种使用了Chromium内核的浏览器(360/QQ等国产浏览器), 那么您可以在浏览器中设置使用`DoH`加密DNS. 以下是Chrome浏览器的设置方法:

1. 打开Chrome浏览器`设置`
2. 打开`隐私、搜索和服务`
3. 滑动到`安全性`
4. 启用`使用安全的 DNS 指定如何查找网站的网络地址`
5. 在`选择服务提供商`中填入`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1`, `{xxxxxxxxxxxxxxxx}`是您的加密DNS服务的用户名,`browser1`是您的浏览器编号。

其它浏览器请参考各自的设置方法, 一般在`设置`-`隐私`-`安全`中可以找到相关设置.
