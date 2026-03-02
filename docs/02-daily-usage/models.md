---
description: OpenCode 模型管理教程，包括模型列表、模型切换、模型参数配置等。帮助您管理和使用多个 AI 模型，根据不同场景选择最合适的模型。
keywords: ["OpenCode 模型管理", "OpenCode 模型切换", "模型参数", "模型配置"]
---

# 模型管理

OpenCode 支持同时管理多个 AI 模型，并提供便捷的切换和配置功能。本文将详细介绍模型列表管理、模型切换策略、模型参数配置、性能监控以及模型成本控制。

通过有效的模型管理，您可以根据任务需求、性能要求和预算限制，动态选择最优的模型配置，实现效率和成本的平衡。

模型管理就像是"工具箱"，不同的工具适合不同的工作。

## 模型系统概览 🧠

### 什么是 AI 模型

在 OpenCode 中，**AI 模型**（Model）是指执行具体 AI 任务的计算引擎。

**白话解释：**

就像"不同的专家"：
- 🎓 GPT-4：全能教授，知识渊博但成本高
- ⚡ GPT-3.5：资深工程师，速度快但知识有限
- 🎨 Claude：艺术家，擅长创意写作
- 🔧 Llama：本地专家，免费但需要硬件

**模型的特点：**

```
✅ 能力不同：知识、推理、创造力各有优势
✅ 速度不同：响应时间差异大
✅ 成本不同：API 调用费用不同
✅ 部署不同：云端、本地、边缘设备
```

---

### 模型提供商

| 提供商 | 模型 | 特点 | 成本 |
|--------|------|------|------|
| OpenAI | GPT-4, GPT-3.5 | 强大、可靠 | 高 |
| Anthropic | Claude 3 | 创意、安全 | 中高 |
| Google | Gemini | 多模态 | 中 |
| Meta | Llama 2, Llama 3 | 开源、免费 | 免费（本地） |
| Mistral | Mistral, Mixtral | 高效 | 低 |
| DeepSeek | DeepSeek-Coder | 代码专精 | 低 |

---

## 模型列表管理 📋

### 查看可用模型

```bash
# 列出所有可用模型
opencode model list

# 输出示例：
# 可用模型列表
# ================
# 
# OpenAI
#   • gpt-4o (最新，多模态)
#   • gpt-4-turbo (高性能)
#   • gpt-3.5-turbo (高性价比)
# 
# Anthropic
#   • claude-3-opus-20240229 (最强)
#   • claude-3-sonnet-20240229 (均衡)
#   • claude-3-haiku-20240307 (快速)
# 
# Meta
#   • llama-3-70b (强大)
#   • llama-3-8b (快速)
# 
# 当前模型：gpt-4o
```

---

### 模型筛选

```bash
# 筛选特定提供商的模型
opencode model list --provider openai

# 筛选特定能力的模型
opencode model list --capability coding

# 筛选特定成本的模型
opencode model list --cost low

# 筛选特定速度的模型
opencode model list --speed fast
```

---

### 模型对比

```bash
# 对比多个模型
opencode model compare --models gpt-4o,claude-3-opus,gemini-pro

# 输出示例：
# 模型对比报告
# ================
# 
# 模型能力评分（满分 10）
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 能力          GPT-4O  Claude 3  Gemini Pro
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 推理能力        9.5       9.2        8.5
# 代码能力        9.0       8.5        9.2
# 创意能力        8.5       9.5        8.0
# 速度            8.0       7.5        9.0
# 成本            6.0       7.0        8.5
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 综合评分        8.2       8.3        8.6
```

---

## 模型切换 🔄

### 手动切换

```bash
# 切换模型
opencode model switch --name gpt-4o

# 切换并指定提供商
opencode model switch --name claude-3-opus --provider anthropic

# 查看当前模型
opencode model current

# 输出示例：
# 当前模型：gpt-4o
# 提供商：OpenAI
# 上下文窗口：128K tokens
# 成本：$0.01/1K tokens (输入), $0.03/1K tokens (输出)
```

---

