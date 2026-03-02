---
description: OpenCode 工具配置教程，介绍内置工具、自定义工具、工具链管理等功能。帮助您充分利用 OpenCode 的工具生态，提升工作效率。
keywords: ["OpenCode 工具配置", "OpenCode 工具", "自定义工具", "工具链"]
---

# 工具配置

OpenCode 提供了丰富的内置工具，并支持用户自定义工具以满足特定需求。本文将详细介绍如何配置和管理 OpenCode 的工具系统，包括内置工具的使用、自定义工具的开发、工具链的搭建以及工具的最佳实践。

通过合理配置工具，您可以大幅扩展 OpenCode 的能力边界，让 AI 助手更好地服务于您的具体工作场景。

## 工具系统概览 🛠️

### 什么是工具 🤔

在 OpenCode 中，**工具**是指 AI 可以调用的外部功能或服务。

**白话解释：**

就像一个"超级助手"：
- 🤖 他很聪明，但双手被束缚了
- 🛠️ 给他一些工具（锤子、扳手、螺丝刀）
- 🔧 他就能自己使用这些工具完成任务

**工具的特点：**

```
✅ 扩展能力：让 AI 能做更多事情
✅ 提高效率：自动化重复性任务
✅ 增强准确性：使用专业工具提高质量
✅ 灵活组合：多个工具协同工作
```

### 工具类型 📋

| 类型 | 说明 | 示例 | 复杂度 |
|------|------|------|--------|
| 🔨 系统工具 | 操作系统功能 | 文件操作、命令执行 | ⭐ |
| 🌐 网络工具 | HTTP 请求、API 调用 | 搜索、抓取 | ⭐⭐ |
| 💾 存储工具 | 数据库、文件系统 | SQLite、JSON | ⭐⭐ |
| 📊 数据处理 | 数据转换、分析 | 格式化、统计 | ⭐⭐⭐ |
| 🎨 创意工具 | 图像、视频处理 | 裁剪、滤镜 | ⭐⭐⭐⭐ |

---

## 内置工具 🧰

OpenCode 内置了多个常用工具，开箱即用。

### 1. 文件操作工具 📁

#### 读取文件

```bash
# 命令行调用
opencode tool file.read --path ./data.json

# 在对话中使用
用户：帮我读取 data.json 文件

OpenCode：[调用工具 file.read]
[读取结果]
{
  "name": "张三",
  "age": 28,
  "job": "工程师"
}

文件内容如上，您想查看哪个字段？
```

**配置示例：**

```yaml
tools:
  file:
    enabled: true
    allowed_paths:
      - "./data"
      - "./config"
      - "~/.opencode"
    max_file_size: "10MB"
```

---

#### 写入文件

```bash
# 命令行调用
opencode tool file.write --path ./output.txt --content "Hello World"

# 在对话中使用
用户：把这段代码保存到 output.txt

OpenCode：[调用工具 file.write]
✅ 文件已成功保存到 ./output.txt

文件内容：
```python
def hello():
    print("Hello, World!")
```
```

#### 白话解释

就像让助手帮你整理文件：
- 📂 你告诉助手"把发票归档到 2024 文件夹"
- 📁 助手使用"文件操作工具"
- 📋 助手自动读取、分类、移动文件
- ✅ 整理完成，你只需检查结果

---

### 2. 网络请求工具 🌐

#### HTTP GET 请求

```bash
# 命令行调用
opencode tool http.get --url `https://api.example.com/data`

# 在对话中使用
用户：帮我调用这个 API 获取数据
`https://api.weather.com/city/beijing`

OpenCode：[调用工具 http.get]
[API 响应]
{
  "city": "北京",
  "temperature": 25,
  "weather": "晴天"
}

今天北京天气是晴天，气温 25°C
```

#### HTTP POST 请求

```bash
# 命令行调用
opencode tool http.post --url `https://api.example.com/create` --data '{"name":"测试"}'

# 在对话中使用
用户：帮我创建一个新任务
项目：OpenCode 开发
优先级：高

OpenCode：[调用工具 http.post]
[发送请求]
POST `https://api.example.com/tasks`
{
  "project": "OpenCode 开发",
  "priority": "high"
}

✅ 任务创建成功！任务 ID: 12345
```

#### 白话解释

就像让助手帮你打电话：
- 📞 你告诉助手"给王经理打电话确认开会时间"
- 📱 助手使用"网络工具"（相当于电话）
- 🗣️ 助手拨通号码，传递你的信息
- 📝 助手记录结果：周三下午 2 点开会

---

### 3. 代码执行工具 💻

#### Python 代码执行

```bash
# 命令行调用
opencode tool python.execute --code "print('Hello')"

