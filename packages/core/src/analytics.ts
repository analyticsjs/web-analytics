import { loadRes } from '@bassist/utils'
import { BaseAnalytics } from './base'
import type { CreateAnalyticsInstanceOptions } from './types'

export class Analytics extends BaseAnalytics {
  constructor({
    pluginName,
    platform,
    websiteId,
    debug,
  }: CreateAnalyticsInstanceOptions) {
    super({ pluginName, platform, websiteId, debug })
  }

  /**
   * Load the platform's JS-SDK file
   */
  async init() {
    if (!this.platformInstance || !this.sdkUrl) return

    try {
      await loadRes({
        type: 'js',
        id: `${this.pluginName}-${this.platform}-${this.websiteId}`,
        resource: this.sdkUrl,
      })

      this.printLogForDebug(
        `siteId load done.\nwebsiteId:    ${this.websiteId}`
      )
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
