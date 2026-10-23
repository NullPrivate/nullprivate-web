---
title: "Android"
---

---
layout: docs
title: Android
draft: false
categories: 指南
tags: [指南, Android, 私有DNS]
date: 2024-10-20 15:46:31 +0800
toc: true
comments: false
weight: 11
description: 'Android 私人 DNS 設定指南：設定 `{裝置名}.{用戶名}.adguardprivate.com`，啟用系統級加密 DNS，減少延遲並提升私隱保護。'
---

## 設定步驟

各品牌手機的具體設定步驟：

### 小米/紅米手機

1. 開啟`設定`
2. 選擇`連接與共享`
3. 點擊`私人DNS`
4. 選擇`私人DNS服務供應商主機名稱`
5. 輸入：`xiaomi1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

### 三星手機

1. 開啟`設定`
2. 選擇`連接`
3. 點擊`更多連接設定`
4. 選擇`私人DNS`
5. 輸入：`samsung1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

> **⚠️ 重要提示**：
> - **必須添加 `device1.` 前綴**，即 `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`
> - 直接使用 `{xxxxxxxxxxxxxxxx}.adguardprivate.com` 無法正常運作
> - 請將 {xxxxxxxxxxxxxxxx} 替換為您的專屬DNS伺服器地址

## 驗證設定

設定完成後：

1. 系統會自動驗證DNS連接狀態
2. 顯示"已連接"表示設定成功

## 故障排除

如果設定失敗，請檢查：

1. **DNS前綴是否正確**：必須使用 `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com` 格式
2. DNS伺服器地址是否正確
3. 網絡連接是否正常
4. 帳戶是否處於啟用狀態

## 設定示範

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281149211.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
