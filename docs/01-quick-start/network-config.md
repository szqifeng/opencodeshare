---
description: OpenCode 网络配置教程，包括代理设置、API Key 配置、连接测试等。帮助您解决网络连接问题，确保 OpenCode 正常运行。
keywords: ["OpenCode 网络配置", "OpenCode 代理", "API Key 配置", "OpenCode 连接问题"]
---

# 网络配置

OpenCode 的正常运行依赖于稳定的网络连接和正确的 API 配置。本文将详细介绍如何配置网络代理、设置 API Key、进行连接测试以及优化网络性能。

无论您是在国内还是海外使用，都能找到适合您的配置方案。我们还将提供常见网络问题的排查方法和解决方案。

## 网络需求概览 🌐

### 基本要求

| 项目 | 要求 |
|------|------|
| 网络类型 | 宽带互联网连接 |
| 最低带宽 | 1Mbps（文本） |
| 推荐带宽 | 10Mbps+（代码、多模态） |
| 延迟 | < 200ms |
| 稳定性 | 99%+ 可用性 |

### 不同使用场景的网络需求 📊

```
💬 日常对话：
  • 带宽: 1-2 Mbps
  • 延迟: < 100ms
  • 特点: 低流量，实时性要求高

💻 代码开发：
  • 带宽: 5-10 Mbps
  • 延迟: < 200ms
  • 特点: 中等流量，速度要求一般

📸 多模态任务（图像、视频）：
  • 带宽: 20+ Mbps
  • 延迟: < 300ms
  • 特点: 高流量，速度要求高

🔒 本地模型：
  • 带宽: 仅下载时需要
  • 延迟: 不敏感
  • 特点: 推理完全本地化
```

---

## API Key 配置 🔑

### 获取 API Key

OpenCode 支持多个 AI 服务的 API Key：

#### OpenAI API Key 🤖

1. 访问 OpenAI 官网
2. 登录您的账户
3. 进入 API 设置页面
4. 点击"Create new secret key"
5. 复制生成的 API Key

#### Anthropic API Key 🧠

1. 访问 Anthropic Console
2. 登录您的账户
3. 进入 API Keys 页面
4. 点击"Create Key"
5. 复制生成的 API Key

---

### 配置 API Key

#### 方式 1：配置文件配置 📝

编辑配置文件 `~/.opencode/config.yaml`：

```yaml
# OpenAI 配置
openai:
  api_key: "sk-xxxxxxxxxxxxxxxxxxxxxxxx"  # 替换为你的 API Key
  base_url: "https://api.openai.com/v1"
  organization: "org-xxxxxxxx"  # 可选，企业用户需要

# Anthropic 配置
anthropic:
  api_key: "sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"  # 替换为你的 API Key
  base_url: "https://api.anthropic.com"
  version: "2023-06-01"  # API 版本
```

#### 方式 2：环境变量配置 🔧

在 `.bashrc` 或 `.zshrc` 中添加：

```bash
# OpenAI
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
export OPENAI_BASE_URL="https://api.openai.com/v1"

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx"
export ANTHROPIC_BASE_URL="https://api.anthropic.com"
```

重新加载配置：

```bash
source ~/.bashrc
# 或
source ~/.zshrc
```

#### 方式 3：命令行参数配置 💻

启动时指定 API Key：

```bash
# 使用 OpenAI
opencode start --provider openai --api-key sk-xxxxx

# 使用 Anthropic
opencode start --provider anthropic --api-key sk-ant-xxxxx

# 临时覆盖
opencode chat --provider openai --api-key sk-xxxxx
```

---

## 代理配置 🛡️

### 国内网络环境 🇨🇳

#### 使用国内镜像 🪞

OpenCode 支持使用国内镜像加速：

```yaml
# 配置国内镜像
mirrors:
  openai:
    base_url: "https://api.openai-proxy.com/v1"
    backup_url: "https://api.openai-backup.com/v1"
  
  anthropic:
    base_url: "https://api.anthropic-proxy.com"
```

#### 配置系统代理 🔄

##### Windows 配置

