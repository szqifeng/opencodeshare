---
description: OpenCode MCP 服务器配置教程，详细介绍 MCP 协议、配置方法和调试技巧。帮助您配置和使用 OpenCode 的 MCP 服务器。
keywords: ["OpenCode MCP", "MCP 服务器", "MCP 协议", "OpenCode 配置"]
---

# MCP 服务器配置

OpenCode 通过 MCP（Model Context Protocol）服务器实现模型上下文的统一管理和高效传递。通过正确配置 MCP 服务器，您可以实现模型上下文的高效共享、降低资源消耗、提升响应速度，并支持复杂的多模型协作场景。

MCP 就像是"数据交换中心"，让不同的模型和工具之间高效协作。

## MCP 系统概览 🌐

### 什么是 MCP

MCP（Model Context Protocol）是一种模型上下文协议，用于在不同模型和工具之间传递上下文信息。

**白话解释：**

就像"快递中心"：
- 📦 不同的人（模型、工具）需要交换物品（上下文）
- 🚚 快递中心（MCP）统一管理和传递
- ✅ 高效、可靠、可追踪

**MCP 的特点：**

```
✅ 标准化：统一的消息格式
✅ 高效：压缩和优化传输
✅ 可扩展：支持自定义消息类型
✅ 可追溯：完整的消息日志
```

---

## MCP 协议原理 📋

### 消息格式

MCP 使用标准化的 JSON 消息格式：

```json
{
  "version": "1.0",
  "type": "context",
  "id": "msg_123456",
  "timestamp": "2024-01-15T10:30:00Z",
  "source": {
    "type": "agent",
    "id": "coder"
  },
  "destination": {
    "type": "model",
    "id": "gpt-4o"
  },
  "payload": {
    "content": "上下文内容",
    "metadata": {},
    "attachments": []
  },
  "compression": "gzip",
  "priority": "normal"
}
```

---

### 消息类型

| 类型 | 说明 | 使用场景 |
|------|------|---------|
| context | 上下文消息 | 传递对话上下文 |
| command | 命令消息 | 发送指令 |
| event | 事件消息 | 通知事件 |
| response | 响应消息 | 返回结果 |
| error | 错误消息 | 报告错误 |

---

## MCP 服务器配置 ⚙️

### 基本配置

在 `~/.opencode/mcp/config.yaml` 中配置：

```yaml
mcp:
  # 服务器配置
  server:
    host: "0.0.0.0"
    port: 8080
    
  # 协议版本
  version: "1.0"
  
  # 安全配置
  security:
    enabled: true
    tls:
      enabled: true
      cert_file: "/path/to/cert.pem"
      key_file: "/path/to/key.pem"
    api_key: "mcp-api-key-xxxxxxxx"
    
  # 性能配置
  performance:
    max_connections: 100
    max_message_size: "10MB"
    compression: "gzip"
    buffer_size: 4096
    
  # 日志配置
  logging:
    level: "info"
    file: "/var/log/opencode/mcp.log"
    max_size: "100MB"
    max_files: 10
```

---

### 启动服务器

```bash
# 启动 MCP 服务器
opencode mcp start

# 指定配置文件
opencode mcp start --config /path/to/config.yaml

# 后台运行
opencode mcp start --daemon

# 指定端口
opencode mcp start --port 8080
```

---

### 查看状态

```bash
# 查看服务器状态
opencode mcp status

# 输出示例：
# ✓ MCP 服务器运行中
#   PID: 12345
#   端口: 8080
#   连接数: 5
#   内存使用: 256MB

# 查看连接列表
opencode mcp connections

# 输出示例：
# 已连接客户端 (5):
#   • agent_coder (代理: coder)
#   • model_gpt4 (模型: gpt-4o)
#   • tool_file (工具: file)
#   • client_web (Web 客户端)
#   • client_cli (CLI 客户端)
```

---

## MCP 客户端连接 🔗

### 连接到服务器

```bash
# 连接到 MCP 服务器
opencode mcp connect --host localhost --port 8080

# 使用 API Key 连接
opencode mcp connect --host localhost --port 8080 \
  --api-key "mcp-api-key-xxxxxxxx"

# 连接到 TLS 服务器
opencode mcp connect --host localhost --port 8443 \
  --tls --cert /path/to/cert.pem
```

---

### 发送消息

