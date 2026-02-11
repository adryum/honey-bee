import { defineStore } from "pinia"
import { isValidValue } from '@/core/utils/others'
import type { ApiaryModelDB } from "./Models"
import { ref } from "vue"
import { useApiaryApiStore } from "../network/ApiaryApiStore"
import type { ApiaryCreateRequestModel, HiveAssignRequestModel, HiveAssignResponseModel } from "../network/Models"
import router, { RouterViewPaths } from "../router"
import type { CallbackModel } from "../models/SupperModels"
import { useHiveStore } from "./HiveStore"

export const useApiaryStore = defineStore("Apiary store", () => {
    const apiaryApiStore = useApiaryApiStore()
    const hiveStore = useHiveStore()

    const apiaries = ref<ApiaryModelDB[]>([])
    const selectedApiary = ref<ApiaryModelDB | undefined>(undefined)

    const isCreatingApiary = ref(false)

    function countHivesInApiaries() {
        for (const hive of hiveStore.hives) {
            if (!isValidValue(hive.apiaryId)) continue

            const apiary = apiaries.value.find(apiary => apiary.id === hive.apiaryId)
            if (apiary) apiary.hiveCount++
        }
    }

    function openApiary(id: number) {
        selectedApiary.value = apiaries.value.find(apiary => apiary.id === id)
        router.push(RouterViewPaths.ApiaryHives)
    }

    async function initialize() {
        await getApiaries()
    }

    async function getApiaries() {
        try {
            const result = await apiaryApiStore.getApiaries()
            if (!result) throw new Error("Failed to fetch apiaries");

            apiaries.value = result
        } catch (error) {
            
        }
    }

    async function createApiary(
        createApiaryModel: ApiaryCreateRequestModel,
        callbacks?: CallbackModel
    ): Promise<ApiaryModelDB | undefined> {
        try {
            const result = await apiaryApiStore.createApiary(createApiaryModel)
            if (!result) throw new Error("Failed to create apiary");

            apiaries.value.push(result)
            callbacks?.onSuccess?.("")

            return result
        } catch (error) {
            console.error(error);
            callbacks?.onFailure?.()
        }
    }

    async function deleteApiary(
        id: number
    ) {
        try {
            const result = await apiaryApiStore.deleteApiary(id)
            if (!isValidValue(result)) throw new Error("Failed to create apiary");

            apiaries.value = apiaries.value.filter(apiary => apiary.id !== id)

            return result
        } catch (error) {
            console.error(error)
        }
    }

    async function assignHive(
        assignRequest: HiveAssignRequestModel
    ): Promise<HiveAssignResponseModel | undefined> {
        try {
            const result = await apiaryApiStore.assignHive(assignRequest)
            if (!result) throw new Error("Failed to assign hive");

            // change hive apiary id
            return result
        } catch (error) {
            console.error(error)
        }
    }

    async function unassignHive(
        id: number
    ): Promise<number | undefined> {
        try {
            const result = await apiaryApiStore.unassignHive(id)

            if (!isValidValue(result)) throw new Error("Failed to unassign hive");

            return result
        } catch (error) {
            console.error(error)
        }
    }

    return {
        apiaries,
        selectedApiary,
        isCreatingApiary,
        createApiary,
        deleteApiary,
        assignHive,
        unassignHive,
        openApiary,
        initialize,
        countHivesInApiaries
    }
})