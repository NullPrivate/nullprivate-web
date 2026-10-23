---
title: "Untitled"
---

---
layout: blog
title: Introducing Custom Client Name Feature
draft: false
categories: Development
tags: [Development, DoT, DoH, DNS Configuration]
date: 2024-12-29 14:01:19 +0800
toc: true
comments: true
weight: 0
description: NullPrivate now offers custom client naming, allowing users to intuitively identify and manage DNS configurations for different devices, significantly improving management experience.
---

## Feature Overview

To enhance user experience, NullPrivate now supports custom client naming. This feature enables you to set unique identifiers for different devices, making device management more intuitive and convenient.

![Client Management Interface](/images/blog-add-customize-client-name-Sgg2AdobuU.png)

## Configuration Guide

Configuration methods vary slightly depending on device type:

### Android Devices

Simply add a custom prefix before the domain name using this format:
```
{device-name}.{original-domain}
```
Example: `xiaomi-15pro.xxxxxxxx.nullprivate.com`

### iOS Devices

1. Navigate to the "Setup Guide" page
2. Enter your custom name in the "Client ID" field
3. Download and apply the new configuration profile

![iOS Configuration Interface](/images/blog-add-customize-client-name-202412291426394.png)

### Browser Configuration (DoH)

Add custom identifiers after the original DoH address:

Original format:
```
https://xxxxxxxx.nullprivate.com/dns-query
```

New format:
```
https://xxxxxxxx.nullprivate.com/dns-query/{device-identifier}
```

Example: `https://xxxxxxxx.nullprivate.com/dns-query/pc1-browser`

![Browser Configuration Example](/images/blog-add-customize-client-name-202412291434042.png)

## Usage Recommendations

- Use meaningful identifiers like device model, location, or purpose
- Avoid special characters - use letters, numbers, and hyphens
- Maintain consistent naming conventions for easier management

## Important Notes

- Custom names only affect display and won't impact service performance
- Configuration must be reapplied after name changes take effect
- We recommend saving device configuration details for future reference
