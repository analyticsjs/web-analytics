# @web-analytics/core

:::warning
Developing
:::

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

:::code-group

```ts [Baidu Analytics]
// @/libs/analytics.ts
import { createBaiduAnalytics } from '@web-analytics/core'

// Create and export the instance of baidu analytics platform
export const baiduAnalytics = createBaiduAnalytics({
  websiteId: 'your_website_id',
  debug: true,
})
```

```ts [CNZZ Analytics]
// @/libs/analytics.ts
import { createCnzzAnalytics } from '@web-analytics/core'

// Create and export the instance of cnzz analytics platform
export const cnzzAnalytics = createCnzzAnalytics({
  websiteId: 'your_website_id',
  debug: true,
})
```

:::

In other files, import the instance and call the method on the instance.

:::code-group

```ts [Baidu Analytics]
// @/foo.ts
import { baiduAnalytics } from '@/libs/analytics'

// For more methods, please see the documentation below
const url = window.location.href
baiduAnalytics.trackPageview(url)
```

```ts [CNZZ Analytics]
// @/foo.ts
import { cnzzAnalytics } from '@/libs/analytics'

// For more methods, please see the documentation below
const url = window.location.href
cnzzAnalytics.trackPageview(url)
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
declare function createBaiduAnalytics(
  options: CreateAnalyticsInstanceOptions
): Analytics<'baidu'>
```

```ts [CNZZ Analytics]
declare function createCnzzAnalytics(
  options: CreateAnalyticsInstanceOptions
): Analytics<'cnzz'>
```

:::

- Type Declaration of options:

```ts
interface CreateAnalyticsInstanceOptions {
  /**
   * Provides a replacement for the plugin ID for upper-level plugins
   */
  pluginId?: string

  /**
   * The website id from analytics platform
   */
  websiteId: string

  /**
   * Whether to enable debug mode
   */
  debug?: boolean
}
```

The JS-SDK file of the analytics platform will be loaded during initialization.

## Methods

On the initialized instance, some APIs are provided to call.

### setAccount

Provide multi-account switching for upper-level plugins.

:::tip
When calling other methods, this method will be called first to activate the website ID corresponding to the instance to ensure the correctness of data submission, so you usually don‘t need to call this method.
:::

- Type Declarations:

```ts
declare class Analytics<P extends Platform> extends BaseAnalytics<P> {
  // ...

  /**
   * Provide multi-account switching for upper-level plugins
   */
  setAccount(): void

  // ...
}
```

- Example:

```ts
analytics.setAccount()
```

### trackPageview

Track pageview and report to the analytics platform.

- Type Declarations:

```ts
declare class Analytics<P extends Platform> extends BaseAnalytics<P> {
  // ...

  /**
   * Track pageview and report to the analytics platform
   */
  trackPageview(pageUrl?: string): void

  // ...
}
```

- Example:

```ts
const url = window.location.href
analytics.trackPageview(url)
```

### trackEvent

Track event and report to the analytics platform.

- Type Declarations:

```ts
declare class Analytics<P extends Platform> extends BaseAnalytics<P> {
  // ...

  trackEvent({
    category,
    action,
    label,
    value,
    nodeId,
  }: TrackEventOptions<P>): void

  // ...
}

type TrackEventOptions<P extends Platform> = P extends 'cnzz'
  ? CnzzTrackEventOptions
  : BaiduTrackEventOptions

interface BaseTrackEventOptions {
  /**
   * The name of the location where the event was triggered
   *
   * @example `homepage banner`
   */
  category: EventCategory

  /**
   * The description of the behavior that triggered the event
   *
   * @example `click`
   */
  action: EventAction

  /**
   * The name of the label that triggered the event,
   * which can be used to record the event sub-id.
   *
   * @example `banner_id_123`
   *
   * @default ''
   */
  label?: EventLabel

  /**
   * The score of the event
   *
   * @default 0
   */
  value?: EventValue
}

type BaiduTrackEventOptions = BaseTrackEventOptions

interface CnzzTrackEventOptions extends BaseTrackEventOptions {
  /**
   * The id of the element that triggered the event
   *
   * @default ''
   */
  nodeId?: EventNodeId
}

type EventCategory = string
type EventAction = string
type EventLabel = string
type EventValue = number
type EventNodeId = string
```

- Example:

```ts
analytics.trackEvent({
  category: 'homepage banner',
  action: 'click',
  label: 'banner_id_123',
  value: 0,
})
```
