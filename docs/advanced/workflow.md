---
sidebar_position: 2
---

# 工作流

掌握 OpenCode 工作流的创建和使用。

## 什么是工作流

工作流是将多个任务组合在一起的自动化流程。

## 创建工作流

```yaml
name: code-review-workflow
steps:
  - task: lint
  - task: test
  - task: review
```

## 执行工作流

```bash
opencode run workflow-name
```
