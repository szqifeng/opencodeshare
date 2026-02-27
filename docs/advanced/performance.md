---
sidebar_position: 5
---

# 性能优化

提升 OpenCode 的运行效率。

## 缓存策略

```javascript
opencode.cache.set('key', data, { ttl: 3600 });
```

## 并发处理

```javascript
opencode.parallel(tasks, { max: 5 });
```

## 内存优化

合理管理内存使用，避免内存泄漏。