# 在对话中使用
用户：帮我运行这段代码计算斐波那契数列

OpenCode：[调用工具 python.execute]
[代码执行]
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

[执行结果]
55

斐波那契数列第 10 项是 55
```

#### JavaScript 代码执行

```bash
# 命令行调用
opencode tool js.execute --code "console.log('Hello')"

# 在对话中使用
用户：帮我用 JavaScript 解析这个 JSON

OpenCode：[调用工具 js.execute]
[代码执行]
```javascript
const data = '{"name":"张三","age":28}';
const obj = JSON.parse(data);
console.log(obj.name);
```

[执行结果]
张三

解析结果：姓名是张三，年龄是 28
```

---

### 4. 搜索工具 🔍

#### Web 搜索

```bash
# 命令行调用
opencode tool web.search --query "OpenCode AI 编程"

# 在对话中使用
用户：帮我搜索 OpenCode 的最新版本

OpenCode：[调用工具 web.search]
[搜索结果]
标题：OpenCode v1.2.0 发布
链接：`https://opencodeshare.cn/release`
摘要：OpenCode v1.2.0 版本发布，新增代理系统...

找到最新版本 v1.2.0，主要更新包括代理系统和性能优化。需要我详细介绍更新内容吗？
```

#### 本地搜索

```bash
# 命令行调用
opencode tool search.local --path ./docs --query "配置"

# 在对话中使用
用户：在文档中搜索"网络配置"相关内容

OpenCode：[调用工具 search.local]
[搜索结果]
文件：network-config.md
匹配行数：15

匹配内容：
• 代理配置
• API Key 配置
• 连接测试

找到 15 处匹配，主要涉及代理、API Key 和连接测试
```

---

## 自定义工具 🔧

### 工具加载机制 🔄

OpenCode 会在启动时自动加载所有符合规范的工具定义：

**自动加载规则：**

```
✅ 项目本地：.opencode/tools/
✅ 全局目录：~/.config/opencode/tools/
✅ 符合规范的文件：.ts/.js/.py 等
✅ 导出默认 export：export default tool({...})
✅ 多个导出：export const tool1 = tool({...})
```

**加载流程：**

```
项目启动
   ↓
扫描工具目录
   ├─ .opencode/tools/ （项目本地）
   └─ ~/.config/opencode/tools/ （全局）
   ↓
解析工具文件
   ├─ TypeScript/JavaScript 工具定义
   ├─ Python 脚本工具
   └─ 其他语言脚本
   ↓
验证工具规范
   ├─ 检查必需字段（description, args）
   ├─ 验证参数类型
   └─ 测试工具函数
   ↓
注册到上下文
   ├─ 添加到工具列表
   ├─ 映射到 LLM
   └─ 生成工具调用能力
   ↓
✅ 工具可用
```

**类型规范：**

```typescript
import { tool } from "@opencode-ai/plugin"

// 单工具文件
export default tool({
  description: "工具描述",
  args: {
    // 参数定义
  },
  async execute(args, context) {
    // 执行逻辑
    return result
  }
})

