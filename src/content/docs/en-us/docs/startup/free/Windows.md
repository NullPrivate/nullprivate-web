---
title: "Windows"
description: "A detailed guide on how to configure encrypted DNS on Windows"
sidebar:
  order: 13
---

## Versions after Windows 11 21H2

Windows 11 versions after 21H2 start supporting native DNS over HTTPS (DoH). You can enable it using the following method:

1. Open `Settings`
2. Open `Network & Internet`
3. Open `Ethernet`
4. Find `DNS server assignment`, click `Edit`
   1. Select `Manual`
   2. Enter `111.229.178.206` in the `Preferred DNS server` IPv4 field
   <!-- IPv6 address is `2408:4005:3de:8500:4da1:169e:dc47:1707` -->
   3. DNS over HTTPS (DoH) selection: On (Manual template)
   4. Enter `https://public.adguardprivate.com/dns-query` in the `DoH template` field
   5. **Do not** check `Use unencrypted requests on failure`
   6. You can optionally enter `223.5.5.5` (Alibaba Cloud Public DNS Service) as the `Alternate DNS server`, with `DNS over HTTPS off`, and check `Use unencrypted requests on failure`.

> The free version currently only provides IPv4. If you need to use `IPv6`, please consider a paid private service.

<!--
## Versions after Windows 11 24H2

Windows 11 versions after 24H2 support native DNS over HTTPS (DoH) and DNS over TLS (DoT) encrypted DNS. The method to enable DoH is the same as [Versions after Windows 11 21H2](#versions-after-windows-11-21h2). You can enable DoT using the following method:

1. Open `Settings`
2. Open `Network & Internet`
3. Open `Ethernet`
4. Find `DNS server assignment`, click `Edit`
   1. Select `Manual`
   1. Enter `111.229.178.206` in the `Preferred DNS server` field, with `DNS over HTTPS (DoH)` off, **do not** check `Use unencrypted requests on failure`
   1. You can optionally enter `223.5.5.5` (Alibaba Cloud Public DNS Service) as the `Alternate DNS server`, with `DNS over HTTPS off`, and **check** `Use unencrypted requests on failure`.
   1. Execute the following commands to enable DoT

```powershell
netsh dns add global dot=yes
netsh dns show global
netsh dns add encryption server=111.229.178.206 dothost=public.adguardprivate.com:853 autoupgrade=yes
netsh dns show encryption
``` -->

## Windows 10 and Earlier Versions

Windows 10 and earlier versions do not support native encrypted DNS, but if you are using newer **browsers** like Chrome/Edge or other browsers based on the Chromium engine, you can set up `DoH` encrypted DNS in the browser. Here is how to set it up in Chrome:

1. Open Chrome browser `Settings`
1. Open `Privacy, search, and services`
1. Scroll to `Security`
1. Enable `Use secure DNS to specify how to look up the network address of a website`
1. Enter `https://public.adguardprivate.com/dns-query` in the `Choose service provider` field
