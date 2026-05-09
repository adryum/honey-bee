import { useQuery } from "@tanstack/vue-query"
import { computed, type Ref } from "vue"
import { hiveApi } from "@/core/api/HiveApi"

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