// 多工具文件
export const tool1 = tool({...})
export const tool2 = tool({...})
export const tool3 = tool({...})
```

---

### 完整工具定义规范 📋

OpenCode 使用严格的工具定义接口，确保类型安全和一致性。

#### Tool.Info 接口

每个工具必须实现 `Tool.Info` 接口：

```typescript
interface Tool.Info<Parameters extends z.ZodType, Metadata> {
  id: string
  init: (ctx?: InitContext) => Promise<{
    description: string
    parameters: Parameters
    execute(
      args: z.infer<Parameters>,
      ctx: Tool.Context<Metadata>
    ): Promise<Tool.Result<Metadata>>
    formatValidationError?(error: z.ZodError): string
  }>
}
```

**字段说明：**

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | `string` | ✅ | 工具唯一标识符 |
| `description` | `string` | ✅ | 工具功能描述（给 LLM 看的） |
| `parameters` | `z.ZodType` | ✅ | 使用 Zod 定义的参数类型 |
| `execute` | `function` | ✅ | 工具执行函数 |
| `formatValidationError` | `function` | ❌ | 自定义验证错误格式化 |

---

#### Execute 函数签名

执行函数是工具的核心，负责实际执行逻辑：

```typescript
async execute(
  args: z.infer<Parameters>,
  ctx: Tool.Context<Metadata>
): Promise<{
  title: string
  metadata: Metadata
  output: string
  attachments?: MessageV2.FilePart[]
}>
```

**返回值说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 执行结果的标题 |
| `metadata` | `Metadata` | 执行元数据 |
| `output` | `string` | 工具输出（给 LLM 看的） |
| `attachments` | `FilePart[]` | 可选的文件附件 |

**完整示例：**

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

// 定义元数据类型
interface DatabaseToolMetadata {
  rowCount: number
  executionTime: number
}

export default tool({
  id: "database_query",
  
  description: "查询项目数据库，支持 SQL 语句执行",
  
  // 参数定义（使用 Zod）
  parameters: z.object({
    query: z.string().describe("SQL 查询语句"),
    limit: z.number().min(1).max(1000).default(100).describe("返回结果数量限制"),
  }),
  
  // 执行函数
  async execute(
    args: { query: string; limit: number },
    ctx: Tool.Context<DatabaseToolMetadata>
  ): Promise<Tool.Result<DatabaseToolMetadata>> {
    const startTime = Date.now()
    
    try {
      // 执行查询
      const result = await executeSQL(args.query, args.limit)
      
      const executionTime = Date.now() - startTime
      
      // 返回结果
      return {
        title: "数据库查询",
        output: JSON.stringify(result, null, 2),
        metadata: {
          rowCount: result.length,
          executionTime,
          success: true
        },
        attachments: []
      }
    } catch (error) {
      return {
        title: "数据库查询失败",
        output: `查询失败: ${error.message}`,
        metadata: {
          rowCount: 0,
          executionTime: Date.now() - startTime,
          success: false,
          error: error.message
        }
      }
    }
  },
  
  // 自定义验证错误格式化
  formatValidationError(error: z.ZodError): string {
    return `参数验证失败: ${error.errors.map(e => e.message).join(", ")}`
  }
})
```

---

#### Context 接口

执行函数接收上下文对象，提供会话信息：

```typescript
interface Tool.Context<Metadata> {
  sessionID: string
  messageID: string
  agent: string
  abort: AbortSignal
  callID?: string
  extra?: { [key: string]: any }
  messages: MessageV2.WithParts[]
  
  // 设置工具执行元数据
  metadata(input: { title?: string; metadata?: Metadata }): void
  
  // 请求权限
  ask(input: Omit<PermissionNext.Request, "id" | "sessionID" | "tool">): Promise<void>
}
```

**Context 使用示例：**

```typescript
async execute(args, ctx) {
  // 获取会话信息
  console.log(`Session: ${ctx.sessionID}`)
  console.log(`Agent: ${ctx.agent}`)
  
  // 检查是否被中止
  if (ctx.abort.aborted) {
    throw new Error("Tool execution was aborted")
  }
  
  // 设置元数据
  ctx.metadata({
    title: "正在处理...",
    metadata: { startTime: Date.now() }
  })
  
  // 请求权限
  await ctx.ask({
    permission: "database_access",
    message: "需要访问数据库执行查询"
  })
  
  // 获取历史消息
  const lastMessages = ctx.messages.slice(-5)
  
  // 执行逻辑
  return { ... }
}
```

---

#### 工具定义模式

**模式 1：简单工具**

```typescript
import { tool } from "@opencode-ai/plugin"

export default tool({
  id: "hello",
  description: "返回问候语",
  parameters: z.object({}),
  async execute() {
    return {
      title: "问候",
      output: "你好！",
      metadata: {}
    }
  }
})
```

**模式 2：带参数的工具**

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

export default tool({
  id: "calculate",
  description: "执行数学计算",
  parameters: z.object({
    expression: z.string().describe("数学表达式，如：2 + 3 * 4"),
  }),
  async execute(args) {
    const result = eval(args.expression)
    return {
      title: "计算结果",
      output: `${args.expression} = ${result}`,
      metadata: { result }
    }
  }
})
```

**模式 3：带附件的工具**

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

export default tool({
  id: "generate_chart",
  description: "生成数据图表",
  parameters: z.object({
    data: z.array(z.object({
      name: z.string(),
      value: z.number()
    })),
    type: z.enum(["bar", "line", "pie"]).describe("图表类型"),
  }),
  async execute(args, ctx) {
    const chartPath = await generateChart(args.data, args.type)
    
    return {
      title: "图表生成",
      output: `已生成 ${args.type} 图表，包含 ${args.data.length} 条数据`,
      metadata: { type: args.type, count: args.data.length },
      attachments: [
        {
          type: "file",
          name: "chart.png",
          content: await fs.readFile(chartPath),
          mimeType: "image/png"
        }
      ]
    }
  }
})
```

