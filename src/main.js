import './style.css'
import './assets/base.css'
import 'vant/lib/toast/style'

import 'vant/lib/notify/style'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'
import { Lazyload } from 'vant'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.component('Icon', Icon)
app.use(Lazyload)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
