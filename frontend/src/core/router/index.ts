import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationApiStore } from '../network/AuthenticationApiStore'

export enum RouterViewPaths {
    Home         = '/',
    Registration = "/registration",
    Hives        = "/hives",
    HiveOverview = "/hiveOverview",
    Apiaries     = "/apiaries",
    ApiaryHives  = "/apiaryHives",
    Settings     = "/settings",
    Calendar     = "/calendar",
    Admin        = "/admin",
    Profile      = "/profile",
    Inspections  = "/inspections"
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: RouterViewPaths.Home,
        name: RouterViewPaths.Home,
        component: () => import('@/ui/views/InspectionsView.vue'),
    },
    {
        path: RouterViewPaths.Registration,
        name: RouterViewPaths.Registration,
        component: () => import('@/ui/views/registration/LoginView.vue')
    },
    {
        path: RouterViewPaths.HiveOverview,
        name: RouterViewPaths.HiveOverview,
        component: () => import('@/ui/views/HiveOverview.vue')
    },
    {
        path: RouterViewPaths.Apiaries,
        name: RouterViewPaths.Apiaries,
        component: () => import('@/ui/views/ApiariesView.vue')
    },
    {
        path: RouterViewPaths.ApiaryHives,
        name: RouterViewPaths.ApiaryHives,
        component: () => import('@/ui/views/ApiaryHivesView.vue')
    },
    {
        path: RouterViewPaths.Inspections,
        name: RouterViewPaths.Inspections,
        component: () => import('@/ui/views/InspectionsView.vue')
    },
    {
        path: `/inspection/intake/apiary/:apiaryId`,
        name: "apiary inspection",
        component: () => import('@/ui/views/InspectionIntakeView.vue'),
    },
    {
        path: `/inspection/:id`,
        name: "inspection",
        component: () => import('@/ui/views/InspectionReviewview.vue'),
        props: true
    },
    {
        path: RouterViewPaths.Calendar,
        name: RouterViewPaths.Calendar,
        component: () => import('@/ui/views/CalendarView.vue'), 
    },
    {
        path: RouterViewPaths.Admin,
        name: RouterViewPaths.Admin,
        component: () => import('@/ui/views/AdminView.vue')
    },
    {
        path: RouterViewPaths.Profile,
        name: RouterViewPaths.Profile,
        component: () => import('@/ui/views/ProfileView.vue')
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

    if (to.name !== RouterViewPaths.Registration) {
        const store = useAuthenticationApiStore()
        await store.checkSession()
    } 
})

export default router
