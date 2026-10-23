---
title: "macOS"
description: "Detailed instructions on how to configure DNS encryption on macOS"
sidebar:
  order: 14
---

macOS Big Sur and later natively support DNS over HTTPS (DoH) and DNS over TLS (DoT). You can enable encrypted DNS as follows:

1. Open the built-in Safari browser and download the configuration file: [dot.mobileconfig](../dot.mobileconfig)
2. Open **System Settings**
3. Go to **Privacy & Security**
4. Select **Profiles**
5. Under “Downloaded,” choose **public.adguardprivate.com DoT** to install

> Please note that this is an unconventional way to modify system settings. We generally advise iPhone users not to install configuration files from unknown sources unless you are certain of their origin. This site provides legitimate personal-privacy protection and ad-blocking services and will never perform any actions that are harmful or objectionable to users. This disclaimer is intended to remind you that, even if you trust me, you should not readily trust configuration files provided by other websites. I will cover the potential risks of modifying system DNS settings in this manner in another article.

The complete contents of the configuration file are shown below. You can copy the text and paste it into your iPhone’s settings, or simply click the link above to download the file.

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
