---
title: "Windows"
---

---
layout: docs
title: Windows
draft: false
categories: ガイド
tags: [ガイド]
date: 2024-04-15 22:48:16 +0800
toc: true
comments: false
weight: 13
description: 'WindowsでDoH/DoT暗号化DNSを設定：システムレベル設定とブラウザ内蔵DoHスキームにより、広告ブロックとプライバシー保護を安定的に有効化します。'
---

## Windows 11

Windows 11 21H2以降ではネイティブでDns over HTTPS(DoH)をサポートしています。以下の方法で有効化できます：

1. `設定`を開く
2. `ネットワークとインターネット`を開く
3. `イーサネット`を開く
4. `DNSサーバーの割り当て`を見つけ、`編集`をクリック
   1. `手動`を選択
   2. `優先DNSサーバー`のIPv4に`120.26.96.167`を入力、IPv6アドレスは`2408:4005:3de:8500:4da1:169e:dc47:1707`
   3. DNS over HTTPS(DoH)の選択：オン（手動テンプレート）
   4. `DoHテンプレート`に`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/windows1`を入力。`{xxxxxxxxxxxxxxxx}`は暗号化DNSサービスのユーザー名、`windows1`はOSの識別番号です。
   5. **チェックしないでください**：`暗号化されていないリクエストを失敗時に使用する`
   6. 代替DNSサーバーには`223.5.5.5`（Alibaba Cloud Public DNSサービス）を入力可能、`DNS over HTTPS オフ`、`暗号化されていないリクエストを失敗時に使用する`をチェック。

## Windows 10 以前のバージョン

Windows 10以前のバージョンではネイティブ暗号化DNSをサポートしていませんが、Chrome/EdgeやChromiumベースのブラウザ（360/QQなどの中国製ブラウザ）を使用している場合、ブラウザ内で`DoH`暗号化DNSを設定できます。Chromeブラウザの設定方法は以下の通り：

1. Chromeブラウザの`設定`を開く
2. `プライバシーとセキュリティ`を開く
3. `セキュリティ`までスクロール
4. `安全なDNSを使用してウェブサイトのネットワークアドレスを検索する方法を指定する`を有効化
5. `サービスプロバイダーを選択`に`https://xxxxxxxxxxxxxxxx.adguardprivate.com/dns-query/browser1`を入力。`{xxxxxxxxxxxxxxxx}`は暗号化DNSサービスのユーザー名、`browser1`はブラウザの識別番号です。

その他のブラウザについては各々の設定方法を参照してください。通常は`設定`→`プライバシー`→`セキュリティ`で関連設定が見つかります。
