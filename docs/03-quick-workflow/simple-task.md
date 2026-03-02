---
description: OpenCode 简单任务教程，介绍如何使用 OpenCode 快速完成标准化任务。帮助您高效处理日常重复性任务。
keywords: ["OpenCode 简单任务", "OpenCode 任务自动化", "重复性任务", "任务处理"]
---

# 简单任务

OpenCode 非常适合处理各种简单、标准化的任务，如数据整理、格式转换、内容生成等。本文将详细介绍简单任务的识别方法、处理流程、自动化策略、批处理技巧以及模板化应用。

通过合理利用 OpenCode 处理简单任务，您可以大幅减少重复性劳动，将精力集中在更有创造性的工作上。

简单任务就像是"流水线作业"，标准化的流程，高效的结果。

## 简单任务识别 🔍

### 简单任务的特征

**特征清单：**

```
✅ 需求明确：目标清晰，无歧义
✅ 步骤固定：流程标准化，可复制
✅ 输入简单：数据结构简单，易于理解
✅ 输出规范：格式固定，易于验证
✅ 重复性高：经常遇到，类似场景多
✅ 复杂度低：逻辑简单，无需深层思考
```

---

### 常见简单任务类型

| 任务类型 | 示例 | 频率 | 复杂度 |
|---------|------|------|--------|
| 📝 文本处理 | 格式转换、内容提取 | 高 | 低 |
| 📊 数据处理 | 数据清洗、格式转换 | 高 | 低 |
| 💻 代码生成 | 模板代码、工具函数 | 高 | 低 |
| 📄 文档生成 | README、API 文档 | 中 | 低 |
| 🧪 测试用例 | 单元测试、集成测试 | 中 | 低 |
| 📧 邮件/消息 | 通知邮件、提醒消息 | 高 | 低 |
| 📋 清单/配置 | 配置文件、检查清单 | 中 | 低 |

---

### 不适合作为简单任务的场景

```
❌ 需要深度思考（架构设计、算法优化）
❌ 需要多轮交互（需求澄清、方案讨论）
❌ 需要创造性工作（创意文案、设计构思）
❌ 需要复杂决策（技术选型、权衡取舍）
❌ 需要上下文依赖（依赖之前对话）
```

---

## 简单任务处理流程 📋

### 标准流程

```
1. 任务识别 → 判断是否为简单任务
2. 任务定义 → 明确输入输出
3. 模板设计 → 创建可复用模板
4. 自动执行 → 批量处理
5. 结果验证 → 检查输出质量
6. 持续优化 → 改进流程
```

---

### 流程详解

#### 步骤 1：任务识别

**检查清单：**

```markdown
✅ 需求是否明确？
✅ 步骤是否固定？
✅ 输入是否简单？
✅ 输出是否规范？
✅ 是否经常遇到？
✅ 逻辑是否简单？

如果以上问题大部分回答"是"，则适合作为简单任务处理。
```

---

#### 步骤 2：任务定义

**模板：**

```markdown
## 任务名称
[简短描述]

## 任务目标
[明确的目标]

## 输入格式
```python
input_example = {...}
```

## 输出格式
```python
output_example = {...}
```

## 处理步骤
1. 步骤 1
2. 步骤 2
3. ...

## 约束条件
- 约束 1
- 约束 2

## 验收标准
- 标准 1
- 标准 2
```

---

#### 步骤 3：模板设计

**示例模板：**

```markdown
你是一位 [角色]，请处理以下任务：

## 输入数据
`<input_format>`
`<input_data>`

## 任务要求
`<requirements>`

## 输出格式
`<output_format>`
[输出模板]

## 约束条件
`<constraints>`

## 示例
`<example>`
```

---

## 文本处理任务 📝

### 格式转换

**场景：** 将文本从一种格式转换为另一种格式。

**示例 1：Markdown 转 HTML**

