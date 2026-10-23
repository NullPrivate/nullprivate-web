---
title: "Getting Started"
---

---
layout: docs
title: User Guide
draft: false
categories: Guide
tags: [Guide, Private Service]
date: 2024-10-24 15:02:17 +0800
toc: false
comments: false
weight: 1
description: 'Private Service User Guide: Access logs, blocking statistics, custom rules, and authoritative resolution for enhanced ad blocking, privacy protection, and screen time management.'
---

## Main Services Provided

### Basic Features

1.  Access Logs
1.  Blocking Logs
1.  Statistics
1.  Custom Upstream
1.  Custom Filter Rules
1.  Custom Resolution
1.  Whitelist Mode

### Advanced Features

1.  HTTP3 Support
1.  DDNS Support
1.  ECS Support
1.  Rule-based Resolution
1.  Block Specific Applications
1.  Schedules

## Access Logs

View internet access records. The private service provides 24-hour network access log query.

![Access Logs](/images/docs-startup-index-访问记录.png)

## Blocking Logs

View blocking records to understand which ads were blocked and which websites were intercepted.

![Blocking Logs](/images/docs-startup-index-拦截记录.png)

## Statistics

The private service provides network access statistics within 24 hours to understand user browsing habits.

Statistics display most visited websites and most blocked websites.

![Statistics](/images/docs-startup-index-统计信息.png)

## Custom Rules

Create custom rules within the private service to block ads in frequently used apps or allow websites you don't consider as ads.

Users may need to check access logs and observe website query records when launching specific apps to add custom rules.

![Custom Rules](/images/docs-startup-index-自定义规则.png)

## Whitelist Mode

To prevent certain types of websites from being blocked, set whitelist mode to only allow access to specific websites.

Whitelist has higher priority than blacklist. Websites in the whitelist won't be blocked. Users can add frequently used websites to the whitelist to avoid false blocking.

![Whitelist Mode](/images/docs-startup-index-白名单模式.png)

## Authoritative Resolution

Supports adding authoritative resolution for enterprise or home devices, resolving specified names to home device IP addresses, eliminating the need to memorize IP addresses.

Users don't need to purchase domains or complete ICP registration. Simply add authoritative resolution rules within the private service.

<!-- ![DNS Rewrite](/images/docs-startup-index-DNS重写.png) -->

![Authoritative Resolution](/images/docs-startup-index-权威解析.png)
