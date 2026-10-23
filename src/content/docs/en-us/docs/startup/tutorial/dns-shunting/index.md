---
title: "DNS Split-Horizon Configuration Guide"
description: "A detailed walkthrough on optimizing network access via DNS split-horizon, including domestic and overseas DNS server setup and rule configuration."
---

## DNS Split-Horizon Overview

DNS split-horizon routes resolution requests for different domains to distinct DNS servers, greatly improving network access. A well-designed setup can:

- Accelerate domain resolution
- Increase website stability
- Optimize cross-border access
- Avoid DNS pollution

## NullPrivate Split-Horizon Configuration

### Basic Example

```ini
# Domestic DNS servers
223.5.5.5                                    # Alibaba DNS
2400:3200::1                                 # Alibaba DNS IPv6
public0.adguardprivate.svc.cluster.local    # Private DNS, mainland upstream

# Overseas DNS servers
tls://1.0.0.1                               # Cloudflare DNS
tls://[2606:4700:4700::1001]               # Cloudflare DNS IPv6
public2.adguardprivate.svc.cluster.local    # Private DNS, other upstream

# Split-horizon rules
[/google.com/bing.com/github.com/stackoverflow.com/]tls://1.0.0.1 public2.adguardprivate.svc.cluster.local
[/cn/xhscdn.com/tencentclb.com/tencent-cloud.net/aliyun.com/alicdn.com/]223.5.5.5 2400:3200::1 public0.adguardprivate.svc.cluster.local
```

## Domestic Carrier DNS Servers

### China Telecom DNS Servers

| Name        | Primary DNS Server | Secondary DNS Server |
| ----------- | ------------------ | -------------------- |
| Anhui CT    | 61.132.163.68      | 202.102.213.68       |
| Beijing CT  | 219.142.76.3       | 219.141.140.10       |
| Chongqing CT| 61.128.192.68      | 61.128.128.68        |
| Fujian CT   | 218.85.152.99      | 218.85.157.99        |
| Gansu CT    | 202.100.64.68      | 61.178.0.93          |
| Guangdong CT| 202.96.128.86      | 202.96.128.166       |
| Guangxi CT  | 202.103.225.68     | 202.103.224.68       |
| Guizhou CT  | 202.98.192.67      | 202.98.198.167       |
| Henan CT    | 222.88.88.88       | 222.85.85.85         |
| Heilongjiang CT| 219.147.198.230 | 219.147.198.242      |
| Hubei CT    | 202.103.24.68      | 202.103.0.68         |
| Hunan CT    | 222.246.129.80     | 59.51.78.211         |
| Jiangsu CT  | 218.2.2.2          | 218.4.4.4            |
| Jiangxi CT  | 202.101.224.69     | 202.101.226.68       |
| Inner Mongolia CT| 219.148.162.31 | 222.74.39.50         |
| Shandong CT | 219.146.1.66       | 219.147.1.66         |
| Shaanxi CT  | 218.30.19.40       | 61.134.1.4           |
| Shanghai CT | 202.96.209.133     | 116.228.111.118      |
| Sichuan CT  | 61.139.2.69        | 218.6.200.139        |
| Tianjin CT  | 219.150.32.132     | 219.146.0.132        |
| Yunnan CT   | 222.172.200.68     | 61.166.150.123       |
| Zhejiang CT | 202.101.172.35     | 61.153.177.196       |
| Tibet CT    | 202.98.224.68      | 202.98.224.69        |

### China Unicom DNS Servers

| Name        | Primary DNS Server | Secondary DNS Server |
| ----------- | ------------------ | -------------------- |
| Beijing CU  | 123.123.123.123    | 123.123.123.124      |
| Chongqing CU| 221.5.203.98       | 221.7.92.98          |
| Guangdong CU| 210.21.196.6       | 221.5.88.88          |
| Hebei CU    | 202.99.160.68      | 202.99.166.4         |
| Henan CU    | 202.102.224.68     | 202.102.227.68       |
| Heilongjiang CU| 202.97.224.69   | 202.97.224.68        |
| Jilin CU    | 202.98.0.68        | 202.98.5.68          |
| Jiangsu CU  | 221.6.4.66         | 221.6.4.67           |
| Inner Mongolia CU| 202.99.224.68 | 202.99.224.8         |
| Shandong CU | 202.102.128.68     | 202.102.152.3        |
| Shanxi CU   | 202.99.192.66      | 202.99.192.68        |
| Shaanxi CU  | 221.11.1.67        | 221.11.1.68          |
| Shanghai CU | 210.22.70.3        | 210.22.84.3          |
| Sichuan CU  | 119.6.6.6          | 124.161.87.155       |
| Tianjin CU  | 202.99.104.68      | 202.99.96.68         |
| Zhejiang CU | 221.12.1.227       | 221.12.33.227        |
| Liaoning CU | 202.96.69.38       | 202.96.64.68         |

### China Mobile DNS IPs

| Name        | Primary DNS Server | Secondary DNS Server |
| ----------- | ------------------ | -------------------- |
| Beijing CM  | 221.130.33.60      | 221.130.33.52        |
| Guangdong CM| 211.136.192.6      | 211.139.136.68       |
| Jiangsu CM  | 221.131.143.69     | 112.4.0.55           |
| Anhui CM    | 211.138.180.2      | 211.138.180.3        |
| Shandong CM | 218.201.96.130     | 211.137.191.26       |

### Public DNS IPs

| Name           | Primary DNS Server | Secondary DNS Server |
| -------------- | ------------------ | -------------------- |
| 114 DNS        | 114.114.114.114    | 114.114.115.115      |
| CNNIC SDNS     | 1.2.4.8            | 210.2.4.8            |
| Alibaba Public | 223.5.5.5          | 223.6.6.6            |
| DNSPod DNS+    | 119.29.29.29       | 119.29.29.29         |
| Google DNS     | 8.8.8.8            | 8.8.4.4              |

## Configuration Tips

1. Prefer geographically close DNS servers
2. Configure both IPv4 and IPv6 DNS
3. Set up backup DNS for critical domains
4. Update split-horizon rules regularly
5. Monitor DNS response times

## Precautions

- Record original DNS settings before changes
- Avoid untrusted DNS servers
- Periodically verify DNS resolution
- Keep rule lists concise and effective

Proper DNS split-horizon configuration can significantly improve network access. Choose DNS servers and rules according to your actual needs.

## References

- [Provincial DNS Server List](https://ipw.cn/doc/else/dns.html)
- [Public DNS Lookup](https://www.ip.cn/dns.html)
