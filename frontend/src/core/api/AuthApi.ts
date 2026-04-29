import axios from "axios"

export const authApi = {
    logout: async () => {
        await axios.get('/auth/logout')
    },

    checkSession: async () => {
        return await axios.get('/auth/me', { responseType: 'text' })
    }
}