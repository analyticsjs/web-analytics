import { inBrowser } from 'vitepress'

export const siteIds = [
  '8dca8e2532df48ea7f1b15c714588691', // Main site
  'd7811a1304f64c0ce3340662babcf04f', // This site
]

export function registerAnalytics(siteId: string) {
  if (!inBrowser) return
  if (document.querySelector(`#analytics-plugin-${siteId}`)) return
  window._hmt = window._hmt ? window._hmt : []
  const script = document.createElement('script')
  script.id = `analytics-${siteId}`
  script.async = true
  script.src = `https://hm.baidu.com/hm.js?${siteId}`
  document.querySelector('head')?.appendChild(script)
}

export function trackPageview(siteId: string, pageUrl: string) {
  if (!inBrowser) return
  if (!pageUrl || typeof pageUrl !== 'string') {
    pageUrl = '/'
  }

  if (pageUrl.startsWith('http')) {
    const urlFragment = pageUrl.split('/')
    const origin = `${urlFragment[0]}//${urlFragment[2]}`
    pageUrl = pageUrl.replace(origin, '')
  }

  window._hmt.push(['_setAccount', siteId])
  window._hmt.push(['_trackPageview', pageUrl])
}