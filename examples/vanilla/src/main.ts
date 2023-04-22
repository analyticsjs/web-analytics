import 'shared/style.css'
import logo from 'shared/logo.svg'
import { createBaiduAnalytics } from '@web-analytics/core'

// Create an instance of the analytics platform
const baiduAnalytics = createBaiduAnalytics({
  websiteId: 'you_website_id',
  debug: true,
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://analytics.js.org/" target="_blank">
      <img src="${logo}" class="logo" alt="Web Analytics Logo" />
    </a>
    <h1>Vanilla Example</h1>
    <p class="read-the-docs">Press \`F12\` and see the debug log</p>
    <div class="card">
      <button id="tp" type="button">Track Pageview</button>
      <button id="te" type="button">Track Event</button>
    </div>
  </div>
`

// Click the button to track pageview
document.querySelector('#tp')?.addEventListener('click', () => {
  baiduAnalytics.trackPageview()
})

// Click the button to track event
document.querySelector('#te')?.addEventListener('click', () => {
  baiduAnalytics.trackEvent({
    category: 'button',
    action: 'click',
    label: 'Track Event Button',
    value: 1,
  })
})
