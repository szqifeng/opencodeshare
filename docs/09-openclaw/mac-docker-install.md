---
sidebar_position: 1
---

# 🐳 Mac 版本使用 Docker 一键安装 OpenClaw 无感对接飞书

> 使用 Docker 在 Mac 上快速部署 OpenClaw，通过 WebSocket 长连接实现无感对接飞书，无需复杂配置

## ⚠️ 重要安全警告

**强烈建议大家使用 Docker 运行 OpenClaw！**

OpenClaw 是一个强大的自动化工具，不使用 Docker 的风险：
- ❌ **难以停止**：可能无法彻底关闭程序
- ❌ **权限风险**：直接运行会获得系统完整权限
- ❌ **环境污染**：依赖安装会污染系统环境
- ❌ **难以卸载**：文件散落在系统各处，清理困难

**✅ Docker 优势：**
- 一键启动/停止：`docker stop <container_id>`
- 完全隔离，不影响系统
- 易于管理，随时清理

## 准备工作

### 📘 配置飞书应用（第一步）

飞书管理后台：https://open.feishu.cn/app?lang=zh-CN

需要获取以下4个参数：

**参数说明：**
- **FEISHU_APP_ID**：飞书应用ID
- **FEISHU_APP_SECRET**：飞书应用密钥
- **FEISHU_VERIFICATION_TOKEN**：验证令牌
- **FEISHU_ENCRYPT_KEY**：加密密钥

**操作步骤：**

#### 1️⃣ 进入飞书管理后台

访问飞书开放平台管理后台。

🔗 https://open.feishu.cn/app

![开启飞书开放平台](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/open_feishu_open.jpg)

#### 2️⃣ 创建应用

点击"创建应用"，选择"企业自建应用"。

![创建公司](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/create_company.jpg)

#### 3️⃣ 填写应用详情

填写应用名称、描述、图标等基本信息。

![填写应用详情](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/fill_app_details.jpg)

#### 4️⃣ 添加机器人

在应用配置中添加飞书机器人功能。

![添加飞书机器人](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/add_feishu_robot.jpg)

#### 5️⃣ 获取加密密钥和验证令牌

在"事件订阅"中复制：
- **Verification Token** → `FEISHU_VERIFICATION_TOKEN`
- **Encrypt Key** → `FEISHU_ENCRYPT_KEY`

![获取加密密钥和验证令牌](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/get_encrypt_key_and_verify_token.jpg)

#### 6️⃣ 获取飞书应用ID和密钥

在"凭证与基础信息"中复制：
- **App ID** → `FEISHU_APP_ID`
- **App Secret** → `FEISHU_APP_SECRET`

![获取飞书应用ID和密钥](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/get_feishu_appid_secret.jpg)

#### 7️⃣ 开启授权

配置权限管理和事件订阅。

![开启飞书授权步骤1](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/open_feishu_auth_step_1.jpg)

#### 8️⃣ 配置应用权限和用户权限

在"权限管理"中启用必要的应用身份权限和用户权限。

![配置应用身份权限](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/enable_app_identity_permission.jpg)

![配置用户权限](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/open_feishu_auth_step_2.jpg)

#### 9️⃣ 发布应用版本（第一次）

完成配置后，需要创建并发布应用版本。

![发布飞书应用版本步骤1](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/put_feishu_app_version_step1.jpg)

![发布飞书应用版本步骤2](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/put_feishu_app_version_step2.jpg)

**参数汇总：**
```bash
ZHIPU_API_KEY: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
FEISHU_APP_ID: "cli_xxxxxxxx"
FEISHU_APP_SECRET: "xxxxxxxxxxxxxxx"
FEISHU_VERIFICATION_TOKEN: "xxxxxx"
FEISHU_ENCRYPT_KEY: "xxxxxx"
OPENCLAW_AGENT_MODEL: "glm-4.7"
```

## 📦 安装 Docker

### 步骤 1：安装 Docker Desktop for Mac

<details>
<summary>📦 方法一：官网下载（推荐）</summary>

1. 打开官网：https://www.docker.com/products/docker-desktop/
2. 点击 Download for Mac
3. 根据你的芯片选择：
   - Apple Silicon (M1 / M2 / M3 / M4)
   - Intel Chip
4. 下载 .dmg 文件后：
   - 双击打开
   - 把 Docker.app 拖到 Applications
5. 启动 Docker：
   - 在 Applications → Docker 打开
   - 等待右上角 🐳 图标启动完成
6. 验证安装：
```bash
docker --version
# 成功示例：Docker version 26.x.x
```

</details>

<details>
<summary>🛠️ 方法二：Homebrew 安装</summary>

如果你已经安装 Homebrew，一条命令即可：

```bash
brew install --cask docker
```

安装完成后启动：

```bash
open /Applications/Docker.app
```

等待 Docker 引擎启动完成（右上角 🐳 图标变为稳定状态）

</details>

**验证安装成功：**

```bash
docker --version
docker-compose --version
```

## 🎥 本地安装演示视频

观看 OpenClaw 本地安装过程的完整演示视频：

<video src="https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/installopenclaw.mp4" controls playsinline style={{width: '100%', borderRadius: '12px', margin: '1.5rem 0'}}></video>

通过视频了解从下载到部署的完整流程。

## 🚀 启动 OpenClaw

### 步骤 1：下载并解压 fastclaw.zip

