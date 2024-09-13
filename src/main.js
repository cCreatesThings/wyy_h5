import './style.css'
import './assets/base.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'
import { Lazyload } from 'vant'

const app = createApp(App)
app.component('Icon', Icon)
app.use(Lazyload)
app.use(createPinia())
app.use(router)

app.mount('#app')
