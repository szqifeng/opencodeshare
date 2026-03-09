---
sidebar_position: 1
title: OpenClaw 插件架构生态全解
description: 深入了解 OpenClaw 插件系统架构，掌握插件类型、消息流转机制、工具调用流程，构建灵活可扩展的插件生态。
keywords: [OpenClaw插件, 插件架构, Channel插件, 工具插件, 消息流, Webhook, 插件开发]
---

# 🚀 OpenClaw 插件架构生态全解

> 全面解析 OpenClaw 插件系统的架构设计、类型体系和消息流转机制

## 📌 核心笔记

- **8 大插件类型**：Tool、Channel、Command、Service、Provider、HTTP Route、Hook、TypedHook
- **消息流转机制**：WebSocket 长连接 / Webhook → Channel.receive → 内部处理 → Channel.send
- **插件注册方式**：`api.registerTool`、`api.registerChannel`、`api.registerCommand` 等
- **核心设计理念**：插件解耦、职责单一、可复用、易扩展

## 🎯 学完你能做什么

* 理解 OpenClaw 插件系统的完整架构和调用关系
* 掌握 Channel Webhook 消息流的触发和处理机制
* 开发自定义插件（工具、通道、命令等）
* 设计符合架构规范的插件交互流程

## 😫 你现在的困境

* 不知道如何组织插件之间的关系
* 搞不清 Webhook 消息如何触发插件处理
* 不理解工具插件何时、如何被调用
* 难以设计符合规范的插件架构

## 📅 什么时候用这一招

* 开发新插件时，需要了解整体架构
* 调试插件调用链路时，需要定位问题
* 设计复杂的插件交互时，需要遵循规范
* 对接外部系统（如 Feishu）时，需要理解消息流

---

## 💡 核心思路

OpenClaw 插件系统采用**树形结构组织**，通过**注册机制**实现插件发现和调用。核心设计原则：

1. **职责分离**：每种插件类型专注特定功能
2. **消息驱动**：通过 Webhook 触发 Channel 插件处理外部消息
3. **可组合性**：工具插件可被 Channel、命令、Agent 多种方式调用
4. **扩展友好**：通过 Hook 系统实现事件拦截和行为修改

---

## 🌳 插件系统总体架构

### 系统插件树形结构

```
Plugin 系统
│
├─ 插件条目 (PluginRecord)
│
├─ 工具插件 (Tool Plugin)
│   ├─ 注册方式: api.registerTool
│   ├─ 功能: 提供可复用能力
│   ├─ 可被调用者:
│   │    ├─ Channel 插件 (receive 内)
│   │    ├─ 命令插件
│   │    └─ Agent / Runtime
│   └─ 示例: translate、sendFeishuMessage
│
├─ 通道插件 (Channel Plugin)
│   ├─ 注册方式: api.registerChannel
│   ├─ 核心接口:
│   │    ├─ receive(msg) ← 消息入口
│   │    └─ send(msg) ← 消息出口
│   ├─ 消息触发方式:
│   │    ├─ WebSocket 长连接（推荐）:
│   │    │    ├─ OpenClaw 主动连接外部系统
│   │    │    ├─ 双向实时通信
│   │    │    └─ 配置: connectionMode: "websocket"
│   │    └─ Webhook（HTTP 回调）:
│   │         ├─ 外部系统主动推送消息
│   │         ├─ 通过 HTTP Route 注册:
│   │         │    api.registerHttpRoute({
│   │         │      path: "/webhook/feishu",
│   │         │      handler: async (req, res) => {
│   │         │        const msg = req.body;
│   │         │        const channel = registry.channels.find(c => c.plugin.id === "feishu-channel");
│   │         │        if (channel) await channel.plugin.receive(msg);
│   │         │        res.sendStatus(200);
│   │         │      },
│   │         │      auth: "plugin",
│   │         │      match: "exact"
│   │         │    });
│   │         └─ 系统收到 Webhook → 调用 channel.receive(msg)
│   ├─ 内部消息处理:
│   │    ├─ 调用工具插件 (Tool Plugin)
│   │    ├─ 调用命令插件 (Command Plugin)
│   │    └─ 调用 Agent / Runtime 推理
│   └─ 消息返回:
│        └─ Channel.send(msg) → 返回外部系统 (Feishu/Slack)
│
├─ 命令插件 (Command Plugin)
│   ├─ 注册方式: api.registerCommand
│   ├─ 功能: 封装可执行命令
│   └─ 可被调用者: Channel / Agent / 其他命令
│
├─ 服务插件 (Service Plugin)
│   ├─ 注册方式: api.registerService
│   ├─ 功能: 提供后台服务 / 长周期任务
│
├─ 提供者插件 (Provider Plugin)
│   ├─ 注册方式: api.registerProvider
│   ├─ 功能: 提供外部数据 / 授权源
│
├─ HTTP Route 插件
│   ├─ 注册方式: api.registerHttpRoute
│   ├─ 功能: 接收外部 HTTP 请求 (Webhook)
│   └─ 触发 Channel.receive 或命令执行
│
└─ 钩子插件 (Hook / TypedHook)
    ├─ 注册方式: api.on 或 registerHook
    ├─ 功能: 系统事件回调（Agent 启动前、Prompt 构建等）
    └─ 可修改 Channel / Tool / Command 行为
```

