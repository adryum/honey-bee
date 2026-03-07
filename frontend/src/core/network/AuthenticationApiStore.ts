import axios from 'axios'
import { defineStore } from 'pinia'
import router, { RouterViewPaths } from '../router';
import type { UserProfileResponseModel } from './Models';
import { UserProfileResponseModel_To_UserProfileModelDB } from '../Convertors';

export const useAuthenticationApiStore = defineStore('authenticationApiStore', () => {
    async function getMyProfile() {
        try {
            const { data } = await axios.get<UserProfileResponseModel>('/auth/profile/me') 
            return UserProfileResponseModel_To_UserProfileModelDB(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function logout(): Promise<void> {
        try {
            await axios.get('/auth/logout')
            router.push(RouterViewPaths.Registration)
        } catch (error) {
            console.error("Failed to logout", error);
        }
    }

    async function checkSession(): Promise<void> {
        try {
            await axios.get('/auth/me')

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