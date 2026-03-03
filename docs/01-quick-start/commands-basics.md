---
description: OpenCode 基础命令介绍 - 启动、停止、重启、版本查询等系统级命令
keywords: ["OpenCode 基础命令", "启动停止", "版本管理"]
---

# 基础命令

## 📋 概述

基础命令用于 OpenCode 的系统级操作，包括服务管理、版本查询、系统维护等。

## 🚀 启动服务

启动 OpenCode 服务，默认运行在 http://localhost:3000

**选项说明：**
- `--port`: 指定端口号
- `--daemon`: 后台运行
- `--config`: 指定配置文件路径

**使用场景：**
- 日常开发时启动服务
- 指定特定端口避免冲突
- 使用自定义配置文件

## 🛑 停止服务

停止正在运行的 OpenCode 服务

**使用场景：**
- 开发结束后关闭服务
- 切换配置前停止服务
- 释放系统资源

## 🔄 重启服务

重启 OpenCode 服务

**使用场景：**
- 配置更改后生效
- 解决服务异常
- 应用最新更新

## 📊 查看状态

查看 OpenCode 的运行状态，包括：
- 服务运行状态
- 端口占用情况
- 内存使用情况
- 连接数统计

## 📌 查看版本

查看 OpenCode 的版本信息

**输出内容：**
- 版本号
- 构建时间
- Git 提交信息

## 🔄 检查更新

检查并更新到最新版本

**更新流程：**
1. 检查远程版本
2. 对比本地版本
3. 下载更新（如果有）
4. 应用更新

## 🧹 清理缓存

清理系统缓存文件

**选项说明：**
- `--all`: 清理所有缓存
- `--cache`: 清理模型缓存
- `--logs`: 清理日志文件

**使用场景：**
- 释放磁盘空间
- 解决缓存问题
- 清理旧日志

## ⚙️ 环境变量配置

通过环境变量快速配置 OpenCode

**常用环境变量：**
- `OPENAI_API_KEY`: OpenAI API 密钥
- `ANTHROPIC_API_KEY`: Anthropic API 密钥
- `HTTP_PROXY`: HTTP 代理地址
- `HTTPS_PROXY`: HTTPS 代理地址
- `OPENCODE_CONFIG`: 配置文件路径
- `OPENCODE_PORT`: 服务端口号

**配置示例：**

在 shell 配置文件中添加（如 ~/.bashrc 或 ~/.zshrc）：

```bash
# API Keys
export OPENAI_API_KEY="your-api-key"
export ANTHROPIC_API_KEY="your-api-key"

# 代理设置
export HTTP_PROXY="http://127.0.0.1:7890"
export HTTPS_PROXY="http://127.0.0.1:7890"

# OpenCode 配置
export OPENCODE_PORT=3001
```

## 📝 常见问题

### Q: 启动失败，提示端口被占用怎么办？

A: 可以使用 `--port` 参数指定其他端口，或者先停止占用该端口的服务

### Q: 如何查看服务是否正常运行？

A: 使用 `status` 命令查看服务状态，或者直接访问 http://localhost:3000

### Q: 清理缓存会删除哪些数据？

A: 不会删除用户数据和配置文件，只会清理临时缓存和日志

## 📖 相关文章

- [对话命令](./commands-chat)
- [配置命令](./commands-config)
- [模型命令](./commands-model)
