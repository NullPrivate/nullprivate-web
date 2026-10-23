---
title: "専用リンクの設定方法"
description: "寧屏プライベートサービス設定ガイド：専用リンクの設定方法を詳しく解説し、Nginxリバースプロキシ設定も含む。プライベートサービスによりフルバックグラウンド管理権限を得て、パーソナライズされた広告ブロックとプライバシー保護を実現する。"
pubDate: "2024-10-29 11:51:06 +0800"
categories: ガイド
tags: [ガイド, blog]
---

一部の有料AdGuardHomeサービスでは、専用リンクを提供するが、ユーザーはバックグラウンド管理にアクセスできず、管理者がルールを代行管理する。

これは、プライベートバックグラウンド管理機能が提供されていないことを示しており、ドメインのリバースプロキシによってサービスを実現しているだけで、コストは比較的低い。

サーバーを1台レンタルし、AdGuardHomeサービスを実行し、Nginxリバースプロキシを設定して、この機能を実現する必要がある。

サービスリンク`5r69hxdx9onl70hp.example.com`を例に、Nginxの主要な設定は以下の通り：

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

各有料ユーザーは、同様のNginx設定を1つ追加するだけで、ドメイン解決でサーバーを指す。ユーザーが多く、単一アプリケーションサービスの負荷が高くなった場合、異なるバックエンドにプロキシすることができる。

このようなサービスでは、真のパーソナライゼーションは実現できない。ユーザーはバックグラウンドにアクセスして初めて自分のインターネットデータを完全に把握できる。これこそが私たちのプライベートサービスの利点であり、1人のユーザーがサービスを真に占有し、NullPrivateの全機能を使用できる。
