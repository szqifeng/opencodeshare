---
sidebar_position: 9
---

# 扩展开发

构建强大的扩展功能。

## 扩展 API

```javascript
opcode.extend('transform', (code) => {
  return transformCode(code);
});
```

## 自定义命令

```javascript
opcode.command('custom', () => {
  console.log('Custom command');
});
```

## 钩子系统

在特定生命周期执行自定义逻辑。
