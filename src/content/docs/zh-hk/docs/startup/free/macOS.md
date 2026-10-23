---
title: "macOS"
description: "詳細介紹如何在macOS上配置DNS加密"
sidebar:
  order: 14
---

macOS Big Sur 或以上版本原生支援Dns over HTTPS(DoH)及DNS over TLS(DoT)加密DNS，你可透過以下方法啟用：

1. 開啟內置瀏覽器Safari，下載設定檔：[dot.mobileconfig](../dot.mobileconfig)
2. 開啟**系統設定**
3. 開啟**私隱與保安**
4. 選取**描述檔**
5. 在已下載項目選取**public.adguardprivate.com DoT**進行配置

> 需要說明的是，這是一種非常規的修改系統設定方式，我們一般建議iPhone用戶切勿隨意安裝網絡上來歷不明的描述檔，除非你確定信任其來源。本站旨在提供合法的個人私隱保護及去廣告服務，不會進行任何對用戶不利或令人反感的行為；本聲明旨在提醒用戶，即使你信任我，亦切勿輕信其他網站提供的描述檔。我會在其他文章介紹使用這種方式修改系統DNS配置可能帶來的風險。

本文將設定檔的具體內容展示如下，你可直接複製以下內容，然後在iPhone的設定中貼上，亦可點擊上方連結下載設定檔。

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
