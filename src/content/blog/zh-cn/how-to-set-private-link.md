---
title: "如何设置专用链接"
description: "宁屏私有服务配置指南：详细介绍专用链接设置方法，包含Nginx反向代理配置。通过私有服务获得完整后台管理权限，实现个性化广告拦截和隐私保护。"
pubDate: "2024-10-29 11:51:06 +0800"
categories: 指南
tags: [指南, blog]
---

一些收费的AdGuardHome服务提供一个专用链接，不允许用户进入后台管理，管理员代为管理规则。

这表明其没有提供私有后台管理功能，而只是通过域名反向代理实现服务，成本相对较低。

需租用一台服务器运行AdGuardHome服务，并配置Nginx反向代理，以实现该功能。

以服务链接`5r69hxdx9onl70hp.example.com`为例，Nginx关键配置如下：

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

每个付费用户只需新增一条类似的Nginx配置，通过域名解析指向服务器即可。用户较多时，单个应用服务压力较大时，可以代理到不同的后端。

这类服务无法实现真正的个性化, 用户需要能进入后台才能真正掌握自己的上网数据, 而这是我们的私有服务的优点, 一个用户真正独占一个服务, 使用所有NullPrivate的功能。
