---
title: "Android"
description: "Android 私人 DNS 配置指南：设置 `{设备名}.{用户名}.adguardprivate.com`，启用系统级加密 DNS，减少延迟并提升隐私保护。"
sidebar:
  order: 11
---

## 配置步骤

各品牌手机的具体设置步骤：

### 小米/红米手机

1. 打开`设置`
2. 选择`连接与共享`
3. 点击`私人DNS`
4. 选择`私人DNS服务提供商主机名`
5. 输入：`xiaomi1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

### 三星手机

1. 打开`设置`
2. 选择`连接`
3. 点击`更多连接设置`
4. 选择`私人DNS`
5. 输入：`samsung1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`

> **⚠️ 重要提醒**：
> - **必须添加 `device1.` 前缀**，即 `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com`
> - 直接使用 `{xxxxxxxxxxxxxxxx}.adguardprivate.com` 无法正常工作
> - 请将 {xxxxxxxxxxxxxxxx} 替换为您的专属DNS服务器地址

## 验证配置

配置完成后：

1. 系统会自动验证DNS连接状态
2. 显示"已连接"表示配置成功

## 故障排除

如果配置失败，请检查：

1. **DNS前缀是否正确**：必须使用 `device1.{xxxxxxxxxxxxxxxx}.adguardprivate.com` 格式
2. DNS服务器地址是否正确
3. 网络连接是否正常
4. 账户是否处于激活状态

## 设置演示

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281149211.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
