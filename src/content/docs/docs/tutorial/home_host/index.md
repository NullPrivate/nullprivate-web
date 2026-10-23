---
title: "在家搭建"
description: "详细教程教您如何在家搭建NullPrivate网络广告拦截服务"
---

# 在家搭建NullPrivate

NullPrivate是一个基于AdGuardHome的增强版本，专为提供更好的网络广告拦截和隐私保护功能而设计。本教程将指导您如何在家搭建和配置NullPrivate服务。

## 项目简介

[NullPrivate](https://github.com/NullPrivate/NullPrivate)是[AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)的开源分支版本，提供了SaaS托管服务和丰富的增强功能，旨在为用户提供更好的DNS解析和网络过滤体验。

## 主要功能

### 原始功能
- **网络级广告拦截**：在整个网络范围内拦截广告和跟踪器
- **自定义过滤规则**：支持添加个人化的过滤规则
- **加密DNS支持**：支持DNS-over-HTTPS、DNS-over-TLS和DNSCrypt
- **内置DHCP服务器**：开箱即用的DHCP服务功能
- **客户端独立配置**：为每个设备定制专门的设置
- **防沉迷**：拦截成人内容并强制安全搜索
- **跨平台兼容性**：支持Linux、macOS、Windows等操作系统
- **隐私保护**：不收集使用统计信息

### NullPrivate新增功能
- **DNS路由规则列表**：使用配置文件中的规则列表自定义DNS路由
- **应用级拦截规则**：针对特定应用的源进行拦截配置
- **动态DNS（DDNS）**：提供动态域名解析功能
- **高级速率限制**：实现高效的流量管理和控制
- **增强部署特性**：支持负载均衡、自动证书维护、优化网络连接

## 安装方式

### 方法一：下载二进制文件

1. 访问[Releases页面](https://github.com/NullPrivate/NullPrivate/releases)下载适合您操作系统的二进制文件
2. 创建工作目录：
   ```bash
   mkdir -p ./data
   ```
3. 运行NullPrivate：
   ```bash
   ./NullPrivate -c ./AdGuardHome.yaml -w ./data --web-addr 0.0.0.0:34020 --local-frontend --no-check-update --verbose
   ```

### 方法二：使用Docker

推荐使用Docker方式部署，更简单且易于管理：

```bash
docker run --rm --name NullPrivate \
  -p 34020:80 \
  -v ./data/container/work:/opt/adguardhome/work \
  -v ./data/container/conf:/opt/adguardhome/conf \
  nullprivate/nullprivate:latest
```

### 支持的平台

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Docker
- ✅ 其他类Unix系统

## 配置说明

### 基本配置
启动后，访问Web界面进行初始配置：
- 默认管理地址：`http://localhost:34020`
- 首次运行需要设置管理员账户
- 可以导入现有的AdGuardHome配置

### 配置文件
主要配置文件为`AdGuardHome.yaml`，包含：
- DNS服务器设置
- 过滤规则配置
- 客户端配置
- 安全设置

## 启动参数说明

| 参数 | 说明 |
|------|------|
| `-c` | 指定配置文件路径 |
| `-w` | 指定工作目录 |
| `--web-addr` | Web管理界面地址和端口 |
| `--local-frontend` | 使用本地前端界面 |
| `--no-check-update` | 禁用自动更新检查 |
| `--verbose` | 启用详细日志输出 |

## 使用建议

1. **网络配置**：将路由器的DNS服务器设置为NullPrivate的IP地址
2. **规则更新**：定期更新过滤规则以获得最佳拦截效果
3. **性能监控**：通过Web界面监控DNS查询统计信息
4. **安全加固**：启用HTTPS并设置强密码
5. **备份配置**：定期备份配置文件和数据

## 故障排除

### 常见问题
- **端口占用**：确保34020端口未被其他服务使用
- **权限问题**：Linux环境下可能需要适当的文件权限
- **启动失败**：检查配置文件路径和工作目录是否存在

### 获取帮助
- 查看[官方文档](https://github.com/NullPrivate/NullPrivate#readme)
- 在[GitHub Issues](https://github.com/NullPrivate/NullPrivate/issues)提交问题

## 结语

通过本教程，您应该已经成功在家搭建了NullPrivate服务。现在您可以享受清净的网络环境，同时保护个人隐私。NullPrivate提供了丰富的功能和灵活的配置选项，满足不同用户的需求。