---

### 创建自定义工具

#### 方式 1：使用 TypeScript 定义 📝

使用 `tool()` helper 提供类型安全和验证。

**基础工具：**

在 `.opencode/tools/database.ts` 中定义：

```typescript
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "查询项目数据库",
  
  // 参数定义（使用 Zod schema）
  args: {
    query: tool.schema.string().describe("SQL 查询语句"),
  },
  
  // 执行函数
  async execute(args) {
    // 执行数据库查询
    const result = await executeSQL(args.query)
    return result
  },
})
```

**工具名称：**
- 文件名：`database.ts` → 工具名：`database`
- 文件名：`math.ts` → 工具名：`math`

**多工具文件：**

在 `.opencode/tools/math.ts` 中定义多个工具：

```typescript
import { tool } from "@opencode-ai/plugin"

export const add = tool({
  description: "加法运算",
  args: {
    a: tool.schema.number().describe("第一个数字"),
    b: tool.schema.number().describe("第二个数字"),
  },
  async execute(args) {
    return args.a + args.b
  },
})

export const multiply = tool({
  description: "乘法运算",
  args: {
    a: tool.schema.number().describe("第一个数字"),
    b: tool.schema.number().describe("第二个数字"),
  },
  async execute(args) {
    return args.a * args.b
  },
})
```

**工具名称：**
- `math.ts` + `add` → 工具名：`math_add`
- `math.ts` + `multiply` → 工具名：`math_multiply`

**使用示例：**

```bash
# 创建工具文件
touch .opencode/tools/database.ts

# 编辑工具文件
# （添加上面所示的代码）

# 启动 OpenCode（自动加载工具）
opencode start

# 调用自定义工具
用户：帮我查询用户数据

OpenCode：[调用工具 database]
✅ 执行 SQL: SELECT * FROM users LIMIT 10

[查询结果]
[
  {"id": 1, "name": "张三", "email": "zhangsan@example.com"},
  {"id": 2, "name": "李四", "email": "lisi@example.com"}
]

找到 2 条用户记录
```

---

#### 方式 2：调用 Python 脚本 🐍

你可以用任何语言编写工具，OpenCode 只需要工具定义在 TypeScript/JavaScript 中。

**创建 Python 脚本：**

在 `.opencode/tools/add.py` 中创建：

```python
#!/usr/bin/env python3
"""Python 加法工具"""

import sys

a = int(sys.argv[1])
b = int(sys.argv[2])
print(a + b)
```

**创建工具定义：**

在 `.opencode/tools/python-add.ts` 中定义：

```typescript
import { tool } from "@opencode-ai/plugin"
import path from "path"

export default tool({
  description: "使用 Python 进行加法运算",
  
  args: {
    a: tool.schema.number().describe("第一个数字"),
    b: tool.schema.number().describe("第二个数字"),
  },
  
  async execute(args, context) {
    // 获取 Python 脚本路径
    const script = path.join(context.worktree, ".opencode/tools/add.py")
    
    // 使用 Bun 运行 Python 脚本
    const result = await Bun.$`python3 ${script} ${args.a} ${args.b}`.text()
    
    return result.trim()
  },
})
```

**使用示例：**

```bash
# 创建 Python 脚本
cat > .opencode/tools/add.py << 'EOF'
#!/usr/bin/env python3
import sys
a = int(sys.argv[1])
b = int(sys.argv[2])
print(a + b)
EOF

# 创建工具定义
cat > .opencode/tools/python-add.ts << 'EOF'
import { tool } from "@opencode-ai/plugin"
import path from "path"

export default tool({
  description: "使用 Python 进行加法运算",
  args: {
    a: tool.schema.number().describe("第一个数字"),
    b: tool.schema.number().describe("第二个数字"),
  },
  async execute(args, context) {
    const script = path.join(context.worktree, ".opencode/tools/add.py")
    const result = await Bun.$`python3 ${script} ${args.a} ${args.b}`.text()
    return result.trim()
  },
})
EOF

# 启动 OpenCode（自动加载工具）
opencode start

# 调用自定义工具
用户：用 Python 帮我计算 5 加 3

OpenCode：[调用工具 python-add]
✅ 执行: python3 add.py 5 3

[执行结果]
8

5 加 3 等于 8
```

---

### 工具开发最佳实践 ✨

#### 1. 使用 Zod 进行严格的参数验证 ✅

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

interface CreateUserMetadata {
  userId: string
  timestamp: number
}

