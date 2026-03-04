---
description: OpenCode 代理配置教程，包括单代理、多代理、代理切换等功能。帮助您配置和管理 OpenCode 的代理系统，实现更灵活的 AI 助手使用方式。
keywords: ["OpenCode 代理配置", "OpenCode 代理", "多代理配置", "代理管理"]
---

# 代理配置

OpenCode 的代理系统支持单个或多个 AI 代理的配置和切换，让您能够针对不同的任务使用最适合的代理。通过合理配置代理，您可以实现任务的专业化分工、负载均衡和容错机制，提升整体工作效率。

代理就像是"专业化的 AI 助手团队"，每个代理专精于某个领域，可以更好地完成特定任务。

## 代理系统概览 🤖

### 什么是代理

在 OpenCode 中，**代理**（Agent）是指具有特定角色、规则和能力的 AI 助手实例。

**白话解释：**

就像"专业化的团队"：
- 👨‍💻 张三：专精于编程开发
- ✍️ 李四：专精于文案写作
- 🎨 王五：专精于设计创作
- 📊 赵六：专精于数据分析

当你需要编程时，找张三；需要写作时，找李四。每个人都有自己的专业领域！

**代理的特点：**

```
✅ 专业化：每个代理专精于某个领域
✅ 可定制：为代理设置专属规则和工具
✅ 可切换：随时切换到合适的代理
✅ 可协作：多个代理协同完成复杂任务
```

---

## 代理类型 📊

| 代理类型 | 说明 | 适用场景 | 示例 |
|---------|------|---------|------|
| 💻 代码代理 | 专精编程开发 | 代码生成、调试、审查 | "编程专家" |
| ✍️ 文案代理 | 专精内容创作 | 文案写作、翻译、润色 | "文案顾问" |
| 📊 数据代理 | 专精数据分析 | 数据分析、统计、可视化 | "数据分析师" |
| 🎨 创意代理 | 专精创意设计 | 设计、创意构思 | "创意总监" |
| 📚 教学代理 | 专知识教学 | 教学、学习辅导 | "私人教师" |

---

## 单代理配置 🎯

### 创建代理

#### 方式 1：通过配置文件 📝

在 `~/.opencode/agents/coder.yaml` 中定义：

```yaml
agent:
  name: "代码专家"
  id: "coder"
  description: "专精于编程开发的 AI 代理"
  
  # 角色设定
  role: |
    你是一位资深的软件工程师，专精于：
    • 代码编写和优化
    • Bug 诊断和修复
    • 代码审查和重构
    • 技术方案设计
    
    回答时：
    • 使用专业的技术术语
    • 提供完整的代码示例
    • 包含必要的注释
    • 说明代码的优缺点
  
  # 能力配置
  capabilities:
    - "code_generation"
    - "code_review"
    - "debugging"
    - "optimization"
  
  # 可用工具
  tools:
    - "python.execute"
    - "file.read"
    - "file.write"
    - "web.search"
  
  # 适用语言
  languages:
    - "python"
    - "javascript"
    - "java"
    - "go"
  
  # 规则配置
  rules:
    - "code_style"
    - "best_practices"
```

#### 方式 2：通过对话设置 💬

```
用户：创建一个叫"文案专家"的代理，专精于小红书文案

OpenCode：好的，已创建代理"文案专家"。

代理配置：
• 名称：文案专家
• 专精：小红书文案创作
• 风格：热情、活泼
• 特点：使用表情符号、短句、标签

现在可以使用"文案专家"代理了！
```

---

### 使用代理

