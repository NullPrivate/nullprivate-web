---
title: "パブリックサービス"
description: "公共無料サービスの説明：基本的な広告ブロックとプライバシー保護を行う暗号化 DNS 接続ルール、選択推奨、および有効化済みサブスクリプション一覧。"
sidebar:
  order: 2
---

私たちは無料のパブリックサービスを提供しており、広く利用されているドメインリストを設定しています。

## パブリックサービスルール

パブリックサービスではバランスの取れた広告ブロックルールを使用しており、誤ってブロックしたりブロックしきれなかったりする場合があります。ルールリストは以下の通りです：

- [AdGuard DNS filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt)
- [AdGuard DNS Popup Hosts filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt)
- [CHN: AdRules DNS List](https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt)
- [CHN: anti-AD](https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt)
- [AWAvenue Ads Rule](https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt)
- [WindowsSpyBlocker](https://adguardteam.github.io/HostlistsRegistry/assets/filter_23.txt)
- [anti-AD](https://anti-ad.net/adguard.txt)
- [easylist](https://anti-ad.net/easylist.txt)
- [OISD Blocklist Small](https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt)

一部のユーザーは高齢者向けの保護を設定するため、セキュリティブロックルールも使用しています。ルールリストは以下の通りです：

- [HaGeZi's Threat Intelligence Feeds](https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt)
- [HaGeZi's Badware Hoster Blocklist](https://adguardteam.github.io/HostlistsRegistry/assets/filter_55.txt)

さらにパブリックサービスでは、スマートフォンで通常の手段では処理できない迷惑アプリをブロックするための以下のルールも適用しています：

```
# huawei search && browser
hisearch-drcn.dt.dbankcloud.com
uc-drcn.hispace.dbankcloud.cn
connect-drcn.hispace.hicloud.com
adx-drcn.op.dbankcloud.cn
hisearch-static-drcn.dbankcdn.com
||configserver.hicloud.com
||configserver.platform.hicloud.com
||configdownload.dbankcdn.cn
||browsercfg-drcn.cloud.dbankcloud.cn
```

## 使用上の注意事項

パブリックサービスは多くの人々のために提供されているため、個別のニーズには対応できません。広告ブロック効果が期待に届かないと不満を述べるユーザーもいれば、誤ってブロックされたことでゲームログインに問題が生じたと不満を述べるユーザーもいます。申し訳ありませんが、パブリックサービスではすべての人のニーズに応えることは難しいです。インターネット上のコンテンツの一部は、ある人々にとっては広告に見えても、別の人々にとっては有益な情報である場合があり、このような場合には、それを有益な情報と捉えるユーザーを優先する傾向があります。

誤ってブロックされたことで、WeChatやAlipayのミニプログラムの読み込みに問題が生じた場合は、スマートフォンの暗号化DNS設定を一時的にオフにするだけで、必要なサービスを開くことができます。しかし、私たちの運営経験によれば、必要なサービスが正常に動作しない場合にどう対処すべきかを理解していないユーザーが多く、非専門ユーザーの使用体験にも配慮する必要があります。

DNSについて理解のあるユーザーで、誤ってブロックされた場合やブロックがニーズに応えない場合は、[プライベートサービスの購入](pages/price)をご検討ください。

プライベートサービスでは**アクセス記録**、**ブロック記録**、**統計情報**、**カスタムルール**、**権威ある解決**などの機能を提供し、個別のニーズに対応しています。

その他の大衆的なニーズがございましたら、

## 各プラットフォームの設定方法

### Android

AndroidはAndroid 9以降からネイティブでDNS over TLS(`DoT`)をサポートしており、2019年以降のスマートフォンはすべて対応しています。以下の方法で有効にできます：

1.  `設定`を開く
2.  `その他の接続`を開く
3.  `暗号化DNS`を開く
4.  `指定暗号化DNSサービス`を選択し、以下を入力：`public.adguardprivate.com`

セルフホストDNSサービスにはAdGuard、dnsmasq、clashなど様々な実装方法がありますが、ネイティブDoTのみがスマートフォンのパフォーマンスに0の影響を与え、サードパーティアプリに依存せず、いかなる権限も必要とせず、リソースを占有せず、スマートフォンのバッテリーにも影響を与えません。そのため、ネイティブ`DoT`暗号化DNSの使用を推奨します。

### iPhone

iOS 14以上のバージョンでは、ネイティブのDns over HTTPS(DoH)およびDNS over TLS(DoT)暗号化DNSをサポートしています。以下の方法で有効にできます：

1.  標準ブラウザSafariを開き、構成プロファイルをダウンロード：[dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  **設定**を開く
3.  **一般**を開く
4.  **VPNとデバイス管理**を開く
5.  **構成プロファイルのインストール**を選択

### macOS

macOS Big Sur以上のバージョンでは、ネイティブのDns over HTTPS(DoH)およびDNS over TLS(DoT)暗号化DNSをサポートしています。以下の方法で有効にできます：

1.  標準ブラウザSafariを開き、構成プロファイルをダウンロード：[dot.mobileconfig](https://www.nullprivate.com/docs/startup/dot.mobileconfig)
2.  **システム環境設定**を開く
3.  **ネットワーク**を開く
4.  **VPNとデバイス管理**を選択
5.  **構成プロファイルのインストール**を選択

<!-- ### Windows

Windows 11 21H2以降のバージョンでは、ネイティブのDns over HTTPS(`DoH`)をサポートしています。以下の方法で有効にできます：

1.  `設定`を開く
2.  `ネットワークとインターネット`を開く
3.  `イーサネット`を開く
4.  `DNSサーバー割り当て`を見つけ、`編集`をクリック
    1.  `手動`を選択
    2.  `優先DNSサーバー` IPv4に以下を入力：`111.229.178.206`
    3.  DNS over HTTPS(DoH)を選択：オン（手動テンプレート）
    4.  `DoHテンプレート`に以下を入力：`https://public.adguardprivate.com/dns-query`
    5.  **チェックしない**`失敗時に暗号化されていないリクエストを使用`
    6.  代替DNSサーバーには`223.5.5.5`（Alibaba CloudパブリックDNSサービス）を入力できます。`DNS over HTTS オフ`、`失敗時に暗号化されていないリクエストを使用`にチェックを入れます。

### Chromium系ブラウザ(79+)

システムレベルの暗号化DNSを導入したくない場合や、Windows 10以前のバージョンを使用している場合は、ブラウザのみで暗号化DNSを設定できます。Chromium 79+のブラウザバージョンは`DoH`をサポートしており、以下はChromium系（Chrome/Edge/360/QQなど）ブラウザの設定方法です：

1.  Chromeブラウザの`設定`を開く
2.  `プライバシー、検索、サービス`を開く
3.  `セキュリティ`までスクロール
4.  `安全なDNSを使用してWebサイトのネットワークアドレスを検索する方法を指定する`を有効にする
5.  `サービスプロバイダーの選択`に以下を入力：`https://public.adguardprivate.com/dns-query`  -->
