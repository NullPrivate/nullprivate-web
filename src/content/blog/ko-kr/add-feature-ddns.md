---
title: "Untitled"
---

---
layout: blog
title: DDNS 기능 추가
draft: false
categories: 개발
tags: [개발, blog]
date: 2025-07-21 14:15:47 +0800
toc: false
comments: false
weight: 0
description: "이 글은 새로 추가된 DDNS 기능에 대해 자세히 설명합니다. 사용 방법, 기능 특징 및 기존 DDNS와의 차이점을 포함합니다. NullPrivate 또는 AdGuardHome을 통해 사용자는 도메인을 구매하지 않고도 개인 동적 DNS(DDNS)를 쉽게 설정할 수 있으며, 빠른 구성이 가능하고 다중 플랫폼 및 다양한 인증 방식을 지원합니다."
---

NullPrivate 서비스를 이미 보유하고 있다면, 이제 DDNS 기능을 사용할 수 있습니다.

## 개요

NullPrivate는 DDNS 스크립트를 오픈소스로 공개했습니다. 이 동적 DNS(DDNS)는 도메인을 구매할 필요 없이 개인 동적 DNS를 빠르게 설정할 수 있는 간단한 방법을 제공하기 위해 설계되었습니다. 이 DDNS 스크립트는 [nullprivate.com](https://nullprivate.com)을 위해 특별히 개발되었으며, NullPrivate의 핵심 기능을 활용하여 이 기능을 원활하게 구현할 수 있습니다.

## 사용 방법

![nullprivate-ddns](/images/blog-add-feature-ddns-nullprivate-ddns-example.webp)

1. NullPrivate가 배포되어 실행 중인지 확인하세요.
2. DNS 재작성으로 이동하여 DDNS 스크립트를 다운로드하세요.
3. 스크립트를 실행하세요.

**Windows**

```powershell
Set-ExecutionPolicy Bypass -Scope Process
./ddns-script.ps1
```

**Linux/macOS**

```bash
chmod +x ddns-script.sh
./ddns-script.sh
```

## 기능 특징

- **빠르고 간편한 설정**: 몇 단계만으로 구성을 완료할 수 있습니다.
- **NullPrivate를 통한 DDNS 기능 구현**: NullPrivate의 핵심 기능을 통해 DDNS를 구현합니다.
- **다중 플랫폼 지원**: Windows 및 Unix 기반 시스템을 지원합니다.
- **다양한 인증 옵션**: 쿠키(더 안전하지만 만료될 수 있음) 또는 사용자 이름/비밀번호(더 지속적이지만 보안성이 낮음) 인증을 지원합니다.

## 기존 DDNS와의 차이점

기존 DDNS와 비교하여 이 개인 DDNS는 다음과 같은 장점이 있습니다:

- **캐시 시간 없음**: 변경 사항이 즉시 적용되며 DNS 캐시 만료를 기다릴 필요가 없습니다.
- **DNS 전파 지연 없음**: 업데이트가 즉시 사용 가능하며 DNS 전파 지연이 없습니다.
- **도메인 구매 불필요**: 가짜 도메인을 사용하여 접근할 수 있으며 도메인을 구매할 필요가 없습니다.
- **개인 정보 보호**: 개인 DNS 서비스에 연결된 사용자만 DNS를 해석할 수 있어 개인 정보가 보장됩니다.

## 빠른 시작 가이드

1. NullPrivate가 배포되어 실행 중인지 확인하세요.
2. Windows용 win/ddns.ps1 또는 Unix 기반 시스템용 unix/ddns.sh 스크립트의 지침에 따라 개인 DDNS를 구성하세요.

오픈소스 주소: [https://github.com/NullPrivate/nullprivate-ddns](https://github.com/NullPrivate/nullprivate-ddns)
