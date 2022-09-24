import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Component from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
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
  }), Unocss(), Markdown(), Inspect()],
})
