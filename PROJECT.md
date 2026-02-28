# OpenCode Docs 工程说明

## 📖 项目概述

OpenCode Docs 是一个基于 Docusaurus 构建的现代化文档网站，旨在为开发者提供 OpenCode AI 编程助手的完整使用指南、教程和最佳实践。

### 核心目标

- 🎯 提供清晰的入门教程，帮助开发者快速上手
- 📚 涵盖从基础概念到高级应用的全链路知识
- 🚀 展示真实场景案例，提升实战能力
- 🌐 支持多主题切换和响应式设计
- 🔍 提供全文搜索和便捷的导航

### 目标用户

- 🎓 编程初学者
- 💼 专业开发者
- 👨‍💻 开发团队
- 📚 技术爱好者

---

## 🛠️ 技术栈

### 核心框架

- **Docusaurus 3.9.2** - 现代化的静态网站生成器
- **React 19.0.0** - 用户界面库
- **TypeScript 5.6.2** - 类型安全的 JavaScript 超集

### 主要依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| @docusaurus/core | 3.9.2 | Docusaurus 核心库 |
| @docusaurus/preset-classic | 3.9.2 | 经典预设配置 |
| @cmfcmf/docusaurus-search-local | 2.0.1 | 本地全文搜索 |
| prism-react-renderer | 2.3.0 | 代码高亮渲染 |
| clsx | 2.0.0 | 条件类名工具 |

### 开发工具

- **npm** - 包管理工具
- **TypeScript** - 类型检查
- **Webpack** - 模块打包器（内置）

---

## 📁 目录结构

```
opencode-docs/
├── docs/                      # 文档内容目录
│   ├── intro/                 # 开始学习
│   │   ├── what-is-opencode.md
│   │   ├── quick-start.md
│   │   ├── installation.md
│   │   ├── basic-concepts.md
│   │   ├── architecture.md
│   │   ├── core-features.md
│   │   ├── getting-started.md
│   │   ├── first-project.md
│   │   ├── environment-setup.md
│   │   ├── common-issues.md
│   │   ├── terminology.md
│   │   ├── workflow-basics.md
│   │   ├── configuration.md
│   │   └── troubleshooting.md
│   ├── scenarios/             # 场景实战
│   │   ├── code-review.md
│   │   ├── refactoring.md
│   │   ├── debugging.md
│   │   ├── automation.md
│   │   ├── data-analysis.md
│   │   ├── report-generation.md
│   │   ├── api-integration.md
│   │   ├── testing.md
│   │   ├── monitoring.md
│   │   ├── documentation.md
│   │   ├── migration.md
│   │   └── optimization.md
│   ├── advanced/              # 进阶手册
│   │   ├── custom-agents.md
│   │   ├── workflow.md
│   │   ├── api-reference.md
│   │   ├── best-practices.md
│   │   ├── performance.md
│   │   ├── security.md
│   │   ├── deployment.md
│   │   ├── plugins.md
│   │   ├── extensions.md
│   │   ├── advanced-features.md
│   │   ├── integration.md
│   │   └── customization.md
│   └── community/             # 社群
│       ├── faq.md
│       ├── contribute.md
│       ├── contact.md
│       ├── discussions.md
│       ├── releases.md
│       ├── showcase.md
│       └── guidelines.md
├── src/                       # 源代码目录
│   ├── components/            # React 组件
│   ├── css/                   # 样式文件
│   │   └── custom.css         # 自定义样式
│   ├── pages/                 # 页面组件
│   │   └── index.tsx          # 首页
│   └── theme/                 # 主题扩展
│       └── Layout.tsx         # 自定义布局
├── static/                    # 静态资源
│   └── img/                   # 图片资源
│       ├── favicon.ico
│       └── logo.svg
├── .docusaurus/               # Docusaurus 配置
├── docusaurus.config.ts       # 主配置文件
├── sidebars.ts                # 侧边栏配置
├── package.json               # 项目依赖
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 20.0
- **npm** >= 9.0

### 安装步骤

1. **克隆项目**

```bash
git clone <repository-url>
cd opencode-docs
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
npm start
```

4. **访问网站**

打开浏览器访问 `http://localhost:3000`

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run serve` | 本地预览生产版本 |
| `npm run typecheck` | 运行 TypeScript 类型检查 |
| `npm run swizzle` | Swizzle 组件 |
| `npm run clear` | 清除构建缓存 |

---

## ⚙️ 配置说明

### 主配置文件 (docusaurus.config.ts)

```typescript
const config: Config = {
  title: 'OpenCode 科普',
  tagline: '人人都能理解的 AI 编程能力',
  url: 'http://localhost:3000',
  baseUrl: '/',
  
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  
  // ... 其他配置
};
```

### 侧边栏配置 (sidebars.ts)

侧边栏分为四个主要分类：

1. **🚀 开始学习** - 基础入门教程
2. **💼 场景实战** - 实际应用案例
3. **📚 进阶手册** - 高级功能和最佳实践
4. **👥 社群** - 社区参与和贡献

### 自定义样式 (src/css/custom.css)

主要包含以下样式定义：

- **主题色配置**
  - 亮色模式主色：`#10b981`（绿色）
  - 暗色模式主色：`#34d399`（浅绿色）
  
