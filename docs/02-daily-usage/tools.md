---
description: OpenCode 工具配置教程，介绍内置工具、自定义工具、工具链管理等功能。帮助您充分利用 OpenCode 的工具生态，提升工作效率。
keywords: ["OpenCode 工具配置", "OpenCode 工具", "自定义工具", "工具链"]
---

# 工具配置

OpenCode 提供了丰富的内置工具，并支持用户自定义工具以满足特定需求。本文将详细介绍如何配置和管理 OpenCode 的工具系统，包括内置工具的使用、自定义工具的开发、工具链的搭建以及工具的最佳实践。

通过合理配置工具，您可以大幅扩展 OpenCode 的能力边界，让 AI 助手更好地服务于您的具体工作场景。

## 工具系统概览 🛠️

### 什么是工具 🤔

在 OpenCode 中，**工具**是指 AI 可以调用的外部功能或服务。

**白话解释：**

就像一个"超级助手"：
- 🤖 他很聪明，但双手被束缚了
- 🛠️ 给他一些工具（锤子、扳手、螺丝刀）
- 🔧 他就能自己使用这些工具完成任务

**工具的特点：**

```
✅ 扩展能力：让 AI 能做更多事情
✅ 提高效率：自动化重复性任务
✅ 增强准确性：使用专业工具提高质量
✅ 灵活组合：多个工具协同工作
```

### 工具类型 📋

| 类型 | 说明 | 示例 | 复杂度 |
|------|------|------|--------|
| 🔨 系统工具 | 操作系统功能 | 文件操作、命令执行 | ⭐ |
| 🌐 网络工具 | HTTP 请求、API 调用 | 搜索、抓取 | ⭐⭐ |
| 💾 存储工具 | 数据库、文件系统 | SQLite、JSON | ⭐⭐ |
| 📊 数据处理 | 数据转换、分析 | 格式化、统计 | ⭐⭐⭐ |
| 🎨 创意工具 | 图像、视频处理 | 裁剪、滤镜 | ⭐⭐⭐⭐ |

---

## 内置工具 🧰

OpenCode 内置了多个常用工具，开箱即用。

### 1. 文件操作工具 📁

#### 读取文件

```bash
# 命令行调用
opencode tool file.read --path ./data.json

# 在对话中使用
用户：帮我读取 data.json 文件

OpenCode：[调用工具 file.read]
[读取结果]
{
  "name": "张三",
  "age": 28,
  "job": "工程师"
}

文件内容如上，您想查看哪个字段？
```

**配置示例：**

```yaml
tools:
  file:
    enabled: true
    allowed_paths:
      - "./data"
      - "./config"
      - "~/.opencode"
    max_file_size: "10MB"
```

---

#### 写入文件

```bash
# 命令行调用
opencode tool file.write --path ./output.txt --content "Hello World"

# 在对话中使用
用户：把这段代码保存到 output.txt

OpenCode：[调用工具 file.write]
✅ 文件已成功保存到 ./output.txt

文件内容：
```python
def hello():
    print("Hello, World!")
```
```

#### 白话解释

就像让助手帮你整理文件：
- 📂 你告诉助手"把发票归档到 2024 文件夹"
- 📁 助手使用"文件操作工具"
- 📋 助手自动读取、分类、移动文件
- ✅ 整理完成，你只需检查结果

---

### 2. 网络请求工具 🌐

#### HTTP GET 请求

```bash
# 命令行调用
opencode tool http.get --url `https://api.example.com/data`

# 在对话中使用
用户：帮我调用这个 API 获取数据
`https://api.weather.com/city/beijing`

OpenCode：[调用工具 http.get]
[API 响应]
{
  "city": "北京",
  "temperature": 25,
  "weather": "晴天"
}

今天北京天气是晴天，气温 25°C
```

#### HTTP POST 请求

```bash
# 命令行调用
opencode tool http.post --url `https://api.example.com/create` --data '{"name":"测试"}'

# 在对话中使用
用户：帮我创建一个新任务
项目：OpenCode 开发
优先级：高

OpenCode：[调用工具 http.post]
[发送请求]
POST `https://api.example.com/tasks`
{
  "project": "OpenCode 开发",
  "priority": "high"
}

