---
description: Minicode 打造系列第二篇 - 基于 ai sdk 进行工具调用与多轮调用
keywords: ["minicode", "工具调用", "Tool Calling", "链式调用", "多轮对话"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Minicode 打造系列 02 - 基于 AI SDK 的工具调用与多轮调用

## 一句话总结
> 让 LLM 学会"使用工具"，实现链式调用和自主推理

---

## 核心笔记

- ✅ 工具调用 = LLM 生成结构化调用指令，服务器执行后返回结果
- ✅ 链式调用 = 工具结果作为下一轮输入，形成思考链
- ✅ 最多 5 轮循环，防止无限调用
- ✅ 消息累积：每次 tool-call 后追加 assistant 回复和 user 结果

---

## 学完你能做什么

- 🔧 定义自己的工具（get_weather、calculate 等）
- 🧠 实现 LLM 自主调用工具的能力
- 🔗 实现多轮链式调用（Chain-of-Thought）
- 📥 处理工具执行结果并反馈给 LLM

---

## 你现在的困境

- ❓ 想让 AI 不仅能回答，还能"做事"（查天气、计算）
- ❓ 不知道怎么让 AI 调用外部工具
- ❓ 多轮调用时消息历史怎么管理
- ❓ 工具返回结果后 AI 不继续执行

---

## 什么时候用这一招

- 需要 AI 执行实际操作（查信息、操作文件）
- 需要 AI 进行多步推理（先查天气，再推荐穿衣）
- 构建智能助手、客服机器人
- 自动化工作流

---

## 核心思路

### 工具调用流程

![工具调用多轮流程图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-7484-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%BA%BF%E6%A1%86%E5%9B%BE%EF%BC%8C%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8%E5%A4%9A%E8%BD%AE%E6%B5%81%E7%A8%8B%E5%9B%BE%EF%BC%8C%E5%8C%85%E5%90%AB3%E8%BD%AE%E5%BE%AA%E7%8E%AF%E6%AD%A5%E9%AA%A4%EF%BC%8C%E6%AF%8F%E8%BD%AE%E5%B1%95%E7%A4%BALLM%E6%80%9D%E8%80%83%E3%80%81%E5%B7%A5%E5%85%B7%E8%B0%83....png)

### 消息累积规则

![消息累积规则图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-3004-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%BA%BF%E6%A1%86%E5%9B%BE%EF%BC%8C%E6%B6%88%E6%81%AF%E7%B4%AF%E7%A7%AF%E8%A7%84%E5%88%99%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BA3%E8%BD%AE%E5%AF%B9%E8%AF%9D%E4%B8%ADmessages%E6%95%B0%E7%BB%84%E7%9A%84%E5%8F%98%E5%8C%96%E8%BF%87%E7%A8%8B%EF%BC%8C%E6%AF%8F....png)

### 退出条件判断

![退出条件判断图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-3654-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%BA%BF%E6%A1%86%E5%9B%BE%EF%BC%8C%E9%80%80%E5%87%BA%E6%9D%A1%E4%BB%B6%E5%88%A4%E6%96%AD%E6%B5%81%E7%A8%8B%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BA%E5%BE%AA%E7%8E%AF%E9%80%80%E5%87%BA%E7%9A%84%E6%9D%A1%E4%BB%B6%E5%88%A4%E6%96%AD%E9%80%BB%E8%BE%91%EF%BC%8C%E5%8C%85%E5%90%ABfinish....png)

### 工具定义结构

![工具定义结构图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-7738-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%BA%BF%E6%A1%86%E5%9B%BE%EF%BC%8C%E5%B7%A5%E5%85%B7%E5%AE%9A%E4%B9%89%E7%BB%93%E6%9E%84%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BATOOLS%E6%95%B0%E7%BB%84%E5%8C%85%E5%90%AB%E7%9A%843%E4%B8%AA%E5%B7%A5%E5%85%B7%E5%8F%8A%E5%85%B6%E5%B1%9E%E6%80%A7%EF%BC%88id%E3%80%81....png)

### 内置工具列表

![内置工具列表图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-4487-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%BA%BF%E6%A1%86%E5%9B%BE%EF%BC%8C%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%88%97%E8%A1%A8%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BA4%E4%B8%AA%E5%86%85%E7%BD%AE%E5%B7%A5%E5%85%B7%E5%8F%8A%E5%85%B6%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E%EF%BC%8C%E8%A1%A8%E6%A0%BC%E5%B8%83%E5%B1%80%EF%BC%8C%E6%B8%85%E6%99%B0%E5%88%97%E5%87%BA....png)

### 工具定义结构

每个工具包含以下属性：

| 属性 | 说明 |
|------|------|
| id | 工具唯一标识符 |
| description | 工具功能描述（LLM 会看到）|
| inputSchema | 参数 schema，定义输入格式 |
| execute | 异步执行函数，接收参数并返回结果 |

**工具示例 - get_weather**：

```javascript
{
  id: 'get_weather',
  description: '获取指定城市的天气信息',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      city: { type: 'string', description: '城市名称' }
    },
    required: ['city']
  }),
  async execute({ city }, options) {
    const weathers = ['晴', '多云', '阴', '小雨', '雷阵雨'];
    const weather = weathers[Math.floor(Math.random() * weathers.length)];
    const temp = Math.floor(Math.random() * 20) + 10;
    return { output: `${city}天气：${weather}，${temp}°C`, metadata: { city, weather, temp } };
  }
}
```

### 内置工具列表

| 工具 ID | 描述 | 必需参数 |
|---------|------|----------|
| get_current_city | 获取用户当前所在的城市 | 无 |
| get_weather | 获取指定城市的天气信息 | city |
| calculate | 执行数学计算 | expression |
| get_date | 获取当前日期和时间 | 无 |

### 消息累积规则

| 轮次 | messages 数组内容 |
|------|------------------|
| 第 1 轮 | [user] |
| 第 2 轮 | [user, assistant, user] |
| 第 3 轮 | [user, assistant, user, assistant, user] |

每轮结束后，将 assistant 回复和 user(工具结果) 追加到 messages，作为下一轮输入。

### 退出条件

以下任一条件满足时退出循环：

1. finishReason !== 'tool-calls'（LLM 不再需要调用工具）
2. toolResults.length === 0（没有工具被调用）
3. 达到最大轮次限制（5 轮）

---

## 跟我做

<Tabs groupId="steps">

<TabItem value="step1">

### Step 1: 定义工具

```javascript
// src/services/toolService.js
export const TOOLS = [
  {
    id: 'get_weather',
    description: '获取城市天气',
    inputSchema: jsonSchema({
      type: 'object',
      properties: {
        city: { type: 'string' }
      },
      required: ['city']
    }),
    async execute({ city }) {
      return { output: `${city}晴，25°C` };
    }
  }
];
```

</TabItem>

<TabItem value="step2">

### Step 2: 启用工具调用

```javascript
const result = await streamText({
  model: provider(MODEL),
  messages,
  tools: TOOLS,           // 传入工具定义
  toolCallStreaming: true  // 开启工具调用流式输出
});
```

</TabItem>

<TabItem value="step3">

### Step 3: 处理工具事件

```javascript
for await (const delta of result.fullStream) {
  switch (delta.type) {
    case 'text-delta':
      // 普通文本
      break;
    case 'tool-call':
      // 工具调用请求
      break;
    case 'tool-result':
      // 工具执行结果
      break;
    case 'finish-step':
      // 步骤完成，判断是否继续
      break;
  }
}
```

</TabItem>

<TabItem value="step4">

### Step 4: 管理多轮对话

```javascript
// 累积用户消息
messages.push({ role: 'assistant', content: assistantMessage });
messages.push({ role: 'user', content: `工具执行结果：\n${toolResultsText}` });
```

</TabItem>

</Tabs>

---

## 检查点

- [ ] 工具定义正确（id、description、inputSchema）
- [ ] 工具能被 LLM 识别并调用
- [ ] 工具结果正确返回给 LLM
- [ ] 多轮调用时消息历史正确累积
- [ ] 达到 5 轮上限或 finishReason !== 'tool-calls' 时正确退出

---

## 踩坑提醒（FAQ）

**Q: LLM 不调用工具怎么办？**

检查 system prompt 是否明确告诉 LLM"你可以调用工具"。

**Q: 工具参数格式错误？**

确保 inputSchema 定义与 execute 函数参数一致。

**Q: 无限循环调用？**

设置最大轮次限制（建议 5 轮），并检查 finishReason。

**Q: 工具返回结果后 LLM 不继续？**

在下一轮 messages 中包含完整的工具执行结果文本。

---

## 本课小结

**Minicode 02 要点总结**：

- **工具调用** - 让 LLM 从"回答者"变成"行动者"
- **链式调用** - 通过消息累积实现多轮推理
- **退出检查** - 每轮结束后检查 finishReason 决定是否继续
- **工具结构** - id + description + inputSchema + execute

---

## 下课预告

**Minicode 打造系列 03** - ReAct 模式实现

- 待补充
- 待补充
- 待补充
- 待补充