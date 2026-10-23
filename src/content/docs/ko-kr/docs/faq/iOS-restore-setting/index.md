---
title: "iOS设备恢复设置"
---

---
layout: docs
title: iOS 기기 설정 복원
draft: false
categories: 가이드
tags: [가이드, FAQ, iOS, DNS 설정]
date: 2025-01-28 11:27:37 +0800
toc: true
comments: false
weight: 0
description: 본 문서는 iOS 기기에서 DNS 설정을 복원하는 방법을 설명합니다
---

iOS 기기에서 오탐지 문제가 발생한 경우, 다음 두 가지 방법으로 원본 DNS 설정을 복원할 수 있습니다.

## 방법 1: DNS 암호화 임시 비활성화

이 방법은 DNS 설정으로 인한 문제인지 임시로 테스트할 때 적합합니다:

1. `설정` 앱 열기
2. `일반` > `VPN 및 기기 관리`로 이동
3. `접근 제한 및 프록시` 섹션에서 `DNS` 옵션 찾기
4. `자동`을 선택하면 시스템 기본 설정으로 임시 복원됩니다

## 방법 2: 설정 완전히 제거

DNS 암호화 설정을 완전히 제거하려면:

1. `설정` 앱 열기
2. `일반` > `VPN 및 기기 관리`로 이동
3. `구성 프로파일`에서 `public.adguardprivate.com DoT` 찾기
4. `프로파일 제거`를 클릭하고 확인

> NullPrivate를 영구적으로 더 이상 사용하지 않기로 결정하셨다면, 저희 서비스가 불편을 드린 것 같아 매우 죄송합니다.  
> 공공 서비스는 널리 사용되는 차단 규칙을 사용하며, 인력의 한계로 인해 모든 앱의 누락 차단 또는 오탐지 상황을 알 수 없습니다.  
> 개인화된 요구 사항에 맞춰 규칙을 사용자 정의하고 싶으시다면, 개인 서비스 구매를 고려해 보십시오. 개인 서비스는 다양한 요구 사항을 충족하기 위해 전용 서비스를 매우 합리적인 가격으로 제공합니다.

## 설정 데모

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281147590.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