✅ 任务创建成功！任务 ID: 12345
```

#### 白话解释

就像让助手帮你打电话：
- 📞 你告诉助手"给王经理打电话确认开会时间"
- 📱 助手使用"网络工具"（相当于电话）
- 🗣️ 助手拨通号码，传递你的信息
- 📝 助手记录结果：周三下午 2 点开会

---

### 3. 代码执行工具 💻

#### Python 代码执行

```bash
# 命令行调用
opencode tool python.execute --code "print('Hello')"

# 在对话中使用
用户：帮我运行这段代码计算斐波那契数列

OpenCode：[调用工具 python.execute]
[代码执行]
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

[执行结果]
55

斐波那契数列第 10 项是 55
```

#### JavaScript 代码执行

```bash
# 命令行调用
opencode tool js.execute --code "console.log('Hello')"

# 在对话中使用
用户：帮我用 JavaScript 解析这个 JSON

OpenCode：[调用工具 js.execute]
[代码执行]
```javascript
const data = '{"name":"张三","age":28}';
const obj = JSON.parse(data);
console.log(obj.name);
```

[执行结果]
张三

解析结果：姓名是张三，年龄是 28
```

---

### 4. 搜索工具 🔍

#### Web 搜索

```bash
# 命令行调用
opencode tool web.search --query "OpenCode AI 编程"

# 在对话中使用
用户：帮我搜索 OpenCode 的最新版本

OpenCode：[调用工具 web.search]
[搜索结果]
标题：OpenCode v1.2.0 发布
链接：`https://opencodeshare.cn/release`
摘要：OpenCode v1.2.0 版本发布，新增代理系统...

找到最新版本 v1.2.0，主要更新包括代理系统和性能优化。需要我详细介绍更新内容吗？
```

#### 本地搜索

```bash
# 命令行调用
opencode tool search.local --path ./docs --query "配置"

# 在对话中使用
用户：在文档中搜索"网络配置"相关内容

OpenCode：[调用工具 search.local]
[搜索结果]
文件：network-config.md
匹配行数：15

匹配内容：
• 代理配置
• API Key 配置
• 连接测试

找到 15 处匹配，主要涉及代理、API Key 和连接测试
```

---

## 自定义工具 🔧

### 创建自定义工具

#### 方式 1：使用 JSON 配置 📝

在 `~/.opencode/tools/custom.json` 中定义：

```json
{
  "name": "my_weather_tool",
  "description": "获取天气信息",
  "type": "http",
  "config": {
    "method": "GET",
    "url": "`https://api.weather.com/city/{city}`",
    "headers": {
      "Authorization": "Bearer YOUR_API_KEY"
    },
    "response_format": "json"
  },
  "parameters": {
    "city": {
      "type": "string",
      "required": true,
      "description": "城市名称"
    }
  }
}
```

**使用示例：**

```bash
# 重新加载工具
opencode tools reload

# 调用自定义工具
用户：帮我查询北京天气

OpenCode：[调用工具 my_weather_tool]
✅ 调用自定义工具：my_weather_tool
[API 响应]
{
  "city": "北京",
  "temperature": 25,
  "weather": "晴天"
}

北京今天天气是晴天，气温 25°C
```

---

#### 方式 2：使用 Python 脚本 🐍

创建 `~/.opencode/tools/my_tool.py`：

```python
#!/usr/bin/env python3
"""
自定义工具示例：发送邮件
"""

import smtplib
from email.mime.text import MIMEText

def send_email(to, subject, body):
    """
    发送邮件
    
    参数:
        to: 收件人邮箱
        subject: 邮件主题
        body: 邮件内容
    """
    # 配置 SMTP 服务器
    smtp_server = "smtp.example.com"
    smtp_port = 587
    smtp_username = "your_email@example.com"
    smtp_password = "your_password"  # 使用环境变量
    
    # 创建邮件
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = smtp_username
    msg["To"] = to
    
    # 发送邮件
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
    
    return {
        "success": True,
        "message": "邮件发送成功"
    }

# 工具入口
if __name__ == "__main__":
    import sys
    import json
    
    # 解析参数
    params = json.loads(sys.argv[1])
    
    # 执行工具
    result = send_email(
        to=params.get("to"),
        subject=params.get("subject"),
        body=params.get("body")
    )
    
    # 输出结果（JSON 格式）
    print(json.dumps(result, ensure_ascii=False))
