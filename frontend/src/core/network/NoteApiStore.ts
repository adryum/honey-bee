import { defineStore } from "pinia";
import type { NoteCreateModelRequest, NoteCreateModelResponse, NoteUpdateRequestModel } from "./Models";
import axios from "axios";
import type { NoteModelDB } from "../stores/Models";
import { NoteCreateModelResponse_to_NoteModelDB, NoteCreateModelResponseArray_to_NoteModelDBArray } from "../Convertors";

export const useNoteApiStore = defineStore("useNoteApiStore", () => {
    async function getNotes(): Promise<NoteModelDB[] | undefined> {
        try {
            const result = await axios.get<NoteCreateModelResponse[]>("/note/get")
            if (result.data)
                return NoteCreateModelResponseArray_to_NoteModelDBArray(result.data)

        } catch (error) {
            return undefined
        }
    }

    async function createNote(
        model: NoteCreateModelRequest
    ): Promise<NoteModelDB | undefined> {
        try {
            const result = await axios.post<NoteCreateModelResponse>("/note/create", model)
            if (result.data)
                return NoteCreateModelResponse_to_NoteModelDB(result.data)

        } catch (error) {
            return undefined
        }
    }

    async function updateNote(
        model: NoteUpdateRequestModel
    ): Promise<NoteModelDB | undefined> {
        try {
            const result = await axios.post<NoteCreateModelResponse>("/note/update", model)
            if (result.data)                
                return NoteCreateModelResponse_to_NoteModelDB(result.data)

        } catch (error) {
            return undefined
        }
    }

    async function deleteNote(
        id: number
    ): Promise<number | undefined> {
        try {
            const result = await axios.post<number>("/note/delete", { id: id })

            if (result.data)
                return result.data
            
        } catch (error) {
            return undefined
        }
    }

    return {
        getNotes,
        createNote,
        updateNote,
        deleteNote,
    }
})