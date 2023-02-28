import { loadRes } from '@bassist/utils'
import { BaseAnalytics } from './base'
import { debug } from './decorators'
import { formatPageUrl } from './utils'
import { SDK_ACTIONS } from './constants'
import type { CreateAnalyticsInstanceOptions, TrackEventOptions } from './types'

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
    if (!this.sdkInstance || !this.sdkUrl) return

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
  setAccount() {
    if (!this.sdkInstance) return
    this.sdkInstance.push([SDK_ACTIONS.setAccount, this.websiteId])
  }

  /**
   * Track pageview and report to the statistics platform
   */
  @debug
  trackPageview(pageUrl: string) {
    if (!this.sdkInstance) return
    this.setAccount()
    this.sdkInstance.push([SDK_ACTIONS.trackPageview, formatPageUrl(pageUrl)])
  }

  /**
   * Track event and report to the statistics platform
   */
  @debug
  trackEvent({ category, action, label, value }: TrackEventOptions) {
    if (!this.sdkInstance) return

    if (
      typeof category !== 'string' ||
      typeof action !== 'string' ||
      !category ||
      !action
    ) {
      this.throwError(
        `Missing necessary category and operation information, and must be of type string.`
      )
      return
    }

    if (!label || typeof label !== 'string') {
      label = ''
    }

    if (!Number(value)) {
      value = 1
    }

    this.setAccount()
    this.sdkInstance.push([
      SDK_ACTIONS.trackEvent,
      category,
      action,
      label,
      value,
    ])
  }
}
