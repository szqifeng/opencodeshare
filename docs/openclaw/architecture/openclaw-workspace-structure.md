---
sidebar_position: 6
title: 项目工作目录结构
description: 详解 OpenClaw 工作目录结构，帮你理解各个目录的作用和数据存储方式。
keywords: [OpenClaw目录结构, 工作目录, workspace, agents, sessions, 数据存储]
---

# 🚀 项目工作目录结构

> 详解 OpenClaw 工作目录结构，帮你理解各个目录的作用和数据存储方式

## 📌 核心笔记

- **根目录**：`~/.openclaw/` 是所有数据的存储位置
- **Agent 隔离**：每个 Agent 有独立的 `agent/` 和 `sessions/` 目录
- **工作区**：`workspace/` 和 `workspace-coder/` 存放 Agent 的配置和记忆文件
- **会话文件**：`*.jsonl` 格式存储每个会话的完整对话历史

## 🎯 学完你能做什么

* 理解 OpenClaw 数据目录的组织方式
* 定位和查看历史会话记录
* 理解 Agent 工作区的配置文件作用
* 知道数据备份应该备份哪些目录

## 😫 你现在的困境

* 不清楚各个目录的作用
* 找不到历史会话记录在哪里
* 不知道 workspace 目录下的文件是什么

## 🕐 什么时候用这一招

* 排查会话相关问题
* 备份或迁移数据
* 理解 Agent 的工作原理

---

## 1. 完整目录树

```
~/.openclaw/
├── agents/                      # Agent 数据目录 ⭐
│   ├── coder/                   # Coder Agent
│   │   ├── SYSTEM.md            # 系统提示词（Agent 角色定义）
│   │   ├── agent/
│   │   │   └── models.json      # 模型配置（自动生成）
│   │   ├── agent.json           # Agent 配置
│   │   └── sessions/            # 会话目录
│   │       ├── *.jsonl          # 会话历史文件
│   │       └── sessions.json    # 会话索引
│   ├── main/                    # Main Agent（默认）
│   │   ├── agent/
│   │   │   └── models.json
│   │   └── sessions/
│   │       ├── *.jsonl
│   │       └── sessions.json
│   ├── pm/                      # PM Agent
│   │   ├── agent/
│   │   │   └── models.json
│   │   ├── agent.json
│   │   └── sessions/
│   └── tester/                  # Tester Agent
│       ├── agent/
│       │   └── models.json
│       ├── agent.json
│       └── sessions/
├── canvas/                      # Canvas UI
│   └── index.html
├── cron/                        # 定时任务
│   └── jobs.json
├── delivery-queue/              # 消息投递队列
│   └── failed/                  # 失败的消息
├── devices/                     # 设备配对
│   ├── paired.json              # 已配对设备
│   └── pending.json             # 待配对设备
├── feishu/                      # Feishu 插件缓存
│   └── dedup/
│       └── default.json         # 去重记录
├── identity/                    # 身份认证
│   ├── device-auth.json         # 设备认证
│   └── device.json              # 设备信息
├── logs/                        # 日志
│   └── config-audit.jsonl       # 配置审计日志
├── media/                       # 媒体文件
│   └── inbound/                 # 接收的媒体文件
│       └── *.png/*.jpg/...      # 图片、音频等
├── memory/                      # 记忆数据库 ⭐
│   ├── main.sqlite              # Main Agent 记忆库
│   └── coder.sqlite             # Coder Agent 记忆库
├── openclaw.json                # 主配置文件 ⭐
├── openclaw.json.bak*           # 备份（最多5个）
├── subagents/                   # 子 Agent
│   └── runs.json                # 运行记录
├── update-check.json            # 更新检查
├── workspace/                   # Main Agent 工作区 ⭐
│   ├── AGENTS.md               # Agent 规范
│   ├── BOOTSTRAP.md            # 启动引导
│   ├── HEARTBEAT.md            # 心跳任务
│   ├── IDENTITY.md             # 身份定义
│   ├── SOUL.md                 # 核心定义
│   ├── TOOLS.md                # 工具定义
│   ├── USER.md                 # 用户配置
│   ├── config/                 # 配置文件
│   │   └── mcporter.json
│   ├── learn-docs/             # 学习文档
│   │   └── *.md
│   ├── skills/                 # 技能定义
│   │   └── <skill-name>/
│   │       └── SKILL.md
│   └── openclaw-design-patterns.md
└── workspace-coder/             # Coder Agent 工作区 ⭐
    ├── AGENTS.md
    ├── BOOTSTRAP.md
    ├── HEARTBEAT.md
    ├── IDENTITY.md
    ├── SOUL.md
    ├── TOOLS.md
    ├── USER.md
    └── config/
        └── mcporter.json
```

