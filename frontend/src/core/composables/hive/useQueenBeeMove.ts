import { storeToRefs } from "pinia";
import { useHiveStore } from "@/core/stores/HiveStore";

export function useQueenBeeMove() {
    const store = useHiveStore()
    const { isQueenBeeLoading, hives } = storeToRefs(store)

    return {
        isQueenBeeLoading,
        hives,
        moveQueenBee: store.moveQueenBee,
    }
}