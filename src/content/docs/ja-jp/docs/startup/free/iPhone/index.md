---
title: "iPhone"
description: "iPhoneでDNS暗号化を設定する方法を詳しく説明します"
sidebar:
  order: 12
---

## 機能概要

iOS 14以降、iPhoneはネイティブで以下の暗号化DNS機能をサポートしています：
- DNS over HTTPS (DoH) - HTTPSプロトコルによるDNSクエリの暗号化
- DNS over TLS (DoT) - TLSプロトコルによるDNSクエリの暗号化

これらの機能は、DNSハイジャックを防止し、ネットワークプライバシーを効果的に保護します。

## 設定手順

### 1. 設定ファイルをダウンロード
Safariブラウザで設定ファイルをダウンロード：[dot.mobileconfig](../dot.mobileconfig)

### 2. 設定ファイルをインストール
1. `設定`アプリを開く
2. `一般` > `VPNとデバイス管理`に移動
3. **public.adguardprivate.com DoT** 設定ファイルを選択してインストール

## 特別な注意事項

iCloud Private Relayを有効にしている場合：
- 設定で手動でこの機能をオフにするか、
- この設定ファイルをダウンロードしてインストールしてください：[disable-icloud-private-relay.mobileconfig](../disable-icloud-private-relay.mobileconfig)

> ⚠️ **セキュリティ警告**  
> 設定ファイルのインストールには特に注意してください。当サイトが提供する設定ファイルは合法的なプライバシー保護と広告フィルタリングサービスのみを目的としています。  
> 不明な出所の設定ファイルを安易にインストールしないでください。デバイスのセキュリティが危険にさらされる可能性があります。

## 設定デモ動画

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281117331.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
