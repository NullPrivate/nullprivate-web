---
title: "브라우저"
description: "Chrome/Edge 등 Chromium 브라우저에서 DoH 활성화: \"보안 DNS\"를 켜고 전용 DoH 엔드포인트를 입력하여 강화된 개인정보 보호와 안정적인 DNS 확인을 얻으세요."
sidebar:
  order: 15
---

Chromium 79+ 이상 버전의 브라우저는 `DoH`를 지원합니다. 다음은 Chromium 기반(Chrome/Edge/360/QQ 등) 브라우저 설정 방법입니다:

1.  Chrome 브라우저 `설정` 열기
2.  `개인정보 및 보안` 열기
3.  `보안` 섹션으로 스크롤
4.  `안전한 DNS 사용(웹사이트 네트워크 주소를 찾는 방법 지정)` 활성화
5.  `서비스 제공자 선택`에 `https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1` 입력. 여기서 `{xxxxxxxxxxxxxxxx}`는 사용자의 전용 암호화 DNS 서비스 사용자명이며, `browser1`은 브라우저 식별번호입니다.
