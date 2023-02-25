import { describe, it } from 'vitest'
import { Analytics } from '..'

describe('core', () => {
  it('Analytics.init()', () => {
    const analytics = new Analytics({
      platform: 'baidu',
      websiteId: 'hello',
      debug: true,
    })
    console.log(analytics)
  })
})
