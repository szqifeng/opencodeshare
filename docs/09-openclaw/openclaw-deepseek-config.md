---
sidebar_position: 3
title: OpenClaw DeepSeek 模型配置
description: 快速配置 OpenClaw 使用 DeepSeek 模型，只需 3 步即可完成。
keywords: [OpenClaw, DeepSeek, 模型配置, API Key]
---

# 🚀 OpenClaw DeepSeek 模型配置

> 只需 3 步快速配置 DeepSeek 模型

## 配置顺序

配置模型必须按以下顺序：

1. **设置环境变量**（配置认证）
2. **配置 models.providers**（定义模型）
3. **配置 agents.defaults**（设置默认模型、白名单）

## DeepSeek 模型简介

| 模型 | 用途 | 上下文 | 输出 | 价格（输入） | 价格（输出） |
|------|------|--------|------|-------------|-------------|
| `deepseek-chat` | 对话、代码辅助 | 128K | 4K/8K | ¥2/百万tokens | ¥3/百万tokens |
| `deepseek-reasoner` | 复杂推理 | 128K | 32K/64K | ¥2/百万tokens | ¥3/百万tokens |

> 注意：DeepSeek API 文档显示的是 V3.2 版本

## 步骤 1：设置环境变量（认证）

```bash
# ~/.bashrc 或 ~/.openclaw/.env
export DEEPSEEK_API_KEY="sk-你的key"
```

## 步骤 2：配置 models.providers（定义模型）

在 `~/.openclaw/openclaw.json` 中添加：

```json
{
  "models": {
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "api": "openai-completions",
        "apiKey": "${DEEPSEEK_API_KEY}",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "contextWindow": 128000,
            "maxTokens": 8192
          },
          {
            "id": "deepseek-reasoner",
            "name": "DeepSeek Reasoner",
            "contextWindow": 128000,
            "maxTokens": 65536
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
        "primary": "deepseek/deepseek-chat",
        "fallbacks": ["deepseek/deepseek-reasoner"]
      },
      "models": {
        "deepseek/deepseek-chat": {
          "alias": "DeepSeek"
        },
        "deepseek/deepseek-reasoner": {
          "alias": "DeepSeek Reasoner"
        }
      }
    }
  }
}
```

- **primary**：默认使用的模型
- **fallbacks**：主模型失败时的备用模型
- **models**：模型白名单，只有在白名单中的模型才能使用

## 重启 Gateway

```bash
pkill -f openclaw-gateway
nohup openclaw gateway run > /tmp/openclaw-gateway.log 2>&1 &
```

## 验证

```bash
# 测试模型
openclaw agent --message "你好" --model deepseek/deepseek-chat
```

## 常见问题

**Q: API Key 从哪里获取？**

A: 访问 https://platform.deepseek.com/ 注册后，在 API Keys 页面创建

---

## 检查点

- [ ] 环境变量 DEEPSEEK_API_KEY 已设置
- [ ] models.providers.deepseek 已配置
- [ ] agents.defaults.models 白名单已添加
- [ ] agents.defaults.model.primary 已设置
- [ ] Gateway 已重启
- [ ] 模型测试成功

---

## 相关文档

- [MiniMax 模型配置](./openclaw-minimax-config.md)
- [全局配置指南](../openclaw/openclaw-config-full-guide.md)
