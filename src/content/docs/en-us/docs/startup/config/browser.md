---
title: "Browser"
---

---
layout: docs
title: Browser
draft: false
categories: Guide
tags: [Guide, startup]
date: 2024-10-23 18:25:24 +0800
toc: false
comments: false
weight: 15
description: 'Enable DoH in Chrome/Edge and other Chromium browsers: Activate "Secure DNS", fill in your dedicated DoH endpoint for enhanced privacy and stable resolution.'
---

Chromium 79+ browsers support `DoH`. Here's how to configure Chromium-based browsers (Chrome/Edge/360/QQ etc.):

1. Open Chrome browser `Settings`
2. Navigate to `Privacy, search, and services`
3. Scroll to `Security`
4. Enable `Use secure DNS to specify how to look up website network addresses`
5. In `Choose service provider`, enter `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1`, where `{xxxxxxxxxxxxxxxx}` is your dedicated encrypted DNS username, and `browser1` is your browser ID.
