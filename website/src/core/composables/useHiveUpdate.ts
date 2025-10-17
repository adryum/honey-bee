import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";
import { useApiaryStore } from "../stores/ApiaryStore";

export function useHiveUpdate() {
    const hiveStore = useHiveStore()
    const apiaryStore = useApiaryStore()
    const { isHiveLoading } = storeToRefs(hiveStore)
    const { apiaries } = storeToRefs(apiaryStore)

    return {
        isHiveLoading,
        apiaries,
        updateHive: hiveStore.updateHive
    }
}