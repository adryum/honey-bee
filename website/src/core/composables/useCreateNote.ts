import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";

export function useCreateNote() {
    const store = useHiveStore()
    const { isNoteLoading } = storeToRefs(store)

    return {
        isNoteLoading,
        createNote: store.createNote,
    }
}