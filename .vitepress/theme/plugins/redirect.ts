import { inBrowser } from 'vitepress'

export const redirectMap = {
  'guide.html': 'guide/getting-started',
  'docs.html': 'docs/basic-usage',
}

export function redirect() {
  if (!inBrowser) return
  for (const key in redirectMap) {
    if (Object.prototype.hasOwnProperty.call(redirectMap, key)) {
      const { pathname } = window.location
      const isMatched = pathname.match(key)
      if (isMatched) {
        const target = redirectMap[key]
        window.location.replace(target)
      }
    }
  }
}
