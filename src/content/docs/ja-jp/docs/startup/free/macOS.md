---
title: "macOS"
description: "macOSでDNS暗号化を設定する方法を詳しく解説"
sidebar:
  order: 14
---

macOS Big Sur以降では、ネイティブでDns over HTTPS（DoH）およびDNS over TLS（DoT）による暗号化DNSがサポートされています。以下の手順で有効にできます。

1. 標準ブラウザSafariを開き、構成プロファイルをダウンロードします: [dot.mobileconfig](../dot.mobileconfig)
2. **システム設定**を開きます
3. **プライバシーとセキュリティ**を開きます
4. **プロファイル**を選択します
5. ダウンロード済みの中から**public.adguardprivate.com DoT**を選択して設定します

> 注意：これは通常とは異なるシステム設定の変更方法です。iPhoneユーザーには、信頼できるソースでない限り、ネット上からの構成プロファイルのインストールは控えることをお勧めしています。このサイトは合法的な個人情報保護および広告ブロックサービスを提供することを目的としており、ユーザーに不利益または不快感を与えるような行為は一切行いません。この声明は、たとえ私を信頼していたとしても、他のサイトが提供する構成プロファイルを簡単に信じないようにとの注意喚起です。別の記事で、この方法によるシステムDNS設定の変更がもたらす可能性のあるリスクについて説明します。

この記事では構成プロファイルの具体的な内容を以下に示します。以下の内容を直接コピーしてiPhoneの設定に貼り付けることもできますし、上記のリンクをクリックして構成プロファイルをダウンロードすることもできます。

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
