---
sidebar_position: 1
title: OpenClaw 架构设计分层
description: 从架构分层视角讲解 OpenClaw 的设计，帮助理解各层职责、组件关系和数据流向。
keywords: [OpenClaw架构, 分层架构, Gateway, Agent运行时, 插件系统]
---

# OpenClaw 架构设计分层

> 从架构分层视角讲解 OpenClaw 的设计，帮助理解各层职责、组件关系和数据流向。

## 架构总览

### 设计理念

OpenClaw 采用**分层架构**设计，遵循以下核心原则：

- **单一职责**：每层只负责特定的职责
- **依赖倒置**：上层依赖下层抽象，不依赖具体实现
- **开放封闭**：通过插件系统扩展，核心保持稳定
- **接口隔离**：通过清晰接口定义组件交互

### 技术栈

| 组件 | 技术 |
|------|------|
| **运行时** | Node.js 22+ |
| **语言** | TypeScript (ESM) |
| **AI 核心** | `@mariozechner/pi-agent-core` |
| **通信** | WebSocket (ws), HTTP (Express) |
| **包管理** | pnpm |
| **测试** | Vitest |

### 架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                    第一层：用户接入层                         │
│  CLI │ Web UI │ macOS App │ Mobile Apps │ External Channels  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    第二层：控制平面层                         │
│  Gateway Server (WebSocket + HTTP)  │  认证授权  │  配置管理 │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    第三层：核心服务层                         │
│  Channel Manager │ Agent Runtime │ Node Registry │ Session Mgr │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    第四层：插件系统层                         │
│  Plugin Registry │ Plugin Loader │ Plugin Runtime │ Hooks    │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    第五层：运行时层                           │
│  Tool Execution │ LLM Integration │ Media Pipeline │ Services  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    第六层：基础设施层                         │
│  Config Store │ File System │ Network │ Process │ Security    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 分层架构

### 层次关系表

| 层次 | 名称 | 职责 | 主要组件 |
|------|------|------|----------|
| **L1** | 用户接入层 | 用户交互入口 | CLI, Web UI, Apps |
| **L2** | 控制平面层 | 统一控制中心 | Gateway Server, Auth, Config |
| **L3** | 核心服务层 | 核心业务逻辑 | Channel Manager, Agent Runtime, Sessions |
| **L4** | 插件系统层 | 可扩展性基础 | Plugin Registry, Loader, Runtime |
| **L5** | 运行时层 | 具体执行环境 | Tool Execution, LLM, Media |
| **L6** | 基础设施层 | 底层基础服务 | Config, File System, Network, Process |

### 层间依赖规则

```
L1 (用户接入层)
    ↓ 依赖
L2 (控制平面层)
    ↓ 依赖
L3 (核心服务层)
    ↓ 依赖
L4 (插件系统层)
    ↓ 依赖
L5 (运行时层)
    ↓ 依赖
L6 (基础设施层)
```

**规则**：
- 上层依赖下层，下层不依赖上层
- 同层组件可以相互依赖
- 跨层通信必须通过明确定义的接口

---

## 第一层：用户接入层

### 职责

- 提供多种用户交互方式
- 统一的用户体验
- 客户端状态管理

### 组件

#### 1. CLI (命令行接口)

**位置**: `src/cli/`

**职责**:
- 提供命令行交互界面
- 命令解析和路由
- 用户输入处理

**关键文件**:
```typescript
src/cli/
├── program.ts                    // Commander 程序构建
├── run-main.js                  // 主入口
├── progress.ts                  // 进度显示
└── commands/                    // 命令实现
    ├── gateway.ts
    ├── agent.ts
    ├── channels.ts
    └── ...
```

#### 2. Web UI

**位置**: `ui/`

**职责**:
- 提供浏览器界面
- 实时消息展示
- 配置管理界面

**关键组件**:
```typescript
ui/
├── Control UI                    // 控制面板
├── WebChat                       // 聊天界面
└── Dashboard                     // 仪表板
```

#### 3. External Channels

**位置**: `extensions/*`, `src/channels/`

