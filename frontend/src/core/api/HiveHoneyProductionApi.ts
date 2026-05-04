import axios from "axios"
import type { HiveHoneyYieldCreateModel, HiveHoneyYieldGetModel } from "./Models"

export const hiveHoneyYieldApi = {
    create: async (payload: HiveHoneyYieldCreateModel): Promise<HiveHoneyYieldGetModel> => {
        const { data } = await axios.post<HiveHoneyYieldGetModel>(`/hiveHoneyYield`, payload)
        return data
    },

    getHiveHoneyProduction: async (hiveId: number): Promise<HiveHoneyYieldGetModel[]> => {
        const { data } = await axios.get<HiveHoneyYieldGetModel[]>(`/hiveHoneyYield/hive/${hiveId}`)
        return data
    }
}