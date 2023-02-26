import { pascalCase } from '@bassist/utils'
import type { SupportedAnalyticsPlatforms } from './types'

/**
 * Because the decorator cannot capture arguments of the method,
 * The Log message can only be processed through this scheme
 */
interface GetDebugMessageOptions {
  pluginId: string
  platform: SupportedAnalyticsPlatforms
  propertyKey: string
  websiteId: string
  args: any[]
}
export function getDebugMessage({
  pluginId,
  platform,
  websiteId,
  propertyKey,
  args,
}: GetDebugMessageOptions) {
  const debugLogs: string[] = []
  switch (propertyKey) {
    case 'init': {
      debugLogs.push(`JS-SDK load done.`)
      break
    }

    case 'setAccount': {
      debugLogs.push(`set account done.`)
      break
    }

    case 'trackPageview': {
      const [pageUrl] = args
      debugLogs.push(`track pageview done.`)
      debugLogs.push(`pageUrl:      ${formatPageUrl(pageUrl)}`)
      break
    }

    case 'trackEvent': {
      debugLogs.push(`track event done.`)
      break
    }
  }

  debugLogs.push(`websiteId:    ${websiteId}`)
  debugLogs.push(`time:         ${new Date()}`)

  const logMsg = debugLogs.join('\n')

  return `\n[${pluginId}] ${pascalCase(platform)} Analytics ${logMsg}\n\n`
}

/**
 * Different platforms may require different URL formats
 */
export function formatPageUrl(pageUrl: string) {
  if (!pageUrl || typeof pageUrl !== 'string') {
    pageUrl = '/'
  }

  if (pageUrl.startsWith('http')) {
    const urlFragments = pageUrl.split('/')
    const hostname = `${urlFragments[0]}//${urlFragments[2]}`
    pageUrl = pageUrl.replace(hostname, '')
  }

  return pageUrl
}
