import type { Platform } from '@web-analytics/core'
import type { VueInstance } from './types'

export function getMajorVersion({ version }: VueInstance) {
  const defaultVersion = 3
  try {
    const [major] = version.split('.')
    return major ? Number(major) : defaultVersion
  } catch (e) {
    return defaultVersion
  }
}

export function getGlobalProperty(platform: Platform) {
  switch (platform) {
    case 'baidu': {
      return 'baiduAnalytics'
    }

    case 'cnzz': {
      return 'cnzzAnalytics'
    }

    default: {
      return ''
    }
  }
}
