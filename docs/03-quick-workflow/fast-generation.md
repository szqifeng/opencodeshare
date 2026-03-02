---
description: OpenCode 快速生成教程，介绍如何使用 OpenCode 快速生成各种类型的内容。帮助您大幅提升内容创作效率。
keywords: ["OpenCode 快速生成", "OpenCode 内容生成", "AI 内容创作", "生成效率"]
---

# 快速生成

OpenCode 的快速生成功能让您能够在几秒钟内生成各种类型的内容，包括代码、文档、文案、报告等。本文将详细介绍不同类型内容的生成方法、提示词设计、质量控制、批量生成以及生成优化技巧。

通过掌握快速生成技巧，您可以大幅提升内容创作效率，从繁琐的重复性工作中解放出来。

快速生成就像是"打印机"，输入模板，批量输出。

## 快速生成原理 🚀

### 什么是快速生成

在 OpenCode 中，**快速生成**（Fast Generation）是指通过优化的提示词和模板，快速生成标准化内容的能力。

**白话解释：**

就像"批量打印"：
- 📄 设计好模板
- 🔄 批量输入数据
- ⚡ 快速生成内容

**快速生成的特点：**

```
✅ 速度快：秒级生成
✅ 质量高：符合标准
✅ 可批量：一次生成多个
✅ 可复用：模板反复使用
```

---

### 快速生成流程

```
1. 分析需求 → 确定生成内容类型
2. 设计模板 → 创建可复用模板
3. 准备输入 → 收集必要信息
4. 优化提示词 → 编写高效提示词
5. 执行生成 → 批量生成内容
6. 质量检查 → 验证输出质量
7. 迭代优化 → 持续改进模板
```

---

## 代码快速生成 💻

### REST API 生成

**场景：** 快速生成 REST API 接口。

**提示词模板：**

```markdown
你是一位全栈开发工程师，请生成 REST API 代码：

## 实体信息
实体名称：{{entity_name}}
字段列表：
{{fields}}

## 技术栈
框架：{{framework}}（FastAPI/Flask/Django）
ORM：{{orm}}（SQLAlchemy/Django ORM）
数据库：{{database}}（PostgreSQL/MySQL）

## 接口要求
1. 实现完整的 CRUD 接口
2. 添加输入验证
3. 添加错误处理
4. 添加分页支持
5. 添加 Swagger 文档

## 输出格式
按以下顺序输出：
1. 数据库模型代码
2. Pydantic Schema 代码
3. FastAPI 路由代码
4. 依赖安装命令

## 示例实体
{{example_entity}}
```

**使用示例：**

```markdown
你是一位全栈开发工程师，请生成 REST API 代码：

## 实体信息
实体名称：User
字段列表：
- id: int, 主键, 自增
- username: str, 唯一, 长度 1-50
- email: str, 唯一, 有效邮箱格式
- password: str, 必须加密存储
- is_active: bool, 默认 True
- created_at: datetime, 自动生成
- updated_at: datetime, 自动更新

## 技术栈
框架：FastAPI
ORM：SQLAlchemy
数据库：PostgreSQL

## 接口要求
1. 实现完整的 CRUD 接口
2. 添加输入验证
3. 添加错误处理
4. 添加分页支持
5. 添加 Swagger 文档

## 输出格式
按以下顺序输出：
1. 数据库模型代码
2. Pydantic Schema 代码
3. FastAPI 路由代码
4. 依赖安装命令
```

---

### 工具函数生成

**场景：** 快速生成常用工具函数。

**提示词模板：**

```markdown
你是一位 Python 开发工程师，请生成工具函数模块：

## 模块名称
{{module_name}}

## 功能列表
{{functions}}

## 编码规范
1. 使用类型注解
2. 包含完整的文档字符串
3. 添加参数验证
4. 添加异常处理
5. 遵循 PEP 8 规范
6. 添加单元测试

## 输出格式
```python
# utils/{{module_name}}.py
[代码]
```
```

**使用示例：**

