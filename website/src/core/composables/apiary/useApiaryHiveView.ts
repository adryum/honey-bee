import { storeToRefs } from "pinia"
import { useHiveStore } from "@/core/stores/HiveStore"

export function useApiaryHiveView() {
    const store = useHiveStore()
    const { apiaryHives } = storeToRefs(store)

    return {
        apiaryHives,
        updateHives: store.updateApiaryHives
    }
}