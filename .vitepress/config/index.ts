import { resolve } from 'path'
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import { nav } from './nav'
import { head } from './head'
import { sidebar } from './sidebar'
import pkg from '../../package.json'

const pattern =
  'https://github.com/analyticsjs/web-analytics/edit/main/packages/:path'

export default defineConfig({
  base: '/',
  appearance: 'dark',
  lang: 'en-US',
  srcDir: 'packages',
  outDir: 'dist',
  title: 'Web Analytics',
  description: 'Website pageview analytics tools.',
  head,
  cleanUrls: true,
  rewrites: {
    ':pkg/CHANGELOG.md': ':pkg/changelog.md',
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Web Analytics',
      description: 'Website pageview analytics tools.',
      themeConfig: {
        nav: nav.en,
        sidebar: sidebar.en,
        editLink: {
          pattern,
        },
      },
    },
    // zh: {
    //   label: '简体中文',
    //   lang: 'zh',
    //   title: 'Web Analytics',
    //   description: '网站页面浏览量分析工具。',
    //   themeConfig: {
    //     nav: nav.zh,
    //     sidebar: sidebar.zh,
    //     editLink: {
    //       pattern,
    //       text: '编辑本页内容',
    //     },
    //     outlineTitle: '本页导航',
    //     docFooter: {
    //       prev: '上一篇',
    //       next: '下一篇',
    //     },
    //   },
    // },
  },
  themeConfig: {
    logo: '/logo.svg',
    outline: 'deep',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/analyticsjs/web-analytics',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: [
        'Copyright',
        '©',
        '2023-PRESENT',
        '<a href="https://github.com/chengpeiquan" target="_blank">@chengpeiquan</a>',
      ].join(' '),
    },
  },
  vite: {
    server: {
      port: 6636,
    },
    resolve: {
      alias: {
        '@config': resolve(__dirname, '../config'),
        '@theme': resolve(__dirname, '../theme'),
      },
    },
    plugins: [
      banner({
        outDir: '../dist',
        content: [
          `/**`,
          ` * name: ${pkg.name}`,
          ` * version: v${pkg.version}`,
          ` * description: ${pkg.description}`,
          ` * author: ${pkg.author}`,
          ` * homepage: ${pkg.homepage}`,
          ` */`,
        ].join('\n'),
      }),
    ],
  },
})
