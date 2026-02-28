---
description: OpenCode 命令参考，详细介绍命令行工具的使用方法和参数说明。帮助您通过命令行操作 OpenCode，实现自动化和批量处理。
keywords: ["OpenCode 命令", "OpenCode 命令行", "OpenCode CLI", "命令参考"]
---

# 命令参考

OpenCode 提供了强大的命令行工具（CLI），让您能够通过命令行完成各种操作，包括项目管理、模型配置、任务执行等。通过掌握命令行工具，您可以实现自动化脚本、CI/CD 集成和批量操作，将 OpenCode 的能力扩展到更广泛的场景。

命令行就像是"指挥中心"，通过一条条命令就能控制整个系统。

## 命令系统概览 💻

### 什么是命令行工具

在 OpenCode 中，**命令行工具**（CLI）是指通过终端窗口执行的操作界面。

**白话解释：**

就像"遥控器"：
- 🖱️ 图形界面：点击按钮 → 触发操作（直观但慢）
- ⌨️ 命令行：输入命令 → 执行操作（快速且强大）

**命令行的特点：**

```
✅ 高效：一条命令完成复杂操作
✅ 可编程：可写入脚本，自动执行
✅ 可集成：可集成到 CI/CD 流程
✅ 功能丰富：支持所有图形界面功能
```

---

## 基本命令 📋

### 安装和版本

```bash
# 查看 OpenCode 版本
opencode --version
# 输出：OpenCode v1.2.0

# 查看 OpenCode 信息
opencode --info
# 输出：详细的版本、构建信息、依赖等

# 检查更新
opencode update --check
# 输出：当前版本 v1.2.0，最新版本 v1.3.0

# 更新到最新版本
opencode update
```

---

### 启动和停止

```bash
# 启动 OpenCode
opencode start

# 指定端口启动
opencode start --port 3001

# 后台运行
opencode start --daemon

# 指定配置文件
opencode start --config /path/to/config.yaml

# 停止 OpenCode
opencode stop

# 重启 OpenCode
opencode restart
```

---

### 状态检查

```bash
# 检查运行状态
opencode status
# 输出：
# ✓ OpenCode 服务运行中
#   PID: 12345
#   端口: 3000
#   运行时间: 2小时30分钟

# 查看日志
opencode logs

# 实时查看日志
opencode logs --follow

# 查看最近 100 行日志
opencode logs --tail 100

# 查看错误日志
opencode logs --level error
```

---

## 对话命令 💬

### 对话管理

```bash
# 开始新对话
opencode chat new

# 恢复对话
opencode chat resume --id abc123

# 列出所有对话
opencode chat list

# 导出对话
opencode chat export --id abc123 --output chat.json

# 删除对话
opencode chat delete --id abc123
```

---

### 发送消息

```bash
# 发送消息
opencode chat send --message "你好"

# 发送消息并获取回复
opencode chat send --message "帮我写一段代码" --output response.txt

# 使用代理发送消息
opencode chat send --agent coder --message "帮我写 Python 代码"

# 使用指定模型
opencode chat send --model gpt-4o --message "复杂问题"

# 批量发送消息
opencode chat send --batch messages.txt
```

---

## 模型命令 🧠

### 模型管理

```bash
# 列出可用模型
opencode model list

# 查看当前模型
opencode model current

# 切换模型
opencode model switch --name gpt-4o

# 设置模型提供商
opencode model set --provider openai --name gpt-4o

# 测试模型
opencode model test --input "你好"
```

---

### 模型配置

```bash
# 配置 OpenAI 模型
opencode model configure openai \
  --api-key "sk-xxxxxxxx" \
  --model "gpt-4o" \
  --temperature 0.7

# 配置 Anthropic 模型
opencode model configure anthropic \
  --api-key "sk-ant-xxxxxxxx" \
  --model "claude-3-5-sonnet"

# 配置本地模型
opencode model configure local \
  --model-path "/models/llama-3-70b.gguf" \
  --engine "llama.cpp"
```

---

### 模型参数

```bash
# 设置温度参数
opencode model set-param temperature --value 0.7

# 设置最大令牌数
opencode model set-param max_tokens --value 2000

# 设置 Top P
opencode model set-param top_p --value 0.9

# 查看所有参数
opencode model params
```

---

## 代理命令 🤖

### 代理管理

```bash
# 列出所有代理
opencode agent list

# 查看当前代理
opencode agent current

# 创建代理
opencode agent create \
  --name "我的代理" \
  --role "代码专家" \
  --tools "python.execute,file.read"

# 删除代理
opencode agent delete --name "我的代理"

# 启用代理
opencode agent enable --name coder

# 禁用代理
opencode agent disable --name writer
```

---

### 代理配置

```bash
# 编辑代理配置
opencode agent edit --name coder

# 重新加载代理
opencode agent reload --name coder

# 查看代理日志
opencode logs --agent coder
```

