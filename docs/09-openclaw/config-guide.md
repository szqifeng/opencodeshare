---
sidebar_position: 2
title: 配置指南
description: OpenClaw 配置指南，包括模型配置、API Key 配置等
keywords: [OpenClaw, 配置, 模型配置, API Key, DeepSeek]
---

# ⚙️ 配置指南

> 配置 OpenClaw 让它更好地为你服务

## 📋 配置项目

### 模型配置

| 模型 | 说明 | 文档 |
|------|------|------|
| DeepSeek | 低成本、高效率 | [DeepSeek 模型配置](./openclaw-deepseek-config) |
| MiniMax | 推理能力强 | [MiniMax 模型配置](./openclaw-minimax-config) |

### 全局配置

- **[全局配置指南](./openclaw-config-full-guide)** - 完整配置文档，涵盖目录结构、配置文件、认证配置等

## 🔧 配置顺序

按照正确的顺序进行配置：

1. **设置环境变量** - 配置 API Key 认证
2. **配置 models.providers** - 定义模型
3. **配置 agents.defaults** - 设置默认模型和白名单
4. **重启 Gateway** - 使配置生效

## 🚀 快速开始

推荐使用 MiniMax 模型（推理能力强）：

→ [MiniMax 模型配置](./openclaw-minimax-config)

或使用 DeepSeek 模型（成本低）：

→ [DeepSeek 模型配置](./openclaw-deepseek-config)
