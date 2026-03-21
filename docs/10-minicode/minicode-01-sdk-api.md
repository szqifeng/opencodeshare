---
description: Minicode 打造系列第一篇 - 基于约定 SDK 进行接口 LLM 调用
keywords: ["minicode", "LLM", "API调用", "文本总结", "文本分类"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Minicode 打造系列 01 - 基于约定 SDK 的 LLM 接口调用

## 一句话总结
> 用不到 100 行代码实现一个支持文本总结和分类的 LLM API 服务

---

## 核心笔记

- ✅ 约定 SDK = 遵循特定协议的接口封装
- ✅ 核心依赖：`express` + `@ai-sdk/anthropic`
- ✅ 支持流式输出（SSE）和非流式两种模式
- ✅ 存储层抽象：文件存储 / MySQL 存储

---

## 学完你能做什么

- 🚀 搭建一个轻量级 LLM API 服务
- 📝 实现文本总结和分类接口
- 🌊 支持 SSE 流式响应
- 🔧 理解 SDK 与直接 HTTP 调用的区别

---

## 你现在的困境

- ❓ 每次都要处理复杂的错误和边界情况
- ❓ 流式响应不知道怎么实现
- ❓ 多轮对话状态管理混乱
- ❓ 不知道如何组织代码结构

---

## 什么时候用这一招

- 需要快速搭建 LLM API 服务
- 对接 iOS/Android 等原生应用
- 需要统一的接口协议供前端调用
- 希望代码简洁可维护

---

## 核心思路

### 系统架构

![系统架构图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-1937-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%9A%84OneMindBack%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BAClient%28iOS_Andro....png)

### 项目结构

![项目结构图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-2744-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%9A%84OneMindBack%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BAOneMindBack_%E3%80%81s....png)

### 请求处理流程

![请求处理流程图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-2912-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%9A%84OneMindBack%E8%AF%B7%E6%B1%82%E5%A4%84%E7%90%86%E6%B5%81%E7%A8%8B%E5%9B%BE%EF%BC%8C%E5%AF%B9%E6%AF%94%E5%B1%95%E7%A4%BA%E9%9D%9E%E6%B5%81%E5%BC%8F%E8%AF%B7%E6%B1%82%E5%92%8C%E6%B5%81%E5%BC%8F%E8%AF%B7%E6%B1%82%28S....png)

### SSE 事件格式

![SSE事件类型图](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/jimeng-2026-03-22-2130-%E7%99%BD%E6%9D%BF%E9%A3%8E%E6%A0%BC%E7%9A%84SSE%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B%E5%9B%BE%EF%BC%8C%E5%B1%95%E7%A4%BAtext-delta%28%E6%96%87%E6%9C%AC%E5%86%85%E5%AE%B9%E7%89%87%E6%AE%B5%EF%BC%8C%E9%80%90%E6%AD%A5%E8%BE%93%E5%87%BA%29%E3%80%81....png)

---

## 跟我做

<Tabs groupId="steps">

<TabItem value="step1">

### Step 1: 初始化项目

```bash
mkdir OneMindBack && cd OneMindBack
npm init -y
npm install express @ai-sdk/anthropic ai dotenv uuid
```

</TabItem>

<TabItem value="step2">

### Step 2: 创建目录结构

```bash
mkdir -p src/routes src/services src/middleware src/models
```

</TabItem>

<TabItem value="step3">

### Step 3: 编写入口文件

```javascript
// src/index.js
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

</TabItem>

<TabItem value="step4">

### Step 4: 编写 AI 服务

```javascript
// src/services/aiService.js
const API_KEY = process.env.MINIMAX_CN_API_KEY;
const BASE_URL = 'https://api.minimaxi.com/anthropic';
const MODEL = 'MiniMax-M2.7-highspeed';

function extractTextFromContent(content) {
  for (const item of content) {
    if (item.type === 'text' && item.text) {
      return item.text.trim();
    }
  }
  return '';
}

export async function summarizeText(text, maxLength = 200) {
  const response = await fetch(`${BASE_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      messages: [{
        role: 'user',
        content: `请将以下文本总结为不超过 ${maxLength} 个字符的简短摘要：\n\n${text}`
      }]
    })
  });

  const data = await response.json();
  return extractTextFromContent(data.content);
}
```

</TabItem>

<TabItem value="step5">

### Step 5: 编写 API 路由

```javascript
// src/routes/api.js
import express from 'express';
import { summarizeText } from '../services/aiService.js';

const router = express.Router();

router.post('/summarize', async (req, res) => {
  try {
    const { text, maxLength } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const summary = await summarizeText(text, maxLength);

    res.json({
      summary,
      originalLength: text.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

</TabItem>

</Tabs>

---

## 检查点

- [ ] 项目能正常启动
- [ ] `/api/summarize` 接口返回正确结果
- [ ] `/api/summarize/stream` 返回 SSE 流
- [ ] 错误处理正常（空 text 返回 400）

---

## 踩坑提醒（FAQ）

**Q: 流式响应前端怎么接收？**

```javascript
const eventSource = new EventSource('/api/summarize/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: '要总结的文本' })
});

eventSource.onmessage = (event) => {
  if (event.data === '[DONE]') {
    eventSource.close();
    return;
  }
  const data = JSON.parse(event.data);
  console.log(data.text);
};
```

**Q: API Key 怎么配置？**

创建 `.env` 文件：

```env
API_KEY=om_fixed_api_key_12345
MINIMAX_CN_API_KEY=your_minimax_api_key
PORT=3000
```

**Q: 模型返回格式不对怎么办？**

检查 `anthropic-version` header，必须是 `2023-06-01`。

---

## 本课小结

- **约定 SDK** - 对 HTTP 接口的协议封装，提供统一调用方式
- **ai SDK** - 封装流式处理，简化 delta 事件处理
- **SSE** - Server-Sent Events，实现服务端推送
- **分层架构** - 路由 → 服务 → 存储，职责清晰

---

## 下课预告

**Minicode 打造系列 02** - 基于 AI SDK 的工具调用与多轮调用

- 什么是工具调用（Tool Calling）
- 如何定义和注册工具
- 链式调用的实现原理
- 多轮对话的状态管理