export default tool({
  id: "create_user",
  description: "创建新用户记录",
  
  // 使用 Zod 定义严格的参数验证
  parameters: z.object({
    name: z.string()
      .min(1, "名称不能为空")
      .max(100, "名称不能超过100个字符")
      .describe("用户名称"),
    
    email: z.string()
      .email("邮箱格式不正确")
      .describe("用户邮箱"),
    
    age: z.number()
      .int("年龄必须是整数")
      .min(18, "年龄不能小于18岁")
      .max(120, "年龄不能大于120岁")
      .describe("用户年龄"),
    
    role: z.enum(["admin", "user", "guest"])
      .describe("用户角色"),
  }),
  
  async execute(
    args: z.infer<typeof parameters>,
    ctx: Tool.Context<CreateUserMetadata>
  ): Promise<Tool.Result<CreateUserMetadata>> {
    
    // 执行数据库插入
    const result = await db.users.insert(args)
    
    return {
      title: "用户创建成功",
      output: `用户 ${args.name} 已创建，ID: ${result.id}`,
      metadata: {
        userId: result.id,
        timestamp: Date.now()
      }
    }
  },
})
```

#### 2. 充分利用 Context 上下文 📍

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

interface ProjectInfoMetadata {
  filesAnalyzed: number
  projectPath: string
}

export default tool({
  id: "project_info",
  description: "获取项目信息和文件结构",
  parameters: z.object({
    path: z.string().optional().describe("项目路径，默认为当前目录"),
  }),
  async execute(
    args,
    ctx: Tool.Context<ProjectInfoMetadata>
  ): Promise<Tool.Result<ProjectInfoMetadata>> {
    
    // 检查中止信号
    if (ctx.abort.aborted) {
      throw new Error("Tool execution was aborted")
    }
    
    // 使用 metadata() 更新执行状态
    ctx.metadata({
      title: "正在扫描项目...",
      metadata: { status: "scanning" }
    })
    
    // 获取项目信息
    const projectPath = args.path || process.cwd()
    const files = await scanDirectory(projectPath)
    
    // 获取历史消息（了解上下文）
    const lastMessages = ctx.messages.slice(-3)
    const hasPreviousAnalysis = lastMessages.some(m => 
      m.parts.some(p => p.type === "tool" && p.tool === "project_info")
    )
    
    return {
      title: "项目信息",
      output: JSON.stringify({
        path: projectPath,
        fileCount: files.length,
        previousAnalysis: hasPreviousAnalysis
      }, null, 2),
      metadata: {
        filesAnalyzed: files.length,
        projectPath,
        timestamp: Date.now()
      }
    }
  },
})
```

#### 3. 完善的错误处理和自定义验证错误 🛡️

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

interface CommandMetadata {
  exitCode: number
  duration: number
}

export default tool({
  id: "execute_command",
  description: "安全地执行 Shell 命令",
  parameters: z.object({
    command: z.string()
      .min(1)
      .max(1000)
      .describe("要执行的命令"),
    timeout: z.number()
      .min(1)
      .max(300)
      .default(30)
      .describe("超时时间（秒）"),
  }),
  async execute(
    args,
    ctx: Tool.Context<CommandMetadata>
  ): Promise<Tool.Result<CommandMetadata>> {
    const startTime = Date.now()
    
    // 设置 metadata 进度
    ctx.metadata({
      title: `执行命令: ${args.command}`,
      metadata: { startTime }
    })
    
    try {
      // 执行命令
      const result = await Bun.$`${args.command}`.text()
      const duration = Date.now() - startTime
      
      return {
        title: "命令执行成功",
        output: result,
        metadata: {
          exitCode: 0,
          duration
        }
      }
    } catch (error) {
      const duration = Date.now() - startTime
      
      // 返回错误结果（不是抛出异常）
      return {
        title: "命令执行失败",
        output: `命令执行失败: ${error.message}`,
        metadata: {
          exitCode: error.exitCode || 1,
          duration,
          error: error.message
        }
      }
    }
  },
  
  // 自定义验证错误格式化
  formatValidationError(error: z.ZodError): string {
    const issues = error.issues.map(issue => {
      const path = issue.path.join('.')
      return `${path}: ${issue.message}`
    }).join('\n')
    
    return `参数验证失败:\n${issues}\n\n请检查输入并重试。`
  }
})
```

---

#### 4. 处理输出截断和附件 📎

```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

interface LargeDataMetadata {
  totalCount: number
  processedCount: number
  truncated: boolean
  outputPath?: string
}

