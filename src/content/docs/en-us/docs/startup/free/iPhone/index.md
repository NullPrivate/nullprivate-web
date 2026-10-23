---
title: "iPhone"
---

---
layout: docs
title: iPhone
draft: false
categories: Guide
tags: [Guide, iOS, DNS Encryption, Security Configuration]
date: 2024-04-15 22:48:16 +0800
toc: true
comments: false
weight: 12
description: Detailed guide on configuring DNS encryption on iPhone
---

## Feature Overview

Starting from iOS 14, iPhone natively supports encrypted DNS features including:
- DNS over HTTPS (DoH) - Encrypts DNS queries via HTTPS protocol
- DNS over TLS (DoT) - Encrypts DNS queries via TLS protocol

These features effectively protect your network privacy and prevent DNS hijacking.

## Configuration Steps

### 1. Download Configuration File
Use Safari browser to download the configuration file: [dot.mobileconfig](../dot.mobileconfig)

### 2. Install Configuration File
1. Open the `Settings` app
2. Go to `General` > `VPN & Device Management`
3. Select and install the **public.adguardprivate.com DoT** configuration profile

## Special Notes

If you have enabled iCloud Private Relay, you need to:
- Manually disable this feature in Settings, or
- Download and install this configuration file: [disable-icloud-private-relay.mobileconfig](../disable-icloud-private-relay.mobileconfig)

> ⚠️ **Security Warning**  
> Exercise extreme caution when installing configuration profiles. The profiles provided on this site are solely for legitimate privacy protection and ad-blocking services.  
> Do not install configuration profiles from unknown sources as this may compromise your device security.

## Configuration Demo Video

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281117331.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
