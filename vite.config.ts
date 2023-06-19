import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需导入element plus 自定义主题。
// import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
  }),
  Components({
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
  })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/style/global.scss" as *;'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
