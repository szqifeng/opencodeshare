---
sidebar_position: 8
---

# 测试

自动化测试，提高代码质量。

## 单元测试

```javascript
opencode.test.unit('calculator', {
  add: (a, b) => a + b
});
```

## 集成测试

```javascript
opencode.test.integration('api', {
  endpoint: '/api/users'
});
```

## 生成覆盖率报告

自动生成测试覆盖率报告。
