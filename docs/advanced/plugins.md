---
sidebar_position: 8
---

# 插件开发

开发自定义插件扩展功能。

## 插件结构

```
my-plugin/
  ├── package.json
  ├── index.js
  └── README.md
```

## 开发示例

```javascript
module.exports = {
  name: 'my-plugin',
  init() {
    console.log('Plugin loaded');
  }
};
```

## 发布插件

```bash
npm publish
```
