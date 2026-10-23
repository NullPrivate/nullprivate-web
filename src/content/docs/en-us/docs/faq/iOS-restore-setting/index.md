---
title: "iOS设备恢复设置"
---

---
layout: docs
title: iOS Device Reset Settings
draft: false
categories: Guide
tags: [Guide, FAQ, iOS, DNS Settings]
date: 2025-01-28 11:27:37 +0800
toc: true
comments: false
weight: 0
description: This article explains how to reset DNS settings on iOS devices
---

If you encounter false blocking issues on iOS devices, you can restore original DNS settings through the following two methods.

## Option 1: Temporarily Disable DNS Encryption

This method is suitable for temporarily testing whether issues are caused by DNS settings:

1. Open the `Settings` app
2. Go to `General` > `VPN & Device Management`
3. Find the `DNS` option under `Access Restrictions & Proxy`
4. Select `Automatic` to temporarily restore system default settings

## Option 2: Complete Configuration Removal

To completely remove DNS encryption settings:

1. Open the `Settings` app
2. Go to `General` > `VPN & Device Management`
3. Find `public.adguardprivate.com DoT` under `Configuration Profiles`
4. Tap `Remove Profile` and confirm

> If you decide to permanently stop using NullPrivate, it must mean our service has caused you inconvenience. We sincerely apologize for any inconvenience caused.  
> Our public service uses popular blocking rules. Due to limited resources, we cannot track all cases of under-blocking or over-blocking for every app.  
> If you wish to customize rules for personalized needs, consider purchasing private service. Our private service offers dedicated solutions at exceptional value to meet various requirements.

## Configuration Demo

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281147590.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
