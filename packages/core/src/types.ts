import { SUPPORTED_ANALYTICS_PLATFORMS, SDK_ACTIONS } from './constants'

export type SupportedAnalyticsPlatforms =
  (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface CreateAnalyticsInstanceOptions {
  pluginId?: string
  platform: SupportedAnalyticsPlatforms
  websiteId: WebsiteId
  debug?: boolean
}

type WebsiteId = string

type PageUrl = string

type EventCategory = string

type EventAction = string

type EventLabel = string

type EventValue = number

type EventNodeId = string

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
  label: EventLabel
  value: EventValue
  nodeId?: EventNodeId
}
