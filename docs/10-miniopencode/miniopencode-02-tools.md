---
description: MiniOpenCode 工具系统详解，配合 toolService.ts 代码讲解
keywords: ["miniopencode", "工具", "Tool", "toolService", "文件系统"]
---

# MiniOpenCode 02 - 工具系统详解

> 配合 `src/services/toolService.ts` 代码讲解

## 一句话总结
> 工具是 Agent 感知和改变世界的双手

---

## 核心代码：toolService.ts 完整解析

```typescript
// src/services/toolService.ts
/**
 * 工具服务 - 提供内置工具
 */

import { jsonSchema } from 'ai';
import type { ToolSet } from 'ai';
import fs from 'node:fs/promises';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

interface ToolResult {
  output: string;
  title: string;
  metadata: Record<string, unknown>;
}
```

---

## 第一步：理解工具定义结构

每个工具包含 4 个核心属性：

```typescript
{
  id: 'tool_name',           // 1. 唯一标识符
  description: '工具描述',    // 2. 功能描述（LLM 会看到）
  inputSchema: jsonSchema({  // 3. 参数 schema
    type: 'object',
    properties: {
      paramName: { type: 'string', description: '参数描述' }
    },
    required: ['paramName']
  }),
  async execute(args, options) {  // 4. 执行函数
    // 工具逻辑
    return { 
      output: '结果',        // 用户可见输出
      title: '标题',         // 结果标题
      metadata: {}           // 附加信息
    };
  }
}
```

### 工具结构图解

```
┌─────────────────────────────────────┐
│           Tool 对象                  │
├─────────────────────────────────────┤
│ id: 'read'                         │  ← 唯一标识
│ description: '读取文件内容'         │  ← LLM 看到的描述
│ inputSchema: {                     │  ← 参数定义
│   type: 'object',                  │
│   properties: { path: {...} },      │
│   required: ['path']               │
│ }                                  │
│ execute: async (args) => { ... }   │  ← 执行逻辑
└─────────────────────────────────────┘
```

---

## 第二步：read 工具实现

```typescript
const readTool = {
  id: 'read',
  description: '读取文件内容',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      path: { type: 'string', description: '文件路径' }
    },
    required: ['path']
  }),
  async execute({ path }: { path: string }): Promise<ToolResult> {
    try {
      // 使用 fs.promises 读取文件
      const content = await fs.readFile(path, 'utf-8');
      
      // 返回成功结果
      return { 
        output: content,                                    // 文件内容
        title: `文件: ${path}`,                            // 标题
        metadata: { path }                                 // 元数据
      };
    } catch (error) {
      // 返回错误结果
      return { 
        output: `读取失败: ${(error as Error).message}`, 
        title: '错误', 
        metadata: { error: (error as Error).message } 
      };
    }
  }
};
```

### 执行流程

```
LLM: "我需要读取 /tmp/test.txt"
    │
    ▼
tool-call: { toolName: 'read', args: { path: '/tmp/test.txt' } }
    │
    ▼
execute({ path: '/tmp/test.txt' })
    │
    ├── fs.readFile('/tmp/test.txt', 'utf-8')
    │
    ▼
return { output: '文件内容...', title: '文件: /tmp/test.txt', metadata: {...} }
    │
    ▼
tool-result: { toolName: 'read', output: {...} }
```

---

## 第三步：write 工具实现

```typescript
const writeTool = {
  id: 'write',
  description: '写入内容到文件',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      path: { type: 'string', description: '文件路径' },
      content: { type: 'string', description: '文件内容' }
    },
    required: ['path', 'content']  // 两个都是必需参数
  }),
  async execute({ path, content }: { path: string; content: string }): Promise<ToolResult> {
    try {
      // 写入文件
      await fs.writeFile(path, content, 'utf-8');
      
      return { 
        output: `已写入文件: ${path}`, 
        title: '写入成功', 
        metadata: { 
          path, 
          bytes: Buffer.byteLength(content, 'utf-8')  // 写入字节数
        } 
      };
    } catch (error) {
      return { 
        output: `写入失败: ${(error as Error).message}`, 
        title: '错误', 
        metadata: { error: (error as Error).message } 
      };
    }
  }
};
```

