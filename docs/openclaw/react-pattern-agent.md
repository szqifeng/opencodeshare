---
sidebar_position: 2
title: ReAct 模式：Agent 通用思维链模式全解
description: 深入理解 ReAct (Reasoning + Acting) 模式，掌握 Agent 多步推理与动态工具调用的核心架构，构建可解释、可扩展的智能体系统。
keywords: [ReAct模式, Agent思维链, 多步推理, 工具调用, Prompt工程, Agent架构]
---

# 🧠 ReAct 模式：Agent 通用思维链模式全解

> 全面解析 ReAct 模式的核心原理、循环机制与最佳实践

## 📌 核心笔记

- **ReAct = Reasoning + Acting**：推理 + 行动的循环模式
- **四大核心模块**：Thought（推理）、Action（行动）、Observation（观察）、Answer（答案）
- **多轮循环机制**：动态调用工具，逐步推理，直到满足终止条件
- **核心优势**：多步推理、动态工具调用、可解释性、可组合性

## 🎯 学完你能做什么

* 理解 ReAct 模式的核心思想和循环机制
* 设计符合 ReAct 模式的 Agent 架构
* 构造高效的 ReAct Prompt，引导模型多步推理
* 优化工具调用和 Observation 结构化输出
* 实现可解释、可扩展的智能体系统

## 😫 你现在的困境

* 不知道如何让 Agent 进行多步推理
* 工具调用后不知道如何将结果反馈给模型
* 缺乏系统的 Agent 思维链设计框架
* 难以追踪和调试 Agent 的决策过程
* 无法平衡推理深度与响应速度

## 📅 什么时候用这一招

* 处理需要多步推理的复杂问题
* 需要动态调用外部工具或 API
* 要求 Agent 决策过程可解释、可追踪
* 构建需要组合多种能力的智能体
* 优化 Agent 的任务分解和执行能力

---

## 💡 核心思路

ReAct 模式是一种**多轮循环推理 + 动作执行**的 Agent 架构模式。核心思想是：先思考，再行动，多轮循环直到完成任务。

模型通过生成**Thought（思考）**来分析当前状态，决定下一步**Action（行动）**，执行后获取**Observation（观察）**，将结果反馈回模型继续推理。如此循环，直到生成最终**Answer（答案）**。

这种模式将**推理逻辑**与**工具调用**解耦，使得 Agent 既能够进行复杂的多步推理，又能够动态调用外部能力，同时每一步都可以被记录和追踪，具有极强的可解释性。

---

## 🌳 顶层概览：ReAct 模式核心

### 基本流程

```
用户问题
    ↓
ReAct 模型循环
    ├─ Thought → 推理分析
    ├─ Action → 调用外部工具/API
    ├─ Observation → 获取工具返回
    └─ 多轮循环，直至生成最终 Answer
    ↓
最终答案返回用户
```

### 核心概念

**ReAct = Reasoning + Acting**

- **Reasoning（推理）**：模型在内部生成思考，分析当前状态和下一步行动
- **Acting（行动）**：基于推理结果，执行工具调用或其他操作
- **多轮循环**：动态调整策略，逐步推进任务完成
- **终止条件**：生成 Answer 或达到最大步骤数

---

## 🧩 核心模块详解

### 四大核心模块

| 模块 | 功能 | 输出/作用 |
|------|------|-----------|
| **Thought** | 模型分析输入、推理步骤 | 决定下一步 Action 或生成 Answer |
| **Action** | 调用工具/API 执行操作 | 生成 Observation |
| **Observation** | 外部操作结果 | 为下一轮 Thought 提供上下文信息 |
| **Answer** | 循环结束后的最终输出 | 返回用户或系统 |

### 循环机制

```
Step 1:
  Thought: 我需要查询天气
  Action: 调用 weather_tool("Beijing")
  Observation: {"temperature": "20°C", "condition": "sunny"}

Step 2:
  Thought: 已获取天气信息，准备回答
  Action: 输出最终答案
  Answer: 北京今天晴天，气温 20°C
```

**每轮循环内部**：

