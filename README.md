# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 环境变量配置

### DEPLOY_PRIME_URL

`DEPLOY_PRIME_URL` 环境变量用于设置部署目标，影响 `baseUrl` 的配置：

| 环境 | DEPLOY_PRIME_URL | baseUrl |
|------|------------------|---------|
| 本地开发 | 不设置或 localhost | `/` |
| GitHub Pages | 不设置（默认） | `/opencodeshare/` |
| 自定义域名 | `https://opencodeshare.cn` | `/` |
| 其他域名 | `https://yourdomain.com` | `/opencodeshare/` |

#### 使用示例

```bash
# 本地构建（默认 baseUrl: /opencodeshare/）
npm run build

# 为自定义域名构建（baseUrl: /）
DEPLOY_PRIME_URL=https://opencodeshare.cn npm run build

# 本地预览构建结果
npm run serve
```

## Deployment

### GitHub Actions 自动部署

本项目使用 GitHub Actions 实现 CI/CD 自动部署，无需手动操作。

#### 工作流原理

当代码推送到 `master` 分支时，GitHub 会自动触发 `.github/workflows/deploy.yml` 工作流，执行以下步骤：

#### 部署步骤详解

1. **触发条件 (Trigger)**
   - 监听 `master` 分支的 push 事件
   - 排除 `.md` 文件的修改，避免不必要的构建

2. **环境配置 (Environment)**
   - 使用 Ubuntu 最新版本作为运行环境
   - 配置必要的权限：`contents: read`, `pages: write`, `id-token: write`

3. **检出代码 (Checkout)**
   - 使用 `actions/checkout@v4` 检出仓库代码
   - 确保工作流可以访问项目文件

4. **安装 Node.js**
   - 使用 `actions/setup-node@v4` 设置 Node.js 环境
   - 版本：Node 20
   - 启用 npm 缓存加速依赖安装

5. **安装依赖 (Install Dependencies)**
   - 运行 `npm ci` 安装项目依赖
   - 使用 `ci` 模式确保依赖版本一致

6. **构建项目 (Build)**
   - 运行 `npm run build` 构建静态网站
   - 生成的文件保存在 `./build` 目录

7. **配置 Pages (Setup Pages)**
   - 使用 `actions/configure-pages@v5` 配置 GitHub Pages
   - 设置 `enablement: true` 自动启用 Pages 服务

8. **上传构建产物 (Upload Artifact)**
   - 使用 `actions/upload-pages-artifact@v3`
   - 将 `./build` 目录打包上传
   - 为部署步骤准备构建产物

9. **部署到 GitHub Pages (Deploy)**
   - 使用 `actions/deploy-pages@v4` 执行部署
   - 将构建产物发布到 GitHub Pages
   - 部署完成后输出访问 URL

#### 部署流程图

```
推送代码到 master
       ↓
   GitHub 检测到变更
       ↓
   触发 Actions 工作流
       ↓
   检出代码 → 安装依赖 → 构建项目
       ↓
   上传构建产物
       ↓
   部署到 GitHub Pages
       ↓
   网站自动更新 ✅
```

#### 访问网站

部署成功后，访问：
- 生产环境：https://szqifeng.github.io/opencodeshare/

#### 查看部署状态

1. 访问仓库的 Actions 页面
2. 查看 "Deploy to GitHub Pages" 工作流
3. 绿色 ✅ 表示部署成功，红色 ❌ 表示失败
4. 点击工作流可查看详细日志

#### 优势

- **自动化**：无需手动部署，推送即部署
- **快速**：通常 2-3 分钟完成部署
- **可靠**：GitHub Actions 提供稳定的环境
- **免费**：公开仓库完全免费使用
- **可追溯**：每次部署都有日志记录

#### 本地预览

如需本地预览生产构建：

```bash
npm run build
npm run serve
```

这将启动本地服务器预览构建后的网站。

