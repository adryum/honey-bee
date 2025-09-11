import { HiveApi } from "../api/HiveApi"
import type { HiveCreateModel, HiveModel, HiveSearchOptions } from "../models/Models"
import { defineStore } from "pinia"
import { useApiaryStore } from "./ApiaryStore"
import { removeFrom } from "../utils/others"

const hiveApi = new HiveApi()

export const useHiveStore = defineStore('hive', { 
    state: () => ({
        hives: [] as HiveModel[],
        apiaryHives: [] as HiveModel[],
        isCreatingHive: false,
        isAssigningHive: false,
        isFetchingHive: false,
        isDeletingHive: false,
    }),
    actions: {
        async init() {
            await this.getHives()
        },

        async createHive(
            { hive, onSuccess, onFailure }: {
                hive: HiveCreateModel
                onSuccess: (hive: HiveModel) => void
                onFailure: (error: unknown) => void
            }
        ): Promise<HiveModel | null> {
            console.log("creating hive");
            try {
                const newHive = await hiveApi.createHive(hive)
                console.log("Created hive: ", newHive);
                

                if (newHive) {
                    this.hives.push(newHive)
                    onSuccess(newHive)
                }

                return newHive
            } catch (error) {
                console.error(error);
                onFailure(error)
                return null
            }
        },
        async deleteHive(
            { hiveId, hiveName, onSuccess, onFailure }: {
                hiveId: number
                hiveName: string
                onSuccess: (hiveName: string) => void
                onFailure: (error: unknown) => void
            }
        ): Promise<void> {
            console.log("creating hive");
            try {
                this.isDeletingHive = true
                const isSuccess = await hiveApi.deleteHive(hiveId)
                
                if (isSuccess) {
                    console.log("Deleted hive ", hiveName);
                    const store = useApiaryStore()
                    const apiaryId = this.hives.find(hive => hive.id === hiveId)!.apiaryId
                    store.unassignHive({ apiaryId })

                    this.hives = this.hives.filter(hive => hive.id !== hiveId)
                    this.apiaryHives = this.apiaryHives.filter(hive => hive.id !== hiveId)

                    onSuccess(hiveName)
                } else {
                    onFailure('failed to delete chat!')
                }
            } catch (error) {
                console.error(error);
                onFailure(error)
            } finally {
                this.isDeletingHive = false
            }
        },

        async assignHive(hiveId: number, apiaryId: number) {
            try {
                this.isAssigningHive = true
                const assignedHive = await hiveApi.assignHive(hiveId, apiaryId);
                if (assignedHive) {
                    const index = this.hives.findIndex(hive => hive.id === assignedHive.id)
                    if (index !== -1) {
                        const store = useApiaryStore()
                        store.unassignHive({ apiaryId: this.hives[index].apiaryId })
                        store.assignHive({ apiaryId: apiaryId })
            
                        this.hives[index] = assignedHive
                    }
                    console.log(assignedHive);
                    
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.isAssigningHive = false
            }
        },

        async getHives() {
            try {
                this.isFetchingHive = true
                this.hives = await hiveApi.getHives();
            } catch (error) {
                console.error(error);
            } finally {
                this.isFetchingHive = false
            }
        },

        searchForHives(options: HiveSearchOptions): HiveModel[] {
            return this.hives.filter(hive => this.hiveMatchesOptions({ 
                hive: hive, 
                options: options 
            }))
        },

        updateApiaryHives({apiaryId, options}:{
            apiaryId: number, 
            options: HiveSearchOptions
        }): void {
            this.apiaryHives = this.hives
                .filter(hive => hive.apiaryId === apiaryId)
                .filter(hive => this.hiveMatchesOptions({ 
                    hive: hive, 
                    options: options 
                }))
        },

        hiveMatchesOptions({hive, options}: {
            hive: HiveModel, 
            options: HiveSearchOptions
        }): boolean {
            const wordMatches = (options.searchWord) 
            ? (options.ignoreDifferentLetterCases) 
                ? hive.name.toLocaleUpperCase().startsWith(options.searchWord.toLocaleUpperCase())
                : hive.name.startsWith(options.searchWord)
            : true
            
            const isAssigned = (options.isAssigned) 
            ? Boolean(hive.apiaryName) 
            : true

            const apiaryMatches = (typeof options.apiaryId === "number") 
            ? hive.apiaryId === options.apiaryId
            : true

            return wordMatches && isAssigned && apiaryMatches
        }
    }
})