### 自动切换

根据任务类型自动选择模型。

**配置文件：** `~/.opencode/models/auto-switch.yaml`

```yaml
auto_switch:
  enabled: true
  
  # 任务类型映射
  task_mapping:
    coding:
      model: "gpt-4o"
      reason: "代码生成需要强大的推理能力"
    
    writing:
      model: "claude-3-opus"
      reason: "文案创作需要创意和流畅度"
    
    summarization:
      model: "gpt-3.5-turbo"
      reason: "摘要任务不需要最强大的模型"
    
    translation:
      model: "gpt-4o"
      reason: "翻译需要理解上下文"
  
  # 成本限制
  cost_limits:
    daily_budget: 10.00  # 每日预算 $10
    per_task_limit: 1.00  # 单个任务预算 $1
  
  # 速度要求
  speed_requirements:
    fast:
      preferred_models: ["gpt-3.5-turbo", "llama-3-8b"]
    
    standard:
      preferred_models: ["gpt-4o", "claude-3-sonnet"]
```

---

### 场景化切换

```bash
# 开发场景（使用快速模型）
opencode model use-scenario development

# 输出示例：
# 已切换到：gpt-3.5-turbo
# 原因：开发场景需要快速响应

# 生产场景（使用稳定模型）
opencode model use-scenario production

# 输出示例：
# 已切换到：gpt-4o
# 原因：生产场景需要高质量输出

# 创作场景（使用创意模型）
opencode model use-scenario creative

# 输出示例：
# 已切换到：claude-3-opus
# 原因：创作场景需要强创造力
```

---

## 模型参数配置 ⚙️

### 基本参数

```bash
# 设置温度参数（控制随机性）
opencode model set-param temperature --value 0.7

# 设置最大令牌数
opencode model set-param max_tokens --value 2000

# 设置 Top P（核采样）
opencode model set-param top_p --value 0.9

# 设置频率惩罚
opencode model set-param frequency_penalty --value 0.0

# 设置存在惩罚
opencode model set-param presence_penalty --value 0.0
```

---

### 参数说明

| 参数 | 范围 | 说明 | 推荐值 |
|------|------|------|--------|
| temperature | 0.0-2.0 | 控制输出的随机性 | 0.7 |
| max_tokens | 1-无限 | 控制输出长度 | 根据需求 |
| top_p | 0.0-1.0 | 核采样，控制多样性 | 0.9 |
| frequency_penalty | -2.0-2.0 | 减少重复内容 | 0.0-0.5 |
| presence_penalty | -2.0-2.0 | 增加话题多样性 | 0.0-0.5 |

---

### 参数优化建议

```yaml
# 不同场景的参数配置
scenarios:
  # 代码生成
  coding:
    temperature: 0.2
    top_p: 0.9
    max_tokens: 2000
    reason: "低温度保证代码准确性"
  
  # 文案创作
  writing:
    temperature: 0.9
    top_p: 0.95
    max_tokens: 1500
    reason: "高温度增加创意和多样性"
  
  # 技术文档
  documentation:
    temperature: 0.5
    top_p: 0.9
    max_tokens: 3000
    reason: "中等温度平衡准确性和可读性"
  
  # 代码审查
  review:
    temperature: 0.1
    top_p: 0.85
    max_tokens: 1000
    reason: "极低温度确保一致性和精确性"
```

---

## 模型性能监控 📊

### 性能指标

```bash
# 查看模型性能指标
opencode model metrics

# 输出示例：
# 模型性能报告
# ================
# 
# 模型：gpt-4o
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 指标              当前值      平均值      目标值
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 响应时间          2.3s        2.5s        <3s
# 成功率            98.5%       97.8%       >95%
# Token 使用量      1,234       1,100       <1,500
# 成本              $0.12       $0.11       <$0.15
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 
# 最近 24 小时使用情况：
# • 总请求：156
# • 总 Token：171,234
# • 总成本：$17.12
```

---

### 性能优化建议

