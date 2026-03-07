import axios from 'axios'
import { defineStore } from 'pinia'
import type { UserProfileResponseModel } from './Models'
import { UserProfileResponseModel_To_UserProfileModelDB } from '../Convertors'

export const useProfileApiStore = defineStore('useProfileApiStore', () => {
    async function getUserProfile(userId: number) {
        try {
            const { data } = await axios.post<UserProfileResponseModel>('/auth/profile', { userId: userId }) 
            return UserProfileResponseModel_To_UserProfileModelDB(data)
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        getUserProfile
    }
})