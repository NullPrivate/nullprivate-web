---
title: "使用指南"
description: "私有服务使用指南：访问记录、拦截统计、自定义规则与权威解析，解锁更强的广告拦截、隐私保护与防沉迷管理。"
sidebar:
  order: 1
---

<!--
我们提供了一项广泛使用的免费加密服务: `public.adguardprivate.com`。这是我们的公共服务，提供一定能力的广告拦截和隐私保护功能。然而，由于每个人对广告的感知不同，有些用户可能会觉得拦截能力不足，而另一些用户可能会发现正常的网站被误拦截。由于这是一个公共服务，只能设定较流行的拦截规则，以适应大多数用户的需求。如果您需要更为个性化的拦截规则，或者需要查看网络访问记录，您可以考虑购买私有服务。 -->

<!--
现列举公共服务使用的规则如下:

-   [AdGuard DNS filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt)
-   [AdGuard DNS Popup Hosts filter](https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt)
-   [CHN: AdRules DNS List](https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt)
-   [CHN: anti-AD](https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt)
-   [AWAvenue Ads Rule](https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt)
-   [WindowsSpyBlocker](https://adguardteam.github.io/HostlistsRegistry/assets/filter_23.txt)
-   [anti-AD](https://anti-ad.net/adguard.txt)
-   [easylist](https://anti-ad.net/easylist.txt)

此外公共服务还有以下规则, 以拦截某手机上常规手段无法处理的牛皮藓.

  # huawei search && browser
  hisearch-drcn.dt.dbankcloud.com
  forum-api-drcn.jos.dbankcloud.cn
  uc-drcn.hispace.dbankcloud.cn
  connect-drcn.hispace.hicloud.com
  adx-drcn.op.dbankcloud.cn
  hisearch-static-drcn.dbankcdn.com
  ||configserver.hicloud.com
  ||configserver.platform.hicloud.com
  ||configdownload.dbankcdn.cn
  ||browsercfg-drcn.cloud.dbankcloud.cn -->

## 付费提供的主要服务

### 基础功能

1.  访问记录
1.  拦截记录
1.  统计信息
1.  自定义上游
1.  自定义过滤规则
1.  自定义解析
1.  白名单模式

### 高级功能

1.  HTTP3支持
1.  DDNS支持
1.  ECS支持
1.  按分流规则集解析
1.  阻止指定应用
1.  时间表

## 访问记录

查看上网记录，私有服务提供24小时的网络访问记录查询。

![访问记录](/images/docs-startup-index-访问记录.png)

## 拦截记录

查看拦截记录，了解哪些广告被拦截，以及哪些网站被拦截。

![拦截记录](/images/docs-startup-index-拦截记录.png)

## 统计信息

私有服务提供24小时内的网络访问统计信息，以便了解用户的上网习惯。

统计信息会显示哪些网站被访问最多，以及哪些网站被拦截最多。

![统计信息](/images/docs-startup-index-统计信息.png)

## 自定义规则

在私有服务内创建自定义规则，以拦截个人常用的应用广告，或者放行个人不认为是广告的网站。

用户可能需要查看访问记录，观察启动特定应用时的网站查询记录，以便添加自定义规则。

![自定义规则](/images/docs-startup-index-自定义规则.png)

## 白名单模式

如果需要避免某类型网站被拦截，可以设定白名单模式，只允许访问特定的网站。

白名单的优先级高于黑名单，如果网站在白名单中，则不会被拦截。用户可以将常用的一些网站添加到白名单中，以免被误拦截。

![白名单模式](/images/docs-startup-index-白名单模式.png)

## 权威解析

支持添加企业或家庭内设备的权威解析，将指定名称解析到家庭设备的IP地址，摆脱记忆IP地址的烦恼。

用户不必购买域名，不需要备案，只需在私有服务内添加权威解析规则即可。

<!-- ![DNS重写](/images/docs-startup-index-DNS重写.png) -->

![权威解析](/images/docs-startup-index-权威解析.png)
