---
description: MiniOpenCode 会话与提示词管理，配合 session.ts 和 prompts.ts 代码讲解
keywords: ["miniopencode", "会话", "Session", "提示词", "Prompt", "session.ts"]
---

# MiniOpenCode 03 - 会话与提示词管理

> 配合 `src/agent/session.ts` 和 `src/agent/prompts.ts` 代码讲解

## 一句话总结
> 会话让 AI 记住上下文，提示词决定 AI 的灵魂

---

## Part A: 会话管理 - session.ts

### 核心代码：session.ts 完整解析

```typescript
// src/agent/session.ts
/**
 * Session 模块 - 会话上下文管理
 * 
 * 职责：管理多轮对话的会话上下文
 */

import { Message, Part, MessageRole, LLMMessage, Session, ToolCallPart } from './types.js';
import { getStorage } from '../services/storageFactory.js';

// 延迟初始化的存储实例
let sessionStorage: {
  save: (session: Session) => Promise<Session>;
  get: (id: string) => Promise<Session | null>;
  delete: (id: string) => Promise<boolean>;
} | null = null;

// 工厂函数延迟初始化存储
async function getSessionStorage() {
  if (sessionStorage) return sessionStorage;

  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DATA_DIR = path.join(__dirname, '../../data/sessions');

  // 确保目录存在
  async function ensureDir() {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  }

  sessionStorage = {
    async save(session: Session) {
      await ensureDir();
      const filePath = path.join(DATA_DIR, `${session.id}.json`);
      await fs.writeFile(filePath, JSON.stringify(session), 'utf-8');
      return session;
    },

    async get(id: string) {
      const filePath = path.join(DATA_DIR, `${id}.json`);
      try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Session;
      } catch {
        return null;  // 文件不存在返回 null
      }
    },

    async delete(id: string) {
      const filePath = path.join(DATA_DIR, `${id}.json`);
      try {
        await fs.unlink(filePath);
        return true;
      } catch {
        return false;
      }
    }
  };

  return sessionStorage;
}
```

---

## 第一步：理解 Session 数据结构

```typescript
// Session - 会话容器
interface Session {
  id: string;              // 会话唯一 ID
  messages: Message[];     // 消息列表
  createdAt: number;       // 创建时间戳
  updatedAt: number;       // 更新时间戳
}

// Message - 消息单元
interface Message {
  role: 'user' | 'assistant' | 'system';  // 消息角色
  id: string;                               // 消息唯一 ID
  parts: Part[];                            // 消息内容（支持多类型）
  createdAt: number;                        // 创建时间戳
}

// Part - 消息内容类型
type Part = 
  | TextPart        // 文本
  | ToolCallPart    // 工具调用
  | ToolResultPart  // 工具结果
  | ReasoningPart   // 推理过程
  | ...;
```

### 存储结构

```
data/sessions/
├── session_abc123.json    # 每个会话一个 JSON 文件
├── session_def456.json
└── ...
```

---

## 第二步：创建和获取会话

```typescript
function generateMsgId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

// 创建新消息
export function createMessage(role: MessageRole, parts: Part[] = []): Message {
  return {
    role,
    id: generateMsgId(),
    parts,
    createdAt: Date.now()
  };
}

// 获取会话（不存在则创建）
export async function getSession(sessionId: string): Promise<Session> {
  const storage = await getSessionStorage();
  let session = await storage.get(sessionId);

  if (!session) {
    // 不存在则创建新会话
    session = {
      id: sessionId,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await storage.save(session);
  }

  return session;
}
```

### 创建会话流程

```
getSession('session_abc')
      │
      ├── storage.get('session_abc')
      │        │
      │        ├── 文件存在 → 返回 Session
      │        └── 文件不存在 → 返回 null
      │
      ▼ (session === null)
创建新 Session
      │
      ├── id: 'session_abc'
      ├── messages: []
      ├── createdAt: Date.now()
      └── updatedAt: Date.now()
      │
      ▼
storage.save(session)
      │
      ▼
写入 data/sessions/session_abc.json
```

---

## 第三步：消息与 LLM 格式转换

这是会话管理的核心功能，需要双向转换：

```typescript
// Message → LLM 格式（用于发送给 LLM）
export function messageToLLMFormat(message: Message): LLMMessage {
  const parts = message.parts || [];
  
  // 检查是否有工具调用
  const hasToolCalls = parts.some(p => p.type === 'tool-call');

  if (hasToolCalls) {
    // 有工具调用时，需要提取 tool_calls
    return {
      role: message.role,
      content: parts
        .filter(p => p.type === 'text')
        .map(p => (p as { type: 'text'; content: string }).content)
        .join(''),
      tool_calls: parts
        .filter(p => p.type === 'tool-call')
        .map((p) => {
          const toolPart = p as ToolCallPart;
          return {
            id: `call_${Date.now()}`,  // 生成调用 ID
            type: 'function' as const,
            function: {
              name: toolPart.tool,
              arguments: JSON.stringify(toolPart.args)
            }
          };
        })
    };
  }

  // 普通消息只保留文本
  return {
    role: message.role,
    content: parts
      .filter(p => p.type === 'text')
      .map(p => (p as { type: 'text'; content: string }).content)
      .join('')
  };
}

// 批量转换
export function messagesToLLMFormat(messages: Message[]): LLMMessage[] {
  return messages.map(messageToLLMFormat);
}
```

### 转换示例

