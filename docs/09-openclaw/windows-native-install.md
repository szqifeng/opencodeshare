---
sidebar_position: 4
title: Windows 原生安装
description: OpenClaw Windows 原生安装指南
keywords: [OpenClaw, Windows, 原生安装, 安装指南]
---

# 🪟 Windows 原生安装

> 直接在 Windows 系统上安装 OpenClaw

## ⚠️ 安全提醒

**强烈建议使用 Docker 方式安装！** 原生安装可能带来的风险：
- ❌ 难以彻底停止程序
- ❌ 获得系统完整权限
- ❌ 依赖安装污染系统环境
- ❌ 文件散落，难以卸载

## 📋 安装步骤

### 前置要求

- Windows 10 或更高版本
- Node.js 18+ 和 npm
- Python 3.8+（可选）
- Git（可选，用于克隆仓库）

### 安装步骤

1. **克隆仓库**
```powershell
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

2. **安装依赖**
```powershell
npm install
```

3. **配置环境变量**
```powershell
# 复制环境变量模板
copy .env.example .env

# 使用记事本或其他编辑器编辑 .env 文件
notepad .env
```

4. **启动服务**
```powershell
npm start
```

## 🔧 配置

参考配置指南：
- [DeepSeek 模型配置](./openclaw-deepseek-config)
- [配置指南](./config-guide)

## 💡 推荐改为 Docker 方式

如果已经使用原生安装，可以迁移到 Docker 方式：

1. 备份配置和数据
2. 停止原生安装的服务
3. 按照 [Windows Docker 安装](./windows-docker-install) 进行部署
4. 恢复配置和数据

## 📚 相关文档

- [Windows Docker 安装](./windows-docker-install) - 推荐的安装方式
- [配置指南](./config-guide)
- [常见问题](./faq)
