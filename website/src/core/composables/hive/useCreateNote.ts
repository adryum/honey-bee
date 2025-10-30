import { storeToRefs } from "pinia";
import { useHiveStore } from "@/core/stores/HiveStore";

export function useNoteCreate() {
    const store = useHiveStore()
    const { isNoteLoading } = storeToRefs(store)

    return {
        isNoteLoading,
        createNote: store.createNote,
    }
}