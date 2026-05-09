import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { ActionType, useActionsStore } from "../../stores/ActionStore"
import { computed, type Ref } from "vue"
import { hiveApi } from "@/core/api/HiveApi"

export const useHiveActionHistoryQuery = (model: { 
    hiveId: Ref<number | undefined> 
}) => {
    const { data: history, isLoading: isGettingHistory, isError: isGettingHistoryError } = useQuery({
        queryKey: ["hives-action-history", model.hiveId],
        queryFn:  () => hiveApi.history.action.getFromHive(model.hiveId.value!),
        enabled:  computed(() => model.hiveId.value !== undefined),
    })

    return {
        history,
        isGettingHistory,
        isGettingHistoryError,
    }
}

export const useHiveActionHistoryMutations = () => {
    const { createPopupAction } = useActionsStore()
    const queryClient = useQueryClient()
    
    const { mutate: create, isPending: isCreatingHistory } = useMutation({
        mutationFn: hiveApi.history.action.create,
        onSuccess: (newHistory) => {
            queryClient.invalidateQueries({ queryKey: ['hives-action-history'] })
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