```bash
# 启动代理
opencode agent start --name coder

# 切换代理
opencode agent switch --name coder

# 查看当前代理
opencode agent current

# 使用代理对话
用户：帮我写一个 Python 函数

OpenCode（代码专家）：
```python
def quick_sort(arr):
    """快速排序算法实现"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# 时间复杂度：O(n log n)
# 空间复杂度：O(n)
```
```

---

## 多代理配置 🤖

### 创建多个代理

在 `~/.opencode/agents/` 目录下创建多个代理配置：

**代码专家（coder.yaml）**

```yaml
agent:
  name: "代码专家"
  id: "coder"
  role: "资深软件工程师"
  capabilities: ["code_generation", "debugging"]
  tools: ["python.execute", "file.read"]
```

**文案顾问（writer.yaml）**

```yaml
agent:
  name: "文案顾问"
  id: "writer"
  role: "资深文案策划"
  capabilities: ["content_writing", "translation"]
  tools: ["web.search", "spell_check"]
```

**数据分析师（analyst.yaml）**

```yaml
agent:
  name: "数据分析师"
  id: "analyst"
  role: "数据科学专家"
  capabilities: ["data_analysis", "visualization"]
  tools: ["python.execute", "chart.generate"]
```

---

### 代理切换

#### 手动切换

```bash
# 查看所有代理
opencode agent list

# 切换代理
opencode agent switch --name writer
```

**使用示例：**

```
用户：帮我写一段代码

OpenCode（默认代理）：
好的，为您生成代码...

用户：[切换到代码专家]

OpenCode（代码专家）：
您好，我是代码专家。您需要什么帮助？

用户：帮我写一个快速排序算法

OpenCode（代码专家）：
```python
def quick_sort(arr):
    ...
```

用户：[切换到文案顾问]

OpenCode（文案顾问）：
您好，我是文案顾问。需要帮您创作什么内容？

用户：写一个产品宣传文案

OpenCode（文案顾问）：
✨ 全新升级，震撼上市...
```

---

#### 自动切换

```yaml
agents:
  # 自动切换配置
  auto_switch:
    enabled: true
    
    # 关键词触发切换
    keywords:
      coder:
        - "代码"
        - "编程"
        - "debug"
        - "算法"
      writer:
        - "文案"
        - "写作"
        - "宣传"
        - "文案"
      analyst:
        - "数据"
        - "分析"
        - "统计"
        - "图表"
```

**使用示例：**

```
用户：帮我写一段代码

OpenCode（自动切换到代码专家）：
我是代码专家，为您生成代码...

用户：帮我写一段文案

OpenCode（自动切换到文案顾问）：
我是文案顾问，为您创作文案...
```

---

## 代理协作 🤝

### 串行协作

代理 A 完成任务后，传递给代理 B 继续处理。

**场景：** 先分析数据，再撰写报告

```yaml
workflow:
  name: "数据分析报告"
  type: "sequential"
  steps:
    - agent: "analyst"
      task: "分析销售数据"
    
    - agent: "writer"
      task: "根据分析结果撰写报告"
```

**执行示例：**

```
[步骤 1/2] 数据分析师正在分析数据...
✅ 分析完成：本月销售增长 25%

[步骤 2/2] 文案顾问正在撰写报告...
✅ 报告完成：本月销售业绩显著提升，同比增长 25%

🎉 工作流完成！
```

---

### 并行协作

多个代理同时处理不同任务。

**场景：** 同时进行代码审查和性能测试

```yaml
workflow:
  name: "代码质量检查"
  type: "parallel"
  steps:
    - agent: "coder"
      task: "代码审查"
    
    - agent: "tester"
      task: "性能测试"
```

**执行示例：**

```
[并行执行中...]

✅ 代码审查完成：发现 3 个问题
✅ 性能测试完成：响应时间 120ms

🎉 所有任务完成！
```

---

## 代理管理 📋

### 查看代理列表

```bash
# 查看所有代理
opencode agent list

# 查看代理详情
opencode agent info --name coder

# 查看代理日志
opencode logs --agent coder
```

**输出示例：**

```
已注册代理列表
=================

💻 代码专家（coder）
   • 角色：资深软件工程师
   • 能力：代码生成、调试、优化
   • 语言：Python、JavaScript、Java
   • 状态：✅ 运行中

✍️ 文案顾问（writer）
   • 角色：资深文案策划
   • 能力：文案创作、翻译、润色
   • 平台：小红书、微信、微博
   • 状态：⏸️ 已暂停

📊 数据分析师（analyst）
   • 角色：数据科学专家
   • 能力：数据分析、可视化
   • 工具：Python、R、SQL
   • 状态：✅ 运行中
```

---

### 启用/禁用代理

```bash
# 启用代理
opencode agent enable --name writer

# 禁用代理
opencode agent disable --name writer

# 批量启用
opencode agent enable --name coder writer analyst
```

---

### 更新代理配置

```bash
# 编辑代理配置
opencode agent edit --name coder

# 重新加载代理
opencode agent reload --name coder
```

---

## 实际应用案例 📊

### 案例 1：软件开发流程 💻

**场景：** 完整的软件开发流程

**代理配置：**

```yaml
agents:
  - id: "architect"
    name: "架构师"
    role: "系统架构设计"
    
  - id: "coder"
    name: "代码专家"
    role: "代码开发"
    
  - id: "tester"
    name: "测试专家"
    role: "质量测试"
    
  - id: "doc_writer"
    name: "文档专家"
    role: "技术文档"
```

**工作流配置：**

```yaml
workflow:
  name: "软件开发流程"
  type: "sequential"
  steps:
    - agent: "architect"
      task: "设计系统架构"
    
    - agent: "coder"
      task: "实现核心功能"
    
    - agent: "tester"
      task: "编写测试用例"
    
    - agent: "doc_writer"
      task: "编写技术文档"
```

---

### 案例 2：内容营销流程 ✍️

**场景：** 小红书内容创作和发布

**代理配置：**

```yaml
agents:
  - id: "content_planner"
    name: "内容策划"
    role: "策划营销主题和话题"
    
  - id: "copywriter"
    name: "文案创作"
    role: "撰写小红书文案"
    
  - id: "designer"
    name: "视觉设计"
    role: "设计封面图片"
    
  - id: "publisher"
    name: "发布管理"
    role: "管理和发布内容"
```

**使用示例：**

```
用户：帮我策划一个关于"AI 工具"的小红书内容

[步骤 1/4] 内容策划正在分析...
✅ 策划主题："5 款提升效率的 AI 工具"
✅ 目标用户：程序员、创作者、学生
✅ 关键词：AI工具、效率提升、黑科技

[步骤 2/4] 文案创作正在撰写...
✅ 文案完成（500 字，包含表情符号和标签）

[步骤 3/4] 视觉设计正在设计...
✅ 封面图生成完成

[步骤 4/4] 发布管理正在发布...
✅ 已发布到小红书

🎉 内容营销完成！
```

---

### 案例 3：数据报告流程 📊

**场景：** 销售数据分析和报告

**代理配置：**

```yaml
agents:
  - id: "data_collector"
    name: "数据收集"
    role: "从 API 获取销售数据"
    
  - id: "data_analyst"
    name: "数据分析"
    role: "分析数据趋势"
    
  - id: "report_writer"
    name: "报告撰写"
    role: "撰写分析报告"
    
  - id: "chart_maker"
    name: "图表制作"
    role: "生成数据可视化图表"
```

**工作流配置：**

```yaml
workflow:
  name: "销售数据报告"
  type: "sequential"
  steps:
    - agent: "data_collector"
      task: "获取本月销售数据"
    
    - agent: "data_analyst"
      task: "分析销售趋势"
    
    - agent: "chart_maker"
      task: "生成销售趋势图"
    
    - agent: "report_writer"
      task: "撰写分析报告"
```

---

## 常见问题 ❓

### Q1: 如何选择合适的代理？🤔

**A:** 根据任务类型自动或手动选择。

**自动选择：**

```yaml
agents:
  auto_switch:
    enabled: true
    keywords:
      coder: ["代码", "编程", "debug"]
      writer: ["文案", "写作", "宣传"]
      analyst: ["数据", "分析", "统计"]
```

**手动选择：**

```bash
# 查看代理列表
opencode agent list

# 切换到合适的代理
opencode agent switch --name coder
```

---

### Q2: 代理之间如何共享信息？🤝

**A:** 通过工作流上下文共享。

```yaml
workflow:
  name: "数据报告"
  steps:
    - agent: "analyst"
      task: "分析数据"
      output: "analysis_result"
    
    - agent: "writer"
      task: "撰写报告"
      input: "${analysis_result}"
```

---

### Q3: 可以自定义代理吗？🔧

**A:** 可以通过配置文件自定义。

```yaml
agent:
  name: "自定义代理"
  id: "custom"
  role: "你的角色描述"
  capabilities: ["自定义能力"]
  tools: ["自定义工具"]
  rules: ["自定义规则"]
```

---

### Q4: 代理消耗更多资源吗？💰

**A:** 多个代理会消耗更多资源。

**优化建议：**

```yaml
agents:
  # 只启用需要的代理
  coder:
    enabled: true
  writer:
    enabled: false  # 暂时禁用
    
  # 设置代理资源限制
  resource_limits:
    max_memory: "1GB"
    max_tokens: 2000
```

---

## 相关文件 🔗

### 官方 Agents

以下链接指向 OpenCode 官方提供的 Agents 源码和配置：

| 代理 | 功能 | GitHub 源码 | 配置文件 |
|------|------|-------------|----------|
| **代码专家** | 代码开发、调试、审查 | [源码](https://github.com/szqifeng/opencodeshare/tree/main/agents/coder) | [配置](#) |
| **文案顾问** | 内容创作、文案写作 | [源码](https://github.com/szqifeng/opencodeshare/tree/main/agents/writer) | [配置](#) |
| **数据分析师** | 数据分析、可视化 | [源码](https://github.com/szqifeng/opencodeshare/tree/main/agents/analyst) | [配置](#) |
| **测试专家** | 测试用例、质量保证 | [源码](https://github.com/szqifeng/opencodeshare/tree/main/agents/tester) | [配置](#) |
| **文档专家** | 技术文档、API 文档 | [源码](https://github.com/szqifeng/opencodeshare/tree/main/agents/doc-writer) | [配置](#) |

### 自定义 Agents

创建自定义 Agents 的资源：

- [Agent 定义规范](#)
- [Agent 开发指南](#)
- [Agent 配置示例](#)
- [Agent 工作流设计](#)

> 💡 **提示：** 更多自定义 Agents 示例和配置模板正在添加中，敬请期待！

---

## 下一步 ➡️

代理配置完成后，您可以：

1. **配置模型管理**：查看 [模型配置](./models)
2. **学习工具使用**：查看 [工具配置](./tools)
3. **了解规则系统**：查看 [规则配置](./rules)
4. **查看最佳实践**：查看 [工作流设计](../04-best-practices/workflow-design)

---

## 总结 📝

代理系统是 OpenCode 的核心功能，让 AI 更加专业化。

**代理配置清单：**

```
🤖 代理管理
  [ ] 查看内置代理列表
  [ ] 创建自定义代理
  [ ] 启用/禁用代理
  [ ] 配置代理切换
  [ ] 测试代理功能

🔧 代理配置
  [ ] 定义代理角色
  [ ] 配置代理能力
  [ ] 设置代理工具
  [ ] 添加代理规则
  [ ] 优化代理性能

🤝 代理协作
  [ ] 设计工作流
  [ ] 配置串行协作
  [ ] 配置并行协作
  [ ] 测试协作流程
  [ ] 部署生产环境
```

**常用代理组合：**

```
💻 开发流程：
  架构师 → 代码专家 → 测试专家 → 文档专家

✍️ 内容创作：
  内容策划 → 文案创作 → 视觉设计 → 发布管理

📊 数据分析：
  数据收集 → 数据分析 → 图表制作 → 报告撰写
```

---

**🎉 代理配置完成！**

现在您拥有了一个专业的 AI 助手团队！🚀
