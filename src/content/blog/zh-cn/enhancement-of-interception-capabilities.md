---
title: "全新升级--增强版广告拦截规则"
description: "介绍 NullPrivate 新版拦截规则，提供更全面的广告过滤和安全防护能力，同时保持良好的兼容性"
pubDate: "2024-10-28 22:13:55 +0800"
categories: 功能更新
tags: [广告拦截, DNS过滤, 安全防护, 隐私保护]
---

## 规则更新说明

为满足用户对更强力广告拦截的需求，我们全面优化了过滤规则策略。新版规则在保持低误拦截率的同时，显著提升了广告过滤效果。这一更新源于用户反馈，我们在确保网站正常访问的基础上，加入了更多精准的拦截规则。

## 规则列表概览

我们整理了以下专业规则列表，您可以根据具体需求选择使用：

### 基础防护规则

| 类别       | AdGuard                                                                   | 功能说明                         |
| ---------- | ------------------------------------------------------------------------- | -------------------------------- |
| 广告拦截   | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)      | 全面过滤各类广告服务器和广告网站 |
| 追踪防护   | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt) | 阻止用户行为跟踪和个人信息收集   |
| 重定向防护 | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt) | 防止恶意网址重定向               |

### 内容过滤规则

| 类别     | AdGuard                                                                     | 描述                                                                |
| -------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 欺诈网站 | [Link](https://blocklistproject.github.io/Lists/adguard/abuse-ags.txt)      | 专门用于欺骗用户的网站列表                                          |
| 广告     | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)        | 广告服务器和广告网站                                                |
| 加密货币 | [Link](https://blocklistproject.github.io/Lists/adguard/crypto-ags.txt)     | 加密货币和挖矿相关网站 <br> <sup>可能会影响正常的加密货币网站</sup> |
| 毒品     | [Link](https://blocklistproject.github.io/Lists/adguard/drugs-ags.txt)      | 非法药品相关网站 <br><sub>包括在美国非法持有的处方药</sub>          |
| 全部规则 | [Link](https://blocklistproject.github.io/Lists/adguard/everything-ags.txt) | 包含所有非测试版列表的域名                                          |
| 脸书     | [Link](https://blocklistproject.github.io/Lists/adguard/facebook-ags.txt)   | 屏蔽 FB 及其相关服务                                                |
| 诈骗     | [Link](https://blocklistproject.github.io/Lists/adguard/fraud-ags.txt)      | 诈骗网站                                                            |
| 赌博     | [Link](https://blocklistproject.github.io/Lists/adguard/gambling-ags.txt)   | 所有赌博相关网站（合法和非法）                                      |
| 恶意软件 | [Link](https://blocklistproject.github.io/Lists/adguard/malware-ags.txt)    | 已知的恶意软件托管网站                                              |
| 钓鱼     | [Link](https://blocklistproject.github.io/Lists/adguard/phishing-ags.txt)   | 用于网络钓鱼的网站                                                  |
| 盗版     | [Link](https://blocklistproject.github.io/Lists/adguard/piracy-ags.txt)     | 已知的非法下载网站                                                  |
| 色情     | [Link](https://blocklistproject.github.io/Lists/adguard/porn-ags.txt)       | 色情或推广色情的网站                                                |
| 勒索软件 | [Link](https://blocklistproject.github.io/Lists/adguard/ransomware-ags.txt) | 已知的勒索软件托管或包含勒索软件的网站                              |
| 重定向   | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt)   | 将你从预期网站重定向到其他网站的网站                                |
| 骗局     | [Link](https://blocklistproject.github.io/Lists/adguard/scam-ags.txt)       | 旨在诈骗用户的网站                                                  |
| 抖音     | [Link](https://blocklistproject.github.io/Lists/adguard/tiktok-ags.txt)     | 复制并粘贴到你的设备上                                              |
| 种子     | [Link](https://blocklistproject.github.io/Lists/adguard/torrent-ags.txt)    | 种子目录 <br> <sub>可能会屏蔽用于合法软件下载的合法种子网站</sub>   |
| 跟踪     | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt)   | 专门用于跟踪和收集访客信息的网站                                    |

## 使用建议

1. **循序渐进**

   - 建议从基础防护规则开始使用
   - 根据实际需求逐步添加其他规则
   - 定期检查并更新规则列表

2. **性能优化**

   - 避免同时启用过多规则
   - 优先选择与您需求最相关的规则
   - 定期清理未使用的规则

3. **问题排查**
   - 遇到误拦截时及时记录并反馈
   - 可临时禁用特定规则进行测试
   - 必要时使用自定义白名单

## 注意事项

- 部分规则可能影响特定网站的正常访问
- 建议定期检查规则更新
- 如遇频繁误拦截，请及时联系我们

对于需要更灵活控制的用户，我们提供专业版服务，支持完全自定义规则配置。如有任何问题，欢迎随时反馈。
