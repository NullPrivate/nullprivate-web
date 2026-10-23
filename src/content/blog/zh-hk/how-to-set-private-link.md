---
title: "如何設定專用連結"
description: "寧屏私有服務配置指南：詳細介紹專用連結設定方法，包含Nginx反向代理配置。透過私有服務獲得完整後台管理權限，實現個人化廣告攔截和私隱保護。"
pubDate: "2024-10-29 11:51:06 +0800"
categories: 指南
tags: [指南, blog]
---

一些收費的AdGuardHome服務提供一個專用連結，不允許用戶進入後台管理，管理員代為管理規則。

這表明其沒有提供私有後台管理功能，而只是透過域名反向代理實現服務，成本相對較低。

需租用一台伺服器運行AdGuardHome服務，並配置Nginx反向代理，以實現該功能。

以服務連結`5r69hxdx9onl70hp.example.com`為例，Nginx關鍵配置如下：

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

每個付費用戶只需新增一條類似的Nginx配置，透過域名解析指向伺服器即可。用戶較多時，單個應用服務壓力較大時，可以代理到不同的後端。

這類服務無法實現真正的個人化, 用戶需要能進入後台才能真正掌握自己的上網數據, 而這是我們的私有服務的優點, 一個用戶真正獨佔一個服務, 使用所有NullPrivate的功能。
