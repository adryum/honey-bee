import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { ActionType, useActionsStore } from "../stores/ActionStore"
import { computed, type Ref } from "vue"
import { hiveHoneyProductionApi } from "../api/HiveHoneyProductionApi"

export const useHiveHoneyProductionQuery = (
    { hiveId }: { hiveId: Ref<number | undefined> }
) => {
    const { data: production, isLoading: isGettingProduction, isError: isGettingProductionError } = useQuery({
        queryKey: ["hivesHoneyProduction", hiveId],
        queryFn:  () => hiveHoneyProductionApi.getHiveHoneyProduction(hiveId.value!),
        enabled:  computed(() => hiveId.value !== undefined),
    })

    return {
        production,
        isGettingProduction,
        isGettingProductionError,
    }
}

export const useHiveHoneyProductionMutations = () => {
    const { createPopupAction } = useActionsStore()
    const queryClient = useQueryClient()

    const { mutate: create, isPending: isCreatingProduction } = useMutation({
        mutationFn: hiveHoneyProductionApi.create,
        onSuccess: (newProduction) => {
            queryClient.invalidateQueries({ queryKey: ['hivesHoneyProduction'] })

            createPopupAction({
                label: "Created new honey production entry!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to create honey production entry!",
                type:  ActionType.Error
            })
        }
    })

    return {
        create,
        isCreatingProduction
    }
}
