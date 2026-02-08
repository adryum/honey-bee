import { defineStore } from "pinia";
import { useApiaryStore } from "./ApiaryStore";

export const useMainStore = defineStore("MainStore", () => {
    const apiaryStore = useApiaryStore()

    async function initialize() {
        await apiaryStore.initialize()
    }

    return {
        initialize
    }
})