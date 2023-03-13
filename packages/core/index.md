# @web-analytics/core

Website pageviews analytics tool for framework-free and multi-analytics-platform support.

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

// Load the platform's JS-SDK file
analytics.init()
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

Use named imports to import `Analytics` from `@web-analytics/core` into your file, and use the `new` operator to initialize it.

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

### init()

### setAccount()

### trackPageview()

### trackEvent()
