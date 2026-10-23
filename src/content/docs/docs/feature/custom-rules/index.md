---
title: "自定义规则"
description: "NullPrivate 支持多种自定义规则格式，您可以根据需要灵活配置。"
sidebar:
  order: 150
---

NullPrivate 支持多种自定义规则格式，您可以根据需要灵活配置。以下是常用规则格式及示例：

| 规则格式   | 示例                         | 说明                                    |
| ---------- | ---------------------------- | --------------------------------------- |
| 域名屏蔽   | `\|\|example.org^`           | 阻止 example.org 及其所有子域名         |
| 白名单     | `@@\|\|example.org^`         | 将 example.org 及其所有子域名加入白名单 |
| DNS 重定向 | `127.0.0.1 example.org`      | 将 example.org 解析至指定 IP            |
| 注释       | `! 说明文字` 或 `# 说明文字` | 添加规则说明，不影响实际过滤            |
| 正则表达式 | `/REGEX/`                    | 使用正则表达式匹配域名                  |

### 高级用法

- 您可以组合使用多种规则
- 规则的优先级：白名单 > 黑名单 > DNS 重定向
- 支持导入第三方规则列表

详细信息请参考 [AdGuard Home Hosts Blocklists 文档](https://github.com/AdGuardTeam/AdGuardHome/wiki/Hosts-Blocklists)。
