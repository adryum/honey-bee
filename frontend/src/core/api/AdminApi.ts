import axios from "axios";
import type { ApiaryAccessResponseModel, HiveAccessResponseModel, UpdateApiaryAccessRequestModel, UpdateApiaryAccessResponseModel, WhitelistEntryResponseModel, UserEntryResponseModel, AddToWhitelistRequestModel, UpdateUserEntryRequestModel, UpdateWhitelistEntryResponseModel, UpdateWhitelistEntryRequestModel, UpdateHiveAccessRequestModel, UpdateHiveAccessResponseModel } from "./Models";
import { ApiaryAccessResponseModel_To_Number, HiveAccessResponseModel_To_Number, UserEntryResponseModel_To_UserEntryModelDB, WhitelistEntryResponseModel_To_WhitelistEntryDB } from "../Convertors";

export const adminApi = {
    getApiaryAccess: async (userId: number) => {
        const { data } = await axios.post<ApiaryAccessResponseModel[]>('/admin/access/get/apiaries', { 
            userId: userId
        })
        return data.map(ApiaryAccessResponseModel_To_Number)
    },

    getHiveAccess: async (userId: number) => {
        const { data } = await axios.post<HiveAccessResponseModel[]>('/admin/access/get/hives', { 
            userId: userId
        })
        return data.map(HiveAccessResponseModel_To_Number)
    },

    updateAccessToApiary: async (model: UpdateApiaryAccessRequestModel) => {
        const { data } = await axios.post<UpdateApiaryAccessResponseModel>('/admin/access/set/apiary', model)
        return data
    },

    updateAccessToHive: async (model: UpdateHiveAccessRequestModel) => {
        const { data } = await axios.post<UpdateHiveAccessResponseModel>('/admin/access/set/hive', model)
        return data
    },

    getWhitelistEntries: async () => {
        const { data } = await axios.get<WhitelistEntryResponseModel[]>('/admin/whitelist/users')
        return data.map(WhitelistEntryResponseModel_To_WhitelistEntryDB)
    },

    getRegisteredUserEntries: async () => {
        const { data } = await axios.get<UserEntryResponseModel[]>('/admin/users')
        return data.map(UserEntryResponseModel_To_UserEntryModelDB)
    },

    addToWhitelist: async (model: AddToWhitelistRequestModel) => {
        const { data } = await axios.post<WhitelistEntryResponseModel>('/admin/whitelist/add', model)
        return WhitelistEntryResponseModel_To_WhitelistEntryDB(data)
    },

    updateUserEntry: async (model: UpdateUserEntryRequestModel) => {
        const { data } = await axios.post<UpdateWhitelistEntryResponseModel>('/admin/users/update', model)
        return data
    },

    updateWhitelistEntry: async (model: UpdateWhitelistEntryRequestModel) => {
        const { data } = await axios.post<UpdateWhitelistEntryResponseModel>('/admin/whitelist/update', model)
        return data
    },

    removeFromWhitelist: async (id: number) => {
        const { data } = await axios.post<number>('/admin/whitelist/remove', { id: id })
        return data
    }
}
