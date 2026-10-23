---
title: "增加了DDNS功能"
description: "本文詳細介紹了新增的DDNS功能，包括其使用方法、功能特點及與傳統DDNS的區別。通過NullPrivate或AdGuardHome，用戶可以輕鬆設置私有動態DNS（DDNS），無需購買域名即可實現快速配置，並支援多平台和多種認證方式。"
pubDate: "2025-07-21 14:15:47 +0800"
categories: 開發
tags: [開發, blog]
---

如果您已擁有一個NullPrivate服務，現在可以使用DDNS功能。

## 概述

NullPrivate開源了DDNS腳本，該動態DNS（DDNS）旨在提供一種簡單的方法，無需購買域名即可快速設置私有動態DNS。此DDNS腳本專門為[nullprivate.com](https://nullprivate.com)開發，利用NullPrivate的核心功能，您可以無縫實現這一功能。

## 使用方法

![nullprivate-ddns](/images/blog-add-feature-ddns-nullprivate-ddns-example.webp)

1. 確保NullPrivate已部署並正在運行。
2. 導航到DNS重寫，下載DDNS腳本。
3. 運行腳本。

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

## 功能特點

- **快速簡便的設置**：只需幾個步驟即可完成配置。
- **利用NullPrivate實現DDNS功能**：通過NullPrivate的核心功能實現DDNS。
- **支援多平台**：支援Windows和基於Unix的系統。
- **多種認證選項**：支援Cookie（更安全但可能過期）或用戶名/密碼（更持久但安全性較低）進行認證。

## 與傳統DDNS的區別

與傳統的DDNS相比，這種私有DDNS具有以下優勢：

- **無緩存時間**：更改立即生效，無需等待DNS緩存過期。
- **無DNS傳播延遲**：更新即時可用，無需DNS傳播延遲。
- **無需購買域名**：可以使用偽域名進行訪問，無需購買域名。
- **隱私保護**：只有連接到私有DNS服務的用戶才能解析DNS，確保隱私。

## 快速入門指南

1. 確保已部署NullPrivate並正在運行。
2. 按照win/ddns.ps1（適用於Windows）或unix/ddns.sh（適用於基於Unix的系統）腳本中的說明配置您的私有DDNS。

開源地址: [https://github.com/NullPrivate/nullprivate-ddns](https://github.com/NullPrivate/nullprivate-ddns)
