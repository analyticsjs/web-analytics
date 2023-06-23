import type {
  AnalyticsConstructorOptions,
  Platform,
  WebsiteId,
} from '@web-analytics/core'
import type { VueAnalytics } from './analytics'

export interface VueInstance {
  version: string
  [key: string]: any
}

interface NavigationHookAfter {
  (to: any, from: any, failure?: any): any
}

export interface VueRouter {
  afterEach(guard: NavigationHookAfter): () => void
  [key: string]: any
}

export interface VueAnalyticsConstructorOptions
  extends Omit<AnalyticsConstructorOptions, 'pluginId' | 'websiteId'> {
  /**
   * This is an array that supports multiple analytics platform IDs
   */
  websiteIds: WebsiteId[]
}

export interface CreateVueAnalyticsInstanceOptions
  extends Omit<VueAnalyticsConstructorOptions, 'platform'> {
  /**
   * Instance of Vue Router,
   * after passing this option, when the route changes,
   * the plugin will automatically track the pageview
   */
  router?: VueRouter
}

export interface InstallerProviderOptions<P extends Platform> {
  platform: Platform
  analytics: VueAnalytics<P>
}
