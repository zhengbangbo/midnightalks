import '@unocss/reset/tailwind.css'
import 'uno.css'
import { createApp } from 'vue'
import StarportPlugin from 'vue-starport'
import lazyPlugin from 'vue3-lazy'
import App from './App.vue'
import loading from './assets/logo.jpg'
import error from './assets/not-found.jpg'
import { setupRouter } from './router'
import './style.css'

async function setupApp() {
  const app = createApp(App)
  await setupRouter(app)
  app.use(StarportPlugin())
  app.use(lazyPlugin, {
    loading,
    error,
  })
  app.mount('#app')
}

setupApp().catch(e => console.error(e))
