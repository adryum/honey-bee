import { defineStore } from "pinia"
import { isValidValue } from '@/core/utils/others'
import { ref } from "vue"
import type { InspectionDB, InspectionFormUI, InspectionTableEntryModel } from "./Models"
import { useInspectionApiStore } from "../network/InspectionApiStore"
import type { InspectionCreateRequestModel } from "../network/Models"
import type { CallbackModel } from "../models/SupperModels"
import router from "../router"
import { useApiaryStore } from "./ApiaryStore"

export const useInspectionStore = defineStore("useInspectionStore", () => {
    const inspectionApiStore = useInspectionApiStore()
    const inspections        = ref<InspectionDB[]>([])
    const apiaryStore        = useApiaryStore()
    const currentInspectionHives  = ref<{ id: number, name: string }[]>([])
    const currentInspectionApiary = ref<{ id: number, name: string } | undefined>(undefined)

    const reviewedInspection = ref<InspectionDB | undefined>(undefined)

    function startHiveInspection(
        apiaryId: number
    ) {
        router.push(`/inspection/intake/hive/${apiaryId}`)
    }


    function startApiaryInspection(
        apiaryId: number,
        apiaryName: string
    ) {
        // fetch apiary hives
        const hives = apiaryStore.getApiaryHives(apiaryId)
        currentInspectionHives.value = hives
        currentInspectionApiary.value = { id: apiaryId, name: apiaryName }
        router.push(`/inspection/intake/apiary/${apiaryId}`)
    }

    function openInspection(inspectionId: number) {
        if (!inspections.value.some(i => i.id === inspectionId)) return;

        reviewedInspection.value = inspections.value.find(i => i.id === inspectionId);
        router.push(`/inspection/${inspectionId}`)
    }

    async function createInspection(
        model:     InspectionCreateRequestModel,
        callback?: CallbackModel
    ): Promise<InspectionDB | undefined> {
        try {
            const result = await inspectionApiStore.createInspection(model)

            if (!isValidValue(result)) {
                callback?.onFailure();
                throw new Error("Failed to create inspections");
            } else {
                callback?.onSuccess("Inspection created successfully");
            }
            
            inspections.value = [...inspections.value, result]
            return result
        } catch (error) {
            console.error(error)
        }
    }

    async function getInspections(model: {
        page:  number,
        limit: number
    }): Promise<InspectionDB[] | undefined> {
        const { page, limit } = model
        try {
            const result = await inspectionApiStore.getInspections(page, limit)
            console.log("result", result);
            
            if (isValidValue(result)) {
                // adds missing inspections
                const existingIds = new Set(inspections.value.map(i => i.id));

                result.forEach(inspection => {
                    if (!existingIds.has(inspection.id)) {
                        inspections.value.push(inspection);
                        existingIds.add(inspection.id); 
                    }
                });         
            }
            
            return result
        } catch (error) {
            console.error(error)
        }
    }

    return {
        inspections,
        currentInspectionHives,
        currentInspectionApiary,
        reviewedInspection,
        getInspections,
        createInspection,
        openInspection,
        startApiaryInspection,
        startHiveInspection,
    }
})