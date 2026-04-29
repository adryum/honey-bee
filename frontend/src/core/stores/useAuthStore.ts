import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserModelDB } from "./Models";
import { startSocket } from "../composables/useSocket";
import { authApi } from "../api/AuthApi";
import { useMutation } from "@tanstack/vue-query";
import { profileApi } from "../api/ProfileApi";
import { useRouter } from "vue-router";
import { RouterViewPaths } from "../router";

export const useAuthStore = defineStore("auth store", () => {
    const router = useRouter()
    const user = ref<UserModelDB | undefined>(undefined)
    let sessionChecked = false

    // socket setup
    startSocket(user)

    const { mutate: authenticate, isPending: isAuthenticating } = useMutation({
        mutationFn: profileApi.getMe,
        onSuccess: (userModel) => {
            user.value = userModel
        }
    })

    async function checkSession() {
        if (sessionChecked) return

        try {
            await authApi.checkSession()
            user.value = await profileApi.getMe()
        } catch {
            user.value = undefined
        } finally {
            sessionChecked = true
        }
    }

    const logout = async () => {
        router.push(RouterViewPaths.Registration)
        user.value = undefined
        sessionChecked = false
        await authApi.logout()
    }

    return {
        user,
        authenticate,
        isAuthenticating,
        checkSession,
        logout
    }
})