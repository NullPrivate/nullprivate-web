---
title: "Slow Access to Some Websites"
description: "Analysis and solutions for slow access to certain websites when using NullPrivate DNS, mainly related to ECS (Extended Client Subnet) support"
---

## Slow Access to Some Video Sites

If you experience slow access to certain websites while using NullPrivate, it may be due to the following reasons:

**ECS Support:**

NullPrivate's free tier does not support ECS (Extended Client Subnet). ECS is a DNS protocol extension that allows DNS servers to provide more accurate responses based on the client's network location. Many CDNs (Content Delivery Networks) use ECS to direct users to the nearest server, thereby improving speed. The free servers are located in Shanghai and Hangzhou.

**Impact:**

- **Slower Speeds:** Without ECS, NullPrivate may be unable to direct you to the optimal CDN server, resulting in slower speeds.
- **Inaccurate Geolocation:** You may be routed to a server far from your actual location, increasing latency.

**Solutions:**

- **Upgrade to Paid Plan:** NullPrivate's paid plans support ECS, which can resolve this issue and improve speed.
- **Use Another DNS Server:** You can try another DNS server that supports ECS.
