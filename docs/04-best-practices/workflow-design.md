---
description: OpenCode 工作流设计教程，介绍如何设计高效、可复用的工作流。帮助您构建标准化、自动化工作流，提升整体工作效率。
keywords: ["OpenCode 工作流设计", "OpenCode 工作流", "工作流最佳实践", "自动化工作流"]
---

# 工作流设计

设计高效的工作流是充分发挥 OpenCode 能力的关键。本文将详细介绍工作流的设计原则、模块化方法、模板化策略、测试验证、性能优化以及工作流分享与复用。

通过掌握工作流设计技巧，您可以构建标准化、可复用的工作流，大幅提升团队协作效率和项目交付质量。

工作流就像是"生产流水线"，标准化流程，高效产出。

## 工作流系统概览 🔄

### 什么是工作流

在 OpenCode 中，**工作流**（Workflow）是指将多个任务按照特定顺序组合起来，自动执行的流程。

**白话解释：**

就像"生产线"：
- 📋 原材料（输入数据）
- 🔧 加工站（处理步骤）
- 📦 成品（输出结果）

**工作流的特点：**

```
✅ 自动化：无需人工干预
✅ 可复用：一次设计，多次使用
✅ 可扩展：轻松添加新步骤
✅ 可监控：追踪执行过程
```

---

### 工作流类型

| 类型 | 说明 | 适用场景 | 示例 |
|------|------|---------|------|
| 🔄 串行工作流 | 顺序执行 | 依赖关系明确 | 代码开发 → 测试 → 部署 |
| ⚡ 并行工作流 | 同时执行 | 独立任务 | 代码审查 + 性能测试 |
| 🌳 树形工作流 | 分支执行 | 条件判断 | 错误 → 回滚，成功 → 继续 |
| 🔄 循环工作流 | 重复执行 | 批量处理 | 处理列表中的每个项目 |
| 🎯 条件工作流 | 根据条件执行 | 复杂逻辑 | 根据用户类型选择流程 |

---

## 工作流设计原则 📋

### 原则 1：单一职责

每个工作流只负责一个明确的任务。

**示例：**

```yaml
# ❌ 不好的设计：工作流职责过多
workflow:
  name: "everything"
  steps:
    - 开发代码
    - 测试代码
    - 部署代码
    - 监控系统
    - 生成报告
    - 发送邮件

# ✅ 好的设计：工作流职责单一
workflow:
  name: "code-deployment"
  steps:
    - 测试代码
    - 部署代码
```

---

### 原则 2：模块化

将复杂工作流拆分为可复用的模块。

**示例：**

```yaml
# 模块定义
modules:
  code-review:
    steps:
      - 静态分析
      - 安全检查
      - 代码审查
  
  testing:
    steps:
      - 单元测试
      - 集成测试
      - 性能测试

# 工作流使用模块
workflow:
  name: "ci-cd"
  steps:
    - $code-review
    - $testing
    - 部署
```

---

### 原则 3：可测试

工作流应该易于测试和验证。

**示例：**

```yaml
workflow:
  name: "testable-workflow"
  
  # 测试模式
  test_mode: true
  
  # 测试数据
  test_data:
    input: "test-input.json"
    expected_output: "test-expected.json"
  
  # 验证步骤
  steps:
    - name: "process-data"
      test: true
      validate: true
    
    - name: "validate-output"
      test: true
      assert: output == expected_output
```

---

### 原则 4：可监控

工作流应该提供清晰的执行日志和状态。

**示例：**

```yaml
workflow:
  name: "monitorable-workflow"
  
  # 日志配置
  logging:
    level: "debug"
    file: "workflow.log"
    
  # 状态报告
  reporting:
    enabled: true
    endpoint: "https://api.example.com/workflows/status"
    
  # 步骤监控
  steps:
    - name: "step1"
      log: true
      metrics: true
      
    - name: "step2"
      log: true
      metrics: true
```

