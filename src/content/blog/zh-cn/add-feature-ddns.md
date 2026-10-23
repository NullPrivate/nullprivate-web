---
title: "增加了DDNS功能"
description: "本文详细介绍了新增的DDNS功能，包括其使用方法、功能特点及与传统DDNS的区别。通过NullPrivate或AdGuardHome，用户可以轻松设置私有动态DNS（DDNS），无需购买域名即可实现快速配置，并支持多平台和多种认证方式。"
pubDate: "2025-07-21 14:15:47 +0800"
categories: 开发
tags: [开发, blog]
---

如果您已拥有一个NullPrivate服务, 现在可以使用DDNS功能.

## 概述

NullPrivate开源了DDNS脚本，该动态DNS（DDNS）旨在提供一种简单的方法，无需购买域名即可快速设置私有动态DNS。此DDNS脚本专门为[nullprivate.com](https://nullprivate.com)开发，利用NullPrivate的核心功能，您可以无缝实现这一功能。

## 使用方法

![nullprivate-ddns](/images/blog-add-feature-ddns-nullprivate-ddns-example.webp)

1. 确保NullPrivate已部署并正在运行。
2. 导航到DNS重写，下载DDNS脚本。
3. 运行脚本。

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

## 功能特点

- **快速简便的设置**: 只需几个步骤即可完成配置。
- **利用NullPrivate实现DDNS功能**: 通过NullPrivate的核心功能实现DDNS。
- **支持多平台**: 支持Windows和基于Unix的系统。
- **多种认证选项**: 支持Cookie（更安全但可能过期）或用户名/密码（更持久但安全性较低）进行认证。

## 与传统DDNS的区别

与传统的DDNS相比，这种私有DDNS具有以下优势：

- **无缓存时间**: 更改立即生效，无需等待DNS缓存过期。
- **无DNS传播延迟**: 更新即时可用，无需DNS传播延迟。
- **无需购买域名**: 可以使用伪域名进行访问，无需购买域名。
- **隐私保护**: 只有连接到私有DNS服务的用户才能解析DNS，确保隐私。

## 快速入门指南

1. 确保已部署NullPrivate并正在运行。
2. 按照win/ddns.ps1（适用于Windows）或unix/ddns.sh（适用于基于Unix的系统）脚本中的说明配置您的私有DDNS。

开源地址: [https://github.com/NullPrivate/nullprivate-ddns](https://github.com/NullPrivate/nullprivate-ddns)
