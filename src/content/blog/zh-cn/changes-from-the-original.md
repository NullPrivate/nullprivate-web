---
title: "NullPrivate - 基于AdGuard Home的增强版DNS服务"
description: "NullPrivate提供开箱即用的隐私保护DNS服务，支持广告过滤、DoT、DoH等特性。相比原版AdGuard Home增加了SSL证书管理、安全特性优化、代理功能等企业级功能"
pubDate: "2025-01-20 19:36:59 +0800"
categories: [faq, 产品介绍]
tags: [faq, blog, dns, privacy, adguard, 隐私保护, 广告拦截]
---

# NullPrivate: 专注隐私保护的DNS服务

访问官网了解更多: [NullPrivate](https://www.nullprivate.com)

本项目基于`AdGuard Home`进行二次开发，遵循 `GPL 3.0` 开源协议。

源代码开放在：[GitHub - NullPrivate/NullPrivate](https://github.com/NullPrivate/NullPrivate)

## 功能增强

相比原版AdGuard Home，我们增加了以下特性：

- 📜 自动化SSL证书管理
  - 自动申请与更新证书
  - 支持泛域名证书配置
- 🛡️ 增强的安全特性
  - 智能限流保护
  - 优化的大陆地区访问体验
- ⚙️ 优化的系统配置
  - 禁用DHCP服务，专注DNS功能
- 🔄 支持DDNS
- 🌉 支持代理功能
  - 通过代理下载配置文件
  - 支持DoH/DoT代理
- 🚦 支持DNS分流功能
- 🚫 支持防沉迷app名单

## 托管服务优势

我们提供专业的DNS托管服务，具有以下特点：

- 🏢 阿里云杭州节点部署
- 🌐 全面的协议支持
  - IPv6支持，直连主流IPv6上游
  - DoT (DNS over TLS)
  - DoH (DNS over HTTPS)
  - HTTP/3 支持，显著降低延迟
- 📊 强大的规则管理
  - 支持第三方黑白名单导入
  - 100万条规则容量
- 📝 完善的日志与统计
  - 72小时查询记录保留
  - 24小时详细统计分析
- ⚖️ 负载均衡
  - 多服务器分布式部署
  - 智能负载分配
- 💰 具有竞争力的价格

## 性能与效果评估

DNS层面的广告拦截具有其独特优势：

- 💪 优势
  - 零额外功耗
  - 全设备覆盖
  - 降低设备网络唤醒频率
  - 减少无效数据加载

- ⚠️ 局限性
  - 拦截精度低于浏览器插件
  - 无法达到MITM方案的过滤效果

特别适合移动设备使用场景，在保护隐私的同时兼顾设备续航。
