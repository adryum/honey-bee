import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { hiveApi } from "../../api/HiveApi";
import { computed, unref, type MaybeRef, type Ref } from "vue";
import { ActionType, useActionsStore } from "../../stores/ActionStore";
import { HistoryActionType } from "../../DatabaseEnums";
import { useHiveActionHistoryMutations } from "./useHiveActionHistory";

export const useHiveQuery = (model: { 
    id: Ref<number | undefined>
}) => {
    const { data: hive, isLoading: isGettingHives, isError: isGettingHivesError } = useQuery({
        queryKey: ["hives", model.id],
        queryFn:  () => hiveApi.get(model.id.value!),
        enabled:  computed(() => model.id.value !== undefined)
    })

    return {        
        hive,
        isGettingHives,
        isGettingHivesError,
    }
}

export const useHivesQuery = (model: { 
    apiaryId: MaybeRef<number | undefined>
}) => {
    const { data: hives, isLoading, isError } = useQuery({
        queryKey: computed(() => ["hives", { apiaryId: unref(model.apiaryId) }]),
        queryFn:  () => hiveApi.getFromApiary(unref(model.apiaryId))
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

    return {
        create,
        remove,
        update,
        isCreatingHive,
        isDeletingHive,
        isUpdatingHive
    }
}
