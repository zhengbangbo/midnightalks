import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import EpisodeDetail from '../pages/EpisodeDetail.vue'
import Index from '../pages/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index,
    name: 'Index',
  },
  {
    path: '/ep/:created',
    component: EpisodeDetail,
    name: 'EpisodeDetail',
    props: true,
  },
]

const setupRouterGuard = (router: Router) => {
  router.beforeEach(() => {
    // ...
  })
  router.afterEach(() => {
    // ...
  })
}

export const setupRouter = async (app: App) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
