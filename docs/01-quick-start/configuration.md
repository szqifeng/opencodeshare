---
description: OpenCode 配置指南，包括网络代理配置、API Key 配置、AI 模型选择等。帮助您完成 OpenCode 的完整配置，确保系统正常运行。
keywords: ["OpenCode 配置", "网络配置", "模型选择", "API Key 配置"]
---

# 配置

OpenCode 的正常运行依赖于正确的网络配置和合适的模型选择。本文将详细介绍如何配置网络代理、设置 API Key、选择合适的 AI 模型。

## 网络配置 🌐

### API Key 配置 🔑

OpenCode 支持多个 AI 服务的 API Key：

#### 获取 API Key

**OpenAI API Key:**
1. 访问 OpenAI 官网
2. 登录您的账户
3. 进入 API 设置页面
4. 点击"Create new secret key"
5. 复制生成的 API Key

**Anthropic API Key:**
1. 访问 Anthropic Console
2. 登录您的账户
3. 进入 API Keys 页面
4. 点击"Create Key"
5. 复制生成的 API Key

#### 配置 API Key

**配置文件方式：**

编辑配置文件 `~/.opencode/config.yaml`：

```yaml
# OpenAI 配置
openai:
  api_key: "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
  base_url: "https://api.openai.com/v1"
  organization: "org-xxxxxxxx"

# Anthropic 配置
anthropic:
  api_key: "sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
  base_url: "https://api.anthropic.com"
  version: "2023-06-01"
```

**环境变量方式：**

在 `.bashrc` 或 `.zshrc` 中添加：

```bash
# OpenAI
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
export OPENAI_BASE_URL="https://api.openai.com/v1"

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
export ANTHROPIC_BASE_URL="https://api.anthropic.com"
```

重新加载配置：

```bash
source ~/.bashrc
```

### 代理配置 🛡️

#### 国内网络环境 🇨🇳

**使用国内镜像：**

```yaml
mirrors:
  openai:
    base_url: "https://api.openai-proxy.com/v1"
    backup_url: "https://api.openai-backup.com/v1"
  
  anthropic:
    base_url: "https://api.anthropic-proxy.com"
```

**配置系统代理：**

编辑环境变量：

```bash
# HTTP 代理
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"

# 不使用代理的地址
export NO_PROXY="localhost,127.0.0.1"
```

在 `.bashrc` 中持久化：

```bash
echo 'export HTTP_PROXY="http://127.0.0.1:7890"' >> ~/.bashrc
source ~/.bashrc
```

**配置 OpenCode 专用代理：**

在配置文件中指定：

```yaml
proxy:
  enabled: true
  type: "http"
  host: "127.0.0.1"
  port: 7890
  username: ""
  password: ""
  
  no_proxy:
    - "localhost"
    - "127.0.0.1"
    - "192.168.*"
```

### 连接测试 🧪

**测试 API 连通性：**

```bash
# 测试 OpenAI API
opencode test --provider openai --endpoint

# 测试所有配置的 API
opencode test --all
```

**测试代理连接：**

```bash
# 测试代理连接
opencode test --proxy

# 检查代理延迟
opencode test --proxy --latency
```

---

## 模型选择 🤖

OpenCode 支持多种主流 AI 模型，不同的模型在性能、成本和适用场景上各有特点。

### 主流模型对比

| 模型 | 能力 | 速度 | 成本 | 适用场景 |
|------|------|------|------|----------|
| GPT-4o ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 💰💰💰 | 复杂任务、高质量输出 |
| GPT-3.5 Turbo | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 💰 | 简单任务、快速响应 |
| Claude 3.5 Sonnet | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 💰💰💰 | 通用任务、长文本处理 |
| Claude 3.5 Haiku | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 💰💰 | 快速响应 |
| LLaMA 3 70B | ⭐⭐⭐⭐ | ⭐⭐ | 💸 | 通用任务、隐私场景 |

### 按使用场景选择

**📝 写作和内容创作：**

推荐：GPT-4o, Claude 3.5 Sonnet

```yaml
model:
  provider: "openai"
  model: "gpt-4o"
  temperature: 0.8
  max_tokens: 3000
```

**💻 代码开发：**

推荐：GPT-4o

```yaml
model:
  provider: "openai"
  model: "gpt-4o"
  temperature: 0.3
  max_tokens: 2000
```

**🗣️ 日常对话：**

推荐：GPT-3.5 Turbo, Claude 3.5 Haiku

```yaml
model:
  provider: "openai"
  model: "gpt-3.5-turbo"
  temperature: 0.7
  max_tokens: 1000
```

**🔒 隐私敏感场景：**

推荐：LLaMA 3, ChatGLM3

```yaml
model:
  provider: "local"
  model: "llama-3-70b"
  temperature: 0.7
  max_tokens: 1500
```

### 模型参数配置

**Temperature（温度）：**

控制输出的随机性和创造性。

```yaml
temperature: 0.3  # 范围：0.0 - 2.0
```

- 0.0 - 0.3: 确定性输出（代码生成、事实回答）
- 0.4 - 0.7: 平衡输出（日常对话、一般性任务）
- 0.8 - 1.2: 创造性输出（故事创作、头脑风暴）

**Max Tokens（最大令牌数）：**

控制输出的最大长度。

```yaml
max_tokens: 2000
```

- 500-1000: 短对话（快速问答、简单指令）
- 1000-2000: 中等对话（代码片段、文章段落）
- 2000-4000: 长对话（完整代码、详细说明）

---

## 下一步

配置完成后，您可以：

1. **开始使用**：查看 [快速体验](./quick-experience)
2. **学习基本使用**：查看 [日常使用](../02-daily-usage/tools)

---

## 常见问题

### Q1: API Key 失效怎么办？

检查并更新 API Key：

```bash
# 验证 API Key 有效性
opencode verify --api-key sk-xxxxx

# 查看剩余配额
opencode quota --provider openai

# 更新 API Key
opencode config set openai.api_key sk-xxxxxxxxx
```

### Q2: 代理配置后仍无法连接？

逐步排查代理问题：

```bash
# 检查代理进程
lsof -ti :7890

# 测试代理连接
curl -x http://127.0.0.1:7890 https://www.google.com

# 查看当前代理配置
opencode config get proxy

# 测试代理连接
opencode test --proxy
```

### Q3: 可以同时使用多个模型吗？

可以！OpenCode 支持多模型配置：

```yaml
models:
  - provider: "openai"
    model: "gpt-4o"
  
  - provider: "anthropic"
    model: "claude-3-5-sonnet"
  
  - provider: "local"
    model: "llama-3-70b"
```

使用时可以通过命令指定：

```bash
opencode chat --model gpt-4o
opencode chat --model claude-3-5-sonnet
```

---

**🎉 配置完成！**

现在可以开始使用 OpenCode 了！🚀
