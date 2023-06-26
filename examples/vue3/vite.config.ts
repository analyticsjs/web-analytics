import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  resolve:
    command === 'build'
      ? {}
      : {
          alias: {
            '@web-analytics/vue': resolve(__dirname, '../../packages/vue/lib'),
            '@web-analytics/shared': resolve(__dirname, '../shared'),
          },
        },
}))
