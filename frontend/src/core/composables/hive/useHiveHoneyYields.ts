import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { ActionType, useActionsStore } from "../../stores/ActionStore"
import { computed, type Ref } from "vue"
import { hiveApi } from "@/core/api/HiveApi"

export const useHiveHoneyProductionQuery = (model: { 
    hiveId: Ref<number | undefined> 
}) => {
    const { data: production, isLoading: isGettingProduction, isError: isGettingProductionError } = useQuery({
        queryKey: ["hives-honey-yields", model.hiveId],
        queryFn:  () => hiveApi.yields.getFromHive(model.hiveId.value!),
        enabled:  computed(() => model.hiveId.value !== undefined),
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

    const { mutate: create, isPending: isCreatingYields } = useMutation({
        mutationFn: hiveApi.yields.create,
        onSuccess: (newProduction) => {
            queryClient.invalidateQueries({ queryKey: ['hives-honey-yields'] })
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
        isCreatingYields
    }
}
