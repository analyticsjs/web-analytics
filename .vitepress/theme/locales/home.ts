import type { Locales } from '@config/types'

interface Feature {
  icon: string
  title: string
  description: string
}

interface HomeLocales {
  name: string
  description: string
  guideButtonText: string
  features: Feature[]
}

export const home: Record<Locales, HomeLocales> = {
  /**
   * English
   */
  en: {
    name: 'Create Preset',
    description: 'Provides the ability to quickly create preset projects.',
    guideButtonText: 'Get Started',
    features: [
      {
        icon: '✈',
        title: 'Practicality',
        description: 'Out-of-the-box starter templates for projects.',
      },
      {
        icon: '⚡️',
        title: 'Efficient',
        description:
          'Reduces repetitive configuration processes every time a new project is created.',
      },
      {
        icon: '🤹',
        title: 'Interactive',
        description: 'Simple command-line interactive operation.',
      },
      {
        icon: '🛠',
        title: 'Multi-Tech Stacks',
        description:
          'Provide commonly used multiple technology stack project support.',
      },
      {
        icon: '🚀',
        title: 'keep pace with the times',
        description:
          'Provide open source and long-term maintenance and update templates.',
      },
      {
        icon: '🔑',
        title: 'Private Configuration',
        description:
          'Support for local configuration files to manage private template lists.',
      },
    ],
  },

  /**
   * 简体中文
   */
  zh: {
    name: 'Create Preset',
    description: '提供快速创建预设项目的能力。',
    guideButtonText: '开始使用',
    features: [
      {
        icon: '✈',
        title: '实用性',
        description: '开箱即用的项目入门模板。',
      },
      {
        icon: '⚡️',
        title: '高效的',
        description: '减少每次创建新项目时的重复配置过程。',
      },
      {
        icon: '🤹',
        title: '交互式',
        description: '简单的命令行交互式操作。',
      },
      {
        icon: '🛠',
        title: '多技术栈',
        description: '提供常用的多种技术栈项目支持。',
      },
      {
        icon: '🚀',
        title: '与时俱进',
        description: '提供开源且长期维护更新的模板。',
      },
      {
        icon: '🔑',
        title: '私有配置',
        description: '支持本地配置文件管理私有模板列表。',
      },
    ],
  },
}
