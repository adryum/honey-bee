import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import LoginView from '@/views/registration/LoginView.vue'
import AllHiveView from '@/views/AllHiveView.vue'
import ApiaryView from '@/views/ApiaryView.vue'
import SignUpView from '@/views/registration/SignUpView.vue'
import ApiaryHiveView from '@/views/ApiaryHiveView.vue'
import HiveView from '@/views/HiveView.vue'
import SettingsView from '@/views/SettingsView.vue'
import UsersView from '@/views/UsersView.vue'
import CalendarView from '../views/CalendarView.vue'
import AllBeeView from '../views/AllBeeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
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
        component: HiveView,
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