- **导航栏样式**
  - 固定顶部定位
  - Hover 效果和过渡动画
  - 响应式设计

- **侧边栏样式**
  - 平滑滚动
  - 激活状态高亮
  - Hover 动画效果

- **底部样式**
  - 仅在首页显示
  - 简洁的版权信息

---

## 🎨 设计风格

### 视觉特性

- **配色方案**
  - 主色调：清新绿色
  - 辅助色：蓝色、粉色
  - 背景：浅灰色（亮色模式）/ 深灰色（暗色模式）
  
- **字体系统**
  - 正文字体：系统默认无衬线字体
  - 代码字体：等宽字体（Fira Code、Consolas 等）
  
- **交互动画**
  - 平滑过渡：200ms ease
  - Hover 效果：上移、阴影加深
  - 卡片交互：缩放、颜色变化

### 响应式断点

| 断点 | 宽度 | 应用场景 |
|------|------|----------|
| 移动端 | ≤ 768px | 单列布局 |
| 超小屏 | ≤ 480px | 垂直堆叠 |
| 桌面端 | > 768px | 多列布局 |

---

## 📄 页面结构

### 首页 (/)

#### 核心区域

1. **Hero 区**
   - 标题和副标题
   - CTA 按钮
   - SVG 插画

2. **核心价值区**
   - 三栏卡片布局
   - 图标 + 标题 + 描述

3. **学习路径区**
   - 四步学习流程
   - 图标化展示

4. **应用场景区**
   - 四栏网格布局
   - 场景卡片展示

5. **资源入口区**
   - 三栏链接卡片
   - 快速访问入口

### 文档页面 (/docs/*)

#### 标准布局

```
┌─────────────────────────────────────────────┐
│              导航栏（固定顶部）               │
├──────────┬──────────────────┬──────────────┤
│          │                  │              │
│  侧边栏   │     主内容区     │   TOC 目录   │
│ （固定）  │   （可滚动）     │  （可选）     │
│          │                  │              │
└──────────┴──────────────────┴──────────────┘
```

#### 内容规范

- 使用 Markdown 语法
- 支持代码高亮
- 自动生成目录
- 响应式图片

---

## 🌟 核心功能

### 1. 全文搜索

- 基于 `@cmfcmf/docusaurus-search-local`
- 支持中文和英文搜索
- 实时搜索建议
- 搜索结果高亮

### 2. 主题切换

- 支持亮色/暗色模式
- 自动检测系统偏好
- 状态持久化存储

### 3. 响应式设计

- 移动端友好
- 平板适配
- 桌面端优化

### 4. 代码高亮

- 基于 Prism.js
- 支持多种编程语言
- 代码复制功能
- 行号显示

