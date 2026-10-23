---
title: "macOS"
description: "详细介绍如何在macOS上配置DNS加密"
sidebar:
  order: 14
---

macOS Big Sur 以上版本支持原生Dns over HTTPS(DoH)和DNS over TLS(DoT)加密DNS, 您可以通过以下方法开启：

1. 打开自带浏览器Safari, 下载配置文件: [dot.mobileconfig](../dot.mobileconfig)
2. 打开**系统设置**
3. 打开**隐私与安全性**
4. 选中**描述文件**
5. 在已下载中选中**public.adguardprivate.com DoT**进行配置

> 需要说明的是, 这是一种非常规的修改系统设置方式, 我们一般建议iPhone用户不要轻易安装网络上来路不明的配置文件, 除非您确定相信其来源。本站目的是提供合法的个人隐私保护及去广告服务, 不会做任何对用户不利或反感的行为, 本声明目的是提醒用户, 即使您相信我, 也不要轻易相信其它网站提供的配置文件. 我会在其它文章介绍使用这种方式修改系统DNS配置可能会给您带来的风险。

本文将配置文件的的具体内容展示如下, 您可以直接复制下面的内容, 然后在iPhone的设置中粘贴, 您也可以点击上面的链接下载配置文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>PayloadContent</key>
		<array>
			<dict>
				<key>DNSSettings</key>
				<dict>
					<key>DNSProtocol</key>
					<string>TLS</string>
					<key>ServerName</key>
					<string>public.adguardprivate.com</string>
				</dict>
				<key>PayloadDescription</key>
				<string>Configures device to use NullPrivate</string>
				<key>PayloadDisplayName</key>
				<string>public.adguardprivate.com DoT</string>
				<key>PayloadIdentifier</key>
				<string>com.apple.dnsSettings.managed.11b4d48d-8e9b-4e15-b7c1-45cb1c564c99</string>
				<key>PayloadType</key>
				<string>com.apple.dnsSettings.managed</string>
				<key>PayloadUUID</key>
				<string>e9819f0c-250e-49b7-ad89-c0db078c72f0</string>
				<key>PayloadVersion</key>
				<integer>1</integer>
			</dict>
		</array>
		<key>PayloadDescription</key>
		<string>Adds NullPrivate to macOS Big Sur and iOS 14 or newer systems</string>
		<key>PayloadDisplayName</key>
		<string>public.adguardprivate.com DoT</string>
		<key>PayloadIdentifier</key>
		<string>e0b7d7db-e0d1-4bce-bcf4-8ada45d2f5a3</string>
		<key>PayloadRemovalDisallowed</key>
		<false/>
		<key>PayloadType</key>
		<string>Configuration</string>
		<key>PayloadUUID</key>
		<string>0404cb98-3621-4f97-9530-b18288633d40</string>
		<key>PayloadVersion</key>
		<integer>1</integer>
	</dict>
</plist>
```
