---
title: "Public Services"
description: "Free public service guide: encrypted DNS access rules for basic ad-blocking and privacy protection, selection advice, and enabled subscription lists."
sidebar:
  order: 2
---

We provide free public services and have curated a set of widely-used domain lists.

## Public Service Rules

The public service employs balanced ad-blocking rules; false positives or misses may occur. The rule lists are:

- [AdGuard DNS filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt)
- [AdGuard DNS Popup Hosts filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt)
- [CHN: AdRules DNS List](https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt)
- [CHN: anti-AD](https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt)
- [AWAvenue Ads Rule](https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt)
- [WindowsSpyBlocker](https://adguardteam.github.io/HostlistsRegistry/assets/filter_23.txt)
- [anti-AD](https://anti-ad.net/adguard.txt)
- [easylist](https://anti-ad.net/easylist.txt)
- [OISD Blocklist Small](https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt)

Some users configure extra protection for elderly family members, so we also include security-blocking rules:

- [HaGeZi's Threat Intelligence Feeds](https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt)
- [HaGeZi's Badware Hoster Blocklist](https://adguardteam.github.io/HostlistsRegistry/assets/filter_55.txt)

Additionally, the public service includes the following rules to block stubborn ads on certain phones that cannot be removed by conventional means:

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

## Usage Notes

Because the public service is intended for the general population, it cannot accommodate personalized needs. Some users complain that ad-blocking is insufficient, while others report that false positives prevent game logins. We apologize that the public service cannot satisfy everyone; content that some view as ads may be useful information to others. In such cases, we tend to prioritize users who consider it useful.

When a false positive prevents WeChat or Alipay mini-programs from loading, simply disable the phone’s encrypted DNS setting temporarily to access the required service. However, based on our operational experience, many users do not know what to do when a service fails to work properly, so we must consider non-technical users’ experience.

Users familiar with DNS who encounter false positives or insufficient blocking should consider [purchasing a private service](pages/price).

Private services offer **access logs**, **blocking logs**, **statistics**, **custom rules**, **authoritative resolution**, and more to meet individual needs.

For other common requests, 

## Setup Instructions by Platform

### Android

Android has natively supported DNS over TLS (`DoT`) since Android 9; phones released after 2019 are compatible. Enable it as follows:

1. Open `Settings`
2. Go to `More connections`
3. Open `Private DNS`
4. Choose `Private DNS provider hostname` and enter: `public.adguardprivate.com`

Self-hosted DNS can be implemented in many ways (e.g., AdGuard, dnsmasq, clash), but only native DoT has zero impact on phone performance. It requires no third-party apps, no permissions, no resources, and does not affect battery life. Therefore, native `DoT` encrypted DNS is recommended.

### iPhone

iOS 14 and later natively support DNS over HTTPS (DoH) and DNS over TLS (DoT). Enable it as follows:

1. Open Safari, download the profile: [dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2. Open **Settings**
3. Go to **General**
4. Open **VPN & Device Management**
5. Select **Install Profile**

### macOS

macOS Big Sur and later natively support DNS over HTTPS (DoH) and DNS over TLS (DoT). Enable it as follows:

1. Open Safari, download the profile: [dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2. Open **System Preferences**
3. Go to **Network**
4. Select **VPN & Device Management**
5. Choose **Install Profile**

<!-- ### Windows

Windows 11 21H2 and later natively support DNS over HTTPS (`DoH`). Enable it as follows:

1. Open `Settings`
2. Go to `Network & Internet`
3. Open `Ethernet`
4. Locate `DNS server assignment`, click `Edit`
    1. Select `Manual`
    2. In `Preferred DNS server` IPv4 enter: `111.229.178.206`
    3. Set DNS over HTTPS (DoH) to: On (manual template)
    4. In `DoH template` enter: `https://public.adguardprivate.com/dns-query`
    5. **Do not** check `Fallback to plaintext`
    6. For the alternate DNS server you can optionally use `223.5.5.5` (Alibaba Public DNS) with `DNS over HTTPS Off` and check `Fallback to plaintext`.

### Chromium-based browsers (79+)

If you prefer not to enable system-wide encrypted DNS, or you are using Windows 10 or earlier, you can configure encrypted DNS only in the browser. Chromium 79+ supports `DoH`. For Chromium-based browsers (Chrome/Edge/360/QQ, etc.) do the following:

1. Open Chrome `Settings`
2. Go to `Privacy, search, and services`
3. Scroll to `Security`
4. Enable `Use secure DNS to specify how to look up the network address for websites`
5. In `Choose service provider` enter: `https://public.adguardprivate.com/dns-query`  -->
