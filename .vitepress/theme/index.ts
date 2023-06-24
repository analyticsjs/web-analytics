import { inBrowser } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import { createVitePressBaiduAnalytics } from '../../packages/vue'
import { redirect } from './plugins/redirect'
import './styles/global.css'
import type { Theme } from 'vitepress'

const { baiduAnalytics, registerBaiduAnalytics } =
  createVitePressBaiduAnalytics()

const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ app, router }) {
    if (inBrowser) {
      redirect()

      registerBaiduAnalytics(app, {
        websiteIds: [
          '8dca8e2532df48ea7f1b15c714588691', // Main site
          'ae70e8f142fc9722f09c0076ce5cd1db', // This site
        ],
      })

      window.addEventListener('hashchange', () => {
        baiduAnalytics.trackPageview({
          pageUrl: window.location.href,
        })
      })

      router.onAfterRouteChanged = (to) => {
        baiduAnalytics.trackPageview({
          pageUrl: to,
        })
      }
    }
  },
}

export default theme
