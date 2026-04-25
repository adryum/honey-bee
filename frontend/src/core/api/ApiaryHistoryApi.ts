import axios from "axios"
import type { ApiaryHistoryCreateModel, ApiaryHistoryGetModel } from "./Models"
import { ApiaryHistoryGetModel_To_HistoryEntryDB } from "../Convertors"
import type { HistoryEntryDB } from "../stores/Models"

export const apiaryHistoryApi = {
    createHistory: async (payload: ApiaryHistoryCreateModel): Promise<HistoryEntryDB> => {
        const { data } = await axios.post<ApiaryHistoryGetModel>(`/apiaryHistory`, payload)
        return ApiaryHistoryGetModel_To_HistoryEntryDB(data)
    },

    getHistory: async (apiaryId: number): Promise<HistoryEntryDB[]> => {
        const { data } = await axios.get<ApiaryHistoryGetModel[]>(`/apiaryHistory/apiary/${apiaryId}`)
        return data.map(ApiaryHistoryGetModel_To_HistoryEntryDB)
    }
}