import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { computed, type Ref } from "vue"
import { hiveApi } from "@/core/api/HiveApi"
import { ActionType, useActionsStore } from "@/core/stores/ActionStore"

export const useHiveQueenHistoryQuery = (model: { 
    hiveId: Ref<number | undefined> 
}) => {
    const { data: history, isLoading: isGettingHistory, isError: isGettingHistoryError } = useQuery({
        queryKey: ["hives-queen-history", model.hiveId],
        queryFn:  () => hiveApi.history.queen.getFromHive(model.hiveId.value!),
        enabled:  computed(() => model.hiveId.value !== undefined),
    })

    return {
        history,
        isGettingHistory,
        isGettingHistoryError,
    }
}

export const useHiveQueenHistoryMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction } = useActionsStore()

    const { mutate: create, isPending: isCreatingHistoryEntry } = useMutation({
        mutationFn: hiveApi.history.queen.create,
        onSuccess: (newEntry) => {
            queryClient.invalidateQueries({ queryKey: ['hives-queen-history'] })
            createPopupAction({
                label: `Added new queen history entry for hive ${newEntry.hiveId}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to add new queen history entry!",
                type:  ActionType.Error
            }) 
        }
    })

    return {
        create,
        isCreatingHistoryEntry
    }
}