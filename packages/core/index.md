# @web-analytics/core

Website pageviews analytics tool for framework-free and multi-analytics-platform support.

:::tip
This is a common package that can be used in any web project, without framework restrictions.
:::

## Installation

Installed into `dependencies` of package.json in the project.

:::code-group

```bash [npm]
npm install @web-analytics/core
```

```bash [yarn]
yarn add @web-analytics/core
```

```bash [pnpm]
pnpm add @web-analytics/core
```

:::

## Usage

It is recommended to initialize in public tool files such as utils and export the initialized instance.

```ts
// @/utils.ts
import { Analytics } from '@web-analytics/core'

// Perform initialization and export the instance
export const analytics = new Analytics({
  platform: 'example_platform',
  websiteId: 'example_website_id',
})

// Load the JS-SDK file of the analytics platform
analytics.loadSdk()
```

In other files, import the instance and call the method on the instance.

```ts
// @/foo.ts
import { analytics } from '@/utils'

const url = window.location.href
analytics.trackPageview(url)
```

For more detailed instructions, continue reading the documentation.

## Initialization

Import `Analytics` from `@web-analytics/core` with named imports into your file, and initialize it with the `new` operator.

During initialization, some options need to be passed in, see the type declarations below.

```ts
import { Analytics } from '@web-analytics/core'

const analytics = new Analytics(options)
```

- Type Declarations:

```ts
interface CreateAnalyticsInstanceOptions {
  /**
   * Provides a replacement for the plugin ID for upper-level plugins
   */
  pluginId?: string

  /**
   * The data will be submitted to the current platform
   */
  platform: SupportedAnalyticsPlatforms

  /**
   * The website id from analytics platform
   */
  websiteId: WebsiteId

  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}
```

## Methods

On the initialized instance, some APIs are provided to call.

### loadSdk

Load the JS-SDK file of the analytics platform.

This method will automatically load the JS-SDK file of the analytics platform according to the `platform` option passed in `new Analytics(options)` (Reference: [Initialization](#initialization) ).

:::tip
Before starting to track data, you must call this method to load JS-SDK, otherwise the data cannot be reported.
:::

- Type Declarations:

```ts
declare function loadSdk(): Promise<void>
```

- Example:

```ts
analytics.loadSdk()
```

### setAccount

### trackPageview

### trackEvent