**职责**:
- 集成外部消息平台
- 消息格式转换
- 权限和安全控制

**支持的通道**:
```typescript
// 内置通道 (src/channels/)
- WhatsApp    (Baileys SDK)
- Telegram    (grammY SDK)
- Slack       (Bolt SDK)
- Discord     (discord.js)
- Signal      (signal-cli)
- Google Chat (Chat API)
- ... 20+ 通道

// 扩展通道 (extensions/)
- Feishu      (飞书/Lark)
- MS Teams
- Matrix
- LINE
- ... 更多
```

---

## 第二层：控制平面层

### 职责

- 统一的服务入口
- 会话管理
- 认证和授权
- 配置管理

### 组件

#### 1. Gateway Server

**位置**: `src/gateway/`

**职责**:
- WebSocket 服务器（控制平面）
- HTTP 服务器（API 和 UI）
- 消息路由和分发
- 节点注册和管理

**关键文件**:
```typescript
src/gateway/
├── server.impl.ts               // Gateway 主实现
├── server-ws-runtime.ts        // WebSocket 运行时
├── server-http.ts              // HTTP 服务器
├── server-chat.ts              // 聊天消息处理
├── server-methods.ts           // WebSocket 方法注册
├── server-channels.ts          // 通道管理器
├── server-plugins.ts           // 插件加载
├── auth.ts                     // 认证系统
├── credentials.ts              // 凭证管理
├── node-registry.ts            // 节点注册表
└── boot.ts                     // 启动检查
```

**核心方法**:
```typescript
type GatewayMethod =
  | "agent.run"                 // 运行 agent
  | "sessions.list"             // 列出会话
  | "sessions.send"             // 发送消息到其他会话
  | "tool.invoke"               // 调用工具
  | "channels.status"           // 获取通道状态
  | "nodes.list"                // 列出节点
  | "node.invoke"               // 调用节点方法
  | "config.patch"              // 更新配置
```

#### 2. 认证系统

**位置**: `src/gateway/auth.ts`

**职责**:
- 客户端认证
- 权限验证
- 会话管理

#### 3. 配置管理

**位置**: `src/config/`

**职责**:
- 配置加载和解析
- 配置热重载
- 配置验证

---

## 第三层：核心服务层

### 职责

- 核心业务逻辑
- 通道管理
- Agent 运行时
- 会话管理
- 节点注册

### 组件

#### 1. Channel Manager

**位置**: `src/gateway/server-channels.ts`

**职责**:
- 通道生命周期管理
- 通道启动和停止
- 通道健康检查
- 自动重启机制

**自动重启策略**:
```typescript
const CHANNEL_RESTART_POLICY: BackoffPolicy = {
  initialMs: 5_000,      // 初始延迟 5 秒
  maxMs: 5 * 60_000,     // 最大延迟 5 分钟
  factor: 2,               // 每次失败延迟翻倍
  jitter: 0.1,             // 添加 10% 随机抖动
};

const MAX_RESTART_ATTEMPTS = 10;  // 最多重试 10 次
```

#### 2. Agent Runtime

**位置**: `src/agents/`

**职责**:
- Agent 生命周期管理
- 工具调度和执行
- 流式响应处理
- 会话压缩

**关键文件**:
```typescript
src/agents/
├── pi-embedded-runner/       // Agent 运行时核心
│   ├── run.ts               // 主运行逻辑
│   ├── runs.ts              // 运行状态管理
│   ├── types.ts             // 类型定义
│   ├── attempt.ts           // 单次尝试
│   └── compact.ts           // 会话压缩
├── system-prompt.ts          // 系统提示构建
├── workspace.ts             // 工作空间管理
├── skills.ts                // Skills 系统
├── model-selection.ts       // 模型选择
├── auth-profiles.ts         // 认证配置
└── tools/                   // 工具定义
    ├── common.ts            // 通用工具类型
    ├── bash.ts             // bash 工具
    ├── read.ts             // read 工具
    ├── write.ts            // write 工具
    ├── edit.ts             // edit 工具
    ├── browser.ts          // browser 工具
    ├── canvas.ts           // canvas 工具
    └── sessions_*.ts       // sessions 工具
```

