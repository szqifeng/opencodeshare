---
description: OpenCode 规则设置教程，包括系统规则、自定义规则、规则优先级等。帮助您通过规则控制 AI 的行为，确保输出符合您的要求和标准。
keywords: ["OpenCode 规则设置", "OpenCode 自定义规则", "AI 行为控制", "规则管理"]
---

# 规则设置

OpenCode 的规则系统让您能够精确控制 AI 的行为和输出质量。本文将详细介绍如何配置系统规则、创建自定义规则、管理规则优先级以及优化规则效果。

通过合理设置规则，您可以确保 OpenCode 的输出符合您的品牌调性、技术标准和业务要求，同时避免不当内容的产生。

## 规则系统概览 📋

### 什么是规则 📏

在 OpenCode 中，**规则**是指对 AI 行为和输出的约束和指导原则。

**白话解释：**

就像给助手制定"工作手册"：
- 📖 告诉他"什么可以做，什么不能做"
- 🎨 指导他"用什么风格说话"
- 📊 规定他"回答的详细程度"
- ⚠️ 明确他"遇到敏感话题怎么处理"

**规则的特点：**

```
✅ 控制输出风格
✅ 约束行为边界
✅ 提高输出一致性
✅ 避免不当内容
✅ 符合品牌调性
```

---

## 系统内置规则 🛠️

### 1. 内容安全规则 🔒

```yaml
system_rules:
  content_safety:
    enabled: true
    
    # 禁止内容类型
    prohibited:
      - "暴力"
      - "仇恨言论"
      - "歧视"
      - "非法内容"
      - "成人内容"
    
    # 敏感话题处理
    sensitive_topics:
      - "政治"
      - "宗教"
      - "种族"
      handling: "refuse"  # refuse, redirect, neutralize
    
    # 年龄分级
    rating: "PG-13"  # G, PG, PG-13, R
```

**白话解释：**

就像制定"安全准则"：
- 🚫 明确告诉助手哪些话题不能碰
- 🚫 遇到敏感话题如何处理（拒绝/转移/中和）
- 📊 根据目标用户设定内容等级（像电影分级）

---

### 2. 语言风格规则 📝

```yaml
system_rules:
  language_style:
    # 语言偏好
    locale: "zh-CN"  # 语言代码
    formal_level: "semi-formal"  # informal, semi-formal, formal, very-formal
    
    # 口语化程度
    colloquialism: "moderate"  # none, low, moderate, high
    
    # 语气
    tone: "friendly"  # professional, friendly, casual
    
    # 称呼方式
    address: "您"  # 你, 您, 朋友, 同学
```

**示例对比：**

```
informal (非正式）：
  哥们，这个超酷的！你试试呗？

semi-formal (半正式）✅ 推荐：
  您好，这个功能很不错，您可以试一试。

formal (正式）：
  尊敬的用户，您好。该功能设计精良，请您使用。

very-formal (超正式）：
  阁下钧鉴，该功能设计精良，恳请阁下惠予试用。
```

---

### 3. 技术规范规则 💻

```yaml
system_rules:
  technical_standards:
    # 代码规范
    code_style:
      language: "typescript"  # 首选语言
      indent: "2 空格"  # 缩进
      naming_convention: "camelCase"  # 命名规范
      max_line_length: 80  # 最长行
    
    # 文档规范
    doc_format:
      - 使用 JSDoc 注释
      - 包含参数说明
      - 包含返回值说明
      - 提供使用示例
    
    # 安全规范
    security:
      - 不硬编码密钥
      - 输入验证
      - 错误处理
      - 最小权限原则
```

---

### 4. 输出长度规则 📏

```yaml
system_rules:
  output_length:
    # 回答长度
    answer:
      min_words: 50  # 最少字数
      max_words: 500  # 最多字数
      target: "concise"  # brief, concise, detailed
    
    # 代码块长度
    code:
      max_lines: 50  # 最长行数
      prefer_function: true  # 优先完整函数
    
    # 列表长度
    list:
      max_items: 10  # 最长列表项数
      group_items: true  # 自动分组
```

