---
title: "Custom Device Names"
---

---
layout: docs
title: Using Custom Device Names
draft: false
categories: Guide
tags: [Guide, tutorial]
date: 2025-01-03 15:56:04 +0800
toc: false
comments: false
weight: 0
description: 'Customize device identification names: distinguish endpoints via extended domain names/URL paths, accurately view "Client Rankings" and logs, and facilitate rule and schedule management.'
---

If you directly use the service's listening address, such as:

- `tls://xxxxxxxx.adguardprivate.com`
- `https://xxxxxxxx.adguardprivate.com/dns-query`

The IPs seen in the `Client Rankings` in the backend are the cluster IPs of the load balancer, which are meaningless to users and cannot distinguish between different devices.

![Client Rankings](/images/docs-startup-tutorial-custom-device-name-202501031714999.png)

You can identify different devices by using `extended domain names` and `adding URL paths`.

![Custom Client Name](/images/docs-startup-tutorial-custom-device-name-202501031714031.png)

- For DoT, use the extended domain name method, e.g., `tls://device1.xxxxxxxx.adguardprivate.com`
- For DoH, use the added URL path method, e.g., `https://xxxxxxxx.adguardprivate.com/dns-query/device2`

Note:

- Android devices do not require entering the protocol prefix `tls://` during setup; simply input `device1.xxxxxxxx.adguardprivate.com`
- Apple devices follow setup instructions by entering a client ID and downloading a configuration file for setup, without manual input

![Apple Device Setup Instructions](/images/docs-startup-tutorial-custom-device-name-202501031715127.png)

> All devices under personal service share the service's query limit of `30` requests per second.
