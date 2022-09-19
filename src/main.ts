import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from '~pages'
import 'uno.css'
import '@unocss/reset/tailwind.css'

export const createApp = ViteSSG(
  App,
  { routes },
  // ({ app, router, routes, isClient, initialState }) => {},
)
