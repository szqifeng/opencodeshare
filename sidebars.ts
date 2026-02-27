import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '🚀 开始学习',
      collapsed: false,
      items: [
        'intro/what-is-opencode',
        'intro/quick-start',
        'intro/installation',
        'intro/basic-concepts',
        'intro/architecture',
        'intro/core-features',
        'intro/getting-started',
        'intro/first-project',
        'intro/environment-setup',
        'intro/common-issues',
        'intro/terminology',
        'intro/workflow-basics',
        'intro/configuration',
        'intro/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: '💼 场景实战',
      items: [
        'scenarios/code-review',
        'scenarios/refactoring',
        'scenarios/debugging',
        'scenarios/automation',
        'scenarios/data-analysis',
        'scenarios/report-generation',
        'scenarios/api-integration',
        'scenarios/testing',
        'scenarios/monitoring',
        'scenarios/documentation',
        'scenarios/migration',
        'scenarios/optimization',
      ],
    },
    {
      type: 'category',
      label: '📚 进阶手册',
      items: [
        'advanced/custom-agents',
        'advanced/workflow',
        'advanced/api-reference',
        'advanced/best-practices',
        'advanced/performance',
        'advanced/security',
        'advanced/deployment',
        'advanced/plugins',
        'advanced/extensions',
        'advanced/advanced-features',
        'advanced/integration',
        'advanced/customization',
      ],
    },
    {
      type: 'category',
      label: '👥 社群',
      items: [
        'community/faq',
        'community/contribute',
        'community/contact',
        'community/discussions',
        'community/releases',
        'community/showcase',
        'community/guidelines',
      ],
    },
  ],
};

export default sidebars;