#### 3. Session Manager

**位置**: `src/config/sessions/`

**职责**:
- 会话存储和加载
- 会话元数据管理
- 会话历史压缩
- 上下文窗口保护

#### 4. Node Registry

**位置**: `src/gateway/node-registry.ts`

**职责**:
- 节点注册和发现
- 节点状态管理
- 节点方法调用
- 节点生命周期

---

## 第四层：插件系统层

### 职责

- 插件发现和加载
- 插件注册和生命周期
- 插件运行时环境
- 钩子系统

### 组件

#### 1. Plugin Registry

**位置**: `src/plugins/registry.ts`

**职责**:
- 存储所有插件元数据
- 管理插件注册项
- 提供插件查询接口

**注册表结构**:
```typescript
type PluginRegistry = {
  // 所有插件
  plugins: PluginRecord[];

  // 工具注册
  tools: PluginToolRegistration[];

  // 钩子注册
  hooks: PluginHookRegistration[];

  // 通道注册
  channels: PluginChannelRegistration[];

  // 提供者注册
  providers: PluginProviderRegistration[];

  // Gateway 方法
  gatewayHandlers: GatewayRequestHandlers;

  // HTTP 路由
  httpRoutes: PluginHttpRouteRegistration[];

  // CLI 注册
  cliRegistrars: PluginCliRegistration[];

  // 服务注册
  services: PluginServiceRegistration[];

  // 自定义命令
  commands: PluginCommandRegistration[];
};
```

#### 2. Plugin Loader

**位置**: `src/plugins/loader.ts`

**职责**:
- 插件发现
- 插件加载
- 插件初始化

**加载流程**:
```typescript
async function loadOpenClawPlugins(options: PluginLoadOptions): Promise<PluginRegistry> {
  // 1. 发现插件
  const candidates = await discoverOpenClawPlugins(options);

  // 2. 创建注册表
  const registry = createEmptyPluginRegistry();

  // 3. 创建运行时
  const runtime = createPluginRuntime(options);

  // 4. 加载每个插件
  for (const candidate of candidates) {
    const module = await import(candidate.entry);
    const plugin = module.default;

    // 5. 调用注册函数
    const api = createPluginApi(plugin, runtime, options);
    await plugin.register(api);

    // 6. 记录到注册表
    registry.plugins.push(createPluginRecord(plugin, candidate));
  }

  return registry;
}
```

#### 3. Hooks System

**位置**: `src/plugins/hooks.ts`

**职责**:
- 钩子注册
- 钩子执行
- 钩子生命周期管理

**钩子类型**:
```typescript
type PluginHookName =
  | "before_model_resolve"      // 模型解析前
  | "before_prompt_build"       // 提示构建前
  | "before_agent_start"        // Agent 启动前
  | "llm_input"                // LLM 输入时
  | "llm_output"               // LLM 输出时
  | "agent_end"                // Agent 结束时
  | "message_received"          // 消息接收时
  | "message_sending"           // 消息发送前
  | "message_sent"              // 消息发送后
  | "before_tool_call"          // 工具调用前
  | "after_tool_call"           // 工具调用后
```

---

## 第五层：运行时层

### 职责

- 工具执行
- LLM 集成
- 媒体处理
- 服务运行

### 组件

#### 1. Tool Execution

**位置**: `src/agents/tools/`

**职责**:
- 工具定义和注册
- 工具参数验证
- 工具执行和结果返回
- 工具权限控制

**工具定义**:
```typescript
type AgentTool = {
  // 基础信息
  name: string;
  description: string;
  label?: string;

  // 参数 schema
  parameters: JsonSchema;

  // 处理函数
  handler: ToolHandler;

  // 权限控制
  ownerOnly?: boolean;
  actionGate?: ActionGate<Record<string, boolean | undefined>>;

  // 可选性
  optional?: boolean;
};
```

#### 2. LLM Integration

