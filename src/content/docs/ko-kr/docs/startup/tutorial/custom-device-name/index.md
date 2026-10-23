---
title: "使用自定义设备名"
---

---
layout: docs
title: 사용자 정의 기기 이름 사용하기
draft: false
categories: 가이드
tags: [가이드, tutorial]
date: 2025-01-03 15:56:04 +0800
toc: false
comments: false
weight: 0
description: '기기에 맞는 식별 이름을 사용하여: 확장 도메인/URL 경로로 단말기를 구분하고, "클라이언트 순위"와 로그를 정확히 확인하여 규칙과 시간표 관리를 용이하게 합니다.'
---

서비스의 수신 주소를 직접 사용하는 경우, 예를 들어:

- `tls://xxxxxxxx.adguardprivate.com`
- `https://xxxxxxxx.adguardprivate.com/dns-query`

백엔드에서 보이는 `클라이언트 순위`의 IP는 로드 밸런서의 클러스터 IP로, 사용자에게 의미가 없으며 다른 기기를 구분할 수 없습니다.

![클라이언트 순위](/images/docs-startup-tutorial-custom-device-name-202501031714999.png)

`확장 도메인`과 `URL 경로 추가` 방식을 통해 다른 기기를 식별할 수 있습니다.

![사용자 정의 클라이언트 이름](/images/docs-startup-tutorial-custom-device-name-202501031714031.png)

- DoT는 확장 도메인 방식을 사용합니다. 예: `tls://device1.xxxxxxxx.adguardprivate.com`
- DoH는 URL 경로 추가 방식을 사용합니다. 예: `https://xxxxxxxx.adguardprivate.com/dns-query/device2`

주의사항:

- 안드로이드 기기 설정 시 프로토콜 접두사 `tls://`를 입력할 필요가 없으며, `device1.xxxxxxxx.adguardprivate.com`만 입력하면 됩니다.
- 애플 기기는 설정 가이드에서 클라이언트 ID를 입력하고 설정을 위해 프로필을 다운로드하여 수동 입력이 필요하지 않습니다.

![애플 기기 설정 가이드](/images/docs-startup-tutorial-custom-device-name-202501031715127.png)

> 개인 서비스의 모든 기기는 서비스의 쿼리 제한인 초당 `30`회 요청을 공유합니다.
