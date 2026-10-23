---
title: "Windows"
description: "Windows configuration for DoH/DoT encrypted DNS: System-level settings and browser-built-in DoH solutions to ensure stable ad-blocking and privacy protection."
sidebar:
  order: 13
---

## Windows 11

Windows 11 (version 21H2 and later) natively supports DNS over HTTPS (DoH). You can enable it using the following method:

1. Open `Settings`
2. Navigate to `Network & Internet`
3. Select `Ethernet`
4. Under `DNS server assignment`, click `Edit`
   1. Select `Manual`
   2. For IPv4 `Preferred DNS`, enter `120.26.96.167`. For IPv6, use `2408:4005:3de:8500:4da1:169e:dc47:1707`
   3. Set `DNS over HTTPS` to: On (manual template)
   4. In `DoH template`, enter `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/windows1` where `{xxxxxxxxxxxxxxxx}` is your encrypted DNS service username and `windows1` is your OS identifier
   5. **Do not** check `Fallback to plaintext`
   6. For alternate DNS, you may optionally use `223.5.5.5` (Aliyun Public DNS) with `DNS over HTTPS` off and `Fallback to plaintext` checked

## Windows 10 and Earlier Versions

Windows 10 and earlier versions don't natively support encrypted DNS. However, modern browsers like Chrome/Edge and Chromium-based browsers (including Chinese browsers like 360/QQ) allow DoH configuration. Chrome setup instructions:

1. Open Chrome `Settings`
2. Navigate to `Privacy, search, and services`
3. Scroll to `Security`
4. Enable `Use secure DNS`
5. Under `Choose service provider`, enter `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1` where `{xxxxxxxxxxxxxxxx}` is your encrypted DNS username and `browser1` is your browser identifier

For other browsers, refer to their respective settings (usually under `Settings` > `Privacy` > `Security`).
