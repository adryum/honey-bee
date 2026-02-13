import { defineStore } from "pinia"
import type { CallbackModel } from "../models/SupperModels"
import { ref } from "vue"
import type { NoteModelDB } from "./Models"
import { isValidValue } from "../utils/others"
import type { NoteCreateModelRequest, NoteUpdateRequestModel } from "../network/Models"
import { useNoteApiStore } from "../network/NoteApiStore"

export const useNoteStore = defineStore("useNoteStore", () => {
    const noteApiStore = useNoteApiStore()
    const notes = ref<NoteModelDB[]>([])

    const isCreatingNote = ref(false)

    async function initialize() {
        await getNotes()
    }

    async function getNotes() {
        try {
            const result = await noteApiStore.getNotes()
            if (!result) throw new Error("Failed to get notes!");
            
            notes.value = result
        } catch (error) {
            console.error(error);
        }
    }

    async function updateNote(
        model: NoteUpdateRequestModel, 
        callback: CallbackModel
    ): Promise<NoteModelDB | undefined> {
        console.log("updating hive");
        try {
            const result = await noteApiStore.updateNote(model)
            if (!result) throw new Error("Failed to update note!");
            callback.onSuccess("")
            notes.value.replace(result, (note) => note.id === result.id)

            return result
        } catch (error) {
            console.error(error);
            callback.onFailure()
            return undefined
        }
    }

    async function createNote(
        model: NoteCreateModelRequest, 
        callback?: CallbackModel
    ): Promise<NoteModelDB | undefined> {
        try {
            const result = await noteApiStore.createNote(model)
            if (!result)  {
                callback?.onFailure()
                throw new Error("Failed to create note!");
            } else {
                callback?.onSuccess("")
                notes.value.push(result)
            }

            return result
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    async function deleteNote(
        id: number,
        callback?: CallbackModel
    ): Promise<number | undefined> {
        try {
            const result = await noteApiStore.deleteNote(id)
            
            if (isValidValue(result)) {
                notes.value = notes.value.filter(note => note.id !== id)
                callback?.onSuccess("")
            } else {
                callback?.onFailure()
            }

            return result
        } catch (error) {
            console.error(error);
        } 
    }

    return {
        notes,
        initialize,
        updateNote,
        createNote,
        deleteNote,
    }
})