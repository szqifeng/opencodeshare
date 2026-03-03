---
description: OpenCode 配置命令介绍 - 查看、设置、重置配置等配置管理命令
keywords: ["OpenCode 配置命令", "配置管理", "环境变量"]
---

# 配置命令

## 📋 概述

配置命令用于管理 OpenCode 的配置信息，包括查看配置、设置配置、重置配置等。

## 👀 查看配置

查看当前 OpenCode 的配置信息

**用法：**
- 查看所有配置
- 查看特定配置项
- 查看配置的层级关系

**配置层级：**
1. 默认配置
2. 全局配置
3. 项目配置
4. 命令行参数

**查看选项：**
- 无参数：显示所有配置
- 指定键名：显示特定配置项
- `--json`: 以 JSON 格式输出

## ⚙️ 设置配置

设置 OpenCode 的配置项

**支持配置项：**

### 模型配置

```bash
opencode config set model.provider openai
opencode config set model.default gpt-4o
opencode config set model.temperature 0.7
opencode config set model.max_tokens 4096
```

### 代理配置

```bash
opencode config set proxy.enabled true
opencode config set proxy.host 127.0.0.1
opencode config set proxy.port 7890
```

### 服务器配置

```bash
opencode config set server.port 3000
opencode config set server.host localhost
```

### 工具配置

```bash
opencode config set tools.bash.enabled true
opencode config set tools.webfetch.timeout 30000
```

**配置存储位置：**
- macOS: `~/.config/opencode/config.yaml`
- Linux: `~/.config/opencode/config.yaml`
- Windows: `%APPDATA%\opencode\config.yaml`

## 🔄 重置配置

重置配置为默认值

**用法：**
- 重置所有配置
- 重置特定配置项
- 恢复默认配置文件

**使用场景：**
- 配置出现问题时
- 想要重新开始配置
- 测试默认配置

## 🔧 配置文件详解

### 配置文件结构

```yaml
# 模型配置
model:
  provider: openai
  default: gpt-4o
  temperature: 0.7
  max_tokens: 4096

# API Keys
api_keys:
  openai: sk-xxxxx
  anthropic: sk-ant-xxxxx

# 代理配置
proxy:
  enabled: false
  host: 127.0.0.1
  port: 7890

# 服务器配置
server:
  port: 3000
  host: localhost

# 工具配置
tools:
  bash:
    enabled: true
  read:
    enabled: true
  write:
    enabled: true
```

### 配置优先级

配置的优先级从高到低：
1. 命令行参数
2. 环境变量
3. 项目配置文件
4. 全局配置文件
5. 默认配置

## 🔐 安全配置

### API 密钥管理

推荐使用环境变量存储 API 密钥：

```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加
export OPENAI_API_KEY="sk-xxxxx"
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
```

**不建议在配置文件中存储密钥：**
- 配置文件可能被版本控制
- 多人协作时存在安全风险

### 权限配置

设置文件和目录的访问权限：

```bash
# 设置配置文件权限为仅当前用户可读写
chmod 600 ~/.config/opencode/config.yaml

# 设置配置目录权限为仅当前用户可访问
chmod 700 ~/.config/opencode
```

## 📊 配置验证

### 验证配置

检查配置是否正确

**验证内容：**
- 配置文件语法
- 配置项类型
- 配置值范围
- 必需配置项

### 配置诊断

诊断配置问题并提供修复建议

**诊断项目：**
- API 密钥有效性
- 网络连接状态
- 代理配置正确性
- 服务端口可用性

## 💾 配置备份与恢复

### 导出配置

导出当前配置到文件

```bash
opencode config export > my-config.yaml
```

### 导入配置

从文件导入配置

```bash
opencode config import < my-config.yaml
```

**使用场景：**
- 在不同机器间同步配置
- 备份配置
- 分享配置模板

## 📝 常见问题

### Q: 配置修改后如何生效？

A: 大部分配置修改后立即生效，部分配置需要重启服务。

### Q: 如何在多个项目中使用不同配置？

A: 可以在项目目录下创建 `.opencode.yaml` 文件，项目配置会覆盖全局配置。

### Q: 配置文件损坏怎么办？

A: 使用 `config reset` 命令重置配置，或者从备份恢复。

## 📖 相关文章

- [基础命令](./commands-basics)
- [对话命令](./commands-chat)
- [模型命令](./commands-model)
