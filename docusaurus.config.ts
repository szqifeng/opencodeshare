import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenCode 学习',
  tagline: '人人都能理解的 AI 编程能力',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: process.env.SITE_URL || 'https://szqifeng.github.io',
  baseUrl: process.env.BASE_URL || '/opencodeshare/',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'baidu-site-verification',
        content: 'codeva-UYjQgfVPGZ',
      },
    },
    {
      tagName: 'script',
      innerHTML: `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?32a7abfa0751c91b0f1136314baf5459";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
      attributes: {},
    },
  ],

  plugins: [
    [
      require.resolve('@docusaurus/plugin-pwa'),
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: `${process.env.BASE_URL || '/'}img/logo.svg`,
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: `${process.env.BASE_URL || '/'}manifest.json`,
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#10b981',
          },
        ],
      },
    ],
  ],

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

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      style: 'primary',
      title: 'OpenCode白话教程',
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
          docId: 'quick-start/starter-guide',
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
          to: '/club',
          label: '加入社群',
          position: 'right',
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