```markdown
你是一位 Python 开发工程师，请生成工具函数模块：

## 模块名称
date_helper

## 功能列表
1. get_current_timestamp() - 获取当前时间戳（毫秒）
2. timestamp_to_datetime(timestamp) - 时间戳转 datetime
3. datetime_to_timestamp(dt) - datetime 转时间戳
4. format_datetime(dt, format) - 格式化日期时间
5. date_diff(dt1, dt2) - 计算日期差（天数）
6. get_date_range(start, end) - 获取日期范围列表

## 编码规范
1. 使用类型注解
2. 包含完整的文档字符串
3. 添加参数验证
4. 添加异常处理
5. 遵循 PEP 8 规范
6. 添加单元测试

## 输出格式
```python
# utils/date_helper.py
[代码]

# tests/test_date_helper.py
[测试代码]
```
```

---

### 数据模型生成

**场景：** 快速生成数据模型。

**提示词模板：**

```markdown
你是一位后端开发工程师，请生成数据模型代码：

## 实体列表
{{entities}}

## 技术栈
ORM：{{orm}}（SQLAlchemy/Django ORM）
数据库：{{database}}

## 要求
1. 定义所有字段和类型
2. 添加索引
3. 定义关系（一对多、多对多）
4. 添加约束（唯一、非空）
5. 添加时间戳字段

## 输出格式
```python
# models/__init__.py
[模型代码]
```
```

---

## 文档快速生成 📄

### README 生成

**场景：** 快速生成项目 README。

**提示词模板：**

```markdown
你是一位技术文档工程师，请生成项目 README：

## 项目信息
- 项目名称：{{project_name}}
- 版本：{{version}}
- 描述：{{description}}
- 作者：{{author}}

## 技术栈
{{tech_stack}}

## 功能列表
{{features}}

## 要求
1. 使用标准 Markdown 格式
2. 包含项目徽章（Badges）
3. 包含安装说明
4. 包含快速开始
5. 包含使用示例
6. 包含 API 文档链接
7. 包含贡献指南
8. 包含许可证信息

## 输出格式
```markdown
[README 内容]
```
```

**使用示例：**

```markdown
你是一位技术文档工程师，请生成项目 README：

## 项目信息
- 项目名称：OpenCode Utils
- 版本：1.0.0
- 描述：Python 常用工具函数库，提供日期、字符串、文件等常用功能
- 作者：OpenCode Team

## 技术栈
- Python 3.10+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Redis

## 功能列表
1. 日期时间处理
2. 字符串工具
3. 文件操作
4. 数据验证
5. 日志工具
6. 缓存工具

## 要求
1. 使用标准 Markdown 格式
2. 包含项目徽章（Badges）
3. 包含安装说明
4. 包含快速开始
5. 包含使用示例
6. 包含 API 文档链接
7. 包含贡献指南
8. 包含许可证信息

## 输出格式
```markdown
[README 内容]
```
```

---

### API 文档生成

**场景：** 快速生成 API 文档。

**提示词模板：**

```markdown
你是一位 API 文档工程师，请生成 API 文档：

## 接口列表
{{endpoints}}

## 要求
1. 使用 OpenAPI/Swagger 格式
2. 包含接口概述
3. 包含请求方法
4. 包含请求参数说明
5. 包含请求体示例
6. 包含响应示例
7. 包含错误码说明
8. 包含状态码说明

## 输出格式
```markdown
# API 文档

## 概述
[概述内容]

## 接口列表
[接口详情]

## 错误码
[错误码说明]
```
```

---

### 技术文档生成

**场景：** 快速生成技术文档。

**提示词模板：**

```markdown
你是一位技术文档工程师，请生成技术文档：

## 文档主题
{{topic}}

## 目标读者
{{audience}}

## 文档类型
{{doc_type}}（教程/指南/参考手册）

## 要求
1. 结构清晰，层次分明
2. 内容详实，示例丰富
3. 图文并茂，易于理解
4. 包含最佳实践
5. 包含常见问题

## 输出格式
```markdown
# {{title}}

