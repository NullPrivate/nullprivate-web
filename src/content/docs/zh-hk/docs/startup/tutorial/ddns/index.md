---
title: "DDNS動態解析"
description: "使用NullPrivate實現便捷的DDNS動態解析服務"
---

## 什麼是DDNS？

DDNS（Dynamic DNS）允許您為動態IP地址綁定一個固定域名，適合家庭寬頻用戶存取內網設備，如NAS、智能家居控制器等。

## 功能特點

- **簡單易用**: 僅需一個指令碼即可實現自動更新
- **零額外成本**: 無需購買域名
- **高可靠性**: 依託NullPrivate的DNS基礎設施
- **快速生效**: DNS記錄更新後即時生效, 無需等待DNS傳播

## 使用指導

![explorer_VIZAwW9wSO](/images/docs-startup-tutorial-ddns-explorer_VIZAwW9wSO.webp)

您可以在 `過濾器->DNS重寫` 下, 找到DDNS指令碼的下載地址.

## 常見問題

### 如何驗證是否生效？

可以通過`ping your-domain.name`指令檢查解析是否正確指向您的當前IP地址。

或登入服務後台, 查看**過濾器**->**DNS重寫**記錄.

### 如何設定定時更新？

#### Windows計劃任務

1. 開啟工作排程器
2. 建立基本工作
3. 設定執行頻率（建議15-30分鐘）
4. 程式位置選擇PowerShell，參數填入指令碼完整指令

#### Linux Cron任務

將以下內容新增到crontab（每15分鐘執行一次）：

```sh
*/15 * * * * /path/to/update_dns.sh https://xxxxxxxx.adguardprivate.com admin:password123 nas.home
```

## 注意事項

- 請妥善保管您的使用者名稱和密碼，避免洩露
- 建議將更新指令碼加入系統計劃任務，實現自動執行
- 如遇解析未及時生效，請檢查網路連線和憑證是否有效
