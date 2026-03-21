import axios from "axios"
import { UserProfileResponseModel_To_UserProfileModelDB } from "../Convertors"
import type { UserProfileResponseModel } from "./Models"
import router, { RouterViewPaths } from "../router"

export const authApi = {
    authenticate: async () => {
        const { data } = await axios.get<UserProfileResponseModel>('/auth/profile/me') 
        return UserProfileResponseModel_To_UserProfileModelDB(data)
    },

    logout: async () => {
        await axios.get('/auth/logout')
        router.push(RouterViewPaths.Registration)
    },

    checkSession: async () => {
        await axios.get('/auth/me')
    }
}