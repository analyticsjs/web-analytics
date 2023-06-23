import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
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

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
