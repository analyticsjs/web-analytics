import { SUPPORTED_ANALYTICS_PLATFORMS, SDK_ACTIONS } from './constants'

export type SupportedAnalyticsPlatforms =
  (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface CreateAnalyticsInstanceOptions {
  pluginId?: string
  platform: SupportedAnalyticsPlatforms
  websiteId: string
  debug?: boolean
}

type sdkAction =
  | [SDK_ACTIONS.setAccount, string]
  | [SDK_ACTIONS.trackPageview, string]

export interface PlatformInstance {
  push: (opt: sdkAction) => void
}
