import axios from 'axios'
import { defineStore } from 'pinia'

import type { UserEntryModelDB, WhitelistEntryModelDB } from '../stores/Models'
import { ApiaryAccessResponseModelArray_To_NumberArray, HiveAccessResponseModelArray_To_NumberArray, UserEntryResponseModelArray_To_UserEntryModelDBArray, WhitelistEntryResponseModelArray_To_WhitelistEntryModelDBArray, WhitelistEntryResponseModel_To_WhitelistEntryDB } from '../Convertors'
import type { WhitelistEntryResponseModel, AddToWhitelistRequestModel, UpdateUserEntryRequestModel, UpdateWhitelistEntryResponseModel, UpdateWhitelistEntryRequestModel, UserEntryResponseModel, UpdateApiaryAccessRequestModel, UpdateApiaryAccessResponseModel, ApiaryAccessResponseModel, HiveAccessResponseModel } from './Models'

export const useAdminApiStore = defineStore('useAdminApiStore', () => {
    async function getApiaryAccess(userId: number): Promise<number[] | undefined> {
        try {
            const { data } = await axios.post<ApiaryAccessResponseModel[]>('/admin/access/get/apiaries', { userId: userId})
            return ApiaryAccessResponseModelArray_To_NumberArray(data)
        } catch (error) {
            console.error(`Failed to get apiary access for user ${userId} :`, error);
            return undefined
        }
    }

    async function getHiveAccess(userId: number): Promise<number[] | undefined> {
        try {
            const { data } = await axios.post<HiveAccessResponseModel[]>('/admin/access/get/hives', { userId: userId})
            return HiveAccessResponseModelArray_To_NumberArray(data)
        } catch (error) {
            console.error(`Failed to get hive access for user ${userId} :`, error);
            return undefined
        }
    }

    async function updateAccessToApiary(
        model: UpdateApiaryAccessRequestModel
    ): Promise<UpdateApiaryAccessResponseModel | undefined> {
        try {
            const { data } = await axios.post<UpdateApiaryAccessResponseModel>('/admin/access/set/apiary', model)
            return data
        } catch (error) {
            console.error(error);
        }
    }
   

    async function forceServerFetchNewSheetData(): Promise<boolean | undefined> {
        try {
            const { data } = await axios.post<boolean>('/admin/reFechSheet')
            return data
        } catch (error) {
            console.error(error);
        }
    }

    async function getWhitelistEntries(): Promise<WhitelistEntryModelDB[] | undefined> {
        try {
            const response = await axios.get<WhitelistEntryResponseModel[]>('/admin/whitelist/users')
            const entries = response.data
            console.log("Got whitelist entry response: ", entries);

            if (entries) {
                return WhitelistEntryResponseModelArray_To_WhitelistEntryModelDBArray(entries)
            }
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function getUserEntries(): Promise<UserEntryModelDB[] | undefined> {
        try {
            const promise = await axios.get<UserEntryResponseModel[]>('/admin/users')
            const users = promise.data 
            console.log("Got all user response: ", users);
            
            return UserEntryResponseModelArray_To_UserEntryModelDBArray(users) 
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function addToWhitelist(model: AddToWhitelistRequestModel): Promise<WhitelistEntryModelDB | undefined> {
        try {
            const promise = await axios.post<WhitelistEntryResponseModel>('/admin/whitelist/add', model)
            const entry = promise.data

            if (entry) {
                return WhitelistEntryResponseModel_To_WhitelistEntryDB(entry)
            }
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function updateUserEntry(
        payload: UpdateUserEntryRequestModel
    ): Promise<UpdateWhitelistEntryResponseModel | undefined> {
        try {
            const result = await axios.post<UpdateWhitelistEntryResponseModel>('/admin/users/update', payload)
            const entry = result.data

            if (entry) {
                return entry
            }
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function updateWhitelistEntry(
        payload: UpdateWhitelistEntryRequestModel
    ): Promise<UpdateWhitelistEntryResponseModel | undefined> {
        try {
            const result = await axios.post<UpdateWhitelistEntryResponseModel>('/admin/whitelist/update', payload)
            const entry = result.data

            if (entry) {
                return entry
            }
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function removeFromWhitelist(id: number): Promise<number | undefined> {
        try {
            console.log("before post: ", id);
            
            const promise = await axios.post<number>('/admin/whitelist/remove', { id: id })
            const removedEntryId = promise.data
            return removedEntryId
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    return {
        getWhitelistEntries,
        getUserEntries,
        addToWhitelist,
        removeFromWhitelist,
        updateWhitelistEntry,
        updateUserEntry,
        forceServerFetchNewSheetData,
        updateAccessToApiary,
        getApiaryAccess,
        getHiveAccess,
    }
})
