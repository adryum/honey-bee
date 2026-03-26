import axios from "axios"
import type { HiveHistoryCreateModel, HiveHistoryGetModel } from "./Models"

export const hiveHistoryApi = {
    createHistory: async (payload: HiveHistoryCreateModel): Promise<HiveHistoryGetModel> => {
        const { data } = await axios.post<HiveHistoryGetModel>(`/hiveHistory/create`, payload)
        return data
    },

    getHistory: async (hiveId: number): Promise<HiveHistoryGetModel[]> => {
        const { data } = await axios.get<HiveHistoryGetModel[]>(`/hiveHistory/hive/${hiveId}`)
        return data
    }
}