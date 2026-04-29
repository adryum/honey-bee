import axios from "axios";
import type { NoteModelDB } from "../stores/Models";
import { NoteCreateModelResponse_to_NoteModelDB } from "../Convertors";
import type { NoteGetModel, NoteCreateModelRequest, NoteUpdateRequestModel } from "./Models";

export const noteApi = {
    getHiveNotes: async (hiveId: number): Promise<NoteModelDB[]> => {
        const { data } = await axios.get<NoteGetModel[]>(`/note/hive/${hiveId}`)
        return data.map(NoteCreateModelResponse_to_NoteModelDB)
    },

    create: async (model: NoteCreateModelRequest): Promise<NoteModelDB> => {
        const { data } = await axios.post<NoteGetModel>("/note", model)
        return NoteCreateModelResponse_to_NoteModelDB(data)
    },

    update: async (model: NoteUpdateRequestModel): Promise<NoteModelDB> => {
        const { data } = await axios.put<NoteGetModel>("/note", model)
        return NoteCreateModelResponse_to_NoteModelDB(data)
    },

    delete: async (id: number): Promise<number> => {
        const { data } = await axios.delete<number>(`/note/${id}`)
        return data
    }
}
