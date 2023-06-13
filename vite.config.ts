import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需导入element plus 自定义主题。
// import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: '@use "@/style/global.scss" as *;' //关键
    //   }
    // }
  },
})
