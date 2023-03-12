import type { Locales } from '@config/types'

interface LogoLocales {
  desc: string
  designer: string
}

export const logo: Record<Locales, LogoLocales> = {
  /**
   * English
   */
  en: {
    desc: 'The logo is inspired by the universal toolbox, designed by {0} .',
    designer: 'chengpeiquan',
  },

  /**
   * 简体中文
   */
  zh: {
    desc: 'Logo 的灵感源自于万能工具箱，由 {0} 设计。',
    designer: '程沛权',
  },
}
