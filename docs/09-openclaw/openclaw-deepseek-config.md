---
sidebar_position: 3
title: 🔧 OpenClaw DeepSeek 配置顺序指南
description: 详细讲解 OpenClaw 配置 DeepSeek 模型的完整流程，包括 Provider 定义、默认模型设置、API Key 配置和故障转移机制，确保系统能够正常使用 DeepSeek Chat 和 Reasoner 模型。
keywords: [OpenClaw, DeepSeek, 模型配置, API Key, 故障转移, 智谱AI, Z.AI]
---

# 🔧 OpenClaw DeepSeek 配置顺序指南

> 必须按照正确顺序配置 DeepSeek，否则系统无法正常工作

## 📌 核心笔记

- **5 步配置流程**：Provider 定义 → 允许列表 → 默认模型 → API Key → 重启 Gateway
- **配置顺序至关重要**：不按顺序配置会导致系统找不到模型或认证失败
- **故障转移机制**：支持主模型失败时自动切换到备用模型
- **环境变量命名**：`DEEPSEEK_API_KEY`（Provider ID 大写 + `_API_KEY`）

## 🎯 学完你能做什么

- 按正确顺序配置 DeepSeek Provider 和模型
- 设置默认模型和故障转移列表
- 配置 API Key 环境变量
- 在飞书中使用 `/model` 命令切换 DeepSeek 模型
- 排查配置问题并验证系统工作正常

## 😫 你现在的困境

- 不知道配置的先后顺序，导致系统报错
- 配置了模型但无法使用，提示 "API key not found"
- 想要配置故障转移但不知道如何设置
- 不理解环境变量的命名规则
- 配置完成后不知道如何验证

## 📅 什么时候用这一招

- 首次配置 DeepSeek 模型时
- 需要配置多个模型并设置故障转移时
- 模型调用失败需要排查问题时
- 添加新的 LLM Provider 时参考此流程

---

## 💡 核心思路

配置 OpenClaw 的 LLM 模型需要严格按照**依赖顺序**执行，每个步骤都依赖前一个步骤的完成：

1. **定义 Provider**：在 `models.providers` 中声明 DeepSeek 和模型
2. **添加到允许列表**：在 `agents.defaults.models` 中白名单模型
3. **设置默认模型**：在 `agents.defaults.model.primary` 中指定主模型
4. **配置 API Key**：设置环境变量 `DEEPSEEK_API_KEY`
5. **重启 Gateway**：使配置生效

**为什么必须按这个顺序？**

| 步骤 | 不按顺序的后果 |
|------|---------------|
| 先配置 `agent.defaults`，后配置 `models` | 系统找不到模型定义，报错 |
| 先配置 `model.primary`，后添加到允许列表 | 模型被过滤掉，无法使用 |
| 配置了模型但没有 API Key | 所有调用失败，提示 "API key not found" |

---

## ⚠️ 重要：配置文件地址

```
主配置文件：~/.openclaw/openclaw.json
环境变量文件：~/.openclaw/.env
```

---

## 步骤 1：配置 models.providers（定义 DeepSeek）

### 1.1 定位到 models.providers

在 `~/.openclaw/openclaw.json` 中找到 `models.providers` 部分：

```json5
{
  "models": {
    "mode": "merge",
    "providers": {
      // ← 在这里添加 DeepSeek
    }
  }
}
```

### 1.2 添加 DeepSeek Provider

在 `models.providers` 中添加以下配置：

```json5
"deepseek": {
  "baseUrl": "https://api.deepseek.com",
  "api": "openai-completions",
  "models": [
    {
      "id": "deepseek-chat",
      "name": "DeepSeek Chat",
      "reasoning": true,
      "input": ["text"],
      "cost": {
        "input": 0.001,
        "output": 0.002,
        "cacheRead": 0,
        "cacheWrite": 0
      },
      "contextWindow": 128000,
      "maxTokens": 8192
    },
    {
      "id": "deepseek-reasoner",
      "name": "DeepSeek Reasoner",
      "reasoning": true,
      "input": ["text"],
      "cost": {
        "input": 0.004,
        "output": 0.016,
        "cacheRead": 0,
        "cacheWrite": 0
      },
      "contextWindow": 128000,
      "maxTokens": 65536
    }
  ]
}
```

