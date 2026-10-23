---
title: "访问请求日志"
---

---
layout: docs
title: Access Request Logs
draft: false
date: 2024-04-15 17:52:33 +0800
toc: false
comments: false
weight: 100
description: 'Through detailed request logs and statistical data, help you comprehensively understand and manage network traffic.'
---

## Complete Access Request Logs

![Request Logs](/images/docs-feature-query-image.png)

Access request logs provide the following detailed information:

- **Time**: The specific time when the request occurred
- **Client**: The IP address of the device initiating the request
- **Request Target**: The domain name or IP address being accessed
- **Response Status**: The processing result of the request
- **Filter Rule**: The triggered filter rule (if any)

You can use the search box to filter logs by domain name, IP, or rule name. Logs are retained for 3 days by default.

## Top Requested Domains

![Top Requested Domains](/images/docs-feature-query-image-1.png)

Domain access statistics display:

- Most frequently accessed domains
- Request count per domain
- Generated upstream/downstream traffic
- Last access time

Supports sorting by request count or traffic volume to help identify high-frequency accessed websites.

## Top Blocked Domains

![Top Blocked Domains](/images/docs-feature-query-image-2.png)

Blocking statistics show:

- List of blocked domains
- Block count statistics
- Triggered filter rules
- Last blocking time

You can directly perform in the list:

- Add mistakenly blocked domains to whitelist
- View specific rules causing blocks
- Export statistical data for analysis
