---
layout: home
---

<div class="home">
  <a href="https://analytics.js.org/vue/" target="_blank">
    <img :src="logo" class="logo" alt="Web Analytics Logo" />
  </a>
  <h1>Vue3 Example</h1>
  <p class="read-the-docs">Press `F12` and see the debug log</p>
  <div class="card">
    <button id="tp" type="button" @click="trackPageview">
      Track Pageview
    </button>
    <button id="te" type="button" @click="trackEvent">Track Event</button>
  </div>
</div>

<script setup lang="ts">
import { capitalize } from '@bassist/utils'
import { baiduAnalytics } from '../.vitepress/theme'
import logo from 'shared/logo.svg'

function trackPageview() {
  baiduAnalytics.trackPageview({
    pageUrl: window.location.href,
  })
}

function trackEvent() {
  baiduAnalytics.trackEvent({
    category: 'button',
    action: 'click',
    label: 'Track Event Button',
    value: 1,
  })
}
</script>

<style scoped>
@import 'shared/style.css';

.home {
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-size: 19px;
  text-align: center;
}

.logo {
  margin: 0 auto;
}
</style>
