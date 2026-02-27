---
sidebar_position: 7
---

# API 集成

轻松集成第三方 API。

## 配置 API

```javascript
opencode.api.configure('openai', {
  apiKey: 'xxx'
});
```

## 调用 API

```javascript
const result = opencode.api.call('chat', {
  messages: [...]
});
```

## 错误处理

内置完善的错误处理机制。