1. 打开"设置" → "网络和 Internet"
2. 点击"代理"
3. 配置代理服务器
4. 记录地址和端口

```yaml
# OpenCode 读取系统代理
system_proxy:
  enabled: true
  auto_detect: true
```

##### macOS/Linux 配置

编辑环境变量：

```bash
# HTTP 代理
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"

# SOCKS5 代理
export ALL_PROXY="socks5://127.0.0.1:7891"

# 不使用代理的地址
export NO_PROXY="localhost,127.0.0.1"
```

在 `.bashrc` 中持久化：

```bash
echo 'export HTTP_PROXY="http://127.0.0.1:7890"' >> ~/.bashrc
source ~/.bashrc
```

#### 配置 OpenCode 专用代理 🔒

在配置文件中指定：

```yaml
proxy:
  enabled: true
  type: "http"  # http, https, socks5
  host: "127.0.0.1"
  port: 7890
  username: ""  # 可选，如果需要认证
  password: ""  # 可选，如果需要认证
  
  # 代理例外
  no_proxy:
    - "localhost"
    - "127.0.0.1"
    - "192.168.*"
```

**白话解释：**

代理就像一个"中转站"：
- 📤 你要发信给朋友（API 服务器）
- 📮 但是直接寄信太慢
- 🏢 于是你把信寄给"代理站"
- 🏢 代理站快速帮你转寄到朋友那里

---

### 企业网络环境 🏢

#### 配置白名单 📋

联系 IT 管理员，添加以下域名到白名单：

```
必需域名：
• api.openai.com
• api.anthropic.com
• cdn.opencodeshare.cn

可选域名：
• storage.googleapis.com
• github.com
• npmjs.org
```

#### 内网部署 🏦

如果无法访问外网，可以：

**方案 1：使用本地模型**
```yaml
model:
  provider: "local"
  model: "llama-3-70b"
  model_path: "/internal/models/llama-3-70b.gguf"
```

**方案 2：搭建内部 API 代理**
```yaml
proxy:
  enabled: true
  type: "http"
  host: "proxy.internal.company.com"
  port: 8080
  
  # 内网域名
  internal_domains:
    - "api.openai.com"
    - "api.anthropic.com"
```

---

## 连接测试 🧪

### 基本连接测试 🔌

#### 测试 API 连通性

```bash
# 测试 OpenAI API
opencode test --provider openai --endpoint

# 测试 Anthropic API
opencode test --provider anthropic --endpoint

# 测试所有配置的 API
opencode test --all
```

**输出示例：**

```
正在测试 API 连接...
================================

OpenAI API:
  ✅ 连接成功
  • 延迟: 45ms
  • 速率限制: 3500/5000 tokens/min
  • 配额: $24.50/$100.00

Anthropic API:
  ✅ 连接成功
  • 延迟: 32ms
  • 速率限制: 50000/100000 tokens/min
  • 配额: $8.30/$50.00

总结:
  🎉 所有 API 连接正常！
```

#### 测试代理配置

```bash
# 测试代理连接
opencode test --proxy

# 检查代理延迟
opencode test --proxy --latency
```

**输出示例：**

```
代理连接测试:
================================

HTTP 代理 (http://127.0.0.1:7890):
  ✅ 连接成功
  • 延迟: 15ms
  • 带宽: 95 Mbps

SOCKS5 代理 (socks5://127.0.0.1:7891):
  ✅ 连接成功
  • 延迟: 18ms
  • 带宽: 88 Mbps

总结:
  🎉 代理配置正常！
```

---

### 性能测试 ⚡

#### 带宽测试

```bash
# 测试实际带宽
opencode test --bandwidth

# 测试到 API 的带宽
opencode test --bandwidth --endpoint
```

**输出示例：**

```
带宽测试:
================================

OpenAI API 带宽:
  ⬆️ 上传: 12.5 Mbps
  ⬇️ 下载: 15.8 Mbps
  
Anthropic API 带宽:
  ⬆️ 上传: 10.2 Mbps
  ⬇️ 下载: 13.7 Mbps

推荐:
  🌟 OpenAI API 速度最快，建议优先使用
```

#### 延迟测试

