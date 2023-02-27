import { loadRes } from '@bassist/utils'
import { BaseAnalytics } from './base'
import { debug } from './decorators'
import { formatPageUrl } from './utils'
import { SDK_ACTIONS } from './constants'
import type { CreateAnalyticsInstanceOptions } from './types'

export class Analytics extends BaseAnalytics {
  constructor({
    pluginId,
    platform,
    websiteId,
    debug,
  }: CreateAnalyticsInstanceOptions) {
    super({ pluginId, platform, websiteId, debug })
  }

  /**
   * Load the platform's JS-SDK file
   */
  @debug
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
  @debug
  setAccount() {
    if (!this.platformInstance) return
    this.platformInstance.push([SDK_ACTIONS.setAccount, this.websiteId])
  }

  /**
   * Track pageviews and report to the statistics platform
   */
  @debug
  trackPageview(pageUrl: string) {
    if (!this.platformInstance) return
    this.setAccount()
    this.platformInstance.push([
      SDK_ACTIONS.trackPageview,
      formatPageUrl(pageUrl),
    ])
  }

  @debug
  trackEvent() {}
}
