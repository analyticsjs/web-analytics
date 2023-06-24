import { inBrowser } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import { createVitePressBaiduAnalytics } from '@web-analytics/vue'
import type { Theme } from 'vitepress'

const { baiduAnalytics, registerBaiduAnalytics } =
  createVitePressBaiduAnalytics()

export { baiduAnalytics }

const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ app, router }) {
    if (inBrowser) {
      // Complete the registration first
      registerBaiduAnalytics(app, {
        websiteIds: ['you_website_id_1', 'you_website_id_2'],
        debug: true,
      })

      // Define the behavior of the `onAfterRouteChanged` hook
      router.onAfterRouteChanged = (to) => {
        baiduAnalytics.trackPageview({
          pageUrl: to,
        })
      }
    }
  },
}

export default theme