export default tool({
  id: "process_large_data",
  description: "处理大量数据并返回结果",
  parameters: z.object({
    query: z.string().describe("查询语句"),
    format: z.enum(["json", "csv"]).describe("输出格式"),
  }),
  async execute(
    args,
    ctx: Tool.Context<LargeDataMetadata>
  ): Promise<Tool.Result<LargeDataMetadata>> {
    
    // 执行查询（可能返回大量数据）
    const allData = await executeLargeQuery(args.query)
    
    // 如果数据量很小，直接返回
    if (allData.length <= 100) {
      return {
        title: "数据查询结果",
        output: JSON.stringify(allData, null, 2),
        metadata: {
          totalCount: allData.length,
          processedCount: allData.length,
          truncated: false
        }
      }
    }
    
    // 数据量大，截断输出
    const truncatedData = allData.slice(0, 100)
    const outputPath = `/tmp/results_${Date.now()}.${args.format}`
    
    // 保存完整数据到文件
    await saveToFile(allData, outputPath, args.format)
    
    return {
      title: "数据查询结果（已截断）",
      output: `找到 ${allData.length} 条记录，仅显示前 100 条:\n\n` +
               JSON.stringify(truncatedData, null, 2) +
               `\n\n完整数据已保存到: ${outputPath}`,
      metadata: {
        totalCount: allData.length,
        processedCount: 100,
        truncated: true,
        outputPath
      },
      attachments: [
        {
          type: "file",
          name: `results.${args.format}`,
          content: await fs.readFile(outputPath),
          mimeType: args.format === "json" 
            ? "application/json" 
            : "text/csv"
        }
      ]
    }
  },
})
```

#### 4. 工具命名和覆盖 🔧

自定义工具会覆盖同名内置工具。

**覆盖内置工具：**

```typescript
// .opencode/tools/bash.ts
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "受限的 bash 执行",
  args: {
    command: tool.schema.string(),
  },
  async execute(args) {
    // 返回受限执行
    return `blocked: ${args.command}`
  },
})
```

**注意事项：**

```
⚠️ 建议使用唯一名称，除非有意覆盖内置工具
⚠️ 覆盖工具可能影响系统稳定性
⚠️ 如需禁用内置工具，使用权限配置
```

---

## 工具链 🚀

### 什么是工具链

工具链是指多个工具按顺序或条件组合使用，完成复杂任务。

**白话解释：**

就像"生产线"：
- 🔨 工具 A（打磨）→ 工具 B（上色）→ 工具 C（包装）
- 📦 每个工具完成一部分工作
- ✅ 最终完成一个完整产品

---

### 工具链配置 📊

#### 顺序工具链 ➡️

```yaml
tool_chains:
  data_pipeline:
    name: "数据处理流水线"
    description: "按顺序执行数据处理"
    type: "sequential"
    steps:
      - tool: "file.read"
        params:
          path: "./data.json"
      
      - tool: "data.transform"
        params:
          format: "csv"
      
      - tool: "file.write"
        params:
          path: "./output.csv"
```

**执行示例：**

```bash
# 执行工具链
opencode chain run data_pipeline

# 输出示例
正在执行工具链: data_pipeline
================================

步骤 1/3: file.read
✅ 读取成功: {"name":"张三","age":28}

步骤 2/3: data.transform
✅ 转换成功: name,age
张三,28

步骤 3/3: file.write
✅ 写入成功: ./output.csv

🎉 工具链执行完成！
```

---

#### 条件工具链 🔀

```yaml
tool_chains:
  smart_deploy:
    name: "智能部署"
    description: "根据条件选择部署方式"
    type: "conditional"
    steps:
      - condition: "file.exists"
        params:
          path: "./dockerfile"
        true_branch:
          - tool: "docker.deploy"
        false_branch:
          - tool: "ssh.deploy"
```

**执行示例：**

```bash
# 执行工具链
opencode chain run smart_deploy

# 输出示例
正在执行工具链: smart_deploy
================================

检查条件: file.exists
路径: ./dockerfile

✅ 文件存在，执行 true 分支

步骤: docker.deploy
✅ Docker 部署成功

🎉 工具链执行完成！
```

---

#### 并行工具链 🔀

```yaml
tool_chains:
  parallel_tasks:
    name: "并行任务"
    description: "同时执行多个任务"
    type: "parallel"
    steps:
      - tool: "http.get"
        params:
          url: "`https://api1.example.com`"
      
      - tool: "http.get"
        params:
          url: "`https://api2.example.com`"
      
      - tool: "http.get"
        params:
          url: "`https://api3.example.com`"
