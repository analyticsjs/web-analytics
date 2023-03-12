# @web-analytics/core

Website pageviews analytics tool for framework-free and multi-analytics-platform support.

## Installation

Installed into `dependencies` of package.json in the project.

:::code-group

```bash [npm]
npm i @web-analytics/core
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

export const analytics = new Analytics({
  platform: 'baidu',
  websiteId: 'this_is_an_example_id',
})
```

In the business file, import the instance and call the method on the instance.

```ts
// @/foo.ts
import { analytics } from '@/utils'

analytics.trackPageview()
```

## Initialization
