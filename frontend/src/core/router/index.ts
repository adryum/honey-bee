import { createRouter, createWebHistory } from 'vue-router'
import type { AdminTab, ApiaryTab, HiveTab, ProfileTab } from '../ViewTabEnums';
import { useAuthStore } from '../stores/useAuthStore';

export enum RouterViewPaths {
    Home           = '/',
    Registration   = "/registration",
    Hives          = "/hives",
    HiveOverview   = "hiveOverview",
    Apiaries       = "/apiaries",
    ApiaryOverview = "/apiaryOverview",
    Settings       = "/settings",
    Calendar       = "/calendar",
    Admin          = "/admin",
    Profile        = "/profile",
    Inspections    = "/inspections"
}

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
        path: '/',
        name: '/',
        component: () => import('@/ui/views/CalendarView.vue'), 
        // component: () => import('@/ui/views/InspectionsView.vue'),
    },
    {
        path: RouterViewPaths.Registration,
        name: RouterViewPaths.Registration,
        component: () => import('@/ui/views/LoginView.vue')
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
        path: "/apiaries",
        name: "/apiaries",
        component: () => import('@/ui/views/ApiariesView.vue')
    },
    {
        path: "/apiary/:id/:tab",
        name: RouterViewPaths.ApiaryOverview,
        component: () => import('@/ui/views/ApiaryOverview.vue'),
        props: (route) => ({
            id:  Number(route.params.id),
            tab: route.params.tab as ApiaryTab
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
        path: "/admin/:tab",
        name: RouterViewPaths.Admin,
        component: () => import('@/ui/views/AdminView.vue'),
        props: (route) => ({
            tab: route.params.tab as AdminTab
        })
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
    const store = useAuthStore()
    await store.checkSession()

    if (store.user && to.name === RouterViewPaths.Registration) {
        return { name: RouterViewPaths.Home }
    }

    if (!store.user && to.name !== RouterViewPaths.Registration) {
        return { name: RouterViewPaths.Registration }
    }
})

export default router
