---
title: "브라우저"
description: "브라우저에서 DNS 암호화를 구성하는 방법에 대해 자세히 설명합니다"
sidebar:
  order: 15
---

시스템 수준의 암호화된 DNS를 도입하고 싶지 않다면, 브라우저에서만 암호화된 DNS를 설정할 수 있습니다. Chromium 79+ 버전의 브라우저는 `DoH`를 지원합니다. 다음은 Chromium 계열(Chrome/Edge/360/QQ 등) 브라우저의 설정 방법입니다:

1. Chrome 브라우저의 `설정`을 엽니다
1. `개인정보, 검색 및 서비스`를 엽니다
1. `보안성`으로 스크롤합니다
1. `사용 중인 안전한 DNS를 통해 웹사이트의 네트워크 주소를 찾는 방법을 지정`을 활성화합니다
1. `서비스 제공업체 선택`에서 `https://public.adguardprivate.com/dns-query`를 입력합니다