---

## 自定义规则 🎨

### 创建规则文件 📝

在 `~/.opencode/rules/` 目录创建规则文件：

#### 规则 1：品牌调性规则

创建 `~/.opencode/rules/branding.json`：

```json
{
  "name": "品牌调性规则",
  "version": "1.0",
  "description": "确保输出符合品牌调性",
  "rules": [
    {
      "id": "brand_001",
      "priority": "high",
      "type": "language",
      "description": "使用统一的品牌语言",
      "conditions": {
        "always": true
      },
      "actions": [
        "使用'用户'而不是'客户'",
        "使用'我们'而不是'本公司'",
        "避免使用营销化语言"
      ],
      "examples": {
        "bad": [
          "客户您好，本产品是业界最先进的",
          "亲爱的用户，限时优惠！"
        ],
        "good": [
          "您好，这个功能可以帮助您",
          "这个功能提供了便利的使用体验"
        ]
      }
    },
    {
      "id": "brand_002",
      "priority": "medium",
      "type": "tone",
      "description": "保持专业友好的语气",
      "conditions": {
        "context": ["customer_service", "support"]
      },
      "actions": [
        "保持专业但不冷漠",
        "表达同理心",
        "提供具体帮助"
      ]
    }
  ]
}
```

---

#### 规则 2：技术标准规则

创建 `~/.opencode/rules/technical.json`：

```json
{
  "name": "技术标准规则",
  "version": "1.0",
  "description": "确保输出符合技术标准",
  "rules": [
    {
      "id": "tech_001",
      "priority": "high",
      "type": "code",
      "description": "遵循代码规范",
      "conditions": {
        "content_type": ["code", "programming"]
      },
      "actions": [
        "使用 TypeScript 类型注解",
        "添加必要的注释",
        "函数单一职责",
        "错误处理使用 try-catch"
      ],
      "examples": {
        "bad": [
          "function foo(x, y) { return x + y }"
        ],
        "good": [
          "function add(a: number, b: number): number {\n  return a + b;\n}"
        ]
      }
    },
    {
      "id": "tech_002",
      "priority": "medium",
      "type": "security",
      "description": "安全最佳实践",
      "conditions": {
        "content_type": ["code", "database", "api"]
      },
      "actions": [
        "永远不硬编码密钥",
        "输入参数必须验证",
        "SQL 查询使用参数化",
        "API 调用使用 HTTPS"
      ]
    }
  ]
}
```

---

#### 规则 3：输出格式规则

创建 `~/.opencode/rules/formatting.json`：

```json
{
  "name": "输出格式规则",
  "version": "1.0",
  "description": "统一输出格式",
  "rules": [
    {
      "id": "format_001",
      "priority": "high",
      "type": "structure",
      "description": "Markdown 格式规范",
      "conditions": {
        "output_format": ["markdown", "text"]
      },
      "actions": [
        "标题使用 # ## ### 层级",
        "列表使用 - 或数字",
        "代码块使用 ``` 包裹",
        "强调使用 ** 或 __"
      ],
      "examples": {
        "bad": [
          "标题：这是标题\n列表：1. 第一项 2. 第二项"
        ],
        "good": [
          "## 这是标题\n\n- 第一项\n- 第二项"
        ]
      }
    },
    {
      "id": "format_002",
      "priority": "medium",
      "type": "json",
      "description": "JSON 输出格式",
      "conditions": {
        "output_format": ["json", "api"]
      },
      "actions": [
        "使用 2 空格缩进",
        "字符串使用双引号",
        "键名使用小写_下划线",
        "不添加末尾逗号"
      ]
    }
  ]
}
```

---

### 加载自定义规则 📚

#### 方式 1：配置文件

```yaml
# 主配置文件
custom_rules:
  enabled: true
  directory: "~/.opencode/rules"
  auto_reload: true  # 自动重载

# 指定规则文件
rules:
  - "~/.opencode/rules/branding.json"
  - "~/.opencode/rules/technical.json"
  - "~/.opencode/rules/formatting.json"
