import axios from "axios";
import type { UserModelDB } from "../stores/Models";
import { UserProfileResponseModel_To_UserProfileModelDB } from "../Convertors";
import type { UserProfileResponseModel } from "./Models";
import api from "../config/AxiosConfig";

export const profileApi = {
    getProfile: async (userId: number): Promise<UserModelDB> => {
        const { data } = await api.get<UserProfileResponseModel>(`/profile/${userId}`) 
        return UserProfileResponseModel_To_UserProfileModelDB(data)
    },

    getMe: async () => {
        const { data } = await api.get<UserProfileResponseModel>('/profile/me') 
        return UserProfileResponseModel_To_UserProfileModelDB(data)
    },
}
