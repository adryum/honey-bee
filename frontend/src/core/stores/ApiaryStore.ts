import { defineStore } from "pinia"
import { isValidValue } from '@/core/utils/others'
import type { ApiaryModelDB } from "./Models"
import { ref } from "vue"
import { useApiaryApiStore } from "../network/ApiaryApiStore"
import type { ApiaryCreateRequestModel, HiveAssignRequestModel, HiveAssignResponseModel } from "../network/Models"
import router, { RouterViews } from "../router"

export const useApiaryStore = defineStore("Apiary store", () => {
    const apiaryApiStore = useApiaryApiStore()

    const apiaries = ref<ApiaryModelDB[]>([])
    const selectedApiary = ref<ApiaryModelDB | undefined>(undefined)

    const isCreatingApiary = ref(false)

    function openApiary(id: number) {
        selectedApiary.value = apiaries.value.find(apiary => apiary.id === id)
        router.push(RouterViews.ApiaryHives)
    }

    async function initialize() {
        await getApiaries()
    }

    async function getApiaries() {
        try {
            const result = await apiaryApiStore.getApiaries()

        } catch (error) {
            
        }
    }

    async function createApiary(
        createApiaryModel: ApiaryCreateRequestModel
    ): Promise<ApiaryModelDB | undefined> {
        try {
            const result = await apiaryApiStore.createApiary(createApiaryModel)
            if (!result) throw new Error("Failed to create apiary");

            apiaries.value.push(result)
            
            return result
        } catch (error) {
            console.error(error);
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
        createApiary,
        deleteApiary,
        assignHive,
        unassignHive,
        openApiary,
        initialize
    }
})