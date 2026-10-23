---
title: "使用自定义设备名"
---

---
layout: docs
title: カスタムデバイス名の使用
draft: false
categories: ガイド
tags: [ガイド, tutorial]
date: 2025-01-03 15:56:04 +0800
toc: false
comments: false
weight: 0
description: 'デバイスにカスタム識別名を設定：拡張ドメイン名/URLパスで端末を区別し、「クライアントランキング」とログを正確に表示。ルールとスケジュール管理を容易にします。'
---

サービスのリスニングアドレスを直接使用する場合、例：

- `tls://xxxxxxxx.adguardprivate.com`
- `https://xxxxxxxx.adguardprivate.com/dns-query`

管理画面の`クライアントランキング`に表示されるIPはロードバランサーのクラスターIPであり、ユーザーにとって意味がなく、異なるデバイスを区別できません。

![クライアントランキング](/images/docs-startup-tutorial-custom-device-name-202501031714999.png)

`拡張ドメイン名`と`URLパスの追加`によって異なるデバイスを識別できます。

![カスタムクライアント名](/images/docs-startup-tutorial-custom-device-name-202501031714031.png)

- DoTは拡張ドメイン名方式を使用、例：`tls://device1.xxxxxxxx.adguardprivate.com`
- DoHはURLパス追加方式を使用、例：`https://xxxxxxxx.adguardprivate.com/dns-query/device2`

注意点：

- Androidデバイス設定時はプロトコルプレフィックス`tls://`を入力不要、`device1.xxxxxxxx.adguardprivate.com`のみ入力
- Appleデバイスは設定ガイドでクライアントIDを入力し、設定ファイルをダウンロードして設定するため、手動入力不要

![Appleデバイス設定ガイド](/images/docs-startup-tutorial-custom-device-name-202501031715127.png)

> 個人サービスの全デバイスはサービスクエリ制限を共有し、秒あたり`30`リクエストに制限されます。