```

**执行示例：**

```bash
# 执行工具链
opencode chain run parallel_tasks

# 输出示例
正在执行工具链: parallel_tasks
================================

并行执行 3 个任务...

✅ 任务 1 完成: http.get (`https://api1.example.com`)
✅ 任务 2 完成: http.get (`https://api2.example.com`)
✅ 任务 3 完成: http.get (`https://api3.example.com`)

🎉 所有任务完成！
总耗时: 2.3秒（比顺序执行快 3 倍）
```

---

## 工具管理 📋

### 查看工具列表 📚

```bash
# 查看所有工具
opencode tools list

# 查看已启用的工具
opencode tools list --enabled

# 查看自定义工具
opencode tools list --custom

# 搜索工具
opencode tools search --keyword "http"
```

**输出示例：**

```
已注册工具列表
================================

内置工具 (8):
  🔨 file.read          - 读取文件
  🔨 file.write         - 写入文件
  🌐 http.get           - HTTP GET 请求
  🌐 http.post          - HTTP POST 请求
  💻 python.execute      - 执行 Python 代码
  💻 js.execute         - 执行 JavaScript 代码
  🔍 web.search        - Web 搜索
  🔍 search.local       - 本地文件搜索

自定义工具 (2):
  🌟 my_weather_tool    - 天气查询
  📧 email_sender       - 邮件发送

工具链 (3):
  🚀 data_pipeline     - 数据处理流水线
  🧠 smart_deploy      - 智能部署
  🔀 parallel_tasks     - 并行任务
```

---

### 启用/禁用工具 🔘

```bash
# 启用工具
opencode tools enable file.read

# 禁用工具
opencode tools disable file.read

# 批量启用
opencode tools enable file.read file.write http.get

# 批量禁用
opencode tools disable python.execute js.execute
```

**配置文件方式：**

```yaml
tools:
  file:
    read:
      enabled: true
    write:
      enabled: true
  
  code:
    python:
      enabled: false  # 禁用 Python 执行
    js:
      enabled: false  # 禁用 JavaScript 执行
```

---

### 更新工具 🔄

```bash
# 检查工具更新
opencode tools check-updates

# 更新工具定义
opencode tools update

# 重新加载工具
opencode tools reload
```

---

## 实际应用案例 📊

### 案例 1：自动化数据处理 🚀

**需求：** 每天自动处理销售数据，生成报表

**工具链配置：**

```yaml
tool_chains:
  daily_report:
    name: "每日报表"
    type: "sequential"
    steps:
      # 1. 从 API 获取数据
      - tool: "http.get"
        params:
          url: "`https://api.sales.com/today`"
      
      # 2. 转换数据格式
      - tool: "data.transform"
        params:
          format: "excel"
      
      # 3. 发送邮件
      - tool: "email_sender"
        params:
          to: "manager@example.com"
          subject: "每日销售报表"
          body: "附件是今日销售报表"
      
      # 4. 归档文件
      - tool: "file.write"
        params:
          path: "./reports/$(date).xlsx"
```

**定时执行：**

```bash
# 添加到 crontab
0 18 * * * opencode chain run daily_report

# 每天下午 6 点自动执行
```

---

### 案例 2：智能客服机器人 🤖

**需求：** 根据用户输入自动调用不同工具

**配置文件：**

```yaml
agent:
  name: "智能客服"
  description: "自动处理用户请求"
  
  # 工具映射
  tool_mapping:
    query:
      - "查询"
      - "搜索"
      - "找"
      tools: ["web.search", "search.local"]
    
    create:
      - "创建"
      - "新建"
      - "添加"
      tools: ["http.post", "file.write"]
    
    execute:
      - "执行"
      - "运行"
      - "计算"
      tools: ["python.execute", "js.execute"]
```

**对话示例：**

```
用户：帮我查询北京的天气

OpenCode：[识别意图：query]
[调用工具: web.search]
搜索结果：北京今天晴天，气温 25°C

用户：帮我创建一个新的任务

OpenCode：[识别意图：create]
[调用工具: http.post]
✅ 任务创建成功，ID: 12345

用户：帮我计算斐波那契数列第 10 项

