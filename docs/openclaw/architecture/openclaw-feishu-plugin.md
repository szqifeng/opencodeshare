---
sidebar_position: 5
title: OpenClaw 飞书插件架构详解
description: 详细介绍 OpenClaw 飞书（Feishu/Lark）插件的代码架构和核心处理流程。
keywords: [OpenClaw飞书, Feishu插件, 消息通道, 飞书开发]
---

# OpenClaw 飞书插件架构详解

本文档详细介绍 OpenClaw 飞书（Feishu/Lark）插件的代码架构和核心处理流程。

---

## 概述

飞书插件是 OpenClaw 的消息通道插件之一，负责接收和发送飞书平台的消息。它支持：
- 私聊（Direct Message）
- 群聊（Group Chat）
- 消息线程
- 媒体消息
- 消息编辑和回复
- 表情反应

---

## 目录结构

```
extensions/feishu/
├── index.ts                    # 插件入口
└── src/
    ├── channel.ts              # ChannelPlugin 定义
    ├── monitor.ts              # 消息监听入口
    ├── monitor.account.ts      # 账户消息处理
    ├── monitor.transport.ts    # WebSocket/Webhook 传输层
    ├── bot.ts                  # 消息处理核心
    ├── outbound.ts             # 消息发送
    ├── send.ts                 # 发送 API
    ├── media.ts                # 媒体上传
    ├── reactions.ts            # 表情反应
    ├── mention.ts              # @提及处理
    ├── accounts.ts             # 账户解析
    ├── directory.ts            # 用户/群组目录
    └── types.ts                # 类型定义
```

---

## 核心概念

### ChannelPlugin

`ChannelPlugin` 是 OpenClaw 定义的消息通道接口，每个通道（飞书、Telegram、Discord 等）都需要实现这套接口：

```typescript
type ChannelPlugin = {
  id: string;                   // "feishu"
  meta: ChannelMeta;             // 元信息
  capabilities: ChannelCapabilities;  // 能力声明
  config: ChannelConfigAdapter;  // 配置读写
  configSchema?: ChannelConfigSchema;  // 配置 schema
  messaging?: ChannelMessagingAdapter;  // 消息目标解析
  outbound?: ChannelOutboundAdapter;   // 消息发送
  status?: ChannelStatusAdapter; // 状态检查
  gateway?: ChannelGatewayAdapter;     // 启动入口
  pairing?: ChannelPairingAdapter;     // 配对流程
  groups?: ChannelGroupAdapter; // 群组策略
};
```

### 插件注册

飞书插件通过 `api.registerChannel()` 注册到 OpenClaw：

```typescript
// extensions/feishu/index.ts
const plugin = {
  id: "feishu",
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: feishuPlugin });
    // 注册各种工具
    registerFeishuChatTools(api);
    registerFeishuDocTools(api);
  },
};
```

---

## 消息接收流程

### 整体链路

```
飞书服务器
└── WebSocket/Webhook
    │
    ▼
monitor.ts
└── 启动监听
    │
    ▼
monitor.account
└── 注册事件处理器
    │
    ▼
handleFeishuMsg (bot.ts:861)
└── 转发给 Agent 处理并回复
```

### 详细步骤

#### 步骤 1: 启动监听

`monitor.ts` 中的 `monitorFeishuProvider()` 负责启动：

```typescript
// monitor.ts:31
export async function monitorFeishuProvider(opts) {
  // 获取所有启用的账户
  const accounts = listEnabledFeishuAccounts(cfg);
  
  // 为每个账户启动监控
  for (const account of accounts) {
    await monitorSingleAccount({ cfg, account, ... });
  }
}
```

#### 步骤 2: 创建传输连接

`monitor.account.ts` 调用 `monitor.transport.ts` 创建 WebSocket 或 Webhook 连接：

```typescript
// monitor.transport.ts
// 支持两种连接模式：
// - WebSocket: 实时推送
// - Webhook: HTTP 回调
```

#### 步骤 3: 注册事件处理器

```typescript
// monitor.account.ts:230
function registerEventHandlers(eventDispatcher, context) {
  // 注册消息事件处理
  eventDispatcher.on("im.message", (event) => {
    dispatchFeishuMessage(event);
  });
  
  // 注册卡片动作事件
  eventDispatcher.on("im.card.action", handleFeishuCardAction);
}
```

