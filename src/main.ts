import '@unocss/reset/tailwind.css'
import 'github-markdown-css/github-markdown-light.css'
import 'uno.css'
import { ViteSSG } from 'vite-ssg'
import { h } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import './style.css'
import { getAllEpisodes } from './utils/episode'

const routes: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    component: () => import('./pages/index.vue'),
  },
]

for (const { id } of getAllEpisodes()) {
  routes.push(
    {
      name: `Episode${id}`,
      path: `/episodes/${id}`,
      component: () => import('./pages/content.vue').then(
        ({ default: Content }) => {
          return h(Content, { id })
        },
      ),
    },
  )
}

export const createApp = ViteSSG(
  App,
  { routes },
  // ({ app, router, routes, isClient, initialState }) => {},
)
