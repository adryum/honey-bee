import { QueenHistoryGetModel_To_QueenHistoryDB, HiveCreateResponse_to_HiveModelDB, HiveHistoryGetModel_To_HistoryEntryDB, NoteCreateModelResponse_to_NoteModelDB } from "@/core/Convertors"
import type { HistoryEntryDB, HiveModelDB, NoteModelDB, QueenHistoryModelDB } from "@/core/stores/Models"
import { isValidValue } from "@/core/utils/others"
import axios from "axios"
import type { QueenHistoryGetModel, HiveGetModel, HiveCreateRequestModel, HiveUpdateRequestModel, HiveHistoryCreateModel, HiveHistoryGetModel, HiveHoneyYieldCreateModel, HiveHoneyYieldGetModel, NoteCreateModelRequest, NoteGetModel, NoteUpdateRequestModel } from "./Models"

export const hiveApi = {
    getFromApiary: async (apiaryId: number | undefined) => {
        const { data } = await axios.get<HiveGetModel[]>("/hive", {
            params: {
                apiaryId: apiaryId
            }
        })
        return data.map(HiveCreateResponse_to_HiveModelDB)
    },
    get: async ( id: number) => {
        const { data } = await axios.get<HiveGetModel>(`/hive/${id}`)
        return HiveCreateResponse_to_HiveModelDB(data)
    },
    create: async (model: HiveCreateRequestModel): Promise<HiveModelDB> => {
        const formData = new FormData()
        formData.append("name", model.name)
        formData.append("description", model.description)
        formData.append("type", model.type)
        if (isValidValue(model.apiaryId)) formData.append("apiaryId", model.apiaryId.toString())
        if (model.image) formData.append("image", model.image)

        const { data } = await axios.post<HiveGetModel>("/hive", formData)
        
        return HiveCreateResponse_to_HiveModelDB(data)
    },
    update: async (model: HiveUpdateRequestModel): Promise<HiveModelDB> => {
        const formData = new FormData()
        formData.append("name", model.name)
        formData.append("description", model.description) 
        formData.append("type", model.type) 
        formData.append("apiaryId", isValidValue(model.apiaryId) ? model.apiaryId!.toString() : "") 
        if (model.image) formData.append("image", model.image)

        const { data } = await axios.put<HiveGetModel>(`/hive/${model.id}`, formData)
        
        return HiveCreateResponse_to_HiveModelDB(data)
    },
    delete: async (id: number): Promise<number> => {
        const { data } = await axios.delete<number>(`/hive/${id}`)
        return data
    },
    notes: {
        getFromHive: async (hiveId: number): Promise<NoteModelDB[]> => {
            const { data } = await axios.get<NoteGetModel[]>(`/hive-notes/hive/${hiveId}`)
            return data.map(NoteCreateModelResponse_to_NoteModelDB)
        },
        create: async (model: NoteCreateModelRequest): Promise<NoteModelDB> => {
            const { data } = await axios.post<NoteGetModel>(`/hive-notes`, model)
            return NoteCreateModelResponse_to_NoteModelDB(data)
        },
        update: async (model: NoteUpdateRequestModel): Promise<NoteModelDB> => {
            const { data } = await axios.put<NoteGetModel>(`/hive-notes`, model)
            return NoteCreateModelResponse_to_NoteModelDB(data)
        },
        delete: async (id: number): Promise<number> => {
            const { data } = await axios.delete<number>(`/hive-notes/${id}`)
            return data
        }
    },
    history: {
        action: {
            create: async (payload: HiveHistoryCreateModel): Promise<HistoryEntryDB> => {
                const { data } = await axios.post<HiveHistoryGetModel>(`/hive-action-history`, payload)
                return HiveHistoryGetModel_To_HistoryEntryDB(data)
            },
            getFromHive: async (hiveId: number): Promise<HistoryEntryDB[]> => {
                const { data } = await axios.get<HiveHistoryGetModel[]>(`/hive-action-history/hive/${hiveId}`)
                return data.map(HiveHistoryGetModel_To_HistoryEntryDB)
            },
        },
        queen: {
            getFromHive: async (hiveId: number): Promise<QueenHistoryModelDB[]> => {
                const { data } = await axios.get<QueenHistoryGetModel[]>(`/hive-queen-history/hive/${hiveId}`)
                return data.map(QueenHistoryGetModel_To_QueenHistoryDB)
            },
        }
    },
    yields: {
        create: async (payload: HiveHoneyYieldCreateModel): Promise<HiveHoneyYieldGetModel> => {
            const { data } = await axios.post<HiveHoneyYieldGetModel>(`/hive-yields`, payload)
            return data
        },
        getFromHive: async (hiveId: number): Promise<HiveHoneyYieldGetModel[]> => {
            const { data } = await axios.get<HiveHoneyYieldGetModel[]>(`/hive-yields/hive/${hiveId}`)
            return data
        },
    }
}
