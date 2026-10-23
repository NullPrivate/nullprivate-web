---
title: "공공 서비스"
description: "무료 공공 서비스 안내: 기본 광고 차단 및 개인정보 보호를 위한 암호화 DNS 연결 규칙, 선택 권장사항 및 활성화된 구독 목록."
sidebar:
  order: 2
---

우리는 무료 공공 서비스를 제공하며 널리 사용되는 도메인 목록을 설정했습니다.

## 공공 서비스 규칙

공공 서비스는 비교적 균형 잡힌 광고 차단 규칙을 사용하며, 오탐 차단이나 미차단이 발생할 수 있습니다. 규칙 목록은 다음과 같습니다:

- [AdGuard DNS filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt)
- [AdGuard DNS Popup Hosts filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt)
- [CHN: AdRules DNS List](https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt)
- [CHN: anti-AD](https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt)
- [AWAvenue Ads Rule](https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt)
- [WindowsSpyBlocker](https://adguardteam.github.io/HostlistsRegistry/assets/filter_23.txt)
- [anti-AD](https://anti-ad.net/adguard.txt)
- [easylist](https://anti-ad.net/easylist.txt)
- [OISD Blocklist Small](https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt)

일부 사용자는 노인을 위한 보호를 설정하기 때문에, 우리는 다음과 같은 보안 차단 규칙도 사용합니다:

- [HaGeZi's Threat Intelligence Feeds](https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt)
- [HaGeZi's Badware Hoster Blocklist](https://adguardteam.github.io/HostlistsRegistry/assets/filter_55.txt)

또한 공공 서비스는 특정 휴대폰에서 일반적인 방법으로 처리할 수 없는 불필요한 요소를 차단하기 위한 규칙이 있습니다:

```
# huawei search && browser
hisearch-drcn.dt.dbankcloud.com
uc-drcn.hispace.dbankcloud.cn
connect-drcn.hispace.hicloud.com
adx-drcn.op.dbankcloud.cn
hisearch-static-drcn.dbankcdn.com
||configserver.hicloud.com
||configserver.platform.hicloud.com
||configdownload.dbankcdn.cn
||browsercfg-drcn.cloud.dbankcloud.cn
```

## 사용 시 주의사항

공공 서비스는 대다수 사용자를 위해 제공되므로 개인화된 요구사항을 충족할 수 없습니다. 일부 사용자는 광고 차단 효과가 기대에 미치지 못한다고 불평하며, 일부는 오탐 차단으로 인한 게임 로그인 문제를 호소합니다. 공공 서비스가 모든 사용자의 요구를 충족시키기 어려운 점 양해 부탁드립니다. 일부 인터넷 콘텐츠는 일부 사용자에게는 광고로 보일 수 있지만, 다른 사용자에게는 유용한 정보로 보일 수 있으며, 이러한 경우 우리는 이를 유용한 정보로 간주하는 사용자를 우선으로 고려할 것입니다.

오탐 차단으로 인해 WeChat이나 Alipay 미니프로그램 로딩에 문제가 발생하는 경우, 휴대폰의 암호화 DNS 설정을 잠시 끄면 필요한 서비스를 열 수 있습니다. 그러나 운영 경험상 많은 사용자가 필요한 서비스가 정상 작동하지 않을 때 어떻게 해야 할지 모르는 경우가 많으므로, 비전문 사용자의 사용 경험을 고려해야 합니다.

DNS에 익숙한 사용자는 오탐 차단이나 차단이 요구사항을 충족하지 못하는 경우, [개인 서비스 구매](pages/price)를 고려하시기 바랍니다.

개인 서비스는 **접속 기록**, **차단 기록**, **통계 정보**, **사용자 정의 규칙**, **권한 있는 해석** 등의 기능을 제공하여 개인화된 요구사항을 충족시킵니다.

다른 대중적인 요구사항이 있는 경우, 

## 각 플랫폼 설정 방법

### Android

Android는 Android 9 이후부터 네이티브 DNS over TLS(`DoT`)를 지원하며, 2019년 이후 출시된 휴대폰은 모두 지원합니다. 다음 방법으로 활성화할 수 있습니다:

1.  `설정` 열기
2.  `추가 연결` 열기
3.  `암호화 DNS` 열기
4.  `지정된 암호화 DNS 서비스` 선택, 입력: `public.adguardprivate.com`

자체 DNS 서비스는 AdGuard, dnsmasq, clash 등 다양한 구현 방식이 있으며, 네이티브 DoT만이 휴대폰 성능에 0 영향을 미치며, 어떤 타사 애플리케이션에도 의존하지 않고, 어떤 권한도 필요하지 않으며, 어떤 리소스도 차지하지 않으며, 휴대폰 배터리에도 영향을 주지 않습니다. 따라서 네이티브 `DoT` 암호화 DNS 사용을 권장합니다.

### iPhone

iOS 14 이상 버전은 네이티브 DNS over HTTPS(DoH) 및 DNS over TLS(DoT) 암호화 DNS를 지원하며, 다음 방법으로 활성화할 수 있습니다:

1.  기본 브라우저 Safari를 열고, 구성 파일 다운로드: [dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  **설정** 열기
3.  **일반** 열기
4.  **VPN 및 기기 관리** 열기
5.  **구성 파일 설치** 선택

### macOS

macOS Big Sur 이상 버전은 네이티브 DNS over HTTPS(DoH) 및 DNS over TLS(DoT) 암호화 DNS를 지원하며, 다음 방법으로 활성화할 수 있습니다:

1.  기본 브라우저 Safari를 열고, 구성 파일 다운로드: [dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  **시스템 환경설정** 열기
3.  **네트워크** 열기
4.  **VPN 및 기기 관리** 선택
5.  **구성 파일 설치** 선택

<!-- ### Windows

Windows 11 21H2 이후 버전은 네이티브 DNS over HTTPS(`DoH`)를 지원하며, 다음 방법으로 활성화할 수 있습니다:

1.  `설정` 열기
2.  `네트워크 및 인터넷` 열기
3.  `이더넷` 열기
4.  `DNS 서버 할당` 찾기, `편집` 클릭
    1.  `수동` 선택
    2.  `기본 DNS 서버` IPv4에 입력: `111.229.178.206`
    3.  DNS over HTTPS(DoH) 선택: 켜기(수동 템플릿)
    4.  `DoH 템플릿`에 입력: `https://public.adguardprivate.com/dns-query`
    5.  **체크하지 마세요** `실패 시 암호화되지 않은 요청 사용`
    6.  대체 DNS 서버로 `223.5.5.5`(알리 클라우드 공공 DNS 서비스)를 선택 입력하고, `DNS over HTTS 끄기`, `실패 시 암호화되지 않은 요청 사용` 체크.

### Chromium 계열 브라우저(79+)

시스템 수준의 암호화 DNS를 도입하고 싶지 않거나, Windows 10 이전 버전을 사용하는 경우, 브라우저에서만 암호화 DNS를 설정할 수 있습니다. Chromium 79+ 브라우저 버전은 `DoH`를 지원하며, 다음은 Chromium 계열(Chrome/Edge/360/QQ 등) 브라우저의 설정 방법입니다:

1.  Chrome 브라우저 `설정` 열기
2.  `개인정보, 검색 및 서비스` 열기
3.  `보안`으로 스크롤
4.  `안전한 DNS 사용하여 웹사이트의 네트워크 주소를 찾는 방법 지정` 활성화
5.  `서비스 제공업체 선택`에 입력: `https://public.adguardprivate.com/dns-query`  -->
