import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { siteIds, registerAnalytics, trackPageview } from './plugins/analytics'
import { redirect } from './plugins/redirect'
import './styles/global.css'
import type { Theme } from 'vitepress'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ router }) {
    if (inBrowser) {
      redirect()

      siteIds.forEach((id) => registerAnalytics(id))

      window.addEventListener('hashchange', () => {
        const { href: url } = window.location
        siteIds.forEach((id) => trackPageview(id, url))
      })

      router.onAfterRouteChanged = (to) => {
        siteIds.forEach((id) => trackPageview(id, to))
      }
    }
  },
}

export default theme
