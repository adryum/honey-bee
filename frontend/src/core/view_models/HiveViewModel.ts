import { ref } from "vue"
import { HiveRepository } from "../repositories/HiveRepository"
import type { CreateHiveModel, HiveModel, HiveSearchModel } from "../models/Models"
import { defineStore } from "pinia"

const hiveRepository = new HiveRepository()

export const useHiveStore = defineStore('hive', { 
    state: () => ({
        hives: [] as HiveModel[],
        isAssignHiveLoading: false,
    }),
    actions: {
        async init() {
            await this.getAllHives()
        },
        async createHive(hive: CreateHiveModel): Promise<HiveModel | null> {
            try {
                const newHive = await hiveRepository.createHive(hive)

                if (newHive) {
                    this.hives.push(newHive)
                }

                return newHive
            } catch (error) {
                console.error(error);
                return null
            }
        },

        async assignHive(hiveId: number, apiaryId: number) {
            try {
                this.isAssignHiveLoading = true
                const assignedHive = await hiveRepository.assignHive(hiveId, apiaryId);
                if (assignedHive) {
                    const index = this.hives.findIndex(hive => hive.id === assignedHive.id)
                    if (index !== -1) {
                        this.hives[index] = assignedHive
                    }
                    console.log(assignedHive);
                    
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.isAssignHiveLoading = false
            }
        },

        async getAllHives() {
            try {
                this.hives = await hiveRepository.getHives();
            } catch (error) {
                console.error(error);
            }
        },

        searchForHives(model: HiveSearchModel): HiveModel[] {
            return this.hives.filter(hive => {
                return (model.searchWord) 
                ? (model.ignoreDifferentLetterCases) 
                    ? hive.name.toLocaleUpperCase().startsWith(model.searchWord.toLocaleUpperCase())
                    : hive.name.startsWith(model.searchWord)
                : true
                
                && (model.isAssigned) 
                ? hive.apiaryName 
                : true

                && (typeof model.apiaryId === "number") 
                ? hive.apiaryId === model.apiaryId
                : true
            })
        },

        getApiaryHives(apiaryId: number): HiveModel[] {
            return this.hives.filter(hive => hive.apiaryId === apiaryId)
        }
    }
})