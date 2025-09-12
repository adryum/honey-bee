import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";

export function useHive() {
    const store = useHiveStore()
    const { isDeletingHive } = storeToRefs(store)

    return {
        isDeletingHive,
        deleteHive: store.deleteHive,
        updateHives: store.updateApiaryHives
    }
}