### 5. 导航优化

- 固定顶部导航栏
- 固定侧边栏
- 平滑滚动
- 面包屑导航

---

## 🔧 开发指南

### 添加新文档

1. 在 `docs/` 目录下创建新的 `.md` 文件
2. 添加 frontmatter：

```markdown
---
sidebar_position: 1
---

# 文档标题

文档内容...
```

3. 在 `sidebars.ts` 中添加引用

### 自定义组件

1. 在 `src/components/` 下创建组件
2. 在页面中导入使用：

```tsx
import MyComponent from '@site/src/components/MyComponent';

<MyComponent />
```

### 自定义样式

1. 编辑 `src/css/custom.css`
2. 使用 CSS 变量进行主题适配

### Swizzle 组件

使用 Docusaurus 的 swizzle 功能自定义内置组件：

```bash
npm run swizzle @docusaurus/theme-classic Footer
```

---

## 📦 构建与部署

### 构建生产版本

```bash
npm run build
```

构建完成后，静态文件将生成在 `build/` 目录。

### 本地预览

```bash
npm run serve
```

### 部署选项

#### 1. GitHub Pages

```bash
npm run deploy
```

#### 2. Netlify

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`build`

#### 3. Vercel

1. 导入项目
2. 框架预设：Docusaurus
3. 自动部署

#### 4. 自托管

将 `build/` 目录部署到任何静态文件服务器。

---

## 🤝 贡献指南

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 编写清晰的注释
- 保持代码简洁

### 文档规范

- 使用清晰的标题
- 提供代码示例
- 添加必要的 emoji
- 保持格式一致

---

## 🔒 安全性

- 代码本地处理，不上传敏感信息
- 支持离线模式
- 遵循 GDPR 等数据保护法规
- 定期更新依赖

---

## 📊 性能优化

### 已实施的优化

- 代码分割
- 图片懒加载
- CSS 压缩
- 静态资源缓存

### 性能指标

- 首次内容绘制 (FCP)：< 1.5s
- 最大内容绘制 (LCP)：< 2.5s
- 累积布局偏移 (CLS)：< 0.1
- 首次输入延迟 (FID)：< 100ms

---

## 🗺️ 路线图

### 近期计划

- [ ] 添加多语言支持（英文）
- [ ] 集成评论系统
- [ ] 添加搜索分析
- [ ] 优化移动端体验

### 长期计划

- [ ] 添加视频教程
- [ ] 集成在线代码编辑器
- [ ] 开发移动 App
- [ ] 添加 API 文档

---

## 📚 资源链接

### 官方资源

- [Docusaurus 官方文档](https://docusaurus.io/)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

### 相关项目

- [OpenCode GitHub](https://github.com/ChineseMarkwang/opencode-docs)
- [OpenCode Releases](https://github.com/ChineseMarkwang/opencode-docs/releases)

---

## ❓ 常见问题

### Q: 如何更改网站标题？

编辑 `docusaurus.config.ts` 中的 `title` 字段。

### Q: 如何添加新的代码高亮主题？

编辑 `docusaurus.config.ts` 中的 `prism.theme` 和 `prism.darkTheme`。

### Q: 如何禁用某些默认功能？

在 `docusaurus.config.ts` 中配置相关选项。

### Q: 如何自定义首页？

编辑 `src/pages/index.tsx` 文件。

---

## 📄 许可证

本项目采用 CC BY-NC-SA 4.0 许可协议。

---

## 👥 团队

- 项目维护：ChineseMarkwang
- 技术支持：https://github.com/ChineseMarkwang

---

## 📮 联系我们

- GitHub Issues: [提交问题](https://github.com/ChineseMarkwang/opencode-docs/issues)
- Email: 977765310@qq.com
- 社区: [Discussions](https://github.com/ChineseMarkwang/opencode-docs/discussions)

---

<div align="center">

**🌟 感谢使用 OpenCode Docs! 🌟**

Made with ❤️ by OpenCode Team

</div>