## 概述
[概述内容]

## {{section_1}}
[内容]

## {{section_2}}
[内容]

...

## 最佳实践
[内容]

## 常见问题
[内容]

## 参考资料
[链接]
```
```

---

## 文案快速生成 ✍️

### 产品文案生成

**场景：** 快速生成产品宣传文案。

**提示词模板：**

```markdown
你是一位资深文案策划，请生成产品宣传文案：

## 产品信息
- 产品名称：{{product_name}}
- 产品类型：{{product_type}}
- 目标用户：{{target_users}}
- 核心卖点：{{selling_points}}

## 文案要求
1. 语言简洁有力
2. 突出核心优势
3. 吸引目标用户
4. 包含行动号召
5. 适配发布平台

## 发布平台
{{platform}}（微信/小红书/抖音/微博）

## 输出格式
```markdown
{{platform_specific_format}}
```
```

**小红书示例：**

```markdown
你是一位资深文案策划，请生成产品宣传文案：

## 产品信息
- 产品名称：AI 助手 App
- 产品类型：生产力工具
- 目标用户：职场人士、学生、创作者
- 核心卖点：
  1. AI 智能助手，24小时在线
  2. 支持多场景应用（写作、编程、学习）
  3. 免费使用，无广告
  4. 简单易用，上手快

## 文案要求
1. 语言简洁有力
2. 突出核心优势
3. 吸引目标用户
4. 包含行动号召
5. 适配小红书风格（表情符号、短句、标签）

## 输出格式
```markdown
[标题]

[正文内容]

[标签]
```
```

---

### 社交媒体文案生成

**场景：** 快速生成社交媒体文案。

**提示词模板：**

```markdown
你是一位社交媒体运营专家，请生成社交媒体文案：

## 内容主题
{{topic}}

## 平台类型
{{platform}}（微信/微博/抖音/小红书）

## 内容要求
1. 符合平台调性
2. 吸引目标用户
3. 引发互动
4. 包含相关话题标签
5. 适当的表情符号

## 输出格式
```markdown
[标题/开头]

[正文内容]

[话题标签]
```
```

---

### 邮件文案生成

**场景：** 快速生成邮件文案。

**提示词模板：**

```markdown
你是一位邮件营销专家，请生成邮件文案：

## 邮件类型
{{email_type}}（邀请/通知/促销/更新）

## 邮件信息
- 发件人：{{sender}}
- 收件人：{{recipient}}
- 主题：{{subject}}

## 邮件内容
{{content}}

## 要求
1. 标题吸引人
2. 内容简洁明了
3. 行动号召明确
4. 专业的语气
5. 包含退订链接（如果是营销邮件）

## 输出格式
```
主题：[邮件标题]

[邮件正文]

[签名]

[退订链接]
```
```

---

## 报告快速生成 📊

### 数据分析报告生成

**场景：** 快速生成数据分析报告。

**提示词模板：**

```markdown
你是一位数据分析师，请生成数据分析报告：

## 数据来源
{{data_source}}

## 分析时间范围
{{time_range}}

## 分析要求
1. 数据概览
2. 关键指标分析
3. 趋势分析
4. 异常分析
5. 结论和建议

## 输出格式
```markdown
# 数据分析报告

## 概述
[报告概述]

## 数据概览
[数据描述]

## 关键指标
[指标分析]

## 趋势分析
[趋势描述]

## 异常分析
[异常说明]

## 结论和建议
[建议内容]
```
```

---

### 项目进度报告生成

**场景：** 快速生成项目进度报告。

**提示词模板：**

```markdown
你是一位项目经理，请生成项目进度报告：

## 项目信息
- 项目名称：{{project_name}}
- 报告周期：{{period}}

## 完成任务
{{completed_tasks}}

## 进行中任务
{{in_progress_tasks}}

## 阻碍因素
{{blockers}}

## 下周计划
{{next_week_plan}}

## 输出格式
```markdown
# 项目进度报告

