---
sidebar_position: 2
title: OpenClaw 完整配置指南
description: 全面解析 OpenClaw 配置体系，涵盖目录结构、配置文件、模型配置、认证配置等核心内容，帮助你独立完成所有配置任务。
keywords: [OpenClaw配置, 配置文件, 模型配置, 认证配置, openclaw.json, secrets管理, API密钥]
---

# 🚀 OpenClaw 完整配置指南

> 全面掌握 OpenClaw 配置体系，涵盖目录结构、配置文件、模型配置、认证配置等核心内容

## 📌 核心笔记

- **主配置文件**：`~/.openclaw/openclaw.json` 是核心配置入口
- **三层模型结构**：Agent 引用 → Model 定义 → Provider 配置
- **认证优先级**：环境变量 > auth-profiles.json > 明文配置
- **多 Agent 支持**：通过 `agents.list` 配置多个独立 Agent

## 🎯 学完你能做什么

* 独立完成 OpenClaw 所有配置任务
* 正确配置模型 Provider（DeepSeek、Anthropic、OpenAI 等）
* 理解并配置多模型切换和fallback机制
* 熟练使用环境变量管理敏感凭据

## 😫 你现在的困境

* 不清楚配置文件的目录结构和作用
* 搞不清 models、agents、secrets 的配置关系
* 不知道如何配置多个模型和切换
* 对认证凭据的优先级顺序感到困惑

## 🕐 什么时候用这一招

* 首次安装 OpenClaw 后的配置
* 添加新的模型 Provider
* 配置多模型切换和 fallback
* 排查认证相关问题

---

## 1. 目录结构

### 1.1 主目录 (~/.openclaw)

```
~/.openclaw/
├── agents/                      # Agent 数据目录
│   └── main/                    # 默认 Agent (main 是保留字)
│       ├── agent/
│       │   ├── auth-profiles.json   # 认证凭据（API keys, OAuth）
│       │   └── models.json          # 模型配置（自动生成）
│       └── sessions/                # 会话目录
│           ├── *.jsonl              # 会话历史
│           └── sessions.json        # 会话索引
├── canvas/                      # Canvas UI
├── completions/                 # CLI 自动补全
├── cron/                        # 定时任务
├── delivery-queue/              # 消息投递队列
├── devices/                     # 设备配对
├── feishu/                      # Feishu 插件缓存
├── identity/                    # 身份认证
├── logs/                        # 日志
├── memory/                      # 记忆数据库
│   └── main.sqlite             # SQLite 向量库
├── openclaw.json                # 主配置文件 ⭐
├── openclaw.json.bak*           # 备份
├── update-check.json            # 更新检查
└── workspace/                   # Agent 工作区 (默认)
    ├── AGENTS.md               # Agent 规范
    ├── BOOTSTRAP.md           # 启动引导
    ├── HEARTBEAT.md           # 心跳任务
    ├── IDENTITY.md            # 身份定义
    ├── SOUL.md                # 核心定义
    ├── TOOLS.md               # 工具定义
    ├── USER.md                # 用户配置
    └── config/
```

### 1.2 多 Agent 目录

```
~/.openclaw/
├── agents/
│   ├── main/                   # Agent: main
│   │   ├── agent/
│   │   │   ├── auth-profiles.json
│   │   │   └── models.json
│   │   └── sessions/
│   ├── ops/                    # 自定义 Agent
│   │   ├── agent/
│   │   └── sessions/
│   └── code/                   # 自定义 Agent
│       ├── agent/
│       └── sessions/
└── workspace/                  # 共享 workspace (不推荐)
```

> **注意**：`main` 是保留字，不能删除。

---

## 2. 配置文件详解

