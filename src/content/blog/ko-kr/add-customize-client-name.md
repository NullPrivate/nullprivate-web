---
title: "Untitled"
---

---
layout: blog
title: 사용자 정의 클라이언트 이름 기능 출시
draft: false
categories: 개발
tags: [개발, DoT, DoH, DNS 설정]
date: 2024-12-29 14:01:19 +0800
toc: true
comments: true
weight: 0
description: NullPrivate에서 사용자 정의 클라이언트 이름 기능을 출시하여 사용자가 다양한 기기의 DNS 설정을 더 직관적으로 식별하고 관리할 수 있어 관리 경험이 크게 향상됩니다.
---

## 기능 소개

사용자 경험을 향상시키기 위해 NullPrivate은 이제 사용자 정의 클라이언트 이름 기능을 지원합니다. 이 기능을 통해 다양한 기기에 독특한 식별 이름을 설정할 수 있어 기기 관리가 더 직관적이고 편리해집니다.

![클라이언트 관리 화면](/images/blog-add-customize-client-name-Sgg2AdobuU.png)

## 설정 가이드

기기 유형에 따라 설정 방법이 약간 다릅니다:

### Android 기기

도메인 이름 앞에 사용자 정의 접두사를 추가하기만 하면 됩니다. 형식은 다음과 같습니다:
```
{기기 이름}.{기존 도메인}
```
예시: `xiaomi-15pro.xxxxxxxx.nullprivate.com`

### iOS 기기

1. "설정 안내" 페이지로 이동
2. "클라이언트 ID" 입력란에 사용자 정의 이름 입력
3. 새로운 프로필 파일을 다운로드하여 적용

![iOS 설정 화면](/images/blog-add-customize-client-name-202412291426394.png)

### 브라우저 설정 (DoH)

기존 DoH 주소 뒤에 사용자 정의 식별자를 추가합니다:

기존 형식:
```
https://xxxxxxxx.nullprivate.com/dns-query
```

새 형식:
```
https://xxxxxxxx.nullprivate.com/dns-query/{기기 식별자}
```

예시: `https://xxxxxxxx.nullprivate.com/dns-query/pc1-browser`

![브라우저 설정 예시](/images/blog-add-customize-client-name-202412291434042.png)

## 사용 권장 사항

- 기기 이름은 기기 모델, 위치 또는 용도와 같은 의미 있는 식별자를 사용하는 것이 좋습니다
- 특수 문자 사용을 피하고, 영문자, 숫자 및 하이픈 사용을 권장합니다
- 향후 관리를 위해 명명 규칙을 통일하여 유지하는 것이 좋습니다

## 주의 사항

- 사용자 정의 이름은 표시에만 영향을 미치며 서비스 성능에는 영향을 주지 않습니다
- 이름을 변경한 후에는 설정을 다시 적용해야 합니다
- 나중에 참조할 수 있도록 각 기기의 설정 정보를 잘 보관하는 것이 좋습니다
