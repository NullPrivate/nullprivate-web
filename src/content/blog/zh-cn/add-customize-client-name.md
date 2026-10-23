---
title: "推出自定义客户端名称功能"
description: "NullPrivate 推出自定义客户端名称功能，让用户可以更直观地识别和管理不同设备的 DNS 配置，大幅提升管理体验。"
pubDate: "2024-12-29 14:01:19 +0800"
categories: 开发
tags: [开发, DoT, DoH, DNS配置]
---

## 功能介绍

为了提升用户体验，NullPrivate 现已支持自定义客户端名称功能。通过这项功能，您可以为不同设备设置独特的标识名称，使设备管理更加直观和便捷。

![客户端管理界面](/images/blog-add-customize-client-name-Sgg2AdobuU.png)

## 配置指南

根据不同设备类型，配置方式略有不同：

### Android 设备

只需在域名前添加自定义前缀即可，格式如下：
```
{设备名称}.{原有域名}
```
示例：`xiaomi-15pro.xxxxxxxx.nullprivate.com`

### iOS 设备

1. 进入"设置指导"页面
2. 在"客户端ID"输入框中填入自定义名称
3. 下载并应用新的配置文件

![iOS配置界面](/images/blog-add-customize-client-name-202412291426394.png)

### 浏览器配置（DoH）

在原有 DoH 地址后添加自定义标识：

原有格式：
```
https://xxxxxxxx.nullprivate.com/dns-query
```

新格式：
```
https://xxxxxxxx.nullprivate.com/dns-query/{设备标识}
```

示例：`https://xxxxxxxx.nullprivate.com/dns-query/pc1-browser`

![浏览器配置示例](/images/blog-add-customize-client-name-202412291434042.png)

## 使用建议

- 设备名称建议使用有意义的标识，如设备型号、位置或用途
- 避免使用特殊字符，建议使用字母、数字和连字符
- 保持命名规范统一，便于后期管理

## 注意事项

- 自定义名称仅影响显示，不会影响服务性能
- 修改名称后需要重新应用配置才能生效
- 建议保存好各设备的配置信息，以便日后参考