---

## 工作流结构设计 🏗️

### 基本结构

```yaml
workflow:
  # 基本信息
  name: "my-workflow"
  version: "1.0.0"
  description: "工作流描述"
  
  # 触发条件
  triggers:
    - type: "manual"
    - type: "webhook"
      url: "https://api.example.com/trigger"
  
  # 输入参数
  inputs:
    - name: "input-file"
      type: "file"
      required: true
    
    - name: "config"
      type: "object"
      default: {}
  
  # 输出结果
  outputs:
    - name: "output-file"
      type: "file"
    
    - name: "metrics"
      type: "object"
  
  # 执行步骤
  steps:
    - name: "step1"
      description: "步骤描述"
      run: "command"
    
    - name: "step2"
      description: "步骤描述"
      run: "command"
```

---

### 串行工作流

```yaml
workflow:
  name: "serial-workflow"
  type: "serial"
  
  steps:
    - name: "step1"
      run: "process-input"
    
    - name: "step2"
      depends_on: ["step1"]
      run: "validate-output"
    
    - name: "step3"
      depends_on: ["step2"]
      run: "generate-report"
```

---

### 并行工作流

```yaml
workflow:
  name: "parallel-workflow"
  type: "parallel"
  
  steps:
    - name: "step1"
      parallel: true
      run: "code-review"
    
    - name: "step2"
      parallel: true
      run: "security-check"
    
    - name: "step3"
      parallel: true
      run: "performance-test"
    
    # 并行步骤完成后执行
    - name: "step4"
      depends_on: ["step1", "step2", "step3"]
      run: "merge-results"
```

---

### 条件工作流

```yaml
workflow:
  name: "conditional-workflow"
  
  steps:
    - name: "check-condition"
      run: "check-error"
      outputs:
        has_error: "${{ steps.check-condition.outputs.error }}"
    
    # 条件分支
    - name: "handle-error"
      if: "${{ steps.check-condition.outputs.has_error }}"
      run: "rollback"
    
    - name: "continue-success"
      if: "!${{ steps.check-condition.outputs.has_error }}"
      run: "proceed"
```

---

### 循环工作流

```yaml
workflow:
  name: "loop-workflow"
  
  steps:
    - name: "process-items"
      run: "process-item"
      loop:
        over: "${{ inputs.items }}"
        parallel: false  # 或 true 并行处理
    
    - name: "aggregate-results"
      depends_on: ["process-items"]
      run: "aggregate"
```

---

## 工作流模板化 📐

### 创建模板

**文件：** `templates/code-review.yaml`

```yaml
template:
  name: "code-review-template"
  version: "1.0.0"
  description: "代码审查标准模板"
  
  # 可配置参数
  parameters:
    - name: "code-path"
      type: "string"
      required: true
      description: "代码路径"
    
    - name: "review-type"
      type: "enum"
      values: ["basic", "comprehensive"]
      default: "basic"
      description: "审查类型"
    
    - name: "language"
      type: "enum"
      values: ["python", "javascript", "java"]
      default: "python"
      description: "编程语言"
  
  # 工作流步骤
  steps:
    - name: "static-analysis"
      run: |
        opencode tool run \
          --name static-analysis \
          --params '{
            "path": "${{ parameters.code-path }}",
            "language": "${{ parameters.language }}"
          }'
    
    - name: "security-check"
      if: "${{ parameters.review-type == 'comprehensive' }}"
      run: |
        opencode tool run \
          --name security-scan \
          --params '{
            "path": "${{ parameters.code-path }}"
          }'
    
    - name: "code-quality"
      run: |
        opencode tool run \
          --name code-quality \
          --params '{
            "path": "${{ parameters.code-path }}",
            "language": "${{ parameters.language }}"
          }'
    
    - name: "generate-report"
      run: |
        opencode tool run \
          --name report-generator \
          --params '{
            "results": "${{ steps }}",
            "format": "html"
          }'
```

