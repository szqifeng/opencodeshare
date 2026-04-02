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
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          blogTitle: '技术博客',
          blogDescription: 'OpenCode 的技术分享与思考',
          postsPerPage: 10,
          feedOptions: {
            type: 'rss',
            copyright: 'Copyright © 2026 LearnOpenCode',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  clientModules: ['./src/components/GifViewer.tsx'],

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
          to: '/blog',
          label: '博客',
          position: 'left',
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
        // {
        //   to: '/club',
        //   label: '加入社群',
        //   position: 'right',
        // },
        {
          href: 'https://github.com/szqifeng/miniopencode',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: '辽ICP备2026003919号',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
