---
description: OpenCode 快速体验，通过简单的示例快速了解 OpenCode 的核心功能和使用方式。
keywords: ["OpenCode 快速体验", "OpenCode 示例", "快速上手"]
---

# 快速体验

通过这个简单的示例，快速了解 OpenCode 的核心功能和使用方式。

## 前置条件

在开始之前，请确保：

- [ ] 已安装 Node.js
- [ ] 已安装 OpenCode
- [ ] 已配置 API Key 或使用本地模型

## 第一步：启动 OpenCode

打开终端，执行以下命令启动 OpenCode：

```bash
opencode start
```

服务将在 http://localhost:3000 启动。

## 第二步：打开对话界面

在浏览器中访问 http://localhost:3000，你会看到对话界面。

## 第三步：开始对话

### 示例 1：简单的问答

在对话框中输入：

```
你好，请介绍一下你自己
```

OpenCode 会回复介绍自己的信息。

### 示例 2：代码生成

输入：

```
帮我写一个 Python 函数，实现快速排序算法
```

OpenCode 会生成快速排序的代码：

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

### 示例 3：文件操作

输入：

```
在当前目录创建一个 hello.txt 文件，内容是 "Hello World"
```

OpenCode 会：
1. 获取当前目录路径
2. 使用 Write 工具创建文件
3. 返回操作结果

### 示例 4：执行命令

输入：

```
帮我查看当前目录下的所有文件
```

OpenCode 会：
1. 使用 Bash 工具执行 `ls` 命令
2. 返回文件列表

## 对话特点

OpenCode 的对话有以下特点：

### 1. 理解上下文

它记得对话历史，理解上下文关系：

```
你：帮我写一个快速排序函数
OpenCode：[生成代码]

你：把上面的代码改成降序
OpenCode：[修改代码，直接改成降序]
```

### 2. 自动选择工具

它会自动选择合适的工具完成任务：

```
你：帮我查看 package.json 文件
OpenCode：自动使用 Read 工具读取文件

你：帮我安装依赖
OpenCode：自动使用 Bash 工具执行 npm install
```

### 3. 多步推理

对于复杂任务，它会分解为多个步骤：

```
你：帮我创建一个 Express 服务器
OpenCode：
  1. 初始化项目（Bash）
  2. 安装 Express（Bash）
  3. 创建 server.js（Write）
  4. 启动服务器（Bash）
```

## 常用对话模式

### 模式 1：直接指令

```
写一个函数 xxx
读取文件 xxx
执行命令 xxx
```

### 模式 2：描述目标

```
我想要创建一个 xxx 功能
帮我把这个文件优化一下
帮我分析这个错误的原因
```

### 模式 3：持续交互

```
你：创建一个 React 组件
OpenCode：[生成组件]

你：添加一个按钮
OpenCode：[修改组件，添加按钮]

你：给按钮添加点击事件
OpenCode：[添加点击事件处理]
```

## 提示技巧

为了获得更好的效果，可以：

1. **明确目标**：清楚地描述你想要什么
2. **提供上下文**：如果有相关文件，让它先读取
3. **指定格式**：如果需要特定格式，明确说明
4. **分步进行**：复杂任务可以分多步完成

## 下一步

快速体验后，您可以：

1. **了解工作流**：查看 [工作流](./workflow)
2. **学习工具**：查看 [工具](./tools)
3. **配置系统**：查看 [配置](./configuration)
4. **学习指令**：查看 [指令](./commands)

---

**🎉 恭喜完成快速体验！**

继续深入学习 OpenCode 的更多功能吧！🚀
