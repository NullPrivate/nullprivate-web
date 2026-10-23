---
title: "在家搭建"
description: "詳細教程教您如何在家搭建NullPrivate網絡廣告攔截服務"
---

# 在家搭建NullPrivate

NullPrivate是一個基於AdGuardHome的增強版本，專為提供更好的網絡廣告攔截和私隱保護功能而設計。本教程將指導您如何在家搭建和配置NullPrivate服務。

## 項目簡介

[NullPrivate](https://github.com/NullPrivate/NullPrivate)是[AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)的開源分支版本，提供了SaaS託管服務和豐富的增強功能，旨在為用戶提供更好的DNS解析和網絡過濾體驗。

## 主要功能

### 原始功能
- **網絡級廣告攔截**：在整個網絡範圍內攔截廣告和追蹤器
- **自訂過濾規則**：支援添加個人化的過濾規則
- **加密DNS支援**：支援DNS-over-HTTPS、DNS-over-TLS和DNSCrypt
- **內置DHCP伺服器**：開箱即用的DHCP服務功能
- **客戶端獨立配置**：為每個設備定制專門的設定
- **防沉迷**：攔截成人內容並強制安全搜尋
- **跨平台兼容性**：支援Linux、macOS、Windows等作業系統
- **私隱保護**：不收集使用統計資訊

### NullPrivate新增功能
- **DNS路由規則列表**：使用配置文件中的規則列表自訂DNS路由
- **應用級攔截規則**：針對特定應用的源進行攔截配置
- **動態DNS（DDNS）**：提供動態域名解析功能
- **高級速率限制**：實現高效的流量管理和控制
- **增強部署特性**：支援負載均衡、自動證書維護、優化網絡連接

## 安裝方式

### 方法一：下載二進制文件

1. 訪問[Releases頁面](https://github.com/NullPrivate/NullPrivate/releases)下載適合您作業系統的二進制文件
2. 創建工作目錄：
   ```bash
   mkdir -p ./data
   ```
3. 運行NullPrivate：
   ```bash
   ./NullPrivate -c ./AdGuardHome.yaml -w ./data --web-addr 0.0.0.0:34020 --local-frontend --no-check-update --verbose
   ```

### 方法二：使用Docker

推薦使用Docker方式部署，更簡單且易於管理：

```bash
docker run --rm --name NullPrivate \
  -p 34020:80 \
  -v ./data/container/work:/opt/adguardhome/work \
  -v ./data/container/conf:/opt/adguardhome/conf \
  nullprivate/nullprivate:latest
```

### 支援的平台

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Docker
- ✅ 其他類Unix系統

## 配置說明

### 基本配置
啟動後，訪問Web界面進行初始配置：
- 預設管理地址：`http://localhost:34020`
- 首次運行需要設置管理員賬戶
- 可以導入現有的AdGuardHome配置

### 配置文件
主要配置文件為`AdGuardHome.yaml`，包含：
- DNS伺服器設定
- 過濾規則配置
- 客戶端配置
- 安全設定

## 啟動參數說明

| 參數 | 說明 |
|------|------|
| `-c` | 指定配置文件路徑 |
| `-w` | 指定工作目錄 |
| `--web-addr` | Web管理界面地址和端口 |
| `--local-frontend` | 使用本地前端界面 |
| `--no-check-update` | 禁用自動更新檢查 |
| `--verbose` | 啟用詳細日誌輸出 |

## 使用建議

1. **網絡配置**：將路由器的DNS伺服器設置為NullPrivate的IP地址
2. **規則更新**：定期更新過濾規則以獲得最佳攔截效果
3. **性能監控**：通過Web界面監控DNS查詢統計資訊
4. **安全加固**：啟用HTTPS並設置強密碼
5. **備份配置**：定期備份配置文件和數據

## 故障排除

### 常見問題
- **端口佔用**：確保34020端口未被其他服務使用
- **權限問題**：Linux環境下可能需要適當的文件權限
- **啟動失敗**：檢查配置文件路徑和工作目錄是否存在

### 獲取幫助
- 查看[官方文檔](https://github.com/NullPrivate/NullPrivate#readme)
- 在[GitHub Issues](https://github.com/NullPrivate/NullPrivate/issues)提交問題

## 結語

通過本教程，您應該已經成功在家搭建了NullPrivate服務。現在您可以享受清淨的網絡環境，同時保護個人私隱。NullPrivate提供了豐富的功能和靈活的配置選項，滿足不同用戶的需求。
