import type { ApiaryAccessGetModel, HiveAccessGetModel, WhitelistEntryGetModel, UserEntryGetModel, WhitelistEntryCreateModel, UserEntryUpdateModel, UpdateWhitelistEntryResponseModel, WhitelistEntryUpdateModel, ApiaryAccessModifyModel, HiveAccessModifyModel } from "./Models";
import { ApiaryAccessResponseModel_To_Number, HiveAccessResponseModel_To_Number, UserEntryGetModel_To_UserEntryModelDB, WhitelistEntryResponseModel_To_WhitelistEntryDB } from "../Convertors";
import api from "../config/AxiosConfig";

export const adminApi = {
    grantApiaryAccess: async (model: ApiaryAccessModifyModel) => {
        const { data } = await api.post<ApiaryAccessModifyModel>('/admin/access/apiary', model)
        return data
    },

    revokeApiaryAccess: async (model: ApiaryAccessModifyModel) => {
        const { data } = await api.delete<ApiaryAccessModifyModel>(
            `/admin/user/${model.userId}/access/apiary/${model.apiaryId}`
        )
        return data
    },

    grantHiveAccess: async (model: HiveAccessModifyModel) => {
        const { data } = await api.post<HiveAccessModifyModel>('/admin/access/hive', model)
        return data
    },

    revokeHiveAccess: async (model: HiveAccessModifyModel) => {
        const { data } = await api.delete<HiveAccessModifyModel>(
            `/admin/user/${model.userId}/access/hive/${model.hiveId}`
        )
        return data
    },

    getApiaryAccess: async (userId: number) => {
        const { data } = await api.get<ApiaryAccessGetModel[]>(`/admin/user/${userId}/access/apiaries`)
        return data.map(ApiaryAccessResponseModel_To_Number)
    },

    getHiveAccess: async (userId: number) => {
        const { data } = await api.get<HiveAccessGetModel[]>(`/admin/user/${userId}/access/hives`)
        return data.map(HiveAccessResponseModel_To_Number)
    },

    getWhitelistEntries: async () => {
        const { data } = await api.get<WhitelistEntryGetModel[]>('/admin/whitelist')        
        return data.map(WhitelistEntryResponseModel_To_WhitelistEntryDB)
    },

    getRegisteredUserEntries: async () => {
        const { data } = await api.get<UserEntryGetModel[]>('/admin/users')
        return data.map(UserEntryGetModel_To_UserEntryModelDB)
    },

    addToWhitelist: async (model: WhitelistEntryCreateModel) => {
        const { data } = await api.post<WhitelistEntryGetModel>('/admin/whitelist', model)
        return WhitelistEntryResponseModel_To_WhitelistEntryDB(data)
    },

    updateUserEntry: async (model: UserEntryUpdateModel) => {
        const { data } = await api.put<UpdateWhitelistEntryResponseModel>('/admin/users', model)
        return data
    },

    updateWhitelistEntry: async (model: WhitelistEntryUpdateModel) => {
        const { data } = await api.put<UpdateWhitelistEntryResponseModel>('/admin/whitelist', model)
        return data
    },

    removeFromWhitelist: async (id: number) => {
        const { data } = await api.delete<number>(`/admin/whitelist/${id}`)
        return data
    }
}
