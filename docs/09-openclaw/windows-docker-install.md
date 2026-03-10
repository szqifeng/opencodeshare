---
sidebar_position: 3
title: Windows Docker 安装
description: OpenClaw Windows Docker 安装指南
keywords: [OpenClaw, Windows, Docker, 安装指南]
---

# 🪟 Windows Docker 安装

> 通过 Docker 在 Windows 上快速部署 OpenClaw

## ⚠️ 安全提醒

**强烈建议使用 Docker 方式安装！** Docker 方式具有以下优势：
- ✅ 一键启动/停止
- ✅ 完全隔离，不影响系统
- ✅ 易于管理，随时清理
- ✅ 无环境污染

## 📦 准备工作

### 1. 安装 Docker Desktop for Windows

1. 访问官网：https://www.docker.com/products/docker-desktop/
2. 下载 Windows 版本
3. 运行安装程序
4. 重启计算机完成安装

### 2. 验证 Docker 安装

打开 PowerShell 或命令提示符，运行：

```bash
docker --version
docker-compose --version
```

## 🚀 安装步骤

### 1. 下载并解压

```bash
# 下载
Invoke-WebRequest -Uri "https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/fastclaw.zip" -OutFile "fastclaw.zip"

# 解压
Expand-Archive -Path fastclaw.zip -DestinationPath fastclaw
cd fastclaw
```

### 2. 配置环境变量

编辑 `.env` 文件，填入必要的配置：

```bash
FEISHU_APP_ID=your_app_id
FEISHU_APP_SECRET=your_app_secret
FEISHU_VERIFICATION_TOKEN=your_token
FEISHU_ENCRYPT_KEY=your_key
ZHIPU_API_KEY=your_api_key
OPENCLAW_AGENT_MODEL=glm-4.7
```

### 3. 启动容器

```bash
docker-compose up -d
```

### 4. 查看运行状态

```bash
docker-compose ps
docker-compose logs -f
```

## 🔧 配置

参考配置指南：
- [DeepSeek 模型配置](./openclaw-deepseek-config)
- [配置指南](./config-guide)

## 📚 相关文档

- [Windows 原生安装](./windows-native-install)
- [配置指南](./config-guide)
- [常见问题](./faq)
