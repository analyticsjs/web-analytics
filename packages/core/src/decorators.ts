import { BaseAnalytics } from './base'
import { getDebugMessage } from './utils'

/**
 * Print the debug message on the console when debug mode is enabled
 */
export function debug(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value

  descriptor.value = function (...args: any[]) {
    const {
      debug: debugging,
      pluginId,
      platform,
      websiteId,
    } = this as BaseAnalytics

    if (debugging) {
      const message = getDebugMessage({
        pluginId,
        platform,
        websiteId,
        propertyKey,
        args,
      })
      console.log(message)
    }

    original.apply(this, args)
  }

  return descriptor
}

/**
 * Intercept invalid method arguments
 */
export function interceptor(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value

  descriptor.value = function (...args: any[]) {
    const [options] = args
    const { category, action } = options

    if (
      typeof category !== 'string' ||
      typeof action !== 'string' ||
      !category ||
      !action
    ) {
      ;(this as BaseAnalytics).throwError(
        'Valid `category` and `action` are missing from the track event options.'
      )
      return
    }

    original.apply(this, args)
  }

  return descriptor
}