---

## 🔄 Channel 消息流

### 消息触发方式

OpenClaw 支持两种消息接收方式：

1. **WebSocket 长连接**（推荐，如 Feishu）
   - 双向实时通信
   - OpenClaw 主动连接外部系统
   - 无需配置回调地址

2. **Webhook**（HTTP 回调）
   - 单向被动接收
   - 外部系统主动推送消息
   - 需要配置回调地址

### WebSocket 长连接流程（以 Feishu 为例）

```mermaid
[Feishu 用户消息]
        ↓
     Feishu WebSocket 服务器
        ↓
[OpenClaw WebSocket 客户端]  ← connectionMode: "websocket"
        ↓
[Channel 插件 receive(msg)]
        ↓
     内部逻辑处理
        ├─ 调用工具插件 (Tool)
        │     api.tools.translate.execute({ text })
        ├─ 调用命令插件 (Command)
        │     api.commands["translate.run"].run({ text })
        └─ 调用 Agent / Runtime
              api.runtime.runAgent({ prompt: msg.text })
        ↓
[Channel 插件 send(msg)] → 返回消息到 Feishu
```

### Webhook 流程（传统方式）

```mermaid
[用户消息]
        ↓
     Webhook
        ↓
[系统 HTTP Route 接口]  ← 注册 api.registerHttpRoute("/webhook/xxx")
        ↓
[Channel 插件 receive(msg)]
        ↓
     内部逻辑处理
        ├─ 调用工具插件 (Tool)
        ├─ 调用命令插件 (Command)
        └─ 调用 Agent / Runtime
        ↓
[Channel 插件 send(msg)] → 返回消息
```

### 核心要点

**Channel 插件只是消息入口和出口**

- `receive(msg)` → 外部消息进入
- `send(msg)` → 处理结果返回

**WebSocket / Webhook 是触发机制**

- WebSocket：OpenClaw 主动连接，实时双向通信
- Webhook：HTTP Route 接收外部回调

**内部处理可以调用**

- 工具插件 (Tool)
- 命令插件 (Command)
- Agent / Runtime 推理

---

## 🛠️ 插件类型详解

### 1. 工具插件 (Tool Plugin)

**功能**：提供可复用的能力，如翻译、发送消息等

**注册方式**：

```javascript
api.registerTool({
  id: 'translate',
  name: '翻译工具',
  description: '将文本翻译为目标语言',
  execute: async (input) => {
    const { text, targetLang } = input;
    // 实现翻译逻辑
    return { translatedText: '...' };
  }
});
```

**被调用场景**：

- Channel 插件的 `receive` 方法内
- 命令插件内部
- Agent / Runtime 推理过程中

**调用示例**：

```javascript
// 在 Channel 插件中调用
const result = await api.tools.translate.execute({
  text: 'Hello World',
  targetLang: 'zh-CN'
});
```

### 2. 通道插件 (Channel Plugin)

**功能**：作为消息的入口和出口，连接外部系统（Feishu、Slack 等）

**核心接口**：

- `receive(msg)`：接收外部消息
- `send(msg)`：发送消息到外部

**注册示例**：

```javascript
api.registerChannel({
  id: 'feishu-channel',
  name: '飞书通道',
  receive: async (msg) => {
    // 处理接收到的消息
    const result = await api.tools.translate.execute({
      text: msg.text,
      targetLang: 'zh-CN'
    });
    await this.send({
      text: result.translatedText,
      chatId: msg.chatId
    });
  },
  send: async (msg) => {
    // 发送消息到飞书
    await sendToFeishu(msg);
  }
});
```

