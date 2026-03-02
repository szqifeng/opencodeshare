---
description: OpenCode 配置教程，介绍 JSON 配置格式、位置优先级、各种配置选项等。帮助您完成 OpenCode 的完整配置。
keywords: ["OpenCode 配置", "JSON 配置", "配置优先级", "模型配置"]
---

# 配置

OpenCode 使用 **JSON** 配置文件来控制系统行为。通过配置，您可以设置网络代理、选择 AI 模型、配置代理、自定义快捷键等。

## 配置规范 🔧

### 配置格式

OpenCode 支持 **JSON** 和 **JSONC**（带注释的 JSON）格式。

**基础配置示例：**

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "theme": "opencode",
  "autoupdate": true
}
```

### Schema 参考 🔍

OpenCode 的配置 Schema 定义在 **https://opencode.ai/config.json**

> 💡 **提示**：您可以在编辑器中引用此 URL 来获得配置的自动补全和验证支持。

---

## 配置位置 📍

### 优先级顺序

配置源按以下顺序加载（后面的源会覆盖前面的源）：

```
1. 远程配置（.well-known/opencode）
   ↓ 组织默认值
2. 全局配置（~/.config/opencode/opencode.json）
   ↓ 用户偏好
3. 环境变量（OPENCODE_CONFIG）
   ↓ 自定义覆盖
4. 项目配置（./opencode.json）
   ↓ 项目特定设置
5. .opencode 目录
   ↓ 代理、命令、插件
6. 内联配置（OPENCODE_CONFIG_CONTENT）
   ↓ 运行时覆盖
