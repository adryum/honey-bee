import axios from "axios"
import router, { RouterViewPaths } from "../router"

export const authApi = {
    logout: async () => {
        await axios.get('/auth/logout')
        router.push(RouterViewPaths.Registration)
    },

    checkSession: async () => {
        await axios.get('/auth/me')
    }
}