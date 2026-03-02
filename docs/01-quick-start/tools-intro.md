---
description: OpenCode 工具系统介绍，包括基础工具、工具注册、工具调用机制等。帮助您理解和使用 OpenCode 的工具能力。
keywords: ["OpenCode 工具", "工具调用", "Function Calling", "工具注册"]
---

# 工具

OpenCode 提供了一组强大的工具（Tool），每个工具代表一个可执行的具体功能。通过工具调用，OpenCode 可以执行各种任务，如文件操作、命令执行、网络请求等。

## 什么是工具

工具是 OpenCode 的原子能力单元，它：

- 提供具体可执行功能
- 具备明确参数结构与执行逻辑
- 可独立注册与扩展
- 可被 Agent 调用完成特定任务

## 基础工具集

OpenCode 提供一组基础工具，构成系统的最小能力闭环：

### 1. Read（读取文件）

读取文件内容到系统。

**参数：**
- `filePath`: 文件路径（必需）

**使用示例：**

```bash
读取 /home/user/config.json 文件的内容
```

**适用场景：**
- 查看配置文件
- 阅读代码
- 获取文档内容

### 2. Write（写入文件）

将内容写入到指定文件。

**参数：**
- `content`: 文件内容（必需）
- `filePath`: 文件路径（必需）

**使用示例：**

```bash
在 /home/user/hello.txt 文件中写入 "Hello World"
```

**适用场景：**
- 创建新文件
- 更新配置
- 保存代码

### 3. Bash（执行命令）

在系统终端执行命令。

**参数：**
- `command`: 要执行的命令（必需）
- `workdir`: 工作目录（可选）

**使用示例：**

```bash
列出当前目录下的所有文件
```

```bash
在 /home/user/project 目录下执行 npm run build
```

**适用场景：**
- 安装依赖
- 运行测试
- 执行构建

### 4. Webfetch（获取网页内容）

从 URL 获取网页内容。

**参数：**
- `url`: 网页 URL（必需）
- `format`: 返回格式（可选，默认 markdown）

**使用示例：**

```bash
获取 https://example.com 的网页内容
```

**适用场景：**
- 获取外部信息
- 抓取网页数据
- 查看在线文档

## 工具调用机制

### Function Calling

OpenCode 使用 Function Calling 机制来调用工具：

1. **理解意图**：分析用户需求，确定需要调用哪些工具
2. **生成参数**：根据工具定义，生成合适的参数
3. **执行工具**：调用工具执行具体任务
4. **处理结果**：将工具执行结果返回给用户

**示例流程：**

```
用户：帮我查看项目中的 package.json 文件

Agent 理解：
  需要读取文件 → 调用 Read 工具

生成参数：
  filePath: "/path/to/package.json"

执行工具：
  Read("/path/to/package.json")

返回结果：
  {
    "name": "my-project",
    "version": "1.0.0",
    ...
  }

响应用户：
  这是你的 package.json 文件内容：
  {
    "name": "my-project",
    ...
  }
```

## 工具配置

### 工具注册

新工具需要在配置文件中注册：

```yaml
tools:
  - name: "read"
    type: "builtin"
    enabled: true
  
  - name: "write"
    type: "builtin"
    enabled: true
  
  - name: "bash"
    type: "builtin"
    enabled: true
  
  - name: "webfetch"
    type: "builtin"
    enabled: true
```

### 工具权限

可以控制工具的访问权限：

```yaml
tools:
  - name: "bash"
    enabled: true
    permissions:
      allowed_commands:
        - "npm"
        - "git"
        - "node"
      denied_commands:
        - "rm"
        - "sudo"
      allowed_dirs:
        - "/home/user/projects"
```

## 自定义工具
 
OpenCode 支持创建自定义工具来扩展系统能力。
 
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
 
### 工具定义规范 📋
 
OpenCode 使用严格的工具定义接口，确保类型安全和一致性。
 
#### 基本结构
 
```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
 
export default tool({
  id: "tool_name",
  description: "工具描述（给 LLM 看的）",
  parameters: z.object({
    // 参数定义
  }),
  async execute(args, ctx) {
    // 执行逻辑
    return {
      title: "结果标题",
      output: "输出内容",
      metadata: {}
    }
  }
})
```
 
**参数说明：**
 
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | `string` | ✅ | 工具唯一标识符 |
| `description` | `string` | ✅ | 工具功能描述 |
| `parameters` | `z.ZodType` | ✅ | 使用 Zod 定义的参数类型 |
| `execute` | `function` | ✅ | 工具执行函数 |
| `title` | `string` | ✅ | 执行结果标题 |
| `output` | `string` | ✅ | 工具输出 |
| `metadata` | `object` | ✅ | 执行元数据 |
| `attachments` | `FilePart[]` | ❌ | 可选的文件附件 |
 
