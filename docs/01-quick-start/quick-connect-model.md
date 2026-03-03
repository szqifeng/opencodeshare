---
description: OpenCode 模型推荐教程，介绍智谱、OpenAI、Anthropic 等主流 AI 模型的特点和推荐场景。
keywords: ["OpenCode 模型推荐", "模型选择", "GLM-4", "GPT-4", "Claude"]
sidebar_position: 5
---

# 模型推荐

OpenCode 支持连接多种主流 AI 模型提供商，包括智谱、OpenAI、Anthropic 等。本文将介绍这些大模型的特点和推荐使用场景，帮助您选择最适合的模型。

---

## 大模型提供商概览 🌍

### 主流模型对比

| 提供商 | 标志模型 | 特点 | 推荐场景 |
|--------|----------|------|----------|
| **智谱 AI** | GLM-4 | 国内领先、中文优化、快速响应 | 中文应用、快速开发 |
| **OpenAI** | GPT-4o | 综合能力最强、生态丰富 | 复杂任务、高质量输出 |
| **Anthropic** | Claude 3.5 Sonnet | 代码优秀、长上下文 | 代码开发、深度分析 |
| **Google** | Gemini Pro | 多模态、Google 生态 | 视觉任务、Google 集成 |

**选择建议：**
- 🇨🇳 **国内用户推荐智谱**：网络稳定、中文友好、响应快速
- 💻 **代码开发推荐 OpenAI 或 Anthropic**：代码生成能力强
- 🌐 **国际应用推荐 OpenAI**：生态丰富、兼容性好

---

## 连接智谱 AI ⭐ 推荐

> ⭐ **推荐原因**：智谱 AI 是国内领先的 AI 服务提供商，提供 GLM 系列大模型。GLM-4 在推理、代码、智能体综合能力达到开源模型 SOTA 水平。网络稳定，中文优化，响应快速，非常适合国内用户。

### 智谱 GLM 系列

智谱 AI 推出的 GLM 系列大模型在多项评测中达到开源模型 SOTA 水平：

| 模型 | 能力 | 特点 |
|------|------|------|
| **GLM-5** | 最新旗舰 | 智谱最新一代旗舰模型，综合能力达到 SOTA 水平 |
| **GLM-4.7** | 综合能力强 | 推理、代码、智能体综合能力优秀 |
| **GLM-4.5** | 平衡能力 | 性能与成本平衡，适合日常开发 |

**应用场景：**
- 📝 文本写作和内容创作
- 💻 代码生成和调试
- 🔍 知识问答和推理
- 🎨 多模态任务（配合 GLM-4V）

### 注册智谱账号

#### 第一步：打开注册页面

在 OpenCode 控制台中输入以下命令快速打开智谱平台：

```bash
/connect
```

然后在界面中选择 **zhipu**（智谱）提供商。

#### 第二步：通过邀请链接注册

复制以下邀请链接到浏览器打开：

```
https://www.bigmodel.cn/invite?icode=1hMx3Xc4q5I22%2BDSMJdnJP2gad6AKpjZefIo3dVEQyA%3D
```

**注册流程：**

1. 点击邀请链接打开注册页面
2. 填写手机号或邮箱进行注册
3. 完成手机号/邮箱验证
4. 设置登录密码

> 💡 **提示**：邀请码已自动包含在链接中，无需手动输入。

### 🎁 注册福利

通过邀请链接注册可获得：
- **2000 万 Tokens 大礼包**
- 早期访问新模型特权

### 获取智谱 API Key

#### 方式 1：通过终端快速配置

在 OpenCode 控制台输入以下命令，OpenCode 会引导您完成配置：

```bash
/connect
```

选择 **zhipu** 提供商后，按提示操作：
1. 点击智谱平台链接
2. 登录或注册账号
3. 在智谱控制台获取 API Key
4. 将 API Key 粘贴回 OpenCode

