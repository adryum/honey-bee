import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { adminApi } from "../api/AdminApi";
import { ActionType, useActionsStore } from "../stores/ActionStore";

export const useAdminQuery = () => {
    const { 
        data: whitelistEntries, 
        isLoading: isLoadingWhitelistEntries, 
        isError: isErrorWhitelistEntries 
    } = useQuery({
        queryKey: ["whitelistEntries"],
        queryFn: adminApi.getWhitelistEntries,
    })

    const { 
        data: registeredUserEntries, 
        isLoading: isLoadingRegisteredUserEntries, 
        isError: isErrorRegisteredUserEntries 
    } = useQuery({
        queryKey: ["registeredUserEntries"],
        queryFn: adminApi.getRegisteredUserEntries,
    })

    return {
        whitelistEntries,
        isLoadingWhitelistEntries,
        isErrorWhitelistEntries,
        registeredUserEntries,
        isLoadingRegisteredUserEntries,
        isErrorRegisteredUserEntries
    }
}

export const useAdminMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction } = useActionsStore()

    const { mutate: getApiaryAccess, isPending: isGettingApiaryAccess } = useMutation({
        mutationFn: adminApi.getApiaryAccess,
        onSuccess: (access) => {

        }
    })

    const { mutate: getHiveAccess, isPending: isGettingHiveAccess } = useMutation({
        mutationFn: adminApi.getHiveAccess,
        onSuccess: (access) => {

        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to get hive access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: updateAccessToApiary, isPending: isUpdatingAccessToApiary } = useMutation({
        mutationFn: adminApi.updateAccessToApiary,
        onSuccess: (access) => {
            createPopupAction({
                label: "Updated apiary access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update apiary access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: updateAccessToHive, isPending: isUpdatingAccessToHive } = useMutation({
        mutationFn: adminApi.updateAccessToHive,
        onSuccess: (access) => {
            createPopupAction({
                label: "Updated hive access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update hive access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: updateRegisteredUserEntry, isPending: isUpdatingRegisteredUserEntry } = useMutation({
        mutationFn: adminApi.updateUserEntry,
        onSuccess: async (newUserEntry) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
            await queryClient.invalidateQueries({ queryKey: ["registeredUserEntries"] })

            createPopupAction({
                label: "Updated registered user entry!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update registered user entry!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: updateWhitelistEntry, isPending: isUpdatingWhitelistEntry } = useMutation({
        mutationFn: adminApi.updateWhitelistEntry,
        onSuccess: async (newWhitelistEntry) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
            await queryClient.invalidateQueries({ queryKey: ["registeredUserEntries"] })

            createPopupAction({
                label: "Updated whitelist entry!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update whitelist entry!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: addWhitelistEntry, isPending: isAddingWhitelistEntry } = useMutation({
        mutationFn: adminApi.addToWhitelist,
        onSuccess: async (newWhitelistEntry) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })

            createPopupAction({
                label: "Added whitelist entry!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to add whitelist entry!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: removeWhitelistEntry, isPending: isRemovingWhitelistEntry } = useMutation({
        mutationFn: adminApi.removeFromWhitelist,
        onSuccess: async (id) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
            await queryClient.invalidateQueries({ queryKey: ["registeredUserEntries"] })
            
            createPopupAction({
                label: "Removed whitelist entry!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to remove whitelist entry!",
                type:  ActionType.Error
            })
        }
    })

    return {
        getApiaryAccess,
        getHiveAccess,
        updateAccessToApiary,
        updateAccessToHive,
        updateRegisteredUserEntry,
        updateWhitelistEntry,
        addWhitelistEntry,
        removeWhitelistEntry,
        isGettingApiaryAccess,
        isGettingHiveAccess,
        isUpdatingAccessToApiary,
        isUpdatingAccessToHive,
        isUpdatingRegisteredUserEntry,
        isUpdatingWhitelistEntry,
        isAddingWhitelistEntry,
        isRemovingWhitelistEntry
    }
}