#### 简单示例
 
```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
 
export default tool({
  id: "greet",
  description: "返回问候语",
  parameters: z.object({
    name: z.string().describe("用户名字")
  }),
  async execute(args) {
    return {
      title: "问候",
      output: `你好，${args.name}！`,
      metadata: { timestamp: Date.now() }
    }
  }
})
```
 
#### Context 使用
 
执行函数接收上下文对象，提供会话信息：
 
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
    permission: "file_access",
    message: "需要访问文件"
  })
  
  // 执行逻辑
  return { ... }
}
```
 
### 创建自定义工具
 
**方式 1：TypeScript 工具**
 
在 `.opencode/tools/my-tool.ts` 中创建：
 
```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
 
export default tool({
  id: "send_email",
  description: "发送邮件",
  parameters: z.object({
    to: z.string().email().describe("收件人邮箱"),
    subject: z.string().describe("邮件主题"),
    body: z.string().describe("邮件正文")
  }),
  async execute(args) {
    // 实现发送邮件逻辑
    await emailService.send({
      to: args.to,
      subject: args.subject,
      body: args.body
    })
    
    return {
      title: "邮件发送",
      output: `邮件已发送到 ${args.to}`,
      metadata: { recipient: args.to }
    }
  }
})
```
 
**方式 2：调用 Python 脚本**
 
创建 Python 脚本 `.opencode/tools/script.py`：
 
```python
#!/usr/bin/env python3
import sys

def process_data(input_data):
    return f"Processed: {input_data}"

if __name__ == "__main__":
    result = process_data(sys.argv[1])
    print(result)
```
 
创建 TypeScript 包装器 `.opencode/tools/python-wrapper.ts`：
 
```typescript
import { tool } from "@opencode-ai/plugin"
import { z } from "zod"
import path from "path"
 
export default tool({
  id: "python_processor",
  description: "使用 Python 处理数据",
  parameters: z.object({
    input: z.string().describe("输入数据")
  }),
  async execute(args, ctx) {
    const script = path.join(ctx.worktree, ".opencode/tools/script.py")
    const result = await Bun.$`python3 ${script} ${args.input}`.text()
    
    return {
      title: "Python 处理",
      output: result.trim(),
      metadata: {}
    }
  }
})
```
 
### 注册工具
 
工具定义完成后，重启 OpenCode 会自动加载：
 
```bash
# 1. 创建工具目录
mkdir -p .opencode/tools
 
# 2. 创建工具文件
# （如上所示）
 
# 3. 重启 OpenCode
# 工具会自动加载
```

## 工具使用场景

### 场景 1：代码开发

使用工具完成代码开发任务：

```
用户：帮我创建一个 Express 服务器

Agent：
  1. 使用 Bash 工具：npm init -y
  2. 使用 Bash 工具：npm install express
  3. 使用 Write 工具：创建 server.js
  4. 使用 Bash 工具：node server.js
```

### 场景 2：数据分析

使用工具获取和分析数据：

```
用户：帮我分析 CSV 文件中的销售数据

Agent：
  1. 使用 Read 工具：读取 sales.csv
  2. 使用 Bash 工具：运行 Python 脚本分析数据
  3. 使用 Write 工具：保存分析结果
```

### 场景 3：自动化任务

使用工具自动化重复性工作：

```
用户：帮我整理桌面上的截图文件

Agent：
  1. 使用 Bash 工具：ls ~/Desktop/*.png
  2. 使用 Bash 工具：mkdir ~/Desktop/screenshots
  3. 使用 Bash 工具：mv *.png ~/Desktop/screenshots/
```

## 工具最佳实践

### 1. 选择合适的工具

根据任务选择最合适的工具：

| 任务 | 推荐工具 |
|------|---------|
| 读取文件 | Read |
| 修改文件 | Write |
| 执行命令 | Bash |
| 获取网页 | Webfetch |

### 2. 组合使用工具

多个工具可以组合使用完成复杂任务：

```
Read + Write → 复制文件
Bash + Read → 读取命令输出
Webfetch + Write → 保存网页内容
```

### 3. 错误处理

工具调用可能会失败，需要正确处理错误：

```bash
# 如果文件不存在，先创建文件
# 如果命令失败，检查错误原因
# 如果网络请求失败，重试或使用备用方案
```

## 下一步

了解工具后，您可以：

1. **了解架构**：查看 [工作流](./workflow)
2. **学习日常使用**：查看 [日常使用](../02-daily-usage/tools)
3. **学习最佳实践**：查看 [工作流设计](../04-best-practices/workflow-design)

---

**🎉 现在你已经了解了 OpenCode 的工具系统！**

接下来学习配置和指令。🚀
