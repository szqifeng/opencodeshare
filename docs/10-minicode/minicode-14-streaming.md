---
description: MiniOpenCode 流式响应与前端对接，配合 SSE 事件流详解
keywords: ["miniopencode", "流式", "SSE", "streaming", "EventSource", "ReadableStream"]
---

# MiniOpenCode 04 - 流式响应与前端对接

> 配合 SSE 事件流详解

## 一句话总结
> Server-Sent Events 让 AI 能"打字"给你看

---

## 第一步：理解 SSE 原理

### 什么是 SSE

Server-Sent Events (SSE) 是一种服务端向客户端推送数据的技术：

```
┌─────────┐                           ┌─────────┐
│ Client  │ ────── HTTP 请求 ────────▶ │ Server  │
│         │ ◀────── SSE 流 ◀──────── │         │
│ 浏览器   │     data: {"type":...}   │  AI     │
└─────────┘     data: {"type":...}    └─────────┘
```

### SSE vs WebSocket

| 特性 | SSE | WebSocket |
|------|-----|-----------|
| 方向 | 单向（服务端→客户端）| 双向 |
| 协议 | HTTP | ws/wss |
| 自动重连 | 支持 | 需手动处理 |
| 兼容性 | 主流浏览器 | 需要 polyfill |
| 复杂度 | 简单 | 复杂 |

### 响应头

```typescript
// 服务端设置
res.writeHead(200, {
  'Content-Type': 'text/event-stream',  // 关键！
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'Access-Control-Allow-Origin': '*'
});
```

---

## 第二步：SSE 事件格式

### 标准格式

```
data: {"type":"text-delta","textDelta":"你好"}\n\n
```

每条消息以 `data: ` 开头，`\n\n` 结尾。

### 事件类型详解

| 事件 type | 说明 | 典型数据 |
|-----------|------|---------|
| `start` | 流开始 | `{"type":"start"}` |
| `text-delta` | 文本增量 | `{"type":"text-delta","textDelta":"你好"}` |
| `reasoning-start` | 推理开始 | `{"type":"reasoning-start","id":"0"}` |
| `reasoning-delta` | 推理增量 | `{"type":"reasoning-delta","id":"0","text":"因为..."}` |
| `reasoning-end` | 推理结束 | `{"type":"reasoning-end","id":"0"}` |
| `tool-call` | 工具调用 | `{"type":"tool-call","toolName":"read","args":{...}}` |
| `tool-input-start` | 工具输入开始 | `{"type":"tool-input-start","id":"call_xxx","toolName":"read"}` |
| `tool-input-delta` | 工具输入增量 | `{"type":"tool-input-delta","id":"call_xxx","delta":"{"}` |
| `tool-input-end` | 工具输入结束 | `{"type":"tool-input-end","id":"call_xxx"}` |
| `tool-result` | 工具结果 | `{"type":"tool-result","toolName":"read","output":"文件内容"}` |
| `finish-step` | 步骤结束 | `{"type":"finish-step","finishReason":"tool-calls"}` |
| `finish` | 生成结束 | `{"type":"finish","finishReason":"stop"}` |
| `[DONE]` | 流结束 | `[DONE]` |

---

## 第三步：完整 SSE 流示例

```typescript
// 服务端发送的事件序列
data: {"type":"start"}

data: {"type":"reasoning-start","id":"0"}
data: {"type":"reasoning-delta","id":"0","text":"用户想知道深圳的天气"}
data: {"type":"reasoning-delta","id":"0","text":"，需要先获取城市信息"}
data: {"type":"reasoning-end","id":"0"}

data: {"type":"text-start","id":"1"}
data: {"type":"text-delta","id":"1","textDelta":"我来帮你查询"}
data: {"type":"text-delta","id":"1","textDelta":"深圳的天气"}
data: {"type":"text-delta","id":"1","textDelta":"。"}
data: {"type":"text-end","id":"1"}

data: {"type":"tool-input-start","id":"call_abc123","toolName":"get_current_city","dynamic":false}
data: {"type":"tool-input-end","id":"call_abc123"}
data: {"type":"tool-call","toolCallId":"call_abc123","toolName":"get_current_city","input":{}}

data: {"type":"tool-result","toolCallId":"call_abc123","toolName":"get_current_city","output":{"city":"深圳"}}

data: {"type":"tool-input-start","id":"call_def456","toolName":"get_weather","dynamic":false}
data: {"type":"tool-input-delta","id":"call_def456","delta":"{"}
data: {"type":"tool-input-delta","id":"call_def456","delta":"\"city\": \"深圳\""}
data: {"type":"tool-input-delta","id":"call_def456","delta":"}"}
data: {"type":"tool-input-end","id":"call_def456"}
data: {"type":"tool-call","toolCallId":"call_def456","toolName":"get_weather","input":{"city":"深圳"}}

data: {"type":"tool-result","toolCallId":"call_def456","toolName":"get_weather","output":{"weather":"晴","temp":25}}

data: {"type":"finish-step","finishReason":"tool-calls"}

data: {"type":"text-start","id":"2"}
data: {"type":"text-delta","id":"2","textDelta":"深圳今天天气晴，气温25°C"}
data: {"type":"text-end","id":"2"}

data: {"type":"finish","finishReason":"stop","totalUsage":{"outputTokens":150}}

data: [DONE]
```

---

## 第四步：服务端实现

在 `processTaskWithStream` 中的 SSE 发送：