```

### 配置文件位置

| 类型 | 位置 | 说明 | 优先级 |
|------|------|------|----------|
| **远程配置** | `.well-known/opencode` | 组织提供的默认配置 | 1 |
| **全局配置** | `~/.config/opencode/opencode.json` | 用户级配置 | 2 |
| **环境变量** | `OPENCODE_CONFIG` | 自定义配置路径 | 3 |
| **项目配置** | `./opencode.json` | 项目特定配置 | 4 |
| **.opencode 目录** | `.opencode/` | 代理、命令、插件 | 5 |
| **内联配置** | `OPENCODE_CONFIG_CONTENT` | 运行时覆盖 | 6 |

### 自定义配置路径

使用环境变量指定自定义配置文件：

```bash
export OPENCODE_CONFIG=/path/to/custom-config.json
```

### 自定义配置目录

使用环境变量指定自定义配置目录：

```bash
export OPENCODE_CONFIG_DIR=/path/to/config-directory
```

---

## 核心配置选项 ⚙️

### 模型配置 🤖

#### 基础配置

```jsonc
{
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

**选项说明：**
- `model`: 主要模型，格式为 `provider/model`
- `small_model`: 轻量级模型，用于标题生成等简单任务

#### 提供商选项

```jsonc
{
  "provider": {
    "anthropic": {
      "options": {
        "timeout": 600000,
        "setCacheKey": true
      }
    }
  }
}
```

**提供商选项：**
- `timeout`: 请求超时时间（毫秒），默认 300000
- `setCacheKey`: 确保缓存键设置

#### 禁用/启用提供商

```jsonc
{
  "disabled_providers": ["openai", "gemini"],
  "enabled_providers": ["anthropic", "openai"]
}
```

> ⚠️ **注意**：`disabled_providers` 优先于 `enabled_providers`

---

### 服务器配置 🖥️

为 `opencode serve` 和 `opencode web` 命令配置服务器：

```jsonc
{
  "server": {
    "port": 4096,
    "hostname": "0.0.0.0",
    "mdns": true,
    "mdnsDomain": "myproject.local",
    "cors": ["http://localhost:5173"]
  }
}
```

**选项说明：**
- `port`: 监听端口
- `hostname`: 监听主机名
- `mdns`: 启用 mDNS 服务发现
- `mdnsDomain`: mDNS 服务域名，默认 `opencode.local`
- `cors`: CORS 允许的来源列表

---

### 主题配置 🎨

```jsonc
{
  "theme": "opencode"
}
```

主题选项：
- `"opencode"`: OpenCode 默认主题
- `"light"`: 浅色主题
- `"dark"`: 深色主题
- `"":`: 跟随系统

---

### 代理配置 🤖

#### 默认代理

```jsonc
{
  "default_agent": "plan"
}
```

**说明：**
- 默认代理必须是主代理（不能是子代理）
- 如果指定不存在或为子代理，会回退到 `"build"`

#### 自定义代理

```jsonc
{
  "agent": {
    "code-reviewer": {
      "description": "Reviews code for best practices",
      "model": "anthropic/claude-sonnet-4-5",
      "prompt": "Focus on security, performance, and maintainability.",
      "tools": {
        "write": false,
        "edit": false
      }
    }
  }
}
```

---

## 高级配置选项 🚀

### 工具配置 🛠️

```jsonc
{
  "tools": {
    "write": false,
    "bash": false
  }
}
```

---

### 权限配置 🔐

默认情况下，OpenCode 允许所有操作。可以配置权限行为：

```jsonc
{
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

**权限级别：**
- `"allow"`: 自动允许
- `"ask"`: 询问用户
- `"deny"`: 自动拒绝

---

### 命令配置 💻

为重复任务配置自定义命令：

```jsonc
{
  "command": {
    "test": {
      "template": "Run full test suite with coverage",
      "description": "Run tests with coverage",
      "agent": "build"
    },
    "component": {
      "template": "Create a new React component named $ARGUMENTS",
      "description": "Create a new component"
    }
  }
}
```

---

### 快捷键配置 ⌨️

```jsonc
{
  "keybinds": {}
}
```

---

### 格式化程序配置 ✨

```jsonc
{
  "formatter": {
    "prettier": {
      "disabled": true
    },
    "custom-prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "environment": {
        "NODE_ENV": "development"
      },
      "extensions": [".js", ".ts", ".jsx", ".tsx"]
    }
  }
}
```

---

### 分享配置 🔗

```jsonc
{
  "share": "manual"
}
```

**分享模式：**
- `"manual"`: 手动分享（默认）
- `"auto"`: 自动分享新会话
- `"disabled"`: 禁用分享

---

### 自动更新 🔄

```jsonc
{
  "autoupdate": false
}
```

**选项：**
- `true`: 自动更新
- `false`: 禁用自动更新
- `"notify"`: 仅通知（需要非包管理器安装）

---

### 上下文压缩 💾

```jsonc
{
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}
```

**选项说明：**
- `auto`: 自动压缩（默认 `true`）
- `prune`: 删除旧工具输出（默认 `true`）
- `reserved`: Token 缓冲区大小

---

### 文件监视器 👁️

```jsonc
{
  "watcher": {
    "ignore": ["node_modules/**", "dist/**", ".git/**"]
  }
}
```

---

### MCP 服务器 🔌

```jsonc
{
  "mcp": {}
}
```

---

### 插件插件 🔌

```jsonc
{
  "plugin": ["opencode-helicone-session", "@my-org/custom-plugin"]
}
```

---

### 指令 📋

```jsonc
{
  "instructions": ["CONTRIBUTING.md", "docs/guidelines.md"]
}
```

---

### 实验性功能 🧪

```jsonc
{
  "experimental": {}
}
```

> ⚠️ **警告**：实验性功能不稳定，可能会在未通知的情况下被更改或移除。

---

## 变量替换 🔄

### 环境变量

使用 `{env:VARIABLE_NAME}` 替换环境变量：

```jsonc
{
  "model": "{env:OPENCODE_MODEL}",
  "provider": {
    "anthropic": {
      "options": {
        "apiKey": "{env:ANTHROPIC_API_KEY}"
      }
    }
  }
}
```

### 文件内容

使用 `{file:path/to/file}` 替换文件内容：

```jsonc
{
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{file:~/.secrets/openai-key}"
      }
    }
  },
  "instructions": ["./custom-instructions.md"]
}
```

**文件路径说明：**
- 相对路径：相对于配置文件所在目录
- 绝对路径：以 `/` 或 `~` 开头

---

## 配置示例 📝

### 完整配置示例

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  
  // 模型配置
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5",
  
  // 服务器配置
  "server": {
    "port": 4096,
    "mdns": true
  },
  
  // 主题配置
  "theme": "opencode",
  
  // 默认代理
  "default_agent": "plan",
  
  // 权限配置
  "permission": {
    "bash": "ask",
    "edit": "ask"
  },
  
  // 分享配置
  "share": "manual",
  
  // 自动更新
  "autoupdate": true,
  
  // 日志级别
  "logLevel": "INFO"
}
```