**这一步的作用：** 定义 DeepSeek Provider 和两个模型（deepseek-chat 和 deepseek-reasoner）

**验证配置：**

```bash
# 检查 JSON 格式
cat ~/.openclaw/openclaw.json | jq '.models.providers.deepseek'
```

---

## 步骤 2：配置 agents.defaults.models（添加到允许列表）⚠️ 必须在第 1 步之后

### 2.1 定位到 agents.defaults.models

在 `~/.openclaw/openclaw.json` 中找到 `agents.defaults.models` 部分：

```json5
{
  "agents": {
    "defaults": {
      "models": {
        // ← 在这里添加 DeepSeek 模型
      }
    }
  }
}
```

### 2.2 添加 DeepSeek 模型到允许列表

在 `agents.defaults.models` 中添加以下配置：

```json5
"deepseek/deepseek-chat": {
  "alias": "DeepSeek Chat"
},
"deepseek/deepseek-reasoner": {
  "alias": "DeepSeek Reasoner"
}
```

**这一步的作用：** 将 DeepSeek 模型添加到允许列表（白名单），使其可以被使用

**验证配置：**

```bash
# 检查 JSON 格式
cat ~/.openclaw/openclaw.json | jq '.agents.defaults.models["deepseek/deepseek-chat"]'
```

---

## 步骤 3：配置 agents.defaults.model.primary（设置默认模型）⚠️ 必须在第 2 步之后

### 3.1 定位到 agents.defaults.model

在 `~/.openclaw/openclaw.json` 中找到 `agents.defaults.model` 部分：

```json5
{
  "agents": {
    "defaults": {
      "model": {
        // ← 在这里配置默认模型
      }
    }
  }
}
```

### 3.2 设置默认模型为 DeepSeek

```json5
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallbacks": [
          "deepseek/deepseek-reasoner"
        ]
      }
    }
  }
}
```

**这一步的作用：** 将 DeepSeek Chat 设置为默认模型，当主模型失败时自动切换到 DeepSeek Reasoner

**为什么必须配置？**

- ❌ 不配置 → 使用代码默认（anthropic/claude-opus-4-6），需要 Anthropic API Key
- ✅ 配置后 → 使用 DeepSeek，成本更低，速度更快

**验证配置：**

```bash
# 检查 JSON 格式
cat ~/.openclaw/openclaw.json | jq '.agents.defaults.model.primary'
```

---

## 步骤 4：配置环境变量（添加 API Key）⚠️ 必须在第 3 步之后

### 4.1 编辑 .env 文件

打开文件：`~/.openclaw/.env`

### 4.2 添加 DeepSeek API Key

```bash
# DeepSeek API Key
DEEPSEEK_API_KEY=sk-your-deepseek-api-key-here
```

**API Key 获取方式：**

1. 访问：https://platform.deepseek.com/
2. 登录或注册账号
3. 进入 **API Keys** 页面
4. 点击 **Create API Key** 按钮
5. 复制生成的 API Key（格式：`sk-xxxxxxxxxxxxx`）

**这一步的作用：** 配置 API Key，使系统能够调用 DeepSeek API

**不配置的后果：**
- ❌ 所有模型调用失败
- ❌ 提示 "API key not found for provider: deepseek"
- ❌ 无法使用任何 DeepSeek 模型

**验证配置：**

```bash
# 检查环境变量
cat ~/.openclaw/.env | grep DEEPSEEK_API_KEY

# 或直接查看
echo $DEEPSEEK_API_KEY
```

---

## 步骤 5：重启 Gateway⚠️ 必须在第 4 步之后

