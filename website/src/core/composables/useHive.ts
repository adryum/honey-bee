import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";

export function useHive() {
    const store = useHiveStore()
    const { isDeletingHive, isAssigningHive } = storeToRefs(store)

    return {
        isAssigningHive,
        isDeletingHive,
        assignHive: store.assignHive,
        deleteHive: store.deleteHive
    }
}