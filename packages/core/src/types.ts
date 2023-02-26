import { SUPPORTED_ANALYTICS_PLATFORMS } from './constants'

export type SupportedAnalyticsPlatforms =
  (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface CreateAnalyticsInstanceOptions {
  pluginId?: string
  platform: SupportedAnalyticsPlatforms
  websiteId: string
  debug?: boolean
}

type sdkAction = ['_setAccount', string] | ['_trackPageview', string]

export interface PlatformInstance {
  // eslint-disable-next-line no-unused-vars
  push: (opt: sdkAction) => void
}