```

**注册工具：**

在 `~/.opencode/tools/config.yaml` 中注册：

```yaml
tools:
  email_sender:
    name: "邮件发送工具"
    description: "发送电子邮件"
    type: "python"
    script: "./my_tool.py"
    function: "send_email"
    parameters:
      to:
        type: "string"
        required: true
        description: "收件人邮箱"
      subject:
        type: "string"
        required: true
        description: "邮件主题"
      body:
        type: "string"
        required: true
        description: "邮件内容"
```

**使用示例：**

```bash
# 重新加载工具
opencode tools reload

# 调用自定义工具
用户：帮我发一封邮件给客户

OpenCode：[调用工具 email_sender]
收件人：client@example.com
主题：OpenCode 开发进度汇报
内容：您好，开发进度如下...

✅ 邮件发送成功！
```

---

### 工具开发最佳实践 ✨

#### 1. 错误处理 🛡️

```python
def my_tool(params):
    try:
        # 执行主要逻辑
        result = do_something(params)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        # 错误处理
        return {
            "success": False,
            "error": str(e),
            "message": "工具执行失败"
        }
```

#### 2. 参数验证 ✅

```python
def validate_params(params, required_fields):
    """
    验证必需参数
    
    参数:
        params: 用户提供的参数
        required_fields: 必需字段列表
    """
    missing = []
    for field in required_fields:
        if field not in params or not params[field]:
            missing.append(field)
    
    if missing:
        raise ValueError(f"缺少必需参数: {', '.join(missing)}")

# 使用
def my_tool(params):
    validate_params(params, ["to", "subject", "body"])
    # 继续执行...
```

#### 3. 日志记录 📝

```python
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def my_tool(params):
    logger.info(f"工具开始执行，参数: {params}")
    
    try:
        result = do_something(params)
        logger.info(f"工具执行成功，结果: {result}")
        return result
    except Exception as e:
        logger.error(f"工具执行失败: {str(e)}")
        raise
```

---

## 工具链 🚀

### 什么是工具链

工具链是指多个工具按顺序或条件组合使用，完成复杂任务。

**白话解释：**

就像"生产线"：
- 🔨 工具 A（打磨）→ 工具 B（上色）→ 工具 C（包装）
- 📦 每个工具完成一部分工作
- ✅ 最终完成一个完整产品

---

### 工具链配置 📊

#### 顺序工具链 ➡️

```yaml
tool_chains:
  data_pipeline:
    name: "数据处理流水线"
    description: "按顺序执行数据处理"
    type: "sequential"
    steps:
      - tool: "file.read"
        params:
          path: "./data.json"
      
      - tool: "data.transform"
        params:
          format: "csv"
      
      - tool: "file.write"
        params:
          path: "./output.csv"
```

**执行示例：**

```bash
# 执行工具链
opencode chain run data_pipeline

# 输出示例
正在执行工具链: data_pipeline
================================

步骤 1/3: file.read
✅ 读取成功: {"name":"张三","age":28}

步骤 2/3: data.transform
✅ 转换成功: name,age
张三,28

步骤 3/3: file.write
✅ 写入成功: ./output.csv

🎉 工具链执行完成！
```

---

#### 条件工具链 🔀

```yaml
tool_chains:
  smart_deploy:
    name: "智能部署"
    description: "根据条件选择部署方式"
    type: "conditional"
    steps:
      - condition: "file.exists"
        params:
          path: "./dockerfile"
        true_branch:
          - tool: "docker.deploy"
        false_branch:
          - tool: "ssh.deploy"
```

**执行示例：**

```bash
# 执行工具链
opencode chain run smart_deploy

# 输出示例
正在执行工具链: smart_deploy
================================

检查条件: file.exists
路径: ./dockerfile

✅ 文件存在，执行 true 分支

步骤: docker.deploy
✅ Docker 部署成功

🎉 工具链执行完成！
```

---

#### 并行工具链 🔀

```yaml
tool_chains:
  parallel_tasks:
    name: "并行任务"
    description: "同时执行多个任务"
    type: "parallel"
    steps:
      - tool: "http.get"
        params:
          url: "`https://api1.example.com`"
      
      - tool: "http.get"
        params:
          url: "`https://api2.example.com`"
      
      - tool: "http.get"
        params:
          url: "`https://api3.example.com`"
```

**执行示例：**

```bash
# 执行工具链
opencode chain run parallel_tasks

# 输出示例
正在执行工具链: parallel_tasks
================================

并行执行 3 个任务...