#### 方式 2：手动获取 API Key

1. 访问智谱开放平台：https://open.bigmodel.cn/usercenter/apikeys
2. 登录您的账号
3. 点击「创建新的 API Key」
4. 设置 API Key 名称（可选）
5. 点击确认创建
6. **复制生成的 API Key**

**注意：**
- ⚠️ API Key 仅显示一次，请妥善保存
- 📋 建议立即保存到安全的位置

### 在 OpenCode 中配置智谱

#### 方式 1：使用命令快速配置

在 OpenCode 控制台输入以下命令：

```bash
/connect
```

选择 **zhipu** 提供商，输入 API Key 即可完成配置。

#### 方式 2：手动配置文件

编辑或创建 `~/.config/opencode/opencode.jsonc`：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  
  // 配置智谱为主要模型
  "model": "zhipu/glm-4",
  
  // 配置智谱提供商
  "provider": {
    "zhipu": {
      "apiKey": "你的智谱 API Key"
    }
  }
}
```

#### 方式 3：使用环境变量

在 `.bashrc` 或 `.zshrc` 中添加：

```bash
export ZHIPU_API_KEY="你的智谱 API Key"
```

然后在配置文件中引用：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "zhipu": {
      "options": {
        "apiKey": "{env:ZHIPU_API_KEY}"
      }
    }
  }
}
```

### 智谱模型列表

#### GLM-5（最新旗舰）

```jsonc
{
  "model": "zhipu/glm-5"
}
```

**特点：**
- 智谱最新一代旗舰模型
- 推理能力最强
- 代码生成优秀
- 支持长上下文

**适用场景：**
- 复杂问题求解
- 大型项目代码开发
- 深度内容创作

#### GLM-4.7（综合能力）

```jsonc
{
  "model": "zhipu/glm-4.7"
}
```

**特点：**
- 推理、代码、智能体综合能力优秀
- 响应速度快
- 成本较低

**适用场景：**
- 日常代码开发
- 问题分析
- 内容创作

#### GLM-4.5（平衡模型）

```jsonc
{
  "model": "zhipu/glm-4.5"
}
```

**特点：**
- 性能与成本平衡
- 响应速度快
- 适合高频使用

**适用场景：**
- 日常对话
- 快速问答
- 轻量级任务

---

## 连接 OpenAI 🤖

### OpenAI 模型系列

| 模型 | 能力 | 特点 |
|------|------|------|
| **GPT-4o** | 综合能力最强 | OpenAI 旗舰模型，多模态能力 |
| **GPT-4o-mini** | 快速响应 | 轻量级模型，成本更低 |
| **GPT-3.5-Turbo** | 高性价比 | 经典模型，性能稳定 |

### 获取 OpenAI API Key

1. 访问 OpenAI 官网：https://platform.openai.com/api-keys
2. 登录您的账号
3. 点击 "Create new secret key"
4. 复制生成的 API Key

### 配置 OpenAI

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-4o",
  "provider": {
    "openai": {
      "apiKey": "你的 OpenAI API Key"
    }
  }
}
```

---

## 连接 Anthropic 🧠

### Anthropic 模型系列

| 模型 | 能力 | 特点 |
|------|------|------|
| **Claude 3.5 Sonnet** | 代码优秀 | 代码生成能力强，推理优秀 |
| **Claude 3.5 Haiku** | 快速响应 | 轻量级模型，响应快速 |

### 获取 Anthropic API Key

1. 访问 Anthropic Console：https://console.anthropic.com/settings/keys
2. 登录您的账号
3. 点击 "Create Key"
4. 复制生成的 API Key

### 配置 Anthropic

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-3-5-sonnet-20240620",
  "provider": {
    "anthropic": {
      "apiKey": "你的 Anthropic API Key"
    }
  }
}
```

---

## 测试连接 ✅

### 验证配置是否成功

