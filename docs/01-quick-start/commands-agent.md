---
description: OpenCode Agent 命令介绍 - 查看 Agent 列表、切换 Agent、Agent 配置等 Agent 管理命令
keywords: ["OpenCode Agent 命令", "Agent 管理", "AI 代理"]
---

# Agent 命令

## 📋 概述

Agent 命令用于管理 OpenCode 的 AI 代理系统，包括查看可用 Agent、切换 Agent、配置 Agent 等。

Agent 是具有特定角色和能力的 AI 代理，针对不同场景进行优化。

## 📋 查看 Agent 列表

列出所有可用的 Agent

**输出信息：**
- Agent 名称
- Agent 描述
- 适用场景
- 能力特点

**内置 Agent：**

### Coder Agent
- **描述**: 代码编写和优化专家
- **适用场景**: 编写新代码、优化现有代码、代码重构
- **特点**: 深度理解代码逻辑，注重代码质量

### Writer Agent
- **描述**: 文档和内容撰写专家
- **适用场景**: 撰写技术文档、博客文章、说明文字
- **特点**: 语言表达流畅，结构清晰

### Reviewer Agent
- **描述**: 代码审查专家
- **适用场景**: Code Review、代码质量检查、最佳实践建议
- **特点**: 严格审查，关注安全性、性能、可维护性

### Debugger Agent
- **描述**: 调试和故障排查专家
- **适用场景**: Bug 定位、错误分析、性能问题排查
- **特点**: 系统化分析，快速定位问题

### Helper Agent
- **描述**: 通用助手
- **适用场景**: 日常问答、学习指导、技术咨询
- **特点**: 知识全面，响应迅速

## 🔄 切换 Agent

切换当前使用的 Agent

**用法：**
```bash
opencode agent use <agent-name>
```

**切换示例：**
```bash
opencode agent use coder    # 切换到代码专家
opencode agent use writer   # 切换到写作专家
opencode agent use reviewer # 切换到审查专家
```

**切换场景：**
- 不同任务类型使用不同 Agent
- 对比多个 Agent 的输出
- 寻找最佳解决方案

## 🔍 查看 Agent 详情

查看特定 Agent 的详细信息

**输出内容：**
- Agent 角色定义
- 能力和专长
- 系统提示词
- 推荐用法
- 配置参数

## ⚙️ Agent 配置

### 设置默认 Agent

```bash
opencode config set agent.default coder
```

### 配置 Agent 参数

```bash
# 设置 Agent 的模型偏好
opencode config set agent.coder.model gpt-4o
opencode config set agent.writer.model claude-3-5-sonnet

# 设置 Agent 的行为参数
opencode config set agent.coder.temperature 0.2
opencode config set agent.writer.temperature 0.8
```

## 🎯 Agent 选择指南

### 按任务类型选择

**代码开发：**
- 推荐：Coder Agent
- 特点：代码理解和生成能力强

**文档编写：**
- 推荐：Writer Agent
- 特点：语言表达和结构组织能力强

**代码审查：**
- 推荐：Reviewer Agent
- 特点：关注代码质量和安全性

**问题排查：**
- 推荐：Debugger Agent
- 特点：系统化分析问题

**一般咨询：**
- 推荐：Helper Agent
- 特点：知识全面，适应性强

### 按项目阶段选择

**项目开始：**
- 使用 Helper Agent 进行需求分析和规划

**开发阶段：**
- 使用 Coder Agent 进行代码编写

**测试阶段：**
- 使用 Reviewer Agent 进行代码审查
- 使用 Debugger Agent 进行问题排查

**文档阶段：**
- 使用 Writer Agent 撰写文档

## 🌐 多 Agent 协作

### 顺序协作

多个 Agent 依次完成任务

**示例流程：**
1. Coder Agent 编写代码
2. Reviewer Agent 审查代码
3. Writer Agent 撰写文档

### 并行协作

多个 Agent 同时处理不同任务

**示例场景：**
- Coder Agent 编写功能代码
- Reviewer Agent 审查其他代码
- Writer Agent 同步撰写文档

### Agent 链式调用

一个 Agent 调用另一个 Agent

**示例：**
- Helper Agent 分析需求，然后调用 Coder Agent 编写代码

## 🔧 自定义 Agent

创建自定义 Agent 满足特定需求

**Agent 配置要素：**

### 角色定义
- Agent 的身份和角色
- 专业领域和专长
- 工作方式和风格

### 系统提示词
- 行为准则
- 输出要求
- 约束条件

### 工具权限
- 允许使用的工具
- 工具使用限制
- 安全规则

### 模型配置
- 使用的模型
- 模型参数
- 备用模型

**创建步骤：**
1. 定义 Agent 角色和能力
2. 编写系统提示词
3. 配置工具权限
4. 选择合适的模型
5. 测试 Agent 行为

## 📊 Agent 性能对比

对比不同 Agent 在相同任务上的表现

**对比维度：**
- 输出质量
- 响应速度
- 成本效率
- 用户满意度

## 💡 Agent 使用技巧

### 明确任务描述

清晰描述任务目标和期望

**好的描述：**
"帮我编写一个 TypeScript 类，实现单链表的基本操作（插入、删除、查找），并添加完整的类型注释和文档说明。"

**不好的描述：**
"写个链表"

### 提供上下文

提供相关的代码、文档、错误信息

**上下文示例：**
- 项目结构
- 技术栈
- 编码规范
- 已有代码

### 迭代优化

通过多轮对话逐步优化结果

**优化方向：**
- 功能完善
- 性能提升
- 代码质量
- 文档补充

## 📝 常见问题

### Q: 可以同时使用多个 Agent 吗？

A: 可以，可以通过切换 Agent 或者使用 Agent 链式调用。

### Q: 如何创建自己的 Agent？

A: 可以在配置文件中定义自定义 Agent，设置角色、提示词和工具权限。

### Q: 不同 Agent 的对话历史是共享的吗？

A: 对话历史是独立的，但可以通过导出/导入在不同 Agent 间共享。

## 📖 相关文章

- [基础命令](./commands-basics)
- [对话命令](./commands-chat)
- [模型命令](./commands-model)
