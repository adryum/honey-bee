import { defineStore } from "pinia"
import type { CallbackModel } from "../models/SupperModels"
import { ref } from "vue"
import type { HiveCreateModel, HiveModelDB } from "./Models"
import { useHiveApiStore } from "../network/HiveApiStore"
import { isValidValue } from "../utils/others"
import type { HiveCreateRequestModel, HiveUpdateRequestModel } from "../network/Models"
import router, { RouterViewPaths } from "../router"
import { useApiaryStore } from "./ApiaryStore"

export const useHiveStore = defineStore("hiveStore", () => {
    const apiaryStore = useApiaryStore()
    const hiveApiStore = useHiveApiStore()
    const hives = ref<HiveModelDB[]>([])
    const selectedHive = ref<HiveModelDB | undefined>(undefined)

    const isCreatingHive = ref(false)

    async function initialize() {
        await getHives()
    }

    function openHive(hive: HiveModelDB) {
        selectedHive.value = hive
        router.push(RouterViewPaths.HiveOverview)
    }

    async function assignHive(
        hive: HiveModelDB,
        apiaryId: number,
        callback?: CallbackModel
    ) {
        try {
            const fromApiaryId = hive.apiaryId
            const toApiaryId = apiaryId

            const payload: HiveUpdateRequestModel = {
                id:          hive.id,
                name:        hive.name,
                description: hive.description,
                image:       undefined,
                type:        hive.type,
                apiaryId:    apiaryId
            }

            const result = await hiveApiStore.updateHive(payload);
            if (result) {
                hives.value.replace(result, (hive) => hive.id === result.id)
                apiaryStore.countHivesInApiaries()
                callback?.onSuccess("")
            } else {
                callback?.onFailure()
                throw new Error("Failed to assign hive");
            }
        } catch (error) {
            console.error(error);
        } 
    }

    async function getHives() {
        try {
            const result = await hiveApiStore.getHives()
            if (!result) return

            hives.value = result
        } catch (error) {
            console.error(error);
        }
    }

    async function updateHive(
        updateModel: HiveUpdateRequestModel, 
        callback: CallbackModel
    ): Promise<HiveModelDB | undefined> {
        console.log("updating hive");
        try {
            const result = await hiveApiStore.updateHive(updateModel)

            if (result) {
                callback.onSuccess("Updated hive")
                console.log("Success bro@");
                
                hives.value.replace(result, (hive) => hive.id === result.id)
            } else {
                callback.onFailure()
            }
            
            return result
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function createHive(
        hive: HiveCreateRequestModel, 
        callback: CallbackModel
    ): Promise<HiveModelDB | undefined> {
        try {
            const result = await hiveApiStore.createHive(hive)
            
            if (result) {
                hives.value.push(result)
                apiaryStore.countHivesInApiaries()
                callback.onSuccess("")
            } else {
                callback.onFailure()
            }

            return result
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function deleteHive(
        id: number,
        callback: CallbackModel
    ): Promise<number | undefined> {
        try {
            const result = await hiveApiStore.deleteHive(id)
            
            if (isValidValue(result)) {
                // const store = useApiaryStore()
                // const apiaryId = this.hives.find(hive => hive.id === hiveId)!.apiaryId
                // store.unassignHive({ apiaryId })

                // this.hives = this.hives.filter(hive => hive.id !== hiveId)
                // this.apiaryHives = this.apiaryHives.filter(hive => hive.id !== hiveId)

                callback.onSuccess("")
            } else {
                callback.onFailure()
            }

            return result
        } catch (error) {
            console.error(error);
        } 
    }

    return {
        hives,
        selectedHive,
        initialize,
        updateHive,
        createHive,
        deleteHive,
        openHive,
        assignHive
    }
})