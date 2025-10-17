import { storeToRefs } from "pinia";
import { useHiveStore } from "../stores/HiveStore";

export function useCreateSupper() {
    const store = useHiveStore()
    const { isSupperLoading } = storeToRefs(store)

    return {
        isSupperLoading,
        createSupper: store.createSupper,
    }
}