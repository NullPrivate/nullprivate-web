---
title: "NullPrivate基本原理"
---

---
layout: docs
title: NullPrivateの基本原理
draft: false
categories: ガイド
tags: [ガイド, tutorial, dns, privacy]
date: 2025-01-15 17:02:25 +0800
toc: true
comments: false
weight: 2
description: DNSレベルでのブロックにより、NullPrivateは広告、トラッカー、悪意のあるサイトを効果的に阻止します
---

## 動作原理の概要

NullPrivateはDNSレベルでのブロックを通じて、ネットワークセキュリティとプライバシーを保護します。これはすべてのドメインリクエストをスクリーニングするスマートな門番のようなものです：

- ✅ 安全なサイト：正常にアクセス
- ❌ 広告ドメイン：ブロック
- ❌ トラッカー：ブロック
- ❌ 悪意のあるサイト：ブロック

## ブロックフローの図解

![NullPrivateブロック基本原理](/images/docs-tutorial-adguardprivate-protection-basics-202501151802544.svg)

## 主な特徴

1. **DNSレベルでのブロック**：リクエスト発生前にブロックするため、より効率的
2. **プラグイン不要**：ネットワークレベルでの保護で、すべてのデバイスに有効
3. **低リソース消費**：DNSリクエストのみを処理するため、デバイス性能への影響は最小限
4. **全デバイス対応**：一度の設定ですべての接続デバイスを保護
