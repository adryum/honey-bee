import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";

export function useHiveCreate() {
    const store = useHiveStore()
    const { isHiveLoading } = storeToRefs(store)

    return {
        isHiveLoading,
        createHive: store.createHive,
        assignHive: store.assignHive
    }
}