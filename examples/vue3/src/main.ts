import { createApp } from 'vue'
import 'shared/style.css'
import App from './App.vue'
import { router } from './router'
import { registerBaiduAnalytics } from './analytics'

const app = createApp(App)

app
  .use(router)
  .use(registerBaiduAnalytics, {
    router,
    websiteIds: ['you_website_id_1', 'you_website_id_2'],
    debug: true,
  })
  .mount('#app')
