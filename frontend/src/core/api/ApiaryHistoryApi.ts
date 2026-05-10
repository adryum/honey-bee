import axios from "axios"
import type { ApiaryHistoryCreateModel, ApiaryHistoryGetModel } from "./Models"
import { ApiaryHistoryGetModel_To_HistoryEntryDB } from "../Convertors"
import type { HistoryEntryDB } from "../stores/Models"
import api from "../config/AxiosConfig"

export const apiaryHistoryApi = {
    createHistory: async (payload: ApiaryHistoryCreateModel): Promise<HistoryEntryDB> => {
        const { data } = await api.post<ApiaryHistoryGetModel>(`/apiaryHistory`, payload)
        return ApiaryHistoryGetModel_To_HistoryEntryDB(data)
    },

    getHistory: async (apiaryId: number): Promise<HistoryEntryDB[]> => {
        const { data } = await api.get<ApiaryHistoryGetModel[]>(`/apiaryHistory/apiary/${apiaryId}`)
        return data.map(ApiaryHistoryGetModel_To_HistoryEntryDB)
    }
}