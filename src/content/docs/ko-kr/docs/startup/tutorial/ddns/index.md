---
title: "DDNS动态解析"
---

---
layout: docs
title: DDNS 동적 해석
draft: false
categories: 가이드
tags: [가이드, DDNS 동적 해석]
date: 2025-01-20 18:31:39 +0800
toc: true
comments: false
weight: 0
description: NullPrivate를 사용하여 편리한 DDNS 동적 해석 서비스 구현
---

## DDNS란 무엇인가요?

DDNS(Dynamic DNS)는 동적 IP 주소에 고정 도메인을 바인딩할 수 있게 해주며, NAS, 스마트 홈 컨트롤러 등 내부 네트워크 장치에 접근해야 하는 가정용 광대역 사용자에게 적합합니다.

## 기능 특징

- **간편한 사용**: 스크립트 하나만으로 자동 업데이트 가능
- **추가 비용 없음**: 도메인 구매 불필요
- **높은 신뢰성**: NullPrivate의 DNS 인프라 기반
- **빠른 적용**: DNS 레코드 업데이트 후 즉시 적용, DNS 전파 대기 불필요

## 사용 가이드

![explorer_VIZAwW9wSO](/images/docs-startup-tutorial-ddns-explorer_VIZAwW9wSO.webp)

`필터->DNS 재작성`에서 DDNS 스크립트 다운로드 주소를 찾을 수 있습니다.

## 자주 묻는 질문

### 작동 여부를 어떻게 확인하나요?

`ping your-domain.name` 명령어를 사용하여 현재 IP 주소로 올바르게 해석되는지 확인할 수 있습니다.

또는 서비스 백엔드에 로그인하여 **필터**->**DNS 재작성** 기록을 확인하세요.

### 정기 업데이트는 어떻게 설정하나요?

#### Windows 작업 스케줄러

1. 작업 스케줄러 열기
2. 기본 작업 생성
3. 실행 빈도 설정(15-30분 권장)
4. 프로그램 위치로 PowerShell 선택, 매개변수에 스크립트 전체 명령 입력

#### Linux Cron 작업

다음 내용을 crontab에 추가하세요(15분마다 실행):

```sh
*/15 * * * * /path/to/update_dns.sh https://xxxxxxxx.adguardprivate.com admin:password123 nas.home
```

## 주의 사항

- 사용자 이름과 비밀번호를 안전하게 보관하고 유출되지 않도록 주의하세요
- 자동 실행을 위해 업데이트 스크립트를 시스템 작업 스케줄러에 추가하는 것을 권장합니다
- 해석이 즉시 적용되지 않는 경우 네트워크 연결과 인증 정보 유효성을 확인하세요