```

#### 方式 2：命令行加载

```bash
# 加载所有规则
opencode rules load

# 加载指定规则
opencode rules load branding.json

# 查看已加载规则
opencode rules list

# 验证规则
opencode rules validate
```

**输出示例：**

```
规则加载结果
================================

✅ 已加载 3 个规则文件：
  • branding.json (品牌调性）
  • technical.json (技术标准）
  • formatting.json (输出格式）

总计：12 个规则规则
  • 高优先级: 4 个
  • 中优先级: 6 个
  • 低优先级: 2 个

🎉 所有规则已成功加载！
```

---

## 规则优先级 📊

### 优先级级别

| 级别 | 名称 | 执行顺序 | 覆盖性 |
|------|------|----------|--------|
| ⭐⭐⭐⭐⭐ | Critical | 1 | 最高 |
| ⭐⭐⭐⭐ | High | 2 | 很高 |
| ⭐⭐⭐ | Medium | 3 | 一般 |
| ⭐⭐ | Low | 4 | 较低 |
| ⭐ | Info | 5 | 最低 |

### 规则冲突处理 🔄

```yaml
rules:
  # 冲突处理策略
  conflict_resolution:
    strategy: "priority"  # priority, newest, oldest, merge
    
    # 合并策略
    merge_strategy:
      language: "highest_priority"
      tone: "combine"
      format: "strict"
```

**冲突处理示例：**

```
场景：品牌规则要求"使用'用户'"，技术规则要求"使用'客户'"

优先级策略：
  品牌规则 (high) > 技术规则 (medium)
  结果：使用"用户" ✅

合并策略：
  客服场景 → 使用"用户"
  技术文档 → 使用"客户"
```

**白话解释：**

就像"公司制度"：
- 📖 公司基本制度（系统规则）是最高优先级
- 🎨 部门规范（自定义规则）次之
- 💬 个人习惯（用户偏好）最低
- 🔄 当有冲突时，优先级高的说了算

---

## 规则验证 ✅

### 测试规则

```bash
# 测试单个规则
opencode rules test --id brand_001

# 测试所有规则
opencode rules test --all

# 使用测试用例测试
opencode rules test --cases tests/rules.json
```

**输出示例：**

```
规则测试结果
================================

测试用例总数: 20
通过: 18 ✅
失败: 2 ❌

失败详情：
  ❌ brand_001: 测试用例 #5 失败
     期望: 使用"用户"
     实际: 使用"客户"
     建议: 检查优先级配置
  
  ❌ tech_002: 测试用例 #12 失败
     期望: 参数化查询
     实际: 硬编码值
     建议: 添加安全检查

覆盖率:
  语言规则: 100%
  代码规则: 85%
  安全规则: 100%
  格式规则: 90%
```

---

### 规则覆盖率报告 📊

```bash
# 生成覆盖率报告
opencode rules report --coverage

# 查看规则使用情况
opencode rules report --usage
```

**输出示例：**

```
规则覆盖率报告
================================

总规则数: 12
已触发: 10 (83.3%)
未触发: 2 (16.7%)

未触发的规则:
  • format_002 (JSON 格式） - 原因：输出未包含 JSON
  • tech_001 (代码规范） - 原因：未生成代码

建议:
  • 如果规则长期未触发，考虑移除
  • 如果规则频繁触发，考虑优化
  • 保持规则精简有效
```

---

## 实际应用案例 📊

### 案例 1：电商客服机器人 🛒

**需求：** 统一客服回复风格，符合品牌调性

**规则配置：**

```yaml
rules:
  # 客服场景规则
  customer_service:
    # 语气规则
    tone:
      level: "friendly"  # 友好
      warm: true  # 温暖
      empathy: true  # 同理心
    
    # 语言规则
    language:
      locale: "zh-CN"
      use_emojis: true  # 可以使用表情
      avoid_jargon: true  # 避免专业术语
    
    # 回复结构
    structure:
      - "问候用户"
      - "理解问题"
      - "提供解决方案"
      - "确认是否解决"
      - "结束语"
```

**对话示例：**

```
用户：我的订单还没到，怎么回事？

OpenCode：[应用规则：客服场景]
[问候用户] 您好，很抱歉让您久等了
[理解问题] 我理解您对订单延迟的担心
[提供解决方案] 我帮您查询了一下，您的订单正在运输途中，预计明天送达
[确认是否解决] 这个安排可以吗？还有什么我可以帮您的？
[结束语] 感谢您的耐心等待！🙏
```

---

### 案例 2：代码审查助手 🔍

**需求：** 确保代码符合团队规范

**规则配置：**

```yaml
rules:
  # 代码审查规则
  code_review:
    # 代码规范
    style:
      indent: 2  # 2 空格缩进
      max_line_length: 80  # 最长 80 字符
      naming: "camelCase"  # 小驼峰命名
    
    # 质量规则
    quality:
      - "必须添加类型注解"
      - "必须包含错误处理"
      - "避免使用 any 类型"
      - "函数长度不超过 50 行"
    
    # 安全规则
    security:
      - "不硬编码密钥"
      - "输入必须验证"
      - "SQL 必须参数化"
      - "敏感数据必须加密"
```

**代码审查示例：**

```
用户代码：
```typescript
function process(data: any) {
  return JSON.parse(data);
}
```

OpenCode：[应用规则：代码审查]
[检查] 规则应用结果：
  ❌ 类型注解：使用了 any
  ❌ 错误处理：缺少 try-catch
  ❌ 输入验证：未验证参数

建议修改：
```typescript
function process(data: string): object {
  try {
    if (!data || data.trim().length === 0) {
      throw new Error('Invalid input');
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Parse error:', error);
    throw error;
  }
}
```

修改后的代码符合所有规范 ✅
```

---

### 案例 3：多语言输出助手 🌍

**需求：** 根据用户语言自动调整输出

**规则配置：**

```yaml
rules:
  # 多语言规则
  multilingual:
    # 语言检测
    auto_detect: true
    default_language: "zh-CN"
    
    # 各语言规则
    zh-CN:
      locale: "简体中文"
      formal: "semi-formal"
      address: "您"
      emojis: true
    
    en-US:
      locale: "English"
      formal: "semi-formal"
      address: "you"
      emojis: false
    
    ja-JP:
      locale: "日本語"
      formal: "formal"
      address: "あなた"
      emojis: false
```

**对话示例：**

```
用户（简体中文）：你好，请介绍一下你的功能

OpenCode：[检测语言: zh-CN]
[应用规则: zh-CN]
您好！我是 OpenCode AI 助手，可以帮您...

---

User (English): Hello, please introduce yourself

OpenCode：[Detected: en-US]
[Applying rules: en-US]
Hello! I am OpenCode AI Assistant, I can help you...

---

ユーザー（日本語）：こんにちは、自己紹介してください

OpenCode：[検出: ja-JP]
[ルール適用: ja-JP]
こんにちは！私は OpenCode AI アシスタントです...
```

---

## 常见问题 ❓

### Q1: 规则冲突了怎么办？⚔️

**A:** 使用冲突解决策略。

```yaml
# 配置冲突处理
rules:
  conflict_resolution:
    strategy: "priority"  # 按优先级
    
    # 或者使用合并
    strategy: "merge"
    merge_rules:
      - "取最高优先级"
      - "合并不冲突的规则"
```

**调试冲突：**

```bash
# 查看规则冲突
opencode rules check --conflicts

# 查看规则依赖
opencode rules check --dependencies
```

**输出示例：**

```
规则冲突检查
================================

⚠️ 发现 2 处规则冲突：

冲突 1:
  规则 A: brand_001 (使用"用户")
  规则 B: legacy_001 (使用"客户")
  优先级: A > B
  解决方案: 使用"用户"（规则 A ）

冲突 2:
  规则 A: tech_001 (代码规范)
  规则 B: style_001 (代码风格）
  优先级: 相同
  解决方案: 合并执行

建议:
  • 检查规则优先级配置
  • 明确规则适用场景
  • 避免规则重复定义
```

---

### Q2: 如何临时禁用规则？🔘

**A:** 有多种方式。

**方式 1：全局禁用**

```bash
# 禁用所有规则
opencode rules disable --all

# 禁用指定规则
opencode rules disable brand_001
```

**方式 2：会话级禁用**

```yaml
rules:
  # 会话配置
  session:
    # 临时禁用规则
    disabled_rules:
      - "format_001"
      - "brand_002"
    
    # 启用调试模式
    debug: true
```

**方式 3：对话中指定**

```
用户：帮我写这段代码，忽略所有格式规则

OpenCode：[规则状态：格式规则已禁用]
✅ 好的，将忽略格式规则

[生成代码...]
```

---

### Q3: 规则太严格了怎么办？⚖️

**A:** 调整规则灵活性。

```yaml
rules:
  # 灵活性配置
  flexibility:
    # 容忍度
    tolerance: "medium"  # strict, medium, loose
    
    # 允许例外
    exceptions:
      - "技术术语可以保留英文"
      - "代码示例不受格式限制"
    
    # 用户反馈学习
    learning:
      enabled: true
      threshold: 3  # 连续 3 次反馈后调整
```

**白话解释：**

就像"公司的弹性工作制度"：
- 📊 有基本规则要遵守
- 🔄 但特殊情况可以变通
- 💬 收集反馈持续改进
- ⚖️ 在规则和灵活性间找到平衡

---

### Q4: 如何分享规则给团队？🤝

**A:** 多种共享方式。

**方式 1：Git 仓库**

```bash
# 创建规则仓库
mkdir opencode-rules
cd opencode-rules
git init

# 添加规则文件
cp ~/.opencode/rules/* .
git add .
git commit -m "添加团队规则"
git remote add origin https://github.com/your-org/opencode-rules.git
git push -u origin master
```

**方式 2：配置包**

```yaml
# 创建规则包
rules_package:
  name: "团队规则包"
  version: "1.0.0"
  rules:
    - "~/.opencode/rules/branding.json"
    - "~/.opencode/rules/technical.json"
  
  # 导出
  export:
    file: "team-rules.opencode"
    format: "json"
```

**共享：**

```bash
# 导出规则包
opencode rules export --output team-rules.opencode

# 团队成员导入
opencode rules import --input team-rules.opencode
```

---

## 下一步 ➡️

规则设置完成后，您可以：

1. **配置代理系统**：查看 [代理配置](./agents)
2. **学习工具使用**：查看 [工具配置](./tools)
3. **优化工作流**：查看 [工作流设计](../04-best-practices/workflow-design)
4. **查看故障排查**：查看 [常见问题](../07-troubleshooting/common-issues)

---

## 总结 📝

规则系统是控制 AI 行为的强大工具。

**规则配置清单：**

```
📋 规则管理
  [ ] 了解系统内置规则
  [ ] 创建自定义规则文件
  [ ] 配置规则优先级
  [ ] 测试规则有效性
  
✅ 规则验证
  [ ] 运行规则测试
  [ ] 查看覆盖率报告
  [ ] 检查规则冲突
  [ ] 调整规则配置
  
🔍 规则优化
  [ ] 监控规则触发情况
  [ ] 收集用户反馈
  [ ] 调整规则灵活性
  [ ] 定期更新规则
```

**规则最佳实践：**

```
🎯 明确性：
  • 规则描述清晰
  • 提供正反例
  • 明确适用场景

⚖️ 平衡性：
  • 不过于严格
  • 保持必要约束
  • 允许合理例外

🔄 可维护性：
  • 定期审查规则
  • 移除无用规则
  • 更新过时规则
  • 保持规则精简

🤝 团队协作：
  • 共享规则配置
  • 统一团队标准
  • 收集团队反馈
  • 持续改进规则
```

---

**🎉 规则配置完成！**

现在 OpenCode 的输出将完全符合您的要求了！🚀
