export const DEFAULT_PLUGIN_ID = 'web-analytics-core'

export const SUPPORTED_ANALYTICS_PLATFORMS = <const>[
  /**
   * Baidu analysis platform
   * @see https://tongji.baidu.com
   */
  'baidu',

  /**
   * U-Web(CNZZ) analysis platform
   * @see https://www.umeng.com/web
   */
  'cnzz',
]

export enum SDK_ACTIONS {
  setAccount = '_setAccount',
  trackPageview = '_trackPageview',
  trackEvent = '_trackEvent',
}
