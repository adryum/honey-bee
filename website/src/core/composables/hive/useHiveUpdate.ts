import { storeToRefs } from "pinia";
import { useHiveStore } from "@/core/stores/HiveStore";
import { useApiaryStore } from "@/core/stores/ApiaryStore";

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