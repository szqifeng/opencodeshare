# AGENTS.md - Agent Coding Guidelines

> Git 作者：qifeng (977765310@qq.com)

## Essential Commands

```bash
# Development
npm start              # Start dev server at http://localhost:3000
npm run build          # Build for production
npm run serve          # Preview production build locally

# Type Checking
npm run typecheck      # Run TypeScript type checking

# Utilities
npm run clear          # Clear Docusaurus cache and build
npm run swizzle        # Eject a theme component for customization
```

**IMPORTANT:** When starting the dev server:
1. Always kill existing process on port 3000 first: `lsof -ti :3000 | xargs kill -9`
2. Run server asynchronously to avoid blocking: `nohup npm start > /dev/null 2>&1 &`

**Deployment:**
- Master branch auto-deploys to GitHub Pages via GitHub Actions
- No manual deploy needed - just push to master branch

## Multi-Environment Deployment

This site supports deployment to multiple environments:

### Local Development
```bash
npm start
# Access at: http://localhost:3000
```

### GitHub Pages
- URL: https://szqifeng.github.io/opencodeshare/
- Triggered by pushing to master branch
- Auto-deployed via GitHub Actions

### Custom Domain (opencodeshare.cn)
```bash
# Set environment variable for custom domain
DEPLOY_PRIME_URL=https://opencodeshare.cn npm run build

# Deploy build output to your server
# The build will be configured for root path (/)
```

### Environment Configuration

The site uses `DEPLOY_PRIME_URL` environment variable to configure deployment target:

- **Local**: Uses default localhost URL
- **GitHub Pages**: Default config (https://szqifeng.github.io + /opencodeshare/ base)
- **Custom Domain**: Set `DEPLOY_PRIME_URL=https://yourdomain.com` to use root base path

### Testing Custom Domain Locally

```bash
# Build for custom domain
DEPLOY_PRIME_URL=https://opencodeshare.cn npm run build

# Preview custom domain build
npm run serve
# Access at: http://localhost:3000/ (configured for root path)
```

**Note:** No test suite - use `npm start` and manually verify in browser.

---

## Project Structure

```
opencode-docs/
├── docs/              # Markdown documentation
├── src/
│   ├── components/    # React components
│   ├── css/custom.css # Global styles (minimize !important)
│   ├── pages/         # Page components
│   └── theme/         # Theme swizzles
├── static/img/        # Static assets
├── docusaurus.config.ts
└── sidebars.ts
```

---

## TypeScript/React Style

### Imports
```typescript
import type {ReactNode, CSSProperties} from 'react';
import Layout from '@theme/Layout';
// Order: types, external libs, theme components
```

### Components
```typescript
export default function Home(): ReactNode {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  const container: CSSProperties = {maxWidth: '1200px'};
  return <div style={container}>...</div>;
}
```

### Naming
- Components: PascalCase
- Functions: camelCase
- CSS Variables: --ifm- prefix
- Files: kebab-case for MD, PascalCase for TSX

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

---

## Design System (首页设计规范)

### Color Palette

#### Primary Colors
- **Brand Green**: `#10b981` → `#059669` (Skills)
- **Brand Purple**: `#8b5cf6` → `#7c3aed` (Tools)
- **Brand Orange**: `#f59e0b` → `#d97706` (Agent)

#### Theme Colors
| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background (section) | `#f9fafb` | `#111827` |
| Card Background | `#ffffff` | `#1f2937` |
| Card Border | `#f3f4f6` | `#374151` |
| Primary Text | `#111827` | `#f9fafb` |
| Secondary Text | `#6b7280` | `#9ca3af` |
| Link Color | `#10b981` | `#10b981` |

### Card Design System

#### Card Container
```typescript
const card: CSSProperties = {
  backgroundColor: isDarkMode ? '#1f2937' : '#fff',
  borderRadius: '16px',
  padding: '2rem',
  border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
};
```

#### Card Hover Effects
```css
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(16, 185, 129, 0.15); /* Light mode */
  box-shadow: 0 30px 60px rgba(16, 185, 129, 0.2);  /* Dark mode */
  border-color: #10b981;
}
```

#### Card Typography
```typescript
const cardTitle: CSSProperties = {
  fontSize: '1.15rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
  color: isDarkMode ? '#f9fafb' : '#111827',
};

const cardDesc: CSSProperties = {
  color: isDarkMode ? '#9ca3af' : '#6b7280',
  lineHeight: 1.6,
  marginBottom: '1rem',
  fontSize: '0.95rem',
};

const cardLink: CSSProperties = {
  color: '#10b981',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
};
```

### SVG Animation System

#### Icon Container
```typescript
const svgIcon: CSSProperties = {
  width: '64px',
  height: '64px',
  marginBottom: '1rem',
};
```

#### Gradient Definitions
```svg
<defs>
  <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
    <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
  </linearGradient>
</defs>
```

#### Common Animation Patterns

**1. Pulse / Breathing Animation**
```svg
<circle r="28" fill="url(#gradient)" opacity="0.1">
  <animate attributeName="r" values="28;32;28" dur="3s" repeatCount="indefinite"/>
</circle>
```

**2. Scale Animation**
```svg
<circle r="8" fill="url(#gradient)">
  <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
</circle>
```

**3. Path Animation (Stroke)**
```svg
<path stroke="url(#gradient)" strokeWidth="2" fill="none">
  <animate attributeName="stroke-dasharray" values="0,200;200,0;200,0" dur="1.5s" repeatCount="indefinite"/>
</path>
```

**4. Wobble Animation**
```svg
<rect x="16">
  <animate attributeName="x" values="16;14;16" dur="2s" repeatCount="indefinite"/>
</rect>
```

**5. Blink Animation**
```svg
<circle>
  <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
</circle>
```

### Animation Timing & Delays

#### Page Load Animations
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: slideUp 0.6s ease-out forwards, cardGlow 3s ease-in-out infinite;
}

