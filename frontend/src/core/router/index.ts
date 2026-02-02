import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/ui/views/MainView.vue'
import LoginView from '@/ui/views/registration/LoginView.vue'
import AllHiveView from '@/ui/views/AllHiveView.vue'
import ApiaryView from '@/ui/views/ApiaryView.vue'
import SignUpView from '@/ui/views/registration/SignUpView.vue'
import ApiaryHiveView from '@/ui/views/ApiaryHiveView.vue'
import SettingsView from '@/ui/views/SettingsView.vue'
import UsersView from '@/ui/views/UsersView.vue'
import CalendarView from '@/ui/views/CalendarView.vue'
import AllBeeView from '@/ui/views/AllBeeView.vue'
import HiveOverview from '@/ui/views/HiveOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HiveOverview,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'signUp',
        component: SignUpView
    },
    {
        path: '/hives',
        name: 'hives',
        component: AllHiveView
    },
    {
        path: '/hives/:hiveId',
        name: 'Hive',
        component: HiveOverview,
        props: true
    },
    {
        path: '/apiaries',
        name: 'apiaries',
        component: ApiaryView
    },
    {
        path: '/apiaryHives/:apiaryId',
        name: 'apiary hives',
        component: ApiaryHiveView,
        props: route => ({
            apiaryId: Number(route.params.apiaryId) // convert to number here
        })
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: CalendarView
    },
    {
        path: '/bees',
        name: 'bees',
        component: AllBeeView
    },
    {
        path: '/users',
        name: 'admin users',
        component: UsersView
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
