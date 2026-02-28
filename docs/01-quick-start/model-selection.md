---
description: OpenCode 模型选择指南，对比主流 AI 模型的性能、成本和适用场景。帮助您根据需求选择最合适的模型，提升使用效率和效果。
keywords: ["OpenCode 模型选择", "AI 模型对比", "模型推荐", "OpenCode 模型列表"]
---

# 模型选择

OpenCode 支持多种主流 AI 模型，不同的模型在性能、成本和适用场景上各有特点。本文将为您详细介绍各类模型的特点、适用场景、成本对比以及选择建议。

无论您需要代码生成、内容创作、数据分析还是复杂推理，都能找到最适合的模型配置。我们还将提供模型切换和调优的最佳实践。

## 模型类型概览 📋

OpenCode 支持三大类模型：

### 1. 💎 商业云端模型

由 OpenAI、Anthropic 等公司提供的在线服务。

**特点：**
- 🚀 性能最强
- 🌐 需要网络连接
- 💰 按使用量付费
- 📡 数据传输到云端

### 2. 🔒 本地部署模型

在本地运行的模型，如 LLaMA、ChatGLM 等。

**特点：**
- 🔒 数据本地化，隐私安全
- 💸 免费使用
- 💻 需要较高硬件配置
- ⏱️ 推理速度较慢

### 3. 🎯 专用任务模型

针对特定任务优化的模型，如代码生成、图像生成等。

**特点：**
- 🎯 任务专精，效率高
- 🎨 支持多模态
- 📊 功能相对单一

---

## 主流模型对比 ⚔️

### OpenAI 系列 🤖

| 模型 | 能力 | 速度 | 成本 | 适用场景 |
|------|------|------|------|----------|
| GPT-4o ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 💰💰💰 | 复杂任务、高质量输出 |
| GPT-4 Turbo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 💰💰 | 平衡性能和速度 |
| GPT-3.5 Turbo | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 💰 | 简单任务、快速响应 |
| GPT-4 Vision | ⭐⭐⭐⭐ | ⭐⭐ | 💰💰💰 | 图像理解、多模态 |

#### GPT-4o 详解 🌟

**特点：**
- 🎯 综合性能最强
- 🌐 支持多语言
- 📸 理解图像
- 🔨 代码能力出色
- 📝 写作质量高

**适用场景：**
```
✅ 复杂代码开发
✅ 深度文本分析
✅ 多模态任务（图像+文本）
✅ 企业级应用
```

**配置示例：**

```yaml
model:
  provider: "openai"
  model: "gpt-4o"
  api_key: "sk-xxxxx"
  temperature: 0.7
  max_tokens: 4000
```

---

### Anthropic 系列 🧠

| 模型 | 能力 | 速度 | 成本 | 适用场景 |
|------|------|------|------|----------|
| Claude 3.5 Sonnet ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 💰💰💰 | 通用任务 |
| Claude 3.5 Haiku | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 💰💰 | 快速响应 |
| Claude 3 Opus | ⭐⭐⭐⭐⭐ | ⭐⭐ | 💰💰💰💰 | 超高质量要求 |

#### Claude 3.5 Sonnet 详解 🌟

**特点：**
- 📖 文本理解能力强
- 🧠 推理逻辑清晰
- 🎨 创作能力出色
- 🛡️ 安全性高
- 💬 对话体验好

**适用场景：**
```
✅ 长文本处理
✅ 创意写作
✅ 复杂逻辑推理
✅ 对话式交互
```

**配置示例：**

```yaml
model:
  provider: "anthropic"
  model: "claude-3-5-sonnet"
  api_key: "sk-ant-xxxxx"
  temperature: 0.7
  max_tokens: 4000
```

---

### 本地开源模型 💻

| 模型 | 能力 | 速度 | 成本 | 适用场景 |
|------|------|------|------|----------|
| LLaMA 3 70B | ⭐⭐⭐⭐ | ⭐⭐ | 💸 | 通用任务 |
| ChatGLM3 | ⭐⭐⭐ | ⭐⭐⭐ | 💸 | 中文优化 |
| Mistral 7B | ⭐⭐⭐ | ⭐⭐⭐⭐ | 💸 | 轻量级任务 |
| DeepSeek Coder | ⭐⭐⭐⭐ | ⭐⭐⭐ | 💸 | 代码专精 |