---

## 工具命令 🛠️

### 工具管理

```bash
# 列出所有工具
opencode tools list

# 查看已启用工具
opencode tools list --enabled

# 搜索工具
opencode tools search --keyword "http"

# 启用工具
opencode tools enable file.read

# 禁用工具
opencode tools disable python.execute

# 测试工具
opencode tools test --name file.read
```

---

### 工具执行

```bash
# 执行工具
opencode tool run --name file.read --params '{"path": "./data.json"}'

# 查看工具信息
opencode tool info --name file.read

# 创建自定义工具
opencode tool create \
  --name "my_tool" \
  --type "http" \
  --config "config.json"
```

---

## 规则命令 📋

### 规则管理

```bash
# 列出所有规则
opencode rules list

# 查看已启用规则
opencode rules list --enabled

# 启用规则
opencode rules enable json_output

# 禁用规则
opencode rules disable formal_style

# 测试规则
opencode rules test --name json_output --input "北京天气"
```

---

### 规则配置

```bash
# 创建规则
opencode rule create \
  --name "my_rule" \
  --type "style" \
  --config "config.yaml"

# 编辑规则
opencode rule edit --name my_rule

# 删除规则
opencode rule delete --name my_rule
```

---

## 主题命令 🎨

### 主题管理

```bash
# 列出所有主题
opencode theme list

# 查看当前主题
opencode theme current

# 切换主题
opencode theme switch --name dark

# 应用主题
opencode theme apply --name my-theme

# 预览主题
opencode theme preview --name my-theme
```

---

### 主题配置

```bash
# 导出主题
opencode theme export --name my-theme --output theme.yaml

# 导入主题
opencode theme import --path theme.yaml

# 删除主题
opencode theme delete --name my-theme
```

---

## 快捷键命令 ⌨️

### 快捷键管理

```bash
# 列出所有快捷键
opencode shortcuts list

# 查看分类快捷键
opencode shortcuts list --category conversation

# 搜索快捷键
opencode shortcuts search --keyword "send"
```

---

### 快捷键配置

```bash
# 修改快捷键
opencode shortcuts modify --name send_message --value "Cmd+Enter"

# 重置快捷键
opencode shortcuts reset --name send_message

# 检测冲突
opencode shortcuts check

# 导出快捷键配置
opencode shortcuts export --output shortcuts.yaml
```

---

## 配置命令 ⚙️

### 配置管理

```bash
# 查看配置
opencode config show

# 编辑配置
opencode config edit

# 重置配置
opencode config reset

# 验证配置
opencode config validate
```

---

### API Key 管理

```bash
# 设置 API Key
opencode config set api.key "sk-xxxxxxxx"

# 获取 API Key
opencode config get api.key

# 删除 API Key
opencode config unset api.key
```

---

## 插件命令 🔌

### 插件管理

```bash
# 列出所有插件
opencode plugin list

# 安装插件
opencode plugin install --name weather-plugin

# 卸载插件
opencode plugin uninstall --name weather-plugin

# 启用插件
opencode plugin enable --name weather-plugin

# 禁用插件
opencode plugin disable --name weather-plugin

# 更新插件
opencode plugin update --name weather-plugin
```

---

## LSP 服务器命令 🔧

### LSP 管理

```bash
# 启动 LSP 服务器
opencode lsp start

# 停止 LSP 服务器
opencode lsp stop

# 查看 LSP 状态
opencode lsp status

# 配置 LSP
opencode lsp configure --editor vscode
```

---

## MCP 服务器命令 🔧

### MCP 管理

```bash
# 启动 MCP 服务器
opencode mcp start

# 停止 MCP 服务器
opencode mcp stop

# 查看 MCP 状态
opencode mcp status

# 配置 MCP
opencode mcp configure --port 8080
```

---

## 高级命令 🚀

### 批处理

```bash
# 从文件批量执行命令
opencode batch --file commands.txt

# 示例 commands.txt：
# model switch --name gpt-4o
# agent switch --name coder
# chat send --message "你好"

# 批处理带参数
opencode batch --file commands.txt --param name=OpenCode
```

---

### 脚本自动化

```bash
#!/bin/bash
# auto-opencode.sh

# 启动 OpenCode
opencode start --daemon

# 等待服务启动
sleep 5

# 切换模型
opencode model switch --name gpt-4o

# 发送消息
opencode chat send --message "系统启动检查" --output check.log

# 分析日志
opencode chat send --message "分析以下日志：$(cat check.log)"

echo "自动任务完成！"
```

---

### CI/CD 集成

```yaml
# .github/workflows/opencode-check.yml
name: OpenCode Check

on:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install OpenCode
        run: npm install -g opencode
      
      - name: Start OpenCode
        run: opencode start --daemon
      
      - name: Code Review
        run: |
          opencode chat send \
            --agent coder \
            --message "审查最近提交的代码" \
            --output review.txt
      
      - name: Upload Review
        uses: actions/upload-artifact@v2
        with:
          name: code-review
          path: review.txt
```

