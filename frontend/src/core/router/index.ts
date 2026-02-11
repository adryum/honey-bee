import AdminView from '@/ui/views/AdminView.vue'
import ApiariesView from '@/ui/views/ApiariesView.vue'
import ApiaryHivesView from '@/ui/views/ApiaryHivesView.vue'
import CalendarView from '@/ui/views/CalendarView.vue'
import HiveOverview from '@/ui/views/HiveOverview.vue'
import LoginView from '@/ui/views/registration/LoginView.vue'
import SignUpView from '@/ui/views/registration/SignUpView.vue'
import SettingsView from '@/ui/views/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationApiStore } from '../network/AuthenticationApiStore'

export enum RouterViewPaths {
    Home = '/',
    Registration = "/registration",
    Hives = "/hives",
    HiveOverview = "/hiveOverview",
    Apiaries = "/apiaries",
    ApiaryHives = "/apiaryHives",
    Settings = "/settings",
    Calendar = "/calendar",
    Admin = "/admin"
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: RouterViewPaths.Home,
        name: 'home',
        component: HiveOverview,
    },
    {
        path: RouterViewPaths.Registration,
        name: 'login',
        component: LoginView
    },
    {
        path: RouterViewPaths.HiveOverview,
        name: 'Hive',
        component: HiveOverview
    },
    {
        path: RouterViewPaths.Apiaries,
        name: 'apiaries',
        component: ApiariesView
    },
    {
        path: RouterViewPaths.ApiaryHives,
        name: 'apiary hives',
        component: ApiaryHivesView
    },
    {
        path: RouterViewPaths.Settings,
        name: 'settings',
        component: SettingsView
    },
    {
        path: RouterViewPaths.Calendar,
        name: 'calendar',
        component: CalendarView
    },
    {
        path: RouterViewPaths.Admin,
        name: 'admin users',
        component: AdminView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.beforeEach(async (to, from) => {
    console.log("Routing to: ", to.name);

    if (to.name !== "login") {
        const store = useAuthenticationApiStore()
        await store.checkSession()
    } 
})

export default router
