---
title: "Android"
---

---
layout: docs
title: Android
draft: false
categories: 가이드
tags: [가이드, Android, DNS 암호화, 개인정보 보호]
date: 2024-10-20 15:46:31 +0800
toc: true
comments: false
weight: 11
description: 각 브랜드의 Android 휴대폰에서 DNS 암호화를 설정하는 방법을 상세히 설명합니다.
---

## 기능 소개

Android 9 이상 버전은 기본적으로 DNS over TLS(DoT) 암호화를 지원하여 DNS 쿼리가 도청 및 변조로부터 보호됩니다.

## 설정 방법

다른 브랜드 휴대폰의 설정 경로가 다를 수 있습니다. 다음은 주요 브랜드별 구체적인 설정 방법입니다:

### 샤오미/홍미 휴대폰

1. `설정` 열기
2. `연결 및 공유` 선택
3. `개인 DNS` 클릭
4. `개인 DNS 서비스 제공자 호스트 이름` 선택
5. 입력: `public.adguardprivate.com`

### 삼성 휴대폰

1. `설정` 열기
2. `연결` 선택
3. `더 많은 연결 설정` 클릭
4. `개인 DNS` 선택
5. `개인 DNS 서비스 제공자 호스트 이름` 선택
6. 입력: `public.adguardprivate.com`

### OPPO/원플러스 휴대폰

1. `설정` 열기
2. `무선 및 네트워크` 선택
3. `개인 DNS` 클릭
4. `개인 DNS 서비스 제공자 호스트 이름` 선택
5. 입력: `public.adguardprivate.com`

### 기타 브랜드

다음 방법으로 관련 설정을 찾을 수 있습니다:

- 설정에서 "DNS" 또는 "개인 DNS" 검색
- 네트워크 설정 또는 고급 네트워크 설정 옵션 확인

## 자주 묻는 질문

### 설정이 적용되었는지 어떻게 확인하나요?

1. 설정 완료 후 시스템이 자동으로 DNS 서버를 검증합니다
2. "연결됨" 또는 체크 표시가 나타나면 설정이 성공한 것입니다

### 설정 실패 시 해결 방법

1. 입력한 도메인 이름이 정확한지 확인
2. 네트워크 연결 상태 확인
3. Android 시스템 버전이 지원되는지 확인 (Android 9 이상 필요)

## 설정 데모

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501272309210.mp4" type="video/mp4">
  귀하의 브라우저는 비디오 재생을 지원하지 않습니다.
</video>