```bash
# 发送上下文消息
opencode mcp send --type context \
  --destination model:gpt-4o \
  --payload '{"content": "你好"}'

# 发送命令消息
opencode mcp send --type command \
  --destination agent:coder \
  --payload '{"command": "generate_code"}'

# 从文件发送
opencode mcp send --file message.json
```

---

### 接收消息

```bash
# 订阅消息
opencode mcp subscribe --type context --source model:*

# 实时接收消息
opencode mcp receive --follow

# 接收特定类型的消息
opencode mcp receive --type event
```

---

## MCP 性能优化 ⚡

### 压缩配置

```yaml
mcp:
  performance:
    # 启用压缩
    compression: "gzip"  # gzip, brotli, none
    
    # 压缩级别
    compression_level: 6  # 1-9
    
    # 压缩阈值
    compress_threshold: "1KB"
```

---

### 缓存配置

```yaml
mcp:
  cache:
    # 启用缓存
    enabled: true
    
    # 缓存大小
    max_size: "1GB"
    
    # 缓存过期时间
    ttl: 3600
    
    # 缓存策略
    policy: "lru"  # lru, lfu, fifo
```

---

### 连接池配置

```yaml
mcp:
  connections:
    # 最大连接数
    max_connections: 100
    
    # 最小空闲连接
    min_idle_connections: 10
    
    # 连接超时
    connection_timeout: 30
    
    # 空闲超时
    idle_timeout: 300
```

---

## MCP 监控和日志 📊

### 监控指标

```bash
# 查看性能指标
opencode mcp metrics

# 输出示例：
# 性能指标：
#   消息数: 15234
#   每秒消息数: 45.2
#   平均延迟: 23ms
#   95分位延迟: 45ms
#   99分位延迟: 78ms

# 查看资源使用
opencode mcp resources

# 输出示例：
# 资源使用：
#   CPU: 25%
#   内存: 512MB
#   网络: 1.2MB/s
#   连接数: 45
```

---

### 日志配置

```yaml
mcp:
  logging:
    # 日志级别
    level: "info"  # debug, info, warn, error
    
    # 日志文件
    file: "/var/log/opencode/mcp.log"
    
    # 日志轮转
    rotation:
      max_size: "100MB"
      max_files: 10
      max_age: "30d"
    
    # 日志格式
    format: "json"  # json, text
```

---

### 查看日志

```bash
# 查看日志
opencode mcp logs

# 实时查看日志
opencode mcp logs --follow

# 查看最近 100 行
opencode mcp logs --tail 100

# 过滤日志
opencode mcp logs --filter "error"
```

---

## MCP 安全配置 🔒

### TLS 配置

```yaml
mcp:
  security:
    tls:
      enabled: true
      
      # 证书文件
      cert_file: "/etc/opencode/cert.pem"
      
      # 私钥文件
      key_file: "/etc/opencode/key.pem"
      
      # CA 证书
      ca_file: "/etc/opencode/ca.pem"
      
      # 最小 TLS 版本
      min_version: "1.2"
      
      # 密码套件
      cipher_suites:
        - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
        - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
```

---

### API Key 认证

```yaml
mcp:
  security:
    # 启用 API Key
    api_key:
      enabled: true
      
      # API Key 列表
      keys:
        - name: "default"
          key: "mcp-api-key-xxxxxxxx"
          permissions: ["read", "write"]
        - name: "readonly"
          key: "mcp-api-key-yyyyyyyy"
          permissions: ["read"]
```

---

### IP 白名单

```yaml
mcp:
  security:
    # IP 白名单
    ip_whitelist:
      - "127.0.0.1"
      - "192.168.1.0/24"
      - "10.0.0.0/8"
```

---

## MCP 故障排查 🔧

### 检查配置

```bash
# 验证配置
opencode mcp validate

# 测试连接
opencode mcp test --host localhost --port 8080
```

---

### 查看错误日志

```bash
# 查看错误日志
opencode mcp logs --level error

# 详细模式
opencode mcp logs --verbose
```

---

### 重启服务器

```bash
# 重启 MCP 服务器
opencode mcp restart

# 强制重启
opencode mcp restart --force
```

---

## 实际应用案例 📊

### 案例 1：多模型协作 🤖

**场景：** GPT-4 和 Claude 3 协作完成复杂任务

**配置：**