```bash
# 测试 API 响应延迟
opencode test --latency

# 连续测试（100次）
opencode test --latency --count 100
```

**输出示例：**

```
延迟测试 (100次采样):
================================

OpenAI API:
  • 平均: 45ms
  • 最小: 32ms
  • 最大: 89ms
  • 丢包率: 0%

Anthropic API:
  • 平均: 32ms
  • 最小: 28ms
  • 最大: 67ms
  • 丢包率: 0%

推荐:
  🌟 Anthropic API 延迟最低，适合实时对话
```

---

## 网络优化 🚀

### 连接池配置 🏊

提高并发连接性能：

```yaml
connection_pool:
  max_connections: 10  # 最大并发连接数
  idle_timeout: 60  # 空闲连接超时（秒）
  enable_keepalive: true  # 启用连接保活
  keepalive_interval: 30  # 保活间隔（秒）
```

**白话解释：**

连接池就像"快递员队列"：
- 🚶 单个快递员（单连接）一次只能送一个包裹
- 🏊 多个快递员（连接池）可以同时送多个包裹
- ⏱️ 空闲的快递员休息一段时间后离岗（空闲超时）
- 💬 定期打招呼保持联系（连接保活）

---

### 缓存配置 💾

减少重复网络请求：

```yaml
cache:
  enabled: true
  max_size: 1000  # 最大缓存条目数
  ttl: 3600  # 缓存过期时间（秒）
  
  # 缓存策略
  strategy: "lru"  # lru, lfu, fifo
  
  # 缓存存储位置
  storage: "memory"  # memory, disk, redis
  disk_path: "~/.opencode/cache"
```

**缓存类型对比：**

| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| LRU（最近最少使用）| 🚀 命中率高 | 💾 内存占用大 | 通用场景 |
| LFU（最少频率使用）| 🎯 命中率稳定 | ⏱️ 计算开销大 | 热点数据 |
| FIFO（先进先出）| 💻 实现简单 | 📊 命中率低 | 简单场景 |

---

### 超时配置 ⏱️

设置合理的超时时间：

```yaml
timeout:
  # 连接超时
  connect: 30  # 连接超时（秒）
  
  # 读取超时
  read: 120  # 读取超时（秒）
  
  # 总超时
  total: 180  # 总超时（秒）
  
  # 重试配置
  retry:
    max_attempts: 3  # 最大重试次数
    delay: 2  # 重试延迟（秒）
    backoff: "exponential"  # fixed, linear, exponential
```

**白话解释：**

超时就像"等待时间限制"：
- 📞 打电话：30秒内无人接听就挂断（连接超时）
- 🗣️ 通话中：对方2分钟不说话就挂断（读取超时）
- ⏰ 总时长：整个通话不超过3分钟（总超时）
- 🔄 重试：挂断后可以再打2次（重试机制）

---

## 常见问题 ❓

### Q1: API Key 失效怎么办？🔑

**A:** 检查并更新 API Key。

```bash
# 验证 API Key 有效性
opencode verify --api-key sk-xxxxx

# 查看剩余配额
opencode quota --provider openai

# 更新 API Key
opencode config set openai.api_key sk-xxxxxxxxx
```

**常见原因：**

```
❌ 过期：API Key 有有效期，需要重新生成
❌ 权限不足：API Key 没有所需权限
❌ 账户问题：账户被禁用或欠费
❌ 使用超限：超过了免费额度
```

---

### Q2: 代理配置后仍无法连接？🔄

**A:** 逐步排查代理问题。

**步骤 1：检查代理是否运行**

```bash
# 检查代理进程
lsof -ti :7890

# 测试代理连接
curl -x http://127.0.0.1:7890 https://www.google.com
```

**步骤 2：验证代理配置**

```bash
# 查看当前代理配置
opencode config get proxy

# 测试代理连接
opencode test --proxy
```

**步骤 3：尝试不同代理类型**

```yaml
# 尝试 SOCKS5 代理
proxy:
  type: "socks5"
  host: "127.0.0.1"
  port: 7891
```

**步骤 4：检查防火墙**

```bash
# Windows
netsh advfirewall show allprofiles state

# macOS/Linux
sudo ufw status
```

