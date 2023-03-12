<p align='center'>
  <img width="300" src="../public/logo.svg" alt="@web-analytics/core" />
</p>

# @web-analytics/core

Website pageviews analytics tool for framework-free and multi-analytics-platform support.

## Usage

With npm(or yarn, or pnpm):

```bash
npm install @web-analytics/core
```

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

## Documentation

See: [https://analytics.js.org/core/](https://analytics.js.org/core/)

## Release Notes

Please refer to [CHANGELOG](https://github.com/analyticsjs/web-analytics/blob/main/packages/core/CHANGELOG.md) for details.

## License

MIT License © 2023 [chengpeiquan](https://github.com/chengpeiquan)
