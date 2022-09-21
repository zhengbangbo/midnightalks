import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'
import routes from '~pages'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import 'github-markdown-css/github-markdown-light.css'

export const createApp = ViteSSG(
  App,
  { routes },
  // ({ app, router, routes, isClient, initialState }) => {},
)
