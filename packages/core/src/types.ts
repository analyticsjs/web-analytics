import { SUPPORTED_ANALYTICS_PLATFORMS } from './constants'

export type SupportedAnalyticsPlatforms =
  (typeof SUPPORTED_ANALYTICS_PLATFORMS)[number]

export interface CreateAnalyticsInstanceOptions {
  platform: SupportedAnalyticsPlatforms
  websiteId: string
  debug: boolean
}