#### 步骤 4: 处理消息

`handleFeishuMessage()` (bot.ts:861) 是核心处理函数，主要逻辑：

1. **去重检查**：防止重复处理同一条消息
2. **解析消息**：提取发送者、内容、群组等信息
3. **权限检查**：检查 DM 策略、群组白名单等
4. **转发 Agent**：将消息发送给 AI Agent 处理
5. **处理回复**：将 Agent 的回复发送给用户

```typescript
// bot.ts:861
export async function handleFeishuMessage(params) {
  // 1. 去重
  if (!tryRecordMessage(memoryDedupeKey)) return;
  if (!await tryRecordMessagePersistent(messageId, accountId)) return;
  
  // 2. 解析消息
  const ctx = parseFeishuMessageEvent(event, botOpenId, botName);
  
  // 3. 检查群组/权限
  if (isGroup && groupConfig?.enabled === false) return;
  
  // 4. 转发给 Agent
  // ... 调用 Agent 处理
  
  // 5. 发送回复
  await sendMessageFeishu({ ... });
}
```

---

## 消息发送流程

### 链路

```
Agent         outbound.ts           send.ts           飞书 API
生成回复  ───▶  feishuOutbound  ───▶  sendMessageFeishu  ───▶  (im/message)
```

### 核心函数

```typescript
// send.ts
export async function sendMessageFeishu(params: {
  cfg: ClawdbotConfig;
  accountId?: string;
  to: string;
  text?: string;
  card?: object;
  messageId?: string;  // 用于回复
}) {
  const client = createFeishuClient(account);
  
  // 构建消息内容
  const content = buildMessageContent(text, card);
  
  // 调用飞书 API
  await client.im.message.create({
    params: { receive_id_type: "open_id" },
    data: {
      receive_id: to,
      msg_type: msgType,
      content: JSON.stringify(content),
    },
  });
}
```

---

## 配置结构

飞书插件的配置定义在 `channel.ts` 的 `configSchema` 中：

```typescript
// channel.ts:95
configSchema: {
  schema: {
    type: "object",
    properties: {
      enabled: { type: "boolean" },
      appId: { type: "string" },
      appSecret: secretInputJsonSchema,
      domain: { type: "string", enum: ["feishu", "lark"] },
      connectionMode: { type: "string", enum: ["websocket", "webhook"] },
      dmPolicy: { type: "string", enum: ["open", "pairing", "allowlist"] },
      groupPolicy: { type: "string", enum: ["open", "allowlist", "disabled"] },
      textChunkLimit: { type: "integer" },
    },
  },
}
```

---

## 核心模块说明

| 文件 | 职责 |
|------|------|
| `channel.ts` | 定义 ChannelPlugin，配置 schema |
| `monitor.ts` | 启动/停止消息监听 |
| `monitor.account.ts` | 账户级别的事件处理和消息分发 |
| `monitor.transport.ts` | WebSocket/WebHook 连接管理 |
| `bot.ts` | 消息处理核心逻辑 |
| `outbound.ts` | 发送消息的入口（供 Agent 调用） |
| `send.ts` | 底层发送 API |
| `media.ts` | 图片/文件上传 |
| `reactions.ts` | 表情反应操作 |
| `mention.ts` | @提及解析和构建 |
| `directory.ts` | 用户/群组列表查询 |
| `accounts.ts` | 账户配置解析 |

---

## 关键类型

### FeishuMessageEvent

```typescript
type FeishuMessageEvent = {
  sender: {
    sender_id: { open_id?: string; user_id?: string };
    sender_type: "user" | "app";
  };
  message: {
    message_id: string;
    chat_id: string;
    chat_type: "p2p" | "group";
    message_type: string;
    content: string;
  };
};
```

### ResolvedFeishuAccount

```typescript
type ResolvedFeishuAccount = {
  accountId: string;
  enabled: boolean;
  configured: boolean;
  name: string;
  appId: string;
  domain: "feishu" | "lark";
  config: FeishuAccountConfig;
};
```
