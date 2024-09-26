import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'https://wangyi.vercel.app/',
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // 如果目标服务器使用了自签名证书
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
