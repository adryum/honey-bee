import { defineStore } from "pinia"
import { ref } from "vue"
import { useAdminStore } from "./AdminStore"
import { useMainStore } from "./MainStore"
import { Role } from "../DatabaseEnums"
import router, { RouterViewPaths } from "../router"
import type { UserProfileModelDB } from "./Models"
import { useProfileApiStore } from "../network/ProfileStoreApi"

export const useProfileStore = defineStore("useProfileStore", () => {
    const adminStore      = useAdminStore()
    const mainStore       = useMainStore()
    const profileApiStore = useProfileApiStore()

    const apiaryAccess = ref<number[]>([])
    const hiveAccess   = ref<number[]>([])
    const openedUser   = ref<UserProfileModelDB | undefined>(undefined)

    async function openProfile(userId: number) {
        const result = await profileApiStore.getUserProfile(userId)

        if (!result) return;

        openedUser.value = result
        
        if (mainStore.user?.role === Role.ADMINISTRATOR) {
            const apiaryResult = await adminStore.getApiaryAccess(userId)
            const hiveResult   = await adminStore.getHiveAccess(userId)

            if (apiaryResult) apiaryAccess.value = apiaryResult
            if (hiveResult) hiveAccess.value = hiveResult
        }

        router.push(RouterViewPaths.Profile)
    }
    
    return {
        openProfile,
        apiaryAccess,
        hiveAccess,
        openedUser,
    }
})