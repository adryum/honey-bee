import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { inspectionApi } from "../api/InspectionApi";
import { isValidValue } from "../utils/others";
import { ActionType, useActionsStore } from "../stores/ActionStore";
import { useHiveHistoryMutations } from "./useHiveHistory";
import { HistoryActionType } from "../DatabaseEnums";

export type InspectionFilters = {
    page?:   number   
    limit?:  number   
    hiveId?: number   
    ids?:    number[]
}

export const useInspectionsQuery = (
    filters: Ref<InspectionFilters>
) => {
    const { data: inspectionTableEntries, isLoading, isError } = useQuery({
        queryKey:  ['inspections', filters],
        queryFn:  () => inspectionApi.getInspectionTableEntries(filters.value)
    })

    const nextPage = () => isValidValue(filters.value.page) && filters.value.page++
    const prevPage = () => {
        if (filters.value.page != undefined && filters.value.page > 1) filters.value.page--
    }

    return {
        inspectionTableEntries,
        isLoading,
        isError,
        nextPage,
        prevPage,
    }
}

export const useInspectionQuery = (
    model: { 
        id: number 
        allowFetching: Ref<boolean>
    }
) => {
    const { data: inspection, isLoading, isError } = useQuery({
        queryKey: computed(() => ['inspections', model.id]),
        queryFn:  () => inspectionApi.getInspection(model.id),
        placeholderData: keepPreviousData,
        enabled: model.allowFetching
    })

    return {
        inspection,
        isLoading,
        isError,
    }
}

export const useInspectionMutation = () => {
    const queryClient = useQueryClient()
    const { createPopupAction }= useActionsStore()
    const { create: createHiveHistory } = useHiveHistoryMutations()

    const { mutate: create, isPending: isCreatingInspection } = useMutation({
        mutationFn: inspectionApi.create,
        onSuccess: (newInspection) => {
            console.log("Created inspection!");
            queryClient.invalidateQueries({ queryKey: ['inspections'] })

            createPopupAction({
                label: "Inspection submitted successfully!",
                type:  ActionType.Success
            })

            newInspection.forms.map(form => 
                createHiveHistory({
                    hiveId: form.hiveId,
                    text:   "Created inspection",
                    type:   HistoryActionType.INSPECTION
                })
            )
        },
        onError: (error) => {
            useActionsStore().createPopupAction({
                label: "Failed to submit inspection!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: remove, isPending: isRemovingInspection } = useMutation({
        mutationFn: inspectionApi.remove,
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['inspections'] })
      
            createPopupAction({
                label: "Inspection removed!",
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            useActionsStore().createPopupAction({
                label: "Failed to remove inspection!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: processInspection, isPending: isProcessingInspection } = useMutation({
        mutationFn: inspectionApi.processInspection,
        onSuccess: (updatedInspection) => {
            queryClient.invalidateQueries({ queryKey: ['inspections'] })

            createPopupAction({
                label: "Inspection processed!",
                type:  ActionType.Success
            })
        }
    })

    const { mutate: exportInspections, isPending: isExportingInspections } = useMutation({
        // mutationFn: () => inspectionApi.exportCsv(filters.value),
        // onSuccess: (blob) => {
        //     // trigger browser download
        //     const url = URL.createObjectURL(blob)
        //     const a = document.createElement('a')
        //     a.href = url
        //     a.download = 'inspections.csv'
        //     a.click()
        //     URL.revokeObjectURL(url)
        // },
        // onError: (error) => {
        //     toast.error('Export failed')
        // }
    })

    return {
        create,
        exportInspections,
        isCreatingInspection,
        isExportingInspections,
        remove, 
        isRemovingInspection,
        processInspection,
        isProcessingInspection,
        // deleteInspection,
        // updateInspection
    }
}