✅ 任务 1 完成: http.get (`https://api1.example.com`)
✅ 任务 2 完成: http.get (`https://api2.example.com`)
✅ 任务 3 完成: http.get (`https://api3.example.com`)

🎉 所有任务完成！
总耗时: 2.3秒（比顺序执行快 3 倍）
```

---

## 工具管理 📋

### 查看工具列表 📚

```bash
# 查看所有工具
opencode tools list

# 查看已启用的工具
opencode tools list --enabled

# 查看自定义工具
opencode tools list --custom

# 搜索工具
opencode tools search --keyword "http"
```

**输出示例：**

```
已注册工具列表
================================

内置工具 (8):
  🔨 file.read          - 读取文件
  🔨 file.write         - 写入文件
  🌐 http.get           - HTTP GET 请求
  🌐 http.post          - HTTP POST 请求
  💻 python.execute      - 执行 Python 代码
  💻 js.execute         - 执行 JavaScript 代码
  🔍 web.search        - Web 搜索
  🔍 search.local       - 本地文件搜索

自定义工具 (2):
  🌟 my_weather_tool    - 天气查询
  📧 email_sender       - 邮件发送

工具链 (3):
  🚀 data_pipeline     - 数据处理流水线
  🧠 smart_deploy      - 智能部署
  🔀 parallel_tasks     - 并行任务
```

---

### 启用/禁用工具 🔘

```bash
# 启用工具
opencode tools enable file.read

# 禁用工具
opencode tools disable file.read

# 批量启用
opencode tools enable file.read file.write http.get

# 批量禁用
opencode tools disable python.execute js.execute
```

**配置文件方式：**

```yaml
tools:
  file:
    read:
      enabled: true
    write:
      enabled: true
  
  code:
    python:
      enabled: false  # 禁用 Python 执行
    js:
      enabled: false  # 禁用 JavaScript 执行
```

---

### 更新工具 🔄

```bash
# 检查工具更新
opencode tools check-updates

# 更新工具定义
opencode tools update

# 重新加载工具
opencode tools reload
```

---

## 实际应用案例 📊

### 案例 1：自动化数据处理 🚀

**需求：** 每天自动处理销售数据，生成报表

**工具链配置：**

```yaml
tool_chains:
  daily_report:
    name: "每日报表"
    type: "sequential"
    steps:
      # 1. 从 API 获取数据
      - tool: "http.get"
        params:
          url: "`https://api.sales.com/today`"
      
      # 2. 转换数据格式
      - tool: "data.transform"
        params:
          format: "excel"
      
      # 3. 发送邮件
      - tool: "email_sender"
        params:
          to: "manager@example.com"
          subject: "每日销售报表"
          body: "附件是今日销售报表"
      
      # 4. 归档文件
      - tool: "file.write"
        params:
          path: "./reports/$(date).xlsx"
```

**定时执行：**

```bash
# 添加到 crontab
0 18 * * * opencode chain run daily_report

# 每天下午 6 点自动执行
```

---

### 案例 2：智能客服机器人 🤖

**需求：** 根据用户输入自动调用不同工具

**配置文件：**

```yaml
agent:
  name: "智能客服"
  description: "自动处理用户请求"
  
  # 工具映射
  tool_mapping:
    query:
      - "查询"
      - "搜索"
      - "找"
      tools: ["web.search", "search.local"]
    
    create:
      - "创建"
      - "新建"
      - "添加"
      tools: ["http.post", "file.write"]
    
    execute:
      - "执行"
      - "运行"
      - "计算"
      tools: ["python.execute", "js.execute"]
```

**对话示例：**

```
用户：帮我查询北京的天气

OpenCode：[识别意图：query]
[调用工具: web.search]
搜索结果：北京今天晴天，气温 25°C

用户：帮我创建一个新的任务

OpenCode：[识别意图：create]
[调用工具: http.post]
✅ 任务创建成功，ID: 12345

用户：帮我计算斐波那契数列第 10 项

OpenCode：[识别意图：execute]
[调用工具: python.execute]
执行结果：55
```

---

### 案例 3：多模态内容创作 🎨

**需求：** 根据文本自动生成配图并发布

**工具链配置：**

```yaml
tool_chains:
  content_creation:
    name: "内容创作"
    type: "sequential"
    steps:
      # 1. 生成内容文本
      - tool: "ai.generate"
        params:
          model: "gpt-4o"
          prompt: "写一篇关于春天的博客"
      
      # 2. 生成配图
      - tool: "image.generate"
        params:
          model: "dall-e-3"
          prompt: "春天的风景，温暖的阳光"
      
      # 3. 合成图文
      - tool: "image.compose"
        params:
          text: "${steps[0].result}"
          image: "${steps[1].result}"
      
      # 4. 发布到平台
      - tool: "social.post"
        params:
          platform: "xiaohongshu"
          content: "${steps[2].result}"
