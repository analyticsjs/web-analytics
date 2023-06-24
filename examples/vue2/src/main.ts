import Vue from 'vue'
import 'shared/style.css'
import App from './App.vue'
import { router } from './router'
import { registerBaiduAnalytics } from './analytics'

Vue.use(registerBaiduAnalytics, {
  router,
  websiteIds: ['you_website_id_1', 'you_website_id_2'],
  debug: true,
})

new Vue({
  // @ts-ignore
  router,
  render: (h) => h(App),
}).$mount('#app')
