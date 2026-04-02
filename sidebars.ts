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
        'quick-start/starter-guide',
        'quick-start/quick-connect-model',
        'quick-start/workflow',
        'quick-start/agents-intro',
        'quick-start/skills-intro',
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
        'daily-usage/image-usage',
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
    {
      type: 'category',
      label: '🦀 09-OpenClaw',
      items: [
        {
          type: 'category',
          label: '🚀 快速安装',
          link: {
            type: 'doc',
            id: 'openclaw/quick-install',
          },
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'openclaw/mac-docker-install',
              label: 'Mac Docker 安装',
            },
            {
              type: 'doc',
              id: 'openclaw/mac-native-install',
              label: 'Mac 原生安装',
            },
            {
              type: 'doc',
              id: 'openclaw/windows-docker-install',
              label: 'Windows Docker 安装',
            },
            {
              type: 'doc',
              id: 'openclaw/windows-native-install',
              label: 'Windows 原生安装',
            },
            {
              type: 'doc',
              id: 'openclaw/linux-native-install',
              label: 'Linux 原生安装',
            },
            {
              type: 'doc',
              id: 'openclaw/cloud-server-install',
              label: '云服务器安装',
            },
          ],
        },
        {
          type: 'category',
          label: '⚙️ 配置',
          link: {
            type: 'doc',
            id: 'openclaw/config-guide',
          },
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'openclaw/openclaw-config-full-guide',
              label: '⚙️ 全局配置',
            },
            {
              type: 'category',
              label: '📦 模型配置',
              collapsed: true,
              items: [
                {
                  type: 'doc',
                  id: 'openclaw/openclaw-deepseek-config',
                  label: 'DeepSeek 模型配置',
                },
                {
                  type: 'doc',
                  id: 'openclaw/openclaw-minimax-config',
                  label: 'MiniMax 模型配置',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '🔌 插件',
          link: {
            type: 'doc',
            id: 'openclaw/plugin-dev',
          },
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'openclaw/openclaw-plugin-architecture',
              label: '插件架构生态全解',
            },
          ],
        },
        {
          type: 'category',
          label: '🏗️ 架构',
          link: {
            type: 'doc',
            id: 'openclaw/architecture/openclaw-architecture-layers',
          },
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'openclaw/architecture/openclaw-architecture-layers',
              label: '架构设计分层',
            },
            {
              type: 'doc',
              id: 'openclaw/architecture/openclaw-code-architecture',
              label: '代码架构详解',
            },
            {
              type: 'doc',
              id: 'openclaw/architecture/openclaw-agent-core',
              label: 'Agent 核心原理',
            },
            {
              type: 'doc',
              id: 'openclaw/architecture/openclaw-plugin-system',
              label: '插件系统架构',
            },
            {
              type: 'doc',
              id: 'openclaw/architecture/openclaw-feishu-plugin',
              label: '飞书插件架构',
            },
            {
              type: 'doc',
              id: 'openclaw/architecture/openclaw-workspace-structure',
              label: '项目工作目录结构',
            },
          ],
        },
        {
          type: 'category',
          label: '🎯 技能',
          link: {
            type: 'doc',
            id: 'openclaw/skills',
          },
          collapsed: true,
          items: [
            {
              type: 'doc',
              id: 'openclaw/react-pattern-agent',
              label: 'ReAct 模式全解',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🧩 10-Minicode',
      items: [
        'minicode/minicode-01-sdk-api',
        'minicode/minicode-02-tool-calling',
        'minicode/minicode-03-react',
        'minicode/minicode-04-session',
        'minicode/minicode-05-channel',
        'minicode/minicode-06-mcp',
        'minicode/minicode-07-skill',
        'minicode/minicode-08-base-tools',
        'minicode/minicode-09-streaming',
        'minicode/minicode-10-deploy',
      ],
    },
    {
      type: 'category',
      label: '🤖 11-MiniOpenCode',
      collapsed: true,
      items: [
        'miniopencode/miniopencode-01-agent-react',
        'miniopencode/miniopencode-02-tools',
        'miniopencode/miniopencode-03-session-prompts',
        'miniopencode/miniopencode-04-streaming',
      ],
    },
  ],
};

export default sidebars;
