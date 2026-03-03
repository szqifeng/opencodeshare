---
description: OpenCode 命令行启动方式和可用命令列表
keywords: ["OpenCode 命令", "CLI", "命令行"]
---

# 命令

OpenCode 提供了丰富的命令行工具，通过不同的命令实现各种功能。

## 🚀 启动方式

### 基本用法

```bash
opencode <command> [options]
```

### 查看帮助

```bash
opencode --help              # 查看所有命令
opencode <command> --help     # 查看特定命令的帮助
```

### 查看版本

```bash
opencode --version
```

## 📋 命令列表

### 核心命令

#### run
启动 OpenCode 并运行对话

```bash
opencode run [message]
```

#### serve
启动 HTTP 服务器

```bash
opencode serve
```

#### web
启动 Web 界面

```bash
opencode web
```

#### tui-thread
启动 TUI（终端用户界面）线程

```bash
opencode tui-thread
```

#### attach
附加到现有会话

```bash
opencode attach [session-id]
```

### 交互式命令

#### agent
Agent 相关操作

```bash
opencode agent list           # 列出所有 Agent
opencode agent use <name>     # 使用指定 Agent
```

#### session
会话管理

```bash
opencode session list         # 列出所有会话
opencode session create       # 创建新会话
opencode session delete <id>  # 删除会话
```

#### models
模型相关操作

```bash
opencode models list          # 列出可用模型
opencode models test <model>  # 测试模型
```

### 开发命令

#### generate
代码生成

```bash
opencode generate <prompt>
```

#### debug
调试模式

```bash
opencode debug [options]
```

#### stats
查看统计信息

```bash
opencode stats
```

### 数据管理

#### export
导出数据

```bash
opencode export [options]
```

#### import
导入数据

```bash
opencode import [options]
```

#### db
数据库操作

```bash
opencode db <subcommand>
```

### 集成命令

#### github
GitHub 集成

```bash
opencode github <subcommand>
```

#### pr
Pull Request 操作

```bash
opencode pr <subcommand>
```

### 协议命令

#### acp
Agent Control Protocol 操作

```bash
opencode acp <subcommand>
```

#### mcp
Model Context Protocol 操作

```bash
opencode mcp <subcommand>
```

### 系统命令

#### auth
认证管理

```bash
opencode auth login           # 登录
opencode auth logout          # 登出
opencode auth status          # 查看认证状态
```

#### upgrade
升级 OpenCode

```bash
opencode upgrade
```

#### uninstall
卸载 OpenCode

```bash
opencode uninstall
```

#### completion
生成 Shell 自动补全脚本

```bash
opencode completion bash     # Bash 补全
opencode completion zsh      # Zsh 补全
opencode completion fish     # Fish 补全
```

## 🔧 常用场景

### 快速开始

```bash
# 启动并输入消息
opencode run "帮我写一个函数"

# 启动服务器
opencode serve

# 启动 Web 界面
opencode web
```

### 会话管理

```bash
# 列出所有会话
opencode session list

# 附加到特定会话
opencode attach <session-id>
```

### Agent 使用

```bash
# 查看可用 Agent
opencode agent list

# 切换到特定 Agent
opencode agent use coder
```

### 数据管理

```bash
# 导出所有会话
opencode export --format json

# 导入会话
opencode import --file data.json
```

## 💡 提示

- 使用 `--help` 查看任何命令的详细用法
- 大多数命令支持自动补全，建议配置 `completion`
- 服务器默认端口为 4096，可通过选项修改

## 📖 相关文章

- [快速体验](./quick-experience)
- [配置管理](./configuration)