---

## 实际应用案例 📊

### 案例 1：自动化代码审查 💻

**场景：** 每次提交代码后自动审查

**脚本：**

```bash
#!/bin/bash
# auto-code-review.sh

# 获取最新提交
COMMIT_HASH=$(git rev-parse HEAD)

# 启动 OpenCode
opencode start --daemon

# 等待启动
sleep 3

# 获取代码差异
git diff HEAD~1 HEAD > diff.txt

# 代码审查
opencode chat send \
  --agent coder \
  --message "审查以下代码变更：$(cat diff.txt)" \
  --output review_$COMMIT_HASH.txt

echo "代码审查完成：review_$COMMIT_HASH.txt"
```

---

### 案例 2：批量生成文档 📝

**场景：** 为多个函数生成文档

**脚本：**

```bash
#!/bin/bash
# generate-docs.sh

# 启动 OpenCode
opencode start --daemon

# 遍历所有 Python 文件
for file in src/**/*.py; do
  echo "正在处理：$file"
  
  # 生成文档
  opencode chat send \
    --agent doc_writer \
    --message "为这个文件生成文档：$(cat $file)" \
    --output docs/$(basename $file .md)
done

echo "所有文档生成完成！"
```

---

### 案例 3：监控系统状态 📊

**场景：** 定期检查系统状态并报告

**脚本：**

```bash
#!/bin/bash
# monitor.sh

# 启动 OpenCode
opencode start --daemon

# 获取系统状态
CPU=$(top -l 1 | grep "CPU usage" | awk '{print $3}')
MEMORY=$(vm_stat | grep "Pages free" | awk '{print $3}')
DISK=$(df -h / | tail -1 | awk '{print $5}')

# 分析状态
opencode chat send \
  --agent analyst \
  --message "分析系统状态：CPU $CPU，内存 $MEMORY，磁盘 $DISK" \
  --output status_report.txt

echo "系统状态报告完成！"
```

---

## 常见问题 ❓

### Q1: 命令找不到怎么办？❌

**A:** 检查安装和 PATH。

```bash
# 检查是否安装
which opencode

# 如果未找到，重新安装
npm install -g opencode

# 或添加到 PATH
export PATH=$PATH:/usr/local/bin
```

---

### Q2: 如何查看命令帮助？📚

**A:** 使用 --help 参数。

```bash
# 查看主命令帮助
opencode --help

# 查看子命令帮助
opencode model --help

# 查看具体操作帮助
opencode model switch --help
```

---

### Q3: 命令执行失败怎么办？⚠️

**A:** 查看日志和错误信息。

```bash
# 查看详细日志
opencode logs --level debug

# 查看错误日志
opencode logs --level error

# 启用详细模式
opencode --verbose command
```

---

### Q4: 如何批量执行命令？📦

**A:** 使用批处理或脚本。

```bash
# 使用批处理文件
opencode batch --file commands.txt

# 或使用 shell 脚本
#!/bin/bash
opencode model switch --name gpt-4o
opencode agent switch --name coder
opencode chat send --message "你好"
```

---

## 下一步 ➡️

学习命令行后，您可以：

1. **配置 LSP 服务**：查看 [LSP 服务配置](./lsp-server)
2. **配置 MCP 服务**：查看 [MCP 服务配置](./mcp-server)
3. **查看最佳实践**：查看 [效率技巧](../04-best-practices/efficiency-tips)
4. **学习自动化**：查看 [工作流设计](../04-best-practices/workflow-design)

---

## 总结 📝

命令行工具是 OpenCode 的强大功能。

**命令清单：**

```
💻 基本命令
  [ ] 版本查看
  [ ] 启动/停止
  [ ] 状态检查
  [ ] 日志查看

💬 对话命令
  [ ] 新建对话
  [ ] 发送消息
  [ ] 导出对话
  [ ] 删除对话

🧠 模型命令
  [ ] 列出模型
  [ ] 切换模型
  [ ] 配置模型
  [ ] 测试模型

🤖 代理命令
  [ ] 列出代理
  [ ] 切换代理
  [ ] 创建代理
  [ ] 配置代理

🛠️ 工具命令
  [ ] 列出工具
  [ ] 启用/禁用
  [ ] 执行工具
  [ ] 创建工具
```

**常用命令组合：**

```
日常开发：
  opencode start --daemon
  opencode model switch --name gpt-4o
  opencode agent switch --name coder

自动化脚本：
  opencode batch --file commands.txt
  opencode chat send --message "..." --output result.txt

CI/CD 集成：
  opencode start --daemon
  opencode chat send --agent coder --message "审查代码"
```

---

**🎉 命令行学习完成！**

现在您可以通过命令行高效操作 OpenCode 了！⚡
