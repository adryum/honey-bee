import { defineStore } from 'pinia'
import router, { RouterViewPaths } from '../router';
import type { UserProfileGetModel } from '../api/Models';
import { UserProfileResponseModel_To_UserProfileModelDB } from '../Convertors';
import api from '../config/AxiosConfig';

export const useAuthenticationApiStore = defineStore('authenticationApiStore', () => {
    async function getMyProfile() {
        try {
            const { data } = await api.get<UserProfileGetModel>('/auth/profile/me') 
            return UserProfileResponseModel_To_UserProfileModelDB(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function logout(): Promise<void> {
        try {
            await api.get('/auth/logout')
            router.push(RouterViewPaths.Registration)
        } catch (error) {
            console.error("Failed to logout", error);
        }
    }

    async function checkSession(): Promise<void> {
        try {
            await api.get('/auth/me')

        } catch (error) {
            console.error("Session expired!", error);
            router.push(RouterViewPaths.Registration)
        }
    }

    return {
        getMyProfile,
        checkSession,
        logout
    }
})