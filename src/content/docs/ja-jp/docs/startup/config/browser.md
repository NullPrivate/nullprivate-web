---
title: "浏览器"
---

---
layout: docs
title: ブラウザ
draft: false
categories: ガイド
tags: [ガイド, startup]
date: 2024-10-23 18:25:24 +0800
toc: false
comments: false
weight: 15
description: 'Chrome/EdgeなどのChromiumブラウザでDoHを有効化：「安全なDNSを使用」を有効にし、専用DoHエンドポイントを入力して、より強力なプライバシー保護と安定した名前解決を実現'
---

Chromium 79以降のブラウザバージョンは`DoH`をサポートしています。Chromium系ブラウザ（Chrome/Edge/360/QQなど）の設定方法は以下の通りです：

1.  Chromeブラウザの`設定`を開く
2.  `プライバシーとセキュリティ`を開く
3.  `セキュリティ`セクションまでスクロール
4.  `安全なDNSを使用してサイトのネットワークアドレスを検索する方法を指定する`を有効化
5.  `サービスプロバイダを選択`に`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1`を入力。`{xxxxxxxxxxxxxxxx}`は専用暗号化DNSサービスのユーザー名、`browser1`はブラウザの識別番号です。