OpenCode：[识别意图：execute]
[调用工具: python.execute]
执行结果：55
```

---

### 案例 3：多模态内容创作 🎨

**需求：** 根据文本自动生成配图并发布

**工具链配置：**

```yaml
tool_chains:
  content_creation:
    name: "内容创作"
    type: "sequential"
    steps:
      # 1. 生成内容文本
      - tool: "ai.generate"
        params:
          model: "gpt-4o"
          prompt: "写一篇关于春天的博客"
      
      # 2. 生成配图
      - tool: "image.generate"
        params:
          model: "dall-e-3"
          prompt: "春天的风景，温暖的阳光"
      
      # 3. 合成图文
      - tool: "image.compose"
        params:
          text: "${steps[0].result}"
          image: "${steps[1].result}"
      
      # 4. 发布到平台
      - tool: "social.post"
        params:
          platform: "xiaohongshu"
          content: "${steps[2].result}"
```

---

## 常见问题 ❓

### Q1: 工具执行失败怎么办？❌

**A:** 逐步排查工具问题。

```bash
# 查看工具日志
opencode logs --tool

# 测试单个工具
opencode tool test --name file.read

# 查看工具详情
opencode tool info --name file.read
```

**常见原因：**

```
❌ 参数错误：缺少必需参数或参数格式错误
❌ 权限不足：文件或网络访问被拒绝
❌ 配置错误：工具配置文件格式错误
❌ 依赖缺失：工具依赖的库或服务未安装
```

---

### Q2: 如何优化工具执行性能？⚡

**A:** 多种优化方案。

**1. 启用缓存**

```yaml
tools:
  cache:
    enabled: true
    ttl: 3600  # 缓存 1 小时
```

**2. 并行执行**

```yaml
tool_chains:
  parallel_tasks:
    type: "parallel"  # 改为并行
```

**3. 异步调用**

```yaml
tools:
  async:
    enabled: true
    max_concurrent: 5  # 最多 5 个并发
```

---

### Q3: 可以共享自定义工具吗？🤝

**A:** 可以通过多种方式共享。

**方式 1：导出工具配置**

```bash
# 导出工具配置
opencode tools export --output my_tools.json

# 分享给他人
# 其他人导入
opencode tools import --input my_tools.json
```

**方式 2：发布到工具市场**

```bash
# 发布工具
opencode tools publish --name my_weather_tool

# 搜索工具
opencode tools search --marketplace
```

**方式 3：Git 仓库共享**

```bash
# 克隆工具仓库
git clone https://github.com/opencode/tools.git

# 使用工具
opencode tools install ./tools/weather_tool.json
```

---

### Q4: 工具安全吗？🔒

**A:** 工具有安全机制。

**权限控制：**

```yaml
tools:
  security:
    # 工具权限级别
    levels:
      file:
        level: "high"  # 高权限工具
        approval: true  # 需要用户确认
      
      code:
        level: "high"
        approval: true
      
      network:
        level: "medium"  # 中等权限
        approval: false  # 自动执行
    
    # 沙箱执行
    sandbox:
      enabled: true
      isolate_network: true  # 隔离网络访问
      limit_file_access: true  # 限制文件访问
```

**白话解释：**

工具安全就像"保险箱"：
- 🔒 高风险工具放在保险箱，需要密码（用户确认）才能打开
- 🧱 沙箱就像隔离房间，工具在里面活动，不影响外面
- 🚫 限制访问就像给工具设置活动范围

---

## 下一步 ➡️

工具配置完成后，您可以：

1. **配置代理系统**：查看 [代理配置](./agents)
2. **了解模型管理**：查看 [模型配置](./models)
3. **学习工作流设计**：查看 [工作流设计](../04-best-practices/workflow-design)
4. **查看故障排查**：查看 [常见问题](../07-troubleshooting/common-issues)

---

## 总结 📝

工具系统是 OpenCode 的核心扩展机制。

**工具配置清单：**

```
🛠️ 工具管理
  [ ] 查看内置工具列表
  [ ] 启用/禁用特定工具
  [ ] 配置工具权限
  [ ] 测试工具功能

🔧 自定义工具
  [ ] 开发自定义工具
  [ ] 编写工具文档
  [ ] 注册到 OpenCode
  [ ] 测试工具功能

🚀 工具链
  [ ] 设计工具链逻辑
  [ ] 配置顺序/条件/并行
  [ ] 测试工具链执行
  [ ] 设置定时执行
```

**常见工具链模式：**

```
📊 数据处理：
  读取 → 转换 → 分析 → 写入

🤖 自动化任务：
  触发 → 执行 → 验证 → 通知

🎨 内容创作：
  生成文本 → 生成图像 → 合成 → 发布

🔧 开发流程：
  拉取代码 → 运行测试 → 部署 → 验证
```

---

**🎉 工具配置完成！**

现在 OpenCode 可以使用各种工具完成任务了！🚀