## 项目概况
[项目描述]

## 本周进展
[完成情况]

## 风险和问题
[风险描述]

## 下周计划
[计划内容]

## 资源需求
[需求描述]
```
```

---

## 批量生成策略 📦

### 并行生成

**场景：** 同时生成多个相关内容。

**示例代码：**

```python
#!/usr/bin/env python3
"""
批量生成 API 接口
"""

from opencode import OpenCode
from concurrent.futures import ThreadPoolExecutor

# OpenCode 实例
opencode = OpenCode()

# 实体列表
entities = [
    {"name": "User", "fields": [...]},
    {"name": "Product", "fields": [...]},
    {"name": "Order", "fields": [...]},
]

def generate_api(entity):
    """生成单个实体的 API"""
    prompt = f"""
    请为 {entity['name']} 生成 REST API：
    
    字段列表：{entity['fields']}
    
    要求：
    1. 实现 CRUD 接口
    2. 使用 FastAPI
    3. 添加验证和错误处理
    """
    
    result = opencode.chat.send(message=prompt)
    return entity['name'], result

# 并行生成
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(generate_api, entities))

# 输出结果
for name, code in results:
    filename = f"{name.lower()}_api.py"
    with open(filename, 'w') as f:
        f.write(code)
    print(f"✓ 生成：{filename}")
```

---

### 模板批量生成

**场景：** 使用模板批量生成相似内容。

**示例代码：**

```python
#!/usr/bin/env python3
"""
使用模板批量生成 README
"""

from opencode import OpenCode

# OpenCode 实例
opencode = OpenCode()

# 模板
template = """
你是一位技术文档工程师，请生成项目 README：

## 项目信息
- 项目名称：{name}
- 版本：{version}
- 描述：{description}
- 作者：OpenCode Team

## 技术栈
{tech_stack}

## 功能列表
{features}

要求：标准 Markdown 格式，包含安装说明、使用示例
"""

# 项目列表
projects = [
    {
        "name": "OpenCode Utils",
        "version": "1.0.0",
        "description": "常用工具函数库",
        "tech_stack": "Python 3.10+, FastAPI",
        "features": "日期处理、字符串工具、文件操作"
    },
    {
        "name": "OpenCode CLI",
        "version": "2.0.0",
        "description": "命令行工具",
        "tech_stack": "Python 3.10+, Click",
        "features": "命令解析、配置管理、插件系统"
    },
    {
        "name": "OpenCode Web",
        "version": "1.5.0",
        "description": "Web 界面",
        "tech_stack": "React, TypeScript",
        "features": "用户界面、实时交互、可视化"
    }
]

# 批量生成
for project in projects:
    # 使用模板生成提示词
    prompt = template.format(**project)
    
    # 生成 README
    readme = opencode.chat.send(message=prompt)
    
    # 保存文件
    filename = f"{project['name'].lower().replace(' ', '_')}/README.md"
    with open(filename, 'w') as f:
        f.write(readme)
    
    print(f"✓ 生成：{filename}")

print("\n所有 README 生成完成！")
```

---

## 质量控制 ✅

### 输出验证

**验证规则：**

```markdown
## 代码验证
✅ 语法正确
✅ 符合规范（PEP 8）
✅ 包含类型注解
✅ 包含文档字符串
✅ 包含错误处理

## 文档验证
✅ 格式正确（Markdown）
✅ 结构清晰
✅ 内容完整
✅ 无语法错误
✅ 链接有效

## 文案验证
✅ 语法正确
✅ 表达清晰
✅ 符合品牌调性
✅ 包含行动号召
✅ 无敏感内容
```

---

### 自动化测试

**示例代码：**

```python
#!/usr/bin/env python3
"""
自动化测试生成内容
"""

import ast
import re
from pathlib import Path

def validate_python_code(code: str) -> bool:
    """验证 Python 代码"""
    try:
        ast.parse(code)
        return True
    except SyntaxError:
        return False

def validate_markdown(content: str) -> bool:
    """验证 Markdown 格式"""
    # 检查标题
    if not re.search(r'^#+ ', content, re.MULTILINE):
        return False
    
    # 检查代码块
    if not re.search(r'```', content):
        return False
    
    return True