```bash
# 测试智谱连接
opencode test --provider zhipu

# 测试 OpenAI 连接
opencode test --provider openai

# 测试 Anthropic 连接
opencode test --provider anthropic

# 测试所有配置
opencode test --all
```

### 开始使用

```bash
# 启动对话
opencode chat

# 在对话中指定模型
opencode chat --model zhipu/glm-4
opencode chat --model openai/gpt-4o
opencode chat --model anthropic/claude-3-5-sonnet
```

---

## 常用配置示例 📝

### 智谱开发环境配置

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "zhipu/glm-4",
  "small_model": "zhipu/glm-3-turbo",
  "provider": {
    "zhipu": {
      "options": {
        "timeout": 120000,
        "apiKey": "{env:ZHIPU_API_KEY}"
      }
    }
  },
  "autoupdate": true
}
```

### OpenAI 生产环境配置

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/gpt-4o",
  "small_model": "openai/gpt-4o-mini",
  "provider": {
    "openai": {
      "options": {
        "timeout": 60000,
        "apiKey": "{file:~/.secrets/openai-key}"
      }
    }
  },
  "permission": {
    "bash": "allow",
    "edit": "allow"
  }
}
```

---

## 常见问题 ❓

### Q1: 智谱 API Key 失效怎么办？

**A:** 请检查以下几点：
1. 确认 API Key 是否正确复制
2. 检查智谱账号状态
3. 查看剩余 Token 余额
4. 重新生成 API Key 尝试

### Q2: 如何切换到其他提供商？

**A:** 有以下方式：

```bash
# 临时切换
opencode chat --model zhipu/glm-4
opencode chat --model openai/gpt-4o
opencode chat --model anthropic/claude-3-5-sonnet

# 修改默认模型
opencode config set model zhipu/glm-4
```

### Q3: Token 不足怎么办？

**A:** 可以在对应提供商控制台充值：
- 智谱：https://open.bigmodel.cn/usercenter/billing
- OpenAI：https://platform.openai.com/account/billing
- Anthropic：https://console.anthropic.com/settings/billing

### Q4: 不同模型如何选择？

**A:** 根据场景选择：

| 场景 | 推荐模型 |
|------|----------|
| 代码开发 | GLM-4, GPT-4o, Claude 3.5 Sonnet |
| 日常对话 | GLM-3-Turbo, GPT-3.5-Turbo, Claude 3.5 Haiku |
| 内容创作 | GLM-4, GPT-4o, Claude 3.5 Sonnet |
| 快速响应 | GLM-4-Flash, GPT-4o-mini, Claude 3.5 Haiku |

---

## 下一步 ➡️

连接大模型后，您可以：

1. **开始使用**：查看 [快速体验](./quick-experience)
2. **学习工具**：查看 [工具介绍](./tools-intro)
3. **学习工作流**：查看 [工作流](./workflow)

---

## 总结 📝

**配置清单：**

```
✅ 选择提供商
  [ ] 智谱 AI（推荐国内用户）
  [ ] OpenAI
  [ ] Anthropic

✅ 注册账号
  [ ] 智谱：邀请码 /connect
  [ ] OpenAI：官网注册
  [ ] Anthropic：官网注册

✅ 获取 API Key
  [ ] 访问控制台
  [ ] 创建 API Key
  [ ] 妥善保存

✅ 配置 OpenCode
  [ ] 使用命令或手动配置
  [ ] 选择合适的模型
  [ ] 测试连接成功

✅ 开始使用
  [ ] 启动对话
  [ ] 体验强大模型能力
```

---

**🎉 恭喜！**

您已成功连接大模型到 OpenCode，现在可以使用强大的 AI 能力了！🚀

**智谱邀请码：** `/connect`

**智谱邀请链接：**

```
https://www.bigmodel.cn/invite?icode=1hMx3Xc4q5I22%2BDSMJdnJP2gad6AKpjZefIo3dVEQyA%3D
```
