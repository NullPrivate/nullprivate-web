---
title: "Android"
---

---
layout: docs
title: Android
draft: false
categories: ガイド
tags: [ガイド, Android, プライベートDNS]
date: 2024-10-20 15:46:31 +0800
toc: true
comments: false
weight: 11
description: 'AndroidプライベートDNS設定ガイド：`{デバイス名}.{ユーザー名}.adguardprivate.com`を設定し、システムレベルの暗号化DNSを有効化して遅延を減らし、プライバシー保護を向上させます。'
---

## 設定手順

各ブランドのスマートフォンにおける具体的な設定手順：

### Xiaomi/Redmiスマートフォン

1. `設定`を開く
2. `接続と共有`を選択
3. `プライベートDNS`をタップ
4. `プライベートDNSプロバイダーのホスト名`を選択
5. 入力：`xiaomi1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

### Samsungスマートフォン

1. `設定`を開く
2. `接続`を選択
3. `その他の接続設定`をタップ
4. `プライベートDNS`を選択
5. 入力：`samsung1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

> **⚠️ 重要注意**：
> - **`device1.`プレフィックスを必ず追加**してください。つまり `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`
> - `{xxxxxxxxxxxxxxxx}.adguardprivate.com` を直接使用すると動作しません
> - {xxxxxxxxxxxxxxxx} をあなた専用のDNSサーバーアドレスに置き換えてください

## 設定の検証

設定完了後：

1. システムが自動的にDNS接続状態を検証します
2. 「接続済み」と表示されれば設定成功です

## トラブルシューティング

設定が失敗した場合、以下を確認してください：

1. **DNSプレフィックスが正しいか**：`device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com` 形式を使用していること
2. DNSサーバーアドレスが正しいか
3. ネットワーク接続が正常か
4. アカウントが有効状態か

## 設定デモンストレーション

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281149211.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