def validate_email(content: str) -> bool:
    """验证邮件格式"""
    # 检查主题行
    if not re.search(r'^主题：', content, re.MULTILINE):
        return False
    
    # 检查正文
    if len(content) < 100:
        return False
    
    return True

def main():
    """主函数"""
    # 遍历生成的内容
    for filepath in Path("./output").glob("*"):
        print(f"验证：{filepath.name}")
        
        with open(filepath) as f:
            content = f.read()
        
        # 根据文件类型验证
        if filepath.suffix == ".py":
            is_valid = validate_python_code(content)
        elif filepath.suffix == ".md":
            is_valid = validate_markdown(content)
        elif filepath.suffix == ".txt":
            is_valid = validate_email(content)
        else:
            is_valid = False
        
        if is_valid:
            print(f"  ✓ 验证通过")
        else:
            print(f"  ✗ 验证失败")

if __name__ == "__main__":
    main()
```

---

## 实际应用案例 📊

### 案例 1：批量生成 CRUD API 💻

**场景：** 为电商系统生成所有模块的 CRUD API

**实现：**

```python
#!/usr/bin/env python3
"""
为电商系统批量生成 CRUD API
"""

from opencode import OpenCode

# 模块定义
modules = {
    "User": {
        "fields": [
            "id: int, 主键",
            "username: str, 用户名, 唯一",
            "email: str, 邮箱, 唯一",
            "password: str, 密码, 加密",
            "phone: str, 手机号",
            "address: str, 地址",
            "is_active: bool, 是否激活"
        ]
    },
    "Product": {
        "fields": [
            "id: int, 主键",
            "name: str, 商品名称",
            "description: text, 商品描述",
            "price: decimal, 价格",
            "stock: int, 库存",
            "category_id: int, 分类ID, 外键",
            "is_active: bool, 是否上架"
        ]
    },
    "Order": {
        "fields": [
            "id: int, 主键",
            "user_id: int, 用户ID, 外键",
            "total_amount: decimal, 总金额",
            "status: str, 订单状态",
            "shipping_address: str, 收货地址",
            "created_at: datetime, 创建时间",
            "updated_at: datetime, 更新时间"
        ]
    }
}

# 生成 API
opencode = OpenCode()

for module_name, module_info in modules.items():
    print(f"生成 {module_name} API...")
    
    prompt = f"""
    请为 {module_name} 生成完整的 CRUD API：
    
    字段列表：
    {chr(10).join(f'- {field}' for field in module_info['fields'])}
    
    要求：
    1. 使用 FastAPI
    2. 使用 SQLAlchemy
    3. 包含 Pydantic Schema
    4. 实现完整 CRUD
    5. 添加输入验证
    6. 添加错误处理
    7. 添加分页支持
    8. 添加 Swagger 文档
    """
    
    code = opencode.chat.send(message=prompt)
    
    # 保存文件
    filename = f"api/{module_name.lower()}.py"
    with open(filename, 'w') as f:
        f.write(code)
    
    print(f"✓ 已保存：{filename}")

print("\n所有 API 生成完成！")
```

---

### 案例 2：批量生成产品文案 ✍️

**场景：** 为多个产品生成社交媒体文案

**实现：**

```python
#!/usr/bin/env python3
"""
批量生成产品文案
"""

from opencode import OpenCode

# 产品列表
products = [
    {
        "name": "智能手表",
        "type": "电子产品",
        "target": "健身爱好者、上班族",
        "selling_points": ["心率监测", "运动追踪", "消息提醒", "防水设计"],
        "platform": "小红书"
    },
    {
        "name": "无线耳机",
        "type": "音频设备",
        "target": "音乐爱好者、游戏玩家",
        "selling_points": ["主动降噪", "高保真音质", "长续航", "舒适佩戴"],
        "platform": "小红书"
    },
    {
        "name": "移动电源",
        "type": "充电设备",
        "target": "旅行者、户外爱好者",
        "selling_points": ["大容量", "快充技术", "便携设计", "多重保护"],
        "platform": "小红书"
    }
]

