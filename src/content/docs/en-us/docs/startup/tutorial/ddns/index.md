---
title: "DDNS"
---

---
layout: docs
title: DDNS Dynamic Resolution
draft: false
categories: Guide
tags: [Guide, DDNS Dynamic Resolution]
date: 2025-01-20 18:31:39 +0800
toc: true
comments: false
weight: 0
description: Use NullPrivate to implement convenient DDNS dynamic resolution service
---

## What is DDNS?

DDNS (Dynamic DNS) allows you to bind a fixed domain name to a dynamic IP address, suitable for home broadband users accessing internal network devices such as NAS, smart home controllers, etc.

## Feature Highlights

- **Easy to use**: Only requires a single script to achieve automatic updates
- **Zero additional cost**: No need to purchase a domain
- **High reliability**: Built on NullPrivate's DNS infrastructure
- **Fast propagation**: DNS records take effect immediately after update, no DNS propagation wait required

## Usage Guide

![explorer_VIZAwW9wSO](/images/docs-startup-tutorial-ddns-explorer_VIZAwW9wSO.webp)

You can find the DDNS script download address under `Filters->DNS Rewriting`.

## FAQ

### How to verify if it's working?

Check if resolution points correctly to your current IP address using the `ping your-domain.name` command.

Or log in to the service backend and view records under **Filters**->**DNS Rewriting**.

### How to schedule automatic updates?

#### Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Set execution frequency (recommended 15-30 minutes)
4. Select PowerShell as program location, enter full script command in parameters

#### Linux Cron Job

Add the following to crontab (executes every 15 minutes):

```sh
*/15 * * * * /path/to/update_dns.sh https://xxxxxxxx.adguardprivate.com admin:password123 nas.home
```

## Important Notes

- Keep your username and password secure to prevent leakage
- Recommended to add update script to system scheduled tasks for automatic execution
- If resolution doesn't take effect promptly, check network connection and credential validity
