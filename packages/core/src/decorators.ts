/**
 * Accept a factory function and return a string
 * that can use the template string to splice the data on the instance
 *
 * @param instance - The instance of `class`
 *
 * @example
 *  ```ts
 *  class MyClass {
 *    username: string
 *
 *    constructor(name: string) {
 *      this.username = name
 *    }
 *
 *    // Use the debug decorator here
 *    @debug((ins) => `My name is ${ins.username}`)
 *    myMethod () {
 *      // Do something...
 *    }
 *  }
 *  ```
 */
// eslint-disable-next-line no-unused-vars
type MessageFactory = (instance: any) => string

/**
 * Output debug log when debug mode is enabled
 * @param message - Log information printed when used for debugging
 */
export function debug(message: MessageFactory | string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value

    descriptor.value = function (...args: any[]) {
      if ((this as any).debug) {
        const msg = typeof message === 'function' ? message(this) : message
        console.log(`[${(this as any).pluginId}] ${msg}`)
      }

      original.apply(this, args)
    }

    return descriptor
  }
}
