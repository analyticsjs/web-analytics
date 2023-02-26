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
    const { debug: debugging, pluginId, platform, websiteId } = this as any
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