### 3. 命令插件 (Command Plugin)

**功能**：封装可执行的命令逻辑

**注册示例**：

```javascript
api.registerCommand({
  id: 'translate.run',
  name: '执行翻译',
  description: '翻译指定文本',
  run: async (args) => {
    const { text, lang } = args;
    return await api.tools.translate.execute({ text, targetLang: lang });
  }
});
```

**被调用场景**：

- Channel 插件中处理用户命令
- Agent 推理过程中调用
- 其他命令插件组合调用

### 4. 服务插件 (Service Plugin)

**功能**：提供后台服务或长周期任务

**注册示例**：

```javascript
api.registerService({
  id: 'scheduler',
  name: '定时任务服务',
  start: async () => {
    setInterval(() => {
      // 定时任务逻辑
    }, 60000);
  }
});
```

### 5. 提供者插件 (Provider Plugin)

**功能**：提供外部数据源或授权机制

**注册示例**：

```javascript
api.registerProvider({
  id: 'github-auth',
  name: 'GitHub OAuth 提供者',
  authorize: async (code) => {
    // OAuth 授权逻辑
    return { accessToken: '...', userId: '...' };
  }
});
```

### 6. HTTP Route 插件

**功能**：注册 HTTP 路由，接收外部请求

**说明**：
- 用于 Webhook 模式的 Channel 消息接收
- 提供 HTTP API 接口
- WebSocket 模式下不需要此插件

**注册示例**：

```javascript
api.registerHttpRoute({
  path: '/webhook/feishu',
  handler: async (req, res) => {
    const msg = req.body;
    const channel = registry.channels.find(c => c.plugin.id === 'feishu-channel');
    if (channel) {
      await channel.plugin.receive(msg);
    }
    res.sendStatus(200);
  },
  auth: 'plugin',
  match: 'exact'
});
```

### 7. 钩子插件 (Hook Plugin)

**功能**：监听系统事件，修改插件行为

**注册示例**：

```javascript
// Agent 启动前钩子
api.on('agent:beforeStart', async (agent) => {
  console.log(`Agent ${agent.id} 即将启动`);
});

// Prompt 构建钩子
api.on('prompt:build', async (context) => {
  context.prompt += '\n\n注意：保持回答简洁';
});
```

---

## 🔗 插件调用关系

### 工具插件与 Channel 插件关系

- **工具插件**提供能力，可被 Channel 或命令调用
- **Channel 插件**负责接收外部消息 → 调用工具 → 返回结果

### 命令插件的作用

- 封装功能，可被 Channel 或 Agent 调用
- 提供更高层次的抽象，简化调用复杂度

### 服务/提供者/Hook 插件

- 后台服务、外部资源或事件触发辅助插件
- 不直接参与消息流，但为核心功能提供支持

---

## 📝 实践示例

### 示例 1：开发 Feishu Channel 插件（WebSocket 模式）

```javascript
api.registerChannel({
  id: 'feishu-channel',
  name: '飞书通道',
  connectionMode: 'websocket',
  receive: async (msg) => {
    // 调用工具插件处理消息
    if (msg.type === 'text') {
      const result = await api.tools.translate.execute({
        text: msg.content,
        targetLang: 'en'
      });
      await this.send({
        chatId: msg.chatId,
        text: result.translatedText
      });
    }
  },
  send: async (msg) => {
    // 发送消息到飞书（通过 WebSocket）
    console.log(`[Feishu Send] ${msg.chatId}: ${msg.text}`);
  }
});

// WebSocket 连接由系统自动管理
// 配置文件中设置: connectionMode: "websocket"
```

### 示例 2：开发 Slack Channel 插件（Webhook 模式）

```javascript
api.registerChannel({
  id: 'slack-channel',
  name: 'Slack 通道',
  receive: async (msg) => {
    const result = await api.tools.translate.execute({
      text: msg.text,
      targetLang: 'en'
    });
    await this.send({
      channelId: msg.channel,
      text: result.translatedText
    });
  },
  send: async (msg) => {
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SLACK_TOKEN}`
      },
      body: JSON.stringify({ channel: msg.channelId, text: msg.text })
    });
  }
});

