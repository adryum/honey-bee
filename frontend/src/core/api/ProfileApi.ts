import type { UserModelDB } from "../stores/Models";
import { UserProfileResponseModel_To_UserProfileModelDB } from "../Convertors";
import type { UserProfileGetModel } from "./Models";
import api from "../config/AxiosConfig";

export const profileApi = {
    getProfile: async (userId: number): Promise<UserModelDB> => {
        const { data } = await api.get<UserProfileGetModel>(`/profile/${userId}`) 
        return UserProfileResponseModel_To_UserProfileModelDB(data)
    },

    getMe: async () => {
        const { data } = await api.get<UserProfileGetModel>('/profile/me') 
        return UserProfileResponseModel_To_UserProfileModelDB(data)
    },
}
