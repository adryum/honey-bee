import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { apiaryApi } from "../api/ApiaryApi";
import { computed, type Ref } from "vue";
import { ActionType, useActionsStore } from "../stores/ActionStore";

export const useApiariesQuery = () => {
    const { data: apiaries, isLoading, isError } = useQuery({
        queryKey: ["apiaries"],
        queryFn:  apiaryApi.getApiaries
    })

    return {
        apiaries,
        isLoading,
        isError,
    }
}

export type UseApiaryQueryModel = {
    id :             Ref<number | undefined>
    getApiaryHives?: boolean,
    getApiary?:      boolean
}

export const useApiaryQuery = (model: UseApiaryQueryModel) => {
    const { getApiary, getApiaryHives } = model
    const { data: apiary, isLoading: isGettingApiary, isError: isGettingApiaryError } = useQuery({
        queryKey: ["apiaries", model.id],
        queryFn:  () => apiaryApi.getApiary(model.id.value!),
        enabled:  computed(() => model.id.value !== undefined && getApiary)
    })

    const { data: hives, isLoading: isGettingHives, isError: isGettingHivesError } = useQuery({
        queryKey: ["hives", { apiaryId: model.id }],
        queryFn:  () => apiaryApi.getApiaryHives(model.id.value!),
        enabled:  computed(() => model.id.value !== undefined && getApiaryHives)
    })

    return {
        apiary,
        isGettingApiary,
        isGettingApiaryError,
        hives,
        isGettingHives,
        isGettingHivesError
    }
}

export const useApiaryMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction } = useActionsStore()

    const { mutate: create, isPending: isCreatingApiary } = useMutation({
        mutationFn: apiaryApi.createApiary,
        onSuccess: (newApiary) => {
            queryClient.invalidateQueries({ queryKey: ['apiaries'] })

            createPopupAction({
                label: `Created apiary: ${newApiary.name}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to create apiary!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: remove, isPending: isDeletingApiary } = useMutation({
        mutationFn: apiaryApi.deleteApiary,
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['apiaries'] })

            createPopupAction({
                label: `Deleted apiary: ${id}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to delete apiary!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: assignHive, isPending: isAssigningHive } = useMutation({
        mutationFn: apiaryApi.assignHive,
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })
            queryClient.invalidateQueries({ queryKey: ['apiaries'] })

            createPopupAction({
                label: `Assigned hive ${result.hiveId} to apiary ${result.apiaryId}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to assign hive!",
                type:  ActionType.Error
            })
        }
    })

    // const { mutate: unassignHive, isPending: isUnassigningHive } = useMutation({
    //     mutationFn: apiaryApi.unassignHive,
    //     onSuccess: (result) => {
    //         queryClient.invalidateQueries({ queryKey: ['apiaries'] })
    //     }
    // })

      // const { mutate: updateApiary } = useMutation({
    //     mutationFn: apiaryApi.updateApiary,
    //     onSuccess: (updatedApiary) => {
    //         queryClient.invalidateQueries({ queryKey: ['apiaries'] })
    //     }
    // })

    return {
        create,
        remove,
        assignHive,
        isCreatingApiary,
        isDeletingApiary,
        isAssigningHive,
    }
}