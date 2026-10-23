---
title: "全新升級——增強版廣告攔截規則"
description: "介紹 NullPrivate 新版攔截規則，提供更全面的廣告過濾和安全防護能力，同時保持優良的兼容性"
pubDate: "2024-10-28 22:13:55 +0800"
categories: 功能更新
tags: [廣告攔截, DNS過濾, 安全防護, 私隱保護]
---

## 規則更新說明

為滿足用戶對更強勁廣告攔截的需求，我們全面優化了過濾規則策略。新版規則在維持低誤攔截率的同時，顯著提升了廣告過濾效果。這次更新源於用戶回饋；我們在確保網站正常瀏覽的基礎上，加入了更多精準的攔截規則。

## 規則列表概覽

我們整理了以下專業規則列表，你可按實際需要選擇使用：

### 基礎防護規則

| 類別       | AdGuard                                                                   | 功能說明                         |
| ---------- | ------------------------------------------------------------------------- | -------------------------------- |
| 廣告攔截   | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)      | 全面過濾各類廣告伺服器及廣告網站 |
| 追蹤防護   | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt) | 阻止用戶行為追蹤及個人資料收集   |
| 重新導向防護 | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt) | 防止惡意網址重新導向             |

### 內容過濾規則

| 類別     | AdGuard                                                                     | 描述                                                                |
| -------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 詐騙網站 | [Link](https://blocklistproject.github.io/Lists/adguard/abuse-ags.txt)      | 專門用於欺騙用戶的網站列表                                          |
| 廣告     | [Link](https://blocklistproject.github.io/Lists/adguard/ads-ags.txt)        | 廣告伺服器及廣告網站                                                |
| 加密貨幣 | [Link](https://blocklistproject.github.io/Lists/adguard/crypto-ags.txt)     | 加密貨幣及挖礦相關網站 <br> <sup>可能會影響正常加密貨幣網站</sup>     |
| 毒品     | [Link](https://blocklistproject.github.io/Lists/adguard/drugs-ags.txt)      | 非法藥品相關網站 <br><sub>包括在港非法持有的處方藥</sub>            |
| 全部規則 | [Link](https://blocklistproject.github.io/Lists/adguard/everything-ags.txt) | 包含所有非測試版清單的域名                                          |
| Facebook | [Link](https://blocklistproject.github.io/Lists/adguard/facebook-ags.txt)   | 屏蔽 FB 及其相關服務                                                |
| 詐騙     | [Link](https://blocklistproject.github.io/Lists/adguard/fraud-ags.txt)      | 詐騙網站                                                            |
| 賭博     | [Link](https://blocklistproject.github.io/Lists/adguard/gambling-ags.txt)   | 所有賭博相關網站（合法與非法）                                      |
| 惡意軟件 | [Link](https://blocklistproject.github.io/Lists/adguard/malware-ags.txt)    | 已知的惡意程式寄存網站                                              |
| 釣魚     | [Link](https://blocklistproject.github.io/Lists/adguard/phishing-ags.txt)   | 用作網絡釣魚的網站                                                  |
| 盜版     | [Link](https://blocklistproject.github.io/Lists/adguard/piracy-ags.txt)     | 已知的非法下載網站                                                  |
| 色情     | [Link](https://blocklistproject.github.io/Lists/adguard/porn-ags.txt)       | 色情或宣傳色情網站                                                  |
| 勒索軟件 | [Link](https://blocklistproject.github.io/Lists/adguard/ransomware-ags.txt) | 已知的勒索軟件寄存或包含勒索程式網站                                |
| 重新導向 | [Link](https://blocklistproject.github.io/Lists/adguard/redirect-ags.txt)   | 把用戶從預期網站重新導向到其他網站的網域                            |
| 騙局     | [Link](https://blocklistproject.github.io/Lists/adguard/scam-ags.txt)       | 旨在欺詐用戶的網站                                                  |
| TikTok   | [Link](https://blocklistproject.github.io/Lists/adguard/tiktok-ags.txt)     | 阻擋並防止於裝置定型複製                                            |
| 種子     | [Link](https://blocklistproject.github.io/Lists/adguard/torrent-ags.txt)    | 種子站點 <br> <sub>可能阻擋合法軟件下載所用的合法種子網站</sub>     |
| 追蹤     | [Link](https://blocklistproject.github.io/Lists/adguard/tracking-ags.txt)   | 專門拿來追蹤與收集訪客資料的網站                                    |

## 使用建議

1. **循序漸進**

   - 建議先從基礎防護規則開始使用
   - 按實際需要逐步添加其他規則
   - 定期檢查並更新規則清單

2. **效能優化**

   - 避免同時啟用過多規則
   - 優先選擇與你最相關的規則
   - 定期清理未使用的規則

3. **問題排查**
   - 遇到誤攔截時請及時記錄並回報
   - 可暫時停用特定規則作測試
   - 必要時可用自訂白名單

## 注意事項

- 部分規則或影響特定網站的正常瀏覽
- 建議定期檢查規則更新
- 若出現頻繁誤攔截，請即時聯絡我們

需要更靈活控制的用戶可選用專業版服務，支援完全自訂規則配置。如有任何問題，歡迎隨時回饋。
