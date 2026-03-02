---
description: OpenCode 快速体验，通过简单的示例快速了解 OpenCode 的核心功能和使用方式。
keywords: ["OpenCode 快速体验", "OpenCode 示例", "快速上手"]
---

# 快速体验

通过这个简单的示例，快速了解 OpenCode 的核心功能和使用方式。

## 概述

**OpenCode** 是一个开源的 AI 编码代理。它提供终端界面（TUI）、桌面应用和 IDE 扩展等多种使用方式。

## 前提条件

要在终端中使用 OpenCode，你需要：

1. 一款现代终端模拟器，例如：
   - WezTerm（跨平台）
   - Alacritty（跨平台）
   - Ghostty（Linux 和 macOS）
   - Kitty（Linux 和 macOS）

2. 你想使用的 LLM 提供商的 API 密钥。

## 安装

安装 OpenCode 最简单的方法是通过安装脚本：

```bash
curl -fsSL https://opencode.ai/install | bash
```

你也可以使用以下方式安装：

**使用 Node.js:**
```bash
npm install -g opencode-ai
```

**使用 Homebrew (macOS 和 Linux):**
```bash
brew install anomalyco/tap/opencode
```

**使用 Windows (推荐使用 WSL):**
```bash
# 使用 Chocolatey
choco install opencode

# 或使用 Scoop
scoop install opencode
```

## 配置

通过 OpenCode，你可以配置 API 密钥来使用任意 LLM 提供商。

如果你刚开始接触 LLM 提供商，我们推荐使用 **OpenCode Zen**。这是一组经过 OpenCode 团队测试和验证的精选模型。

1. 在 TUI 中运行 `/connect` 命令，选择 opencode，然后前往 [opencode.ai/auth](https://opencode.ai/auth)

```
/connect
```

2. 登录并添加账单信息，然后复制你的 API 密钥。

3. 粘贴你的 API 密钥。

## 初始化

配置好提供商后，导航到你想要处理的项目目录。

```bash
cd /path/to/project
```

然后运行 OpenCode。

```bash
opencode
```

接下来，运行以下命令为项目初始化 OpenCode。

```
/init
```

OpenCode 会分析你的项目并在项目根目录创建一个 `AGENTS.md` 文件。

**提示**：你应该将项目的 `AGENTS.md` 文件提交到 Git。这有助于 OpenCode 理解项目结构和编码规范。

## 使用

现在你已经准备好使用 OpenCode 来处理项目了，尽管提问吧！

如果你是第一次使用 AI 编码代理，以下示例可能会对你有所帮助。

### 提问

你可以让 OpenCode 为你讲解代码库。

**提示**：使用 `@` 键可以模糊搜索项目中的文件。

```
@packages/functions/src/api/index.ts 中的身份验证是如何处理的？
```

当你遇到不熟悉的代码时，这个功能非常有用。

### 添加功能

你可以让 OpenCode 为项目添加新功能。不过我们建议先让它制定一个计划。

#### 1. 制定计划

OpenCode 有一个**计划模式**，该模式下它不会进行任何修改，而是建议**如何**实现该功能。

使用 **Tab** 键切换到计划模式。你会在右下角看到模式指示器。

```
<TAB>
```

接下来描述你希望它做什么。

```
当用户删除笔记时，我们希望在数据库中将其标记为已删除。然后创建一个显示所有最近删除笔记的屏幕。从这个屏幕中，用户可以撤销删除或永久删除笔记。
```

你需要提供足够的细节，让 OpenCode 理解你的需求。

#### 2. 迭代计划

当它给出计划后，你可以提供反馈或补充更多细节。

```
我们希望使用我之前使用过的设计来设计这个新屏幕。[Image #1] 看看这张图片并将其作为参考。
```

**提示**：将图片拖放到终端中即可将其添加到提示词中。OpenCode 可以扫描你提供的图片并将其添加到提示词中。

#### 3. 构建功能

当你对计划满意后，再次按 **Tab** 键切换回**构建模式**。

```
<TAB>
```

然后让它开始实施。

```
听起来不错！继续进行更改。
```

### 直接修改

对于比较简单的修改，你可以直接让 OpenCode 实施，无需先审查计划。

```
我们需要为 /settings 路由添加身份验证。查看 /notes 路由在 @packages/functions/src/notes.ts 中是如何处理的，并在 @packages/functions/src/settings.ts 中实现相同的逻辑
```

请确保提供足够的细节，以便 OpenCode 做出正确的修改。

### 撤销修改

假设你让 OpenCode 做了一些修改。

```
你能重构 @packages/functions/src/api/index.ts 中的函数吗？
```

但你发现结果不是你想要的。你**可以使用** `/undo` 命令来撤销修改。

```
/undo
```

OpenCode 会还原所做的修改，并重新显示你之前的消息。

```
你能重构 @packages/functions/src/api/index.ts 中的函数吗？
```

你可以调整提示词，让 OpenCode 重新尝试。

**提示**：你可以多次运行 `/undo` 来撤销多次修改。

你也**可以使用** `/redo` 命令来重做修改。

```
/redo
```

## 分享

你与 OpenCode 的对话可以与团队分享。

```
/share
```

这会生成当前对话的链接并复制到剪贴板。

**注意**：对话默认不会被分享。

## 下一步

快速体验后，您可以：

1. **了解工作流**：查看 [工作流](./workflow)
2. **学习工具**：查看 [工具](./tools-intro)
3. **配置系统**：查看 [配置](./configuration)
4. **学习指令**：查看 [指令](./commands)

---

**🎉 恭喜完成快速体验！**

要让它更符合你的习惯，我们推荐选择一个主题、自定义快捷键、配置代码格式化工具、创建自定义命令，或者探索 OpenCode 配置。