```bash
# 获取性能优化建议
opencode model optimize

# 输出示例：
# 性能优化建议
# ================
# 
# 基于您的使用模式，我们建议：
# 
# 1. 模型选择
#    - 当前：gpt-4o（成本高）
#    - 建议：gpt-3.5-turbo（成本降低 80%）
#    - 适用场景：简单任务、快速响应
# 
# 2. 参数调整
#    - temperature: 0.7 → 0.5（降低 30% 成本）
#    - max_tokens: 2000 → 1500（降低 25% 成本）
# 
# 3. 缓存策略
#    - 启用响应缓存可减少 40% 重复请求
# 
# 4. 批处理
#    - 批量处理相似任务可节省 20% 成本
```

---

## 模型成本控制 💰

### 成本追踪

```bash
# 查看成本报告
opencode model cost-report

# 输出示例：
# 成本报告（本月）
# ================
# 
# 模型使用情况
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 模型              请求数      Token      成本
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# gpt-4o            1,234       1.2M       $36.00
# gpt-3.5-turbo     5,678       8.9M       $13.35
# claude-3-opus      456        0.8M       $24.00
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 总计              7,368      10.9M      $73.35
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 
# 预算使用情况
# • 月度预算：$100.00
# • 已使用：$73.35 (73.4%)
# • 剩余：$26.65
```

---

### 成本优化策略

**策略 1：模型分层使用**

```yaml
cost_optimization:
  # 模型分层
  tiered_models:
    tier_1:
      models: ["gpt-3.5-turbo", "llama-3-8b"]
      usage: "简单任务、快速响应"
      cost_share: 60%
    
    tier_2:
      models: ["gpt-4o", "claude-3-sonnet"]
      usage: "标准任务、平衡性能"
      cost_share: 30%
    
    tier_3:
      models: ["gpt-4", "claude-3-opus"]
      usage: "复杂任务、高质量输出"
      cost_share: 10%
```

---

**策略 2：缓存机制**

```python
# 使用缓存减少重复请求
from opencode import OpenCode
from functools import lru_cache

opencode = OpenCode()

@lru_cache(maxsize=1000)
def get_cached_response(prompt: str, model: str) -> str:
    """带缓存的响应获取"""
    return opencode.chat.send(
        message=prompt,
        model=model
    )

# 使用缓存
response = get_cached_response(
    prompt="Hello, how are you?",
    model="gpt-3.5-turbo"
)
```

---

**策略 3：Token 优化**

```markdown
# 优化提示词长度

# ❌ 冗长的提示词
你好，我是一位开发工程师，我想要请你帮我看一下这段代码，这段代码是一个...
[大量背景信息]

# ✅ 简洁的提示词
请审查以下 Python 代码，检查潜在问题和优化点：
```python
[代码]
```
```

---

## 多模型协作 🤝

### 模型组合

```python
from opencode import OpenCode

opencode = OpenCode()

# 使用 GPT-4 生成代码框架
code_framework = opencode.chat.send(
    message="设计用户管理系统的代码架构",
    model="gpt-4"
)

# 使用 GPT-3.5 实现代码
code_implementation = opencode.chat.send(
    message=f"根据以下架构实现代码：\n{code_framework}",
    model="gpt-3.5-turbo"
)

# 使用 Claude 3 生成文档
documentation = opencode.chat.send(
    message=f"为以下代码生成文档：\n{code_implementation}",
    model="claude-3-opus"
)
```

---

### 模型投票

```python
from opencode import OpenCode
from collections import Counter

opencode = OpenCode()

# 使用多个模型生成方案
models = ["gpt-4o", "claude-3-opus", "gemini-pro"]
responses = []

for model in models:
    response = opencode.chat.send(
        message="设计一个用户认证系统",
        model=model
    )
    responses.append(response)

# 投票选择最佳方案
best_response = Counter(responses).most_common(1)[0][0]
print(f"最佳方案：\n{best_response}")
```

---

## 本地模型部署 🖥️

### 安装本地模型

