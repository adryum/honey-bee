import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";

export function useHiveCreate() {
    const store = useHiveStore()
    const { isCreatingHive } = storeToRefs(store)

    return {
        isCreatingHive,
        createHive: store.createHive,
        assignHive: store.assignHive
    }
}