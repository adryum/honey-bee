import '@/assets/_base.sass'
import '/src/core/LightDarkMode.ts'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router, { RouterViewPaths } from './core/router'
import { createPinia } from 'pinia'
import i18n from './core/locales/i18n'
import VueApexCharts from "vue3-apexcharts";
import "@/core/prototype_extensions/StringExtensions"
import "@/core/prototype_extensions/Array"
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

axios.defaults.baseURL = import.meta.env.VITE_API;
axios.defaults.withCredentials = true;


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,   // data stays fresh 5 mins globally
            gcTime: 10 * 60 * 1000,     // cache kept 10 mins after last use
            retry: 2,                    // retry failed requests twice
            refetchOnWindowFocus: true   // refetch when user tabs back in
        }
    }
})

const app = createApp(App)
const pinia = createPinia()

app.use(VueApexCharts);
app.component('ApexChart', VueApexCharts);

app.use(pinia)
app.use(router)
app.use(i18n)

app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
router.push(RouterViewPaths.Registration)