---

## 2. 核心目录详解

### 2.1 agents/ - Agent 数据目录

每个 Agent 都有独立的目录，目录名就是 Agent ID：

```
agents/
├── main/      # 默认 Agent（保留字）
├── coder/     # 自定义 Agent
├── pm/        # 自定义 Agent
└── tester/    # 自定义 Agent
```

每个 Agent 目录下包含：

| 目录/文件 | 说明 |
|-----------|------|
| `SYSTEM.md` | Agent 系统提示词（定义角色和行为） |
| `agent/` | Agent 运行时配置 |
| `agent/models.json` | 模型配置（自动生成） |
| `agent/auth-profiles.json` | 认证凭据 |
| `agent.json` | Agent 定义配置 |
| `sessions/` | 会话历史目录 |
| `sessions/*.jsonl` | 单个会话的完整对话历史 |
| `sessions/sessions.json` | 会话索引（包含会话元数据） |

#### 会话文件格式

`.jsonl` 文件每行是一个 JSON 对象，记录单轮对话：

```json
{"role": "user", "content": "你好", "timestamp": 1700000000000}
{"role": "assistant", "content": "你好！有什么可以帮你的？", "timestamp": 1700000001000}
{"role": "tool", "tool": "bash", "input": "ls", "output": "..."}
```

#### 会话生命周期

会话文件可能处于以下状态：

| 文件状态 | 说明 |
|---------|------|
| `*.jsonl` | 活跃会话 |
| `*.jsonl.deleted.*` | 已删除的会话（软删除） |
| `sessions.json` | 会话索引，包含所有会话的元数据 |

### 2.2 workspace/ - Agent 工作区

`workspace/` 目录存放 Agent 的"灵魂"文件，这些文件定义了 Agent 的行为和能力：

| 文件 | 作用 |
|------|------|
| `AGENTS.md` | Agent 规范定义 |
| `BOOTSTRAP.md` | 启动引导流程 |
| `HEARTBEAT.md` | 心跳任务配置 |
| `IDENTITY.md` | 身份定义 |
| `SOUL.md` | 核心定义（系统提示词） |
| `TOOLS.md` | 工具定义 |
| `USER.md` | 用户配置 |
| `config/` | 配置文件目录 |
| `learn-docs/` | 学习文档目录 |
| `skills/` | 技能定义目录 |
| `openclaw-design-patterns.md` | 设计模式 |

> **注意**：每个 Agent 可以有独立的工作区。如果 Agent 配置了 `workspace` 字段，则使用该路径；否则使用共享的 `workspace/`。

### 2.3 openclaw.json - 主配置文件

主配置文件，包含所有运行时配置：

- `models`: 模型 Provider 配置
- `agents`: Agent 列表和默认配置
- `channels`: 消息渠道配置
- `session`: 会话配置
- `gateway`: 网关配置
- `secrets`: 密钥管理

备份文件：`openclaw.json.bak`, `openclaw.json.bak.1` ...

### 2.4 memory/ - 记忆数据库

