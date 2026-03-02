---
description: 深入分析 OpenCode 会话系统中的双重 while(true) 循环架构 - 外层对话循环与内层重试循环的设计原理和交互流程
keywords: ["双重循环", "对话循环", "重试机制", "SessionProcessor", "架构设计"]
sidebar_position: 1
---

# 双重 while(true) 循环详解

## 概述

OpenCode 会话系统中存在**两层 while(true) 循环**，它们的**目的完全不同**：

- **外层循环**（prompt.ts）：处理多轮对话
- **内层循环**（processor.ts）：处理单次 AI 调用的重试

---

## 两层循环的对比

| 特性 | prompt.ts while(true) | processor.ts while(true) |
|-----|----------------------|------------------------|
| **位置** | `loop()` 函数 | `process()` 方法 |
| **目的** | 处理多轮对话 | 处理单次 AI 调用失败 |
| **循环次数** | N 次对话回合 | 重试次数（通常 1-3 次）|
| **退出条件** | AI 完成任务 | 成功或不可重试错误 |
| **返回值** | 无（break 退出） | "continue"/"stop"/"compact" |
| **嵌套关系** | 外层循环 | 内层循环 |
| **关注点** | 业务逻辑 | 技术细节（错误重试）|

---

## 外层循环：对话循环

### 代码位置

```typescript
// 文件：prompt.ts
// 函数：loop()

export const loop = fn(LoopInput, async (input) => {
  // ...

  while (true) {
    // A. 获取当前状态
    let msgs = await MessageV2.filterCompacted(MessageV2.stream(sessionID))

    // B. 查找最后消息
    let lastUser: MessageV2.User | undefined
    let lastAssistant: MessageV2.Assistant | undefined
    let lastFinished: MessageV2.Assistant | undefined
    let tasks: (MessageV2.CompactionPart | MessageV2.SubtaskPart)[] = []

    // C. 退出条件检查
    if (
      lastAssistant?.finish &&
      !["tool-calls", "unknown"].includes(lastAssistant.finish) &&
      lastUser.id < lastAssistant.id
    ) {
      break  // ← 关键退出点
    }

    // D. 优先处理挂起任务
    const task = tasks.pop()

    // D1. 处理子任务
    if (task?.type === "subtask") {
      // 执行子任务
      continue  // ← 继续下一次循环
    }

    // D2. 处理压缩任务
    if (task?.type === "compaction") {
      // 执行压缩
      continue
    }

    // E. 检查上下文溢出
    if (await SessionCompaction.isOverflow(...)) {
      await SessionCompaction.create(...)
      continue
    }

    // F. 正常处理：调用 AI
    const processor = SessionProcessor.create({...})
    const tools = await resolveTools({...})

    const result = await processor.process({
      user: lastUser,
      agent,
      abort,
      sessionID,
      system,
      messages: MessageV2.toModelMessages(msgs, model),
      tools,
      model,
    })

    // G. 根据 AI 返回结果决定下一步
    if (result === "stop") break        // ← AI 完成
    if (result === "compact") {        // ← 需要压缩
      await SessionCompaction.create({...})
    }
    continue  // ← 继续下一次循环
  }

  // H. 清理压缩任务
  SessionCompaction.prune({ sessionID })

  // I. 返回最后一条助手消息
  // ...
})
```

### 循环示例

```
用户: "帮我分析这个项目"
  ↓
【第 1 次循环】
  ├─ processor.process() 调用 AI
  ├─ AI 回复: "让我先探索代码库..."
  ├─ AI 调用工具: GlobTool
  └─ 返回 "continue"
  ↓
【第 2 次循环】
  ├─ processor.process() 调用 AI
  ├─ AI 看到工具结果（文件列表）
  ├─ AI 回复: "让我读取关键文件..."
  ├─ AI 调用工具: ReadTool
  └─ 返回 "continue"
  ↓
【第 3 次循环】
  ├─ processor.process() 调用 AI
  ├─ AI 看到工具结果（文件内容）
  ├─ AI 调用工具: TaskTool（子任务：生成文档）
  └─ 返回 "continue"
  ↓
【第 4 次循环】
  ├─ 检测到挂起的 subtask
  ├─ 执行子任务（独立的 AI 代理）
  └─ 返回 "continue"
  ↓
【第 5 次循环】
  ├─ processor.process() 调用 AI
  ├─ AI 看到子任务结果
  ├─ AI 回复: "分析完成..."
  ├─ finish = "stop"
  └─ 退出循环
```

