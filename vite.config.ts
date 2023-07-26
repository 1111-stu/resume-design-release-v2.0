import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需导入element plus 自定义主题。
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 图片压缩
import viteImagemin from 'vite-plugin-imagemin'

// 打包体积分析,打包完成会生成一个report.html文件
import { visualizer } from 'rollup-plugin-visualizer'

// 预渲染
import vitePrerender from 'vite-plugin-prerender'
import path from 'path'

// 去除log和debuugger
import externalGlobals from 'rollup-plugin-external-globals'

// 打包时不引入外部模块，使用cdn引入
const globals = externalGlobals({
  lodash: 'lodash',
  jspdf: 'jspdf',
  html2canvas: 'html2canvas'
})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 按需导入element plus组件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    // 按需导入element plus 自定义主题。
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    // 打包体积分析
    visualizer({ open: true }),
    // 图片资源压缩
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    // 预渲染
    vitePrerender({
      // Required - The path to the vite-outputted app to prerender.
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: ['/', '/design', '/chat']
    })
  ],
  // element plus 自定义主题
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/style/global.scss" as *;'
      }
    }
  },
  // 路径别名
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]' // 资源文件像 字体，图片等
      },

      //打包时不引入外部模块，使用cdn引入
      external: ['lodash', 'jspdf', 'html2canvas'],
      plugins: [globals]
    },
    // 清除console和debugger
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