# 生成文案
opencode = OpenCode()

for product in products:
    print(f"生成 {product['name']} 文案...")
    
    prompt = f"""
    你是一位小红书文案专家，请为以下产品写文案：
    
    产品名称：{product['name']}
    产品类型：{product['type']}
    目标用户：{product['target']}
    核心卖点：
    {chr(10).join(f'{i+1}. {point}' for i, point in enumerate(product['selling_points']))}
    
    要求：
    1. 热情活泼的语气
    2. 使用表情符号
    3. 短句为主
    4. 突出核心卖点
    5. 包含话题标签
    
    输出格式：
    [标题]
    [正文内容]
    [标签]
    """
    
    copy = opencode.chat.send(message=prompt)
    
    # 保存文件
    filename = f"copy/{product['name']}_xiaohongshu.md"
    with open(filename, 'w') as f:
        f.write(copy)
    
    print(f"✓ 已保存：{filename}")

print("\n所有文案生成完成！")
```

---

## 常见问题 ❓

### Q1: 如何提高生成速度？⚡

**A:** 使用模板和批处理。

**优化策略：**

```
1. 预先设计好模板
2. 准备完整的输入数据
3. 使用并行生成
4. 减少不必要的验证
5. 缓存常用结果
```

---

### Q2: 如何保证生成质量？✅

**A:** 设置明确的约束和验证规则。

**质量保证：**

```
1. 明确输出格式
2. 提供示例参考
3. 设置约束条件
4. 添加验证规则
5. 人工抽检结果
```

---

### Q3: 批量生成会遇到什么问题？⚠️

**A:** 可能遇到的问题和解决方案。

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 生成速度慢 | 模板复杂 | 简化模板 |
| 输出不一致 | 输入数据不规范 | 规范化输入 |
| 质量不稳定 | 约束不明确 | 明确约束条件 |
| 格式错误 | 验证不足 | 添加验证规则 |

---

### Q4: 如何优化批量生成效率？📈

**A:** 使用并行处理和缓存。

**优化方案：**

```python
# 1. 使用并行处理
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(generate, tasks))

# 2. 使用缓存
from functools import lru_cache

@lru_cache(maxsize=100)
def generate_cached(template, data):
    return generate(template, data)
```

---

## 下一步 ➡️

掌握快速生成后，您可以：

1. **学习单轮对话**：查看 [单轮对话](./single-dialogue)
2. **学习简单任务**：查看 [简单任务](./simple-task)
3. **查看提示词技巧**：查看 [提示词技巧](../04-best-practices/prompt-tips)
4. **了解术语**：查看 [提示词](../05-terminology/prompt)

---

## 总结 📝

快速生成是 OpenCode 的核心能力。

**快速生成清单：**

```
💻 代码生成
  [ ] REST API
  [ ] 工具函数
  [ ] 数据模型
  [ ] 测试代码

📄 文档生成
  [ ] README
  [ ] API 文档
  [ ] 技术文档
  [ ] 用户手册

✍️ 文案生成
  [ ] 产品文案
  [ ] 社交媒体
  [ ] 邮件文案
  [ ] 营销文案

📊 报告生成
  [ ] 数据分析
  [ ] 项目进度
  [ ] 工作总结
  [ ] 绩效报告
```

**快速生成优化：**

```
⚡ 性能优化
  [ ] 使用模板
  [ ] 并行处理
  [ ] 缓存结果
  [ ] 简化验证

✅ 质量优化
  [ ] 明确约束
  [ ] 提供示例
  [ ] 验证输出
  [ ] 持续迭代
```

---

**🎉 快速生成学习完成！**

现在您可以用 OpenCode 快速生成各种内容了！⚡