### 循环的作用

1. **处理多轮对话**：AI 需要多次交互才能完成任务
2. **工具调用后继续**：每次工具调用后需要重新调用 AI
3. **子任务处理**：需要等待子任务完成后继续
4. **上下文管理**：需要在溢出时压缩历史
5. **用户中断**：处理用户中途发送的新消息

---

## 内层循环：重试循环

### 代码位置

```typescript
// 文件：processor.ts
// 方法：SessionProcessor.create().process()

async process(streamInput: LLM.StreamInput) {
  // ...

  while (true) {
    try {
      // 1. 调用 AI，处理流式响应
      let currentText: MessageV2.TextPart | undefined
      let reasoningMap: Record<string, MessageV2.ReasoningPart> = {}
      const stream = await LLM.stream(streamInput)

      // 2. 处理流式事件
      for await (const value of stream.fullStream) {
        input.abort.throwIfAborted()

        switch (value.type) {
          case "start":
            SessionStatus.set(input.sessionID, { type: "busy" })
            break

          case "reasoning-start":
            // 处理推理开始
            break

          case "reasoning-delta":
            // 处理推理增量
            break

          case "reasoning-end":
            // 处理推理结束
            break

          case "tool-call":
            // 处理工具调用
            break

          case "tool-result":
            // 处理工具结果
            break

          case "tool-error":
            // 处理工具错误
            break

          case "text-start":
            // 处理文本开始
            break

          case "text-delta":
            // 处理文本增量
            break

          case "text-end":
            // 处理文本结束
            break

          case "finish":
            // 处理完成
            break

          case "error":
            throw value.error
        }

        if (needsCompaction) break
      }

    } catch (e: any) {
      log.error("process", { error: e })

      // 3. 转换错误
      const error = MessageV2.fromError(e, {
        providerID: input.model.providerID,
      })

      // 4. 上下文溢出特殊处理
      if (MessageV2.ContextOverflowError.isInstance(error)) {
        needsCompaction = true
        Bus.publish(Session.Event.Error, {
          sessionID: input.sessionID,
          error,
        })
      } else {
        // 5. 普通错误处理
        const retry = SessionRetry.retryable(error)

        // 6. 判断是否可以重试
        if (retry !== undefined) {
          attempt++
          const delay = SessionRetry.delay(attempt, error)

          // 7. 设置状态
          SessionStatus.set(input.sessionID, {
            type: "retry",
            attempt,
            message: retry,
            next: Date.now() + delay,
          })

          // 8. 等待重试
          await SessionRetry.sleep(delay, input.abort).catch(() => {})

          // 9. 继续循环（回到开始）
          continue  // ← 关键：重试
        }

        // 10. 不可重试的错误
        input.assistantMessage.error = error
        Bus.publish(Session.Event.Error, {
          sessionID: input.assistantMessage.sessionID,
          error: input.assistantMessage.error,
        })
        SessionStatus.set(input.sessionID, { type: "idle" })
      }
    }

    // 11. 清理工作
    if (snapshot) {
      const patch = await Snapshot.patch(snapshot)
      if (patch.files.length) {
        await Session.updatePart({
          id: Identifier.ascending("part"),
          messageID: input.assistantMessage.id,
          sessionID: input.sessionID,
          type: "patch",
          hash: patch.hash,
          files: patch.files,
        })
      }
      snapshot = undefined
    }

    // 12. 更新消息时间
    input.assistantMessage.time.completed = Date.now()
    await Session.updateMessage(input.assistantMessage)

    // 13. 返回结果
    if (needsCompaction) return "compact"
    if (blocked) return "stop"
    if (input.assistantMessage.error) return "stop"
    return "continue"
  }
}
```

### 重试示例

#### 场景 1：网络错误

```
【第 1 次重试循环】
  ├─ 尝试 1: 调用 AI
  │   └─ API Error: Connection timeout
  │       └─ 捕获错误
  │       └─ 判断可以重试（SessionRetry.retryable()）
  │       └─ attempt = 1
  │       └─ delay = 1000ms
  │       └─ 等待 1 秒
  │       └─ continue（回到循环开始）
  │
  ├─ 尝试 2: 调用 AI
  │   └─ 成功
  │       └─ return "continue"
  │
  └─ 退出重试循环
```