---

### Q3: 网络连接慢怎么办？🐌

**A:** 优化网络配置。

**方案 1：使用更快的 API 端点**

```yaml
# 选择延迟最低的端点
openai:
  base_url: "https://api.openai.com/v1"
  backup_url: "https://api.openai-backup.com/v1"
  
# 自动切换到最快端点
auto_switch:
  enabled: true
  latency_threshold: 100  # 超过100ms自动切换
```

**方案 2：增加超时时间**

```yaml
timeout:
  connect: 60  # 增加到60秒
  read: 300   # 增加到5分钟
```

**方案 3：启用压缩**

```yaml
compression:
  enabled: true
  algorithm: "gzip"  # gzip, br, deflate
  min_size: 1024  # 大于1KB才压缩
```

---

### Q4: 如何测试网络稳定性？📊

**A:** 使用长时间测试。

```bash
# 持续监控（10分钟）
opencode monitor --network --duration 600

# 输出到文件
opencode monitor --network --duration 600 --output network.log

# 生成网络报告
opencode report --network --period "1d"  # 最近1天
```

**输出示例：**

```
网络稳定性报告（最近1天）
================================

连接成功率: 99.8%
平均延迟: 45ms
最大延迟: 234ms
最小延迟: 28ms
丢包率: 0.2%

推荐:
  🌟 网络状况良好，可以正常使用
```

---

### Q5: 企业内网如何使用？🏢

**A:** 使用内网部署方案。

**方案 1：本地模型完全离线**

```yaml
# 配置本地模型，无需网络
model:
  provider: "local"
  model: "llama-3-70b"
  model_path: "/internal/models/llama-3-70b.gguf"
  offline: true  # 强制离线模式
```

**方案 2：内网 API 网关**

```yaml
# 配置内网网关
gateway:
  enabled: true
  host: "gateway.internal.company.com"
  port: 8080
  
  # API 映射
  api_mapping:
    openai: "internal-openai"
    anthropic: "internal-anthropic"
```

**方案 3：VPN 拨号**

```yaml
# 自动连接企业 VPN
vpn:
  enabled: true
  type: "openvpn"
  config_path: "/etc/openvpn/client.ovpn"
  auto_connect: true
```

---

## 下一步 ➡️

网络配置完成后，您可以：

1. **学习基本使用**：查看 [日常使用](../02-daily-usage/tools)
2. **了解代理系统**：查看 [代理使用](../02-daily-usage/agents)
3. **优化工作流**：查看 [工作流设计](../04-best-practices/workflow-design)
4. **排查网络问题**：查看 [故障排查](../07-troubleshooting/common-issues)

---

## 总结 📝

良好的网络配置是 OpenCode 正常运行的基础。

**配置清单：**

```
🔑 API Key 配置
  [ ] 获取 OpenAI API Key
  [ ] 获取 Anthropic API Key
  [ ] 配置到环境变量或配置文件
  [ ] 验证 API Key 有效性

🛡️ 代理配置
  [ ] 确认网络环境（国内/海外）
  [ ] 配置系统代理或 OpenCode 代理
  [ ] 测试代理连接
  [ ] 配置代理例外

🧪 连接测试
  [ ] 测试 API 连通性
  [ ] 测试代理配置
  [ ] 测试带宽和延迟
  [ ] 验证稳定性

🚀 性能优化
  [ ] 配置连接池
  [ ] 启用缓存
  [ ] 设置合理超时
  [ ] 监控网络状态
```

**常见场景配置：**

```
🇨🇳 国内用户：
  • 使用国内镜像
  • 配置 HTTP/SOCKS5 代理
  • 启用缓存减少请求
  • 使用本地模型（可选）

🌍 海外用户：
  • 直接连接 API
  • 使用 CDN 加速
  • 配置连接池提升性能
  • 监控网络质量

🏢 企业内网：
  • 使用本地模型
  • 配置内网网关
  • 连接企业 VPN
  • 添加内网域名白名单
```

---

**🎉 网络配置完成！**

现在 OpenCode 可以稳定连接网络了！🚀