#### LLaMA 3 详解 🌟

**特点：**
- 🌐 开源免费
- 🔒 数据本地化
- 🎯 多版本可选（7B, 70B）
- 📚 支持多语言

**适用场景：**
```
✅ 隐私敏感场景
✅ 离线使用
✅ 长期高频使用
✅ 成本敏感场景
```

**配置示例：**

```yaml
model:
  provider: "local"
  model: "llama-3-70b"
  model_path: "/path/to/llama-3-70b.gguf"
  temperature: 0.7
  max_tokens: 2000
  gpu_layers: 40  # 使用 GPU 加速
```

---

## 如何选择模型 🎯

### 按使用场景选择 📋

#### 📝 写作和内容创作

**推荐：** GPT-4o, Claude 3.5 Sonnet

```yaml
model:
  provider: "openai"
  model: "gpt-4o"
  temperature: 0.8  # 提高创造性
  max_tokens: 3000
```

#### 💻 代码开发

**推荐：** GPT-4o, DeepSeek Coder

```yaml
model:
  provider: "openai"
  model: "gpt-4o"
  temperature: 0.3  # 降低随机性
  max_tokens: 2000
```

#### 🗣️ 日常对话

**推荐：** GPT-3.5 Turbo, Claude 3.5 Haiku

```yaml
model:
  provider: "openai"
  model: "gpt-3.5-turbo"
  temperature: 0.7
  max_tokens: 1000
```

#### 🔒 隐私敏感场景

**推荐：** LLaMA 3, ChatGLM3

```yaml
model:
  provider: "local"
  model: "llama-3-70b"
  temperature: 0.7
  max_tokens: 1500
```

---

### 按性能需求选择 ⚡

#### 优先考虑速度 🏎️

**场景：** 实时对话、快速生成

**推荐模型：**
1. GPT-3.5 Turbo
2. Claude 3.5 Haiku
3. Mistral 7B

**白话解释：**

就像选择交通工具：
- 🚀 超音速飞机（GPT-3.5 Turbo） - 最快但价格高
- 🚄 高铁（Claude 3.5 Haiku） - 速度快且经济
- 🚗 轿车（Mistral 7B） - 本地运行，免费但需要好车（硬件）

#### 优先考虑质量 🏆

**场景：** 重要文档、代码审查

**推荐模型：**
1. GPT-4o
2. Claude 3.5 Opus
3. LLaMA 3 70B

**白话解释：**

就像选择摄影师：
- 📸 顶级摄影师（GPT-4o） - 质量最高但费用高
- 🎨 艺术家（Claude 3.5 Opus） - 创意独特
- 📱 手机拍照（LLaMA 3） - 免费但质量一般

---

### 按成本考虑选择 💰

#### 成本敏感场景 💸

**推荐：** 本地模型

**成本对比（每月高频使用）：**

| 模型类型 | 月成本 | 优点 | 缺点 |
|----------|--------|------|------|
| GPT-4o | $500+ | 质量最高 | 费用高 |
| GPT-3.5 Turbo | $50+ | 速度快 | 质量一般 |
| 本地 LLaMA 3 | $0（电费）| 免费 | 需要硬件 |

**白话解释：**

就像选择交通工具的长期成本：
- 🚗 租车（云端模型） - 按小时付费，短期便宜但长期贵
- 🚘 买车（本地模型） - 一次投入，长期免费

---

## 模型参数配置 ⚙️

选择模型后，还需要配置合适的参数。

### Temperature（温度）🌡️

控制输出的随机性和创造性。

```yaml
temperature: 0.3  # 范围：0.0 - 2.0
```

**使用指南：**

```
0.0 - 0.3: 确定性输出
  ✅ 代码生成
  ✅ 事实回答
  ✅ 技术文档

0.4 - 0.7: 平衡输出
  ✅ 日常对话
  ✅ 一般性任务
  ✅ 邮件写作

0.8 - 1.2: 创造性输出
  ✅ 故事创作
  ✅ 头脑风暴
  ✅ 创意写作

1.3 - 2.0: 高度随机
  ⚠️ 输出不稳定
  ⚠️ 可能偏离主题
```

