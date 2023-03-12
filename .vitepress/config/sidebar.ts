import type { DefaultTheme } from 'vitepress'
import type { Locales } from './types'

export const sidebar: Record<Locales, DefaultTheme.Sidebar> = {
  /**
   * English
   */
  en: [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: 'Core', link: '/core/' },
        // { text: 'Starter Template', link: '/docs/starter-template' },
        // { text: 'Technology Stack', link: '/docs/technology-stack' },
        // { text: 'Local Configuration', link: '/docs/local-configuration' },
        // { text: 'Proxy Download', link: '/docs/proxy-download' },
        // { text: 'CLI Upgrade', link: '/docs/cli-upgrade' },
      ],
    },
  ],

  /**
   * 简体中文
   */
  zh: [
    // {
    //   text: 'Guide',
    //   items: [
    //     { text: '项目介绍', link: '/zh/guide/introduction' },
    //     { text: '起步指南', link: '/zh/guide/getting-started' },
    //   ],
    // },
    // {
    //   text: 'Packages',
    //   items: [
    //     { text: '基本用法', link: '/zh/docs/basic-usage' },
    //     { text: '项目启动模板', link: '/zh/docs/starter-template' },
    //     { text: '技术栈管理', link: '/zh/docs/technology-stack' },
    //     { text: '本地配置文件', link: '/zh/docs/local-configuration' },
    //     { text: '代理下载', link: '/zh/docs/proxy-download' },
    //     { text: '脚手架升级', link: '/zh/docs/cli-upgrade' },
    //   ],
    // },
  ],
}
