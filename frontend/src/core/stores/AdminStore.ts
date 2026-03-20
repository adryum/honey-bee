import { defineStore } from "pinia"
import type { UserEntryModelDB, UserProfileModel, WhitelistEntryModelDB } from "./Models"
import { ref } from "vue"
import { useAdminApiStore } from "../network/AdminApiStore"
import type { UpdateUserEntryRequestModel, UpdateWhitelistEntryRequestModel, AddToWhitelistRequestModel, WhitelistEntryResponseModel, UserEntryResponseModel, UpdateApiaryAccessRequestModel, UpdateApiaryAccessResponseModel } from "../network/Models"
import { isValidValue } from "../utils/others"
import { useActionsStore, ActionNotification } from "./ActionStore"
import type { CallbackModel } from "../models/SupperModels"
import { UserEntryResponseModel_To_UserEntryModelDB, WhitelistEntryResponseModel_To_WhitelistEntryDB } from "../Convertors"

export const useAdminStore = defineStore("useAdminStore", () => {
    const actionsStore = useActionsStore()
    const adminApiStore = useAdminApiStore()
    
    const isAddingToWhitelist = ref(false)
    const isUpdatingEntries = ref(false)
    const isRemovingEntry = ref(false)
    const isFetchingSheetDataEntry = ref(false)
    
    const userEntries = ref<UserEntryModelDB[]>([])
    const whitelistEntries = ref<WhitelistEntryModelDB[]>([])

    async function getApiaryAccess(userId: number) {
        try {
            const result = await adminApiStore.getApiaryAccess(userId)
            return result
        } catch (error) {
            console.error(error);
            
        }
    }

    async function getHiveAccess(userId: number) {
        try {
            const result = await adminApiStore.getHiveAccess(userId)
            return result
        } catch (error) {
            console.error(error);
            
        }
    }

    async function updateAccessToApiary(
        model:     UpdateApiaryAccessRequestModel,
        callback?: CallbackModel
    ): Promise<UpdateApiaryAccessResponseModel | undefined> {
        try {
            const result = await adminApiStore.updateAccessToApiary(model)

            if (result) {
                callback?.onSuccess?.("")
            } else {
                callback?.onFailure?.()
            }
            
            return result
        } catch (error) {
            console.error(error);
            
        }
    }

    async function getWhitelistEntries() {
        try {
            console.log("Admin Requesting whitelist entries.");
            const result = await adminApiStore.getWhitelistEntries()
            
            if (result) {
                whitelistEntries.value = result
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function removeWhitelistEntry(id: number, callback?: CallbackModel) {
        try {
            isRemovingEntry.value = true
            const result = await adminApiStore.removeFromWhitelist(id)

            if (isValidValue(result)) {
                whitelistEntries.value = whitelistEntries.value.filter(item => {
                    return item.id !== result
                })
            } else {
                throw new Error("No entry id was provided!");
            }
            callback?.onSuccess?.("")
            actionsStore.addAction(ActionNotification.SuccseededToRemoveWhitelistEntry)
        } catch (error) {
            console.error(error);
            callback?.onFailure?.()
            actionsStore.addAction(ActionNotification.FailedToRemoveWhitelistEntry)
        } finally {
            isRemovingEntry.value = false
        }
    }

    function updateWhitelistAndUserEntry(whitelistEntry: WhitelistEntryResponseModel, userEntry: UserEntryResponseModel) {
        // updating whitelist and user entries
        if (whitelistEntry) {
            const updatedWhitelistEntry = WhitelistEntryResponseModel_To_WhitelistEntryDB(whitelistEntry)
            console.log("Before");
            
            console.log(whitelistEntries.value);
            

            whitelistEntries.value = whitelistEntries.value.map(item => {
                if (item.id === updatedWhitelistEntry.id) {
                    return updatedWhitelistEntry
                }

                return item
            })

            console.log("after");
            
            console.log(whitelistEntries.value);
        }

        if (userEntry) {
            const updatedUserEntry = UserEntryResponseModel_To_UserEntryModelDB(userEntry)


            userEntries.value = userEntries.value.map(item => {
                if (item.id === updatedUserEntry.id) {
                    return updatedUserEntry
                }

                return item
            })
        }
        actionsStore.addAction(ActionNotification.SuccseededToUpdateWhitelist)
    }

    async function updateUserEntry(
        model: UpdateUserEntryRequestModel,
        responseCallbacks?: CallbackModel
    ) {
        try {
            isUpdatingEntries.value = true
            const result = await adminApiStore.updateUserEntry(model)
            
            if (result) {
                updateWhitelistAndUserEntry(result?.whitelistEntry, result?.userEntry)
                responseCallbacks?.onSuccess?.("")
            } else {
                throw new Error("Failed to update user!");
            }
        } catch (error) {
            console.error(error);
            responseCallbacks?.onFailure?.()
            actionsStore.addAction(ActionNotification.FailedToUpdateWhitelist)
        } finally {
            isUpdatingEntries.value = false
        }
    }

    async function updateWhitelistEntry(
        model: UpdateWhitelistEntryRequestModel,
        responseCallbacks?: CallbackModel
    ) {
        try {
            isUpdatingEntries.value = true
            const result = await adminApiStore.updateWhitelistEntry(model)
            console.log("result", result);
            
            if (result) {
                updateWhitelistAndUserEntry(result?.whitelistEntry, result?.userEntry)
                responseCallbacks?.onSuccess?.("")
            } else {
                throw new Error("Failed to add to whitelsit");
            }
        } catch (error) {
            responseCallbacks?.onFailure?.()
            actionsStore.addAction(ActionNotification.FailedToUpdateWhitelist)
        } finally {
            isUpdatingEntries.value = false
        }
    }

    async function addToWhiteList(
        model: AddToWhitelistRequestModel,
        responseCallbacks?: CallbackModel
    ) {
        try {
            isAddingToWhitelist.value = true
            const result = await adminApiStore.addToWhitelist(model)

            if (result) {
                whitelistEntries.value?.push(result)
                responseCallbacks?.onSuccess?.("")
                actionsStore.addAction(ActionNotification.SucseededToAddWhitelistEntry)
            } else {
                throw new Error("Failed to add to whitelsit");
            }
        } catch (error) {
            responseCallbacks?.onFailure?.()
            actionsStore.addAction(ActionNotification.FailedToAddWhitelistEntry)
        } finally {
            isAddingToWhitelist.value = false
        }
    }

    async function getUserEntries() {
        try {
            console.log("Admin Requesting users entries.");
            const result = await adminApiStore.getUserEntries()
            
            if (result) {
                userEntries.value = result
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        userEntries,
        whitelistEntries,
        isFetchingSheetDataEntry,
        getWhitelistEntries,
        getUserEntries,
        addToWhiteList,
        updateWhitelistEntry,
        updateUserEntry,
        removeWhitelistEntry,
        updateAccessToApiary,
        getApiaryAccess,
        getHiveAccess,
    }
})