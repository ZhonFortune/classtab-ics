import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将所有的 Vue 相关依赖打包到一个单独的代码块中
          vue: ['vue', 'vue-router'],
          // 将其他常用的库打包到另一个代码块中
          vendor: ['axios', 'element-plus','crypto-js']
        }
      }
    },
    chunkSizeWarningLimit: 40960
  },
  preview: {
    port: 6057,
    host: '0.0.0.0',
    debug: true
  },
  server: {
    port: 6057,
    host: '0.0.0.0'
  }
})
