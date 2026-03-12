# AGENTS.md - Agent Coding Guidelines

> Git 作者：qifeng (977765310@qq.com)

## Essential Commands

```bash
# Development
npm start              # Start dev server at http://localhost:3000
npm run build          # Build for production
npm run serve          # Preview production build locally
npm run typecheck      # Run TypeScript type checking (MUST run before commit)
npm run clear          # Clear Docusaurus cache and build
npm run swizzle        # Eject a theme component for customization

# Dev Server Tips:
lsof -ti :3000 | xargs kill -9  # Kill process on port 3000 first
nohup npm start > /dev/null 2>&1 &  # Run asynchronously to avoid blocking
```

**IMPORTANT:** Run `npm run typecheck` before committing. No test suite - verify manually in browser.

**Deployment:** Master branch auto-deploys to GitHub Pages. Just push to master.

---

## 部署命令

当用户说"部署"时，必须完成以下 3 件事：

1. **本地运行验证**：先运行 `npm run build` 确保构建成功
2. **提交并推送代码**：执行 git add、commit、push
3. **远程服务器部署**：SSH 连接到 47 服务器执行部署

```bash
# 部署流程
npm run build                           # 1. 本地构建验证
git add . && git commit -m "deploy"     # 2. 提交代码
git push                                # 2. 推送代码
ssh root@47.x.x.x "cd /path/to/repo && ./deploy.sh"  # 3. 远程部署
```

---

## TypeScript/React Style

### Imports
```typescript
import type {ReactNode, CSSProperties} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Layout from '@theme/Layout';
// Order: types, external libs, theme components
```

### Components
```typescript
interface ShareCardProps {
  title: string;
  url: string;
}

export default function ShareCard({ title, url }: ShareCardProps): JSX.Element {
  const isBrowser = useIsBrowser();
  const isDarkMode = isBrowser && document.documentElement.getAttribute('data-theme') === 'dark';
  const container: CSSProperties = { maxWidth: '1200px' };
  return <div style={container}>...</div>;
}
```

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- CSS Variables: --ifm- prefix
- Files: kebab-case for MD, PascalCase for TSX
- Props: PascalCase interfaces

### Types
- Use `ReactNode` for component returns
- Use `JSX.Element` when returning JSX explicitly
- Use `CSSProperties` for inline styles
- NEVER use `any` - use proper TypeScript
- Use `satisfies` for config validation

### Error Handling
```typescript
try {
  const result = await someOperation();
} catch (error) {
  console.error('Operation failed:', error);
} finally {
  // cleanup
}
```

---

## CSS Style Guidelines

```css
:root {
  --ifm-color-primary: #10b981;
}

[data-theme='dark'] {
  --ifm-color-primary: #34d399;
}

@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 997px) { /* Desktop */ }
```

### Theme Colors
| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background (section) | `#f9fafb` | `#111827` |
| Card Background | `#ffffff` | `#1f2937` |
| Card Border | `#f3f4f6` | `#374151` |
| Primary Text | `#111827` | `#f9fafb` |
| Secondary Text | `#6b7280` | `#9ca3af` |
| Link Color | `#10b981` | `#10b981` |

### Styling Patterns
```typescript
const card: CSSProperties = {
  backgroundColor: isDarkMode ? '#1f2937' : '#fff',
  borderRadius: '16px',
  padding: '2rem',
  border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
};
```

---

## Markdown Documentation

```markdown
---
sidebar_position: 1
description: SEO-friendly description
keywords: ["keyword1", "keyword2"]
---

import Component from '@site/src/components/Component';

# 🚀 Title with Emoji

## 核心笔记
- ✅ Key point 1
- ✅ Key point 2

## 学完你能做什么
- 🎯 Outcome 1
- 🎯 Outcome 2
```

**Important:**
- Always include `sidebar_position` in frontmatter
- Use emojis for visual hierarchy
- Import components at top of MDX files
- Add `description` and `keywords` for SEO

---

## Project Structure

```
opencode-docs/
├── docs/              # Markdown documentation (kebab-case.md)
├── src/
│   ├── components/    # React components (PascalCase.tsx)
│   ├── css/custom.css # Global styles (minimize !important)
│   ├── pages/         # Page components
│   └── theme/         # Theme swizzles
├── static/img/        # Static assets (NO external URLs)
├── docusaurus.config.ts
└── sidebars.ts        # Navigation - UPDATE when adding docs
```

---

## Best Practices

1. **Always** run `npm run typecheck` before committing
2. **Always** support both light and dark themes
3. **Always** test on mobile (≤768px) and desktop
4. **Always** update `sidebars.ts` when adding docs
5. **Always** use `static/img/` for images - NO external URLs
6. **Always** use CSS variables for theme values
7. **Always** use `satisfies` for config validation
8. **Never** use `any` types - use proper TypeScript
9. **Never** modify `.docusaurus/` or `build/` directories
10. **Never** commit node_modules or build

---

## Pitfalls to Avoid

❌ No `any` types
❌ Don't modify `.docusaurus/` or `build/`
❌ Don't forget sidebar_position
❌ Don't add comments unless requested
❌ Don't commit node_modules or build
❌ Don't use external image URLs
❌ Don't forget dark mode support

---

## Design System

### Brand Colors
- **Green**: `#10b981` (Skills)
- **Purple**: `#8b5cf6` (Tools)
- **Orange**: `#f59e0b` (Agent)

### Responsive Breakpoints
- Mobile: `max-width: 768px`
- Desktop: `min-width: 997px`

### Spacing
- Use 8px grid system (8, 16, 24, 32, 40, 48, 64)

### Accessibility
- Text contrast: 4.5:1
- UI components: 3:1

---

## 文章结构模板（教学类）

1. **一句话总结** > 简短说明
2. **核心笔记** - 要点列表
3. **学完你能做什么** - 输出列表
4. **你现在的困境** - 现状困惑
5. **什么时候用这一招** - 适用场景
6. **核心思路** - 原理解释
7. **跟我做** - 分步骤操作
8. **检查点** - 掌握确认
9. **踩坑提醒（FAQ）** - 问题解决
10. **本课小结** - 重申收获
11. **下一课预告** - 预告内容
