---
title: "ECS Boosts CDN Access Speed"
description: "ECS (Extended Client Subnet) acceleration: pass subnet information upstream to improve CDN hit rates and enable closer resolution, delivering faster and more stable access."
---

NullPrivate supports ECS, delivering more precise resolution and optimizing your network experience.

## What is ECS (Extended Client Subnet)?

ECS (Extended Client Subnet) is a DNS protocol extension that allows a DNS resolver (such as your NullPrivate server) to pass part of the client’s IP address information to the authoritative DNS server. This enables the authoritative server to provide more accurate DNS responses based on the client’s network location.

### How ECS Works

1.  **Traditional DNS Query:** Without ECS, the DNS resolver only sends its own IP address to the authoritative DNS server. This forces the authoritative server to make resolution decisions based on the resolver’s location (usually a data center), which can yield sub-optimal results.

2.  **ECS-enabled DNS Query:** When ECS is enabled, the DNS resolver includes a portion of the client’s IP address (the subnet) in the DNS query. For example, if the client’s IP is `203.0.113.45`, the resolver might send `203.0.113.0/24` as ECS information.

3.  **Authoritative Server Response:** Upon receiving a query containing ECS information, the authoritative DNS server can use it to select the IP address best suited to the client—typically the server geographically closest to the client.

### Benefits of ECS

- **Faster Response Times:** By directing clients to the nearest server, ECS reduces latency and improves application responsiveness.
- **Enhanced User Experience:** Faster response times create a smoother, more enjoyable online experience.
- **More Effective CDN Usage:** Content Delivery Networks (CDNs) can leverage ECS to direct users to the optimal content server, boosting efficiency and lowering costs.
- **Bypass Local Resolver Limitations:** Some local ISP DNS servers may have issues such as resolution errors or domain hijacking. ECS can bypass these limitations to obtain more accurate resolution results.

## Why Use ECS with NullPrivate?

As a private DNS server, NullPrivate can be configured to use upstream DNS servers for domain resolution. With ECS enabled, NullPrivate can pass your client subnet information to those upstream servers, yielding more accurate resolution results.
