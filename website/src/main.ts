import './assets/main.sass'
import '/src/core/LightDarkMode.ts'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')


axios.defaults.baseURL = import.meta.env.VITE_API