### 2.1 主配置文件 (openclaw.json)

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "provider-id": {
        "baseUrl": "https://api.xxx.com",
        "apiKey": "${API_KEY_NAME}",
        "api": "openai-completions",
        "models": [
          {
            "id": "model-id",
            "name": "Model Name",
            "reasoning": true,
            "input": ["text"],
            "cost": {
              "input": 0.001,
              "output": 0.002
            },
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "provider/model",
        "fallbacks": ["provider/model2"]
      },
      "workspace": "~/.openclaw/workspace"
    },
    "list": [
      {
        "id": "main",
        "default": true,
        "name": "Main Agent",
        "workspace": "~/.openclaw/agents/main/workspace"
      }
    ]
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "accounts": {...}
    }
  },
  "session": {
    "scope": "per-sender",
    "dmScope": "main",
    "idleMinutes": 10080
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback"
  },
  "secrets": {
    "providers": {
      "env": {
        "source": "env",
        "allowlist": ["API_KEY_NAME"]
      }
    }
  }
}
```

### 2.2 配置树形结构

```
openclaw
├── models                   # 模型配置 ⭐
│   ├── mode                 # merge | replace
│   └── providers            # 提供商
│       └── <providerId>
│           ├── baseUrl
│           ├── apiKey
│           ├── api
│           └── models
│
├── agents                   # Agent 配置 ⭐
│   ├── defaults
│   │   ├── model
│   │   │   ├── primary      # 主模型
│   │   │   └── fallbacks    # 备用模型
│   │   └── workspace
│   └── list                 # Agent 列表
│
├── channels                 # 消息渠道 ⭐
│   ├── feishu
│   ├── telegram
│   ├── discord
│   └── slack
│
├── session                  # 会话配置
│   ├── scope               # per-sender | global
│   ├── dmScope             # main | per-peer
│   └── idleMinutes
│
├── gateway                  # 网关配置
│   ├── port
│   ├── mode                # local | remote
│   └── bind                # auto | lan | loopback | tailnet
│
├── secrets                  # 密钥管理 ⭐
│   ├── providers
│   │   ├── env             # 环境变量
│   │   ├── file            # 文件
│   │   └── exec            # 命令
│   └── defaults
│
├── memory                   # 记忆配置
├── hooks                    # Webhook
├── tools                    # 工具配置
└── logging                  # 日志配置
```

---

## 3. 模型配置

### 3.1 配置三层结构

```
┌─────────────────────────────────────────────────────────────┐
│ Agent 引用 (agents.defaults.model.primary)                  │
│   指定使用哪个模型: "deepseek/deepseek-chat"                │
├─────────────────────────────────────────────────────────────┤
│ Model 定义 (models.providers.<id>.models[])                 │
│   定义模型能力: contextWindow, maxTokens, reasoning 等      │
├─────────────────────────────────────────────────────────────┤
│ Provider 配置 (models.providers.<id>)                       │
│   配置 API 端点: baseUrl, apiKey, api 类型                 │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Provider 配置

```json
{
  "providers": {
    "deepseek": {
      "baseUrl": "https://api.deepseek.com",
      "api": "openai-completions",
      "apiKey": "${DEEPSEEK_API_KEY}",
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
        }
      ]
    }
  }
}
```

