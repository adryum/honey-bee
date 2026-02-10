import axios from 'axios'
import { defineStore } from 'pinia'
import router, { RouterViewPaths } from '../router';
import type { UserProfileModel } from '../stores/Models';
import type { UserProfileResponseModel } from './Models';
import { UserProfileResponseModel_To_UserProfileModel } from '../Convertors';

export const useAuthenticationApiStore = defineStore('authenticationApiStore', () => {
    async function getProfileInfo(): Promise<UserProfileModel | undefined> {
        try {
            const response = await axios.get<UserProfileResponseModel>('/auth/profile')
            console.log("GetProfileRes: ", response);
            if (!response) throw new Error("no response");


            return UserProfileResponseModel_To_UserProfileModel(response.data)
        } catch (error) {
            console.error("Broke down! Failed to get user profile!", error);
            return undefined
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
        getProfileInfo,
        checkSession,
        logout
    }
})