import { isBrowser, loadRes } from '@bassist/utils'
import { DEFAULT_PLUGIN_ID, SUPPORTED_ANALYTICS_PLATFORMS } from './constants'
import { debug } from './decorators'
import type {
  CreateAnalyticsInstanceOptions,
  SdkInstance,
  SupportedAnalyticsPlatforms,
} from './types'

export class BaseAnalytics {
  pluginId: string
  platform: SupportedAnalyticsPlatforms
  sdkInstance: SdkInstance | undefined
  sdkUrl = ''
  websiteId = ''
  debug: boolean

  constructor({
    pluginId,
    platform,
    websiteId,
    debug,
  }: CreateAnalyticsInstanceOptions) {
    this.pluginId = pluginId || DEFAULT_PLUGIN_ID
    this.platform = platform
    this.websiteId = websiteId
    this.debug = typeof debug === 'boolean' ? debug : false
    this.updatePlatformInfo()
    this.loadSdk()
  }

  /**
   * Smooth out the differences between different platforms
   */
  private updatePlatformInfo() {
    if (!isBrowser) {
      this.throwError('Plugin only works in the browser.')
      return
    }

    switch (this.platform) {
      case 'baidu': {
        // @ts-ignore
        this.sdkInstance = window._hmt || []
        this.sdkUrl = `https://hm.baidu.com/hm.js?${this.websiteId}`
        break
      }

      case 'cnzz': {
        // @ts-ignore
        this.sdkInstance = window._czc || []
        this.sdkUrl = `https://s9.cnzz.com/z_stat.php?id=${this.websiteId}&web_id=${this.websiteId}`
        break
      }

      default: {
        const platforms = SUPPORTED_ANALYTICS_PLATFORMS.join(', ')
        throw new Error(
          `[${this.pluginId}] Unsupported platform options, only supported: ${platforms}.`
        )
      }
    }
  }

  /**
   * Load the JS-SDK file of the analytics platform
   */
  @debug
  private loadSdk() {
    if (!this.sdkInstance || !this.sdkUrl) return

    loadRes({
      type: 'js',
      id: `${this.pluginId}-${this.platform}-${this.websiteId}`,
      resource: this.sdkUrl,
    }).catch((e) => {
      console.log(e)
    })
  }

  throwError(msg: string) {
    throw new Error(`[${this.pluginId}] ${msg}`)
  }
}
