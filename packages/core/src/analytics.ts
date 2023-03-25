import { BaseAnalytics } from './base'
import { debug, interceptor } from './decorators'
import { formatPageUrl, formatLabel, formatValue, formatNodeId } from './utils'
import { SDK_ACTIONS } from './constants'
import type {
  CreateAnalyticsInstanceOptions,
  TrackEventOptions,
  SdkAction,
  Platform,
} from './types'

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
  trackPageview(pageUrl?: string) {
    if (!this.sdkInstance) return
    this.setAccount()
    this.sdkInstance.push([SDK_ACTIONS.trackPageview, formatPageUrl(pageUrl)])
  }

  /**
   * Track event and report to the statistics platform
   */
  @debug
  @interceptor
  trackEvent({
    category,
    action,
    label,
    value,
    // @ts-ignore
    nodeId,
  }: TrackEventOptions<Platform>) {
    if (!this.sdkInstance) return

    const currentAction: SdkAction = [
      SDK_ACTIONS.trackEvent,
      category,
      action,
      formatLabel(label),
      formatValue(value),
    ]

    if (this.platform === 'cnzz') {
      currentAction.push(formatNodeId(nodeId))
    }

    this.setAccount()
    this.sdkInstance.push(currentAction)
  }
}