### 关键点

| 细节 | 说明 |
|------|------|
| `Buffer.byteLength(content, 'utf-8')` | 计算 UTF-8 编码后的字节数 |
| `required: ['path', 'content']` | 两个参数都是必需的 |
| 错误处理 | try-catch 捕获所有异常 |

---

## 第四步：edit 工具实现（高级）

```typescript
const editTool = {
  id: 'edit',
  description: '编辑文件，通过替换字符串',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      path: { type: 'string', description: '文件路径' },
      oldString: { type: 'string', description: '要替换的字符串' },
      newString: { type: 'string', description: '新字符串' }
    },
    required: ['path', 'oldString', 'newString']
  }),
  async execute({ path, oldString, newString }: { 
    path: string; 
    oldString: string; 
    newString: string 
  }): Promise<ToolResult> {
    try {
      // 1. 读取原文件
      const content = await fs.readFile(path, 'utf-8');
      
      // 2. 检查 oldString 是否存在
      if (!content.includes(oldString)) {
        return { 
          output: '未找到要替换的字符串', 
          title: '错误', 
          metadata: { error: 'oldString not found in file' } 
        };
      }
      
      // 3. 执行替换
      const newContent = content.replace(oldString, newString);
      
      // 4. 写回文件
      await fs.writeFile(path, newContent, 'utf-8');
      
      return { 
        output: `已编辑文件: ${path}`, 
        title: '编辑成功', 
        metadata: { path } 
      };
    } catch (error) {
      return { 
        output: `编辑失败: ${(error as Error).message}`, 
        title: '错误', 
        metadata: { error: (error as Error).message } 
      };
    }
  }
};
```

### edit 工具的独特性

```typescript
// 替换逻辑使用 String.replace()
// 注意：这只会替换第一个匹配项
const newContent = content.replace(oldString, newString);

// 如果需要替换所有匹配项，使用：
const newContent = content.split(oldString).join(newString);

// 或者使用正则表达式（需转义特殊字符）
const newContent = content.replace(new RegExp(escapeRegExp(oldString), 'g'), newString);
```

---

## 第五步：grep 工具实现（复杂）

```typescript
// 递归搜索文件
async function searchFiles(
  dir: string, 
  pattern: RegExp, 
  include?: string, 
  results: string[] = [], 
  depth = 0
): Promise<string[]> {
  // 防止无限递归，限制深度为 10
  if (depth > 10) return results;
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        // 递归处理子目录（排除 . 开头的隐藏目录和 node_modules）
        await searchFiles(fullPath, pattern, include, results, depth + 1);
      } else if (entry.isFile()) {
        // 检查文件类型过滤
        if (include && !entry.name.match(new RegExp(include.replace(/\*/g, '.*')))) {
          continue;
        }
        
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          const lines = content.split('\n');
          
          // 逐行匹配，收集结果
          lines.forEach((line, index) => {
            if (pattern.test(line)) {
              results.push(`${fullPath}:${index + 1}: ${line}`);
            }
          });
        } catch {}  // 忽略无法读取的文件
      }
    }
  } catch {}  // 忽略无法访问的目录
  
  return results;
}

const grepTool = {
  id: 'grep',
  description: '在文件中搜索内容',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      pattern: { type: 'string', description: '搜索模式(正则表达式)' },
      path: { type: 'string', description: '搜索目录路径' },
      include: { type: 'string', description: '文件类型过滤，如 *.ts' }
    },
    required: ['pattern']
  }),
  async execute({ pattern, path: searchPath, include }: { 
    pattern: string; 
    path?: string; 
    include?: string 
  }): Promise<ToolResult> {
    try {
      // 编译正则表达式
      const regex = new RegExp(pattern, 'g');
      
      // 默认搜索当前目录
      const cwd = searchPath || process.cwd();
      
      // 执行搜索
      const results = await searchFiles(cwd, regex, include);
      
      if (results.length === 0) {
        return { output: '未找到匹配结果', title: '搜索结果', metadata: { pattern, path: cwd } };
      }
      
      return { 
        output: results.join('\n'), 
        title: `找到 ${results.length} 个匹配`, 
        metadata: { pattern, path: cwd, count: results.length } 
      };
    } catch (error) {
      return { 
        output: `搜索失败: ${(error as Error).message}`, 
        title: '错误', 
        metadata: { error: (error as Error).message } 
      };
    }
  }
};
```

