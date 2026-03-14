---
sidebar_position: 4
title: OpenClaw 插件系统架构
description: 详解 OpenClaw 插件系统的核心架构，包括插件注册、加载流程、运行时系统、钩子机制等。
keywords: [OpenClaw插件, 插件系统, PluginRegistry, PluginRuntime, 钩子]
---

# OpenClaw 插件系统架构

> 专注于 `src/plugins/` 目录下各组件之间的架构关系

## 核心架构图

```
OpenClaw 插件系统架构

├── 类型定义层
│   └── types.ts (OpenClawPlugin, PluginRegistry, ...)
│
├── 发现与加载层
│   ├── discovery.ts - 插件发现
│   ├── manifest.ts  - 清单解析
│   └── loader.ts    - 插件加载
│
├── 注册表层
│   └── registry.ts (PluginRegistry)
│       ├── plugins   - 插件记录
│       ├── tools     - 工具注册
│       ├── hooks     - 钩子注册
│       └── channels  - 通道注册
│
├── 运行时层
│   └── runtime/index.ts (createPluginRuntime)
│       ├── subagent - 子代理运行
│       ├── channel  - 通道运行
│       └── tools    - 工具运行
│
└── 子系统层
    ├── services.ts  - 服务管理
    ├── tools.ts     - 工具管理
    ├── hooks.ts     - 钩子定义
    └── providers.ts - 提供者管理
```

---

## 核心组件

### 1. PluginRegistry (注册表)

```typescript
type PluginRegistry = {
  // 所有插件
  plugins: PluginRecord[];
  
  // 工具注册
  tools: PluginToolRegistration[];
  
  // 钩子注册
  hooks: PluginHookRegistration[];
  typedHooks: TypedPluginHookRegistration[];
  
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

### 2. PluginRuntime (运行时)

```typescript
type PluginRuntime = {
  // 子代理运行
  subagent: {
    run(params): Promise<SubagentRunResult>;
    waitForRun(params): Promise<SubagentWaitResult>;
    getSessionMessages(params): Promise<{ messages: unknown[] }>;
    deleteSession(params): Promise<void>;
  };
  
  // 通道运行
  channel: {
    deliver(message): Promise<void>;
    getRuntimeState(): Promise<ChannelRuntimeSnapshot>;
    listAccounts(): Promise<ChannelAccount[]>;
  };
  
  // 工具运行
  tools: {
    invoke(toolId, params): Promise<ToolResult>;
  };
  
  // Gateway 方法
  gateway: {
    invoke(method, params): Promise<any>;
  };
  
  // 服务运行
  services: {
    start(serviceId): Promise<void>;
    stop(serviceId): Promise<void>;
  };
  
  // 上下文运行
  context: {
    resolvePath(input): string;
    emitEvent(event): void;
  };
  
  // 插件元数据
  id: string;
  name: string;
  version?: string;
  description?: string;
  source: string;
  config: Record<string, unknown>;
  pluginConfig?: Record<string, unknown>;
  logger: PluginLogger;
};
```

### 3. OpenClawPlugin (插件定义)

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

type OpenClawPluginApi = {
  id: string;
  name: string;
  version?: string;
  description?: string;
  source: string;
  config: OpenClawConfig;
  pluginConfig?: Record<string, unknown>;
  runtime: PluginRuntime;
  logger: PluginLogger;
  
  // 注册方法
  registerTool(tool, opts?): void;
  registerHook(events, handler, opts?): void;
  registerHttpRoute(params): void;
  registerChannel(registration): void;
  registerGatewayMethod(method, handler): void;
  registerCli(registrar, opts?): void;
  registerService(service): void;
  registerProvider(provider): void;
  registerCommand(command): void;
  resolvePath(input): string;
  on(hookName, handler, opts?): void;
};
```

---

## 加载流程