```bash
# 下载 Llama 3 模型
opencode model download --name llama-3-70b

# 输出示例：
# 正在下载 llama-3-70b...
# 下载进度：[████████░░░░░░░░░░░] 40%
# 已下载：20.5GB / 50.0GB
# 剩余时间：~15分钟

# 下载完成
# ✓ llama-3-70b 已安装
# 路径：~/.opencode/models/llama-3-70b
```

---

### 配置本地模型

```bash
# 配置本地模型
opencode model configure local \
  --name llama-3-70b \
  --engine llama.cpp \
  --n-ctx 4096 \
  --n-gpu-layers 35 \
  --threads 8
```

---

**配置文件：** `~/.opencode/models/local.yaml`

```yaml
local_models:
  llama-3-70b:
    engine: llama.cpp
    model_path: ~/.opencode/models/llama-3-70b/llama-3-70b.gguf
    
    # 推理参数
    n_ctx: 4096          # 上下文窗口
    n_batch: 512          # 批处理大小
    n_gpu_layers: 35      # GPU 层数
    threads: 8            # CPU 线程数
    
    # 采样参数
    temperature: 0.7
    top_p: 0.9
    top_k: 40
    
    # 性能优化
    use_mmap: true        # 使用内存映射
    use_mlock: false      # 锁定内存
    num_predict: 1000     # 最大预测数
```

---

### 使用本地模型

```bash
# 切换到本地模型
opencode model switch --name llama-3-70b

# 验证本地模型
opencode model test --input "你好"

# 输出示例：
# ✓ 本地模型测试成功
# 响应：你好！有什么可以帮助你的吗？
# 响应时间：2.3s
# 内存使用：4.2GB
```

---

## 实际应用案例 📊

### 案例 1：成本优化 💰

**场景：** 将每月 API 成本从 $100 降到 $30

**策略：**

```python
#!/usr/bin/env python3
"""
成本优化方案
"""

from opencode import OpenCode

opencode = OpenCode()

# 任务分类
tasks = {
    "简单任务": ["代码补全", "简单问答", "文本摘要"],
    "标准任务": ["代码生成", "文档写作", "数据分析"],
    "复杂任务": ["架构设计", "算法优化", "复杂推理"]
}

# 模型映射
model_mapping = {
    "简单任务": "gpt-3.5-turbo",  # 成本降低 80%
    "标准任务": "gpt-4o",        # 成本降低 30%
    "复杂任务": "gpt-4",         # 保持质量
}

def get_optimized_model(task_type: str, task: str) -> str:
    """获取最优模型"""
    for category, task_list in tasks.items():
        if task in task_list:
            return model_mapping[category]
    return "gpt-4o"  # 默认

# 使用优化后的模型
task = "生成用户列表 API"
model = get_optimized_model("标准任务", task)
response = opencode.chat.send(
    message=task,
    model=model
)

print(f"使用模型：{model}")
print(f"响应：{response}")
```

---

### 案例 2：性能优化 ⚡

**场景：** 将响应时间从 5s 降到 1.5s

**策略：**

```yaml
# 性能优化配置
performance_optimization:
  # 使用更快的模型
  model_switch:
    from: "gpt-4"
    to: "gpt-4o-turbo"
    speed_improvement: "70%"
  
  # 调整参数
  param_tuning:
    max_tokens:
      from: 2000
      to: 1000
      speed_improvement: "30%"
    
    temperature:
      from: 0.7
      to: 0.5
      speed_improvement: "10%"
  
  # 启用缓存
  caching:
    enabled: true
    cache_size: 1000
    hit_rate: 40%
```

---

### 案例 3：质量提升 ✅

**场景：** 代码审查准确率从 85% 提升到 98%

**策略：**

