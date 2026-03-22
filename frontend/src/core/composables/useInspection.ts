import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { inspectionApi } from "../api/InspectionApi";
import { isValidValue } from "../utils/others";

export type InspectionFilters = {
    page:   number   | undefined
    limit:  number   | undefined
    hiveId: number   | undefined
    ids:    number[] | undefined
}

export const useInspections = (
    filters: Ref<InspectionFilters>
) => {
    const queryClient = useQueryClient()

    const { data: inspections, isLoading, isError } = useQuery({
        queryKey: computed(() => ['inspections', filters.value]),
        queryFn:  () => inspectionApi.getInspections(filters.value),
        placeholderData: keepPreviousData
    })


    const nextPage = () => isValidValue(filters.value.page) && filters.value.page++
    const prevPage = () => {
        if (filters.value.page != undefined && filters.value.page > 1) filters.value.page--
    }

    return {
        inspections,
        isLoading,
        isError,
        nextPage,
        prevPage,
    }
}

export const useInspectionMutation = () => {
    const queryClient = useQueryClient()

    const { mutate: create, isPending: isCreatingInspection } = useMutation({
        mutationFn: inspectionApi.create,
        onSuccess: (newInspection) => {
            queryClient.invalidateQueries({ queryKey: ['inspections'] })
        }
    })

    // const { mutate: deleteInspection } = useMutation({
    //     mutationFn: inspectionApi.delete,
    //     onSuccess: (id) => {
    //         queryClient.invalidateQueries({ queryKey: ['inspections'] })
    //     }
    // })

    // const { mutate: updateInspection } = useMutation({
    //     mutationFn: inspectionApi.update,
    //     onSuccess: (updatedInspection) => {
    //         queryClient.invalidateQueries({ queryKey: ['inspections'] })
    //     }
    // })

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
        // deleteInspection,
        // updateInspection
    }
}

// async function createInspection(
//         model:     InspectionCreateRequestModel,
//         callback?: CallbackModel
//     ): Promise<InspectionDB | undefined> {
//         try {
//             const result = await inspectionApiStore.createInspection(model)

//             if (!isValidValue(result)) {
//                 callback?.onFailure();
//                 throw new Error("Failed to create inspections");
//             } else {
//                 callback?.onSuccess("Inspection created successfully");
//             }
            
//             inspections.value = [...inspections.value, result]
//             return result
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     async function getInspections(model: {
//         page:  number,
//         limit: number
//     }): Promise<InspectionDB[] | undefined> {
//         const { page, limit } = model
//         try {
//             const result = await inspectionApiStore.getInspections(page, limit)
//             console.log("result", result);
            
//             if (isValidValue(result)) {
//                 // adds missing inspections
//                 const existingIds = new Set(inspections.value.map(i => i.id));

//                 result.forEach(inspection => {
//                     if (!existingIds.has(inspection.id)) {
//                         inspections.value.push(inspection);
//                         existingIds.add(inspection.id); 
//                     }
//                 });         
//             }
            
//             return result
//         } catch (error) {
//             console.error(error)
//         }
//     }

// import { defineStore } from "pinia"
// import { isValidValue } from '@/core/utils/others'
// import { computed, ref, type Ref } from "vue"
// import type { InspectionDB, InspectionFormUI, InspectionTableEntryModel } from "./Models"
// import { useInspectionApiStore } from "../network/InspectionApiStore"
// import type { InspectionCreateRequestModel } from "../network/Models"
// import type { CallbackModel } from "../models/SupperModels"
// import router from "../router"
// import { useApiaryStore } from "./ApiaryStore"
// import { inspectionApi } from "../api/InspectionApi";

// export const useInspectionStore = defineStore("useInspectionStore", () => {
//     const inspectionApiStore = useInspectionApiStore()
//     const inspections        = ref<InspectionDB[]>([])
//     const apiaryStore        = useApiaryStore()
//     const currentInspectionHives  = ref<{ id: number, name: string }[]>([])
//     const currentInspectionApiary = ref<{ id: number, name: string } | undefined>(undefined)

//     const reviewedInspection = ref<InspectionDB | undefined>(undefined)

//     function startHiveInspection(
//         apiaryId: number
//     ) {
//         router.push(`/inspection/intake/hive/${apiaryId}`)
//     }


//     function startApiaryInspection(
//         apiaryId: number,
//         apiaryName: string
//     ) {
//         // fetch apiary hives
//         const hives = apiaryStore.getApiaryHives(apiaryId)
//         currentInspectionHives.value = hives
//         currentInspectionApiary.value = { id: apiaryId, name: apiaryName }
//         router.push(`/inspection/intake/apiary/${apiaryId}`)
//     }

//     function openInspection(inspectionId: number) {
//         if (!inspections.value.some(i => i.id === inspectionId)) return;

//         reviewedInspection.value = inspections.value.find(i => i.id === inspectionId);
//         router.push(`/inspection/${inspectionId}`)
//     }

    

//     return {
//         inspections,
//         currentInspectionHives,
//         currentInspectionApiary,
//         reviewedInspection,
//         getInspections,
//         createInspection,
//         openInspection,
//         startApiaryInspection,
//         startHiveInspection,
//     }
// })