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
