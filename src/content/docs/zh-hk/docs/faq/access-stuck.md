---
title: "訪問部分網站速度較慢"
description: "使用 NullPrivate DNS 時部分網站訪問速度較慢的原因分析和解決方案，主要涉及 ECS（Extended Client Subnet）功能的支援問題"
---

## 訪問部分影片網站速度較慢

如果您在使用 NullPrivate 時發現訪問某些網站速度較慢，這可能是由於以下原因：

**ECS 支援:**

NullPrivate 的免費版本不支援 ECS（Extended Client Subnet）功能。 ECS 是一種 DNS 協定擴充，允許 DNS 伺服器根據客戶端的網路位置提供更準確的 DNS 回應。 許多 CDN（內容分發網路）使用 ECS 來將使用者導向到最近的伺服器，從而提高速度。免費版伺服器位於上海和杭州, 

**影響:**

- **速度較慢:** 在沒有 ECS 的情況下，NullPrivate 可能無法將您導向到最佳的 CDN 伺服器，從而導致速度較慢。
- **地理位置不準確:** 您可能會被導向到距離您較遠的伺服器，從而增加延遲。

**解決方案:**

- **升級到付費版:** NullPrivate 的付費版本支援 ECS 功能，可以解決此問題並提高速度。
- **使用其他 DNS 伺服器:** 您可以嘗試使用支援 ECS 的其他 DNS 伺服器。
