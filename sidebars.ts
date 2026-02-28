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
      label: '🚀 01-快速起步',
      collapsed: false,
      items: [
        '01-quick-start/opencode-intro',
        '01-quick-start/installation',
        '01-quick-start/network-config',
        '01-quick-start/model-selection',
      ],
    },
    {
      type: 'category',
      label: '⚙️ 02-日常使用',
      items: [
        '02-daily-usage/tools',
        '02-daily-usage/rules',
        '02-daily-usage/agents',
        '02-daily-usage/models',
        '02-daily-usage/themes',
        '02-daily-usage/shortcuts',
        '02-daily-usage/commands',
        '02-daily-usage/lsp-server',
        '02-daily-usage/mcp-server',
      ],
    },
    {
      type: 'category',
      label: '⚡ 03-最短工作流',
      items: [
        '03-quick-workflow/quick-qa',
        '03-quick-workflow/single-dialogue',
        '03-quick-workflow/simple-task',
        '03-quick-workflow/fast-generation',
      ],
    },
    {
      type: 'category',
      label: '🎯 04-最佳实践',
      items: [
        '04-best-practices/workflow-design',
        '04-best-practices/wechat-mp',
        '04-best-practices/xiaohongshu',
        '04-best-practices/web-automation',
        '04-best-practices/code-engineering',
        '04-best-practices/drama-writing',
        '04-best-practices/doc-generation',
        '04-best-practices/code-review',
        '04-best-practices/efficiency-tips',
        '04-best-practices/prompt-tips',
        '04-best-practices/debugging-tips',
      ],
    },
    {
      type: 'category',
      label: '📖 05-白话术语',
      items: [
        '05-terminology/llm',
        '05-terminology/prompt',
        '05-terminology/rag',
        '05-terminology/function-calling',
        '05-terminology/mcp',
        '05-terminology/lsp',
        '05-terminology/agent',
      ],
    },
    {
      type: 'category',
      label: '📚 06-扩展阅读',
      items: [
        '06-extended-reading/architecture',
        '06-extended-reading/custom-dev',
        '06-extended-reading/cases',
        '06-extended-reading/resources',
      ],
    },
    {
      type: 'category',
      label: '🔧 07-故障排查',
      items: [
        '07-troubleshooting/common-issues',
        '07-troubleshooting/fixes',
      ],
    },
  ],
};

export default sidebars;