### 5.1 停止当前 Gateway（如果正在运行）

```bash
pkill -f openclaw-gateway || true
```

### 5.2 启动 Gateway

```bash
# 后台启动（推荐）
nohup openclaw gateway run > /tmp/openclaw-gateway.log 2>&1 &

# 或前台启动（用于调试）
openclaw gateway run
```

### 5.3 查看 Gateway 日志

```bash
# 查看启动日志
tail -f /tmp/openclaw-gateway.log
```

**确保 Gateway 成功启动并加载了配置。**

---

## 📦 完整配置示例

### 完整的 openclaw.json

```json5
{
  "$schema": "https://github.com/openclaw/openclaw/raw/main/config.schema.json",
  "meta": {
    "lastTouchedVersion": "2026.3.2",
    "lastTouchedAt": "2026-03-10T00:00:00.000Z"
  },

  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "api": "openai-completions",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0.001,
              "output": 0.002,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 128000,
            "maxTokens": 8192
          },
          {
            "id": "deepseek-reasoner",
            "name": "DeepSeek Reasoner",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0.004,
              "output": 0.016,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 128000,
            "maxTokens": 65536
          }
        ]
      }
    }
  },

  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallbacks": [
          "deepseek/deepseek-reasoner"
        ]
      },
      "models": {
        "deepseek/deepseek-chat": {
          "alias": "DeepSeek Chat"
        },
        "deepseek/deepseek-reasoner": {
          "alias": "DeepSeek Reasoner"
        }
      },
      "workspace": "/root/.openclaw/workspace"
    }
  },

  "tools": {
    "profile": "full"
  },

  "commands": {
    "native": "auto",
    "nativeSkills": "auto",
    "restart": true,
    "ownerDisplay": "raw"
  },

  "session": {
    "dmScope": "per-channel-peer"
  },

  "channels": {
    "feishu": {
      "enabled": true,
      "connectionMode": "websocket",
      "domain": "feishu",
      "groupPolicy": "open"
    }
  },

  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "lan"
  }
}
```

### 完整的 .env 文件

```bash
# DeepSeek API Key
DEEPSEEK_API_KEY=sk-your-deepseek-api-key-here
```

---

## ✅ 验证配置

### 验证 1：JSON 格式

```bash
# 验证整个 JSON 文件
cat ~/.openclaw/openclaw.json | jq '.'

# 验证 DeepSeek Provider 配置
cat ~/.openclaw/openclaw.json | jq '.models.providers.deepseek'

# 验证默认模型配置
cat ~/.openclaw/openclaw.json | jq '.agents.defaults.model'

# 验证允许列表
cat ~/.openclaw/openclaw.json | jq '.agents.defaults.models | keys'
```

### 验证 2：环境变量

```bash
# 查看环境变量
cat ~/.openclaw/.env

# 验证 DeepSeek API Key
echo $DEEPSEEK_API_KEY
```

### 验证 3：诊断工具

```bash
# 运行 OpenClaw 诊断工具
openclaw doctor
```

### 验证 4：测试模型

```bash
# 测试 DeepSeek Chat
openclaw agent --model deepseek/deepseek-chat --message "你好，请介绍一下 DeepSeek"

# 测试 DeepSeek Reasoner
openclaw agent --model deepseek/deepseek-reasoner --message "解释量子计算的基本原理"

# 查看所有可用模型
openclaw models list
```

---

## 📱 在飞书中使用

### 切换到 DeepSeek Chat

```
/model DeepSeek Chat
```

或使用完整模型 ID：

```
/model deepseek/deepseek-chat
```

### 切换到 DeepSeek Reasoner

```
/model DeepSeek Reasoner
```

或使用完整模型 ID：

```
/model deepseek/deepseek-reasoner
```

### 发送测试消息

```
你好，请介绍一下 DeepSeek AI
```

---

## 📊 DeepSeek 模型参数

