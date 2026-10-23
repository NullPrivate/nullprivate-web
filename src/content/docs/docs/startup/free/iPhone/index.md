---
title: "iPhone"
description: "详细介绍如何在iPhone上配置DNS加密"
sidebar:
  order: 12
---

## 功能简介

从iOS 14开始，iPhone原生支持加密DNS功能，包括：
- DNS over HTTPS (DoH) - 通过HTTPS协议加密DNS查询
- DNS over TLS (DoT) - 通过TLS协议加密DNS查询

这些功能可以有效保护您的网络隐私，防止DNS劫持。

## 配置步骤

### 1. 下载配置文件
使用Safari浏览器下载配置文件：[dot.mobileconfig](../dot.mobileconfig)

### 2. 安装配置文件
1. 打开`设置`应用
2. 进入`通用` > `VPN和设备管理`
3. 选择并安装 **public.adguardprivate.com DoT** 配置文件

## 特殊说明

如果您启用了iCloud Private Relay，需要：
- 在设置中手动关闭该功能，或
- 下载并安装此配置文件：[disable-icloud-private-relay.mobileconfig](../disable-icloud-private-relay.mobileconfig)

> ⚠️ **安全警告**  
> 安装配置文件时请格外谨慎。本站提供的配置文件仅用于合法的隐私保护和广告过滤服务。  
> 请勿随意安装来源不明的配置文件，这可能危及您的设备安全。

## 配置演示视频

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281117331.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
