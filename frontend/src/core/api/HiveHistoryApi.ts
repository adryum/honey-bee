import axios from "axios"
import type { HiveHistoryCreateModel, HiveHistoryGetModel } from "./Models"
import { HiveHistoryGetModel_To_HistoryEntryDB } from "../Convertors"
import type { HistoryEntryDB } from "../stores/Models"

export const hiveHistoryApi = {
    createHistory: async (payload: HiveHistoryCreateModel): Promise<HistoryEntryDB> => {
        const { data } = await axios.post<HiveHistoryGetModel>(`/hiveHistory`, payload)
        return HiveHistoryGetModel_To_HistoryEntryDB(data)
    },

    getHistory: async (hiveId: number): Promise<HistoryEntryDB[]> => {
        const { data } = await axios.get<HiveHistoryGetModel[]>(`/hiveHistory/hive/${hiveId}`)
        return data.map(HiveHistoryGetModel_To_HistoryEntryDB)
    }
}