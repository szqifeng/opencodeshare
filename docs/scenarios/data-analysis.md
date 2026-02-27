---
sidebar_position: 5
---

# 数据分析

使用 OpenCode 进行高效的数据分析。

## 数据加载

```javascript
const data = opencode.load('data.csv');
```

## 数据清洗

```javascript
const cleaned = opencode.clean(data, {
  removeEmpty: true,
  normalize: true
});
```

## 数据可视化

自动生成图表和报告。
