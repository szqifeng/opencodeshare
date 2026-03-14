---
sidebar_position: 3
title: OpenClaw Agent 核心原理
description: 详细讲解 OpenClaw Agent 的运行机制，包括运行时、工具系统、消息处理、会话管理等核心组件。
keywords: [OpenClaw Agent, 工具调用, 消息流转, 会话管理, 流式处理]
---

# OpenClaw Agent 核心原理

> 详细讲解 OpenClaw Agent 的运行机制，包括运行时、工具系统、消息处理等核心组件。

## 概述

OpenClaw 的 Agent 是一个基于**工具调用（Tool Calling）**范式的智能助手，它通过以下核心能力实现复杂任务的自动化处理：

- **智能推理**：使用大语言模型（LLM）理解用户意图
- **工具调用**：动态选择并执行合适的工具完成任务
- **流式响应**：实时输出生成内容，提升用户体验
- **会话管理**：维护对话历史，支持上下文延续
- **自适应重试**：智能处理错误和认证问题
- **可扩展架构**：通过插件系统无缝扩展功能

---

## 整体架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      用户输入层                                   │
│  CLI / WhatsApp / Telegram / Discord / Slack / Signal / iMessage  │
└───────────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   OpenClaw Gateway                               │
│  - 消息路由                                                   │
│  - 会话管理                                                   │
│  - 权限控制                                                   │
│  - 配置管理                                                   │
└───────────────────────┬───────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Agent 运行时 (pi-embedded-runner)                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  1. 请求预处理 - 权限检查、参数验证、钩子触发              │   │
│  │  2. 系统提示构建 - 工作区文件、技能提示、工具列表          │   │
│  │  3. LLM 调用 - 模型选择、认证管理、流式输出                │   │
│  │  4. 工具调度与执行 - 工具查找、参数解析、权限检查          │   │
│  │  5. 结果处理与返回 - 工具结果整合、流式文本累积           │   │
│  │  6. 会话持久化 - 消息追加、上下文检查、自动压缩            │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Agent 运行时

### 运行入口

```typescript
async function runEmbeddedPiAgent(
  params: RunEmbeddedPiAgentParams
): Promise<EmbeddedPiRunResult> {
  // 1. 生成运行 ID
  const runId = generateSecureToken(12);

  // 2. 创建运行句柄
  const runHandle: EmbeddedPiQueueHandle = {
    queueMessage: (text: string) => { /* 消息队列逻辑 */ },
    isStreaming: () => activeStreaming,
    isCompacting: () => activeCompacting,
    abort: () => { /* 中止运行 */ },
  };

  // 3. 注册运行状态
  setActiveEmbeddedRun(params.sessionId, runHandle, params.sessionKey);

  // 4. 执行主运行循环（带重试）
  const result = await runMainLoop({
    ...params,
    runId,
    runHandle,
    cleanup: () => clearActiveEmbeddedRun(params.sessionId, runHandle),
  });

  return result;
}
```

---

## 工具调用机制

### 工具定义

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

type ToolHandler = (
  params: Record<string, unknown>,
  context: ToolContext,
) => Promise<AgentToolResult>;

type ToolContext = {
  config: OpenClawConfig;
  workspaceDir: string;
  agentDir: string;
  agentId: string;
  sessionKey: string;
  sessionId: string;
  senderIsOwner: boolean;
  sandboxed?: boolean;
};
```

### Bash 工具示例

```typescript
const bashTool: AgentTool = {
  name: "bash",
  description: "Execute shell commands on the host system",
  label: "Bash",
  parameters: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "Shell command to execute",
      },
      timeout_ms: {
        type: "number",
        description: "Timeout in milliseconds (optional, default: 300000)",
      },
    },
    required: ["command"],
  },
  ownerOnly: true,  // 仅所有者可以执行

  handler: async (params, context) => {
    const { command, timeout_ms } = params;

    // 权限检查
    if (!context.senderIsOwner) {
      throw new ToolAuthorizationError("bash is owner-only");
    }

    // 执行命令
    const result = await runExec(command, {
      timeout: timeout_ms ?? 300_000,
      cwd: context.workspaceDir,
    });

    return {
      text: result.stdout,
      error: result.stderr,
      exitCode: result.exitCode,
    };
  },
};
```

---

## 系统提示构建

### 提示词结构

完整的系统提示包含以下部分：

```markdown
# OpenClaw Agent

## Capabilities
You are an AI assistant with access to various tools to complete tasks.

## Tool Names
[工具名称列表 - 例如: bash, read, write, edit, browser]

## Tools
[工具详细描述 - 每个 tool 的 name, description, parameters]

## Skills
[技能提示 - 来自 SKILL.md]

## Project Context
[工作区文件内容 - AGENTS.md, TOOLS.md, SKILL.md]

## Runtime
- Host: openclaw
- OS: darwin 24.0.0
- Node: v22.12.0
- Model: anthropic/claude-opus-4-6

## User Timezone
Timezone: UTC+8
```

---

## 会话管理

### 会话存储

```typescript
type SessionStore = Record<string, SessionEntry>;