| 模型 ID | 名称 | Context | Max Tokens | Cost | 用途 |
|---------|------|---------|-------------|------|------|
| `deepseek-chat` | DeepSeek Chat | 128K | 8,192 | ¥3.0/1M | 日常对话、代码辅助 |
| `deepseek-reasoner` | DeepSeek Reasoner | 128K | 65,536 | ¥20.0/1M | 复杂推理、逻辑分析 |

---

## ❓ 常见问题排查

### 问题 1：模型切换失败

**症状：** 在飞书中输入 `/model DeepSeek Chat` 后提示模型不存在

**原因：** 模型未在允许列表（agents.defaults.models）中

**解决方案：**
1. 检查 `agents.defaults.models` 中是否包含 `deepseek/deepseek-chat`
2. 如果没有，添加到允许列表
3. 重启 Gateway

### 问题 2：API Key 未找到

**症状：** Gateway 日志显示 "API key not found for provider: deepseek"

**原因：** 环境变量 DEEPSEEK_API_KEY 未配置

**解决方案：**
1. 检查 `~/.openclaw/.env` 文件
2. 确保包含 `DEEPSEEK_API_KEY=sk-...`
3. 重启 Gateway

### 问题 3：JSON 格式错误

**症状：** Gateway 启动失败，日志显示 JSON 解析错误

**原因：** openclaw.json 文件格式错误

**解决方案：**
1. 验证 JSON 格式：`cat ~/.openclaw/openclaw.json | jq '.'`
2. 检查括号匹配、逗号位置
3. 参考上面的完整配置示例

### 问题 4：模型调用失败

**症状：** 一切配置正确，但模型调用失败

**可能原因：**
1. API Key 无效或过期
2. 网络问题
3. DeepSeek API 服务异常

**解决方案：**
1. 验证 API Key 有效性
2. 检查网络连接
3. 查看 Gateway 日志：`tail -f /tmp/openclaw-gateway.log`

---

## 📌 快速参考

### 配置顺序检查清单

- [ ] **第 1 步：** 配置 models.providers.deepseek
- [ ] **第 2 步：** 配置 agents.defaults.models（添加 DeepSeek 到允许列表）
- [ ] **第 3 步：** 配置 agents.defaults.model.primary（设置为 deepseek/deepseek-chat）
- [ ] **第 4 步：** 配置环境变量 DEEPSEEK_API_KEY
- [ ] **第 5 步：** 重启 Gateway

### 配置文件路径

| 文件 | 路径 | 用途 |
|-----|------|------|
| **主配置** | `~/.openclaw/openclaw.json` | Provider 定义、默认模型、允许列表 |
| **环境变量** | `~/.openclaw/.env` | API Key 存储 |
| **Gateway 日志** | `/tmp/openclaw-gateway.log` | Gateway 运行日志 |

### 常用命令

```bash
# 验证 JSON 格式
cat ~/.openclaw/openclaw.json | jq '.'

# 查看环境变量
cat ~/.openclaw/.env

# 诊断配置
openclaw doctor

# 查看默认模型
openclaw config get agents.defaults.model.primary

# 查看允许列表
openclaw config get agents.defaults.models

# 查看所有可用模型
openclaw models list

# 重启 Gateway
pkill -f openclaw-gateway
nohup openclaw gateway run > /tmp/openclaw-gateway.log 2>&1 &

# 测试 DeepSeek Chat
openclaw agent --model deepseek/deepseek-chat --message "测试消息"

# 在飞书中切换模型
/model DeepSeek Chat
```

---

## 🎯 配置完成！

完成以上 5 个步骤后，你可以：

1. ✅ 在飞书中使用 DeepSeek Chat 进行日常对话
2. ✅ 在飞书中使用 DeepSeek Reasoner 进行复杂推理
3. ✅ 通过 `/model DeepSeek Chat` 切换模型
4. ✅ 使用别名快速切换：`/model DeepSeek Chat`
5. ✅ 当主模型失败时自动切换到备用模型

**开始使用 DeepSeek 吧！** 🚀