```
1. 发现插件
   └─► discoverOpenClawPlugins({ workspaceDir, ... })
       └─► PluginCandidate[]

2. 解析清单
   └─► loadPluginManifest(rootDir)
       └─► PluginManifestLoadResult

3. 动态导入
   └─► import(pluginEntry)
       └─► OpenClawPluginModule

4. 创建注册表
   └─► createEmptyPluginRegistry()
       └─► PluginRegistry

5. 创建运行时
   └─► createPluginRuntime(options)
       └─► PluginRuntime

6. 调用注册函数
   └─► plugin.register(api: OpenClawPluginApi)
       ├─► api.registerTool(...)
       ├─► api.registerChannel(...)
       ├─► api.registerHook(...)
       ├─► api.registerCli(...)
       ├─► api.registerService(...)
       └─► api.registerProvider(...)

7. 记录到注册表
   └─► registry.plugins.push(pluginRecord)
   └─► registry.tools.push(toolRegistration)
   └─► registry.hooks.push(hookRegistration)

8. 设置全局运行时
   └─► setActivePluginRegistry(registry)

9. 返回注册表
   └─► return PluginRegistry
```

---

## 注册类型

### 工具注册

```typescript
type PluginToolRegistration = {
  pluginId: string;
  factory: OpenClawPluginToolFactory;
  names: string[];
  optional: boolean;
  source: string;
};
```

### 通道注册

```typescript
type PluginChannelRegistration = {
  pluginId: string;
  plugin: ChannelPlugin;
  dock?: ChannelDock;
  source: string;
};
```

### 钩子注册

```typescript
type PluginHookRegistration = {
  pluginId: string;
  entry: HookEntry;
  events: string[];
  source: string;
};
```

### CLI 注册

```typescript
type PluginCliRegistration = {
  pluginId: string;
  register: OpenClawPluginCliRegistrar;
  commands: string[];
  source: string;
};
```

### 服务注册

```typescript
type PluginServiceRegistration = {
  pluginId: string;
  service: OpenClawPluginService;
  source: string;
};
```

---

## 组件依赖关系

```
types.ts (所有组件的基础类型)
    │
    ├─► registry.ts
    ├─► runtime.ts
    ├─► discovery.ts
    ├─► manifest.ts
    ├─► loader.ts
    ├─► services.ts
    ├─► tools.ts
    ├─► hooks.ts

discovery.ts
    │
    └─► loader.ts

loader.ts
    │
    ├─► types.ts
    ├─► discovery.ts
    ├─► manifest.ts
    ├─► manifest-registry.ts
    ├─► registry.ts
    └─► runtime.ts

registry.ts
    │
    ├─► types.ts
    └─► runtime.ts (创建时传入)

runtime/index.ts
    │
    ├─► types.ts
    ├─► runtime/types.ts
    └─► runtime/*.ts (所有子模块)
```

---

## 总结

### 核心设计

1. **类型驱动**：所有组件基于 `types.ts` 定义的类型
2. **注册表中心化**：`PluginRegistry` 是所有插件功能的中心存储
3. **运行时隔离**：`PluginRuntime` 提供独立的运行时环境
4. **分层架构**：发现 → 加载 → 注册 → 运行
5. **依赖注入**：通过 `OpenClawPluginApi` 注入运行时和配置

### 关键关系

| 层级 | 组件 | 关系 |
|------|------|------|
| **类型** | `types.ts` | 所有组件的基础 |
| **发现** | `discovery.ts`, `manifest.ts` | 被 `loader.ts` 使用 |
| **加载** | `loader.ts` | 创建 `PluginRegistry` 和 `PluginRuntime` |
| **注册** | `registry.ts` | 存储所有插件功能 |
| **运行时** | `runtime/` | 提供插件运行能力 |
| **子系统** | `services.ts`, `tools.ts`, `hooks.ts` | 使用 `PluginRuntime` |

### 外部接口

```typescript
// 主加载接口
loadOpenClawPlugins(options: PluginLoadOptions): Promise<PluginRegistry>

// 全局运行时访问
setActivePluginRegistry(registry: PluginRegistry): void
getActivePluginRegistry(): PluginRegistry

// 全局钩子运行器
getGlobalHookRunner(): GlobalHookRunner
initializeGlobalHookRunner(hooks: PluginHookRegistration[]): void

// 服务启动
startPluginServices(options: { registry, config, workspaceDir }): Promise<PluginServicesHandle>
```
