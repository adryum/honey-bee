import { ref } from "vue"
import { HiveRepository } from "../repositories/HiveRepository"
import type { HiveModel } from "../models/Models"
import { defineStore } from "pinia"

const hiveRepository = new HiveRepository()

export const useHiveStore = defineStore('hive', { 
    state: () => ({
        hives: [] as HiveModel[],
        isAssignHiveLoading: false,
    }),
    actions: {
        async assignHive(hiveId: number, apiaryId: number, onSuccess: () => {}) {
            try {
                this.isAssignHiveLoading = true
                await hiveRepository.assignHive(hiveId, apiaryId);
                onSuccess()
            } catch (error) {
                console.error(error);
            } finally {
                this.isAssignHiveLoading = false
            }
        }

    }
})