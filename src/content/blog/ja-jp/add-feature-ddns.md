---
title: "DDNS機能を追加しました"
description: "本記事では新規追加されたDDNS機能について、使用方法・機能特徴・従来型DDNSとの違いを詳細に解説します。NullPrivateまたはAdGuardHomeを利用することで、ユーザーはドメイン購入不要で簡単にプライベート動的DNS（DDNS）を設定可能。マルチプラットフォーム対応と複数認証方式をサポートしています。"
pubDate: "2025-07-21 14:15:47 +0800"
categories: 開発
tags: [開発, blog]
---

NullPrivateサービスをお持ちの場合、DDNS機能がご利用いただけます。

## 概要

NullPrivateがDDNSスクリプトをオープンソース化しました。この動的DNS（DDNS）は、ドメインを購入することなくプライベート動的DNSを迅速に設定するシンプルな方法を提供します。本DDNSスクリプトは[nullprivate.com](https://nullprivate.com)向けに特別開発され、NullPrivateのコア機能を活用することでシームレスな実装が可能です。

## 使用方法

![nullprivate-ddns](/images/blog-add-feature-ddns-nullprivate-ddns-example.webp)

1. NullPrivateがデプロイ済みで稼働中であることを確認
2. DNS書き換え設定に移動し、DDNSスクリプトをダウンロード
3. スクリプトを実行

**Windows**

```powershell
Set-ExecutionPolicy Bypass -Scope Process
./ddns-script.ps1
```

**Linux/macOS**

```bash
chmod +x ddns-script.sh
./ddns-script.sh
```

## 機能特徴

- **迅速で簡単な設定**: 数ステップで構成完了
- **NullPrivateを活用したDDNS機能**: コア機能を介してDDNSを実現
- **マルチプラットフォーム対応**: WindowsおよびUnix系システムをサポート
- **複数認証オプション**: Cookie認証（安全性高・有効期限あり）またはユーザー名/パスワード認証（持続性高・安全性低）をサポート

## 従来型DDNSとの違い

従来型DDNSと比較し、このプライベートDDNSには以下の優位性があります：

- **キャッシュ時間なし**: 変更が即時反映（DNSキャッシュ待機不要）
- **DNS伝播遅延なし**: 更新が即時利用可能
- **ドメイン購入不要**: 疑似ドメインでアクセス可能
- **プライバシー保護**: プライベートDNSサービスに接続したユーザーのみDNS解決可能

## クイックスタートガイド

1. NullPrivateがデプロイ済みで稼働中であることを確認
2. Windows用（win/ddns.ps1）またはUnix系システム用（unix/ddns.sh）スクリプトの指示に従いプライベートDDNSを設定

オープンソースリポジトリ: [https://github.com/NullPrivate/nullprivate-ddns](https://github.com/NullPrivate/nullprivate-ddns)
