---
title: "iPhone"
---

---
layout: docs
title: iPhone
draft: false
categories: 가이드
tags: [가이드, iOS, DNS 암호화, 보안 설정]
date: 2024-04-15 22:48:16 +0800
toc: true
comments: false
weight: 12
description: iPhone에서 DNS 암호화를 설정하는 방법을 상세히 설명합니다
---

## 기능 소개

iOS 14부터 iPhone은 기본적으로 암호화된 DNS 기능을 지원하며, 이는 다음을 포함합니다:
- DNS over HTTPS (DoH) - HTTPS 프로토콜을 통한 DNS 쿼리 암호화
- DNS over TLS (DoT) - TLS 프로토콜을 통한 DNS 쿼리 암호화

이 기능들은 DNS 하이재킹을 방지하고 네트워크 프라이버시를 효과적으로 보호할 수 있습니다.

## 설정 단계

### 1. 설정 파일 다운로드
Safari 브라우저를 사용하여 설정 파일을 다운로드하세요: [dot.mobileconfig](../dot.mobileconfig)

### 2. 설정 파일 설치
1. `설정` 앱 열기
2. `일반` > `VPN 및 기기 관리`로 이동
3. **public.adguardprivate.com DoT** 설정 파일 선택 후 설치

## 특별 안내

iCloud Private Relay를 활성화한 경우 다음 중 하나를 수행해야 합니다:
- 설정에서 해당 기능을 수동으로 비활성화하거나
- 이 설정 파일을 다운로드하여 설치하세요: [disable-icloud-private-relay.mobileconfig](../disable-icloud-private-relay.mobileconfig)

> ⚠️ **보안 경고**  
> 설정 파일 설치 시 각별히 주의하십시오. 본 사이트에서 제공하는 설정 파일은 합법적인 프라이버시 보호 및 광고 차단 서비스만을 목적으로 합니다.  
> 출처가 불분명한 설정 파일을 함부로 설치하지 마십시오. 이는 기기 보안을 위협할 수 있습니다.

## 설정 데모 영상

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281117331.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
