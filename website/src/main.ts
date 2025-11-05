import './assets/main.sass'
import '/src/core/LightDarkMode.ts'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router'
import { createPinia } from 'pinia'
import i18n from './core/locales/i18n'

axios.defaults.baseURL = import.meta.env.VITE_API;
console.log('Base URL set to:', axios.defaults.baseURL);

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
