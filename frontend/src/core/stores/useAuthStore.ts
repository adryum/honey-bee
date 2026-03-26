import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserModelDB } from "./Models";
import router, { RouterViewPaths } from "../router";
import { startSocket } from "../composables/useSocket";
import { authApi } from "../api/AuthApi";
import { useMutation } from "@tanstack/vue-query";
import { profileApi } from "../api/ProfileApi";

export const useAuthStore = defineStore("auth store", () => {
    const user = ref<UserModelDB | undefined>(undefined)

    // socket setup
    startSocket(user)

    const { mutate: authenticate, isPending: isAuthenticating } = useMutation({
        mutationFn: profileApi.getMe,
        onSuccess:  (userModel) => {
            user.value = userModel
            router.push(RouterViewPaths.Home)
        }
    })

    const { mutate: checkSession, isPending: isCheckingSession } = useMutation({
        mutationFn: authApi.checkSession,
        onError: () => {
            user.value = undefined
            router.push(RouterViewPaths.Registration)
        }
    })

    const logout = async () => {
        await authApi.logout()
        user.value = undefined
    }

    return {
        user,
        authenticate,
        isAuthenticating,
        checkSession,
        isCheckingSession,
        logout
    }
})