import './assets/main.sass'
import '/src/core/LightDarkMode.ts'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_API

export const BackgroundType = Object.freeze({
  Dim: 1,
  Blurred: 2,
  DimmedAndBlurred: 3
});

export const TabNumber = Object.freeze({
  Home : 0,
  Apiaries : 1,
  Inventory : 2,
  Finances : 3,
  About : 4,
  Contact : 5,
  Settings : 6
});