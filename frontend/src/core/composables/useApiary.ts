import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { apiaryApi } from "../api/ApiaryApi";
import { computed, type Ref } from "vue";
import { ActionType, useActionsStore } from "../stores/ActionStore";
import { useApiaryHistoryMutations } from "./useApiaryHistory";
import { HistoryActionType } from "../DatabaseEnums";
import type { DateRange } from "../stores/Models";

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
    id:              Ref<number | undefined>
    getApiaryHives?: boolean
    getApiary?:      boolean
    getHiveYields?:  DateRange | false
}

export const useApiaryQuery = (model: UseApiaryQueryModel) => {
    const { getApiary, getApiaryHives, getHiveYields } = model

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

    const { data: hiveYields, isLoading: isGettingHiveYields, isError: isGettingHivesYieldsError } = useQuery({
        queryKey: ["hives-yields", { apiaryId: model.id }],
        queryFn:  () => apiaryApi.getHiveYields(model.id.value!, getHiveYields as DateRange),
        enabled:  computed(() => model.id.value !== undefined && !!getHiveYields)
    })

    return {
        apiary,
        isGettingApiary,
        isGettingApiaryError,
        hives,
        isGettingHives,
        isGettingHivesError,
        hiveYields,
        isGettingHiveYields,
        isGettingHivesYieldsError
    }
}

export const useApiaryMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction } = useActionsStore()
    const { create: createApiaryHistory } = useApiaryHistoryMutations()

    const { mutate: create, isPending: isCreatingApiary } = useMutation({
        mutationFn: apiaryApi.createApiary,
        onSuccess: (newApiary) => {
            queryClient.invalidateQueries({ queryKey: ['apiaries'] })

            createApiaryHistory({
                apiaryId: newApiary.id,
                text: "Created apiary",
                type: HistoryActionType.EDIT
            })

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

            console.log("assing result", JSON.stringify(result, null, 2));
            
            if (result.previousApiary) {
                createApiaryHistory({
                    apiaryId: result.newApiary.id,
                    text: `Added hive #${result.hive.id} from apiary #${result.previousApiary.id}`,
                    type: HistoryActionType.EDIT
                })
                createApiaryHistory({
                    apiaryId: result.previousApiary.id,
                    text: `Moved hive #${result.hive.id} to apiary #${result.newApiary.id} `,
                    type: HistoryActionType.EDIT
                })
            } else {
                createApiaryHistory({
                    apiaryId: result.newApiary.id,
                    text: `Added hive #${result.hive.id}`,
                    type: HistoryActionType.EDIT
                })
            }

            createPopupAction({
                label: `Added hive #${result.hive.id} to apiary ${result.newApiary.name}`,
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