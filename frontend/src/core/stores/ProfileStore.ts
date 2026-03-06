import { defineStore } from "pinia"
import { ref } from "vue"

export const useProfileStore = defineStore("useProfileStore", () => {
    const apiaryAccess = ref<number[]>([])
    const hiveAccess   = ref<number[]>([])

    function openProfile(userId: number) {
        
    }

    return {

    }
})