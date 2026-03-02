---
description: OpenCode 是什么？OpenCode 是一个基于大语言模型（LLM）的 Agent 运行时框架，用于构建可扩展、可编排、可控的智能系统。
keywords: ["OpenCode 介绍", "Agent 运行时", "LLM 框架", "智能系统"]
---

# OpenCode 是什么？

## 什么是 OpenCode？

OpenCode 是一个基于大语言模型（LLM）的 Agent 运行时框架，用于构建可扩展、可编排、可控的智能系统。

它依托大语言模型的自然语言理解与生成能力，重新定义人机交互方式——从"编写命令"转向"表达目标"。

在 OpenCode 中，用户通过自然语言描述意图，系统负责理解目标、规划步骤、调用能力并完成任务。

## OpenCode 的核心组成

OpenCode 由五个核心模块构成：

### 1. Agent（角色与边界）

- 定义身份与行为规则
- 控制可用能力范围
- 管理权限与任务目标

### 2. Skill（任务编排）

- 封装领域能力
- 组织多步骤执行流程
- 控制当前可用工具集合

### 3. Tool（原子能力）

- 提供具体可执行功能
- 具备明确参数结构与执行逻辑
- 可独立注册与扩展

### 4. Session（会话管理）

- 管理对话状态和消息持久化
- 协调工具调用和 LLM 交互
- 处理流式响应和事件通知
- 支持 Session Fork 和回滚机制

### 5. Prompt 规范

- 约束模型行为
- 明确调用规则
- 保证结构化输出

## Session 工作流程

Session 是 OpenCode 的核心，负责管理整个对话过程。

### 消息结构

OpenCode 采用 v2 版本的消息结构，支持多种 Part 类型：

- **text**: 文本内容
- **reasoning**: 推理过程
- **tool**: 工具调用
- **step-start/step-finish**: 步骤标记
- **patch**: 文件变更快照

### 对话处理流程

当用户发起对话时，OpenCode 的执行流程如下：

```
用户输入
   ↓
创建 SessionProcessor
   ├── 初始化工具调用映射表 (toolcalls)
   ├── 初始化快照追踪 (snapshot)
   ├── 设置阻塞标志 (blocked = false)
   ├── 设置重试次数 (attempt = 0)
   └── 设置压缩标志 (needsCompaction = false)
   ↓
进入处理循环 (while true)
   ↓
调用 LLM.stream(streamInput)
   ├─ 构建系统提示词
   │  ├── Agent prompt
   │  ├── Provider prompt
   │  └── 用户自定义 prompt
   └─ 返回流式结果 (fullStream)
   ↓
处理流式事件 (for await)
   ├─ start: 设置 Session 状态为 "busy"
   ├─ reasoning-start/delta/end
   │  ├── 创建 ReasoningPart
   │  ├── 追加推理文本
   │  └─ 完成推理，更新时间戳
   ├─ tool-input-start/delta/end
   │  └─ 创建 ToolPart (status: "pending")
   ├─ tool-call
   │  ├── 验证工具是否存在
   │  ├── Doom Loop 检测 (连续3次相同调用)
   │  │  └─ 触发权限询问 (PermissionNext.ask)
   │  ├── 更新状态为 "running"
   │  └─ 存储到 toolcalls 映射
   ├─ tool-result
   │  ├── 更新状态为 "completed"
   │  ├── 记录输出和元数据
   │  └─ 从 toolcalls 移除
   ├─ tool-error
   │  ├── 更新状态为 "error"
   │  ├── 记录错误信息
   │  ├── 检查是否被阻塞 (PermissionNext.RejectedError / Question.RejectedError)
   │  └─ 从 toolcalls 移除
   ├─ error: 抛出异常
   ├─ start-step
   │  └─ 开始快照追踪 (Snapshot.track())
   ├─ finish-step
   │  ├── 计算使用量 (tokens, cost)
   │  ├── 更新消息完成原因 (finishReason)
   │  ├── 创建 step-finish Part
   │  ├── 生成文件变更快照 (Snapshot.patch)
   │  │  └─ 创建 patch Part
   │  ├── 触发摘要 (SessionSummary.summarize)
   │  └─ 检查是否需要压缩 (SessionCompaction.isOverflow)
   ├─ text-start/delta/end
   │  ├── 创建 TextPart
   │  ├── 追加文本内容
   │  ├── 触发插件钩子 (experimental.text.complete)
   │  └─ 完成文本，更新时间戳
   └─ finish: 完成本次循环
   ↓
异常处理 (try-catch)
   ├─ ContextOverflowError
   │  └─ 设置 needsCompaction = true，发布错误事件
   ├─ 可重试错误
   │  ├── 计算重试延迟 (SessionRetry.delay)
   │  ├── 设置状态为 "retry"
   │  ├── 等待延迟时间
   │  └─ continue (继续循环)
   └─ 其他错误
      ├─ 创建错误消息 (MessageV2.fromError)
      ├─ 发布错误事件 (Bus.publish)
      ├─ 设置状态为 "idle"
      └─ 记录到消息 (assistantMessage.error)
   ↓
清理未完成的工具调用
   └─ 将所有 running/pending 状态的工具设为 "error"
   ↓
更新消息完成时间
   └─ assistantMessage.time.completed = Date.now()
   ↓
返回结果状态
   ├─ "compact": 需要压缩
   ├─ "stop": 停止 (blocked 或有错误)
   └─ "continue": 继续
```

### 关键机制详解

#### Doom Loop 检测

