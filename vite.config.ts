import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    vueJSX(),
    AutoImport({
      dirs: [],
      imports: ['vue', 'vue-router', '@vueuse/core'], // 自动引入这三个库的函数 api
    }),],
})
