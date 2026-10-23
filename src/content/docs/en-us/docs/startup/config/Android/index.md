---
title: "Android"
---

---
layout: docs
title: Android
draft: false
categories: Guide
tags: [Guide, Android, Private DNS]
date: 2024-10-20 15:46:31 +0800
toc: true
comments: false
weight: 11
description: 'Android Private DNS Configuration Guide: Set `{device}.{username}.adguardprivate.com` to enable system-level encrypted DNS, reducing latency and enhancing privacy protection.'
---

## Configuration Steps

Setup instructions for different phone brands:

### Xiaomi/Redmi Phones

1. Open `Settings`
2. Select `Connections & Sharing`
3. Tap `Private DNS`
4. Choose `Private DNS Provider Hostname`
5. Enter: `xiaomi1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

### Samsung Phones

1. Open `Settings`
2. Select `Connections`
3. Tap `More Connection Settings`
4. Choose `Private DNS`
5. Enter: `samsung1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

> **⚠️ Important Notes**:
> - **Must add `device1.` prefix**, i.e. `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`
> - Directly using `{xxxxxxxxxxxxxxxx}.adguardprivate.com` won't work
> - Replace {xxxxxxxxxxxxxxxx} with your exclusive DNS server address

## Verification

After configuration:

1. System will automatically verify DNS connection status
2. "Connected" status indicates successful setup

## Troubleshooting

If configuration fails, check:

1. **Correct DNS prefix**: Must use `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com` format
2. Whether DNS server address is correct
3. Network connection status
4. Whether account is active

## Setup Demo

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281149211.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
