import { describe, it } from 'vitest'
import { Analytics } from '..'

describe('core', () => {
  it('Analytics.init()', () => {
    const analytics = new Analytics({
      pluginName: 'test-analytics',
      platform: 'baidu',
      websiteId: '123456789',
      debug: true,
    })
    console.log(analytics)
  })
})
