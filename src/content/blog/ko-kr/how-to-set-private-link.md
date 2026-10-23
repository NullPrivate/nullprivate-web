---
title: "전용 링크 설정 방법"
description: "寧屏 프라이빗 서비스 구성 가이드: 전용 링크 설정 방법을 자세히 소개하며 Nginx 리버스 프록시 구성을 포함합니다. 프라이빗 서비스를 통해 완전한 백엔드 관리 권한을 얻고, 맞춤형 광고 차단 및 개인정보 보호를 실현합니다."
pubDate: "2024-10-29 11:51:06 +0800"
categories: 가이드
tags: [가이드, blog]
---

일부 유료 AdGuardHome 서비스는 전용 링크를 제공하지만, 사용자가 백엔드 관리에 접근할 수 없도록 하며 관리자가 대신 규칙을 관리합니다.

이는 프라이빗 백엔드 관리 기능을 제공하지 않고, 단순히 도메인 리버스 프록시를 통해 서비스를 구현한 것으로 비용이 상대적으로 낮습니다.

이 기능을 구현하려면 서버를 임대하여 AdGuardHome 서비스를 실행하고, Nginx 리버스 프록시를 구성해야 합니다.

서비스 링크 `5r69hxdx9onl70hp.example.com`를 예로 들면, Nginx 핵심 구성은 다음과 같습니다:

```nginx
http {
  server {
    listen 1080;
    server_name 5r69hxdx9onl70hp.example.com;
    location / {
      proxy_pass http://worker.example.com:5002;
      proxy_set_header Host $http_host;
    }
  }
  server {
    listen 1443 ssl;
    server_name 5r69hxdx9onl70hp.example.com;
    ssl_certificate /app/data/certs/5r69hxdx9onl70hp/fullchain.pem;
    ssl_certificate_key /app/data/certs/5r69hxdx9onl70hp/privkey.pem;
    location / {
      proxy_pass https://worker.example.com:5003;
      proxy_set_header Host $http_host;
    }
  }
}
stream {
  ssl_protocols TLSv1.2 TLSv1.3 SSLv3;
  map $ssl_preread_server_name $targetBackend {
    5r69hxdx9onl70hp.example.com worker.internal.com:5004;
  }
  server {
    listen 1853;
    proxy_pass $targetBackend;
    ssl_preread on;
  }
}
```

각 유료 사용자는 유사한 Nginx 구성을 하나만 추가하면 되며, 도메인 해석을 통해 서버를 가리키면 됩니다. 사용자가 많아지고 단일 애플리케이션 서비스 부담이 커지면 다른 백엔드로 프록시할 수 있습니다.

이러한 서비스는 진정한 개인화를 실현할 수 없으며, 사용자가 백엔드에 접근할 수 있어야 자신의 인터넷 데이터를 진정으로 제어할 수 있으며, 이는 우리의 프라이빗 서비스의 장점입니다. 한 사용자가 실제로 서비스를 독점하여 NullPrivate의 모든 기능을 사용할 수 있습니다.
