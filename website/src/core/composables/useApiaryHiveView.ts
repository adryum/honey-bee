import { storeToRefs } from "pinia"
import { useApiaryStore } from "../stores/ApiaryStore"
import { useHiveStore } from "../stores/HiveStore"

export function useApiaryHiveView() {
    const store = useHiveStore()
    const { apiaryHives } = storeToRefs(store)

    return {
        apiaryHives,
        updateHives: store.updateApiaryHives
    }
}