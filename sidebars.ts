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
        'quick-start/opencode-intro',
        'quick-start/quick-experience',
        'quick-start/quick-connect-model',
        'quick-start/workflow',
        'quick-start/tools-intro',
        'quick-start/configuration',
        'quick-start/core-prompts',
        'quick-start/commands',
      ],
    },
    {
      type: 'category',
      label: '⚙️ 02-日常使用',
      items: [
        'daily-usage/tools',
        'daily-usage/rules',
        'daily-usage/agents',
        'daily-usage/models',
        'daily-usage/multimedia',
        'daily-usage/themes',
        'daily-usage/shortcuts',
        'daily-usage/commands',
        'daily-usage/lsp-server',
        'daily-usage/mcp-server',
      ],
    },
    {
      type: 'category',
      label: '⚡ 03-最短工作流',
      items: [
        'quick-workflow/quick-qa',
        'quick-workflow/single-dialogue',
        'quick-workflow/simple-task',
        'quick-workflow/fast-generation',
      ],
    },
    {
      type: 'category',
      label: '🎯 04-最佳实践',
      items: [
        'best-practices/workflow-design',
        'best-practices/wechat-mp',
        'best-practices/xiaohongshu',
        'best-practices/web-automation',
        'best-practices/code-engineering',
        'best-practices/drama-writing',
        'best-practices/doc-generation',
        'best-practices/code-review',
        'best-practices/efficiency-tips',
        'best-practices/prompt-tips',
        'best-practices/debugging-tips',
      ],
    },
    {
      type: 'category',
      label: '📖 05-白话术语',
      items: [
        'terminology/llm',
        'terminology/prompt',
        'terminology/rag',
        'terminology/function-calling',
        'terminology/mcp',
        'terminology/lsp',
        'terminology/agent',
      ],
    },
    {
      type: 'category',
      label: '📚 06-扩展阅读',
      items: [
        'extended-reading/architecture',
        'extended-reading/custom-dev',
        'extended-reading/cases',
        'extended-reading/resources',
      ],
    },
    {
      type: 'category',
      label: '🔧 07-故障排查',
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/fixes',
      ],
    },
    {
      type: 'category',
      label: '📖 08-源码阅读篇',
      items: [
        'source-reading/intro',
        'source-reading/double-loop-explanation',
        'source-reading/minimal-chat-prompts',
      ],
    },
  ],
};

export default sidebars;
