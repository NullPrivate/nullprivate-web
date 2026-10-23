---
title: "iPhone"
---

---
layout: docs
title: iPhone
draft: false
categories: 指南
tags: [指南, iOS, DNS加密, 安全配置]
date: 2024-04-15 22:48:16 +0800
toc: true
comments: false
weight: 12
description: 詳細介紹如何在iPhone上配置DNS加密
---

## 功能簡介

從iOS 14開始，iPhone原生支援加密DNS功能，包括：
- DNS over HTTPS (DoH) - 透過HTTPS協議加密DNS查詢
- DNS over TLS (DoT) - 透過TLS協議加密DNS查詢

這些功能可以有效保護您的網絡私隱，防止DNS劫持。

## 配置步驟

### 1. 下載設定檔
使用Safari瀏覽器下載設定檔：[dot.mobileconfig](../dot.mobileconfig)

### 2. 安裝設定檔
1. 開啟`設定`應用程式
2. 進入`一般` > `VPN與裝置管理`
3. 選擇並安裝 **public.adguardprivate.com DoT** 設定檔

## 特別說明

如果您啟用了iCloud私密轉送，需要：
- 在設定中手動關閉該功能，或
- 下載並安裝此設定檔：[disable-icloud-private-relay.mobileconfig](../disable-icloud-private-relay.mobileconfig)

> ⚠️ **安全警告**  
> 安裝設定檔時請格外謹慎。本站提供的設定檔僅用於合法的私隱保護和廣告過濾服務。  
> 請勿隨意安裝來源不明的設定檔，這可能危及您的裝置安全。

## 配置示範影片

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281117331.mp4" type="video/mp4">
  您的瀏覽器不支援影片播放功能。
</video>