```bash
# 下载
curl -O https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/fastclaw.zip

# 解压
unzip fastclaw.zip -d fastclaw && cd fastclaw
```

### 步骤 2：赋予执行权限并运行

```bash
# 赋予权限
chmod +x run.sh

# 执行安装
./run.sh
```

按照提示输入前面准备好的参数：
- ZHIPU_API_KEY
- FEISHU_APP_ID
- FEISHU_APP_SECRET
- FEISHU_VERIFICATION_TOKEN
- FEISHU_ENCRYPT_KEY
- OPENCLAW_AGENT_MODEL（默认 glm-4.7）

### 步骤 3：验证部署

```bash
# 查看运行中的容器
docker ps | grep fastclaw

# 查看容器日志
docker logs fastclaw
```

### 步骤 4：访问 OpenClaw

在浏览器中打开以下地址访问 OpenClaw Web 界面：

```bash
http://localhost:18789/?token=49aab3460ebe8fab7bbd12a8897c0cc7
```

将浏览器访问地址复制到浏览器中即可使用 OpenClaw。

### 步骤 5：授权设备（如访问失败）

**💡 提示：** 如果你只是使用飞书访问，可以暂时跳过此步骤，直接进行手机端配置。此步骤主要用于 Web 端访问。

如果访问 http://localhost:18789 失败，需要进行设备授权：

```bash
# 进入容器
docker exec -it fastclaw bash

# 查看需要授权的请求
openclaw devices list

# 授权设备（替换 ${requestID} 为实际的请求ID）
openclaw devices approve ${requestID}
```

授权完成后，重新访问 OpenClaw 地址即可。

## 📘 配置飞书应用（第二步）

**⚠️ 重要：** 必须先完成 OpenClaw 本地安装并启动，再执行以下步骤！OpenClaw 使用 WebSocket 长连接模式对接飞书，无需配置 Webhook 回调地址。**

#### 1️⃣1️⃣ 开启长连接权限

在"权限管理"中配置长连接相关权限。

![开启长连接权限](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/enable_long_connection_permission.jpg)

#### 1️⃣2️⃣ 配置事件订阅（可选）

在"事件订阅"中开通需要监听的事件。

**⚠️ 注意：** WebSocket 长连接模式下，主要消息通过长连接接收，但部分特殊事件仍需通过事件订阅配置。

![开通回调事件](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/enable_callback_events.jpg)

#### 1️⃣3️⃣ 修改后重新发布版本

完成上述配置后，需要重新发布应用版本。

![修改后重新发布版本](https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/republish_version_after_modification.jpg)

## 📱 手机端配置飞书通讯

**⚠️ 重要：** 请确保上述所有步骤均已执行完成，OpenClaw 成功启动后，再进行手机端配置。

### 配置步骤

#### 1️⃣ 配置飞书通讯

在飞书手机端进行通讯配置，确保能够正常接收和发送消息。

#### 2️⃣ 新建群聊

在飞书手机端点击"+"号，选择"群聊"，创建一个新的群组。

#### 3️⃣ 拉入机器人

在群聊设置中添加成员，搜索并添加你创建的飞书机器人。

#### 4️⃣ @机器人说话

在群聊中输入消息，使用 "@" 符号提及机器人，例如：

```
@机器人 你好，请介绍一下 OpenClaw 的功能
```

机器人接收到消息后会自动回复你的问题。

### 演示视频

观看手机端配置飞书通讯的完整演示视频：

<div style={{display: 'flex', justifyContent: 'center', margin: '1.5rem 0'}}>
  <video src="https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/phone_config_feishu.mp4" controls playsinline style={{maxWidth: '400px', borderRadius: '12px', width: '100%'}}></video>
</div>

通过视频了解如何在手机端完成飞书通讯配置，让 OpenClaw 正常接收和回复飞书消息。

## 🎮 容器管理

```bash
# 查看运行中的容器
docker ps | grep fastclaw

# 停止容器
docker stop fastclaw

# 删除容器
docker rm fastclaw

# 查看日志
docker logs fastclaw
```

## ❓ 常见问题

### Q: Docker Desktop 启动失败？
检查 macOS 版本是否 ≥10.15，确保有管理员权限。

### Q: run.sh 报错 "Permission denied"？
```bash
chmod +x run.sh
```

### Q: 容器启动后立即退出？
```bash
docker logs fastclaw
```
检查参数是否正确，确认端口未被占用。

### Q: 无法连接到飞书？
验证飞书应用配置，检查网络连接，确保权限已启用。确认长连接权限已开启。

### Q: WebSocket 长连接和 Webhook 有什么区别？
- **WebSocket 长连接**：双向实时通信，OpenClaw 主动连接飞书服务器，无需配置回调地址
- **Webhook**：单向被动接收，需要飞书主动推送消息到配置的回调地址

OpenClaw 默认使用 WebSocket 长连接模式，更稳定且无需外网回调地址。

### Q: 镜像拉取速度慢？
配置国内镜像源或使用代理加速。

## 💡 总结

通过 Docker 容器化部署，OpenClaw 实现了安全隔离、一键管理。遇到问题只需 `docker stop` 即可完全停止，无需担心程序失控。

**⚠️ 重要：** 必须使用 Docker 运行 OpenClaw，这是保障安全和可控的唯一正确方式！

📌 **后续操作持续更新中...**
