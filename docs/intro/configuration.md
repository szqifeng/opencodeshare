---
sidebar_position: 13
---

# 配置指南

详细了解 OpenCode 的各种配置选项。

## 配置文件

OpenCode 使用 `opencode.config.js` 作为主配置文件。

```javascript
module.exports = {
  name: 'my-project',
  version: '1.0.0',
  settings: {
    theme: 'light',
    language: 'zh-CN'
  }
};
```

## 环境配置

不同环境使用不同配置：

- 开发环境
- 测试环境
- 生产环境
