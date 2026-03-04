---
description: OpenCode 0 基础入门指南 - macOS、Linux、Windows 一步步安装部署。
keywords: ["OpenCode 入门", "macOS", "Linux", "Windows", "安装教程"]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 0 基础入门

## 一句话总结
> 不说废话，按你的操作系统一步步安装 OpenCode，5 分钟完成。

---

## 核心笔记

- ✅ OpenCode 是基于 LLM 的 Agent 运行时框架
- ✅ 支持 macOS、Linux、Windows 三大系统
- ✅ 自然语言交互，无需学习复杂命令
- ✅ 开箱即用

---

## 学完你能做什么

- 🚀 成功安装 OpenCode
- 💬 与 AI 对话完成任务
- 🛠️ 使用内置工具

---

## 核心思路

OpenCode 需要 Node.js 环境运行。安装步骤：安装 Node.js → 安装 OpenCode → 连接模型 → 开始使用。

---

## 跟我做（分步骤）

<Tabs groupId="os" values={[
  {label: 'macOS', value: 'macos'},
  {label: 'Linux', value: 'linux'},
  {label: 'Windows', value: 'windows'}
]}>

<TabItem value="macos">

#### 一键安装（推荐）

执行以下命令，自动完成所有安装：

```bash
curl -fsSL https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/install-mac.sh | bash
```

<details>
<summary>一键安装失败？查看手动安装步骤</summary>

---

#### 步骤 1：检查 Node.js

打开终端，输入：

```bash
node -v
```

**如果显示版本号（如 v20.x.x）** → 已安装，跳到步骤 3

**如果提示 command not found** → 需要安装 Node.js

#### 步骤 2：安装 Node.js

**方法一：使用 Homebrew（推荐）**

```bash
# 安装 Homebrew（如果还没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node
```

**方法二：官网下载**

1. 访问 https://nodejs.org
2. 下载 LTS 版本（.pkg 文件）
3. 双击安装，一路点击"继续"
4. 安装完成后重启终端

#### 步骤 3：安装 OpenCode

```bash
npm install -g @opencode-ai/cli
```

#### 步骤 4：验证安装

```bash
opencode --version
```

**如果显示版本号** → 安装成功

**如果提示 command not found** → 检查环境变量

**【配图描述】**：终端显示 opencode 版本号的截图

</details>

</TabItem>

<TabItem value="linux">

#### 步骤 1：检查 Node.js

打开终端，输入：

```bash
node -v
```

**如果显示版本号** → 已安装，跳到步骤 3

**如果提示 command not found** → 需要安装 Node.js

#### 步骤 2：安装 Node.js

**Ubuntu/Debian：**

```bash
# 使用 NodeSource 仓库
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**CentOS/RHEL：**

```bash
# 使用 NodeSource 仓库
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

**Arch Linux：**

```bash
sudo pacman -S nodejs npm
```

#### 步骤 3：安装 OpenCode

```bash
sudo npm install -g @opencode-ai/cli
```

#### 步骤 4：验证安装

```bash
opencode --version
```

**如果显示版本号** → 安装成功

**【配图描述】**：终端显示 opencode 版本号的截图

</TabItem>

<TabItem value="windows">

#### 步骤 1：检查 Node.js

打开 PowerShell 或 CMD，输入：

```cmd
node -v
```

**如果显示版本号** → 已安装，跳到步骤 3

**如果提示不是内部或外部命令** → 需要安装 Node.js

#### 步骤 2：安装 Node.js

1. 访问 https://nodejs.org
2. 下载 LTS 版本（Windows Installer .msi）
3. 双击安装程序

**【配图描述】**：Node.js 安装向导界面截图，点击 "Next" 按钮

4. 同意许可协议，点击 "Next"

**【配图描述】**：选择安装路径界面截图，使用默认路径

5. 点击 "Next" 开始安装

**【配图描述】**：安装进度界面截图

6. 安装完成后点击 "Finish"

**【配图描述】**：安装完成界面截图

7. **重启 PowerShell** 以生效环境变量

#### 步骤 3：安装 OpenCode

打开 PowerShell（管理员），输入：

```cmd
npm install -g @opencode-ai/cli
```

**【配图描述】**：npm 安装进度截图

#### 步骤 4：验证安装

```cmd
opencode --version
```

**如果显示版本号** → 安装成功

**【配图描述】**：PowerShell 显示 opencode 版本号的截图

</TabItem>

</Tabs>

---

### 所有系统：连接模型

#### 步骤 5：启动 OpenCode

```bash
opencode
```

进入交互模式后，你会看到欢迎信息。

**【配图描述】**：OpenCode 启动后的欢迎界面截图

---

#### 步骤 6：连接模型

在 OpenCode 交互模式中，输入 `/connect` 命令：

```
/connect
```

系统会提示你选择模型提供商：

```
请选择模型提供商：
1. OpenAI
2. Anthropic Claude
3. 国内模型（通义千问、文心一言等）
请输入选项编号：
```

输入对应的编号，按提示操作即可。

**【配图描述】**：/connect 命令执行后的选择界面截图

---

#### 步骤 7：开始对话

连接成功后，直接输入你想说的话：

```
你好
```

AI 会回复你，表示连接成功。

**【配图描述】**：与 AI 对话的终端截图

---

## 检查点

- [ ] Node.js 已安装（node -v 显示版本）
- [ ] OpenCode 已安装（opencode --version 显示版本）
- [ ] 能与 AI 正常对话
- [ ] 尝试一个简单任务（如：查看当前目录文件）

---

## 踩坑提醒

### Q1: npm install 很慢或失败？

**macOS/Linux：** 使用国内镜像

```bash
npm config set registry https://registry.npmmirror.com
```

**Windows：** 同上命令

---

### Q2: Windows 下 opencode 命令找不到？

**解决：** 重启 PowerShell 或 CMD

---

### Q3: Linux 下需要 sudo？

**解决：** 某些发行版需要 sudo 安装全局包

```bash
sudo npm install -g @opencode-ai/cli
```

---

### Q4: API Key 在哪里获取？

**OpenAI:** https://platform.openai.com/api-keys

---

## 本课小结

1. 检查并安装 Node.js
2. 安装 OpenCode CLI
3. 连接模型 API
4. 开始对话

---

## 下一课预告

📚 **下一课：快速连接模型**

学习如何连接更多 LLM 提供商（Claude、国内大模型等）。
