---
title: "DDNS动态解析"
description: "使用NullPrivate实现便捷的DDNS动态解析服务"
---

## 什么是DDNS？

DDNS（Dynamic DNS）允许您为动态IP地址绑定一个固定域名，适合家庭宽带用户访问内网设备，如NAS、智能家居控制器等。

## 功能特点

- **简单易用**: 仅需一个脚本即可实现自动更新
- **零额外成本**: 无需购买域名
- **高可靠性**: 依托NullPrivate的DNS基础设施
- **快速生效**: DNS记录更新后即时生效, 无需等待DNS传播

## 使用指导

![explorer_VIZAwW9wSO](/images/docs-startup-tutorial-ddns-explorer_VIZAwW9wSO.webp)

您可以在 `过滤器->DNS重写` 下, 找到DDNS脚本的下载地址.

## 常见问题

### 如何验证是否生效？

可以通过`ping your-domain.name`命令检查解析是否正确指向您的当前IP地址。

或登录服务后台, 查看**过滤器**->**DNS重写**记录.

### 如何设置定时更新？

#### Windows计划任务

1. 打开任务计划程序
2. 创建基本任务
3. 设置运行频率（建议15-30分钟）
4. 程序位置选择PowerShell，参数填入脚本完整命令

#### Linux Cron任务

将以下内容添加到crontab（每15分钟执行一次）：

```sh
*/15 * * * * /path/to/update_dns.sh https://xxxxxxxx.adguardprivate.com admin:password123 nas.home
```

## 注意事项

- 请妥善保管您的用户名和密码，避免泄露
- 建议将更新脚本加入系统计划任务，实现自动运行
- 如遇解析未及时生效，请检查网络连接和凭证是否有效
