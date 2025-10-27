import { storeToRefs } from "pinia";
import { useHiveStore } from "@/core/stores/HiveStore";
import { useApiaryStore } from "@/core/stores/ApiaryStore";

export function useHiveAssignToApiary() {
    const apiaryStore = useApiaryStore()
    const hiveStore = useHiveStore()
    const { isAssigningHive } = storeToRefs(hiveStore)

    return {
        searchForApiaries: apiaryStore.searchForApiaries,
        isAssigningHive,
        assignHive: hiveStore.assignHive,
    }
}