### 开发环境配置

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  
  "model": "anthropic/claude-3.5-sonnet-20240620",
  "provider": {
    "anthropic": {
      "options": {
        "timeout": 120000
      }
    }
  },
  
  "permission": {
    "bash": "allow",
    "edit": "allow"
  },
  
  "formatter": {
    "prettier": {
      "disabled": false
    }
  },
  
  "autoupdate": false,
  "logLevel": "DEBUG"
}
```

### 生产环境配置

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  
  "model": "anthropic/claude-sonnet-4-5",
  
  "permission": {
    "bash": "ask",
    "edit": "ask"
  },
  
  "share": "manual",
  
  "autoupdate": true,
  "logLevel": "WARN"
}
```

---

## 配置验证 ✅

### 使用 Schema 验证

编辑器支持基于 Schema 的自动补全和验证：

```jsonc
{
  "$schema": "https://opencode.ai/config.json"
  // 配置内容...
}
```

### 命令行验证

```bash
# 验证配置文件
opencode config validate

# 查看当前配置
opencode config get

# 测试配置
opencode test
```

---

## 常见问题 ❓

### Q1: 配置不生效怎么办？

**A:** 检查配置优先级

```bash
# 查看当前生效的配置
opencode config get

# 查看配置加载顺序
opencode config --show-priority
```

### Q2: 如何调试配置问题？

**A:** 启用调试日志

```jsonc
{
  "logLevel": "DEBUG"
}
```

### Q3: 配置文件放在哪里？

**A:** 根据优先级选择合适的位置

- **个人配置**: `~/.config/opencode/opencode.json`
- **项目配置**: `./opencode.json`
- **自定义路径**: 通过 `OPENCODE_CONFIG` 环境变量指定

---

## 下一步 ➡️

配置完成后，您可以：

1. **学习工具使用**：查看 [工具介绍](./tools-intro)
2. **了解命令**：查看 [命令](./commands)
3. **查看日常使用**：查看 [日常使用](../02-daily-usage/tools)

---

## 总结 📝

**配置清单：**

```
📋 基础配置
  [ ] 选择合适的 AI 模型
  [ ] 配置 API Key
  [ ] 设置网络代理
  [ ] 选择主题

🔧 高级配置
  [ ] 配置默认代理
  [ ] 设置权限规则
  [ ] 自定义快捷键
  [ ] 配置格式化程序
  [ ] 管理插件

🚀 环境配置
  [ ] 开发环境配置
  [ ] 生产环境配置
  [ ] 测试配置
```

**配置最佳实践：**

```
✅ 使用 $schema 引用获得编辑器支持
✅ 将敏感信息使用环境变量或文件引用
✅ 根据使用场景配置不同的模型
✅ 合理设置权限平衡安全和便利
✅ 定期测试配置的有效性
```

---

**🎉 配置完成！**

现在 OpenCode 已完全配置，可以开始使用了！🚀
