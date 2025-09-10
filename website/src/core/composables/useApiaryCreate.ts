import { storeToRefs } from "pinia";
import { useApiaryStore } from "../stores/ApiaryStore";

export function useApiaryCreate() {
    const store = useApiaryStore()
    const { showApiaryCreateLoading } = storeToRefs(store)

    return {
        showApiaryCreateLoading,
        createApiary: store.createApiary,
    }
}