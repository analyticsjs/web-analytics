import { isBrowser } from '@bassist/utils'
import { VueAnalytics } from '../analytics'
import { getMajorVersion, getGlobalProperty } from '../utils'
import type { Platform } from '@web-analytics/core'
import type {
  CreateVueAnalyticsInstanceOptions,
  RegisterProviderOptions,
  VueInstance,
} from '../types'

function registerProvider<P extends Platform>({
  analytics,
  platform,
}: RegisterProviderOptions<P>) {
  return {
    install: (
      app: VueInstance,
      { router, ...others }: CreateVueAnalyticsInstanceOptions
    ) => {
      if (!isBrowser) return

      // Synchronize the real properties with the prototype to the exported instance
      const analyticsInstance = new VueAnalytics<P>({ platform, ...others })
      for (const key in analyticsInstance) {
        if (Object.prototype.hasOwnProperty.call(analyticsInstance, key)) {
          // @ts-ignore
          analytics[key] = analyticsInstance[key]
        }
      }
      const prototype = Object.getPrototypeOf(analyticsInstance)
      Object.setPrototypeOf(analytics, prototype)

      // Add a global property to Vue instance
      const property = getGlobalProperty(platform)
      const version = getMajorVersion(app)
      switch (version) {
        case 2: {
          app.prototype[property] = analytics
          break
        }
        case 3: {
          app.config.globalProperties[property] = analytics
          break
        }
      }

      // Automatic tracking of pageview
      if (!router) return
      router.afterEach(() => {
        analytics.trackPageview({
          pageUrl: window.location.href,
        })
      })
    },
  }
}

export function createVueBaiduAnalytics() {
  // @ts-ignore
  const baiduAnalytics: VueAnalytics<'baidu'> = {}

  return {
    baiduAnalytics,
    registerBaiduAnalytics: registerProvider({
      analytics: baiduAnalytics,
      platform: 'baidu',
    }),
  }
}

export function createVueCnzzAnalytics() {
  // @ts-ignore
  const cnzzAnalytics: VueAnalytics<'cnzz'> = {}

  return {
    cnzzAnalytics,
    registerCnzzAnalytics: registerProvider({
      analytics: cnzzAnalytics,
      platform: 'cnzz',
    }),
  }
}