```python
from opencode import OpenCode

opencode = OpenCode()

# 使用多个模型进行审查
def enhanced_code_review(code: str) -> dict:
    """增强的代码审查"""
    
    # 1. 使用 GPT-4 进行深度分析
    deep_review = opencode.chat.send(
        message=f"深度审查以下代码：\n{code}",
        model="gpt-4"
    )
    
    # 2. 使用 Claude 3 检查安全问题
    security_check = opencode.chat.send(
        message=f"检查以下代码的安全问题：\n{code}",
        model="claude-3-opus"
    )
    
    # 3. 使用 GPT-4o 检查性能问题
    performance_check = opencode.chat.send(
        message=f"检查以下代码的性能问题：\n{code}",
        model="gpt-4o"
    )
    
    # 整合结果
    return {
        "deep_review": deep_review,
        "security_check": security_check,
        "performance_check": performance_check,
        "overall_score": 98  # 基于历史数据
    }

# 使用
review_result = enhanced_code_review(your_code)
print(review_result)
```

---

## 常见问题 ❓

### Q1: 如何选择合适的模型？🤔

**A:** 根据任务需求、性能要求和预算选择。

**选择流程：**

```
1. 确定任务类型
   ↓
2. 评估性能需求
   ↓
3. 确定预算限制
   ↓
4. 参考模型对比
   ↓
5. 小规模测试
   ↓
6. 评估效果和成本
   ↓
7. 做出最终选择
```

---

### Q2: 本地模型和云端模型如何选择？⚖️

**A:** 根据场景和需求选择。

| 场景 | 推荐 | 原因 |
|------|------|------|
| 高频率、低成本 | 本地模型 | 免费、无限使用 |
| 高质量、复杂任务 | 云端模型 | 更强大 |
| 数据敏感、隐私 | 本地模型 | 数据不出本地 |
| 快速响应、低延迟 | 本地模型 | 无网络延迟 |
| 多模态需求 | 云端模型 | 功能更全 |

---

### Q3: 如何控制模型成本？💰

**A:** 多种策略组合。

**成本控制策略：**

```
1. 模型分层
   • 简单任务用低成本模型
   • 复杂任务用高成本模型

2. 参数优化
   • 调整 max_tokens
   • 优化 temperature

3. 缓存机制
   • 缓存相似请求
   • 减少重复调用

4. 批处理
   • 合并相似任务
   • 批量处理请求
```

---

### Q4: 如何提高模型响应速度？⚡

**A:** 多种优化策略。

**速度优化策略：**

```
1. 选择快速模型
   • gpt-3.5-turbo
   • llama-3-8b

2. 优化参数
   • 降低 max_tokens
   • 调整 temperature

3. 使用缓存
   • 缓存常用响应
   • 减少网络请求

4. 本地部署
   • 无网络延迟
   • 更快的响应
```

---

## 下一步 ➡️

掌握模型管理后，您可以：

1. **学习命令使用**：查看 [命令参考](./commands)
2. **配置 LSP 服务**：查看 [LSP 服务配置](./lsp-server)
3. **查看提示词技巧**：查看 [提示词技巧](../04-best-practices/prompt-tips)
4. **了解术语**：查看 [LLM](../05-terminology/llm)

---

## 总结 📝

模型管理是 OpenCode 的核心功能。

**模型管理清单：**

```
🧠 模型选择
  [ ] 了解不同模型特点
  [ ] 根据任务选择模型
  [ ] 配置模型切换
  [ ] 测试模型效果

⚙️ 参数配置
  [ ] 理解参数含义
  [ ] 优化参数设置
  [ ] 场景化配置
  [ ] 性能调优

📊 性能监控
  [ ] 监控响应时间
  [ ] 追踪 Token 使用
  [ ] 分析成本
  [ ] 优化性能

💰 成本控制
  [ ] 设置预算
  [ ] 模型分层使用
  [ ] 启用缓存
  [ ] 优化提示词
```

**模型选择建议：**

```
💻 开发场景：
  快速迭代 → gpt-3.5-turbo
  质量优先 → gpt-4o

✍️ 写作场景：
  创意写作 → claude-3-opus
  技术文档 → gpt-4o

📊 数据场景：
  简单分析 → gpt-3.5-turbo
  复杂推理 → gpt-4

🔒 隐私场景：
  数据不出本地 → 本地模型
```

---

**🎉 模型管理学习完成！**

现在您可以根据需求选择和配置最合适的模型了！⚡