---

### 使用模板

```yaml
workflow:
  name: "my-code-review"
  template: "code-review-template"
  
  parameters:
    code-path: "./src"
    review-type: "comprehensive"
    language: "python"
```

---

### 模板参数化

**文件：** `templates/deployment.yaml`

```yaml
template:
  name: "deployment-template"
  
  parameters:
    # 环境参数
    - name: "environment"
      type: "enum"
      values: ["dev", "staging", "production"]
      required: true
    
    # 部署配置
    - name: "deployment-config"
      type: "object"
      required: false
      default:
        replicas: 1
        resources:
          cpu: "500m"
          memory: "512Mi"
  
  # 环境特定配置
  environment_config:
    dev:
      replicas: 1
      resources:
        cpu: "250m"
        memory: "256Mi"
    
    staging:
      replicas: 2
      resources:
        cpu: "500m"
        memory: "512Mi"
    
    production:
      replicas: 3
      resources:
        cpu: "1000m"
        memory: "1Gi"
  
  # 使用配置
  steps:
    - name: "deploy"
      run: |
        deploy-app \
          --environment "${{ parameters.environment }}" \
          --replicas "${{ environment_config[parameters.environment].replicas }}" \
          --cpu "${{ environment_config[parameters.environment].resources.cpu }}" \
          --memory "${{ environment_config[parameters.environment].resources.memory }}"
```

---

## 工作流测试验证 ✅

### 单元测试

```yaml
workflow:
  name: "test-workflow"
  
  # 测试配置
  tests:
    - name: "test-basic-flow"
      input:
        test-file: "test-input.json"
      expected:
        status: "success"
        output-file: "expected-output.json"
    
    - name: "test-error-handling"
      input:
        test-file: "invalid-input.json"
      expected:
        status: "error"
        error-message: "Invalid input"
  
  # 验证步骤
  steps:
    - name: "validate-input"
      test: true
      assert: "input.valid == true"
    
    - name: "process-data"
      test: true
      assert: "output.data == expected_data"
```

---

### 集成测试

```python
#!/usr/bin/env python3
"""
工作流集成测试
"""

import pytest
from opencode import Workflow

def test_code_review_workflow():
    """测试代码审查工作流"""
    workflow = Workflow.load("code-review")
    
    # 执行工作流
    result = workflow.run({
        "code-path": "./test-code",
        "review-type": "basic"
    })
    
    # 验证结果
    assert result.status == "success"
    assert "report" in result.outputs
    assert len(result.errors) == 0

def test_deployment_workflow():
    """测试部署工作流"""
    workflow = Workflow.load("deployment")
    
    # 执行工作流
    result = workflow.run({
        "environment": "staging"
    })
    
    # 验证结果
    assert result.status == "success"
    assert result.deployment_status == "deployed"

def test_error_handling():
    """测试错误处理"""
    workflow = Workflow.load("error-handling")
    
    # 使用无效输入
    result = workflow.run({
        "invalid-input": true
    })
    
    # 验证错误被正确处理
    assert result.status == "error"
    assert result.error_message is not None
```

---

### 性能测试

```yaml
workflow:
  name: "performance-test"
  
  # 性能基准
  performance:
    max_duration: 60  # 最大执行时间（秒）
    max_memory: 512   # 最大内存（MB）
    max_cpu: 80       # 最大 CPU 使用率（%）
  
  # 性能监控
  monitoring:
    enabled: true
    metrics:
      - duration
      - memory
      - cpu
      - network
  
  steps:
    - name: "benchmark-step"
      performance:
        max_duration: 10
      run: "process-data"
```

---

## 工作流优化 ⚡

### 并行化优化

