import { useApiaryStore } from "../stores/ApiaryStore"

export function useApiaryView() {
    const store = useApiaryStore()

    return {
        searchForApiaries: store.searchForApiaries
    }
}