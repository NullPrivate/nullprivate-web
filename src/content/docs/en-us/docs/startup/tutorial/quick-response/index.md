---
title: "Faster Responses"
---

---
layout: docs
title: Faster Request Response
draft: false
categories: Guide
tags: [Guide, tutorial]
date: 2024-12-04 12:28:48 +0800
toc: false
comments: false
weight: 0
description: 'Faster Request Response: Properly configure cache TTL, upstream mode, and region selection to reduce first-packet latency and retry rate, significantly improving perceived speed.'
---

Paid users utilize AdGuard's private service. The DNS request path is as follows:

![DNS Request Path](/images/docs-startup-tutorial-quick-response-更快的请求响应.drawio.svg)

The fastest response solution can be analyzed based on this path.

## Local Cache Hit

The fastest response is a local cache hit. Since the local cache operates at memory level, it's extremely fast—taking only a few microseconds.

This is controlled by the DNS response's TTL (Time to Live) value, typically ranging from minutes to hours, indicating that query results remain valid during this period and don't require re-querying.

You can set the minimum TTL value at `Control Panel -> Settings -> DNS Settings -> DNS Cache Configuration -> Override Minimum TTL Value`. Increasing this value extends cache duration, allowing the system to utilize local cache more frequently. The typical TTL value is 600 seconds.

However, since our service also includes filtering capabilities, if a required service is mistakenly blocked by ad-blocking rules, temporarily disabling encrypted DNS won't immediately grant access because the local cached result has been modified by filtering rules. Therefore, setting it to 60 seconds is a safer value, ensuring that in rare cases users won't wait too long after disabling encrypted DNS due to accidental blocking.

## AdGuard DNS Servers

We currently use Alibaba Cloud servers located in Hangzhou, which can meet low-latency needs for most users in eastern China. As business grows, we will expand server coverage nationwide in the future.

## Server Cache Hit

By default, each user is allocated 4MB of DNS cache, which experience shows is sufficient for household usage. Free modification of this setting may lead to forced service termination, so we've disabled user access to modify this setting.

## Upstream DNS Servers

Using Alibaba Cloud services, we've selected Alibaba's DNS service as the upstream provider, which typically returns results within milliseconds.

Users have three methods to request upstream DNS servers:

1. **Load Balancing**: Enabled by default, automatically selects the fastest server to return results.
2. **Parallel Requests**: Currently unrestricted in our service.
3. **Fastest IP Address**: Currently a meaningless setting; modification entry has been disabled.

Explanation why "Fastest IP Address" is meaningless: The truly fastest IP should be selected by the device actually accessing the service. When AdGuard operates in Hangzhou while the user is in Beijing, AdGuard might consider Hangzhou IPs fastest, but in reality Beijing-based services would be quicker for the user. Selecting Hangzhou IPs would actually increase latency. Therefore, we've disabled this setting modification. This setting might be useful in home networks but meaningless in public services.

Many factors affect network experience: server bandwidth, network congestion, server load, network quality, etc. Selecting the "fastest IP" doesn't guarantee the fastest response—latency is just one factor among many. To prevent user misconfiguration from degrading service quality, we've disabled this setting.

## Rule Filtering

The most common mode is blacklisting, where users can select from preset blacklists. Blacklist hits use hash algorithms—hit time remains O(1) regardless of rule volume, so users needn't worry about performance degradation from large rule sets.

However, rules are stored in memory after computation. Each user's service is limited to 300MB memory usage, sufficient for most needs. Excessively large rule sets may cause memory shortages, leading to repeated service restarts and interruptions.

We've temporarily disabled third-party rules to prevent users from importing oversized rule sets. Third-party rule support will be reinstated when better restriction methods become available.

## Summary

To achieve faster request responses, users can:

1. Appropriately increase the minimum TTL value to improve local cache hit rate.
2. Set appropriate DNS cache size (preset value already configured).
3. Select geographically closest cities when creating services (pending business expansion).
4. Use load balancing for domestic needs; use parallel requests for overseas needs.
5. Use appropriate blacklist rules, avoiding oversized rule sets.