**白话解释：**

Temperature 就像控制的"自由度"：
- 🧊 0.1（冰点）= 几乎不变，输出固定
- ☀️ 0.7（室温）= 舒适平衡，既稳定又有创造力
- 🔥 1.5（沸腾）= 完全自由，可能产生惊人结果

### Max Tokens（最大令牌数）📏

控制输出的最大长度。

```yaml
max_tokens: 2000
```

**使用指南：**

```
500-1000:   短对话
  ✅ 快速问答
  ✅ 简单指令

1000-2000:  中等对话
  ✅ 代码片段
  ✅ 文章段落

2000-4000:  长对话
  ✅ 完整代码
  ✅ 详细说明

4000+:      超长对话
  ✅ 长文章
  ✅ 复杂分析
```

**白话解释：**

Max Tokens 就像设定"最大字数"：
- 📝 500字 = 短微博
- 📖 2000字 = 长文章
- 📚 5000字 = 完整章节

---

## 实际案例分析 📊

### 案例 1：创业公司选择模型 🚀

**需求：**
- 💻 主要用于代码开发
- 💸 成本敏感
- 👥 团队 5 人
- 📅 月预算 $200

**推荐方案：**

```yaml
# 主要使用 GPT-3.5 Turbo（性价比高）
default_model:
  provider: "openai"
  model: "gpt-3.5-turbo"
  temperature: 0.3
  max_tokens: 2000

# 复杂任务使用 GPT-4o
premium_model:
  provider: "openai"
  model: "gpt-4o"
  temperature: 0.3
  max_tokens: 3000
```

**成本估算：**
```
GPT-3.5 Turbo: $100/月
GPT-4o: $50/月（偶尔使用）
总计: $150/月 ✅ 符合预算
```

---

### 案例 2：金融机构选择模型 🏦

**需求：**
- 🔒 数据绝对安全
- 💼 代码审查
- 📊 复杂分析
- 🚫 不能使用外部服务

**推荐方案：**

```yaml
# 使用本地模型
local_model:
  provider: "local"
  model: "llama-3-70b"
  temperature: 0.2
  max_tokens: 2000

# 硬件配置
hardware:
  gpu: "NVIDIA A100 80GB"
  cpu: "32核"
  memory: "128GB"
```

**优势：**
```
✅ 数据完全本地化
✅ 无网络传输风险
✅ 符合合规要求
✅ 一次性投入，长期免费
```

---

### 案例 3：个人创作者选择模型 ✍️

**需求：**
- 📝 主要用于内容创作
- 💬 需要对话交互
- 🎨 需要创意输出
- 💰 月预算 $30

**推荐方案：**

```yaml
# 使用 Claude 3.5 Haiku（性价比高）
creator_model:
  provider: "anthropic"
  model: "claude-3-5-haiku"
  temperature: 0.8
  max_tokens: 2000

# 需要高质量时切换
premium_model:
  provider: "anthropic"
  model: "claude-3-5-sonnet"
  temperature: 0.8
  max_tokens: 3000
```

**成本估算：**
```
Claude 3.5 Haiku: $20/月
Claude 3.5 Sonnet: $10/月（偶尔使用）
总计: $30/月 ✅ 符合预算
```

---

## 常见问题 ❓

### Q1: 可以同时使用多个模型吗？🔄

**A:** 可以！OpenCode 支持多模型配置。

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
opencode chat --model llama-3-70b
```

---

### Q2: 模型性能不够怎么办？📈

**A:** 有多种优化方案：

**1. 降低模型复杂度**
```yaml
model: "gpt-4o" → "gpt-3.5-turbo"
```

**2. 减少 Max Tokens**
```yaml
max_tokens: 4000 → 2000
```

**3. 使用本地 GPU 加速**
```yaml
local_model:
  model: "llama-3-70b"
  gpu_layers: 40  # 增加 GPU 使用