type SessionEntry = {
  // 时间戳
  createdAt: string;
  updatedAt: string;

  // 消息历史
  transcript: Message[];

  // 元数据
  metadata?: {
    channelId?: string;
    threadId?: string;
    model?: string;
    provider?: string;
  };

  // 会话配置
  config?: SessionConfig;
};
```

### 会话压缩

当上下文窗口接近满时，系统会自动压缩会话：

```typescript
async function compactEmbeddedPiSession(
  params: CompactEmbeddedPiSessionParams
): Promise<EmbeddedPiCompactResult> {
  // 1. 加载会话
  const session = await loadSessionFile(sessionFile);

  // 2. 生成摘要（使用 LLM）
  const summaryPrompt = buildSummaryPrompt(session.transcript);
  const summary = await runEmbeddedPiAgent({
    systemPrompt: "Summarize the conversation concisely.",
    userPrompt: summaryPrompt,
    tools: [],
  });

  // 3. 保留重要消息并创建压缩后的会话
  const compacted: SessionFile = {
    ...session,
    transcript: [
      ...importantMessages,
      {
        role: "system",
        content: `Conversation summary: ${summary.text}`,
      },
    ],
  };

  // 4. 保存
  await writeSessionFile(sessionFile, compacted);

  return { ok: true, compacted: true, result: {...} };
}
```

---

## 错误处理与重试

### 重试策略

```typescript
const BASE_RUN_RETRY_ITERATIONS = 24;
const RUN_RETRY_ITERATIONS_PER_PROFILE = 8;
const MIN_RUN_RETRY_ITERATIONS = 32;
const MAX_RUN_RETRY_ITERATIONS = 160;

// 指数退避策略
const OVERLOAD_FAILOVER_BACKOFF_POLICY: BackoffPolicy = {
  initialMs: 250,
  maxMs: 1500,
  factor: 2,
  jitter: 0.2,
};
```

### 错误分类

```typescript
function isContextOverflowError(error: unknown): boolean {
  const message = (error as Error).message ?? "";
  return (
    message.includes("context length exceeded") ||
    message.includes("maximum context length")
  );
}

function isRateLimitError(error: unknown): boolean {
  const message = (error as Error).message ?? "";
  return (
    message.includes("rate limit") ||
    message.includes("too many requests") ||
    message.includes("429")
  );
}

function isAuthError(error: unknown): boolean {
  const message = (error as Error).message ?? "";
  return (
    message.includes("unauthorized") ||
    message.includes("invalid api key") ||
    message.includes("401")
  );
}
```

---

## 钩子系统

### 钩子类型

```typescript
type PluginHookName =
  | "before_model_resolve"      // 模型解析前
  | "before_prompt_build"       // 提示构建前
  | "before_agent_start"        // Agent 启动前
  | "llm_input"                // LLM 输入时
  | "llm_output"               // LLM 输出时
  | "agent_end"                // Agent 结束时
  | "before_compaction"        // 压缩前
  | "after_compaction"         // 压缩后
  | "message_received"         // 消息接收时
  | "message_sending"          // 消息发送前
  | "message_sent"             // 消息发送后
  | "before_tool_call"         // 工具调用前
  | "after_tool_call"          // 工具调用后
```

### 钩子注册示例

```typescript
// 在插件中注册钩子
export default function registerPlugin(api: OpenClawPluginApi) {
  // 注册 before_agent_start 钩子
  api.registerHook("before_agent_start", async (event, ctx) => {
    console.log("Agent starting:", event.sessionId);

    // 可以修改系统提示
    return {
      systemPrompt: event.systemPrompt + "\n\nCustom hook injected.",
    };
  });

  // 注册 after_tool_call 钩子
  api.registerHook("after_tool_call", async (event, ctx) => {
    console.log("Tool called:", event.toolName, event.result);
    return event.result;
  });
}
```

---

## 子代理系统

### 子代理参数

```typescript
type SubagentRunParams = {
  sessionKey: string;
  message: string;
  extraSystemPrompt?: string;
  lane?: string;
  deliver?: boolean;
  idempotencyKey?: string;
};

type SubagentRunResult = {
  runId: string;
};

type SubagentWaitParams = {
  runId: string;
  timeoutMs?: number;
};

type SubagentWaitResult = {
  status: "ok" | "error" | "timeout";
  error?: string;
};
```

### 子代理生成

```typescript
const spawnTool: AgentTool = {
  name: "sessions_spawn",
  description: "Spawn a subagent to handle a task",
  parameters: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Message for the subagent",
      },
      system_prompt: {
        type: "string",
        description: "Custom system prompt (optional)",
      },
      lane: {
        type: "string",
        description: "Execution lane (optional)",
      },
    },
    required: ["message"],
  },

  handler: async (params, context) => {
    const { message, system_prompt, lane } = params;

    // 1. 生成子代理会话键
    const subSessionKey = generateSubagentSessionKey(context.sessionKey);

    // 2. 运行子代理
    const result = await context.runtime.subagent.run({
      sessionKey: subSessionKey,
      message,
      extraSystemPrompt: system_prompt,
      lane,
      deliver: false,
    });

    return {
      runId: result.runId,
      sessionKey: subSessionKey,
    };
  },
};
```

---

## 总结

### 核心原理

1. **工具调用驱动** - LLM 根据用户意图动态选择工具，工具执行结果返回给 LLM 继续推理
2. **流式响应** - 实时输出生成内容，支持中途断开和恢复
3. **智能会话管理** - 自动压缩长对话，上下文窗口保护
4. **鲁棒错误处理** - 多层重试机制，认证资料自动轮换
5. **可扩展钩子系统** - 21 种钩子点覆盖整个生命周期
6. **子代理支持** - 并行任务处理，专业化子代理

### 关键设计原则

- **工具优先** - 每个工具有明确的 schema 和处理函数
- **安全第一** - 权限控制、路径安全检查
- **可观测性** - 详细的日志和诊断信息
- **可扩展性** - 通过插件系统添加新功能
- **鲁棒性** - 完善的错误处理和重试机制
- **性能优化** - 上下文窗口、令牌管理、流式批处理