#### 场景 2：速率限制

```
【第 1 次重试循环】
  ├─ 尝试 1: 调用 AI
  │   └─ Rate Limit Error (429)
  │       └─ 捕获错误
  │       └─ 判断可以重试
  │       └─ attempt = 1
  │       └─ delay = 5000ms（指数退避）
  │       └─ 等待 5 秒
  │       └─ continue
  │
  ├─ 尝试 2: 调用 AI
  │   └─ 成功
  │       └─ return "continue"
  │
  └─ 退出重试循环
```

#### 场景 3：上下文溢出

```
【第 1 次重试循环】
  ├─ 尝试 1: 调用 AI
  │   └─ Context Overflow Error
  │       └─ 捕获错误
  │       └─ 特殊处理（ContextOverflowError）
  │       └─ needsCompaction = true
  │       └─ 发布错误事件
  │       └─ break（退出 try）
  │
  ├─ 清理工作
  │
  └─ return "compact"
```

#### 场景 4：不可重试的错误

```
【第 1 次重试循环】
  ├─ 尝试 1: 调用 AI
  │   └─ Invalid API Key Error
  │       └─ 捕获错误
  │       └─ 判断不可重试（SessionRetry.retryable() 返回 undefined）
  │       └─ 设置错误信息
  │       └─ 发布错误事件
  │       └─ SessionStatus.set({ type: "idle" })
  │
  ├─ 清理工作
  │
  └─ return "stop"
```

### 循环的作用

1. **网络错误重试**：处理临时性网络问题
2. **速率限制处理**：处理 API 速率限制
3. **上下文溢出处理**：特殊处理上下文溢出
4. **错误分类**：区分可重试和不可重试错误
5. **指数退避**：避免频繁重试加剧问题

---

## 完整交互流程

### 场景：多轮对话 + 网络错误

```
┌─────────────────────────────────────────────────────┐
│              prompt.ts loop() - 对话循环              │
└────────────────────┬────────────────────────────────┘
                     │
           ┌────────────▼────────────┐
           │   第 1 次对话循环         │
           └────────────┬────────────┘
                        │
           ┌────────────▼────────────┐
           │   processor.process()   │
           └────────────┬────────────┘
                        │
           ┌────────────▼────────────────────────────────┐
           │  processor.ts while(true) - 重试循环        │
           └────────────┬────────────────────────────────┘
                        │
           ┌────────────▼────────────┐
           │  尝试 1: 调用 AI         │
           │  API Error: Timeout      │
           │  等待 1 秒               │
           │  continue               │
           └────────────┬────────────┘
                        │
           ┌────────────▼────────────┐
           │  尝试 2: 调用 AI         │
           │  成功                    │
           │  return "continue"      │
           └────────────┬────────────┘
                        │
           ┌────────────▼────────────┐
           │  返回 "continue"        │
           └────────────┬────────────┘
                        │
           ┌────────────▼────────────┐
           │  第 2 次对话循环         │
           │  processor.process()   │
           │  成功                    │
           │  return "stop"          │
           └────────────┬────────────┘
                        │
           ┌────────────▼────────────┐
           │  返回 "stop"            │
           │  退出对话循环            │
           └─────────────────────────┘
```

### 状态图

