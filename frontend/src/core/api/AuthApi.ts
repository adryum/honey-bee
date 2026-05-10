import axios from "axios"
import api from "../config/AxiosConfig"

export const authApi = {
    logout: async () => {
        await api.get('/auth/logout')
    },

    checkSession: async () => {
        return await api.get('/auth/me', { responseType: 'text' })
    }
}