1. **Thought** → 模型生成思考
2. **Action** → 执行工具或操作
3. **Observation** → 获取外部结果
4. 下一轮 **Thought** 使用 Observation 继续推理

可嵌套多步操作，动态决策，支持复杂任务的分解与执行。

---

## 🔄 多轮循环机制（底层原理）

### 循环执行流程

```mermaid
Step 1:
  Thought: 我需要查询天气
  Action: call_tool("weather", {"city": "Beijing"})
  Observation: {"temperature": "20°C", "condition": "sunny"}

Step 2:
  Thought: 已获取天气信息，准备回答
  Action: 输出最终答案
  Answer: 北京今天晴天，气温 20°C
```

### 关键特性

**1. 动态决策**

每轮循环根据上一轮的 Observation 动态调整策略，而不是预设固定步骤。

**2. 上下文累积**

所有历史 Thought、Action、Observation 都会被保留，为推理提供完整上下文。

**3. 工具链组合**

可以连续调用多个工具，前一个工具的 Observation 成为后一个工具的输入。

**4. 终止条件**

- 生成 Answer 字段，表示任务完成
- 达到最大循环步骤数，防止无限循环
- 检测到错误或异常情况

---

## 📝 Prompt 构造示例

### 基础 Prompt 结构

```text
Question: 北京今天的天气如何？

Thought: 我需要先获取天气信息
Action: call_tool("weather", {"city": "Beijing"})
Observation: {"temperature": "20°C", "condition": "sunny"}

Thought: 我已经获得天气信息
Answer: 北京今天晴天，气温 20°C
```

### 完整 Prompt 模板

```text
你是一个智能助手，能够通过思考和调用工具来回答问题。

对于每个问题，你需要：
1. Thought: 分析问题，决定下一步行动
2. Action: 调用工具或执行操作
3. Observation: 获取工具返回的结果
4. 重复上述步骤，直到能够给出最终答案
5. Answer: 输出最终答案

可用工具：
- weather(city): 查询城市天气
- search(query): 搜索信息
- calculate(expression): 计算表达式

现在开始：

Question: 北京今天的天气如何？

Thought: 我需要先获取天气信息
Action: call_tool("weather", {"city": "Beijing"})
Observation: {"temperature": "20°C", "condition": "sunny"}

Thought: 我已经获得天气信息
Answer: 北京今天晴天，气温 20°C
```

### 高级 Prompt 技巧

**1. Few-Shot 示例**

提供多个完整示例，帮助模型理解模式：

```text
示例 1:
Question: 125 + 37 等于多少？
Thought: 我需要计算这个加法表达式
Action: call_tool("calculate", {"expression": "125 + 37"})
Observation: {"result": 162}
Thought: 计算完成
Answer: 125 + 37 = 162

示例 2:
Question: 纽约现在几点？
Thought: 我需要查询纽约当前时间
Action: call_tool("search", {"query": "current time New York"})
Observation: {"time": "14:30 UTC-5"}
Thought: 获取到时间信息
Answer: 纽约现在时间是 14:30（UTC-5 时区）
```

**2. 思维链引导**

使用 Chain-of-Thought 引导模型逐步推理：

```text
Thought: 这个问题需要我分解为几个步骤：
1. 首先需要获取相关的背景信息
2. 然后分析这些信息
3. 最后给出答案

让我先搜索相关信息...
Action: call_tool("search", {"query": "..."})
```

**3. 结构化 Observation**

强制工具返回结构化数据，便于模型解析：

```json
{
  "success": true,
  "data": {
    "temperature": 20,
    "unit": "°C",
    "condition": "sunny"
  },
  "error": null
}
```

---

## 💪 ReAct 优势

### 1. 多步推理

可处理复杂问题，逐步分析分解：

```
问题: 分析某公司的投资价值
  ├─ 获取公司财务数据
  ├─ 分析行业趋势
  ├─ 对比竞争对手
  └─ 综合评估得出结论
```

### 2. 动态工具调用

每轮根据上下文选择不同操作，灵活适应任务需求：

```javascript
if (需要实时数据) {
  Action: call_tool("api_search", {...})
} else if (需要计算) {
  Action: call_tool("calculator", {...})
}
```

