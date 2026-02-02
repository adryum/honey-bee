import { storeToRefs } from "pinia";
import { useHiveStore } from "@/core/stores/HiveStore";

export function useQueenBeeCreate() {
    const store = useHiveStore()
    const { isQueenBeeLoading } = storeToRefs(store)

    return {
        isQueenBeeLoading,
        createQueenBee: store.createQueenBee,
    }
}