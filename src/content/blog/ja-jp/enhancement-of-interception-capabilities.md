---
title: "フルアップグレード - 強化版広告ブロックルール"
description: "NullPrivate 新版ブロックルールを紹介。より包括的な広告フィルタリングとセキュリティ保護機能を提供しながら、優れた互換性も維持します"
pubDate: "2024-10-28 22:13:55 +0800"
categories: 機能アップデート
tags: [広告ブロック, DNSフィルタリング, セキュリティ保護, プライバシー保護]
---

## ルール更新説明

より強力な広告ブロックをご要望のユーザー様に応え、フィルタリングルール戦略を全面的に最適化しました。新版ルールは、低誤ブロック率を維持しながら、広告フィルタリング効果を大幅に向上させています。このアップデートはユーザーフィードバックに基づいており、ウェブサイトへの正常なアクセスを確保した上で、より正確なブロックルールを追加しました。

## ルールリスト概要

以下の専門ルールリストを整理しましたので、ご要望に応じてご選択ください。

### 基本保護ルール

| カテゴリー | AdGuard                                                                   | 機能説明                                     |
| ---------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| 広告ブロック | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)      | 各種広告サーバーおよび広告サイトを全面的にフィルタリング |
| トラッキング保護 | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt) | ユーザーの行動トラッキングや個人情報収集をブロック |
| リダイレクト保護 | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt) | 悪意あるURLリダイレクトを防止 |

### コンテンツフィルタリングルール

| カテゴリー | AdGuard                                                                     | 説明                                                                |
| -------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 詐欺サイト | [Link](https://blocklistproject.github.io/Lists/adguard/abuse-ags.txt)      | ユーザーを欺く目的のサイトリスト                                    |
| 広告     | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)        | 広告サーバーおよび広告サイト                                        |
| 暗号通貨 | [Link](https://blocklistproject.github.io/Lists/adguard/crypto-ags.txt)     | 暗号通貨およびマイニング関連サイト <br> <sup>正常な暗号通貨サイトに影響を与える可能性があります</sup> |
| 薬物     | [Link](https://blocklistproject.github.io/Lists/adguard/drugs-ags.txt)      | 違法薬物関連サイト <br><sub>アメリカにおいて違法に所持されている処方薬を含む</sub> |
| 全ルール | [Link](https://blocklistproject.github.io/Lists/adguard/everything-ags.txt) | すべての非テスト版リストのドメインを含む                            |
| Facebook | [Link](https://blocklistproject.github.io/Lists/adguard/facebook-ags.txt)   | Facebookおよび関連サービスをブロック                                |
| 詐欺     | [Link](https://blocklistproject.github.io/Lists/adguard/fraud-ags.txt)      | 詐欺サイト                                                          |
| ギャンブル | [Link](https://blocklistproject.github.io/Lists/adguard/gambling-ags.txt)   | すべてのギャンブル関連サイト（合法・違法を問わず）                  |
| マルウェア | [Link](https://blocklistproject.github.io/Lists/adguard/malware-ags.txt)    | 既知のマルウェアホスティングサイト                                  |
| フィッシング | [Link](https://blocklistproject.github.io/Lists/adguard/phishing-ags.txt)   | フィッシングに使用されるサイト                                      |
| 違法DL | [Link](https://blocklistproject.github.io/Lists/adguard/piracy-ags.txt)     | 既知の違法ダウンロードサイト                                        |
| ポルノ     | [Link](https://blocklistproject.github.io/Lists/adguard/porn-ags.txt)       | ポルノまたはポルノを宣伝するサイト                                  |
| ランサムウェア | [Link](https://blocklistproject.github.io/Lists/adguard/ransomware-ags.txt) | 既知のランサムウェアをホスティングまたは含むサイト                  |
| リダイレクト | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt)   | 意図したサイトから他のサイトへリダイレクトするサイト                |
| スキャム | [Link](https://blocklistproject.github.io/Lists/adguard/scam-ags.txt)       | ユーザーを詐欺しようとするサイト                                    |
| TikTok | [Link](https://blocklistproject.github.io/Lists/adguard/tiktok-ags.txt)     | デバイスにコピー＆ペースト用                                        |
| トレント | [Link](https://blocklistproject.github.io/Lists/adguard/torrent-ags.txt)    | トレントディレクトリ <br> <sub>合法ソフトウェアDLに使用される合法トレントサイトをブロックする可能性があります</sub> |
| トラッキング | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt)   | 訪問者の情報をトラッキングおよび収集することを目的としたサイト      |

## 使用に関する推奨事項

1. **段階的導入**

   - 基本保護ルールから開始することを推奨
   - 実際のニーズに応じて他のルールを段階的に追加
   - 定期的にルールリストをチェック・アップデート

2. **パフォーマンス最適化**

   - 同時に多くのルールを有効にしないことを推奨
   - 要件に最も関連性の高いルールを優先選択
   - 未使用のルールは定期的に削除

3. **トラブルシューティング**
   - 誤ブロックが発生した場合は、必ず記録しフィードバック
   - 特定のルールを一時的に無効にしてテスト可能
   - 必要に応じてカスタムホワイトリストを使用

## 注意事項

- 一部のルールは特定サイトへの正常なアクセスに影響を与える可能性があります
- ルールアップデートは定期的にチェックすることを推奨
- 頻繁な誤ブロックが発生する場合は、お手数ですがご連絡ください

より柔軟な制御が必要なユーザー様には、プロフェッショナル版サービスをご用意しており、完全なカスタムルール設定をサポートしています。ご不明な点がございましたら、お気軽にお問い合わせください。
