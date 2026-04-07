import axios from "axios"

type HiveHoneyProductionCreateModel = {
    amount:       number
    inspectionId: number
    hiveId:       number
}

type HiveHoneyProductionGetModel = {
    id:           number
    amount:       number
    inspectionId: number
    hiveId:       number
    createdAt:    string
}

export const hiveHoneyProductionApi = {
    create: async (payload: HiveHoneyProductionCreateModel): Promise<HiveHoneyProductionGetModel> => {
        const { data } = await axios.post<HiveHoneyProductionGetModel>(`/hiveHoneyProduction/create`, payload)
        return data
    },

    getHiveHoneyProduction: async (hiveId: number): Promise<HiveHoneyProductionGetModel[]> => {
        const { data } = await axios.get<HiveHoneyProductionGetModel[]>(`/hiveHoneyProduction/hive/${hiveId}`)
        return data
    }
}