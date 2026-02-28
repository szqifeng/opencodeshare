---
description: OpenCode 安装教程，支持 Windows、macOS、Linux 多平台。本文详细介绍如何下载、安装和配置 OpenCode，以及如何验证安装是否成功。
keywords: ["OpenCode 安装", "OpenCode 下载", "OpenCode 教程", "如何安装 OpenCode"]
---

# 安装指南

OpenCode 支持多种操作系统，包括 Windows、macOS 和 Linux。本文将引导您完成 OpenCode 的下载、安装和初始配置，让您快速开始使用这款强大的 AI 编程助手。

## 系统要求

在安装之前，请确保您的系统满足以下要求。

### 最低配置

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10+, macOS 10.15+, Ubuntu 20.04+ |
| 内存 | 4GB 及以上 |
| 存储空间 | 2GB 可用空间 |
| 网络 | 稳定的互联网连接 |

### 推荐配置

| 项目 | 推荐 |
|------|------|
| 操作系统 | Windows 11, macOS 13+, Ubuntu 22.04+ |
| 内存 | 8GB 及以上 |
| 存储 | 5GB 可用空间（SSD 更佳）|
| 网络 | 高速宽带 |
| GPU | NVIDIA GPU 8GB+（可选，加速推理）|

### 白话解释：为什么需要这些配置？

想象你要建一个仓库：
- **内存（RAM）** 就像仓库的临时工作台，越大能同时处理的货物越多
- **存储空间** 就是仓库的占地面积，需要足够大来存放工具和材料
- **网络** 就像运输道路，越宽、越平坦，运输效率就越高
- **GPU** 就像仓库里的叉车，有了它搬运货物就快多了

## 安装方式

OpenCode 提供了三种安装方式，您可以根据自己的需求选择最适合的一种。

### 方式一：命令行安装 ⚡

这是最快最简单的安装方式，适合有命令行经验的用户。

#### Windows 用户

打开 PowerShell 或 Command Prompt，执行：

```powershell
# 使用 npm 安装
npm install -g opencode

# 或者使用 Chocolatey
choco install opencode

# 或者使用 Scoop
scoop install opencode
```

#### macOS 用户

打开终端（Terminal），执行：

```bash
# 使用 npm 安装
npm install -g opencode

# 或者使用 Homebrew
brew install opencode
```

#### Linux 用户

打开终端，执行：

```bash
# 使用 npm 安装
npm install -g opencode

# 或者使用 apt（Debian/Ubuntu）
sudo apt install opencode

# 或者使用 yum（CentOS/RHEL）
sudo yum install opencode
```

#### 验证安装

安装完成后，执行以下命令验证：

```bash
opencode --version
```

如果看到版本号，说明安装成功！🎉

---

### 方式二：图形化安装 📦

适合不熟悉命令行的用户，提供友好的图形化界面。

#### 下载安装包

