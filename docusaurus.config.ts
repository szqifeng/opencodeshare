import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenCode 科普',
  tagline: '人人都能理解的 AI 编程能力',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://szqifeng.github.io',
  baseUrl: '/opencodeshare/',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      style: 'primary',
      title: 'OpenCode',
      logo: {
        alt: 'OpenCode Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: '首页',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'quick-start/opencode-intro',
          position: 'left',
          label: '文档',
        },
        {
          to: '/#features',
          label: '核心能力',
          position: 'left',
        },
        {
          to: '/#scenarios',
          label: '应用场景',
          position: 'left',
        },
        {
          href: 'https://github.com/szqifeng/opencodeshare',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: '本教程采用 CC BY-NC-SA 4.0 许可协议 | 隐私政策 | © 2026 LearnOpenCode',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