```markdown
你是一位文本处理助手，请将以下 Markdown 文本转换为 HTML：

## 输入
```markdown
# 标题
## 二级标题
- 列表项 1
- 列表项 2
**粗体文本**
*斜体文本*
```

## 要求
1. 保持结构一致
2. 使用语义化标签
3. 添加适当的 class

## 输出格式
```html
[HTML 代码]
```
```

---

**示例 2：驼峰命名转下划线命名**

```markdown
将以下变量名从驼峰命名转换为下划线命名：

## 输入
```python
variable_names = [
    "userName",
    "firstName",
    "lastName",
    "userAge",
    "createdAt"
]
```

## 要求
1. 遵循 Python 变量命名规范
2. 全部小写
3. 输出 JSON 格式

## 输出
```json
{
  "original_names": [...],
  "converted_names": [...]
}
```
```

---

### 内容提取

**场景：** 从文本中提取特定信息。

**示例：提取 URL**

```markdown
从以下文本中提取所有 URL：

## 输入
```
请访问我们的网站 https://example.com 查看更多信息。
你也可以关注我们的社交媒体 https://twitter.com/example
文档地址：https://docs.example.com/api
```

## 要求
1. 提取所有 HTTP/HTTPS URL
2. 去重
3. 按出现顺序排列

## 输出格式
```json
{
  "urls": [
    "https://example.com",
    "https://twitter.com/example",
    "https://docs.example.com/api"
  ],
  "count": 3
}
```
```

---

### 内容摘要

**场景：** 生成长文本的摘要。

**示例：**

```markdown
为以下文章生成摘要：

## 输入
```
[长篇文章内容]
```

## 要求
1. 摘要长度：100-200 字
2. 保留关键信息
3. 语言简洁明了

## 输出格式
```markdown
## 文章摘要
[摘要内容]

## 关键词
- 关键词 1
- 关键词 2
```
```

---

## 数据处理任务 📊

### 数据清洗

**场景：** 清理和规范化数据。

**示例：清理用户数据**

```markdown
你是一位数据分析师，请清洗以下用户数据：

## 输入
```json
[
  {"id": 1, "name": "张三", "email": "zhangsan@example.com", "age": "25"},
  {"id": 2, "name": "李四", "email": "lisi@", "age": "30"},
  {"id": 3, "name": "", "email": "wangwu@example.com", "age": "28"},
  {"id": 4, "name": "赵六", "email": "zhaoliu@example", "age": "invalid"}
]
```

## 清洗规则
1. name 不能为空
2. email 必须是有效邮箱格式
3. age 必须是有效数字（18-120）
4. 无效的数据记录要标记

## 输出格式
```json
{
  "valid_data": [...],
  "invalid_data": [...],
  "statistics": {
    "total": 4,
    "valid": 2,
    "invalid": 2
  }
}
```
```

---

### 数据转换

**场景：** 转换数据格式或结构。

**示例：扁平数据转树形结构**

```markdown
将以下扁平数据转换为树形结构：

## 输入
```json
[
  {"id": 1, "name": "根节点", "parent_id": null},
  {"id": 2, "name": "子节点1", "parent_id": 1},
  {"id": 3, "name": "子节点2", "parent_id": 1},
  {"id": 4, "name": "孙节点1", "parent_id": 2},
  {"id": 5, "name": "孙节点2", "parent_id": 2}
]
```

## 要求
1. 按照父子关系构建树形结构
2. 每个节点包含 children 数组
3. 保持原有字段

## 输出格式
```json
{
  "tree": [
    {
      "id": 1,
      "name": "根节点",
      "parent_id": null,
      "children": [...]
    }
  ]
}
```
```

---

### 数据分析

**场景：** 对数据进行统计分析。

**示例：销售数据分析**

```markdown
分析以下销售数据：

## 输入
```json
[
  {"date": "2024-01-01", "product": "A", "price": 100, "quantity": 5},
  {"date": "2024-01-01", "product": "B", "price": 150, "quantity": 3},
  {"date": "2024-01-02", "product": "A", "price": 100, "quantity": 2},
  {"date": "2024-01-02", "product": "C", "price": 200, "quantity": 4}
]
```

## 分析要求
1. 计算每日总销售额
2. 计算各产品销量
3. 找出销售额最高的产品
4. 计算平均客单价

## 输出格式
```json
{
  "daily_sales": {...},
  "product_sales": {...},
  "top_product": {...},
  "average_order_value": 0
}
```
```

