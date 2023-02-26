import { loadRes } from '@bassist/utils'
import { BaseAnalytics } from './base'
import { debug } from './decorators'
import type { CreateAnalyticsInstanceOptions } from './types'

export class Analytics extends BaseAnalytics {
  debug: any

  constructor({
    pluginId,
    platform,
    websiteId,
    debug,
  }: CreateAnalyticsInstanceOptions) {
    super({ pluginId, platform, websiteId, debug })
    this.debug = debug
  }

  /**
   * Load the platform's JS-SDK file
   */
  @debug((ins) => `Analytics JS-SDK load done.\nwebsiteId:    ${ins.websiteId}`)
  async init() {
    if (!this.platformInstance || !this.sdkUrl) return

    try {
      await loadRes({
        type: 'js',
        id: `${this.pluginId}-${this.platform}-${this.websiteId}`,
        resource: this.sdkUrl,
      })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Provide multi-account switching for upper-level plugins
   */
  @debug('Hello setAccount')
  setAccount() {
    if (!this.platformInstance) return
    this.platformInstance.push(['_setAccount', this.websiteId])
  }

  @debug('Hello trackPageview')
  trackPageview() {}

  @debug('Hello trackEvent')
  trackEvent() {}
}
