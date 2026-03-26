import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationApiStore } from '../network/AuthenticationApiStore'
import type { HiveTab, ProfileTab } from '../ViewTabEnums';

export enum RouterViewPaths {
    Home         = '/',
    Registration = "/registration",
    Hives        = "/hives",
    HiveOverview = "hiveOverview",
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
        path: "/hive/:id/:tab",
        name: RouterViewPaths.HiveOverview,
        component: () => import('@/ui/views/HiveOverview.vue'),
        props: (route) => ({
            id:  Number(route.params.id),
            tab: route.params.tab as HiveTab
        })
    },
    {
        path: RouterViewPaths.Apiaries,
        name: RouterViewPaths.Apiaries,
        component: () => import('@/ui/views/ApiariesView.vue')
    },
    {
        path: "/apiary/:apiaryId/hives",
        name: RouterViewPaths.ApiaryHives,
        component: () => import('@/ui/views/ApiaryHivesView.vue'),
        props: (route) => ({
            apiaryId: Number(route.params.apiaryId)
        })
    },
    {
        path: RouterViewPaths.Inspections,
        name: RouterViewPaths.Inspections,
        component: () => import('@/ui/views/InspectionsView.vue')
    },
    {
        path: "/inspection/conduct/apiary/:apiaryId",
        name: "apiary inspection",
        component: () => import('@/ui/views/InspectionIntakeView.vue'),
        props: (route) => ({
            apiaryId: Number(route.params.apiaryId)
        })
    },
    {
        path: "/inspection/:id",
        name: "inspection",
        component: () => import('@/ui/views/InspectionReviewview.vue'),
        props: (route) => ({
            id: Number(route.params.id)
        })
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
        path: "/profile/:userId/:tab",
        name: RouterViewPaths.Profile,
        component: () => import('@/ui/views/ProfileView.vue'),
        props: (route) => ({
            userId: Number(route.params.userId),
            tab:    route.params.tab as ProfileTab
        })
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
    console.log("Routing to: ", to.fullPath);

    if (to.name !== RouterViewPaths.Registration) {
        const store = useAuthenticationApiStore()
        await store.checkSession()
    } 
})

export default router
