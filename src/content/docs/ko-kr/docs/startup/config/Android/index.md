---
title: "Android"
---

---
layout: docs
title: Android
draft: false
categories: 가이드
tags: [가이드, Android, Private DNS]
date: 2024-10-20 15:46:31 +0800
toc: true
comments: false
weight: 11
description: 'Android 개인 DNS 설정 가이드: `{기기명}.{사용자명}.adguardprivate.com`을 설정하여 시스템 수준의 암호화된 DNS를 활성화하고 지연 시간을 줄이며 개인 정보 보호를 강화하세요.'
---

## 설정 단계

각 브랜드별 휴대폰 설정 방법:

### Xiaomi/Redmi 휴대폰

1. `설정` 열기
2. `연결 및 공유` 선택
3. `개인 DNS` 클릭
4. `개인 DNS 서비스 제공업체 호스트 이름` 선택
5. 입력: `xiaomi1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

### Samsung 휴대폰

1. `설정` 열기
2. `연결` 선택
3. `더 많은 연결 설정` 클릭
4. `개인 DNS` 선택
5. 입력: `samsung1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

> **⚠️ 중요 사항**:
> - **반드시 `device1.` 접두사 추가** 필요: `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`
> - `{xxxxxxxxxxxxxxxx}.adguardprivate.com`만 사용하면 작동하지 않음
> - {xxxxxxxxxxxxxxxx} 부분을 본인의 전용 DNS 서버 주소로 변경하세요

## 설정 확인

설정 완료 후:

1. 시스템에서 자동으로 DNS 연결 상태 확인
2. "연결됨" 표시 시 설정 성공

## 문제 해결

설정 실패 시 다음 사항 확인:

1. **DNS 접두사 정확성**: `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com` 형식 필수
2. DNS 서버 주소 정확성
3. 네트워크 연결 상태
4. 계정 활성화 여부

## 설정 데모

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281149211.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