```
┌─────────────────────────────────────────────────────────┐
│                   prompt.ts loop()                       │
│                                                         │
│   ┌─────────────┐                                        │
│   │   Start     │                                        │
│   └──────┬──────┘                                        │
│          │                                               │
│          ▼                                               │
│   ┌─────────────┐                                        │
│   │ 获取消息状态  │                                        │
│   └──────┬──────┘                                        │
│          │                                               │
│          ▼                                               │
│   ┌─────────────┐      是       ┌───────────┐           │
│   │ 检查退出条件  │──────────────►│  Break    │           │
│   └──────┬──────┘                └─────┬─────┘           │
│          │ 否                           │                 │
│          ▼                             │                 │
│   ┌─────────────┐      是       ┌───────────┐           │
│   │ 有挂起任务？  │──────────────►│ 处理任务   │───┐      │
│   └──────┬──────┘                └─────┬─────┘   │      │
│          │ 否                           │         │      │
│          ▼                             │         │      │
│   ┌─────────────┐      是       ┌───────────┐  │      │
│   │ 上下文溢出？  │──────────────►│ 创建压缩   │───┼──┐   │
│   └──────┬──────┘                └─────┬─────┘  │  │   │
│          │ 否                           │         │  │   │
│          ▼                             │         │  │   │
│   ┌─────────────────────────────────────▼─────────▼──▼──▼┐ │
│   │         processor.process()                      │ │ │
│   │                                                     │ │ │
│   │   ┌──────────────────────────────────────┐       │ │ │
│   │   │  processor.ts while(true)            │       │ │ │
│   │   │                                      │       │ │ │
│   │   │   ┌──────────┐                       │       │ │ │
│   │   │   │ 尝试调用 │                       │       │ │ │
│   │   │   └────┬─────┘                       │       │ │ │
│   │   │        │                            │       │ │ │
│   │   │        ├─► 成功 ──► return "continue│       │ │ │
│   │   │        │                            │       │ │ │
│   │   │        ├─► 失败                       │       │ │ │
│   │   │        │   │                        │       │ │ │
│   │   │        │   ├─► 可重试 ──► 等待 ──► continue │ │ │
│   │   │        │   │                        │       │ │ │
│   │   │        │   └─► 不可重试 ──► return "stop"│ │ │ │
│   │   │        │                            │       │ │ │
│   │   │        └─► 溢出 ──► return "compact"│       │ │ │
│   │   │                                      │       │ │ │
│   │   └──────────────────────────────────────┘       │ │ │
│   │                                                     │ │ │
│   └───────────────────────┬─────────────────────────────┘ │ │
│                           │                               │ │
└───────────────────────────┼───────────────────────────────┘ │
                            │                                 │
                            └─────────────────────────────────┘
```

---

## 为什么需要两层循环？

### 1. 关注点分离

```typescript
// 外层循环：业务逻辑
while (true) {
  // 处理多轮对话
  // 决定何时继续、何时停止
  const result = await processor.process(...)
  if (result === "stop") break
}

// 内层循环：技术细节
while (true) {
  try {
    // 调用 AI
    await streamLLM(...)
    return "continue"
  } catch (e) {
    // 错误重试
    if (canRetry(e)) {
      await sleep(delay)
      continue
    }
    return "stop"
  }
}
```

### 2. 代码复用

```typescript
// processor.process() 可以独立使用
const processor = SessionProcessor.create({...})
const result = await processor.process(...)
```

### 3. 灵活性

```typescript
// 可以单独调整重试逻辑，不影响对话流程
const retry = SessionRetry.retryable(error)
const delay = SessionRetry.delay(attempt, error)

// 可以单独调整对话逻辑，不影响重试
if (result === "stop") break
if (result === "compact") {
  await SessionCompaction.create(...)
}
```

---

## 总结

### 两个循环的职责

| 循环 | 职责 | 关键词 |
|-----|------|--------|
| **外层循环** | 对话流程管理 | 多轮、工具调用、子任务、压缩 |
| **内层循环** | 错误处理 | 重试、网络错误、速率限制、溢出 |

### 嵌套关系

```
while (true) {                    // 外层：对话循环
  while (true) {                  // 内层：重试循环
    try {
      await LLM.stream(...)
      return "continue"
    } catch (e) {
      if (canRetry(e)) {
        await sleep(delay)
        continue  // ← 重试
      }
      return "stop"
    }
  }

  if (result === "stop") break    // ← 完成对话
  continue                       // ← 继续对话
}
```

### 关键理解

1. **外层循环** 处理"业务逻辑"（对话流程）
2. **内层循环** 处理"技术细节"（错误重试）
3. **每次对话回合** 可能包含**多次重试**
4. **多轮对话** 由**多个对话回合**组成

### 类比

| 层次 | 类比 |
|-----|------|
| 外层循环 | 客户服务专员处理多个客户的咨询 |
| 内层循环 | 专员处理单个客户时可能需要多次尝试才能接通 |

这种设计使得代码结构清晰、易于维护和扩展。

---

## 相关文档

- [OpenCode 介绍](../01-quick-start/opencode-intro) - 了解 OpenCode 的基本概念
- [Session 工作流程](../01-quick-start/opencode-intro#session-工作流程) - 深入了解 Session 的执行流程
