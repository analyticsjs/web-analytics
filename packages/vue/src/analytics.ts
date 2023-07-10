import {
  Analytics,
  createBaiduAnalytics,
  createCnzzAnalytics,
  SUPPORTED_ANALYTICS_PLATFORMS,
} from '@web-analytics/core'
import type {
  Platform,
  TrackEventOptions,
  TrackPageviewOptions,
  WebsiteId,
} from '@web-analytics/core'
import type { VueAnalyticsConstructorOptions } from './types'

export class VueAnalytics<P extends Platform = Platform> {
  pluginId: string
  platform: Platform
  websiteIds: WebsiteId[]
  instances: Analytics<P>[]
  debug: boolean

  constructor({ platform, websiteIds, debug }: VueAnalyticsConstructorOptions) {
    this.pluginId = 'web-analytics-vue'
    this.platform = platform
    this.websiteIds = websiteIds || ([] as WebsiteId[])
    this.instances = []
    this.debug = debug ?? false
    this.init()
  }

  private init() {
    try {
      switch (this.platform) {
        case 'baidu': {
          this.websiteIds.forEach((id) => {
            const ins = createBaiduAnalytics({
              pluginId: this.pluginId,
              websiteId: id,
              debug: this.debug,
            })
            this.instances.push(ins)
          })
          break
        }

        case 'cnzz': {
          this.websiteIds.forEach((id) => {
            const ins = createCnzzAnalytics({
              pluginId: this.pluginId,
              websiteId: id,
              debug: this.debug,
            })
            this.instances.push(ins)
          })
          break
        }

        default: {
          const platforms = SUPPORTED_ANALYTICS_PLATFORMS.join(', ')
          this.throwError(
            `Unsupported platform options, only supported: ${platforms}.`,
          )
          break
        }
      }
    } catch (e) {
      this.throwError(`Plugin initialization failed: ${e}.`)
    }
  }

  trackPageview(options: TrackPageviewOptions<P>) {
    this.instances.forEach((ins) => ins.trackPageview({ ...options }))
  }

  trackEvent(options: TrackEventOptions<P>) {
    this.instances.forEach((ins) => ins.trackEvent({ ...options }))
  }

  private throwError(msg: string) {
    throw new Error(`[${this.pluginId}] ${msg}`)
  }
}
