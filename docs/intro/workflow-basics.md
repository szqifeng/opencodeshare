---
sidebar_position: 12
---

# 工作流基础

学习如何使用工作流自动化任务。

## 什么是工作流

工作流是一系列任务的有序集合，可以自动化完成复杂的操作。

## 创建工作流

```javascript
const workflow = opencode.workflow.create('my-workflow');

workflow.addStep('load-data', {
  source: 'data.csv'
});

workflow.addStep('process', {
  transform: 'clean'
});

workflow.execute();
```

## 工作流控制

支持条件分支、循环等控制结构。
