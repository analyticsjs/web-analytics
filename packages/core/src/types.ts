import { SUPPORTED_ANALYTICS_PLATFORMS } from './constants'

export type SupportedAnalyticsPlatforms =
  (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface CreateAnalyticsInstanceOptions {
  pluginName?: string
  platform: SupportedAnalyticsPlatforms
  debug: boolean
  websiteId: string
}

export interface PlatformInstance {
  // eslint-disable-next-line no-unused-vars
  push: (opt: ['_setAccount', string]) => void
}
