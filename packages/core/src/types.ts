import { SUPPORTED_ANALYTICS_PLATFORMS, SDK_ACTIONS } from './constants'

export type SupportedAnalyticsPlatforms =
  (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface CreateAnalyticsInstanceOptions {
  /**
   * Provides a replacement for the plugin ID for upper-level plugins
   */
  pluginId?: string

  /**
   * The data will be submitted to the current platform
   */
  platform: SupportedAnalyticsPlatforms

  /**
   * The website id from analytics platform
   */
  websiteId: WebsiteId

  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}

export type WebsiteId = string

export type PageUrl = string

export type EventCategory = string

export type EventAction = string

export type EventLabel = string

export type EventValue = number

export type EventNodeId = string

export type SdkAction =
  | [SDK_ACTIONS.setAccount, WebsiteId]
  | [SDK_ACTIONS.trackPageview, PageUrl]
  | [SDK_ACTIONS.trackEvent, EventCategory, EventAction, EventLabel, EventValue]
  | [
      SDK_ACTIONS.trackEvent,
      EventCategory,
      EventAction,
      EventLabel,
      EventValue,
      EventNodeId
    ]

export interface SdkInstance {
  push: (opt: SdkAction) => void
}

export interface TrackEventOptions {
  category: EventCategory
  action: EventAction
  label?: EventLabel
  value?: EventValue
  nodeId?: EventNodeId
}
