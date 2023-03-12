import type { DefaultTheme } from 'vitepress'
import type { Locales } from './types'

export const nav: Record<Locales, DefaultTheme.NavItem[]> = {
  /**
   * English
   */
  en: [
    {
      text: 'Guide',
      link: '/guide/getting-started',
      activeMatch: '/guide/',
    },
    {
      text: 'Release Notes',
      link: 'https://github.com/analyticsjs/web-analytics/releases',
    },
    {
      text: 'Git Analytics',
      link: 'https://github.com/analyticsjs/git-commit-analytics',
    },
  ],

  /**
   * 简体中文
   */
  zh: [
    {
      text: '指南',
      link: '/zh/guide/getting-started',
      activeMatch: '/zh/guide/',
    },
    // {
    //   text: '文档',
    //   link: '/zh/docs/basic-usage',
    //   activeMatch: '/zh/docs/',
    // },
    {
      text: '更新记录',
      link: 'https://github.com/analyticsjs/web-analytics/releases',
    },
  ],
}
