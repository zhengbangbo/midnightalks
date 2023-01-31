import '@unocss/reset/tailwind.css'
import 'uno.css'
import { createApp } from 'vue'
import lazyPlugin from 'vue3-lazy'
import App from './App.vue'
import loading from './assets/logo.jpg'
import error from './assets/not-found.jpg'
import { worker } from './mocks/browser'
import { setupRouter } from './router'
import './style.css'

if (process.env.NODE_ENV === 'development')
  worker.start()

async function setupApp() {
  const app = createApp(App)
  await setupRouter(app)
  app.use(lazyPlugin, {
    loading,
    error,
  })
  app.mount('#app')
}

setupApp().catch(e => console.error(e))