```yaml
# 优化前：串行执行
workflow:
  name: "sequential"
  steps:
    - name: "step1"
      run: "task1"  # 10s
    
    - name: "step2"
      run: "task2"  # 10s
    
    - name: "step3"
      run: "task3"  # 10s
  # 总时间：30s

# 优化后：并行执行
workflow:
  name: "parallel"
  steps:
    - name: "step1"
      parallel: true
      run: "task1"  # 10s
    
    - name: "step2"
      parallel: true
      run: "task2"  # 10s
    
    - name: "step3"
      parallel: true
      run: "task3"  # 10s
  # 总时间：10s（提升 66%）
```

---

### 缓存优化

```yaml
workflow:
  name: "cached-workflow"
  
  # 缓存配置
  cache:
    enabled: true
    ttl: 3600  # 缓存时间（秒）
    key: "${{ inputs.input-file }}"
  
  steps:
    - name: "expensive-operation"
      cache: true
      cache_key: "${{ inputs.input-file }}"
      run: "process-expensive"
```

---

### 增量处理

```yaml
workflow:
  name: "incremental-workflow"
  
  # 增量处理
  incremental:
    enabled: true
    state_file: "state.json"
  
  steps:
    - name: "detect-changes"
      run: |
        git diff --name-only HEAD~1 HEAD > changes.txt
    
    - name: "process-changes"
      run: |
        for file in $(cat changes.txt); do
          opencode tool run \
            --name process-file \
            --params '{"path": "'$file'"}'
        done
```

---

## 工作流监控 📊

### 实时监控

```yaml
workflow:
  name: "monitored-workflow"
  
  # 监控配置
  monitoring:
    enabled: true
    interval: 5  # 监控间隔（秒）
    
  # 指标收集
  metrics:
    - name: "duration"
      type: "timer"
      description: "执行时间"
    
    - name: "memory_usage"
      type: "gauge"
      description: "内存使用"
    
    - name: "success_rate"
      type: "counter"
      description: "成功率"
  
  steps:
    - name: "step1"
      monitor: true
      run: "task1"
```

---

### 状态报告

```yaml
workflow:
  name: "reporting-workflow"
  
  # 报告配置
  reporting:
    enabled: true
    formats: ["html", "json", "csv"]
    destination: "reports/"
  
  # 报告内容
  report_sections:
    - name: "summary"
      include: ["status", "duration", "errors"]
    
    - name: "details"
      include: ["steps", "logs", "metrics"]
    
    - name: "charts"
      include: ["timeline", "resource-usage"]
```

---

## 实际应用案例 📊

### 案例 1：CI/CD 工作流 💻

**场景：** 自动化代码集成和部署

**工作流定义：**

```yaml
workflow:
  name: "ci-cd-pipeline"
  version: "1.0.0"
  description: "CI/CD 自动化流水线"
  
  # 触发条件
  triggers:
    - type: "git"
      events: ["push", "pull_request"]
      branches: ["main", "develop"]
  
  # 环境变量
  environment:
    NODE_ENV: "production"
    DOCKER_REGISTRY: "registry.example.com"
  
  # 执行步骤
  steps:
    # 阶段 1：代码检查
    - name: "checkout-code"
      run: "git checkout ${{ github.ref }}"
    
    - name: "install-dependencies"
      run: "npm ci"
    
    - name: "lint"
      run: "npm run lint"
    
    - name: "test"
      run: "npm test"
    
    # 阶段 2：代码审查
    - name: "static-analysis"
      run: |
        opencode tool run \
          --name static-analysis \
          --params '{"path": "."}'
    
    - name: "security-scan"
      run: |
        opencode tool run \
          --name security-scan \
          --params '{"path": "."}'
    
    - name: "code-review"
      run: |
        opencode agent run \
          --name code-reviewer \
          --message "审查最近提交的代码"
    
    # 阶段 3：构建
    - name: "build"
      run: "npm run build"
    
    - name: "docker-build"
      run: |
        docker build \
          -t ${{ environment.DOCKER_REGISTRY }}/myapp:${{ github.sha }} \
          .
    
    # 阶段 4：部署
    - name: "deploy-staging"
      if: "${{ github.ref == 'refs/heads/develop' }}"
      run: |
        kubectl set image \
          deployment/myapp \
          myapp=${{ environment.DOCKER_REGISTRY }}/myapp:${{ github.sha }} \
          --namespace=staging
    
    - name: "deploy-production"
      if: "${{ github.ref == 'refs/heads/main' }}"
      run: |
        kubectl set image \
          deployment/myapp \
          myapp=${{ environment.DOCKER_REGISTRY }}/myapp:${{ github.sha }} \
          --namespace=production
    
    # 阶段 5：验证
    - name: "health-check"
      run: |
        curl -f https://staging.example.com/health || exit 1
    
    - name: "send-notification"
      run: |
        opencode tool run \
          --name send-notification \
          --params '{
            "channel": "slack",
            "message": "部署成功：${{ github.sha }}"
          }'
```