```

---

## 常见问题 ❓

### Q1: 工具执行失败怎么办？❌

**A:** 逐步排查工具问题。

```bash
# 查看工具日志
opencode logs --tool

# 测试单个工具
opencode tool test --name file.read

# 查看工具详情
opencode tool info --name file.read
```

**常见原因：**

```
❌ 参数错误：缺少必需参数或参数格式错误
❌ 权限不足：文件或网络访问被拒绝
❌ 配置错误：工具配置文件格式错误
❌ 依赖缺失：工具依赖的库或服务未安装
```

---

### Q2: 如何优化工具执行性能？⚡

**A:** 多种优化方案。

**1. 启用缓存**

```yaml
tools:
  cache:
    enabled: true
    ttl: 3600  # 缓存 1 小时
```

**2. 并行执行**

```yaml
tool_chains:
  parallel_tasks:
    type: "parallel"  # 改为并行
```

**3. 异步调用**

```yaml
tools:
  async:
    enabled: true
    max_concurrent: 5  # 最多 5 个并发
```

---

### Q3: 可以共享自定义工具吗？🤝

**A:** 可以通过多种方式共享。

**方式 1：导出工具配置**

```bash
# 导出工具配置
opencode tools export --output my_tools.json

# 分享给他人
# 其他人导入
opencode tools import --input my_tools.json
```

**方式 2：发布到工具市场**

```bash
# 发布工具
opencode tools publish --name my_weather_tool

# 搜索工具
opencode tools search --marketplace
```

**方式 3：Git 仓库共享**

```bash
# 克隆工具仓库
git clone https://github.com/opencode/tools.git

# 使用工具
opencode tools install ./tools/weather_tool.json
```

---

### Q4: 工具安全吗？🔒

**A:** 工具有安全机制。

**权限控制：**

```yaml
tools:
  security:
    # 工具权限级别
    levels:
      file:
        level: "high"  # 高权限工具
        approval: true  # 需要用户确认
      
      code:
        level: "high"
        approval: true
      
      network:
        level: "medium"  # 中等权限
        approval: false  # 自动执行
    
    # 沙箱执行
    sandbox:
      enabled: true
      isolate_network: true  # 隔离网络访问
      limit_file_access: true  # 限制文件访问
```

**白话解释：**

工具安全就像"保险箱"：
- 🔒 高风险工具放在保险箱，需要密码（用户确认）才能打开
- 🧱 沙箱就像隔离房间，工具在里面活动，不影响外面
- 🚫 限制访问就像给工具设置活动范围

---

## 下一步 ➡️

工具配置完成后，您可以：

1. **配置代理系统**：查看 [代理配置](./agents)
2. **了解模型管理**：查看 [模型配置](./models)
3. **学习工作流设计**：查看 [工作流设计](../04-best-practices/workflow-design)
4. **查看故障排查**：查看 [常见问题](../07-troubleshooting/common-issues)

---

## 总结 📝

工具系统是 OpenCode 的核心扩展机制。

**工具配置清单：**

```
🛠️ 工具管理
  [ ] 查看内置工具列表
  [ ] 启用/禁用特定工具
  [ ] 配置工具权限
  [ ] 测试工具功能

🔧 自定义工具
  [ ] 开发自定义工具
  [ ] 编写工具文档
  [ ] 注册到 OpenCode
  [ ] 测试工具功能

🚀 工具链
  [ ] 设计工具链逻辑
  [ ] 配置顺序/条件/并行
  [ ] 测试工具链执行
  [ ] 设置定时执行
```

**常见工具链模式：**

```
📊 数据处理：
  读取 → 转换 → 分析 → 写入

🤖 自动化任务：
  触发 → 执行 → 验证 → 通知

🎨 内容创作：
  生成文本 → 生成图像 → 合成 → 发布

🔧 开发流程：
  拉取代码 → 运行测试 → 部署 → 验证
```

---

**🎉 工具配置完成！**

现在 OpenCode 可以使用各种工具完成任务了！🚀
