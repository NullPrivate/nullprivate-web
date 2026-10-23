---
title: "使用自定义设备名"
description: "为设备自定义识别名：通过扩展域名/URL 路径区分终端，精确查看“客户端排行”和日志，便于规则与时间表管理。"
---

如果直接使用服务的监听地址, 如:

- `tls://xxxxxxxx.adguardprivate.com`
- `https://xxxxxxxx.adguardprivate.com/dns-query`

在后台看到的`客户端排行`的IP是负载均衡器的集群IP, 对用户无意义, 无法区分不同设备.

![客户端排行](/images/docs-startup-tutorial-custom-device-name-202501031714999.png)

可以通过`扩展域名`和`增加URL路径`的方式来识别不同设备.

![自定义客户端名称](/images/docs-startup-tutorial-custom-device-name-202501031714031.png)

- DoT使用扩展域名方式, 如`tls://device1.xxxxxxxx.adguardprivate.com`
- DoH使用增加URL路径方式, 如`https://xxxxxxxx.adguardprivate.com/dns-query/device2`

注意:

- 安卓设备设置时不需要输入协议前缀 `tls://`, 只需要输入 `device1.xxxxxxxx.adguardprivate.com`
- 苹果设备在设置指导中, 输入客户端ID, 下载配置文件以进行设置, 无需手动输入

![苹果设备设置指导](/images/docs-startup-tutorial-custom-device-name-202501031715127.png)

> 个人服务的所有设备共享服务的查询限制每秒`30`次请求.
