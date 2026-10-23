---
title: "Android"
---

---
layout: docs
title: Android
draft: false
categories: Guide
tags: [Guide, Android, DNS Encryption, Privacy Protection]
date: 2024-10-20 15:46:31 +0800
toc: true
comments: false
weight: 11
description: Detailed instructions on configuring DNS encryption for various Android phone brands
---

## Feature Description

Android 9 and above natively support DNS over TLS (DoT) encryption, protecting DNS queries from eavesdropping and tampering.

## Setup Methods

Setup paths may vary across different phone brands. Here are specific steps for common brands:

### Xiaomi/Redmi Phones

1. Open `Settings`
2. Select `Connections & Sharing`
3. Click `Private DNS`
4. Choose `Private DNS provider hostname`
5. Enter: `public.adguardprivate.com`

### Samsung Phones

1. Open `Settings`
2. Select `Connections`
3. Click `More connection settings`
4. Choose `Private DNS`
5. Select `Private DNS provider hostname`
6. Enter: `public.adguardprivate.com`

### OPPO/OnePlus Phones

1. Open `Settings`
2. Select `Wi-Fi & Network`
3. Click `Private DNS`
4. Choose `Private DNS provider hostname`
5. Enter: `public.adguardprivate.com`

### Other Brands

Find related settings through:

- Searching "DNS" or "Private DNS" in Settings
- Checking network settings or advanced network options

## FAQs

### How to verify if settings are effective?

1. After setup, the system automatically verifies DNS server
2. If showing "Connected" or checkmark, the setup is successful

### Troubleshooting Failed Setup

1. Ensure the entered domain name is completely correct
2. Check network connection status
3. Confirm Android version compatibility (requires Android 9+)

## Setup Demo

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501272309210.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>
