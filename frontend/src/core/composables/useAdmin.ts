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
            createPopupAction({
                label: "Got apiary access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to get apiary access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: getHiveAccess, isPending: isGettingHiveAccess } = useMutation({
        mutationFn: adminApi.getHiveAccess,
        onSuccess: (access) => {
            createPopupAction({
                label: "Got hive access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to get hive access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: grantApiaryAccess, isPending: isGrantingApiaryAccess } = useMutation({
        mutationFn: adminApi.grantApiaryAccess,
        onSuccess: (access) => {
            createPopupAction({
                label: "Granted apiary access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to grant apiary access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: grantHiveAccess, isPending: isGrantingHiveAccess } = useMutation({
        mutationFn: adminApi.grantHiveAccess,
        onSuccess: (access) => {
            createPopupAction({
                label: "Granted hive access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to grant hive access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: revokeApiaryAccess, isPending: isRevokingApiaryAccess } = useMutation({
        mutationFn: adminApi.revokeApiaryAccess,
        onSuccess: (access) => {
            createPopupAction({
                label: "Revoked apiary access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to revoke apiary access!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: revokeHiveAccess, isPending: isRevokingHiveAccess } = useMutation({
        mutationFn: adminApi.revokeHiveAccess,
        onSuccess: (access) => {
            createPopupAction({
                label: "Revoked hive access!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to revoke hive access!",
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
        grantApiaryAccess,
        grantHiveAccess,
        revokeApiaryAccess,
        revokeHiveAccess,
        getApiaryAccess,
        getHiveAccess,
        updateRegisteredUserEntry,
        updateWhitelistEntry,
        addWhitelistEntry,
        removeWhitelistEntry,
        isGrantingApiaryAccess,
        isGrantingHiveAccess,
        isRevokingApiaryAccess,
        isRevokingHiveAccess,
        isGettingApiaryAccess,
        isGettingHiveAccess,
        isUpdatingRegisteredUserEntry,
        isUpdatingWhitelistEntry,
        isAddingWhitelistEntry,
        isRemovingWhitelistEntry
    }
}
