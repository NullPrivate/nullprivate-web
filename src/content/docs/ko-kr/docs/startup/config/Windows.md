---
title: "Windows"
---

---
layout: docs
title: Windows
draft: false
categories: 가이드
tags: [가이드]
date: 2024-04-15 22:48:16 +0800
toc: true
comments: false
weight: 13
description: 'Windows에서 DoH/DoT 암호화 DNS 설정: 시스템 수준 설정 및 브라우저 내장 DoH 방식을 통해 광고 차단 및 개인정보 보호가 안정적으로 작동하도록 합니다.'
---

## Windows 11

Windows 11 21H2 이후 버전부터는 기본적으로 Dns over HTTPS(DoH)를 지원합니다. 다음 방법으로 활성화할 수 있습니다:

1. `설정` 열기
2. `네트워크 및 인터넷` 열기
3. `이더넷` 열기
4. `DNS 서버 할당` 찾아 `편집` 클릭
   1. `수동` 선택
   2. `기본 설정 DNS 서버` IPv4에 `120.26.96.167` 입력, IPv6 주소는 `2408:4005:3de:8500:4da1:169e:dc47:1707`
   3. DNS over HTTPS(DoH) 선택: 켬(수동 템플릿)
   4. `DoH 템플릿`에 `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/windows1` 입력, `{xxxxxxxxxxxxxxxx}`는 암호화 DNS 서비스 사용자명, `windows1`은 운영체제 번호입니다.
   5. **반드시** `암호화되지 않은 요청 실패 시 사용` 체크하지 않음
   6. 대체 DNS 서버로 `223.5.5.5`(알리클라우드 공용 DNS 서비스) 선택 가능, `DNS over HTTPS 끄기`, `암호화되지 않은 요청 실패 시 사용` 체크.

## Windows 10 및 이전 버전

Windows 10 및 이전 버전은 기본 암호화 DNS를 지원하지 않지만, 최신 **브라우저** (Chrome/Edge 및 Chromium 기반 브라우저 - 360/QQ 등 중국산 브라우저)를 사용 중이라면 브라우저에서 `DoH` 암호화 DNS 사용을 설정할 수 있습니다. Chrome 브라우저 설정 방법은 다음과 같습니다:

1. Chrome 브라우저 `설정` 열기
2. `개인정보 및 보안` 열기
3. `보안` 섹션으로 스크롤
4. `안전한 DNS 사용(웹사이트 네트워크 주소를 찾는 방법 지정)` 활성화
5. `서비스 제공자 선택`에 `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1` 입력, `{xxxxxxxxxxxxxxxx}`는 암호화 DNS 서비스 사용자명, `browser1`은 브라우저 번호입니다.

기타 브라우저는 각각의 설정 방법을 참조하세요. 일반적으로 `설정`-`개인정보`-`보안`에서 관련 설정을 찾을 수 있습니다.
