import AdminView from '@/ui/views/AdminView.vue'
import ApiariesView from '@/ui/views/ApiariesView.vue'
import ApiaryHivesView from '@/ui/views/ApiaryHivesView.vue'
import CalendarView from '@/ui/views/CalendarView.vue'
import HiveOverview from '@/ui/views/HiveOverview.vue'
import LoginView from '@/ui/views/registration/LoginView.vue'
import SignUpView from '@/ui/views/registration/SignUpView.vue'
import SettingsView from '@/ui/views/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

export enum RouterViews {
    Home = '/',
    Login = "/login",
    Signup = "/signup",
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
        path: RouterViews.Home,
        name: 'home',
        component: HiveOverview,
    },
    {
        path: RouterViews.Login,
        name: 'login',
        component: LoginView
    },
    {
        path: RouterViews.Signup,
        name: 'signUp',
        component: SignUpView
    },
    {
        path: RouterViews.HiveOverview,
        name: 'Hive',
        component: HiveOverview
    },
    {
        path: RouterViews.Apiaries,
        name: 'apiaries',
        component: ApiariesView
    },
    {
        path: RouterViews.ApiaryHives,
        name: 'apiary hives',
        component: ApiaryHivesView
    },
    {
        path: RouterViews.Settings,
        name: 'settings',
        component: SettingsView
    },
    {
        path: RouterViews.Calendar,
        name: 'calendar',
        component: CalendarView
    },
    {
        path: RouterViews.Admin,
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

export default router