**位置**: `src/agents/`

**职责**:
- LLM 提供商集成
- 模型选择
- 流式输出
- 错误处理和重试

---

## 第六层：基础设施层

### 职责

- 配置存储
- 文件系统访问
- 网络通信
- 进程管理
- 安全基础

### 组件

#### 1. Config Store

**位置**: `src/config/`

#### 2. File System

**位置**: `src/infra/`

#### 3. Network

**位置**: `src/infra/`

#### 4. Process

**位置**: `src/process/`

#### 5. Security

**位置**: `src/security/`

---

## 数据流向

### 消息处理流程

```
用户发送消息
    │
    ▼
L1: 用户接入层接收消息
    │
    ▼
L2: 控制平面层路由消息
    │
    ▼
L3: 核心服务层处理消息
    │
    ▼
L4: 插件系统层扩展能力
    │
    ▼
L5: 运行时层执行任务
    │
    ▼
L6: 基础设施层提供基础服务
    │
    ▼
响应返回
```

---

## 关键组件映射

### 层次到组件映射

| 层次 | 组件 | 文件位置 | 说明 |
|------|------|----------|------|
| **L1** | CLI | `src/cli/` | 命令行接口 |
| **L1** | Web UI | `ui/` | 浏览器界面 |
| **L1** | Channels | `src/channels/` | 消息通道 |
| **L2** | Gateway Server | `src/gateway/server.impl.ts` | 服务器核心 |
| **L2** | Auth | `src/gateway/auth.ts` | 认证系统 |
| **L2** | Config | `src/config/` | 配置管理 |
| **L3** | Channel Manager | `src/gateway/server-channels.ts` | 通道管理器 |
| **L3** | Agent Runtime | `src/agents/` | Agent 运行时 |
| **L3** | Session Manager | `src/config/sessions/` | 会话管理 |
| **L4** | Plugin Registry | `src/plugins/registry.ts` | 插件注册表 |
| **L4** | Plugin Loader | `src/plugins/loader.ts` | 插件加载器 |
| **L5** | Tool Execution | `src/agents/tools/` | 工具执行 |
| **L5** | LLM Integration | `src/agents/cli-backends.ts` | LLM 集成 |
| **L6** | Config Store | `src/config/` | 配置存储 |
| **L6** | File System | `src/infra/fs.ts` | 文件系统 |

---

## 扩展点

| 扩展点 | 注册 API | 层次 | 说明 |
|--------|---------|------|------|
| 工具 | `registerTool()` | L4 | 为 Agent 添加新工具 |
| 通道 | `registerChannel()` | L4 | 集成消息平台 |
| 提供者 | `registerProvider()` | L4 | 添加 AI 模型提供商 |
| 钩子 | `registerHook()` | L4 | 介入生命周期 |
| 服务 | `registerService()` | L4 | 运行后台服务 |
| HTTP 路由 | `registerHttpRoute()` | L4 | 添加自定义端点 |
| CLI | `registerCli()` | L4 | 扩展命令行 |
| 命令 | `registerCommand()` | L4 | 添加非 LLM 命令 |

---

## 总结

### 架构设计原则

1. **分层清晰**：每层有明确的职责和边界
2. **依赖单向**：上层依赖下层，下层不依赖上层
3. **接口稳定**：通过明确定义的接口进行层间通信
4. **可扩展**：通过插件系统扩展功能，核心保持稳定
5. **可测试**：每层可以独立测试

### 关键设计模式

| 模式 | 应用场景 | 位置 |
|------|----------|------|
| **注册模式** | 插件注册 | L4: Plugin Registry |
| **依赖注入** | 插件 API | L4: Plugin Runtime |
| **适配器模式** | 通道适配 | L3: Channel Adapter |
| **代理模式** | 通道管理 | L3: Channel Manager |
| **工厂模式** | 工具创建 | L5: Tool Factory |
| **观察者模式** | 钩子系统 | L4: Hooks System |
| **策略模式** | 模型选择 | L5: Model Selection |
| **单例模式** | 配置存储 | L6: Config Store |