---

### 案例 2：数据处理工作流 📊

**场景：** 批量处理数据文件

**工作流定义：**

```yaml
workflow:
  name: "data-processing"
  version: "1.0.0"
  description: "数据处理流水线"
  
  # 输入参数
  inputs:
    - name: "input-directory"
      type: "string"
      required: true
    
    - name: "output-directory"
      type: "string"
      required: true
    
    - name: "processing-type"
      type: "enum"
      values: ["clean", "transform", "analyze"]
      default: "all"
  
  # 执行步骤
  steps:
    # 步骤 1：发现文件
    - name: "discover-files"
      run: |
        find "${{ inputs.input-directory }}" -type f -name "*.csv" > files.list
    
    # 步骤 2：并行处理
    - name: "process-files"
      parallel: true
      loop:
        over: "$(cat files.list)"
        parallel: true
      run: |
        opencode tool run \
          --name data-processor \
          --params '{
            "input-file": "{{ item }}",
            "output-file": "${{ inputs.output-directory }}/{{ item | basename }}",
            "processing-type": "${{ inputs.processing-type }}"
          }'
    
    # 步骤 3：聚合结果
    - name: "aggregate-results"
      depends_on: ["process-files"]
      run: |
        opencode tool run \
          --name data-aggregator \
          --params '{
            "input-directory": "${{ inputs.output-directory }}",
            "output-file": "aggregated-results.json"
          }'
    
    # 步骤 4：生成报告
    - name: "generate-report"
      depends_on: ["aggregate-results"]
      run: |
        opencode tool run \
          --name report-generator \
          --params '{
            "data": "aggregated-results.json",
            "format": "html",
            "output": "report.html"
          }'
```

---

### 案例 3：文档生成工作流 📝

**场景：** 自动生成项目文档

**工作流定义：**

```yaml
workflow:
  name: "documentation-generation"
  version: "1.0.0"
  description: "文档自动生成"
  
  # 触发条件
  triggers:
    - type: "schedule"
      cron: "0 0 * * *"  # 每天凌晨执行
  
  - type: "webhook"
    url: "https://api.example.com/trigger/doc-gen"
  
  # 执行步骤
  steps:
    # 步骤 1：提取代码
    - name: "extract-code"
      run: |
        opencode tool run \
          --name code-extractor \
          --params '{
            "path": "./src",
            "output": "extracted-code.json"
          }'
    
    # 步骤 2：生成 API 文档
    - name: "generate-api-docs"
      run: |
        opencode agent run \
          --name doc-writer \
          --message "为以下代码生成 API 文档：\n$(cat extracted-code.json)"
    
    # 步骤 3：生成用户指南
    - name: "generate-user-guide"
      run: |
        opencode agent run \
          --name doc-writer \
          --message "生成用户指南，包括安装、配置、使用示例"
    
    # 步骤 4：生成开发者文档
    - name: "generate-dev-docs"
      run: |
        opencode agent run \
          --name doc-writer \
          --message "生成开发者文档，包括架构设计、API 参考、贡献指南"
    
    # 步骤 5：验证文档
    - name: "validate-docs"
      run: |
        opencode tool run \
          --name doc-validator \
          --params '{
            "docs-path": "./docs",
            "check-links": true,
            "check-spelling": true
          }'
    
    # 步骤 6：部署文档
    - name: "deploy-docs"
      run: |
        npm run deploy:docs
```

