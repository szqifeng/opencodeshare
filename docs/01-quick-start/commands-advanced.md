---
description: OpenCode 高级用法介绍 - 指令别名、批处理、自动化等高级功能和最佳实践
keywords: ["OpenCode 高级用法", "指令别名", "自动化"]
---

# 高级用法

## 📋 概述

高级用法涵盖了 OpenCode 的高级功能和最佳实践，包括指令别名、批处理、自动化脚本、工作流优化等。

## 🔤 指令别名

使用简短的别名代替长命令，提高使用效率

### 创建别名

为常用命令创建别名

**别名配置文件：** `~/.opencode/aliases.yaml`

**示例配置：**

```yaml
# 服务管理
start: start
stop: stop
restart: restart
status: status

# 对话
chat: chat
ask: ask

# 配置
cfg: config
cfg-get: config get
cfg-set: config set

# 模型
model-list: model list
model-use: model use

# 工具
tool-list: tool list
tool-info: tool info

# Agent
agent-list: agent list
agent-use: agent use

# 调试
logs: logs
test: test
diag: diagnose
```

**使用示例：**

```bash
# 使用别名
op s           # 启动服务
op c           # 开始对话
op cfg-get     # 查看配置
op model-list  # 查看模型列表
```

### 临时别名

在当前会话中创建临时别名

**使用场景：**
- 临时测试
- 快速实验
- 一次性使用

## 📦 批处理

批量执行多个任务，提高工作效率

### 批处理文件

创建批处理任务文件

**JSON 格式：**

```json
{
  "tasks": [
    {
      "name": "代码审查",
      "type": "code-review",
      "files": ["src/*.ts"],
      "model": "claude-3-5-sonnet"
    },
    {
      "name": "生成文档",
      "type": "documentation",
      "output": "docs/api.md",
      "model": "gpt-4o"
    },
    {
      "name": "运行测试",
      "type": "test",
      "command": "npm test"
    }
  ]
}
```

**执行批处理：**

```bash
opencode batch --file tasks.json
```

### 批处理选项

**并行控制：**
- `--parallel <n>`: 并发执行数量
- `--sequential`: 顺序执行

**错误处理：**
- `--continue`: 出错后继续
- `--stop-on-error`: 出错后停止

**输出控制：**
- `--output <file>`: 输出到文件
- `--verbose`: 详细输出

## 🤖 自动化脚本

将 OpenCode 集成到自动化工作流中

### Shell 脚本

在 shell 脚本中使用 OpenCode

**示例：代码审查脚本**

```bash
#!/bin/bash

# 文件路径
FILE=$1

# 代码审查
opencode ask "请审查以下代码，给出改进建议：$(cat $FILE)"

# 生成测试用例
opencode ask "为以下代码生成测试用例：$(cat $FILE)"
```

### Make 集成

在 Makefile 中使用 OpenCode

**示例：**

```makefile
.PHONY: review test docs

review:
	opencode ask "审查所有 .ts 文件"

test:
	opencode ask "为 src 目录生成测试用例"

docs:
	opencode ask "生成 API 文档"
```

### CI/CD 集成

在 CI/CD 流程中使用 OpenCode

**GitHub Actions 示例：**

```yaml
name: Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install OpenCode
        run: npm install -g opencode
      - name: Code Review
        run: opencode ask "审查 PR 中的代码变更"
```

## 🔄 工作流优化

### 提示词模板

使用提示词模板提高效率

**模板文件：** `~/.opencode/templates/`

**代码审查模板：**

```
请审查以下代码：

```{{language}}
{{code}}
```

请关注：
1. 代码质量和可维护性
2. 潜在的 bug 和问题
3. 性能优化建议
4. 最佳实践
```

**使用模板：**

```bash
opencode ask --template review --language typescript --file src/index.ts
```

### 快捷命令

定义常用的快捷命令组合

**示例配置：**

```yaml
shortcuts:
  full-review:
    - agent use reviewer
    - model use claude-3-5-sonnet
    - ask "审查所有代码"

  quick-test:
    - bash "npm run test"
    - ask "分析测试结果"

  deploy:
    - bash "npm run build"
    - bash "npm run deploy"
    - ask "部署成功，请生成变更日志"
```

**使用快捷命令：**

```bash
opencode shortcut full-review
```

## 🎯 性能优化

### 减少延迟

提高响应速度的方法

**优化策略：**
1. 选择快速模型
2. 使用流式输出
3. 减少上下文大小
4. 缓存常用结果

### 降低成本

优化 API 使用成本

**成本控制：**
1. 使用高性价比模型
2. 优化提示词长度
3. 启用结果缓存
4. 批量处理任务

### 资源管理

合理使用系统资源

**管理建议：**
1. 定期清理缓存
2. 限制并发数
3. 监控资源使用
4. 优化工具调用

## 🔌 插件扩展

使用插件扩展 OpenCode 功能

### 安装插件

```bash
opencode plugin install <plugin-name>
```

### 查看插件

```bash
opencode plugin list
```

### 卸载插件

```bash
opencode plugin uninstall <plugin-name>
```

### 常用插件

- **LSP 插件**: 语言服务器集成
- **Git 插件**: Git 操作增强
- **Docker 插件**: Docker 容器管理
- **Cloud 插件**: 云服务集成

## 📊 数据管理

### 导出数据

导出对话历史和配置

```bash
# 导出所有对话
opencode export --format json --output conversations.json

# 导出配置
opencode config export > config-backup.yaml
```

### 导入数据

导入对话历史和配置

```bash
# 导入对话
opencode import --format json --input conversations.json

# 导入配置
opencode config import < config-backup.yaml
```

### 数据清理

清理不需要的数据

```bash
# 清理旧对话
opencode clean --conversations --older-than 30d

# 清理缓存
opencode clean --cache

# 清理日志
opencode clean --logs
```

## 🌐 团队协作

### 配置共享

在团队间共享配置

**共享方式：**
1. 配置文件版本控制
2. 环境变量配置
3. 配置模板

### 工作流标准化

建立标准化的工作流程

**标准化内容：**
- 代码审查流程
- 文档编写规范
- 测试流程
- 发布流程

### 知识库建设

积累和共享知识

**知识库内容：**
- 常用提示词
- 最佳实践
- 问题解决方案
- 工具使用技巧

## 💡 最佳实践

### 提示词编写

编写高效的提示词

**原则：**
1. 清晰明确的目标
2. 充分的上下文
3. 合理的期望
4. 及时的反馈

### 工具选择

选择合适的工具组合

**选择标准：**
1. 任务需求
2. 工具能力
3. 执行效率
4. 安全考虑

### 模型选择

根据任务选择合适的模型

**选择依据：**
1. 任务复杂度
2. 成本预算
3. 响应速度
4. 输出质量

## 📝 常见问题

### Q: 如何创建自定义别名？

A: 编辑 `~/.opencode/aliases.yaml` 文件，添加你的别名配置。

### Q: 批处理任务失败如何恢复？

A: 使用 `--continue` 选项继续执行，或查看日志定位问题后手动重试。

### Q: 如何优化 OpenCode 的性能？

A: 选择合适的模型、优化提示词、减少不必要的工具调用、启用缓存。

### Q: 可以在 CI/CD 中使用 OpenCode 吗？

A: 可以，通过 CLI 命令或 API 集成到 CI/CD 流程中。

## 📖 相关文章

- [基础命令](./commands-basics)
- [对话命令](./commands-chat)
- [配置命令](./commands-config)