1. 访问 [OpenCode 官网](https://opencodeshare.cn)
2. 点击"下载"按钮
3. 选择适合您系统的安装包：
   - 🪟 Windows: `.exe` 安装程序
   - 🍎 macOS: `.dmg` 镜像文件
   - 🐧 Linux: `.AppImage` 便携应用

#### 安装步骤

**Windows 安装步骤：**

```
1. 双击下载的 .exe 文件
2. 在安装向导中点击"下一步"
3. 选择安装路径（建议默认）
4. 等待安装完成
5. 点击"完成"启动 OpenCode
```

**macOS 安装步骤：**

```
1. 双击下载的 .dmg 文件
2. 将 OpenCode 图标拖拽到"应用程序"文件夹
3. 在启动台找到 OpenCode 并打开
4. 如果提示"无法打开"，右键点击选择"打开"
```

**Linux 安装步骤：**

```
1. 给 .AppImage 文件添加执行权限
   chmod +x OpenCode.AppImage
2. 双击运行
3. 或者在终端中执行
   ./OpenCode.AppImage
```

---

### 方式三：Docker 安装 🐳

适合需要隔离环境或部署到服务器的用户。

#### 拉取镜像

```bash
# 拉取 OpenCode 镜像
docker pull opencode/opencode:latest

# 或者指定版本
docker pull opencode/opencode:v1.2.0
```

#### 运行容器

```bash
# 基本运行
docker run -d --name opencode -p 3000:3000 opencode/opencode:latest

# 挂载配置目录
docker run -d \
  --name opencode \
  -p 3000:3000 \
  -v ~/opencode-data:/data \
  opencode/opencode:latest

# 使用 GPU 加速（需要安装 nvidia-docker）
docker run -d \
  --name opencode \
  --gpus all \
  -p 3000:3000 \
  opencode/opencode:latest
```

#### 访问服务

容器启动后，访问 http://localhost:3000

#### Docker Compose 配置

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  opencode:
    image: opencode/opencode:latest
    container_name: opencode
    ports:
      - "3000:3000"
    volumes:
      - ./data:/data
    environment:
      - OPENCODE_API_KEY=your_api_key
    restart: unless-stopped
```

启动服务：

```bash
docker-compose up -d
```

---

## 初始配置

安装完成后，需要进行一些基本配置才能开始使用。

### 1. 启动 OpenCode

#### 命令行启动

```bash
# 启动 OpenCode
opencode start

# 指定端口启动
opencode start --port 3001

# 后台运行
opencode start --daemon
```

#### 图形化启动

双击桌面上的 OpenCode 图标即可启动。

### 2. 首次运行向导

首次启动会显示配置向导，按步骤完成配置：

```
步骤 1/5: 欢迎界面
┌────────────────────────────────────┐
│   欢迎使用 OpenCode！🎉      │
│                                │
│   本向导将帮助您完成初始配置   │
│                                │
│        [下一步]   [退出]        │
└────────────────────────────────────┘

步骤 2/5: 选择语言
┌────────────────────────────────────┐
│   选择您喜欢的语言              │
│                                │
│   ○ English                    │
│   ● 简体中文                  │
│   ○ 繁體中文                  │
│                                │
│        [上一步]   [下一步]      │
└────────────────────────────────────┘

步骤 3/5: 选择模型
┌────────────────────────────────────┐
│   选择 AI 模型                  │
│                                │
│   ● GPT-4o (推荐)             │
│   ○ GPT-3.5 Turbo             │
│   ○ Claude 3.5 Sonnet          │
│   ○ 本地模型                   │
│                                │
│        [上一步]   [下一步]      │
└────────────────────────────────────┘

步骤 4/5: 配置 API Key
┌────────────────────────────────────┐
│   输入 API Key                 │
│                                │
│   sk-xxxxxxxxxxxxxxxxxxxxxxxx     │
│                                │
│        [上一步]   [下一步]      │
└────────────────────────────────────┘

步骤 5/5: 完成配置
┌────────────────────────────────────┐
│   🎉 配置完成！                │
│                                │
│   现在可以开始使用 OpenCode 了 │
│                                │
│        [开始使用]                │
└────────────────────────────────────┘
```

### 3. 配置文件

配置文件位于 `~/.opencode/config.yaml`：

```yaml
# OpenCode 配置文件

# 服务器配置
server:
  host: "0.0.0.0"
  port: 3000

# AI 模型配置
model:
  provider: "openai"  # openai, anthropic, local
  model: "gpt-4o"
  api_key: "sk-xxxxx"
  temperature: 0.7
  max_tokens: 2000

# 对话配置
chat:
  max_history: 20
  auto_save: true
  save_path: "~/Documents/opencode"

# 主题配置
theme:
  mode: "auto"  # light, dark, auto
  accent_color: "#10b981"

# 功能开关
features:
  code_highlight: true
  auto_complete: true
  web_search: true
```

---

## 验证安装

安装和配置完成后，验证 OpenCode 是否正常工作。

### 1. 检查版本

```bash
opencode --version
```

输出示例：
```
OpenCode v1.2.0
Built on 2024-01-15
```

### 2. 检查服务状态

```bash
opencode status
```

输出示例：
```
✓ OpenCode 服务运行中
  PID: 12345
  端口: 3000
  内存使用: 256MB
  运行时间: 2小时30分钟
```

### 3. 测试对话

打开浏览器访问 http://localhost:3000，在对话框中输入：

```
你好，请介绍一下你自己
```

如果收到 OpenCode 的回复，说明一切正常！🎉

---

## 常见问题

### Q1: 安装失败怎么办？

#### Windows

```powershell
# 以管理员身份运行 PowerShell
# 检查 PowerShell 执行策略
Get-ExecutionPolicy

# 如果是 Restricted，修改为 RemoteSigned
Set-ExecutionPolicy RemoteSigned

# 重新尝试安装
npm install -g opencode
```

#### macOS/Linux

```bash
# 检查 npm 权限
npm config get prefix

# 如果显示 /usr/local，需要 sudo
sudo npm install -g opencode

# 或者修改 npm 默认目录
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g opencode
```

### Q2: 如何卸载 OpenCode？

#### 命令行安装的卸载

```bash
npm uninstall -g opencode

# 清理配置文件（可选）
rm -rf ~/.opencode
```

#### 图形化安装的卸载

**Windows:**
1. 打开"控制面板" → "程序和功能"
2. 找到 OpenCode
3. 右键点击选择"卸载"

**macOS:**
1. 打开"应用程序"文件夹
2. 将 OpenCode 拖到废纸篓
3. 清理配置文件（可选）：
   ```bash
   rm -rf ~/.opencode
   ```

### Q3: 如何更新到最新版本？

```bash
# 查看当前版本
opencode --version

# 检查更新
opencode update

# 手动更新
npm update -g opencode
```

### Q4: 端口被占用怎么办？

如果端口 3000 被占用，可以更换端口：

```bash
# 使用其他端口启动
opencode start --port 3001

# 或者查找并停止占用端口的进程
# Windows
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F

# macOS/Linux
lsof -ti :3000 | xargs kill -9
```

### Q5: Docker 容器无法启动？

```bash
# 查看容器日志
docker logs opencode

# 检查端口是否被占用
docker ps -a

# 重新构建镜像
docker-compose build --no-cache
docker-compose up -d
```

---

## 下一步

安装完成后，您可以：

1. **配置网络**：查看 [网络配置指南](./network-config)
2. **选择模型**：查看 [模型选择指南](./model-selection)
3. **学习基本使用**：查看 [日常使用](../02-daily-usage/tools)
4. **了解核心概念**：查看 [白话术语](../05-terminology/llm)

---

## 总结

OpenCode 的安装非常简单，支持多种方式和平台。

**安装方式对比：**

| 方式 | 优点 | 缺点 | 适用人群 |
|------|------|------|----------|
| 命令行 | 快速、简单 | 需要命令行基础 | 开发者、技术用户 |
| 图形化 | 友好、直观 | 功能有限 | 普通用户、新手 |
| Docker | 隔离、可移植 | 学习成本高 | 运维、服务器部署 |

**安装后的检查清单：**

- [ ] OpenCode 成功启动
- [ ] 可以访问 Web 界面
- [ ] 首次配置完成
- [ ] 测试对话成功
- [ ] 配置文件正确保存

---

**🎉 恭喜！您已经成功安装 OpenCode！**

现在开始您的 AI 编程之旅吧！🚀
