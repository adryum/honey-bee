import { useApiaryStore } from "@/core/stores/ApiaryStore"

export function useApiaryView() {
    const store = useApiaryStore()

    return {
        searchForApiaries: store.searchForApiaries
    }
}