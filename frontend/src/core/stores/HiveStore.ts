import { HiveApi } from "../api/HiveApi"
import type { HiveCreateModel, HiveModel, HiveSearchOptions } from "../models/Models"
import { defineStore } from "pinia"
import { useApiaryStore } from "./ApiaryStore"

const hiveRepository = new HiveApi()

export const useHiveStore = defineStore('hive', { 
    state: () => ({
        hives: [] as HiveModel[],
        showHiveAssignLoading: false,
        showHiveFetchLoading: false,
    }),
    actions: {
        async init() {
            await this.getHives()
        },

        async createHive(hive: HiveCreateModel): Promise<HiveModel | null> {
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
                this.showHiveAssignLoading = true
                const assignedHive = await hiveRepository.assignHive(hiveId, apiaryId);
                if (assignedHive) {
                    const index = this.hives.findIndex(hive => hive.id === assignedHive.id)
                    if (index !== -1) {
                        const store = useApiaryStore()
                        store.assignHiveUpdate({ 
                            takenApiaryId: this.hives[index].apiaryId!, 
                            givenApiaryId: apiaryId 
                        })

                        this.hives[index] = assignedHive
                    }
                    console.log(assignedHive);
                    
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.showHiveAssignLoading = false
            }
        },

        async getHives() {
            try {
                this.showHiveFetchLoading = true
                this.hives = await hiveRepository.getHives();
            } catch (error) {
                console.error(error);
            } finally {
                this.showHiveFetchLoading = false
            }
        },

        searchForHives(options: HiveSearchOptions): HiveModel[] {
            return this.hives.filter(hive => {
                const wordMatches = (options.searchWord) 
                ? (options.ignoreDifferentLetterCases) 
                    ? hive.name.toLocaleUpperCase().startsWith(options.searchWord.toLocaleUpperCase())
                    : hive.name.startsWith(options.searchWord)
                : true
                
                const isAssigned = (options.isAssigned) 
                ? hive.apiaryName 
                : true

                const apiaryMatches = (typeof options.apiaryId === "number") 
                ? hive.apiaryId === options.apiaryId
                : true

                return wordMatches && isAssigned && apiaryMatches
            })
        },

        getApiaryHives(apiaryId: number): HiveModel[] {
            return this.hives.filter(hive => hive.apiaryId === apiaryId)
        }
    }
})