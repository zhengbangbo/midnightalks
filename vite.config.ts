import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [Vue({
    include: [/\.vue$/, /\.md$/],
    reactivityTransform: true,
  }), Component({
    dts: path.resolve(pathSrc, 'typing/components.d.ts'),
  }), AutoImport({
    imports: ['vue', 'vue-router', '@vueuse/core'],
    dirs: [path.resolve(pathSrc, 'composables')],
    dts: path.resolve(pathSrc, 'typing/components.d.ts'),
  }), Unocss(), Inspect()],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
