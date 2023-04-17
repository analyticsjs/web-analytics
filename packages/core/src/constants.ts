export const DEFAULT_PLUGIN_ID = 'web-analytics-core'

export const SUPPORTED_ANALYTICS_PLATFORMS = <const>[
  /**
   * Baidu analysis platform
   * @website https://tongji.baidu.com
   * @docs https://tongji.baidu.com/open/api
   */
  'baidu',

  /**
   * U-Web(CNZZ) analysis platform
   * @website https://www.umeng.com/web
   * @docs https://developer.umeng.com/docs/67963/detail/74517
   */
  'cnzz',
]

export enum SDK_ACTIONS {
  setAccount = '_setAccount',
  trackPageview = '_trackPageview',
  trackEvent = '_trackEvent',
}