### 3. 可解释性

每步 Thought/Action 可记录，便于追踪决策过程：

```javascript
{
  step: 1,
  thought: "需要查询天气",
  action: "call_tool('weather', {...})",
  observation: {...}
}
```

### 4. 可组合性

工具与推理逻辑分离，易于扩展：

- 新增工具无需修改推理逻辑
- 可组合多个工具形成复杂流程
- 支持工具库的动态加载

---

## 🛠️ 实践建议

### 1. Thought 设计

**每个 Thought 都要明确下一步目的**

```text
❌ 不好的示例：
Thought: 我看看

✅ 好的示例：
Thought: 用户问的是天气，我需要先查询北京的天气信息
```

### 2. Action 规范

**Action 要精确调用外部操作，保证 Observation 可解析**

```javascript
// 明确指定工具名称和参数
Action: call_tool("weather", {
  "city": "Beijing",
  "date": "2024-01-01"
})
```

### 3. 终止条件

**设置合理循环终止条件，防止无限循环**

```javascript
const MAX_STEPS = 10;

if (step >= MAX_STEPS) {
  Answer: "抱歉，无法在合理步骤内完成该任务";
}
```

### 4. Observation 结构化

**Observation 要尽量结构化，方便下一轮推理使用**

```json
{
  "status": "success",
  "data": {
    "temperature": 20,
    "condition": "sunny"
  },
  "metadata": {
    "timestamp": "2024-01-01T12:00:00Z",
    "source": "weather_api"
  }
}
```

---

## 📌 核心总结（金字塔式归纳）

```
ReAct 模式核心 = 多轮循环推理 + 动作执行
├─ Thought: 推理步骤，分析当前状态
├─ Action: 调用工具/API，执行操作
├─ Observation: 获取结果，提供上下文
└─ Answer: 循环终止，输出最终答案
```

**核心思想**：先思考，再行动，多轮循环直到完成任务

**可扩展特性**：
- 多工具组合
- 多任务协调
- 多步推理
- 动态决策

---

## ✅ 检查点

- [ ] 理解 ReAct 模式的四大核心模块
- [ ] 掌握多轮循环机制的执行流程
- [ ] 能够构造有效的 ReAct Prompt
- [ ] 理解 Observation 结构化的重要性
- [ ] 知道如何设计终止条件和防止无限循环
- [ ] 能够应用 ReAct 模式解决实际问题

---

## ⚠️ 踩坑提醒（FAQ）

**Q: 如何防止 Agent 无限循环？**

A: 设置最大循环步骤数（如 10-20 步），同时检测重复的 Action 或停滞的 Thought，必要时强制终止。

**Q: Observation 应该返回什么格式？**

A: 推荐使用 JSON 格式，包含 `status`、`data`、`error` 等字段，便于模型解析和错误处理。

**Q: 如何处理工具调用失败？**

A: 在 Observation 中包含错误信息，让模型能够根据错误调整策略，或提供备用方案。

**Q: ReAct 模式适合所有场景吗？**

A: 不一定。对于简单、单步任务，直接回答更高效；ReAct 适合需要多步推理和工具调用的复杂任务。

**Q: 如何优化 ReAct 的推理速度？**

A: 限制最大步数、优化 Prompt 减少 Token 消耗、并行执行独立的工具调用、缓存常用结果。

---

## 📌 本课小结

ReAct 模式是一种将推理（Reasoning）与行动（Acting）结合的 Agent 架构模式，通过 Thought → Action → Observation 的多轮循环，实现动态工具调用和多步推理。四大核心模块各司其职：Thought 负责推理分析，Action 执行工具调用，Observation 提供结果反馈，Answer 输出最终答案。这种模式具有多步推理、动态工具调用、可解释性、可组合性等优势，适用于复杂任务的分解与执行。掌握 ReAct 模式，能够构建出既智能又可解释的 Agent 系统。

---

## 🚀 下一课预告

**ReAct 实战：构建多工具 Agent**：从零开始实现一个支持搜索、计算、查询等能力的 ReAct Agent，涵盖工具库设计、Prompt 优化、错误处理等全流程实践。