// 注册 Webhook 接口
api.registerHttpRoute({
  path: '/webhook/slack',
  handler: async (req, res) => {
    const channel = registry.channels.find(c => c.plugin.id === 'slack-channel');
    if (channel) {
      await channel.plugin.receive(req.body);
    }
    res.sendStatus(200);
  },
  auth: 'plugin',
  match: 'exact'
});
```

### 示例 2：通过 Hook 修改 Agent 行为

```javascript
api.on('prompt:build', async (context) => {
  // 为所有 Agent 添加系统提示
  context.prompt += '\n\n系统要求：使用 Markdown 格式输出';
});

api.on('agent:beforeStart', async (agent) => {
  // 记录 Agent 启动日志
  console.log(`[Agent] ${agent.id} 启动时间: ${new Date().toISOString()}`);
});
```

---

## 🎯 实战：开发 Feishu 通道插件

### 1️⃣ 原理概览：通道插件核心

```
OpenClaw 插件系统
│
├─ 【通道插件 Channel Plugin】 ← 消息入口/出口 (核心)
│   ├─ receive(msg) ← 外部消息入口
│   └─ send(msg) ← 消息发送出口
│
├─ 工具插件 (Tool) ← 被通道调用
├─ 命令插件 (Command) ← 被通道调用
├─ Agent / Runtime ← 通道可调用推理
├─ HTTP Route 插件 ← Webhook/外部请求触发通道.receive
└─ 钩子插件 (Hook) ← 系统事件回调
```

**通道插件**是插件系统里专门处理**外部消息**的类型

**核心职责**：

- 接收消息 → `receive(msg)`
- 处理消息 → 调用工具/命令/Agent
- 返回消息 → `send(msg)`

### 2️⃣ Feishu 消息流（WebSocket 模式）

```
外部系统 (Feishu)
        ↓
WebSocket 长连接
        ↓
【通道插件】receive(msg)
        ↓
内部处理:
  ├─ 调用工具插件 (Tool)
  ├─ 调用命令插件 (Command)
  └─ 调用 Agent / Runtime
        ↓
【通道插件】send(msg)
        ↓
消息返回到外部系统 (Feishu)
```

**核心**：外部消息 → WebSocket 长连接 → 通道.receive → 工具/Agent → 通道.send → 外部

### 3️⃣ 插件目录结构

```
feishu-plugin/
├─ src/
│   ├─ index.ts      # 插件入口，注册通道
│   ├─ channel.ts    # 通道插件实现
│   └─ config.ts     # 配置 Schema
├─ package.json
├─ tsconfig.json
└─ openclaw.config.json  # OpenClaw 插件配置
```

### 4️⃣ 定义 Feishu 通道插件

**src/channel.ts**

```typescript
import type { ChannelPlugin, OpenClawPluginApi } from "openclaw-types";

export function createFeishuChannelPlugin(api: OpenClawPluginApi): ChannelPlugin {
  return {
    id: "feishu-channel",
    meta: { name: "Feishu 通道", description: "接收并发送 Feishu 消息" },
    capabilities: { messaging: true, agent: true },

    // 消息入口
    receive: async (msg: { sender: { id: string }; text: string }) => {
      let responseText = msg.text;

      // 调用工具插件
      if (api.tools.translate) {
        responseText = await api.tools.translate.execute({ text: msg.text });
      }

      // 或 Agent 推理
      // responseText = await api.runtime.runAgent({ prompt: msg.text });

      // 返回给 Feishu
      await feishuChannel.send({ userId: msg.sender.id, text: responseText });
    },

    // 消息出口
    send: async (msg: { userId: string; text: string }) => {
      console.log(`[Feishu Send] to ${msg.userId}: ${msg.text}`);
      // 调用 Feishu API 发送消息
    },
  };
}
```

### 5️⃣ 插件入口：注册通道插件

**src/index.ts**

```typescript
import type { OpenClawPluginApi } from "openclaw-types";
import { createFeishuChannelPlugin } from "./channel";

