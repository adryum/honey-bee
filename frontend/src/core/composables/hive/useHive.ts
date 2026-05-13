import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { hiveApi } from "../../api/HiveApi";
import { computed, unref, type MaybeRef, type Ref } from "vue";
import { ActionType, useActionsStore } from "../../stores/ActionStore";
import { HistoryActionType } from "../../DatabaseEnums";
import { useHiveActionHistoryMutations } from "./useHiveActionHistory";
import type { DateRange } from "@/core/stores/Models";

export const useHiveQuery = (model: { 
    id: Ref<number | undefined>,
    getHiveYields?:  DateRange | false
}) => {
    const { data: hive, isLoading: isGettingHives, isError: isGettingHivesError } = useQuery({
        queryKey: ["hives", model.id],
        queryFn:  () => hiveApi.get(model.id.value!),
        enabled:  computed(() => model.id.value !== undefined)
    })

    const { data: yields, isLoading: isGettingYields, isError: isGettingYieldError } = useQuery({
        queryKey: ["hives-yields", { hiveId: model.id }],
        queryFn:  () => hiveApi.yields.getFromHive(model.id.value!, model.getHiveYields as DateRange),
        enabled:  computed(() => model.id.value !== undefined && !!model.getHiveYields)
    })

    return {        
        hive,
        isGettingHives,
        isGettingHivesError,
        yields,
        isGettingYields,
        isGettingYieldError
    }
}

export const useHivesQuery = (model: { 
    hiveIds?:   MaybeRef<number[] | undefined>
    apiaryIds?: MaybeRef<number[] | undefined>
    fireOnEmptyQuery?: boolean
}) => {
    const { data: hives, isLoading, isError } = useQuery({
        queryKey: computed(() => ["hives", { 
            hiveIds: unref(model.hiveIds),
            apiaryIds: unref(model.apiaryIds) 
        }]),
        queryFn:  () => {
            console.log(unref(model.hiveIds), unref(model.apiaryIds));
             
            return hiveApi.getAll({
                hiveIds: unref(model.hiveIds),
                apiaryIds: unref(model.apiaryIds)
            })
        },
        enabled: model.fireOnEmptyQuery
    })

    return {
        hives,
        isLoading,
        isError,
    }
}

export const useHiveMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction } = useActionsStore()
    const actionHistoryMutations = useHiveActionHistoryMutations()

    const { mutate: create, isPending: isCreatingHive } = useMutation({
        mutationFn: hiveApi.create,
        onSuccess: (newHive) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })
            
            actionHistoryMutations.create({
                hiveId: newHive.id,
                text: "Created hive",
                type: HistoryActionType.EDIT
            })

            createPopupAction({
                label: `Created hive: ${newHive.name}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to create hive!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: remove, isPending: isDeletingHive } = useMutation({
        mutationFn: hiveApi.delete,
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })
            createPopupAction({
                label: `Deleted hive: ${id}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to delete hive!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: update, isPending: isUpdatingHive } = useMutation({
        mutationFn: hiveApi.update,
        onSuccess: (updatedHive) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })

            actionHistoryMutations.create({
                hiveId: updatedHive.id,
                text: "Updated hive information",
                type: HistoryActionType.EDIT
            })

            createPopupAction({
                label: `Updated hive: ${updatedHive.name}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update hive!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: createYield, isPending: isCreatingYields } = useMutation({
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
        remove,
        update,
        createYield,
        isCreatingYields,
        isCreatingHive,
        isDeletingHive,
        isUpdatingHive
    }
}
