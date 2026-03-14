---
sidebar_position: 2
title: OpenClaw 代码架构详解
description: 详解 OpenClaw 的核心架构，包括网关-代理架构、插件系统、通道管理、启动流程等核心概念。
keywords: [OpenClaw架构, Gateway, Agent, 插件系统, 通道管理]
---

# OpenClaw 代码架构详解

## 概述

OpenClaw 是一个个人 AI 助手，运行在用户设备上，支持多种消息通道。核心设计理念：

- **本地优先**：Gateway 作为控制平面运行在本地
- **多通道集成**：统一的消息路由和处理
- **可扩展性**：插件系统提供扩展点
- **安全性**：默认安全配置，明确的权限控制

---

## 核心架构

OpenClaw 采用**网关-代理**架构：

```
Gateway 服务器
├── WebSocket Server + HTTP Server (控制平面 · 消息路由)
└── PluginRegistry (tools · hooks · channels · providers · services)

核心组件
├── Channel Manager (通道管理)
├── Agent Runtime (Agent 运行)
└── CLI Program (命令行)

插件系统
└── src/plugins/ + extensions/
```

---

## 启动流程

### 入口点链

| 步骤 | 位置 | 说明 |
|------|------|------|
| **1** | `openclaw.mjs` | CLI wrapper |
| **2** | `src/entry.ts` | entry point with respawn logic |
| **3** | `src/index.ts` | main entry + program building |
| **4** | `src/cli/program/build-program.js` | Commander program |
| **5** | `src/commands/` | 具体命令处理 (gateway, agent, channels, etc.) |

### Gateway 启动关键步骤

```typescript
async function startGatewayServer(options: GatewayServerOptions) {
  // 1. 加载配置
  const config = await loadConfig(options.configPath);

  // 2. 初始化插件运行时
  const runtime = createPluginRuntime(...);

  // 3. 创建插件注册表
  const registry = createEmptyPluginRegistry();

  // 4. 加载 Gateway 插件（包括通道插件）
  await loadGatewayPlugins({ registry, runtime, ... });

  // 5. 创建 WebSocket 服务器
  const server = createGatewayServer(wsServer, { registry, config, ... });

  // 6. 启动通道管理器
  const channelManager = createChannelManager(...);

  // 7. 启动定时任务 (cron)
  const cronService = buildGatewayCronService(...);

  // 8. 启动服务发现 (Bonjour/mDNS)
  await startGatewayDiscovery(...);

  // 9. 运行 boot 脚本 (BOOT.md)
  await runBootOnce(...);
}
```

---

## 通道插件系统

### ChannelPlugin 接口

```typescript
type ChannelPlugin<ResolvedAccount = any, Probe = unknown, Audit = unknown> = {
  // 基础信息
  id: ChannelId;                    // 通道 ID（如 "feishu", "telegram"）
  meta: ChannelMeta;                // 通道元数据
  capabilities: ChannelCapabilities;  // 通道能力

  // 入站向导
  onMessage?: (
    message: ChannelMessage,
    context: ChannelContext
  ) => Promise<void>;

  // 出站向导
  deliver?: (
    message: OutboundMessage,
    context: ChannelContext
  ) => Promise<void>;

  // 健康检查
  probe?: () => Promise<ProbeResult>;

  // 适配器（可选，按需实现）
  config?: ChannelConfigAdapter;
  setup?: ChannelSetupAdapter;
  pairing?: ChannelPairingAdapter;
  gateway?: ChannelGatewayAdapter;
  // ... 更多适配器
};
```

### ChannelManager 核心功能

```typescript
type ChannelManager = {
  // 获取状态快照
  getRuntimeSnapshot: () => ChannelRuntimeSnapshot;

  // 启动所有通道
  startChannels: () => Promise<void>;

  // 启动单个通道
  startChannel: (channelId: ChannelId, accountId?: string) => Promise<void>;

  // 停止单个通道
  stopChannel: (channelId: ChannelId, accountId?: string) => Promise<void>;

  // 标记通道登出
  markChannelLoggedOut: (channelId: ChannelId, cleared: boolean, accountId?: string) => void;
};
```

### 自动重启策略

```typescript
const CHANNEL_RESTART_POLICY: BackoffPolicy = {
  initialMs: 5_000,     // 初始延迟 5 秒
  maxMs: 5 * 60_000,     // 最大延迟 5 分钟
  factor: 2,             // 每次失败延迟翻倍
  jitter: 0.1,           // 添加 10% 随机抖动
};

const MAX_RESTART_ATTEMPTS = 10;  // 最多重试 10 次
```

---

## 插件注册系统

### OpenClawPlugin 定义

```typescript
type OpenClawPlugin = {
  id: string;
  name: string;
  version?: string;
  description?: string;
  kind?: PluginKind;
  configSchema?: OpenClawPluginConfigSchema;
  register?: (api: OpenClawPluginApi) => void | Promise<void>;
  activate?: (api: OpenClawPluginApi) => void | Promise<void>;
};
```

### 插件注册示例

```typescript
const plugin = {
  id: "feishu",
  kind: "channel",
  register(api: OpenClawPluginApi) {
    // 注册通道插件
    api.registerChannel({ plugin: feishuPlugin });
    
    // 注册工具
    api.registerTool(() => ({ ... }));
    
    // 注册 CLI
    api.registerCli((ctx) => { ... });
    
    // 注册钩子
    api.registerHook("before_agent_start", ...);
    
    // 注册服务
    api.registerService({ ... });
  }
};
```

---

## 核心组件关系

| 组件 | 职责 | 依赖 | 被依赖 |
|------|------|------|--------|
| **OpenClawPlugin** | 插件定义 | - | PluginRegistry, OpenClawPluginApi |
| **PluginRegistry** | 插件注册表 | OpenClawPlugin | Gateway, ChannelManager, CLI Program |
| **ChannelPlugin** | 通道插件实现 | - | ChannelManager, PluginRegistry |
| **ChannelManager** | 通道生命周期管理 | PluginRegistry, ChannelPlugin | Gateway |
| **CLI Program** | 命令行程序 | PluginRegistry | 用户 |
| **Agent Runtime** | Agent 运行时 | PluginRegistry.tools | Gateway |
| **Gateway** | 服务器控制平面 | 所有组件 | 所有组件 |

---

## 扩展点

| 扩展点 | 注册 API | 说明 |
|--------|---------|------|
| 工具 | `registerTool()` | 为 Agent 添加新工具 |
| 通道 | `registerChannel()` | 集成消息平台 |
| CLI | `registerCli()` | 扩展命令行 |
| 钩子 | `registerHook()` | 介入生命周期 |
| 服务 | `registerService()` | 运行后台服务 |
| 提供者 | `registerProvider()` | 添加 AI 模型提供商 |
| HTTP 路由 | `registerHttpRoute()` | 添加自定义端点 |
| 命令 | `registerCommand()` | 添加非 LLM 命令 |

---

## 关键设计模式

1. **注册模式**：插件通过 `register()` 函数注册功能到 PluginRegistry
2. **依赖注入**：OpenClawPluginApi 提供所有必要的依赖（runtime, config, logger）
3. **适配器模式**：ChannelPlugin 提供多个适配器接口（config, setup, auth, gateway）
4. **代理模式**：ChannelManager 管理所有通道插件的生命周期
5. **工厂模式**：OpenClawPluginToolFactory 用于创建工具实例