---

## 代码生成任务 💻

### 模板代码生成

**场景：** 生成标准化的代码模板。

**示例：生成 REST API 模板**

```markdown
为用户管理系统生成 REST API 模板：

## 需求
实体字段：
- id: int, 主键
- username: str, 唯一
- email: str, 唯一
- password: str
- created_at: datetime
- updated_at: datetime

## 要求
1. 使用 FastAPI
2. 使用 Pydantic Schema
3. 使用 SQLAlchemy ORM
4. 实现 CRUD 接口
5. 添加输入验证
6. 添加错误处理

## 输出
按顺序输出以下代码块：
1. 数据库模型
2. Pydantic Schema
3. FastAPI 路由
4. 启动脚本
```

---

### 工具函数生成

**场景：** 生成常用的工具函数。

**示例：生成日期工具函数**

```markdown
生成 Python 日期工具函数模块：

## 要求
包含以下函数：
1. 获取当前时间戳
2. 时间戳转日期字符串
3. 日期字符串转时间戳
4. 计算两个日期的差值（天数）
5. 获取日期范围列表

## 规范
1. 函数使用类型注解
2. 包含文档字符串
3. 使用 datetime 模块
4. 支持时区转换

## 输出格式
```python
# utils/date_helper.py
[代码]
```
```

---

### 测试用例生成

**场景：** 为代码生成测试用例。

**示例：生成单元测试**

```markdown
为以下函数生成单元测试：

## 目标函数
```python
def calculate_discount(price: float, discount_rate: float) -> float:
    """计算折扣后的价格"""
    if price < 0 or discount_rate < 0 or discount_rate > 1:
        raise ValueError("参数不合法")
    return price * (1 - discount_rate)
```

## 测试要求
1. 使用 pytest 框架
2. 测试正常情况
3. 测试边界情况
4. 测试异常情况
5. 使用 parametrize 参数化测试

## 输出格式
```python
# tests/test_calculate_discount.py
[测试代码]
```
```

---

## 文档生成任务 📄

### README 生成

**场景：** 为项目生成 README 文档。

**示例：**

```markdown
为一个 Python 项目生成 README：

## 项目信息
- 项目名称：OpenCode Utils
- 版本：1.0.0
- 描述：常用工具函数库
- 作者：OpenCode Team

## 功能模块
1. 日期工具（date_helper）
2. 字符串工具（string_helper）
3. 文件工具（file_helper）

## 要求
1. 使用标准 Markdown 格式
2. 包含项目简介
3. 包含安装说明
4. 包含使用示例
5. 包含 API 文档链接
6. 包含贡献指南

## 输出
```markdown
[README 内容]
```
```

---

### API 文档生成

**场景：** 为 API 生成文档。

**示例：**

