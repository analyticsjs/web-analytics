import { home } from './home'
import { logo } from './logo'
import type { Locales } from '@config/types'

export const messages: Record<Locales, Record<string, Record<string, any>>> = {
  /**
   * English
   */
  en: {
    home: { ...home.en },
    logo: { ...logo.en },
  },

  /**
   * 简体中文
   */
  zh: {
    home: { ...home.zh },
    logo: { ...logo.zh },
  },
}
