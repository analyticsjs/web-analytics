import { SUPPORTED_ANALYTICS_PLATFORMS, SDK_ACTIONS } from './constants'

export type Platform = (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface AnalyticsConstructorOptions {
  /**
   * Provides a replacement for the plugin ID for upper-level plugins
   */
  pluginId?: string

  /**
   * The data will be submitted to the current platform
   */
  platform: Platform

  /**
   * The website id from analytics platform
   */
  websiteId: WebsiteId

  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}

export interface CreateAnalyticsInstanceOptions
  extends Omit<AnalyticsConstructorOptions, 'platform'> {}

export type WebsiteId = string

export type PageUrl = string

export type FromUrl = string

export type EventCategory = string

export type EventAction = string

export type EventLabel = string

export type EventValue = number

export type EventNodeId = string

export type BaiduSdkAction =
  | [SDK_ACTIONS.setAccount, WebsiteId]
  | [SDK_ACTIONS.trackPageview, PageUrl]
  | [SDK_ACTIONS.trackEvent, EventCategory, EventAction, EventLabel, EventValue]

export type CnzzSdkAction =
  | [SDK_ACTIONS.setAccount, WebsiteId]
  | [SDK_ACTIONS.trackPageview, PageUrl, FromUrl]
  | [
      SDK_ACTIONS.trackEvent,
      EventCategory,
      EventAction,
      EventLabel,
      EventValue,
      EventNodeId
    ]

export type SdkAction<P extends Platform> = P extends 'cnzz'
  ? CnzzSdkAction
  : BaiduSdkAction

export interface SdkInstance {
  push: <P extends Platform>(opt: SdkAction<P>) => void
}

export interface BaiduTrackPageviewOptions {
  /**
   * The URL of the currently visited page
   *
   * @default '/'
   */
  pageUrl: PageUrl
}

export interface CnzzTrackPageviewOptions extends BaiduTrackPageviewOptions {
  /**
   * The URL of the previous visited page
   *
   * @default '/'
   */
  fromUrl?: FromUrl
}

export type TrackPageviewOptions<P extends Platform> = P extends 'cnzz'
  ? CnzzTrackPageviewOptions
  : BaiduTrackPageviewOptions

export interface BaiduTrackEventOptions {
  /**
   * The name of the location where the event was triggered
   *
   * @example `homepage banner`
   */
  category: EventCategory

  /**
   * The description of the behavior that triggered the event
   *
   * @example `click`
   */
  action: EventAction

  /**
   * The name of the label that triggered the event,
   * which can be used to record the event sub-id.
   *
   * @example `banner_id_123`
   *
   * @default ''
   */
  label?: EventLabel

  /**
   * The score of the event
   *
   * @default 0
   */
  value?: EventValue
}

export interface CnzzTrackEventOptions extends BaiduTrackEventOptions {
  /**
   * The id of the element that triggered the event
   *
   * @default ''
   */
  nodeId?: EventNodeId
}

export type TrackEventOptions<P extends Platform> = P extends 'cnzz'
  ? CnzzTrackEventOptions
  : BaiduTrackEventOptions