使用 SQLite 存储向量化的记忆数据：

```
memory/
├── main.sqlite      # Main Agent 的记忆库
└── coder.sqlite     # Coder Agent 的记忆库
```

每个 Agent 可以有独立的记忆库，用于 RAG（检索增强生成）功能，让 Agent 能够记忆之前的对话和知识。

---

## 3. 功能目录说明

### 3.1 canvas/ - Canvas UI

Web UI 的静态文件目录，访问 `http://localhost:18789/canvas` 可查看。

### 3.2 cron/ - 定时任务

定时执行的任务配置：

```
cron/
└── jobs.json
```

### 3.3 delivery-queue/ - 消息投递队列

消息发送失败后的重试队列：

```
delivery-queue/
└── failed/         # 失败的消息（待重试）
```

### 3.4 devices/ - 设备配对

设备配对信息，用于多设备同步：

```
devices/
├── paired.json      # 已配对的设备
└── pending.json     # 待配对的设备
```

### 3.5 feishu/ - Feishu 插件缓存

飞书插件的去重和缓存：

```
feishu/
└── dedup/
    └── default.json    # 消息去重记录
```

### 3.6 identity/ - 身份认证

设备身份认证信息：

```
identity/
├── device-auth.json    # 设备认证凭据
└── device.json         # 设备信息
```

### 3.7 logs/ - 日志目录

运行日志和审计日志：

```
logs/
└── config-audit.jsonl    # 配置变更审计日志
```

### 3.8 media/ - 媒体文件

接收的媒体文件存储：

```
media/
└── inbound/
    └── *.png/*.jpg/*.mp3/...    # 图片、音频、视频等
```

### 3.9 subagents/ - 子 Agent

子 Agent 的运行记录：

```
subagents/
└── runs.json    # 子 Agent 调用历史
```

---

## 4. 数据备份指南

### 4.1 必须备份

| 目录/文件 | 说明 |
|-----------|------|
| `openclaw.json` | 主配置文件 |
| `agents/` | 所有 Agent 的配置和会话 |
| `workspace*/` | Agent 工作区（包含自定义提示词） |
| `identity/` | 设备身份信息 |
| `memory/*.sqlite` | 记忆数据库 |

### 4.2 可选备份

| 目录/文件 | 说明 |
|-----------|------|
| `media/inbound/` | 媒体文件（可重新接收） |
| `logs/` | 日志文件 |

### 4.3 无需备份

| 目录/文件 | 说明 |
|-----------|------|
| `canvas/` | UI 静态文件，可重新生成 |
| `*.bak` | 自动备份文件 |
| `update-check.json` | 更新检查缓存 |
| `sessions/*.deleted.*` | 已删除的会话 |

---

## 5. 常见问题

### Q1: 会话文件太大怎么办？

会话文件 `*.jsonl` 会随着对话增长。可以手动清理旧的会话文件，或使用 `openclaw session clean` 命令。

### Q2: 如何查找特定会话？

查看 `sessions/sessions.json` 获取会话索引，每个会话有创建时间和摘要。

### Q3: workspace 目录和 agents 目录的区别？

- `workspace/`: 存放 Agent 的"大脑"文件（提示词、工具定义等）
- `agents/`: 存放 Agent 的运行时数据（会话、模型配置等）

### Q4: 每个 Agent 有独立的记忆库吗？

是的，`memory/` 目录下可以为不同 Agent 创建独立的 `.sqlite` 文件，如 `main.sqlite` 和 `coder.sqlite`。

---

## 6. 检查点

- [ ] 理解 `~/.openclaw/` 根目录的结构
- [ ] 能够定位历史会话文件
- [ ] 理解 workspace 目录下的各个文件作用
- [ ] 知道数据备份应该包含哪些目录

---

## 7. 相关文档

- [全局配置指南](../openclaw-config-full-guide.md)
- [Agent 核心原理](./openclaw-agent-core.md)
