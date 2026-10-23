---
title: "새로운 업그레이드 — 강화형 광고 차단 규칙"
description: "NullPrivate의 새로운 차단 규칙을 소개합니다. 더욱 포괄적인 광고 필터링과 보안 보호 기능을 제공하면서도 우수한 호환성을 유지합니다."
pubDate: "2024-10-28 22:13:55 +0800"
categories: 기능 업데이트
tags: [광고 차단, DNS 필터링, 보안 보호, 개인정보 보호]
---

## 규칙 업데이트 설명

더욱 강력한 광고 차단을 원하시는 사용자분들의 요구를 충족하기 위해 필터 규칙 전략을 전면적으로 최적화했습니다. 신규 규칙은 오차 차단률을 낮게 유지하면서 광고 필터링 효과를 크게 향상시켰습니다. 이번 업데이트는 사용자 피드백에서 비롯되었으며, 웹사이트 정상 접속이 보장되는 기반 위에 더욱 정밀한 차단 규칙을 추가했습니다.

## 규칙 목록 개요

아래 전문 규칙 목록을 정리해 드립니다. 자신에게 맞는 규칙을 선택하여 사용하실 수 있습니다.

### 기본 보호 규칙

| 분류        | AdGuard                                                                     | 기능 설명                                 |
| ----------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| 광고 차단   | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)        | 각종 광고 서버 및 광고 사이트 전체 필터  |
| 추적 보호   | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt)   | 사용자 행동 추적 및 개인정보 수집 차단   |
| 리다이렉션 보호 | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt) | 악성 URL 리다이렉션 방지                 |

### 콘텐츠 필터링 규칙

| 분류       | AdGuard                                                                       | 설명                                                         |
| ---------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 사기 사이트   | [Link](https://blocklistproject.github.io/Lists/adguard/abuse-ags.txt)        | 사용자에게 사기를 치는 사이트 전용 목록                    |
| 광고        | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)          | 광고 서버 및 광고 사이트                                    |
| 암호화폐   | [Link](https://blocklistproject.github.io/Lists/adguard/crypto-ags.txt)       | 암호화폐 및 채굴 관련 사이트 <br> <sup>정상 암호화폐 사이트까지 영향을 줄 수 있음</sup> |
| 마약        | [Link](https://blocklistproject.github.io/Lists/adguard/drugs-ags.txt)        | 불법 약물 관련 사이트 <br><sub>미국에서 불법 소지되는 처방약 포함</sub> |
| 모든 규칙  | [Link](https://blocklistproject.github.io/Lists/adguard/everything-ags.txt)   | 비테스트 버전을 제외한 모든 목록 도메인 포함                |
| 페이스북   | [Link](https://blocklistproject.github.io/Lists/adguard/facebook-ags.txt)     | 페이스북 및 관련 서비스 차단                                |
| 사기        | [Link](https://blocklistproject.github.io/Lists/adguard/fraud-ags.txt)        | 사기 사이트                                                  |
| 도박        | [Link](https://blocklistproject.github.io/Lists/adguard/gambling-ags.txt)     | 모든 도박 관련 사이트(합법·불법 모두)                       |
| 악성코드   | [Link](https://blocklistproject.github.io/Lists/adguard/malware-ags.txt)      | 알려진 악성코드 호스팅 사이트                               |
| 피싱        | [Link](https://blocklistproject.github.io/Lists/adguard/phishing-ags.txt)     | 피싱 용도로 사용되는 사이트                                  |
| 불법 다운로드 | [Link](https://blocklistproject.github.io/Lists/adguard/piracy-ags.txt)     | 알려진 불법 다운로드 사이트                                 |
| 성인 콘텐츠 | [Link](https://blocklistproject.github.io/Lists/adguard/porn-ags.txt)         | 성인이거나 성인 콘텐츠를 홍보하는 사이트                    |
| 랜섬웨어   | [Link](https://blocklistproject.github.io/Lists/adguard/ransomware-ags.txt)   | 알려진 랜섬웨어 호스팅 혹은 랜섬웨어를 포함한 사이트        |
| 리다이렉션 | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt)     | 예상 사이트에서 다른 사이트로 이동시키는 사이트             |
| 사기        | [Link](https://blocklistproject.github.io/Lists/adguard/scam-ags.txt)         | 사용자를 속이려는 것이 목적인 사이트                         |
| 틱톡        | [Link](https://blocklistproject.github.io/Lists/adguard/tiktok-ags.txt)       | 기기에 복사 및 붙여넣기                                       |
| 토렌트      | [Link](https://blocklistproject.github.io/Lists/adguard/torrent-ags.txt)      | 토렌트 디렉터리 <br> <sub>합법 소프트웨어 다운로드용 합법 토렌트 사이트까지 차단될 수 있음</sub> |
| 추적        | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt)     | 방문자 정보를 전문적으로 수집·추적하는 사이트                |

## 사용 권장사항

1. **점진적 적용**

   - 기본 보호 규칙부터 우선 사용하는 것을 권장합니다.
   - 실제 필요에 따라 다른 규칙을 단계적으로 추가하세요.
   - 규칙 목록을 정기적으로 점검하고 업데이트하세요.

2. **성능 최적화**

   - 동시에 너무 많은 규칙을 활성화하지 않도록 하세요.
   - 자신의 요구와 가장 관련 있는 규칙을 우선 적용하세요.
   - 사용하지 않는 규칙은 정기적으로 정리하세요.

3. **문제 해결**
   - 오차 차단 발생 시 기록하고 즉시 피드백해 주세요.
   - 특정 규칙을 임시로 비활성화하여 테스트해 보세요.
   - 필요시 사용자 정의 화이트리스트를 활용하세요.

## 주의사항

- 일부 규칙은 특정 사이트 정상 접속에 영향을 줄 수 있습니다.
- 규칙 업데이트를 정기적으로 확인하세요.
- 잦은 오차 차단이 발생할 경우 즉시 저희에게 연락해 주세요.

보다 유연한 제어가 필요하신 분은 전문가용 서비스를 통해 완벽한 규칙 구성 커스터마이징을 지원합니다. 궁금하신 점이 있으시면 언제든지 피드백 주세요.