```markdown
为以下 API 接口生成文档：

## 接口列表
1. GET /api/users - 获取用户列表
2. GET /api/users/:id - 获取用户详情
3. POST /api/users - 创建用户
4. PUT /api/users/:id - 更新用户
5. DELETE /api/users/:id - 删除用户

## 用户模型
```python
class User(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
```

## 要求
1. 使用 Markdown 格式
2. 包含接口概述
3. 包含请求参数说明
4. 包含响应示例
5. 包含错误码说明
6. 包含调用示例

## 输出
```markdown
# API 文档
[文档内容]
```
```

---

## 自动化和批处理 ⚡

### 批量处理脚本

**示例：批量转换文档**

```python
#!/usr/bin/env python3
"""
批量转换 Markdown 文档为 HTML
"""

import os
import glob
from pathlib import Path

# 输入目录
INPUT_DIR = "./docs"
# 输出目录
OUTPUT_DIR = "./output"

# 支持的文件格式
SUPPORTED_FORMATS = ["*.md"]

def convert_markdown_to_html(markdown_file: str) -> str:
    """
    将 Markdown 文件转换为 HTML
    
    Args:
        markdown_file: Markdown 文件路径
        
    Returns:
        HTML 内容
    """
    # 使用 OpenCode 转换
    from opencode import OpenCode
    
    opencode = OpenCode()
    
    # 读取 Markdown 内容
    with open(markdown_file, 'r') as f:
        markdown_content = f.read()
    
    # 使用 OpenCode 转换
    html_content = opencode.chat.send(
        message=f"将以下 Markdown 转换为 HTML：\n\n```\n{markdown_content}\n```",
        output_format="text"
    )
    
    return html_content

def main():
    """主函数"""
    # 创建输出目录
    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    
    # 查找所有 Markdown 文件
    markdown_files = []
    for pattern in SUPPORTED_FORMATS:
        markdown_files.extend(glob.glob(os.path.join(INPUT_DIR, pattern)))
    
    print(f"找到 {len(markdown_files)} 个文件")
    
    # 批量转换
    for markdown_file in markdown_files:
        print(f"处理：{markdown_file}")
        
        # 转换
        html_content = convert_markdown_to_html(markdown_file)
        
        # 保存
        filename = os.path.basename(markdown_file).replace('.md', '.html')
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        with open(output_path, 'w') as f:
            f.write(html_content)
        
        print(f"✓ 输出：{output_path}")
    
    print(f"\n转换完成！输出目录：{OUTPUT_DIR}")

if __name__ == "__main__":
    main()
```

---

### 配置文件生成

**示例：批量生成配置**

```python
#!/usr/bin/env python3
"""
批量生成配置文件
"""

from opencode import OpenCode

# 配置模板
CONFIG_TEMPLATE = """
# {service_name} 配置文件
# 生成时间：{timestamp}

server:
  host: "{host}"
  port: {port}

database:
  host: "{db_host}"
  port: {db_port}
  name: "{db_name}"
  user: "{db_user}"
  password: "{db_password}"

logging:
  level: "{log_level}"
  file: "{log_file}"
"""

def generate_config(service_name: str, config: dict) -> str:
    """
    生成配置文件内容
    
    Args:
        service_name: 服务名称
        config: 配置参数
        
    Returns:
        配置文件内容
    """
    from datetime import datetime
    
    return CONFIG_TEMPLATE.format(
        service_name=service_name,
        timestamp=datetime.now().isoformat(),
        **config
    )

def main():
    """主函数"""
    # 服务列表
    services = [
        {
            "name": "api-server",
            "host": "0.0.0.0",
            "port": 8080,
            "db_host": "localhost",
            "db_port": 5432,
            "db_name": "api_db",
            "db_user": "api_user",
            "db_password": "***",
            "log_level": "info",
            "log_file": "/var/log/api-server.log"
        },
        {
            "name": "worker-server",
            "host": "0.0.0.0",
            "port": 8081,
            "db_host": "localhost",
            "db_port": 5432,
            "db_name": "worker_db",
            "db_user": "worker_user",
            "db_password": "***",
            "log_level": "debug",
            "log_file": "/var/log/worker-server.log"
        }
    ]
    
    # 批量生成
    for service in services:
        name = service.pop("name")
        content = generate_config(name, service)
        
        # 保存文件
        filename = f"{name}.yaml"
        with open(filename, 'w') as f:
            f.write(content)
        
        print(f"✓ 生成配置：{filename}")
    
    print("\n所有配置文件生成完成！")

if __name__ == "__main__":
    main()
```

---

## 模板化应用 📐

### 创建任务模板

**模板示例：**

```yaml
# templates/simple_task.yaml
name: "数据清洗任务"
description: "清洗和规范化数据"

input_format:
  type: "json"
  schema: |
    {
      "data": [...],
      "rules": [...]
    }

output_format:
  type: "json"
  schema: |
    {
      "cleaned_data": [...],
      "statistics": {...}
    }

prompt_template: |
  你是一位数据分析师，请清洗以下数据：

  ## 输入数据
  `<input_format>`
  <input_data>

  ## 清洗规则
  <rules>

  ## 输出格式
  `<output_format>`
  <output_template>

validation_rules:
  - "输出必须为有效的 JSON"
  - "必须包含 cleaned_data 和 statistics 字段"
```

---

### 使用模板

```python
from opencode import OpenCode
import yaml

# 加载模板
with open("templates/simple_task.yaml", 'r') as f:
    template = yaml.safe_load(f)

# 准备输入数据
input_data = {
    "data": [
        {"name": "张三", "age": "25", "email": "zhangsan@example.com"},
        {"name": "", "age": "invalid", "email": "invalid-email"}
    ],
    "rules": [
        "name 不能为空",
        "age 必须是 18-120 之间的数字",
        "email 必须是有效格式"
    ]
}

# 使用 OpenCode 执行任务
opencode = OpenCode()

prompt = template["prompt_template"].format(
    input_format=template["input_format"]["type"],
    input_data=input_data,
    rules="\n".join(f"- {rule}" for rule in input_data["rules"]),
    output_format=template["output_format"]["type"],
    output_template=template["output_format"]["schema"]
)

result = opencode.chat.send(message=prompt)

print(result)
```

---

## 常见问题 ❓

### Q1: 如何判断一个任务是否适合用 OpenCode 处理？🤔

**A:** 使用简单任务检查清单。

```
✅ 需求明确吗？
✅ 步骤固定吗？
✅ 输入简单吗？
✅ 输出规范吗？
✅ 经常遇到吗？
✅ 逻辑简单吗？

如果大部分回答"是"，则适合。
```

---

### Q2: 如何提高简单任务的处理速度？⚡

**A:** 使用模板化和批处理。

**优化策略：**

```
1. 创建可复用模板
2. 批量处理相似任务
3. 使用预设提示词
4. 缓存常用结果
5. 自动化流程
```

---

### Q3: 如何保证简单任务的输出质量？✅

**A:** 设置验证规则和验收标准。

**质量保证：**

```
1. 明确输出格式
2. 添加验证规则
3. 提供示例参考
4. 设置约束条件
5. 人工抽检结果
```

---

### Q4: 简单任务可以自动化吗？🤖

**A:** 可以，使用脚本和模板。

**自动化方案：**

```
1. 编批处理脚本
2. 使用配置模板
3. 集成到 CI/CD
4. 定时任务执行
5. 事件触发执行
```

---

## 下一步 ➡️

掌握简单任务后，您可以：

1. **学习快速生成**：查看 [快速生成](./fast-generation)
2. **学习提示词技巧**：查看 [提示词技巧](../04-best-practices/prompt-tips)
3. **了解术语**：查看 [提示词](../05-terminology/prompt)
4. **查看故障排查**：查看 [常见问题](../07-troubleshooting/common-issues)

---

## 总结 📝

简单任务是 OpenCode 的强项。

**简单任务清单：**

```
🔍 任务识别
  [ ] 明确任务目标
  [ ] 评估复杂度
  [ ] 判断是否适合
  [ ] 确定处理方式

📋 处理流程
  [ ] 定义任务
  [ ] 设计模板
  [ ] 自动执行
  [ ] 验证结果

📝 任务类型
  [ ] 文本处理
  [ ] 数据处理
  [ ] 代码生成
  [ ] 文档生成

⚡ 优化策略
  [ ] 模板化
  [ ] 批处理
  [ ] 自动化
  [ ] 持续优化
```

**简单任务应用场景：**

```
📝 文本处理：
  格式转换、内容提取、内容摘要

📊 数据处理：
  数据清洗、数据转换、数据分析

💻 代码生成：
  模板代码、工具函数、测试用例

📄 文档生成：
  README、API 文档、技术文档
```

---

**🎉 简单任务学习完成！**

现在您可以用 OpenCode 高效处理重复性任务了！⚡