当检测到连续 3 次相同的工具调用时，触发权限询问：

```typescript
const lastThree = parts.slice(-DOOM_LOOP_THRESHOLD)  // 获取最后3个工具调用

if (
  lastThree.length === DOOM_LOOP_THRESHOLD &&
  lastThree.every(
    (p) =>
      p.type === "tool" &&
      p.tool === value.toolName &&
      p.state.status !== "pending" &&
      JSON.stringify(p.state.input) === JSON.stringify(value.input),
  )
) {
  // 触发权限询问
  await PermissionNext.ask({
    permission: "doom_loop",
    patterns: [value.toolName],
    sessionID: input.assistantMessage.sessionID,
    metadata: {
      tool: value.toolName,
      input: value.input,
    },
    always: [value.toolName],
    ruleset: agent.permission,
  })
}
```

#### 权限拒绝处理

当工具因权限拒绝或问题拒绝而失败时，根据配置决定是否停止循环：

```typescript
const shouldBreak = (await Config.get()).experimental?.continue_loop_on_deny !== true

if (
  value.error instanceof PermissionNext.RejectedError ||
  value.error instanceof Question.RejectedError
) {
  blocked = shouldBreak  // 如果 shouldBreak 为 true，则停止
}
```

#### 快照和文件追踪

在步骤开始和结束时进行快照追踪，自动生成文件变更：

```typescript
case "start-step":
  snapshot = await Snapshot.track()  // 开始追踪

case "finish-step":
  const patch = await Snapshot.patch(snapshot)  // 生成变更快照
  if (patch.files.length) {
    await Session.updatePart({
      type: "patch",
      hash: patch.hash,
      files: patch.files,  // 文件变更列表
    })
  }
```

#### 上下文压缩

当 token 超出限制时，触发压缩机制：

```typescript
if (await SessionCompaction.isOverflow({ tokens: usage.tokens, model: input.model })) {
  needsCompaction = true  // 标记需要压缩
  break  // 退出循环，返回 "compact" 状态
}
```

#### 重试机制

对于可重试的错误，自动进行重试：

```typescript
const retry = SessionRetry.retryable(error)
if (retry !== undefined) {
  attempt++
  const delay = SessionRetry.delay(attempt, error.name === "APIError" ? error : undefined)
  SessionStatus.set(input.sessionID, {
    type: "retry",
    attempt,
    message: retry,
    next: Date.now() + delay,
  })
  await SessionRetry.sleep(delay, input.abort).catch(() => {})
  continue  // 重试
}
```

### 事件系统

Session 通过事件总线发布事件，其他模块订阅以实现响应式更新：

- `session.created`: Session 创建
- `session.updated`: Session 更新
- `session.deleted`: Session 删除
- `session.diff`: 文件变更
- `session.error`: 错误通知

### 状态管理

Session 有三种状态：

- **idle**: 空闲状态，等待输入
- **busy**: 处理中状态，正在执行任务
- **retry**: 重试状态，遇到可恢复错误

当消息上下文超出限制时，自动触发压缩机制。

### Session Fork

OpenCode 支持 Session Fork 机制，可以在任意消息处创建新的分支：

1. 获取原始 Session
2. 创建新 Session（带有 forked 标题）
3. 复制消息直到指定消息 ID
4. 克隆所有 Part
5. 返回新 Session

这让用户可以探索不同的对话路径。

## 最小可行动作集

OpenCode 提供一组基础工具（如 read、write、bash、webfetch），构成系统的最小能力闭环。

有了这些基础能力，系统可以：

- 读取与修改代码
- 执行命令
- 获取外部信息
- 生成并注册新能力

## 自扩展能力

由于系统具备编码与文件操作能力，OpenCode 不仅可以使用既有工具，还可以在既定架构边界内：

- 编写新的 Tool
- 生成新的 Skill
- 扩展任务能力范围
- 优化现有流程结构

这种机制并非"无控制的进化"，而是在明确权限与结构约束下的工程化扩展能力。

换言之：

OpenCode 可以在自身运行环境中构建新的能力模块，并将其纳入系统能力体系。

## 设计目标

OpenCode 的设计目标不是简单调用 LLM，而是构建一个：

- 可工程化管理能力
- 可分层控制权限
- 可持续扩展结构
- 可将自然语言转化为执行流程

的智能系统运行时环境。

## 核心特点

OpenCode Session 的核心工作流程具有以下特点：

### 1. 事件驱动

通过 Bus 事件系统实现松耦合，各模块之间通过事件通信，便于扩展和维护。

### 2. 流式处理

LLM 响应和工具调用都采用流式处理，实时反馈处理进度，提升用户体验。

### 3. 状态管理

清晰的状态转换（idle -> busy -> retry -> idle），确保系统行为可预测。

### 4. 容错机制

支持重试、错误处理、doom loop 检测，提高系统稳定性。

### 5. 版本控制

支持 session fork 和回滚，用户可以探索不同的对话路径。

### 6. 性能优化

自动触发压缩、批量处理，确保长期对话的性能。

## 下一步

如果你已经理解了以上概念，接下来你将学习：

- [快速体验](./quick-experience) - 通过简单示例快速上手
- [工作流](./workflow) - 了解架构分层和执行流程
- [工具](./tools-intro) - 学习默认工具的使用方法
- [配置](./configuration) - 配置网络和模型
- [指令](./commands) - 掌握命令行操作

建议按照文档顺序逐步阅读与实践，每一个模块都会在后续章节中展开讲解，并配有示例与实际操作说明。
