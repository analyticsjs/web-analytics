<template>
  <div>
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

  <div class="tabs">
    <RouterLink
      class="tab"
      :class="{ cur: item.name === route.name }"
      v-for="item in routes.filter((i) => !i.redirect)"
      :key="item.name"
      :to="item.path"
    >
      {{ capitalize(String(item.name)) }}
    </RouterLink>
  </div>

  <RouterView />
</template>

<script setup lang="ts">
import { capitalize } from '@bassist/utils'
import { useRoute } from 'vue-router'
import { routes } from './router'
import { baiduAnalytics } from './analytics'
import logo from 'shared/logo.svg'

const route = useRoute()

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
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 2em auto;
}
.tab {
  display: flex;
  padding: 0.6em 1.2em;
  border-radius: 8px;
  transition: all 0.25s;
}
.tab.cur {
  background-color: #1a1a1a;
}
</style>
