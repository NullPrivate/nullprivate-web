---
title: "집에서 구축하기"
description: "집에서 NullPrivate 네트워크 광고 차단 서비스를 구축하는 상세 튜토리얼"
---

# 집에서 NullPrivate 구축하기

NullPrivate는 AdGuardHome 기반의 향상된 버전으로, 더 나은 네트워크 광고 차단 및 개인정보 보호 기능을 제공하도록 설계되었습니다. 이 튜토리얼은 집에서 NullPrivate 서비스를 구축하고 구성하는 방법을 안내합니다.

## 프로젝트 소개

[NullPrivate](https://github.com/NullPrivate/NullPrivate)는 [AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)의 오픈소스 포크 버전으로, SaaS 호스팅 서비스와 풍부한 향상된 기능을 제공하여 사용자에게 더 나은 DNS 해석 및 네트워크 필터링 경험을 제공합니다.

## 주요 기능

### 원본 기능
- **네트워크 수준 광고 차단**: 전체 네트워크 범위에서 광고 및 추적기 차단
- **사용자 정의 필터링 규칙**: 개인화된 필터링 규칙 추가 지원
- **암호화된 DNS 지원**: DNS-over-HTTPS, DNS-over-TLS 및 DNSCrypt 지원
- **내장 DHCP 서버**: 즉시 사용 가능한 DHCP 서버 기능
- **클라이언트별 독립 구성**: 각 장치에 맞춤 설정 제공
- **성인 콘텐츠 차단**: 성인 콘텐츠 차단 및 안전 검색 강제
- **크로스 플랫폼 호환성**: Linux, macOS, Windows 등 다양한 운영체제 지원
- **개인정보 보호**: 사용 통계 정보 수집하지 않음

### NullPrivate 신규 기능
- **DNS 라우팅 규칙 목록**: 구성 파일의 규칙 목록을 사용하여 DNS 라우팅 사용자 정의
- **애플리케이션 수준 차단 규칙**: 특정 애플리케이션 소스에 대한 차단 구성
- **동적 DNS(DDNS)**: 동적 도메인 이름 해석 기능 제공
- **고급 속도 제한**: 효율적인 트래픽 관리 및 제어 구현
- **향상된 배포 기능**: 로드 밸런싱, 자동 인증서 유지 관리, 최적화된 네트워크 연결 지원

## 설치 방법

### 방법 1: 바이너리 파일 다운로드

1. [릴리즈 페이지](https://github.com/NullPrivate/NullPrivate/releases)에서 운영체제에 맞는 바이너리 파일 다운로드
2. 작업 디렉토리 생성:
   ```bash
   mkdir -p ./data
   ```
3. NullPrivate 실행:
   ```bash
   ./NullPrivate -c ./AdGuardHome.yaml -w ./data --web-addr 0.0.0.0:34020 --local-frontend --no-check-update --verbose
   ```

### 방법 2: Docker 사용

Docker 방식으로 배포를 권장하며, 더 간단하고 관리하기 쉽습니다:

```bash
docker run --rm --name NullPrivate \
  -p 34020:80 \
  -v ./data/container/work:/opt/adguardhome/work \
  -v ./data/container/conf:/opt/adguardhome/conf \
  nullprivate/nullprivate:latest
```

### 지원 플랫폼

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Docker
- ✅ 기타 유닉스 계열 시스템

## 구성 설명

### 기본 구성
시작 후 웹 인터페이스를 통해 초기 구성:
- 기본 관리 주소: `http://localhost:34020`
- 첫 실행 시 관리자 계정 설정 필요
- 기존 AdGuardHome 구성 가져오기 가능

### 구성 파일
주요 구성 파일은 `AdGuardHome.yaml`이며 다음을 포함합니다:
- DNS 서버 설정
- 필터링 규칙 구성
- 클라이언트 구성
- 보안 설정

## 시작 매개변수 설명

| 매개변수 | 설명 |
|------|------|
| `-c` | 구성 파일 경로 지정 |
| `-w` | 작업 디렉토리 지정 |
| `--web-addr` | 웹 관리 인터페이스 주소 및 포트 |
| `--local-frontend` | 로컬 프론트엔드 인터페이스 사용 |
| `--no-check-update` | 자동 업데이트 확인 비활성화 |
| `--verbose` | 상세 로그 출력 활성화 |

## 사용 권장사항

1. **네트워크 구성**: 라우터의 DNS 서버를 NullPrivate의 IP 주소로 설정
2. **규칙 업데이트**: 최적의 차단 효과를 위해 필터링 규칙을 정기적으로 업데이트
3. **성능 모니터링**: 웹 인터페이스를 통해 DNS 쿼리 통계 정보 모니터링
4. **보안 강화**: HTTPS 활성화 및 강력한 비밀번호 설정
5. **구성 백업**: 구성 파일 및 데이터를 정기적으로 백업

## 문제 해결

### 일반적인 문제
- **포트 사용 중**: 34020 포트가 다른 서비스에서 사용되지 않는지 확인
- **권한 문제**: Linux 환경에서 적절한 파일 권한이 필요할 수 있음
- **시작 실패**: 구성 파일 경로와 작업 디렉토리가 존재하는지 확인

### 도움 받기
- [공식 문서](https://github.com/NullPrivate/NullPrivate#readme) 확인
- [GitHub Issues](https://github.com/NullPrivate/NullPrivate/issues)에 문제 제출

## 마무리

이 튜토리얼을 통해 집에서 NullPrivate 서비스를 성공적으로 구축했을 것입니다. 이제 깨끗한 네트워크 환경을 즐기면서 개인 정보를 보호할 수 있습니다. NullPrivate는 풍부한 기능과 유연한 구성 옵션을 제공하여 다양한 사용자의 요구를 충족시킵니다.
