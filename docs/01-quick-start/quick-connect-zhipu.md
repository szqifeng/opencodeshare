---
description: OpenCode 快速连接智谱 AI 教程，指导用户注册智谱账号、获取 API Key、配置 OpenCode 连接智谱模型。
keywords: ["OpenCode 智谱", "智谱 AI", "API Key 配置", "GLM-4 模型"]
sidebar_position: 5
---

# 快速连接智谱 AI

智谱 AI 是国内领先的 AI 服务提供商，提供 GLM 系列大模型。本文将指导您快速连接智谱 AI 到 OpenCode，开始使用 GLM-4 等强大模型。

---

## 智谱 AI 平台简介 🌟

### 智谱 GLM 系列

智谱 AI 推出的 GLM 系列大模型在多项评测中达到开源模型 SOTA 水平：

| 模型 | 能力 | 特点 |
|------|------|------|
| **GLM-4** | 推理、代码、综合能力 | 智谱旗舰模型，综合能力达到开源模型 SOTA |
| **GLM-3-Turbo** | 快速响应 | 推理速度更快，适合日常对话 |
| **GLM-3** | 平衡能力 | 性能与成本平衡 |
| **GLM-4V** | 视觉理解 | 支持图像理解 |

**应用场景：**
- 📝 文本写作和内容创作
- 💻 代码生成和调试
- 🔍 知识问答和推理
- 🎨 多模态任务（配合 GLM-4V）

---

## 注册智谱账号 📝

### 第一步：打开注册页面

在终端中运行以下命令快速打开智谱平台：

```bash
opencode connect
```

然后在界面中选择 **zhipu**（智谱）提供商。

### 第二步：通过邀请链接注册

复制以下邀请链接到浏览器打开：

```
https://www.bigmodel.cn/invite?icode=1hMx3Xc4q5I22%2BDSMJdnJP2gad6AKpjZefIo3dVEQyA%3D
```

**注册流程：**

1. 点击邀请链接打开注册页面
2. 填写手机号或邮箱进行注册
3. 完成手机号/邮箱验证
4. 设置登录密码

### 🎁 注册福利

通过邀请链接注册可获得：
- **2000 万 Tokens 大礼包**
- 早期访问新模型特权

---

## 获取 API Key 🔑

### 方式 1：通过终端快速配置

运行以下命令，OpenCode 会引导您完成配置：

```bash
opencode connect
```

选择 **zhipu** 提供商后，按提示操作：
1. 点击智谱平台链接
2. 登录或注册账号
3. 在智谱控制台获取 API Key
4. 将 API Key 粘贴回 OpenCode

### 方式 2：手动获取 API Key

1. 访问智谱开放平台：https://open.bigmodel.cn/usercenter/apikeys
2. 登录您的账号
3. 点击「创建新的 API Key」
4. 设置 API Key 名称（可选）
5. 点击确认创建
6. **复制生成的 API Key**

**注意：**
- ⚠️ API Key 仅显示一次，请妥善保存
- 📋 建议立即保存到安全的位置

---

## 在 OpenCode 中配置智谱 ⚙️

### 方式 1：使用命令快速配置

```bash
opencode connect
```

选择 **zhipu** 提供商，输入 API Key 即可完成配置。

### 方式 2：手动配置文件

编辑或创建 `~/.config/opencode/opencode.jsonc`：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  
  // 配置智谱为主要模型
  "model": "zhipu/glm-4",
  
  // 配置智谱提供商
  "provider": {
    "zhipu": {
      "apiKey": "你的智谱 API Key"
    }
  }
}
```

### 方式 3：使用环境变量

在 `.bashrc` 或 `.zshrc` 中添加：

```bash
export ZHIPU_API_KEY="你的智谱 API Key"
```

然后在配置文件中引用：

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "zhipu": {
      "options": {
        "apiKey": "{env:ZHIPU_API_KEY}"
      }
    }
  }
}
```

---

## 智谱模型列表 🤖

### GLM-4（旗舰模型）

```jsonc
{
  "model": "zhipu/glm-4"
}
```

**特点：**
- 推理能力最强
- 代码生成优秀
- 支持长上下文

**适用场景：**
- 复杂问题求解
- 大型项目代码开发
- 深度内容创作