```typescript
// Message 格式
const message: Message = {
  role: 'assistant',
  id: 'msg_123',
  parts: [
    { type: 'text', id: '1', content: '我来帮你查询' },
    { type: 'tool-call', tool: 'get_weather', args: { city: '杭州' } }
  ],
  createdAt: Date.now()
};

// 转换为 LLM 格式
const llmMessage = messageToLLMFormat(message);
// 结果：
// {
//   role: 'assistant',
//   content: '我来帮你查询',
//   tool_calls: [{
//     id: 'call_123456',
//     type: 'function',
//     function: {
//       name: 'get_weather',
//       arguments: '{"city":"杭州"}'
//     }
//   }]
// }
```

---

## 第四步：添口消息与会话清除

```typescript
// 添加消息到会话
export async function addMessage(
  sessionId: string, 
  message: Message, 
  session?: Session
): Promise<Session> {
  const storage = await getSessionStorage();
  
  // 如果没有传入 session，先获取
  const s = session || await getSession(sessionId);

  // 追加消息
  s.messages.push(message);
  
  // 更新时间戳
  s.updatedAt = Date.now();

  // 持久化保存
  await storage.save(s);
  
  return s;
}

// 清除会话
export async function clearSession(sessionId: string): Promise<boolean> {
  const storage = await getSessionStorage();
  return await storage.delete(sessionId);
}
```

---

## Part B: 提示词管理 - prompts.ts

### 核心代码：prompts.ts 完整解析

```typescript
// src/agent/prompts.ts
/**
 * Prompts 模块 - 系统提示词管理
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 提示词接口
export interface Prompt {
  name: string;       // 提示词名称（文件名）
  description: string; // 描述（从内容提取）
  content: string;    // 完整内容
}

// 缓存
let promptsCache: Prompt[] | null = null;

// 从第一行提取描述
function extractDescription(content: string): string {
  const lines = content.split('\n');
  if (lines[0]?.startsWith('# ')) {
    return lines[0].replace('# ', '').trim();
  }
  return '';
}
```

---

## 第五步：提示词加载

```typescript
// 加载所有提示词
export async function loadPrompts(): Promise<Prompt[]> {
  // 命中缓存直接返回
  if (promptsCache) return promptsCache;

  const promptsDir = path.join(__dirname, '../../prompts');
  
  try {
    // 读取目录
    const files = await fs.readdir(promptsDir);
    
    // 只处理 .md 文件
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    // 并行加载所有提示词
    promptsCache = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(promptsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const name = file.replace('.md', '');
        
        return {
          name,
          description: extractDescription(content),
          content: content.trim()
        };
      })
    );
    
    return promptsCache;
  } catch (error) {
    console.error('Failed to load prompts:', error);
    return [];
  }
}
```

### 提示词目录结构

```
prompts/
├── default.md      # 默认提示词
├── code.md         # 代码助手
├── writer.md       # 写作助手
└── ...
```

### 提示词文件格式

```markdown
# 代码助手

你是一个专业的程序员，擅长：
- 编写高质量代码
- 代码审查和优化
- 调试和修复 bug

## 回复风格
- 直接给出解决方案
- 解释关键原理
```

---

## 第六步：获取提示词

```typescript
// 按名称获取单个提示词
export async function getPrompt(name: string): Promise<string | null> {
  const prompts = await loadPrompts();
  const prompt = prompts.find(p => p.name === name);
  return prompt?.content || null;
}

// 获取默认提示词
export async function getDefaultPrompt(): Promise<string> {
  const defaultContent = await getPrompt('default');
  
  // 兜底：如果没有 default.md
  return defaultContent || '你是 MiniOpenCode，一个专业的 AI 助手。';
}

// 列出所有可用提示词
export async function listPrompts(): Promise<Prompt[]> {
  return loadPrompts();
}
```

### Agent 中使用

```typescript
// src/agent/index.ts
async run({ messages, system, maxLoops = 5 }: AgentRunParams) {
  // 如果没有传入 system，使用默认提示词
  const systemPrompt = system || await getDefaultPrompt();
  
  return processTask({
    messages,
    system: systemPrompt,  // 传入系统提示词
    tools,
    maxLoops
  });
}
```

---

## 会话与提示词协作

```
                    ┌─────────────────────────────────────┐
                    │           Agent.run()               │
                    └─────────────────────────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                 ▼
          ┌─────────────────┐              ┌─────────────────┐
          │   getPrompt()   │              │  getSession()   │
          │   获取系统提示词  │              │   获取会话历史    │
          └─────────────────┘              └─────────────────┘
                    │                                 │
                    ▼                                 ▼
          ┌─────────────────┐              ┌─────────────────┐
          │ systemPrompt   │              │ currentMessages │
          │ "你是专业助手..." │              │ [user, assistant]│
          └─────────────────┘              └─────────────────┘
                    │                                 │
                    └─────────────┬───────────────────┘
                                  ▼
                    ┌─────────────────────────────────┐
                    │     processTask({               │
                    │       messages: currentMessages,  │
                    │       system: systemPrompt,      │
                    │       tools, maxLoops            │
                    │     })                           │
                    └─────────────────────────────────┘
```

---

## 检查点

- [ ] 能解释 Session 的 4 个字段
- [ ] 理解 Message 到 LLM 格式的转换逻辑
- [ ] 掌握提示词文件的加载流程
- [ ] 能添加新的提示词模板

---

## 本课小结

| 模块 | 核心功能 | 关键代码 |
|------|---------|---------|
| session.ts | 会话持久化 | `storage.save/get/delete` |
| session.ts | 消息转换 | `messageToLLMFormat` |
| prompts.ts | 提示词加载 | `loadPrompts` |
| prompts.ts | 获取提示词 | `getPrompt/getDefaultPrompt` |

---

## 下课预告

**MiniOpenCode 04** - 流式响应与前端对接

- SSE 事件格式
- 前端 EventSource
- fetch + ReadableStream
