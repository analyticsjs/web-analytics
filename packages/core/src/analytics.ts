import { BaseAnalytics } from './base'
import { debug, interceptor } from './decorators'
import {
  formatPageUrl,
  formatFromUrl,
  formatLabel,
  formatValue,
  formatNodeId,
} from './utils'
import { SdkActions } from './constants'
import type {
  AnalyticsConstructorOptions,
  TrackPageviewOptions,
  TrackEventOptions,
  Platform,
} from './types'

export class Analytics<P extends Platform = Platform> extends BaseAnalytics {
  constructor({
    pluginId,
    platform,
    websiteId,
    debug,
  }: AnalyticsConstructorOptions) {
    super({ pluginId, platform, websiteId, debug })
  }

  /**
   * Provide multi-account switching for upper-level plugins
   */
  setAccount() {
    if (!this.sdkInstance) return
    this.sdkInstance.push([SdkActions.SetAccount, this.websiteId])
  }

  /**
   * Track pageview and report to the analytics platform
   */
  @debug
  trackPageview({
    pageUrl,
    // @ts-ignore
    fromUrl,
  }: TrackPageviewOptions<P>) {
    if (!this.sdkInstance) return

    this.setAccount()

    switch (this.platform) {
      case 'baidu': {
        this.sdkInstance.push([
          SdkActions.TrackPageview,
          formatPageUrl(pageUrl),
        ])
        break
      }

      case 'cnzz': {
        this.sdkInstance.push([
          SdkActions.TrackPageview,
          formatPageUrl(pageUrl),
          fromUrl ? formatFromUrl(fromUrl) : '',
        ])
        break
      }
    }
  }

  /**
   * Track event and report to the analytics platform
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
  }: TrackEventOptions<P>) {
    if (!this.sdkInstance) return

    this.setAccount()

    switch (this.platform) {
      case 'baidu': {
        this.sdkInstance.push([
          SdkActions.TrackEvent,
          category,
          action,
          formatLabel(label),
          formatValue(value),
        ])
        break
      }

      case 'cnzz': {
        this.sdkInstance.push([
          SdkActions.TrackEvent,
          category,
          action,
          formatLabel(label),
          formatValue(value),
          formatNodeId(nodeId),
        ])
        break
      }
    }
  }
}
