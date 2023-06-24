# @web-analytics/vue

Website pageview analytics tool for [Vue.js](https://vuejs.org) (Including [VuePress](https://vuepress.vuejs.org) , [VitePress](https://vitepress.dev) etc.) and multi-analytics-platform support.

With [Vue Router](https://router.vuejs.org) , It helps you quickly collect pageviews on your website, including single-page web applications.

:::tip
This is a Vue.js-specific package that can only be used in Vue.js-based web projects (supports Vue 2 and Vue 3).
:::

## Installation

Installed into `dependencies` of package.json in the project.

:::code-group

```bash [npm]
npm install @web-analytics/vue
```

```bash [yarn]
yarn add @web-analytics/vue
```

```bash [pnpm]
pnpm add @web-analytics/vue
```

:::

## Usage

It is recommended to initialize in public tool files such as utils and export the initialized instance.

:::code-group

```ts [Baidu Analytics]
// @/libs/analytics.ts
import { createVueBaiduAnalytics } from '@web-analytics/vue'

// The Create function returns an instance variable,
// And a method of installation for plugin
const {
  // The instance of baidu analytics platform,
  // At this time it does not work properly,
  // You need to register through `installVueBaiduAnalytics`
  // Make it do the initialization
  baiduAnalytics,

  // Used in the entry file (e.g. `main.ts` ),
  // Will be registered as a Vue plugin and enabled
  installVueBaiduAnalytics,
} = createVueBaiduAnalytics()

// Export them both
export { baiduAnalytics, installVueBaiduAnalytics }
```

```ts [CNZZ Analytics]
// @/libs/analytics.ts
import { createVueCnzzAnalytics } from '@web-analytics/vue'

// The Create function returns an instance variable,
// And a method of installation for plugin
const {
  // The instance of cnzz analytics platform,
  // At this time it does not work properly,
  // You need to register through `installVueCnzzAnalytics`
  // Make it do the initialization
  cnzzAnalytics,

  // Used in the entry file (e.g. `main.ts` ),
  // Will be registered as a Vue plugin and enabled
  installVueCnzzAnalytics,
} = createVueCnzzAnalytics()

// Export them both
export { cnzzAnalytics, installVueCnzzAnalytics }
```

:::

Import the installation method in your project's entry file (e.g. `main.ts` ) and use it.

:::code-group

```ts [Baidu Analytics]
// @/main.ts
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { installVueBaiduAnalytics } from '@/libs/analytics'

// Create a Vue instance like any other Vue project
const app = createApp(App)

app
  // Enable Vue routing
  .use(router)
  // Enable baidu analytics
  .use(installVueBaiduAnalytics, {
    // If you provide a router instance,
    // You can get the ability to automatically track pageviews
    router,
    // Some options...
  })
  .mount('#app')
```

```ts [CNZZ Analytics]
// @/main.ts
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { installVueCnzzAnalytics } from '@/libs/analytics'

// Create a Vue instance like any other Vue project
const app = createApp(App)

app
  // Enable Vue routing
  .use(router)
  // Enable cnzz analytics
  .use(installVueCnzzAnalytics, {
    // If you provide a router instance,
    // You can get the ability to automatically track pageviews
    router,
    // Some options...
  })
  .mount('#app')
```

:::

For more plugin options of `installVueBaiduAnalytics` , please refer to [the initialization section](#initialization) .

If you provide a router instance, You can get the ability to automatically track pageviews. So in most cases you don't need to actively call its method.

If it is really necessary, it can be called like this.

In other files, import the instance and call the method on the instance.

:::code-group

```ts [Baidu Analytics]
// @/foo.ts
import { baiduAnalytics } from '@/libs/analytics'

// For more methods, please see the documentation below
baiduAnalytics.trackPageview({
  // Some options...
})
```

```ts [CNZZ Analytics]
// @/foo.ts
import { cnzzAnalytics } from '@/libs/analytics'

// For more methods, please see the documentation below
cnzzAnalytics.trackPageview({
  // Some options...
})
```

:::

For more detailed instructions, continue reading the documentation.

## Platforms

The following analytics platforms are currently supported.

- Type Declarations:

```ts
type Platform =
  /**
   * Baidu analysis platform
   * @website https://tongji.baidu.com
   * @docs https://tongji.baidu.com/open/api
   */
  | 'baidu'

  /**
   * U-Web(CNZZ) analysis platform
   * @website https://www.umeng.com/web
   * @docs https://developer.umeng.com/docs/67963/detail/74517
   */
  | 'cnzz'
```

:::tip
Because the developer of the plugin lives in mainland China, so the current priority is to support the two major analytics platforms in China.
:::

## Initialization

The plugin provides a method for creating an instance for each platform, and only needs to pass in the necessary options to complete the initialization work.

- Type Declaration of methods:

:::code-group

```ts [Baidu Analytics]
export declare function createVueBaiduAnalytics(): {
  /**
   * The instance of cnzz analytics platform,
   * It will be initialized when `installVueBaiduAnalytics` starts working
   */
  baiduAnalytics: VueAnalytics<'baidu'>

  /**
   * It Will be registered as a Vue plugin,
   * And initialize the `baiduAnalytics` instance,
   * You must used in the entry file (e.g. `main.ts` )
   */
  installVueBaiduAnalytics: {
    install: (
      app: VueInstance,
      { router, ...others }: CreateVueAnalyticsInstanceOptions
    ) => void
  }
}
```

```ts [CNZZ Analytics]
export declare function createVueCnzzAnalytics(): {
  /**
   * The instance of cnzz analytics platform,
   * It will be initialized when `installVueCnzzAnalytics` starts working
   */
  cnzzAnalytics: VueAnalytics<'cnzz'>

  /**
   * It Will be registered as a Vue plugin,
   * And initialize the `cnzzAnalytics` instance,
   * You must used in the entry file (e.g. `main.ts` )
   */
  installVueCnzzAnalytics: {
    install: (
      app: VueInstance,
      { router, ...others }: CreateVueAnalyticsInstanceOptions
    ) => void
  }
}
```

:::

- Type Declaration of options:

```ts
export interface CreateVueAnalyticsInstanceOptions {
  /**
   * Instance of Vue Router,
   * after passing this option, when the route changes,
   * the plugin will automatically track the pageview
   */
  router?: VueRouter

  /**
   * This is an array that supports multiple analytics platform IDs
   */
  websiteIds: WebsiteId[]

  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}
```

The JS-SDK file of the analytics platform will be loaded during initialization.

## Methods

On the initialized instance, some APIs are provided to call.

### trackPageview

The Vue package maintains the same API as the Core package.

Please refer to [the trackPageview document of the core package](../core/index.md#trackpageview) for details.

### trackEvent

The Vue package maintains the same API as the Core package.

Please refer to [the trackEvent document of the core package](../core/index.md#trackevent) for details.
