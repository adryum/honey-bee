import { defineStore } from "pinia";
import { useApiaryStore } from "./ApiaryStore";
import { useAuthenticationApiStore } from "../network/AuthenticationApiStore";
import { computed, ref } from "vue";
import type { UserProfileModel, UserProfileModelDB } from "./Models";
import router, { RouterViewPaths } from "../router";
import { ActionNotification, useActionsStore } from "./ActionStore";
import { useHiveStore } from "./HiveStore";
import { useNoteStore } from "./NoteStore";
import { Role } from "../DatabaseEnums";
import { useAdminStore } from "./AdminStore";
import { useSocket } from "../composables/useSocket";

export const useMainStore = defineStore("MainStore", () => {
    const authenticationApiStore = useAuthenticationApiStore()
    const apiaryStore  = useApiaryStore()
    const hiveStore    = useHiveStore()
    const noteStore    = useNoteStore()
    const actionStore  = useActionsStore()

    const user = ref<UserProfileModelDB | undefined>(undefined)

    // socket setup
    const userId = computed(() => user.value?.id.toString() ?? undefined)
    useSocket(userId)

    async function initialize() {
        await apiaryStore.initialize()
        await hiveStore.initialize()
        await noteStore.initialize()

        apiaryStore.countHivesInApiaries()

        console.log("Main store initialized!");
    }

    async function authenticateUser() {
        console.log("Authenticating...");
        const response = await authenticationApiStore.getMyProfile()

        if (response) {
            console.log("Authenticated!");
            user.value = response
            await onAuthentication()
            router.push(RouterViewPaths.Home)
        } else {
            actionStore.addAction(ActionNotification.DevFailedToGetUserInfo)
        }
    }

    async function onAuthentication() {
        await initialize()

        if (user.value?.role === Role.ADMINISTRATOR) {
            useAdminStore()
        }
    }

    async function logout() {
        await authenticationApiStore.logout()
        user.value = undefined
    }

    return {
        user,
        initialize,
        authenticateUser,
        logout
    }
})