---

## 常见问题 ❓

### Q1: 如何设计高效的工作流？⚡

**A:** 遵循设计原则，合理使用并行化。

**设计建议：**

```
1. 模块化设计
   • 单一职责
   • 高内聚低耦合
   • 可复用模块

2. 并行执行
   • 识别独立任务
   • 合理设置并行度
   • 避免资源竞争

3. 缓存优化
   • 缓存昂贵操作
   • 设置合理的 TTL
   • 及时清理过期缓存
```

---

### Q2: 如何调试工作流？🔧

**A:** 使用日志和断点调试。

**调试技巧：**

```
1. 启用详细日志
   logging:
     level: "debug"

2. 添加断点
   steps:
     - name: "debug-step"
       debug: true
       run: "command"

3. 检查中间结果
   steps:
     - name: "check-output"
       run: "echo '${{ outputs }}'"
```

---

### Q3: 如何保证工作流的可靠性？✅

**A:** 添加错误处理和重试机制。

**可靠性措施：**

```
1. 错误处理
   steps:
     - name: "step-with-retry"
       retry:
         max_attempts: 3
         backoff: exponential

2. 超时设置
   steps:
     - name: "step-with-timeout"
       timeout: 300  # 5 分钟

3. 回滚机制
   on_failure:
     run: "rollback-operations"
```

---

### Q4: 如何分享工作流？📦

**A:** 使用模板和包管理。

**分享方式：**

```
1. 创建模板
   opencode workflow template create \
     --name my-template \
     --path workflow.yaml

2. 发布到市场
   opencode workflow publish \
     --template my-template \
     --marketplace opencode-market

3. 导出工作流
   opencode workflow export \
     --name my-workflow \
     --output my-workflow.yaml
```

---

## 下一步 ➡️

掌握工作流设计后，您可以：

1. **学习代码工程**：查看 [代码工程](./code-engineering)
2. **学习效率技巧**：查看 [效率技巧](./efficiency-tips)
3. **了解架构**：查看 [架构设计](../06-extended-reading/architecture)
4. **了解术语**：查看 [Agent](../05-terminology/agent)

---

## 总结 📝

工作流设计是自动化的核心。

**工作流清单：**

```
🏗️ 设计原则
  [ ] 单一职责
  [ ] 模块化
  [ ] 可测试
  [ ] 可监控

📐 结构设计
  [ ] 基本结构
  [ ] 串行工作流
  [ ] 并行工作流
  [ ] 条件工作流

📐 模板化
  [ ] 创建模板
  [ ] 使用模板
  [ ] 参数化配置
  [ ] 模板继承

✅ 测试验证
  [ ] 单元测试
  [ ] 集成测试
  [ ] 性能测试
  [ ] 错误测试

⚡ 优化策略
  [ ] 并行化
  [ ] 缓存
  [ ] 增量处理
  [ ] 资源优化

📊 监控报告
  [ ] 实时监控
  [ ] 状态报告
  [ ] 性能指标
  [ ] 告警通知
```

**工作流应用场景：**

```
💻 开发流程：
  代码审查 → 测试 → 构建 → 部署

📊 数据处理：
  数据收集 → 清洗 → 分析 → 报告

📝 文档生成：
  代码提取 → 生成文档 → 验证 → 部署

🔄 自动化运维：
  监控 → 检测 → 修复 → 通知
```

---

**🎉 工作流设计学习完成！**

现在您可以设计高效的自动化工作流了！⚡