### 3.3 Agent 默认模型与白名单

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallbacks": ["deepseek/deepseek-reasoner"]
      },
      "models": {
        "deepseek/deepseek-chat": { "alias": "DeepSeek" }
      }
    }
  }
}
```

#### 白名单机制说明

`agents.defaults.models` 是一个**模型白名单**，只有添加到白名单中的模型才能被 Agent 使用。这一设计有以下几个作用：

1. **安全控制**：防止意外使用未授权的模型
2. **成本管理**：限制可使用的模型范围，控制成本
3. **简化选择**：用户只能从白名单中选择模型

#### 配置顺序（重要）

配置模型时必须按照以下**依赖顺序**执行：

| 步骤 | 配置项 | 说明 |
|------|--------|------|
| 1️⃣ | `models.providers.<id>` | 定义 Provider 和模型 |
| 2️⃣ | `agents.defaults.models` | 将模型添加到白名单 |
| 3️⃣ | `agents.defaults.model.primary` | 设置默认模型 |

**不按顺序的后果：**

| 错误顺序 | 后果 |
|---------|------|
| 先配置 `agents.defaults`，后配置 `models` | 系统找不到模型定义，报错 |
| 先配置 `model.primary`，后添加到白名单 | 模型被过滤掉，无法使用 |

#### 白名单配置示例

```json
{
  "agents": {
    "defaults": {
      "models": {
        "deepseek/deepseek-chat": {
          "alias": "DeepSeek"
        },
        "deepseek/deepseek-reasoner": {
          "alias": "DeepSeek Reasoner"
        },
        "anthropic/claude-sonnet-4-5": {
          "alias": "Claude Sonnet"
        }
      }
    }
  }
}
```

- **key**：模型引用格式为 `providerId/modelId`
- **alias**：可选，给模型设置别名方便显示

### 3.4 API 类型 (api 字段)

| api 值 | 说明 |
|--------|------|
| `openai-completions` | OpenAI 兼容 (Chat Completion) |
| `openai-responses` | OpenAI Responses API |
| `anthropic-messages` | Anthropic Messages API |
| `google-generative-ai` | Google Gemini API |
| `ollama` | Ollama 本地模型 |
| `bedrock-converse-stream` | AWS Bedrock |

---

## 4. 认证配置

### 4.1 两种语法对比

| 模块 | 语法 | 示例 |
|------|------|------|
| `models.providers.apiKey` | `${VAR_NAME}` | `${MINIMAX_API_KEY}` |
| `auth-profiles.json` | `keyRef` | `{"source": "env", "provider": "default", "id": "MINIMAX_API_KEY"}` |

> **注意**：`${VAR}` 语法只适用于 `models.providers.apiKey`，auth 模块使用 `keyRef` 结构。

### 4.2 配置层级

```
OpenClaw 配置层级
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│  openclaw.json (全局入口)                                        │
│  ├── auth.profiles: { "minimax-cn:default": { provider, mode } }│
│  ├── models.providers: { "minimax-cn": { apiKey, baseUrl... } } │
│  └── agents.defaults: { ... }                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ Fallback (不冲突时)
┌─────────────────────────────────────────────────────────────────┐
│  ~/.openclaw/agents/<agentId>/agent/                            │
│  ├── auth-profiles.json ─────┐                                  │
│  │   { key / keyRef }       │  认证 (优先级高)                    │
│  │                          │                                   │
│  └── models.json ────────────┘  模型 (优先级高)                  │
│      { providers... }                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ Fallback (不存在时)
┌─────────────────────────────────────────────────────────────────┐
│  环境变量                                                        │
│  └── MINIMAX_CN_API_KEY                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 优先级

**认证 (auth) 优先级:**
```
auth-profiles.json  →  环境变量  →  models.providers.apiKey
     (高)                ↑              (低)
```

**模型 (models) 优先级:**
```
agent/models.json  →  openclaw.json/models.providers
     (高)                    (低)

mode: "merge"   →  合并
mode: "replace" →  替换
```

### 4.4 推荐方式：环境变量 + models.providers

#### 步骤 1：配置 openclaw.json

```json
{
  "models": {
    "providers": {
      "minimax": {
        "baseUrl": "https://api.minimax.io/anthropic",
        "apiKey": "${MINIMAX_API_KEY}"
      }
    }
  }
}
```

#### 步骤 2：设置环境变量

```bash
# ~/.bashrc 或 ~/.openclaw/.env
export MINIMAX_API_KEY="sk-你的key"

# 重新加载
source ~/.bashrc
```

### 4.5 常见 Provider 环境变量

| Provider ID | 环境变量名 |
|------------|-----------|
| deepseek | `DEEPSEEK_API_KEY` |
| anthropic | `ANTHROPIC_API_KEY` |
| openai | `OPENAI_API_KEY` |
| google | `GEMINI_API_KEY` |
| minimax | `MINIMAX_API_KEY` |
| zai | `ZAI_API_KEY` |
| openrouter | `OPENROUTER_API_KEY` |
| together | `TOGETHER_API_KEY` |

<details>
<summary>

### 4.6 Auth Profiles（多账号切换）（选学）

</summary>

`auth.profiles` 是配置里的元数据，真正的密钥存在 `auth-profiles.json` 文件里。

#### 使用场景

| 场景 | 推荐方式 |
|------|---------|
| 单账号、简单配置 | 环境变量 + `models.providers` |
| 多账号切换 | `auth.profiles` + `auth.order` |
| OAuth 登录 | `auth.profiles`（需要 token 刷新） |

#### 配置方式

**步骤 1：openclaw.json（只写元数据）**

```json
{
  "auth": {
    "profiles": {
      "minimax-cn:default": {
        "provider": "minimax-cn",
        "mode": "api_key"
      }
    }
  }
}
```

