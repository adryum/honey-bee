import './assets/main.sass'
import '/src/core/LightDarkMode.ts'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useHiveStore } from './core/view_models/HiveViewModel'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')


axios.defaults.baseURL = import.meta.env.VITE_API
