import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { adminApi } from "../api/AdminApi";

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

export const useAdminMutation = () => {
    const queryClient = useQueryClient()

    const { mutate: getApiaryAccess, isPending: isGettingApiaryAccess } = useMutation({
        mutationFn: adminApi.getApiaryAccess,
        onSuccess: (access) => {

        }
    })

    const { mutate: getHiveAccess, isPending: isGettingHiveAccess } = useMutation({
        mutationFn: adminApi.getHiveAccess,
        onSuccess: (access) => {

        }
    })

    const { mutate: updateAccessToApiary, isPending: isUpdatingAccessToApiary } = useMutation({
        mutationFn: adminApi.updateAccessToApiary,
        onSuccess: (access) => {

        }
    })

    const { mutate: updateAccessToHive, isPending: isUpdatingAccessToHive } = useMutation({
        mutationFn: adminApi.updateAccessToHive,
        onSuccess: (access) => {

        }
    })

    const { mutate: updateRegisteredUserEntry, isPending: isUpdatingRegisteredUserEntry } = useMutation({
        mutationFn: adminApi.updateUserEntry,
        onSuccess: async (newUserEntry) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
            await queryClient.invalidateQueries({ queryKey: ["registeredUserEntries"] })
        }
    })

    const { mutate: updateWhitelistEntry, isPending: isUpdatingWhitelistEntry } = useMutation({
        mutationFn: adminApi.updateWhitelistEntry,
        onSuccess: async (newWhitelistEntry) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
            await queryClient.invalidateQueries({ queryKey: ["registeredUserEntries"] })
        }
    })

    const { mutate: addWhitelistEntry, isPending: isAddingWhitelistEntry } = useMutation({
        mutationFn: adminApi.addToWhitelist,
        onSuccess: async (newWhitelistEntry) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
        }
    })

    const { mutate: removeWhitelistEntry, isPending: isRemovingWhitelistEntry } = useMutation({
        mutationFn: adminApi.removeFromWhitelist,
        onSuccess: async (id) => {
            await queryClient.invalidateQueries({ queryKey: ['whitelistEntries'] })
            await queryClient.invalidateQueries({ queryKey: ["registeredUserEntries"] })
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
