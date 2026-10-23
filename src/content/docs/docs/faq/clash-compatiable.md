---
title: "Clash兼容"
description: "Clash/Clash Verge 与加密 DNS 并用时的设置建议：避免 DoT/DoH 被覆盖，保障加密生效与分流共存。"
---

安卓设备使能clash后, 设备的`dot`会失效, 按以下方法调整设置.

Clash -> 设置 -> 覆写 -> DNS -> **策略: 不修改**