/* Staggered delays for multiple cards */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
```

#### Glow Effect Animation
```css
@keyframes cardGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0);
  }
  50% {
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
  }
}
```

### Grid Layout Patterns

#### 3-Column Grid (Features)
```typescript
const cardGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
};
```

#### 2-Column Grid (Skills & Tools)
```typescript
const skillsToolsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
};
```

#### Responsive Grid (Mobile)
```css
@media (max-width: 768px) {
  .cardGrid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
    gap: 0.75rem !important;
  }
}

@media (max-width: 480px) {
  .cardGrid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
  }
}
```

### Typography Hierarchy

#### Hero Section
```typescript
const heroTitle: CSSProperties = {
  fontSize: '3.5rem',
  fontWeight: 800,
  lineHeight: 1.1,
  marginBottom: '1.5rem',
  color: isDarkMode ? '#f9fafb' : '#111827',
  letterSpacing: '-0.03em',
};

const heroSubtitle: CSSProperties = {
  fontSize: '1.25rem',
  color: isDarkMode ? '#9ca3af' : '#6b7280',
  lineHeight: 1.7,
  marginBottom: '2.5rem',
  maxWidth: '480px',
};
```

#### Section Titles
```typescript
const sectionTitle: CSSProperties = {
  fontSize: '2rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: '3rem',
  color: isDarkMode ? '#f9fafb' : '#111827',
  letterSpacing: '-0.02em',
};
```

### Button Styles

#### Primary Button
```typescript
const btnPrimary: CSSProperties = {
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  color: '#fff',
  padding: '0.875rem 1.75rem',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '0.95rem',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
  cursor: 'pointer',
};
```

#### Secondary Button
```typescript
const btnSecondary: CSSProperties = {
  backgroundColor: isDarkMode ? '#1f2937' : '#fff',
  color: isDarkMode ? '#e5e7eb' : '#374151',
  padding: '0.875rem 1.75rem',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '0.95rem',
  textDecoration: 'none',
  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
};
```

### Design Principles

1. **Vibrant & Modern**: Use gradients and animations to create dynamic, engaging interfaces
2. **Dark Mode First**: All components must support both light and dark themes
3. **Smooth Transitions**: Use cubic-bezier timing functions for natural animations
4. **Accessibility**: Maintain sufficient contrast ratios (4.5:1 for text, 3:1 for UI components)
5. **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
6. **Visual Hierarchy**: Clear distinction between primary, secondary, and tertiary elements
7. **Consistent Spacing**: Use 8px grid system (8, 16, 24, 32, 40, 48, 64)
8. **Micro-interactions**: Subtle hover states, focus rings, and feedback animations

### Icon Guidelines

**Skills Icon Pattern:**
- Geometric shapes (hexagon, circle, diamond)
- Center point with pulse animation
- Gradient stroke borders

**Tools Icon Pattern:**
- Rectangular forms
- Left-right pulse animations
- Mechanized/motion hints

**Agent Icon Pattern:**
- Bot/AI face shapes
- Eye blink animations
- Friendly expression

---

## Markdown Documentation

```markdown
---
sidebar_position: 1
---

# 🚀 Title
Content with **bold** and emojis
\`\`\`javascript
code example
\`\`\`
```

---

## Common Patterns

```typescript
// Theme detection
const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

// Conditional styling
const style: CSSProperties = {color: isDarkMode ? '#f9fafb' : '#111827'};
```

---

## Best Practices

1. Run `npm run typecheck` before committing
2. Support both light and dark themes
3. Test on mobile (≤768px) and desktop
4. Use CSS variables for theme values
5. Update `sidebars.ts` when adding docs
6. No external image URLs - use `static/img/`
7. Use `satisfies` for config validation

---

## Pitfalls to Avoid

❌ No `any` types - use proper TypeScript
❌ Don't modify `.docusaurus/` or `build/` directories
❌ Don't forget sidebar_position in frontmatter
❌ Don't add comments unless requested
❌ Don't commit node_modules or build

---

## Error Handling

- TypeScript errors: Check types, imports
- Build errors: Verify config syntax
- Missing assets: Check `static/` directory
- Theme issues: Run `npm run clear`

---

## 文章结构模板（教学/实操类）

### 1. 一句话总结
> 简短说明主题和目标

### 2. 核心笔记 / 精华总结
- 要点 1
- 要点 2
- …

### 3. 学完你能做什么
* 输出 1
* 输出 2

### 4. 你现在的困境
* 现状困惑 A
* 现状困惑 B

### 5. 什么时候用这一招
* 适用场景 1
* 适用场景 2

### 6. 核心思路
解释原理 / 工作方式

### 7. 跟我做（分步骤）
#### 步骤 1：
- 说明 + 示例

#### 步骤 2：
- 说明 + 示例

…

### 8. 检查点
✔ 核心掌握确认

### 9. 踩坑提醒（FAQ）
问题 → 原因 → 解决

### 10. 本课小结
重申收获

### 11. 下一课预告
预告内容