```yaml
mcp:
  server:
    port: 8080
  
  # 注册模型
  models:
    - id: "gpt-4"
      type: "openai"
      endpoint: "https://api.openai.com/v1"
    
    - id: "claude-3"
      type: "anthropic"
      endpoint: "https://api.anthropic.com/v1"
```

**工作流：**

```
1. 用户发送请求
   ↓
2. MCP 分配给 GPT-4
   ↓
3. GPT-4 处理部分任务
   ↓
4. MCP 传递上下文给 Claude-3
   ↓
5. Claude-3 完成剩余任务
   ↓
6. MCP 整合结果返回
```

---

### 案例 2：分布式系统 🌐

**场景：** 多台服务器共享 MCP 服务器

**配置：**

```yaml
# 服务器 1 (master)
mcp:
  server:
    host: "0.0.0.0"
    port: 8080
  mode: "master"

# 服务器 2 (worker)
mcp:
  server:
    host: "0.0.0.0"
    port: 8080
  mode: "worker"
  master:
    host: "master.example.com"
    port: 8080
```

---

### 案例 3：高并发场景 ⚡

**场景：** 处理大量并发请求

**配置：**

```yaml
mcp:
  performance:
    max_connections: 1000
    max_message_size: "50MB"
    compression: "brotli"
    compression_level: 9
    
  cache:
    enabled: true
    max_size: "10GB"
    
  connections:
    max_connections: 1000
    min_idle_connections: 50
```

---

## 常见问题 ❓

### Q1: MCP 服务器无法启动怎么办？❌

**A:** 逐步排查问题。

```bash
# 检查端口占用
lsof -i :8080

# 检查配置文件
opencode mcp validate

# 查看详细日志
opencode mcp logs --verbose

# 尝试重新安装
opencode mcp reinstall
```

---

### Q2: 如何提升 MCP 性能？⚡

**A:** 多种优化策略。

```yaml
mcp:
  performance:
    # 1. 启用压缩
    compression: "brotli"
    
    # 2. 启用缓存
    cache:
      enabled: true
      max_size: "10GB"
    
    # 3. 增加连接池
    connections:
      max_connections: 1000
      min_idle_connections: 50
```

---

### Q3: 如何保证 MCP 安全？🔒

**A:** 多层安全配置。

```yaml
mcp:
  security:
    # 1. 启用 TLS
    tls:
      enabled: true
    
    # 2. API Key 认证
    api_key:
      enabled: true
    
    # 3. IP 白名单
    ip_whitelist:
      - "192.168.1.0/24"
```

---

### Q4: MCP 如何处理大消息？📦

**A:** 分块传输和压缩。

```yaml
mcp:
  performance:
    # 1. 启用压缩
    compression: "gzip"
    
    # 2. 设置最大消息大小
    max_message_size: "100MB"
    
    # 3. 分块传输
    chunking:
      enabled: true
      chunk_size: "1MB"
```

---

## 下一步 ➡️

MCP 配置完成后，您可以：

1. **学习命令使用**：查看 [命令参考](./commands)
2. **查看最佳实践**：查看 [工作流设计](../04-best-practices/workflow-design)
3. **了解架构**：查看 [架构设计](../06-extended-reading/architecture)
4. **查看故障排查**：查看 [常见问题](../07-troubleshooting/common-issues)

---

## 总结 📝

MCP 是 OpenCode 的核心通信协议。

**配置清单：**

```
🌐 MCP 服务器
  [ ] 安装 MCP 服务器
  [ ] 配置服务器参数
  [ ] 启动服务器
  [ ] 测试连接

🔗 客户端连接
  [ ] 配置连接参数
  [ ] 发送测试消息
  [ ] 接收消息
  [ ] 验证功能

⚡ 性能优化
  [ ] 启用压缩
  [ ] 配置缓存
  [ ] 调整连接池
  [ ] 监控性能

🔒 安全配置
  [ ] 启用 TLS
  [ ] 配置 API Key
  [ ] 设置 IP 白名单
  [ ] 审计日志
```

**MCP 应用场景：**

```
🤖 多模型协作：
  GPT-4 + Claude-3 → MCP 传递上下文

🌐 分布式系统：
  Master + Workers → MCP 统一管理

⚡ 高并发场景：
  大量请求 → MCP 负载均衡
```

---

**🎉 MCP 配置完成！**

现在 OpenCode 的各个组件可以高效协作了！🚀
