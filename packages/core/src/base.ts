import { isBrowser } from '@bassist/utils'
import {
  PLUGIN_NAME_IN_ERROR_MESSAGE,
  SUPPORTED_ANALYTICS_PLATFORMS,
} from './constants'
import type {
  CreateAnalyticsInstanceOptions,
  PlatformInstance,
  SupportedAnalyticsPlatforms,
} from './types'

export class BaseAnalytics {
  pluginName: string
  platform: SupportedAnalyticsPlatforms
  platformInstance: PlatformInstance | undefined
  sdkUrl = ''
  websiteId = ''
  debug: boolean

  constructor({
    pluginName,
    platform,
    websiteId,
    debug,
  }: CreateAnalyticsInstanceOptions) {
    this.pluginName = pluginName || PLUGIN_NAME_IN_ERROR_MESSAGE
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
      this.throwError('Plugin only works in the browser.')
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
        const platforms = SUPPORTED_ANALYTICS_PLATFORMS.join(', ')
        throw new Error(
          `[${this.pluginName}] Unsupported platform options, only supported: ${platforms}.`
        )
      }
    }
  }

  throwError(msg: string) {
    throw new Error(`[${this.pluginName}] ${msg}`)
  }

  printLogForDebug(msg: string) {
    if (this.debug) {
      console.log(`[${this.pluginName}] ${msg}`)
    }
  }
}
