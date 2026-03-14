---
sidebar_position: 4
title: OpenClaw MiniMax 模型配置
description: 快速配置 OpenClaw 使用 MiniMax 模型，只需 3 步即可完成。
keywords: [OpenClaw, MiniMax, 模型配置, API Key]
---

# 🚀 OpenClaw MiniMax 模型配置

> 只需 3 步快速配置 MiniMax 模型

## 配置顺序

配置模型必须按以下顺序：

1. **设置环境变量**（配置认证）
2. **配置 models.providers**（定义模型）
3. **配置 agents.defaults**（设置默认模型、白名单）

## MiniMax 模型简介

| 模型 | 用途 | 上下文 | 输出 |
|------|------|--------|------|
| `MiniMax-M2.5` | 对话、推理、代码 | 200K | 8K |

## 步骤 1：设置环境变量（认证）

1. 访问 [MiniMax 开放平台](https://platform.minimaxi.com/subscribe/coding-plan?code=LPgiFhi2ek) 注册账号（使用邀请码 **LPgiFhi2ek** 可享 9 折优惠）
2. 进入 API Keys 页面创建密钥
3. 设置环境变量：

```bash
# ~/.bashrc 或 ~/.openclaw/.env
export MINIMAX_API_KEY="你的API密钥"
```

## 步骤 2：配置 models.providers（定义模型）

在 `~/.openclaw/openclaw.json` 中添加：

```json
{
  "models": {
    "providers": {
      "minimax": {
        "baseUrl": "https://api.minimax.io/anthropic",
        "api": "anthropic-messages",
        "apiKey": "${MINIMAX_API_KEY}",
        "models": [
          {
            "id": "MiniMax-M2.5",
            "name": "MiniMax M2.5",
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```

## 步骤 3：配置 agents.defaults（默认模型 + 白名单）

在 `agents.defaults` 中添加：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "minimax/MiniMax-M2.5"
      },
      "models": {
        "minimax/MiniMax-M2.5": {
          "alias": "MiniMax"
        }
      }
    }
  }
}
```

- **primary**：默认使用的模型
- **models**：模型白名单，只有在白名单中的模型才能使用

## 重启 Gateway

```bash
pkill -f openclaw-gateway
nohup openclaw gateway run > /tmp/openclaw-gateway.log 2>&1 &
```

## 验证

```bash
# 测试模型
openclaw agent --message "你好" --model minimax/MiniMax-M2.5
```

## 常见问题

**Q: 如何获取 MiniMax API Key？**

A: 访问 https://platform.minimaxi.com/ 注册后，在 API Keys 页面创建

---

## 检查点

- [ ] 环境变量 MINIMAX_API_KEY 已设置
- [ ] models.providers.minimax 已配置
- [ ] agents.defaults.models 白名单已添加
- [ ] agents.defaults.model.primary 已设置
- [ ] Gateway 已重启
- [ ] 模型测试成功

---

## 相关文档

- [DeepSeek 模型配置](./openclaw-deepseek-config.md)
- [全局配置指南](../openclaw/openclaw-config-full-guide.md)