export default function defineFeishuPlugin(api: OpenClawPluginApi) {
  const feishuChannel = createFeishuChannelPlugin(api);

  // 注册通道插件
  api.registerChannel({ plugin: feishuChannel });

  // 注册工具插件 (可被通道调用)
  api.registerTool({
    name: "translate",
    async execute({ text }: { text: string }) {
      return `翻译结果: ${text} (模拟)`;
    },
  });

  // 注册 Webhook 触发通道.receive
  api.registerHttpRoute({
    path: "/webhook/feishu",
    auth: "plugin",
    match: "exact",
    handler: async (req, res) => {
      await feishuChannel.receive(req.body);
      res.sendStatus(200);
    },
  });
}
```

### 6️⃣ 插件配置

**openclaw.config.json**

```json
{
  "id": "feishu-plugin",
  "name": "Feishu Channel Plugin",
  "version": "1.0.0",
  "kind": "channel",
  "source": "./dist/index.js",
  "enabled": true,
  "configSchema": {
    "appId": { "type": "string" },
    "appSecret": { "type": "string" },
    "verificationToken": { "type": "string" }
  }
}
```

- `kind: "channel"` 表明这是一个通道插件
- `configSchema` 定义 Feishu 授权和 Webhook 配置

### 7️⃣ 发布到 npm

```bash
# 构建
npm install
npm run build

# 登录 npm 并发布
npm login
npm publish --access public

# 安装到 OpenClaw 项目
npm install @your-org/feishu-plugin
```

### 8️⃣ OpenClaw 配置使用

```json
{
  "entries": {
    "feishu-plugin": {
      "package": "@your-org/feishu-plugin",
      "enabled": true,
      "config": {
        "appId": "xxxx",
        "appSecret": "xxxx",
        "verificationToken": "xxxx"
      }
    }
  }
}
```

- 系统自动加载通道插件
- HTTP Route 收到消息 → 调用 `receive`
- 支持热加载，更新 npm 后 OpenClaw 会自动卸载旧插件、加载新版本

### 9️⃣ 测试流程（通道插件核心）

1. 启动 OpenClaw
2. 配置 Feishu Webhook 指向 `/webhook/feishu`
3. 用户发送消息 → 系统 HTTP Route 调用通道插件 `receive(msg)`
4. 通道调用工具/命令/Agent
5. 处理完成后通过通道插件 `send(msg)` 返回消息

### 🔟 核心总结

- **通道插件 Channel Plugin = 消息入口/出口**
- **Webhook → HTTP Route → receive(msg) → 工具/Agent → send(msg)**
- **工具插件/命令插件可被通道插件调用**
- **发布到 npm → 安装 → 配置 → 热加载**
- **整个插件流程围绕通道插件设计**

### 1️⃣1️⃣ 可视化流程图

```
[Feishu 用户消息]
        ↓
[Feishu Webhook]
        ↓
[HTTP Route (/webhook/feishu)]
        ↓
[通道插件 receive(msg)]
        ↓
内部处理:
  ├─ 工具插件 (translate.execute)
  ├─ 命令插件 (command.run)
  └─ Agent / Runtime (runAgent)
        ↓
[通道插件 send(msg)]
        ↓
消息返回到 Feishu
```

---

## ✅ 检查点

- [ ] 理解 8 种插件类型的功能和用途
- [ ] 掌握 Channel Webhook 消息流的完整路径
- [ ] 知道如何注册和调用工具插件
- [ ] 理解 HTTP Route 如何触发 Channel 插件
- [ ] 能够设计符合规范的插件架构

---

## ⚠️ 踩坑提醒（FAQ）

**Q: 为什么 Channel 插件的 receive 没有被调用？**

A: 检查是否正确注册了 HTTP Route，且 Webhook URL 配置正确。

**Q: 工具插件可以相互调用吗？**

A: 可以，但要注意避免循环依赖，建议通过 Agent 或 Command 协调调用。

**Q: Hook 事件什么时候触发？**

A: Hook 在系统特定事件发生时触发，如 Agent 启动前、Prompt 构建时等，详细事件列表参考 API 文档。

**Q: 如何调试插件调用链？**

A: 使用 Hook 的日志事件（如 `plugin:beforeCall`、`plugin:afterCall`）来追踪调用链。

---

## 📌 本课小结

OpenClaw 插件架构采用树形结构组织，通过注册机制实现插件发现和调用。Channel 插件作为消息的入口和出口，配合 HTTP Route 接收 Webhook 触发；工具插件提供可复用能力，可被 Channel、命令、Agent 多种方式调用；命令插件封装执行逻辑，简化调用复杂度；服务、提供者、Hook 插件为核心功能提供支持。整个系统通过消息驱动、职责分离的设计理念，实现了高度可扩展的插件生态。

---

## 🚀 下一课预告

**插件开发实战**：从零开始开发一个完整的 OpenClaw 插件，涵盖注册、测试、部署全流程。