### grep 搜索结果格式

```
/path/to/file.ts:10: const foo = 'bar';
/path/to/file.ts:25: console.log(foo);
/path/to/another.ts:5: const foo = require('./bar');
```

格式：`文件路径:行号: 匹配内容`

---

## 第六步：bash 工具实现

```typescript
const execAsync = promisify(exec);  // 将 callback 风格转为 Promise

const bashTool = {
  id: 'bash',
  description: '执行 bash 命令',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      command: { type: 'string', description: 'bash 命令' },
      cwd: { type: 'string', description: '工作目录' }
    },
    required: ['command']
  }),
  async execute({ command, cwd }: { command: string; cwd?: string }): Promise<ToolResult> {
    try {
      // 执行命令
      const { stdout, stderr } = await execAsync(command, { cwd });
      
      // stdout 和 stderr 至少有一个有值
      const output = stderr || stdout;
      
      return { 
        output: output || '(无输出)', 
        title: '命令执行结果', 
        metadata: { command, cwd, stdout, stderr } 
      };
    } catch (error) {
      return { 
        output: `命令执行失败: ${(error as Error).message}`, 
        title: '错误', 
        metadata: { error: (error as Error).message } 
      };
    }
  }
};
```

### execAsync 详解

```typescript
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

// promisify 将 callback 风格转为 Promise
const execAsync = promisify(exec);

// 使用方式
const { stdout, stderr } = await execAsync('ls -la', { cwd: '/tmp' });
```

---

## 第七步：工具注册与执行

```typescript
// 导出所有内置工具
export const TOOLS: ToolSet = {
  read: readTool,
  write: writeTool,
  edit: editTool,
  grep: grepTool,
  bash: bashTool
} as ToolSet;

// 动态执行工具
export async function executeTool(
  name: string, 
  args: Record<string, unknown>
): Promise<ToolResult | { error: string }> {
  const tool = TOOLS[name];
  
  if (!tool) {
    return { error: `Unknown tool: ${name}` };
  }
  
  // 调用工具的 execute 方法
  return (tool as { execute: (args: Record<string, unknown>) => Promise<ToolResult> }).execute(args);
}
```

### 执行流程

```
Agent 决定调用工具
      │
      ▼
executeTool('read', { path: '/tmp/test.txt' })
      │
      ├── TOOLS['read'] 找到对应工具
      │
      ├── read.execute({ path: '/tmp/test.txt' })
      │
      ├── 返回 ToolResult
      │
      ▼
返回 { output, title, metadata }
```

---

## 工具全景图

```
┌─────────────────────────────────────────────────────────────┐
│                     TOOLS 工具集                             │
├───────────┬───────────┬───────────┬───────────┬────────────┤
│   read   │   write   │   edit    │   grep    │    bash    │
├───────────┼───────────┼───────────┼───────────┼────────────┤
│ 读取文件  │ 写入文件  │ 替换字符串 │ 搜索内容   │ 执行命令   │
│           │           │           │           │            │
│ fs.read   │ fs.write │ replace   │ search    │ execAsync  │
│   File    │   File   │   字符串  │   Files   │   Command  │
└───────────┴───────────┴───────────┴───────────┴────────────┘
```

---

## 检查点

- [ ] 能画出一个工具的 4 个组成部分
- [ ] 理解 read/write/edit/grep/bash 各自用途
- [ ] 掌握 execute 返回值的三要素
- [ ] 能添加一个自定义工具

---

## 本课小结

| 工具 | 功能 | 核心 API |
|------|------|----------|
| read | 读取文件 | `fs.readFile` |
| write | 写入文件 | `fs.writeFile` |
| edit | 替换字符串 | `String.replace` |
| grep | 递归搜索 | `fs.readdir` + 正则 |
| bash | 执行命令 | `execAsync` |

---

## 下课预告

**MiniOpenCode 03** - 会话与提示词管理

- 配合 `session.ts` + `prompts.ts` 讲解
- 会话存储与消息管理
- 提示词模板系统
