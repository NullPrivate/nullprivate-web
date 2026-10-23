---
title: "自定义解析"
---

---
layout: docs
title: Custom DNS Resolution
draft: false
date: 2024-04-15 18:41:07 +0800
toc: true
comments: false
weight: 160
description: 'With custom DNS resolution, you can configure friendly domain names for LAN devices, simplifying network device management and enhancing user experience.'
---

## Feature Overview

Custom DNS resolution allows you to:

- Configure custom domain names for LAN devices
- Implement private domain name resolution
- Securely and conveniently access internal network services

## Application Scenarios

### Network Device Access

- NAS device: `nas.home → 192.168.1.100`
- Router: `router.home → 192.168.1.1`
- Printer: `printer.home → 192.168.1.200`

### Development & Testing Environments

- Local service: `api.local → 127.0.0.1`
- Test environment: `test.local → 192.168.1.50`
- Container: `redis.local → 172.17.0.2`

![Resolve to NAS](/images/docs-feature-custom-domain-image-2.png)

## Configuration Guide

### Basic Syntax

```
Domain RecordType TargetAddress
home A 192.168.1.2
*.home A 192.168.1.2
```

### Supported Record Types

- `A` record: IPv4 address resolution
- `AAAA` record: IPv6 address resolution
- `CNAME` record: Domain alias

## Security Features

- Only effective on configured devices
- Won't expose internal IP addresses
- Supports wildcard domain configuration
- Takes effect immediately without restart

## Usage Recommendations

1. Choose intuitive domain naming
2. Recommended to use `.home` suffix
3. Track internal IP changes
4. Regularly check resolution configurations
