# OpenCode 工具集

这个目录包含 OpenCode 项目中使用的各种工具脚本。

## 📦 可用工具

### 部署工具 (deploy.sh)

用于将文档站点部署到生产服务器的自动化工具。

#### 使用方法

**基础用法：**

```bash
.tool/deploy.sh
```

**显示帮助：**

```bash
.tool/deploy.sh --help
```

**显示详细输出：**

```bash
.tool/deploy.sh --verbose
```

#### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `REMOTE_HOST` | `root@47.93.214.178` | 远程服务器地址 |
| `DEPLOY_SCRIPT` | `/opt/opencodeshare/deploy.sh` | 远程部署脚本路径 |

#### 工作流程

1. SSH 连接到远程服务器
2. 在远程服务器上拉取最新代码
3. 构建静态文件 (`npm run build`)
4. 备份当前 nginx 目录
5. 将新构建的文件部署到 nginx 目录
6. 重启 nginx 服务

#### 远程部署脚本

远程服务器上的 `/opt/opencodeshare/deploy.sh` 脚本负责实际的构建和部署工作。

## 🔧 添加新工具

在 `.tool` 目录中添加新工具时，请遵循以下规范：

1. 文件名使用小写和连字符（kebab-case）
2. 添加执行权限 (`chmod +x`)
3. 包含 `--help` 选项显示使用说明
4. 支持 `--verbose` 选项显示详细输出
5. 在本 README 中添加工具说明

## 📝 示例

```bash
# 部署到生产环境
.tool/deploy.sh

# 部署并显示详细信息
.tool/deploy.sh --verbose

# 查看帮助
.tool/deploy.sh --help
```

## 🔗 相关链接

- 项目文档: https://opencode.ai
- 服务器地址: 47.93.214.178
- Nginx 目录: /var/www/html
