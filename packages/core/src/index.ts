import { Analytics } from './analytics'
import type { CreateAnalyticsInstanceOptions } from './types'

export * from './types'

export { Analytics }

export function createBaiduAnalytics(options: CreateAnalyticsInstanceOptions) {
  return new Analytics<'baidu'>({
    platform: 'baidu',
    ...options,
  })
}

export function createCnzzAnalytics(options: CreateAnalyticsInstanceOptions) {
  return new Analytics<'cnzz'>({
    platform: 'cnzz',
    ...options,
  })
}
