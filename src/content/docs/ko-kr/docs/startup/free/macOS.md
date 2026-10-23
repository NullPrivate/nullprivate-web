---
title: "macOS"
description: "macOS에서 DNS 암호화를 구성하는 방법을 자세히 설명합니다."
sidebar:
  order: 14
---

macOS Big Sur 이상 버전은 기본적으로 Dns over HTTPS(DoH) 및 DNS over TLS(DoT) 암호화 DNS를 지원하며, 다음 방법으로 활성화할 수 있습니다:

1. 기본 브라우저 Safari를 열고 구성 파일을 다운로드합니다: [dot.mobileconfig](../dot.mobileconfig)
2. **시스템 설정**을 엽니다
3. **개인 정보 보호 및 보안**을 엽니다
4. **구성 프로필**을 선택합니다
5. 다운로드한 항목에서 **public.adguardprivate.com DoT**를 선택하여 구성합니다

> 설명드리자면, 이는 시스템 설정을 수정하는 비정상적인 방법입니다. 일반적으로 iPhone 사용자에게 인터넷에서 출처가 불분명한 구성 파일을 함부로 설치하지 않도록 권장합니다. 출처를 확신할 수 있는 경우에만 설치하세요. 이 사이트는 합법적인 개인 정보 보호 및 광고 차단 서비스를 제공하며, 사용자에게 불리하거나 불쾌감을 주는 행위를 절대 하지 않습니다. 이 경고는 사용자에게 알리기 위한 것으로, 저를 믿더라도 다른 사이트에서 제공하는 구성 파일은 쉽게 믿지 마십시오. 다른 글에서 이 방법으로 시스템 DNS 설정을 수정할 때 발생할 수 있는 위험에 대해 소개하겠습니다.

이 글에서는 구성 파일의 구체적인 내용을 아래와 같이 보여드리며, 직접 복사하여 iPhone 설정에 붙여넣을 수도 있고, 위 링크를 클릭하여 구성 파일을 다운로드할 수도 있습니다.

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