```typescript
// src/agent/process.ts
export async function processTaskWithStream({...}) {
  // ...
  for (let loop = 0; loop < maxLoops; loop++) {
    const result = await llmChat({...});

    // 遍历流式事件
    for await (const delta of result.fullStream) {
      // 关键：实时推送 SSE 事件
      res?.write(`data: ${JSON.stringify(delta)}\n\n`);
      // 例如：data: {"type":"text-delta","textDelta":"你好"}\n\n
    }
    
    // ...
  }

  // 发送结束标记
  res?.write('data: [DONE]\n\n');
  res?.end();
}
```

### API 路由中的处理

```typescript
// src/agent/api.ts
router.post('/api/web/chat/stream', async (req, res) => {
  const { messages, system, useTools } = req.body;

  // 设置 SSE 响应头
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // 调用 Agent（传入 res）
  await agent.runWithStream({
    messages,
    system,
    tools: useTools ? TOOLS : undefined,
    res  // 传入响应对象
  });
});
```

---

## 第五步：前端对接 - EventSource 方式

### 局限性

EventSource 只支持 GET 请求，且无法自定义 headers。

### 解决方案：轮询模式

```javascript
// 使用 fetch 配合定时读取（不推荐实时场景）
```

---

## 第六步：前端对接 - fetch + ReadableStream（推荐）

### 现代浏览器方案

```javascript
async function chatStream(messages) {
  const response = await fetch('/api/web/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'your_api_key'
    },
    body: JSON.stringify({
      messages,
      useTools: true
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    
    if (done) break;
    
    // 解码数据
    buffer += decoder.decode(value, { stream: true });
    
    // 处理完整的 SSE 消息
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';  // 保留不完整的行
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        
        if (data === '[DONE]') {
          console.log('Stream finished');
          return;
        }
        
        try {
          const event = JSON.parse(data);
          handleEvent(event);
        } catch (e) {
          console.error('Parse error:', e);
        }
      }
    }
  }
}

function handleEvent(event) {
  switch (event.type) {
    case 'text-delta':
      appendText(event.textDelta);
      break;
    case 'tool-call':
      showToolCall(event.toolName, event.args);
      break;
    case 'tool-result':
      showToolResult(event.toolName, event.output);
      break;
    case 'reasoning-delta':
      appendReasoning(event.text);
      break;
    case 'finish':
      console.log('Generation finished:', event.finishReason);
      break;
  }
}
```

### 完整示例

```html
<!DOCTYPE html>
<html>
<head>
  <title>MiniOpenCode Chat</title>
  <style>
    #chat { border: 1px solid #ccc; height: 400px; overflow-y: auto; padding: 10px; }
    .user { color: blue; }
    .assistant { color: green; }
    .tool { color: orange; background: #f5f5f5; padding: 5px; margin: 5px 0; }
    .reasoning { color: gray; font-style: italic; }
  </style>
</head>
<body>
  <div id="chat"></div>
  <input type="text" id="input" placeholder="输入消息...">
  <button onclick="send()">发送</button>

  <script>
    const chat = document.getElementById('chat');
    const input = document.getElementById('input');
    let reasoningText = '';

    function appendMessage(role, content) {
      const div = document.createElement('div');
      div.className = role;
      div.textContent = `${role}: ${content}`;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    function appendText(text) {
      let last = chat.lastElementChild;
      if (!last || !last.classList.contains('assistant')) {
        last = document.createElement('div');
        last.className = 'assistant';
        chat.appendChild(last);
      }
      last.textContent += text;
      chat.scrollTop = chat.scrollHeight;
    }

    function handleEvent(event) {
      switch (event.type) {
        case 'start':
          reasoningText = '';
          break;
        case 'reasoning-delta':
          reasoningText += event.text;
          break;
        case 'reasoning-end':
          if (reasoningText) {
            const div = document.createElement('div');
            div.className = 'reasoning';
            div.textContent = `🤔 ${reasoningText}`;
            chat.appendChild(div);
            reasoningText = '';
          }
          break;
        case 'text-delta':
          appendText(event.textDelta);
          break;
        case 'tool-call':
          const div = document.createElement('div');
          div.className = 'tool';
          div.textContent = `🔧 调用工具: ${event.toolName}(${JSON.stringify(event.args)})`;
          chat.appendChild(div);
          break;
        case 'tool-result':
          const resultDiv = document.createElement('div');
          resultDiv.className = 'tool';
          resultDiv.textContent = `📤 工具结果: ${event.output}`;
          chat.appendChild(resultDiv);
          break;
        case 'finish':
          console.log('完成:', event.finishReason);
          break;
      }
    }

    async function send() {
      const message = input.value;
      if (!message) return;
      
      appendMessage('user', message);
      input.value = '';

      const response = await fetch('/api/web/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'your_api_key'
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          useTools: true
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              chat.appendChild(document.createElement('hr'));
              return;
            }
            try {
              handleEvent(JSON.parse(data));
            } catch (e) {}
          }
        }
      }
    }
  </script>
</body>
</html>
```

---

## 检查点

- [ ] 理解 SSE 与 WebSocket 的区别
- [ ] 掌握 SSE 事件格式
- [ ] 能用 fetch + ReadableStream 接收流
- [ ] 能处理不同类型的 SSE 事件

---

## 本课小结

| 概念 | 说明 |
|------|------|
| SSE | 服务端推送技术，单向 HTTP 流 |
| text/event-stream | SSE 的 MIME 类型 |
| `data: \n\n` | SSE 消息分隔符 |
| `[DONE]` | 流结束标记 |
| ReadableStream | 浏览器流式读取 API |

---

## MiniOpenCode 系列总结

| 篇号 | 主题 | 核心文件 |
|------|------|---------|
| 01 | Agent 与 ReAct 循环 | `process.ts` |
| 02 | 工具系统 | `toolService.ts` |
| 03 | 会话与提示词 | `session.ts`, `prompts.ts` |
| 04 | 流式响应 | SSE 事件流 |
