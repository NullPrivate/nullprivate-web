---
title: "What is DNS"
---

---
layout: docs
title: What is DNS
draft: false
categories: Guide
tags: [Guide, tutorial, DNS]
date: 2025-01-15 16:28:23 +0800
toc: true
comments: false
weight: 1
description: DNS (Domain Name System) is one of the fundamental infrastructures of the internet. This article introduces the basic concepts and working principles of DNS.
---

> Essentially, the DNS service is like a Xinhua Dictionary. By querying this dictionary, we can find the IP address corresponding to a domain name.

## Introduction to DNS

DNS (Domain Name System) is one of the fundamental infrastructures of the internet. Like a Xinhua Dictionary, it is responsible for translating human-readable domain names into computer-understandable IP addresses.

![DNS Resolution Principle](/images/docs-tutorial-DNS-basics-202501151801448.svg)

## How DNS Works

When you enter a website address in your browser:

1. The browser first checks local cache
2. If not found, it queries a DNS server
3. The DNS server returns the corresponding IP address
4. The browser uses this IP address to access the target website

## Key Concepts

- **Domain Name**: A human-readable website address, such as `www.nullprivate.com`
- **URL (Uniform Resource Locator)**: A complete web address containing protocol, domain name, and path, such as `https://www.nullprivate.com`
- **IP Address**: A numeric identifier for network devices, such as `1.1.1.1`
- **DNS Server**: Computers that provide domain name resolution services
- **Web Hosting**: Storing website files on servers to make them accessible via the internet