**步骤 2：auth-profiles.json（真正存密钥）**

文件位置：`~/.openclaw/agents/<agentId>/agent/auth-profiles.json`

```json
{
  "minimax-cn:default": {
    "provider": "minimax-cn",
    "mode": "api_key",
    "key": "sk-xxx"
  }
}
```

或者使用 keyRef 引用环境变量：

```json
{
  "minimax-cn:default": {
    "provider": "minimax-cn",
    "mode": "api_key",
    "keyRef": {
      "source": "env",
      "provider": "default",
      "id": "MINIMAX_API_KEY"
    }
  }
}
```

keyRef 支持多种 source：
- `env`：从环境变量读取
- `file`：从文件读取
- `exec`：执行命令获取

#### 多账号切换示例

```json
// openclaw.json
{
  "auth": {
    "profiles": {
      "anthropic:work": { "provider": "anthropic", "mode": "api_key" },
      "anthropic:personal": { "provider": "anthropic", "mode": "api_key" }
    },
    "order": {
      "anthropic": ["anthropic:work", "anthropic:personal"]
    }
  }
}
```

然后用 `/model Opus@anthropic:work` 或 `/model Opus@anthropic:personal` 切换账号。

#### 管理命令

```bash
openclaw models auth login --provider anthropic  # 登录
openclaw models auth status                    # 查看状态
```

#### 总结

- **单账号**：直接用**环境变量 + models.providers**，不需要 auth.profiles
- **多账号/OAuth**：使用 auth.profiles + auth-profiles.json
- **keyRef 设计目的**：安全隔离、审计追踪、统一抽象（支持 env/file/exec）

</details>

---

## 5. 完整配置示例

### 5.1 最小配置（DeepSeek）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "api": "openai-completions",
        "apiKey": "${DEEPSEEK_API_KEY}",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "reasoning": true,
            "input": ["text"],
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat"
      }
    }
  },
  "secrets": {
    "providers": {
      "env": {
        "source": "env",
        "allowlist": ["DEEPSEEK_API_KEY"]
      }
    }
  }
}
```

### 5.2 多模型配置（DeepSeek + Anthropic）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "api": "openai-completions",
        "apiKey": "${DEEPSEEK_API_KEY}",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "reasoning": true,
            "input": ["text"],
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      },
      "anthropic": {
        "baseUrl": "https://api.anthropic.com",
        "api": "anthropic-messages",
        "apiKey": "${ANTHROPIC_API_KEY}",
        "models": [
          {
            "id": "claude-sonnet-4-5",
            "name": "Claude Sonnet 4.5",
            "reasoning": true,
            "input": ["text", "image"],
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallbacks": ["anthropic/claude-sonnet-4-5"]
      }
    }
  },
  "secrets": {
    "providers": {
      "env": {
        "source": "env",
        "allowlist": ["DEEPSEEK_API_KEY", "ANTHROPIC_API_KEY"]
      }
    }
  }
}
```

### 5.3 完整配置（包含渠道）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "minimax-cn": {
        "baseUrl": "https://api.minimaxi.com/anthropic",
        "api": "anthropic-messages",
        "authHeader": true,
        "apiKey": "${MINIMAX_API_KEY}",
        "models": [
          {
            "id": "MiniMax-M2.5",
            "name": "MiniMax M2.5",
            "reasoning": true,
            "input": ["text"],
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      },
      "anthropic": {
        "apiKey": "${ANTHROPIC_API_KEY}",
        "models": [
          {
            "id": "claude-sonnet-4-5",
            "name": "Claude Sonnet 4.5",
            "contextWindow": 200000
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "minimax-cn/MiniMax-M2.5",
        "fallbacks": ["anthropic/claude-sonnet-4-5"]
      }
    }
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "accounts": {
        "main": {
"appId": "${FEISHU_APP_ID}",
"appSecret": "${FEISHU_APP_SECRET}"
        }
      }
    }
  },
  "session": {
    "scope": "per-sender",
    "dmScope": "main",
    "idleMinutes": 10080
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback"
  },
  "secrets": {
    "providers": {
      "env": {
        "source": "env",
        "allowlist": [
          "MINIMAX_API_KEY",
          "ANTHROPIC_API_KEY",
          "FEISHU_APP_ID",
          "FEISHU_APP_SECRET"
        ]
      }
    }
  }
}
```

---

## 6. 配置优先级

```
高 ←────────────────────────────────────────→ 低

