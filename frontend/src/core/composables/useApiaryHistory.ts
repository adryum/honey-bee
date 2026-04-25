import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { ActionType, useActionsStore } from "../stores/ActionStore"
import { computed, type Ref } from "vue"
import { apiaryHistoryApi } from "../api/ApiaryHistoryApi"

export const useApiaryHistoryQuery = (
    { apiaryId }: { apiaryId: Ref<number | undefined> }
) => {
    const { data: history, isLoading: isGettingHistory, isError: isGettingHistoryError } = useQuery({
        queryKey: ["apiary-history", apiaryId],
        queryFn:  () => apiaryHistoryApi.getHistory(apiaryId.value!),
        enabled:  computed(() => apiaryId.value !== undefined),
    })

    return {
        history,
        isGettingHistory,
        isGettingHistoryError,
    }
}

export const useApiaryHistoryMutations = () => {
    const { createPopupAction } = useActionsStore()
    const queryClient = useQueryClient()
    
    const { mutate: create, isPending: isCreatingHistory } = useMutation({
        mutationFn: apiaryHistoryApi.createHistory,
        onSuccess: (newHistory) => {
            queryClient.invalidateQueries({ queryKey: ['apiary-history'] })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to create history entry!",
                type:  ActionType.Error
            })
        }
    })

    return {
        create,
        isCreatingHistory,
    }
}