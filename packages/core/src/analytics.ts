import { loadRes, isBrowser } from '@bassist/utils'
import {
  PLUGIN_NAME_IN_ERROR_MESSAGE,
  SUPPORTED_ANALYTICS_PLATFORMS,
} from './constants'
import type {
  CreateAnalyticsInstanceOptions,
  SupportedAnalyticsPlatforms,
  PlatformInstance,
} from './types'

export class Analytics {
  platform: SupportedAnalyticsPlatforms
  platformInstance: PlatformInstance | undefined
  sdkUrl = ''
  websiteId = ''
  debug: boolean

  constructor({ platform, websiteId, debug }: CreateAnalyticsInstanceOptions) {
    this.platform = platform
    this.websiteId = websiteId
    this.debug = typeof debug === 'boolean' ? debug : false
    this.updatePlatformInfo()
  }

  /**
   * Smooth out the differences between different platforms
   */
  private updatePlatformInfo() {
    if (!isBrowser) {
      throw new Error(
        `[${PLUGIN_NAME_IN_ERROR_MESSAGE}] Plugin only works in the browser.`
      )
    }

    switch (this.platform) {
      case 'baidu': {
        // @ts-ignore
        this.platformInstance = window._hmt || []
        this.sdkUrl = `https://hm.baidu.com/hm.js?${this.websiteId}`
        break
      }

      case 'cnzz': {
        // @ts-ignore
        this.platformInstance = window._czc || []
        this.sdkUrl = `https://s9.cnzz.com/z_stat.php?id=${this.websiteId}&web_id=${this.websiteId}`
        break
      }

      default: {
        throw new Error(
          `[${PLUGIN_NAME_IN_ERROR_MESSAGE}] Unsupported platform options, only supported: ${SUPPORTED_ANALYTICS_PLATFORMS.join(
            ', '
          )}.`
        )
      }
    }
  }

  /**
   * Load the platform's JS-SDK file
   */
  async init() {
    if (!this.platformInstance || !this.sdkUrl) return

    try {
      await loadRes({
        type: 'js',
        id: `analytics-${this.platform}-${this.websiteId}`,
        resource: this.sdkUrl,
      })

      if (this.debug) {
        console.log(
          `[${PLUGIN_NAME_IN_ERROR_MESSAGE}] siteId load done.\nwebsiteId:    ${this.websiteId}`
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Provide multi-account switching for upper-level plugins
   */
  setAccount() {
    if (!this.platformInstance) return
    this.platformInstance.push(['_setAccount', this.websiteId])
  }

  trackPageview() {}

  trackEvent() {}
}
