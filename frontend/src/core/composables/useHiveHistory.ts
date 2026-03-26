import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { hiveHistoryApi } from "../api/HiveHistoryApi"
import { ActionType, useActionsStore } from "../stores/ActionStore"
import { computed, type Ref } from "vue"

export const useHiveHistoryQuery = (
    { hiveId }: { hiveId: Ref<number | undefined> }
) => {
    const { data: history, isLoading: isGettingHistory, isError: isGettingHistoryError } = useQuery({
        queryKey: ["hivesHistory", hiveId],
        queryFn:  () => hiveHistoryApi.getHistory(hiveId.value!),
        enabled:  computed(() => hiveId.value !== undefined),
    })

    return {
        history,
        isGettingHistory,
        isGettingHistoryError,
    }
}

export const useHiveHistoryMutations = () => {
    const { createPopupAction } = useActionsStore()
    const queryClient = useQueryClient()
    

    const { mutate: create, isPending: isCreatingHistory } = useMutation({
        mutationFn: hiveHistoryApi.createHistory,
        onSuccess: (newHistory) => {
            queryClient.invalidateQueries({ queryKey: ['hivesHistory'] })
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