```

**4. 缓存常见响应**
```yaml
cache:
  enabled: true
  max_size: 1000
  ttl: 3600  # 1小时
```

---

### Q3: 如何测试模型性能？🧪

**A:** 使用内置的基准测试工具。

```bash
# 运行性能测试
opencode benchmark --model gpt-4o

# 对比多个模型
opencode benchmark --compare gpt-4o,claude-3-5-sonnet,llama-3-70b

# 测试特定任务
opencode benchmark --task code-generation
opencode benchmark --task text-writing
opencode benchmark --task conversation
```

**输出示例：**
```
模型性能对比报告
================

代码生成：
  GPT-4o:         95分 ⭐⭐⭐⭐⭐
  Claude 3.5:       92分 ⭐⭐⭐⭐⭐
  LLaMA 3 70B:     88分 ⭐⭐⭐⭐

文本写作：
  Claude 3.5:       96分 ⭐⭐⭐⭐⭐
  GPT-4o:         94分 ⭐⭐⭐⭐⭐
  LLaMA 3 70B:     85分 ⭐⭐⭐⭐

对话响应：
  GPT-3.5 Turbo:    98分 ⭐⭐⭐⭐⭐
  Claude 3.5 Haiku: 95分 ⭐⭐⭐⭐⭐
  GPT-4o:         90分 ⭐⭐⭐⭐
```

---

### Q4: 本地模型需要什么硬件？💻

**A:** 硬件需求取决于模型大小。

**最低配置：**
```
CPU: 8核+
内存: 16GB
存储: 100GB SSD
模型: LLaMA 3 7B
```

**推荐配置：**
```
CPU: 16核+
内存: 32GB+
存储: 200GB NVMe SSD
GPU: NVIDIA RTX 3090 (24GB VRAM)
模型: LLaMA 3 70B
```

**企业配置：**
```
CPU: 64核+
内存: 128GB+
存储: 1TB NVMe SSD
GPU: NVIDIA A100 80GB
模型: 多个模型并行
```

---

### Q5: 模型更新了怎么办？🆕

**A:** OpenCode 会自动检测更新。

```bash
# 检查模型更新
opencode model check-updates

# 更新模型列表
opencode model update

# 查看可用模型
opencode model list
```

**自动更新配置：**
```yaml
auto_update:
  enabled: true
  check_interval: "24h"  # 每24小时检查一次
  notify: true  # 有更新时通知
```

---

## 下一步 ➡️

选择好模型后，您可以：

1. **配置网络**：查看 [网络配置指南](./network-config)
2. **学习基本使用**：查看 [日常使用](../02-daily-usage/tools)
3. **优化模型参数**：根据实际使用调整参数
4. **实践案例**：查看 [最佳实践](../04-best-practices/workflow-design)

---

## 总结 📝

选择合适的模型是使用 OpenCode 的关键。

**选择模型的关键因素：**

```
🎯 任务类型
  ├─ 写作创作 → Claude 3.5
  ├─ 代码开发 → GPT-4o
  └─ 日常对话 → GPT-3.5 Turbo

💰 成本预算
  ├─ 低预算 → 本地模型
  ├─ 中预算 → GPT-3.5 Turbo
  └─ 高预算 → GPT-4o

🔒 隐私要求
  ├─ 高敏感 → 本地模型
  └─ 低敏感 → 云端模型

⚡ 性能需求
  ├─ 追求速度 → GPT-3.5 Turbo
  └─ 追求质量 → GPT-4o
```

**推荐组合：**

```
🌟 最佳实践组合：
  • 主模型：GPT-4o（高质量）
  • 备用模型：GPT-3.5 Turbo（快速）
  • 本地模型：LLaMA 3 70B（隐私）

💰 经济组合：
  • 主模型：GPT-3.5 Turbo（性价比）
  • 本地模型：Mistral 7B（免费）

🔒 安全组合：
  • 主模型：LLaMA 3 70B（本地）
  • 备用模型：ChatGLM3（中文优化）
```

---

**🎉 找到适合你的模型了吗？**

配置好模型，开始您的 OpenCode 之旅吧！🚀
