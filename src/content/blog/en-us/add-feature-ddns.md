---
title: "Untitled"
---

---
layout: blog
title: Added DDNS Feature
draft: false
categories: Development
tags: [Development, blog]
date: 2025-07-21 14:15:47 +0800
toc: false
comments: false
weight: 0
description: "This article details the newly added DDNS feature, including its usage, functional characteristics, and differences from traditional DDNS. Through NullPrivate or AdGuardHome, users can easily set up private dynamic DNS (DDNS), enabling quick configuration without purchasing a domain name, with support for multiple platforms and various authentication methods."
---

If you already have a NullPrivate service, you can now use the DDNS feature.

## Overview

NullPrivate has open-sourced the DDNS script. This dynamic DNS (DDNS) is designed to provide a simple method for quickly setting up private dynamic DNS without purchasing a domain name. This DDNS script was specifically developed for [nullprivate.com](https://nullprivate.com). By leveraging NullPrivate's core functionality, you can seamlessly implement this feature.

## Usage

![nullprivate-ddns](/images/blog-add-feature-ddns-nullprivate-ddns-example.webp)

1. Ensure NullPrivate is deployed and running.
2. Navigate to DNS Rewrite and download the DDNS script.
3. Run the script.

**Windows**

```powershell
Set-ExecutionPolicy Bypass -Scope Process
./ddns-script.ps1
```

**Linux/macOS**

```bash
chmod +x ddns-script.sh
./ddns-script.sh
```

## Features

- **Quick and Easy Setup**: Configure in just a few steps.
- **DDNS via NullPrivate**: Implement DDNS using NullPrivate's core functionality.
- **Multi-Platform Support**: Compatible with Windows and Unix-based systems.
- **Multiple Authentication Options**: Supports authentication via cookies (more secure but may expire) or username/password (more persistent but less secure).

## Differences from Traditional DDNS

Compared to traditional DDNS, this private DDNS offers the following advantages:

- **No Cache Time**: Changes take effect immediately without waiting for DNS cache expiration.
- **No DNS Propagation Delay**: Updates are instantly available without DNS propagation delays.
- **No Domain Purchase Required**: Accessible via pseudo-domains without purchasing a domain name.
- **Privacy Protection**: Only users connected to the private DNS service can resolve DNS, ensuring privacy.

## Quick Start Guide

1. Ensure NullPrivate is deployed and running.
2. Follow the instructions in the win/ddns.ps1 (for Windows) or unix/ddns.sh (for Unix-based systems) scripts to configure your private DDNS.

Open Source Repository: [https://github.com/NullPrivate/nullprivate-ddns](https://github.com/NullPrivate/nullprivate-ddns)