### GLM-3-Turbo（快速模型）

```jsonc
{
  "model": "zhipu/glm-3-turbo"
}
```

**特点：**
- 响应速度快
- 成本更低
- 性能均衡

**适用场景：**
- 日常对话
- 快速问答
- 轻量级任务

### GLM-4-Flash（极速模型）

```jsonc
{
  "model": "zhipu/glm-4-flash"
}
```

**特点：**
- 极速响应
- 超低成本
- 性价比最高

**适用场景：**
- 高频对话
- 简单任务
- 批量处理

---

## 测试连接 ✅

### 验证配置是否成功

```bash
# 测试智谱连接
opencode test --provider zhipu

# 测试所有配置
opencode test --all
```

### 开始使用

```bash
# 启动对话
opencode chat

# 在对话中指定智谱模型
opencode chat --model zhipu/glm-4
```

**示例对话：**

```
用户：用 Python 写一个快速排序算法

OpenCode（GLM-4）：
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# 时间复杂度：O(n log n)
# 空间复杂度：O(n)
```
```

---

## 常用配置示例 📝

### 开发环境配置

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "zhipu/glm-4",
  "small_model": "zhipu/glm-3-turbo",
  "provider": {
    "zhipu": {
      "options": {
        "timeout": 120000,
        "apiKey": "{env:ZHIPU_API_KEY}"
      }
    }
  },
  "autoupdate": true
}
```

### 生产环境配置

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "zhipu/glm-4",
  "small_model": "zhipu/glm-3-turbo",
  "provider": {
    "zhipu": {
      "options": {
        "timeout": 60000,
        "apiKey": "{file:~/.secrets/zhipu-key}"
      }
    }
  },
  "permission": {
    "bash": "allow",
    "edit": "allow"
  }
}
```

---

## 常见问题 ❓

### Q1: 智谱 API Key 失效怎么办？

**A:** 请检查以下几点：
1. 确认 API Key 是否正确复制
2. 检查智谱账号状态
3. 查看剩余 Token 余额
4. 重新生成 API Key 尝试

### Q2: 如何切换到其他模型？

**A:** 有以下方式：

```bash
# 临时切换
opencode chat --model anthropic/claude-3-5-sonnet

# 修改默认模型
opencode config set model zhipu/glm-4
```

### Q3: Token 不足怎么办？

**A:** 可以在智谱控制台充值：
- 访问：https://open.bigmodel.cn/usercenter/billing
- 选择充值套餐
- 支持多种支付方式

### Q4: 智谱模型和其他模型如何选择？

**A:** 根据场景选择：

| 场景 | 推荐模型 |
|------|----------|
| 代码开发 | GLM-4, GPT-4o |
| 日常对话 | GLM-3-Turbo, GPT-3.5-Turbo |
| 内容创作 | GLM-4, Claude 3.5 Sonnet |
| 快速响应 | GLM-4-Flash, Claude 3.5 Haiku |

---

## 下一步 ➡️

连接智谱 AI 后，您可以：

1. **开始使用**：查看 [快速体验](./quick-experience)
2. **学习工具**：查看 [工具介绍](./tools-intro)
3. **学习工作流**：查看 [工作流](./workflow)

---

## 总结 📝

**配置清单：**

```
✅ 注册智谱账号
  [ ] 通过邀请链接注册
  [ ] 完成账号验证
  [ ] 获得 2000 万 Tokens

✅ 获取 API Key
  [ ] 访问智谱控制台
  [ ] 创建新的 API Key
  [ ] 妥善保存 API Key

✅ 配置 OpenCode
  [ ] 使用命令或手动配置
  [ ] 选择合适的智谱模型
  [ ] 测试连接成功

✅ 开始使用
  [ ] 启动对话
  [ ] 体验 GLM-4 强大能力
```

---

**🎉 恭喜！**

您已成功连接智谱 AI 到 OpenCode，现在可以使用 GLM-4 等强大模型了！🚀

**智谱邀请链接（再次提醒）：**

```
https://www.bigmodel.cn/invite?icode=1hMx3Xc4q5I22%2BDSMJdnJP2gad6AKpjZefIo3dVEQyA%3D
```
