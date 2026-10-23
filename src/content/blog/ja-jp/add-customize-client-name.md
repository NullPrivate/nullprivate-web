---
title: "Untitled"
---

---
layout: blog
title: カスタムクライアント名機能のリリース
draft: false
categories: 開発
tags: [開発, DoT, DoH, DNS設定]
date: 2024-12-29 14:01:19 +0800
toc: true
comments: true
weight: 0
description: NullPrivateがカスタムクライアント名機能をリリース。ユーザーが異なるデバイスのDNS設定を直感的に識別・管理できるようになり、管理体験が大幅に向上します。
---

## 機能紹介

ユーザー体験向上のため、NullPrivateではカスタムクライアント名機能をサポートしました。この機能により、異なるデバイスに独自の識別名を設定でき、デバイス管理がより直感的で便利になります。

![クライアント管理画面](/images/blog-add-customize-client-name-Sgg2AdobuU.png)

## 設定ガイド

デバイスタイプによって設定方法が若干異なります：

### Androidデバイス

ドメイン名の前にカスタムプレフィックスを追加するだけです。形式は以下の通り：
```
{デバイス名}.{元のドメイン名}
```
例：`xiaomi-15pro.xxxxxxxx.nullprivate.com`

### iOSデバイス

1. 「設定ガイド」ページに移動
2. 「クライアントID」入力欄にカスタム名を入力
3. 新しい設定ファイルをダウンロードして適用

![iOS設定画面](/images/blog-add-customize-client-name-202412291426394.png)

### ブラウザ設定（DoH）

既存のDoHアドレスの後にカスタム識別子を追加：

元の形式：
```
https://xxxxxxxx.nullprivate.com/dns-query
```

新しい形式：
```
https://xxxxxxxx.nullprivate.com/dns-query/{デバイス識別子}
```

例：`https://xxxxxxxx.nullprivate.com/dns-query/pc1-browser`

![ブラウザ設定例](/images/blog-add-customize-client-name-202412291434042.png)

## 使用上の推奨事項

- デバイス名は意味のある識別子（デバイスモデル、場所、用途など）を使用することを推奨
- 特殊文字の使用を避け、英数字とハイフンの使用を推奨
- 後続の管理のために命名規則を統一

## 注意事項

- カスタム名は表示にのみ影響し、サービス性能には影響しません
- 名前変更後は設定を再適用する必要があります
- 将来の参照のために各デバイスの設定情報を保存することを推奨
