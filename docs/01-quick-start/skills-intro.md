---
description: OpenCode 技能系统介绍，包括专业技能、技能加载、技能使用等。帮助您理解和使用 OpenCode 的专业能力。
keywords: ["OpenCode 技能", "Skill", "专业代理", "专项任务"]
---

# Skills

Skills 是 OpenCode 的专业技能集合，每个 Skill 代表一个经过专门训练和优化的专业代理，能够高效完成特定领域的任务。

## 什么是 Skills

Skills 是经过专业训练和优化的代理，它们：

- 具备领域专业知识
- 经过专项任务训练
- 能够高效处理特定类型问题
- 可被主代理调用完成专业任务

## 可用 Skills

### General（通用代理）

通用目的代理，适用于广泛的任务。

**适用场景：**
- 综合性任务处理
- 多步骤复杂任务
- 并行执行多个独立任务
- 开放式研究和分析

### Explore（探索代理）

快速探索代码库的专用代理。

**适用场景：**
- 快速定位文件
- 搜索代码模式
- 理解代码结构
- 回答代码库相关问题

### Code-reviewer（代码审查专家）

严格的代码审查专家。

**适用场景：**
- 完成重要编码后审查
- 检查代码质量问题
- 验证最佳实践遵循情况

### Security-auditor（安全漏洞猎人）

专门用于发现和修复安全问题的代理。

**适用场景：**
- 安全漏洞检测
- 安全最佳实践验证
- 安全相关代码审查

## 如何使用 Skills

### 调用 Skills

在对话中，你可以指定使用特定的 Skill：

```
使用 code-reviewer 审查这个文件
用 explore 代理查找所有的 API 端点
```

### 自动选择

OpenCode 会根据任务类型自动选择最合适的 Skill：

```
用户：审查这段代码
→ 自动使用 code-reviewer

用户：搜索所有包含 "config" 的文件
→ 自动使用 explore
```

### 并行执行

可以同时启动多个 Skill 并行处理任务：

```
用户：帮我审查代码并搜索相关文档
→ 并行启动 code-reviewer 和 explore
```

## Skills vs Tools

| 特性 | Skills | Tools |
|------|--------|-------|
| 类型 | 专业代理 | 原子工具 |
| 能力 | 综合任务 | 单一功能 |
| 训练 | 专业优化 | 通用实现 |
| 自主性 | 高自主 | 低自主 |
| 使用场景 | 复杂专业任务 | 基础操作 |

**使用建议：**
- 简单操作 → 使用 Tools（如：读取文件、执行命令）
- 复杂任务 → 使用 Skills（如：代码审查、代码探索）

## 技能扩展

### 加载自定义 Skills

OpenCode 支持加载自定义 Skills：

```bash
# 项目本地
.opencode/skills/

# 全局目录
~/.config/opencode/skills/
```

### Skill 定义规范

Skills 需要遵循以下规范：

1. **描述清晰**：提供准确的功能描述
2. **工具集定义**：明确可用的工具范围
3. **专业领域**：专注于特定任务类型
4. **最佳实践**：遵循领域最佳实践

## 最佳实践

### 1. 选择合适的 Skill

根据任务类型选择：

| 任务 | 推荐技能 |
|------|---------|
| 快速搜索 | explore |
| 代码审查 | code-reviewer |
| 安全检查 | security-auditor |
| 综合任务 | general |

### 2. 组合使用

可以组合使用多个 Skills：

```
用户：检查这个项目的代码质量和安全问题

流程：
  1. 使用 code-reviewer 检查代码质量
  2. 使用 security-auditor 检查安全问题
  3. 综合两个结果
```

### 3. 提供明确指令

给 Skill 提供明确的任务描述：

```
❌ 不好：审查代码
✅ 好：使用 code-reviewer 审查 src/components/User.tsx，
    重点关注性能和可维护性
```

## 常见问题

### Q: Skill 和 Agent 有什么区别？

A: Agent 是通用代理，Skills 是专门训练的专业代理。Skills 是 Agents 的一种特殊形式，专注于特定领域。

### Q: 如何知道使用了哪个 Skill？

A: OpenCode 会在响应中明确显示使用的 Skill 名称和任务 ID。

### Q: 可以创建自己的 Skill 吗？

A: 可以，参考 Skills 定义规范，在指定目录创建自定义 Skill。

---

## 相关文件

### 官方 Skills

以下链接指向 OpenCode 官方提供的 Skills 源码和文档：

- **General 代理** - [GitHub 源码](https://github.com/szqifeng/opencodeshare/tree/main/skills/general) | [文档](#)
- **Explore 代理** - [GitHub 源码](https://github.com/szqifeng/opencodeshare/tree/main/skills/explore) | [文档](#)
- **Code-reviewer** - [GitHub 源码](https://github.com/szqifeng/opencodeshare/tree/main/skills/code-reviewer) | [文档](#)
- **Security-auditor** - [GitHub 源码](https://github.com/szqifeng/opencodeshare/tree/main/skills/security-auditor) | [文档](#)

### 自定义 Skills

创建自定义 Skills 的资源：

- [Skills 定义规范](#)
- [Skills 开发指南](#)
- [Skills 示例仓库](#)

> 💡 **提示：** 更多自定义 Skills 示例和文档正在添加中，敬请期待！

---

## 下一步

了解 Skills 后，您可以：

1. **了解工具**：查看 [工具](./tools-intro)
2. **学习日常使用**：查看 [日常使用](../02-daily-usage/)
3. **学习最佳实践**：查看 [工作流设计](../04-best-practices/workflow-design)

---

**🎉 现在你已经了解了 OpenCode 的技能系统！**

接下来学习配置和指令。🚀
