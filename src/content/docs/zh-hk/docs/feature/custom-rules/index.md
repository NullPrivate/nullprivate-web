---
title: "自訂規則"
description: "NullPrivate 支援多種自訂規則格式，您可以按需要靈活配置。"
sidebar:
  order: 150
---

NullPrivate 支援多種自訂規則格式，您可以按需要靈活配置。以下是常用規則格式及示例：

| 規則格式   | 示例                         | 說明                                    |
| ---------- | ---------------------------- | --------------------------------------- |
| 域名封鎖   | `\|\|example.org^`           | 阻止 example.org 及其所有子域名         |
| 白名單     | `@@\|\|example.org^`         | 將 example.org 及其所有子域名加入白名單 |
| DNS 重定向 | `127.0.0.1 example.org`      | 將 example.org 解析至指定 IP            |
| 註解       | `! 說明文字` 或 `# 說明文字` | 添加規則說明，不影響實際過濾            |
| 正則表達式 | `/REGEX/`                    | 使用正則表達式匹配域名                  |

### 進階用法

- 您可以組合使用多種規則
- 規則的優先級：白名單 > 黑名單 > DNS 重定向
- 支援匯入第三方規則列表

詳細資訊請參考 [AdGuard Home Hosts Blocklists 文件](https://github.com/AdGuardTeam/AdGuardHome/wiki/Hosts-Blocklists)。