${VAR_NAME} (环境变量)          ⭐ 推荐
       ↓
file:/path (文件)
       ↓
exec:/cmd (命令)
       ↓
auth-profiles.json
       ↓
openclaw.json 明文
       ↓
models.json (自动生成)
       ↓
内置 Catalog (默认值)
```

---

## 7. 常用命令

### 7.1 配置验证

```bash
# 验证 JSON 格式
cat ~/.openclaw/openclaw.json | jq '.'

# 诊断配置
openclaw doctor

# 查看当前模型
openclaw config get agents.defaults.model
```

### 7.2 模型测试

```bash
# 测试模型
openclaw agent --model deepseek/deepseek-chat --message "你好"

# 切换模型（在 Feishu 中）
/model DeepSeek Chat
```

### 7.3 Gateway 重启

```bash
# 杀掉旧进程
pkill -f openclaw-gateway

# 启动新进程
nohup openclaw gateway run > /tmp/openclaw-gateway.log 2>&1 &

# 查看日志
tail -f /tmp/openclaw-gateway.log
```

---

## 8. 常见问题

### Q1: API Key 未找到

**检查**:
```bash
echo $DEEPSEEK_API_KEY
```

**解决**: 确保在 `~/.bashrc` 中设置了环境变量，并 `source ~/.bashrc`

### Q2: 模型切换失败

**检查**:
```bash
openclaw config get agents.defaults.models
```

**解决**: 确保模型 ID 在 `models.providers.<id>.models[]` 中定义

### Q3: Gateway 启动失败

**检查**:
```bash
tail -f /tmp/openclaw-gateway.log
```

**解决**: 检查 JSON 格式是否正确，端口是否被占用

### Q4: 认证凭据优先级

**优先级**: 环境变量 > auth-profiles.json > 明文配置

---

## 9. 相关文件位置

| 内容 | 文件位置 |
|------|----------|
| 主配置 | `~/.openclaw/openclaw.json` |
| 认证凭据 | `~/.openclaw/agents/main/agent/auth-profiles.json` |
| 模型定义 | `~/.openclaw/agents/main/agent/models.json` |
| 环境变量 | `~/.bashrc` 或 `~/.profile` |
| Gateway 日志 | `/tmp/openclaw-gateway.log` |
| 工作区 | `~/.openclaw/workspace/` |

---

## 10. 检查点

- [ ] 理解主目录 `~/.openclaw/` 的结构
- [ ] 能够阅读和修改 `openclaw.json`
- [ ] 掌握三层模型配置（Agent引用 → Model定义 → Provider配置）
- [ ] 能够配置环境变量进行认证
- [ ] 理解认证凭据的优先级顺序

---

## 11. 本课小结

本节课我们学习了 OpenClaw 完整配置指南，包括：

1. **目录结构**：主目录 `~/.openclaw/` 的各个子目录作用
2. **配置文件**：`openclaw.json` 的完整结构和字段说明
3. **模型配置**：三层模型配置结构（Agent引用 → Model定义 → Provider配置）
4. **认证配置**：环境变量、文件、命令等多种认证方式及优先级
5. **配置示例**：最小配置、多模型配置、完整配置的示例
6. **常用命令**：配置验证、模型测试、Gateway重启等

---

## 12. 下一课预告

下一课我们将详细介绍 **OpenClaw 认证与模型配置**，深入讲解如何配置具体的模型 Provider（DeepSeek、Anthropic、OpenAI 等）以及认证凭据的最佳实践。

---

## 13. 相关文档

- [OpenClaw 认证与模型配置详解](./openclaw-auth-config.md)
- [OpenClaw 模型配置指南](./openclaw-model-config.md)
- [OpenClaw 模型配置快速参考](./openclaw-model-quick-ref.md)
- [OpenClaw 飞书插件架构详解](./openclaw-plugin-architecture.md)
- [OpenClaw 设计模式记录](./openclaw-design-patterns.md)
