import axios from "axios";
import type { ApiaryAccessGetModel, HiveAccessGetModel, WhitelistEntryGetModel, UserEntryGetModel, WhitelistEntryCreateModel, UserEntryUpdateModel, UpdateWhitelistEntryResponseModel, WhitelistEntryUpdateModel, ApiaryAccessModifyModel, HiveAccessModifyModel } from "./Models";
import { ApiaryAccessResponseModel_To_Number, HiveAccessResponseModel_To_Number, UserEntryGetModel_To_UserEntryModelDB, WhitelistEntryResponseModel_To_WhitelistEntryDB } from "../Convertors";

export const adminApi = {
    grantApiaryAccess: async (model: ApiaryAccessModifyModel) => {
        const { data } = await axios.post<ApiaryAccessModifyModel>('/admin/access/apiary', model)
        return data
    },

    revokeApiaryAccess: async (model: ApiaryAccessModifyModel) => {
        const { data } = await axios.delete<ApiaryAccessModifyModel>(
            `/admin/user/${model.userId}/access/apiary/${model.apiaryId}`
        )
        return data
    },

    grantHiveAccess: async (model: HiveAccessModifyModel) => {
        const { data } = await axios.post<HiveAccessModifyModel>('/admin/access/hive', model)
        return data
    },

    revokeHiveAccess: async (model: HiveAccessModifyModel) => {
        const { data } = await axios.delete<HiveAccessModifyModel>(
            `/admin/user/${model.userId}/access/hive/${model.hiveId}`
        )
        return data
    },

    getApiaryAccess: async (userId: number) => {
        const { data } = await axios.get<ApiaryAccessGetModel[]>(`/admin/user/${userId}/access/apiaries`)
        return data.map(ApiaryAccessResponseModel_To_Number)
    },

    getHiveAccess: async (userId: number) => {
        const { data } = await axios.get<HiveAccessGetModel[]>(`/admin/user/${userId}/access/hives`)
        return data.map(HiveAccessResponseModel_To_Number)
    },

    getWhitelistEntries: async () => {
        const { data } = await axios.get<WhitelistEntryGetModel[]>('/admin/whitelist')        
        return data.map(WhitelistEntryResponseModel_To_WhitelistEntryDB)
    },

    getRegisteredUserEntries: async () => {
        const { data } = await axios.get<UserEntryGetModel[]>('/admin/users')
        return data.map(UserEntryGetModel_To_UserEntryModelDB)
    },

    addToWhitelist: async (model: WhitelistEntryCreateModel) => {
        const { data } = await axios.post<WhitelistEntryGetModel>('/admin/whitelist', model)
        return WhitelistEntryResponseModel_To_WhitelistEntryDB(data)
    },

    updateUserEntry: async (model: UserEntryUpdateModel) => {
        const { data } = await axios.put<UpdateWhitelistEntryResponseModel>('/admin/users', model)
        return data
    },

    updateWhitelistEntry: async (model: WhitelistEntryUpdateModel) => {
        const { data } = await axios.put<UpdateWhitelistEntryResponseModel>('/admin/whitelist', model)
        return data
    },

    removeFromWhitelist: async (id: number) => {
        const { data } = await axios.delete<number>(`/admin/whitelist/${id}`)
        return data
    }
}
