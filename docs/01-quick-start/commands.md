---
description: OpenCode 命令行指令介绍，包括启动、配置、对话等相关命令。
keywords: ["OpenCode 指令", "命令行", "CLI 命令"]
---

# 指令

OpenCode 提供了丰富的命令行指令，用于启动、配置和使用系统。

## 基础指令

### 启动服务

```bash
opencode start
```

启动 OpenCode 服务，默认运行在 http://localhost:3000

**选项：**
- `--port`: 指定端口，如 `--port 3001`
- `--daemon`: 后台运行
- `--config`: 指定配置文件路径

**示例：**

```bash
opencode start --port 3001
opencode start --daemon
opencode start --config /path/to/config.yaml
```

### 停止服务

```bash
opencode stop
```

停止运行的 OpenCode 服务。

**示例：**

```bash
opencode stop
```

### 重启服务

```bash
opencode restart
```

重启 OpenCode 服务。

**示例：**

```bash
opencode restart
```

## 对话指令

### 开始对话

```bash
opencode chat
```

打开对话界面进行交互。

**选项：**
- `--model`: 指定使用的模型
- `--agent`: 指定使用的 Agent

**示例：**

```bash
opencode chat --model gpt-4o
opencode chat --agent coder
```

### 执行单次查询

```bash
opencode ask "你的问题"
```

执行单次查询并返回结果。

**示例：**

```bash
opencode ask "帮我写一个快速排序函数"
```

### 批量处理

```bash
opencode batch --file tasks.json
```

批量执行任务列表。

**示例：**

```bash
opencode batch --file tasks.json
```

## 配置指令

### 查看配置

```bash
opencode config get
```

查看当前配置。

**示例：**

```bash
opencode config get
opencode config get model
opencode config get proxy
```

### 设置配置

```bash
opencode config set <key> <value>
```

设置配置项。

**示例：**

```bash
opencode config set model.provider openai
opencode config set model.api_key sk-xxxxx
opencode config set proxy.enabled true
```

### 重置配置

```bash
opencode config reset
```

重置为默认配置。

**示例：**

```bash
opencode config reset
```

## 模型指令

### 查看可用模型

```bash
opencode model list
```

列出所有可用的模型。

**示例：**

```bash
opencode model list
```

### 切换模型

```bash
opencode model use <model>
```

切换使用的模型。

**示例：**

```bash
opencode model use gpt-4o
opencode model use claude-3-5-sonnet
```

### 测试模型

```bash
opencode model test <model>
```

测试模型连接。

**示例：**

```bash
opencode model test gpt-4o
```

## 工具指令

### 查看工具列表

```bash
opencode tool list
```

列出所有可用的工具。

**示例：**

```bash
opencode tool list
```

### 查看工具详情

```bash
opencode tool info <tool>
```

查看工具的详细信息。

**示例：**

```bash
opencode tool info read
opencode tool info bash
```

## Agent 指令

### 查看 Agent 列表

```bash
opencode agent list
```

列出所有可用的 Agent。

**示例：**

```bash
opencode agent list
```

### 切换 Agent

```bash
opencode agent use <agent>
```

切换使用的 Agent。

**示例：**

```bash
opencode agent use coder
opencode agent use writer
```

## 调试指令

### 查看日志

```bash
opencode logs
```

查看系统日志。

**选项：**
- `--tail`: 显示最后 N 行
- `--follow`: 持续跟踪日志

**示例：**

```bash
opencode logs
opencode logs --tail 100
opencode logs --follow
```

### 测试连接

```bash
opencode test
```

测试系统各项连接。

**选项：**
- `--provider`: 测试指定服务商
- `--proxy`: 测试代理连接

**示例：**

```bash
opencode test
opencode test --provider openai
opencode test --proxy
```

### 诊断问题

```bash
opencode diagnose
```

运行诊断检查，找出潜在问题。

**示例：**

```bash
opencode diagnose
```

## 系统指令

### 查看版本

```bash
opencode --version
```

查看 OpenCode 版本信息。

**示例：**

```bash
opencode --version
```

### 查看状态

```bash
opencode status
```

查看运行状态。

**示例：**

```bash
opencode status
```

### 检查更新

```bash
opencode update
```

检查并更新到最新版本。

**示例：**

```bash
opencode update
```

### 清理缓存

```bash
opencode clean
```

清理缓存文件。

**选项：**
- `--all`: 清理所有缓存
- `--cache`: 清理模型缓存
- `--logs`: 清理日志文件

**示例：**

```bash
opencode clean
opencode clean --all
```

## 帮助指令

### 查看帮助

```bash
opencode --help
```

查看帮助信息。

**示例：**

```bash
opencode --help
opencode start --help
```

## 指令别名

为了方便使用，OpenCode 支持指令别名：

```bash
# 常用别名
opencode start → op s
opencode stop → op stop
opencode chat → op c
opencode ask → op a
```

## 环境变量

OpenCode 支持通过环境变量配置：

```bash
# API Key
export OPENAI_API_KEY="sk-xxxxx"
export ANTHROPIC_API_KEY="sk-ant-xxxxx"

# 代理
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"

# 配置
export OPENCODE_CONFIG="/path/to/config.yaml"
export OPENCODE_PORT=3001
```

## 下一步

了解指令后，您可以：

1. **学习 Agent**：查看 [Agent 介绍](./agent-intro)
2. **学习日常使用**：查看 [日常使用](../02-daily-usage/tools)
3. **学习最佳实践**：查看 [工作流设计](../04-best-practices/workflow-design)

---

**🎉 现在你已经掌握了 OpenCode 的常用指令！**

开始使用吧！🚀
