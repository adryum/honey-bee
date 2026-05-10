import '@/assets/_base.sass'
import "@/core/prototype_extensions/Date"
import { createApp } from 'vue'
import App from './App.vue'
import router, { RouterViewPaths } from './core/router'
import { createPinia } from 'pinia'
import i18n from './core/locales/i18n'
import VueApexCharts from "vue3-apexcharts";
import "@/core/prototype_extensions/StringExtensions"
import "@/core/prototype_extensions/Array"
import { useTanstackQuery } from './core/config/TanstackConfig'

const app       = createApp(App)
const pinia     = createPinia()

app.use(VueApexCharts);
app.component('ApexChart', VueApexCharts);
app.use(pinia)
app.use(i18n)
useTanstackQuery(app)
app.use(router)
app.mount('#app')