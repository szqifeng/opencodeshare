---
description: MiniOpenCode 核心原理 - Agent 与 ReAct 循环，配合 process.ts 代码讲解
keywords: ["miniopencode", "Agent", "ReAct", "工具调用", "process.ts"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MiniOpenCode 01 - Agent 核心与 ReAct 循环

> 配合 `src/agent/process.ts` 代码讲解

## 一句话总结
> Agent 通过 ReAct 循环实现"思考-行动-观察"的不断迭代

---

## 核心代码：process.ts 完整解析

```typescript
// src/agent/process.ts
/**
 * Process 模块 - React Loop 执行器
 * 
 * 职责：执行多轮 ReAct 循环
 */

import { llmChat } from './llm.js';
import type { LLMRes } from './llm.js';
import { LLMMessage, Message, Part } from './types.js';

interface ProcessTaskParams {
  messages: LLMMessage[];
  system?: string;
  tools?: Parameters<typeof llmChat>[0]['tools'];
  maxLoops?: number;
}

interface ProcessTaskWithStreamParams extends ProcessTaskParams {
  res?: LLMRes;
  sessionId?: string;
  addMessage?: (message: Message) => Promise<void>;
}
```

---

## 第一步：理解 ReAct 循环

ReAct = **Reasoning** + **Acting**，让 LLM 显式推理后再行动：

```
用户输入
    │
    ▼
┌─────────────────────────────────────────┐
│  第 1 轮 Reasoning: 分析问题            │
│  第 1 轮 Acting: 调用工具              │
│  第 1 轮 Observation: 获取结果          │
└──────────────────┬──────────────────────┘
                   │ finishReason === 'tool-calls' ?
                   │
    ┌──────────────┴──────────────┐
    │ yes                         │ no
    ▼                             ▼
┌─────────────┐             ┌─────────────┐
│  第 2 轮   │             │   退出循环   │
│  ...       │             │   返回结果   │
└─────────────┘             └─────────────┘
```

---

## 第二步：非流式版本 processTask

```typescript
// 简化版 processTask 逻辑
export async function processTask({ messages, system, tools, maxLoops = 5 }: ProcessTaskParams) {
  // 1. 复制消息副本，避免修改原始数据
  const currentMessages: LLMMessage[] = [...messages];
  let fullText = '';

  // 2. ReAct 循环：最多 maxLoops 轮
  for (let loop = 0; loop < maxLoops; loop++) {
    
    // 3. 调用 LLM（关键步骤）
    const result = await llmChat({
      messages: currentMessages,
      system,
      tools,
      toolCallStreaming: false  // 非流式
    }) as { fullStream: AsyncIterable<Record<string, unknown>>, finishReason?: string };

    // 4. 收集本轮结果
    let hasToolCalls = false;
    const toolResults: Array<{ tool: string; result: unknown }> = [];
    let assistantMessage = '';

    // 5. 遍历流式事件
    for await (const delta of result.fullStream) {
      const d = delta as Record<string, unknown>;
      
      if (d.type === 'text-delta') {
        // 收集文本回复
        assistantMessage += (d.textDelta as string) || (d.text as string) || '';
      } else if (d.type === 'tool-call') {
        // 标记有工具调用
        hasToolCalls = true;
      } else if (d.type === 'tool-result') {
        // 收集工具结果
        const toolName = d.toolName as string;
        toolResults.push({ tool: toolName, result: d.output ?? null });
      }
    }

    // 6. 累积完整回复
    fullText += assistantMessage;

    // 7. 退出条件检查（核心！）
    if (!hasToolCalls || toolResults.length === 0) {
      break;  // 没有工具调用，退出循环
    }

    // 8. 消息累积：追加 assistant 回复和工具结果
    const toolResultsText = toolResults.map(r => `${r.tool}: ${JSON.stringify(r.result)}`).join('\n');
    currentMessages.push({ role: 'assistant', content: assistantMessage });
    currentMessages.push({ role: 'user', content: `工具执行结果：\n${toolResultsText}` });
  }

  return { text: fullText };
}
```

### 关键点解读

| 代码段 | 作用 |
|--------|------|
| `currentMessages: LLMMessage[] = [...messages]` | 复制副本，避免修改原始数据 |
| `for (let loop = 0; loop < maxLoops; loop++)` | 限制循环次数，防止无限循环 |
| `hasToolCalls` | 标记本轮是否有工具调用 |
| `toolResults` | 收集所有工具执行结果 |
| `break` 条件 | 无工具调用或无结果时退出 |

---

## 第三步：流式版本 processTaskWithStream

```typescript
export async function processTaskWithStream({
  messages,
  system,
  tools,
  maxLoops = 5,
  res,
  sessionId,
  addMessage
}: ProcessTaskWithStreamParams) {
  const currentMessages: LLMMessage[] = [...messages];
  let finalText = '';
  const assistantMessages: Message[] = [];

  for (let loop = 0; loop < maxLoops; loop++) {
    // 调用 LLM，启用工具调用流式输出
    const result = await llmChat({
      messages: currentMessages,
      system,
      tools,
      toolCallStreaming: true  // 关键区别！
    }) as { fullStream: AsyncIterable<Record<string, unknown>>, finishReason?: string };

    let hasToolCalls = false;
    const toolCalls: Array<{ tool: string; args: Record<string, unknown> }> = [];
    let assistantMessage = '';
    let finishReason: string | undefined;
    const assistantParts: Part[] = [];
    const deltas: Record<string, unknown>[] = [];

    // 分类收集文本和推理内容
    const textContent: Record<string, string> = {};
    const reasoningContent: Record<string, string> = {};
    const toolResults: Array<{ tool: string; result: unknown }> = [];

    // 遍历流式事件
    for await (const delta of result.fullStream) {
      deltas.push(delta);
      
      // 关键：实时推送 SSE 事件给客户端
      res?.write(`data: ${JSON.stringify(delta)}\n\n`);

      const d = delta as Record<string, unknown>;

      if (d.type === 'text-delta') {
        const id = d.id as string;
        const text = (d.textDelta as string) || (d.text as string) || '';
        textContent[id] = (textContent[id] || '') + text;
        assistantMessage += text;
      } else if (d.type === 'tool-call') {
        hasToolCalls = true;
        toolCalls.push({
          tool: d.toolName as string,
          args: d.args as Record<string, unknown> || {}
        });
      } else if (d.type === 'tool-result') {
        toolResults.push({
          tool: d.toolName as string,
          result: d.output ?? null
        });
      } else if (d.type === 'reasoning-delta') {
        const id = d.id as string;
        reasoningContent[id] = (reasoningContent[id] || '') + ((d.text as string) || '');
      } else if (d.type === 'finish-step') {
        finishReason = d.finishReason as string;
      }
    }

    // 处理完整事件流，构建 assistantParts
    for (const d of deltas) {
      if (d.type === 'tool-call') {
        assistantParts.push({
          type: 'tool-call',
          tool: d.toolName as string,
          args: d.args as Record<string, unknown> || {}
        });
      } else if (d.type === 'tool-input-delta') {
        assistantParts.push({
          type: 'tool-input-delta',
          id: d.id as string,
          delta: d.delta as string || ''
        });
      } else if (d.type === 'tool-result') {
        assistantParts.push({
          type: 'tool-result',
          tool: d.toolName as string,
          result: d.output ?? null
        });
      } else if (d.type === 'finish-step') {
        assistantParts.push({
          type: 'finish-step',
          finishReason: d.finishReason as string
        });
      } else if (d.type === 'reasoning-end') {
        const id = d.id as string;
        assistantParts.push({ type: 'reasoning', id, content: reasoningContent[id] || '' });
      }
      // ... 其他事件类型处理
    }

    finalText = assistantMessage;

    // 保存 assistant 消息
    assistantMessages.push({
      role: 'assistant',
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      parts: assistantParts,
      createdAt: Date.now()
    });

    // 退出条件：finishReason !== 'tool-calls'
    if (!hasToolCalls || toolResults.length === 0 || finishReason !== 'tool-calls') {
      break;
    }

    // 消息累积，继续下一轮
    const toolResultsText = toolResults.map(r => `${r.tool}: ${JSON.stringify(r.result)}`).join('\n');
    currentMessages.push({ role: 'assistant', content: assistantMessage });
    currentMessages.push({ role: 'user', content: `工具执行结果：\n${toolResultsText}` });
  }

  // 发送结束标记
  res?.write('data: [DONE]\n\n');
  res?.end();

  // 保存消息到会话
  if (addMessage && sessionId) {
    for (const msg of assistantMessages) {
      await addMessage(msg);
    }
  }

  return { text: finalText };
}
```

---

## 第四步：消息累积详解

消息累积是 ReAct 循环的核心，每轮结束后：

```typescript
// 初始 messages = [user]
let currentMessages = [{ role: 'user', content: '查一下杭州天气' }];

// 第 1 轮结束后
// assistantMessage = "我来帮你查询杭州天气，先获取城市信息"
// toolResults = [{ tool: 'get_current_city', result: { city: '杭州' } }]
currentMessages.push({ role: 'assistant', content: assistantMessage });
currentMessages.push({ role: 'user', content: '工具执行结果：\nget_current_city: {"city":"杭州"}' });

// 第 2 轮结束后
// assistantMessage = "好的，现在查询杭州的天气"
// toolResults = [{ tool: 'get_weather', result: { weather: '晴', temp: 25 } }]
currentMessages.push({ role: 'assistant', content: assistantMessage });
currentMessages.push({ role: 'user', content: '工具执行结果：\nget_weather: {"weather":"晴","temp":25}' });

// 第 3 轮：assistant 直接返回最终结果，不再调用工具
// finishReason = 'stop'，退出循环
```

| 轮次 | currentMessages 长度 | 说明 |
|------|---------------------|------|
| 第 1 轮 | 1 | 初始 user |
| 第 2 轮 | 3 | + assistant + user(tool result) |
| 第 3 轮 | 5 | + assistant + user(tool result) |
| 退出 | 7 | assistant 返回结果，不再需要 tool-calls |

---

## 第五步：退出条件逻辑

```typescript
// 三重条件，任一满足即退出
if (!hasToolCalls ||           // 条件1：没有工具调用
    toolResults.length === 0 || // 条件2：工具没有返回结果
    finishReason !== 'tool-calls') { // 条件3：不需要继续调用工具
  break;
}
```

| finishReason | 含义 | 是否继续 |
|--------------|------|---------|
| `stop` | 正常停止，生成完成 | ❌ 退出 |
| `tool-calls` | 需要工具调用 | ✅ 继续 |
| `length` | 达到 maxTokens | ❌ 退出 |
| `content-filter` | 内容被过滤 | ❌ 退出 |

---

## 跟我做

<Tabs groupId="steps">

<TabItem value="step1">

### Step 1: 追踪循环次数

在 `processTaskWithStream` 中添加日志：

```typescript
for (let loop = 0; loop < maxLoops; loop++) {
  console.log(`[Loop ${loop}] Starting...`);
  // ...
  console.log(`[Loop ${loop}] hasToolCalls=${hasToolCalls}, finishReason=${finishReason}`);
}
```

</TabItem>

<TabItem value="step2">

### Step 2: 观察消息累积

打印 `currentMessages` 长度变化：

```typescript
console.log(`[Loop ${loop}] messages count: ${currentMessages.length}`);
```

</TabItem>

<TabItem value="step3">

### Step 3: 测试不同场景

```bash
# 场景1：简单问答（无工具调用）
curl -X POST http://localhost:3000/api/web/chat/stream \
  -H "Content-Type: application/json" \
  -H "X-API-Key: xxx" \
  -d '{"messages": [{"role": "user", "content": "你好"}], "useTools": false}'

# 场景2：需要工具调用
curl -X POST http://localhost:3000/api/web/chat/stream \
  -H "Content-Type: application/json" \
  -H "X-API-Key: xxx" \
  -d '{"messages": [{"role": "user", "content": "查一下杭州天气"}], "useTools": true}'
```

</TabItem>

</Tabs>

---

## 检查点

- [ ] 能用代码注释解释 ReAct 循环原理
- [ ] 理解消息累积的三要素：user → assistant → user(tool result)
- [ ] 掌握三种退出条件的区别
- [ ] 能追踪调试循环过程

---

## 本课小结

| 概念 | 代码位置 | 作用 |
|------|----------|------|
| ReAct 循环 | `for (let loop = 0; loop < maxLoops; loop++)` | 控制迭代次数 |
| 消息累积 | `currentMessages.push()` | 维护对话上下文 |
| 退出检查 | `if (!hasToolCalls \|\| ...)` | 防止无限循环 |
| 流式输出 | `res?.write()` | 实时推送事件 |

---

## 下课预告

**MiniOpenCode 02** - 工具系统详解

- 配合 `toolService.ts` 讲解
- 工具定义结构
- 内置工具实现
- 自定义工具
