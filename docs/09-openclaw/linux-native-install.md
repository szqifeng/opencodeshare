---
sidebar_position: 5
title: Linux 原生安装
description: 详细的 OpenClaw Linux 原生安装教程，涵盖 Ubuntu、CentOS、Debian 等主流 Linux 发行版的安装步骤、依赖配置和故障排查
keywords: [OpenClaw, Linux, Ubuntu, CentOS, Debian, 原生安装, Node.js, npm, 安装教程, 服务器部署]
---

# 🐧 Linux 原生安装

> 直接在 Linux 系统上安装 OpenClaw，享受原生性能和灵活性

## ⚠️ 重要提醒

**强烈建议使用 Docker 方式安装！** 原生安装可能带来的风险：
- ❌ 难以彻底停止程序
- ❌ 获得系统完整权限
- ❌ 依赖安装污染系统环境
- ❌ 文件散落，难以卸载

如果您追求便捷和安全，请参考 [云服务器安装](./cloud-server-install) 使用 Docker 方式。

## 📋 前置要求

### 支持的 Linux 发行版

- **Ubuntu 18.04+**
- **CentOS 7+**
- **Debian 9+**
- **Fedora 28+**

### 系统要求

- CPU：2 核心或以上
- 内存：4GB 或以上
- 硬盘：10GB 或以上可用空间
- 网络：稳定的互联网连接

### 必需软件

- **Node.js 18+** 和 **npm**
- **Git**（用于克隆仓库）
- **Python 3.8+**（可选，某些插件需要）

## 🔧 环境准备

### Ubuntu/Debian 系统

#### 安装 Node.js 和 npm

```bash
# 更新包索引
sudo apt update

# 安装 Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 验证安装
node --version
npm --version
```

#### 安装 Git

```bash
sudo apt install -y git
```

#### 安装 Python（可选）

```bash
sudo apt install -y python3 python3-pip
```

### CentOS/RHEL 系统

#### 安装 Node.js 和 npm

```bash
# 安装 Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

#### 安装 Git

```bash
sudo yum install -y git
```

#### 安装 Python（可选）

```bash
sudo yum install -y python3 python3-pip
```

## 📦 安装步骤

### 步骤 1：克隆 OpenClaw 仓库

```bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw.git

# 进入项目目录
cd openclaw
```

### 步骤 2：安装依赖

```bash
# 安装项目依赖
npm install

# 验证依赖安装
npm list
```

### 步骤 3：配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量
nano .env
```

在 `.env` 文件中填入必要的配置：

```bash
# 飞书应用配置
FEISHU_APP_ID=cli_xxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxx
FEISHU_VERIFICATION_TOKEN=xxxxxx
FEISHU_ENCRYPT_KEY=xxxxxx

# 智谱 AI 配置
ZHIPU_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 模型配置
OPENCLAW_AGENT_MODEL=glm-4.7

# Gateway 配置
GATEWAY_PORT=18789
GATEWAY_MODE=local
```

### 步骤 4：启动服务

```bash
# 开发模式启动
npm start

# 生产模式启动（推荐）
npm run build
npm run serve
```

### 步骤 5：验证安装

```bash
# 检查服务状态
curl http://localhost:18789/health

# 查看日志
tail -f logs/openclaw.log
```

## 🎯 使用 systemd 管理服务（推荐）

### 创建 systemd 服务文件

```bash
sudo nano /etc/systemd/system/openclaw.service
```

填入以下内容：

```ini
[Unit]
Description=OpenClaw AI Automation Service
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/home/your_username/openclaw
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
StandardOutput=append:/var/log/openclaw.log
StandardError=append:/var/log/openclaw-error.log

[Install]
WantedBy=multi-user.target
```

### 启用并启动服务

```bash
# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 启用开机自启
sudo systemctl enable openclaw

# 启动服务
sudo systemctl start openclaw

# 查看服务状态
sudo systemctl status openclaw

# 查看服务日志
sudo journalctl -u openclaw -f
```

## 🔄 配置 OpenClaw

### 配置飞书应用

参考配置指南：
- [DeepSeek 模型配置](./openclaw-deepseek-config)
- [配置指南](./config-guide)

### 配置模型

根据需要配置不同的 AI 模型：

```bash
# 编辑配置文件
nano ~/.openclaw/openclaw.json
```

## 🐛 常见问题排查

### 问题 1：Node.js 版本过低

**症状**：启动时提示 Node.js 版本不支持

**解决方案**：
```bash
# 使用 nvm 安装最新版 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### 问题 2：端口被占用

**症状**：启动失败，提示端口 18789 被占用

**解决方案**：
```bash
# 查找占用端口的进程
sudo lsof -i :18789

# 杀死进程
sudo kill -9 <PID>

# 或修改配置使用其他端口
nano .env
# 修改 GATEWAY_PORT=18888
```

### 问题 3：权限不足

**症状**：无法启动或读写文件

**解决方案**：
```bash
# 使用正确的用户启动服务
sudo -u your_username npm start

# 或修改文件权限
sudo chown -R your_username:your_username /home/your_username/openclaw
```

### 问题 4：依赖安装失败

**症状**：npm install 失败

**解决方案**：
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 或使用淘宝镜像
npm install --registry=https://registry.npmmirror.com
```

## 📚 升级和更新

### 升级 OpenClaw

```bash
# 停止服务
sudo systemctl stop openclaw

# 拉取最新代码
cd /home/your_username/openclaw
git pull origin main

# 安装新依赖
npm install

# 重新构建
npm run build

# 启动服务
sudo systemctl start openclaw
```

## 🗑️ 卸载

### 停止并禁用服务

```bash
sudo systemctl stop openclaw
sudo systemctl disable openclaw
sudo rm /etc/systemd/system/openclaw.service
sudo systemctl daemon-reload
```

### 删除文件

```bash
# 删除项目目录
rm -rf /home/your_username/openclaw

# 删除配置文件
rm -rf ~/.openclaw

# 删除日志文件
sudo rm /var/log/openclaw.log /var/log/openclaw-error.log
```

## 💡 性能优化建议

### 使用 PM2 管理进程

```bash
# 安装 PM2
sudo npm install -g pm2

# 启动服务
pm2 start npm --name "openclaw" -- start

# 设置开机自启
pm2 startup
pm2 save
```

### 配置 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 配置防火墙

```bash
# Ubuntu/Debian
sudo ufw allow 18789/tcp
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=18789/tcp
sudo firewall-cmd --reload
```

## 📚 相关文档

- [配置指南](./config-guide)
- [Mac Docker 安装](./mac-docker-install)
- [云服务器安装](./cloud-server-install)
- [故障排查](./faq)

## 🆘 获取帮助

如果您在安装过程中遇到问题，可以通过以下方式获取帮助：

- 查看 [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- 加入 [社区讨论](https://github.com/openclaw/openclaw/discussions)
- 查看 [官方文档](https://docs.openclaw.ai)

