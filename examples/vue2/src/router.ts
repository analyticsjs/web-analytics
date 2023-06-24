import Vue from 'vue'
import VueRouter from 'vue-router'
import type { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/view-1',
  },
  {
    path: '/view-1',
    name: 'view-1',
    component: () => import('./view.vue'),
  },
  {
    path: '/view-2',
    name: 'view-2',
    component: () => import('./view.vue'),
  },
  {
    path: '/view-3',
    name: 'view-3',
    component: () => import('./view.vue'),
  },
]

export const router = new VueRouter({
  base: import.meta.env.BASE_URL,
  mode: 'history',
  routes,
})
