---
title: "iOS设备恢复设置"
description: "本文介绍如何在iOS设备上恢复DNS设置的方法"
---

如果您在iOS设备上遇到误拦截问题，可以通过以下两种方式恢复原始DNS设置。

## 方案一：临时关闭DNS加密

此方法适用于临时测试是否由DNS设置引起问题：

1. 打开`设置`应用
2. 进入`通用` > `VPN与设备管理`
3. 在`访问限制和代理`部分找到`DNS`选项
4. 选择`自动`即可暂时恢复系统默认设置

## 方案二：完全移除配置

如需彻底移除DNS加密设置：

1. 打开`设置`应用
2. 进入`通用` > `VPN与设备管理`
3. 在`配置描述文件`下找到`public.adguardprivate.com DoT`
4. 点击`移除描述文件`并确认

> 如果您决定永久不再使用NullPrivate, 那一定是我们的服务给您带来了不好的体验, 非常抱歉给您带来的困扰.  
> 公共服务使用了流行的拦截规则, 由于人力的有限, 我们无法知晓所有App的漏拦截或误拦截情况.  
> 如果您希望能自定义规则以适应个性化需求, 可以考虑购买私有服务, 私有服务以极高的性价比提供了专用的服务, 以满足各种需求.

## 配置演示

<video style="max-height: 80%; max-width: 80%; display: block; margin: auto;" controls>
  <source src="/videos/202501281147590.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
