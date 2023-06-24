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

This package supports common Vue projects as much as possible:

- For regular Vue projects (using Vue Router), check out the documentation for [Regular Projects](#regular-projects)
- For VitePress, due to the built-in special Router, there is a targeted API, please check the documentation of [VitePress Projects](#vitepress-projects)

### Regular Projects

The plugin provides a method for creating an instance for each platform, and only needs to pass in the necessary options to complete the initialization work.

#### Type Declarations

- Type Declaration of methods:

:::code-group

```ts [Baidu Analytics]
export declare function createVueBaiduAnalytics(): {
  /**
   * The instance of cnzz analytics platform,
   * It will be initialized when `registerBaiduAnalytics` starts working
   */
  baiduAnalytics: VueAnalytics<'baidu'>

  /**
   * It Will be registered as a Vue plugin,
   * And initialize the `baiduAnalytics` instance,
   * You must used in the entry file (e.g. `main.ts` )
   */
  registerBaiduAnalytics: {
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
   * It will be initialized when `registerCnzzAnalytics` starts working
   */
  cnzzAnalytics: VueAnalytics<'cnzz'>

  /**
   * It Will be registered as a Vue plugin,
   * And initialize the `cnzzAnalytics` instance,
   * You must used in the entry file (e.g. `main.ts` )
   */
  registerCnzzAnalytics: {
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

#### Usage

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
  // You need to register through `registerBaiduAnalytics`
  // Make it do the initialization
  baiduAnalytics,

  // Used in the entry file (e.g. `main.ts` ),
  // Will be registered as a Vue plugin and enabled
  registerBaiduAnalytics,
} = createVueBaiduAnalytics()

// Export them both
export { baiduAnalytics, registerBaiduAnalytics }
```

```ts [CNZZ Analytics]
// @/libs/analytics.ts
import { createVueCnzzAnalytics } from '@web-analytics/vue'

// The Create function returns an instance variable,
// And a method of installation for plugin
const {
  // The instance of cnzz analytics platform,
  // At this time it does not work properly,
  // You need to register through `registerCnzzAnalytics`
  // Make it do the initialization
  cnzzAnalytics,

  // Used in the entry file (e.g. `main.ts` ),
  // Will be registered as a Vue plugin and enabled
  registerCnzzAnalytics,
} = createVueCnzzAnalytics()

// Export them both
export { cnzzAnalytics, registerCnzzAnalytics }
```

:::

Import the installation method in your project's entry file (e.g. `main.ts` ) and use it.

:::code-group

```ts [Baidu Analytics]
// @/main.ts
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { registerBaiduAnalytics } from '@/libs/analytics'

// Create a Vue instance like any other Vue project
const app = createApp(App)

app
  // Enable Vue routing
  .use(router)
  // Enable baidu analytics
  .use(registerBaiduAnalytics, {
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
import { registerCnzzAnalytics } from '@/libs/analytics'

// Create a Vue instance like any other Vue project
const app = createApp(App)

app
  // Enable Vue routing
  .use(router)
  // Enable cnzz analytics
  .use(registerCnzzAnalytics, {
    // If you provide a router instance,
    // You can get the ability to automatically track pageviews
    router,
    // Some options...
  })
  .mount('#app')
```

:::

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

#### Examples

These are the example projects based on the current usage notes.

- [Vue 2.x Example](https://github.com/analyticsjs/web-analytics/tree/main/examples/vue2)
- [Vue 3.x Example](https://github.com/analyticsjs/web-analytics/tree/main/examples/vue3)

### VitePress Projects

For the VitePress projects, since the program does not use Vue Router, but develops a routing system independently, its router APIs and usage are different.

- Type Declaration of VitePress Router:

```ts
// https://github.com/vuejs/vitepress/blob/main/src/client/app/router.ts
export interface Router {
  route: Route
  go: (href?: string) => Promise<void>
  onBeforeRouteChange?: (to: string) => Awaitable<void>
  onAfterRouteChanged?: (to: string) => Awaitable<void>
}
```

So for VitePress projects, this package provides separate APIs for creating analytics instances and registering methods.

#### Type Declarations

- Type Declaration of methods:

:::code-group

```ts [Baidu Analytics]
export declare function createVitePressBaiduAnalytics(): {
  baiduAnalytics: VueAnalytics<'baidu'>
  registerBaiduAnalytics: (
    app: VueInstance,
    options: CreateVitePressAnalyticsInstanceOptions
  ) => void
}
```

```ts [CNZZ Analytics]
export declare function createVitePressCnzzAnalytics(): {
  cnzzAnalytics: VueAnalytics<'cnzz'>
  registerCnzzAnalytics: (
    app: VueInstance,
    options: CreateVitePressAnalyticsInstanceOptions
  ) => void
}
```

:::

- Type Declaration of options:

```ts
export interface CreateVitePressAnalyticsInstanceOptions {
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

#### Usage

In the VitePress project, there is no public theme entry file by default, so you need to manually add the following files in the `.vitepress` directory:

```bash
root
│ # Assuming the folder is at the root
├─.vitepress
│  │ # Create a theme folder named `theme`
│  └─theme
│     │ # According to your development language,
│     │ # Create an entry file named `index.ts` or `index.js`
│     └─index.ts
│ # Assuming this is your Markdown documentation folder
├─docs
├─node_modules
└─package.json
```

Open the entry file `./.vitepress/theme/index.ts` , write the following code into the file.

:::code-group

```ts [Baidu Analytics]
// ./.vitepress/theme/index.ts
import { inBrowser } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import { createVitePressBaiduAnalytics } from '@web-analytics/vue'
import type { Theme } from 'vitepress'

// The Create function returns an instance variable,
// And a method of installation for plugin
const { baiduAnalytics, registerBaiduAnalytics } =
  createVitePressBaiduAnalytics()

// If you need to manually track pageview, you can export this instance
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
```

```ts [CNZZ Analytics]
// ./.vitepress/theme/index.ts
import { inBrowser } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import { createVitePressCnzzAnalytics } from '@web-analytics/vue'
import type { Theme } from 'vitepress'

// The Create function returns an instance variable,
// And a method of installation for plugin
const { baiduAnalytics, registerCnzzAnalytics } = createVitePressCnzzAnalytics()

// If you need to manually track pageview, you can export this instance
export { baiduAnalytics }

const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ app, router }) {
    if (inBrowser) {
      // Complete the registration first
      registerCnzzAnalytics(app, {
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
```

:::

#### Examples

These are the example projects based on the current usage notes.

- [VitePress Example](https://github.com/analyticsjs/web-analytics/tree/main/examples/vitepress)

## Methods

On the initialized instance, some APIs are provided to call.

### trackPageview

The Vue package maintains the same API as the Core package.

Please refer to [the trackPageview document of the core package](../core/index.md#trackpageview) for details.

### trackEvent

The Vue package maintains the same API as the Core package.

Please refer to [the trackEvent document of the core package](../core/index.md#trackevent) for details.
