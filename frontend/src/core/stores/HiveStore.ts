import { HiveApi } from "../api/HiveApi"
import { defineStore } from "pinia"
import { useApiaryStore } from "./ApiaryStore"
import { isNumber, removeFrom, replace } from "../utils/others"
import type { CallbackModel, SupperCreateRequestModel, SupperModel } from "../models/SupperModels"
import type { NoteCreateRequestModel, NoteModel } from "../models/NoteModels"
import type { HiveModel, HiveCreateModel, HiveSearchOptions, HiveUpdateModel } from "../models/HiveModels"
import type { LogModel } from "../models/Models"

const hiveApi = new HiveApi()

export const useHiveStore = defineStore('hive', { 
    state: () => ({
        hives: [] as HiveModel[],
        apiaryHives: [] as HiveModel[],
        suppers: [] as SupperModel[],
        notes: [] as NoteModel[],
        logs: [] as LogModel[],
        isHiveLoading: false,
        isAssigningHive: false,
        isFetchingHive: false,
        isDeletingHive: false,
        isSupperLoading: false,
        isNoteLoading: false
    }),
    actions: {
        async init() {
            await this.getHives()
        },
        async updateHive(hive: HiveUpdateModel, callback: CallbackModel): Promise<HiveModel | undefined> {
            console.log("updating hive");
            try {
                const response = await hiveApi.updateHive(hive)
                
                if (response) {
                    replace(this.hives, response, (hive) => hive.id === response.id)
                    callback.onSuccess("Updated hive")
                }

                return response
            } catch (error) {
                console.error(error);
                callback.onFailure(error)
                return undefined
            }
        },
        async createHive(hive: HiveCreateModel, callback: CallbackModel): Promise<HiveModel | null> {
            console.log("creating hive");
            try {
                const newHive = await hiveApi.createHive(hive)
                console.log("Created hive: ", newHive);
                

                if (newHive) {
                    this.hives.push(newHive)
                    callback.onSuccess(newHive.name)
                }

                return newHive
            } catch (error) {
                console.error(error);
                callback.onFailure(error)
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
        async createSupper(supper: SupperCreateRequestModel, callback: CallbackModel) {
            try {
                this.isSupperLoading = true
                var response = await hiveApi.createSupper(supper)
                
                if (response) {
                    this.suppers.push(response)
                    callback.onSuccess("Created supper")
                }
            } catch (error) {
                console.error(error)
                callback.onFailure(error)
            } finally {
                this.isSupperLoading = false
            }
        },
        async updateSupper(supper: SupperModel, callback: CallbackModel) {
            try {
                this.isSupperLoading = true
                var response = await hiveApi.updateSupper(supper)

                if (response) {
                    replace(this.suppers, response, (item) => item.id === response?.id)
                    callback.onSuccess("Updated supper")
                }
            } catch (error) {
                console.error(error);
                callback.onFailure(error);
            } finally {
                this.isSupperLoading = false
            }
        },
        async deleteSupper(id: number, callback: CallbackModel) {
            try {
                this.isSupperLoading = true
                var response = await hiveApi.deleteSupper(id)
                
                if (isNumber(response)) {
                    this.suppers = this.suppers.filter(supper => supper.id != response)
                    callback.onSuccess("Updated supper")
                }
            } catch (error) {
                console.error(error);
                callback.onFailure(error);
            } finally {
                this.isSupperLoading = false
            }
        },
        async createNote(supper: NoteCreateRequestModel, callback: CallbackModel) {
            try {
                this.isNoteLoading = true
                var response = await hiveApi.createNote(supper)
                
                if (response) {
                    this.notes.push(response)
                    callback.onSuccess("Created note")
                }
            } catch (error) {
                console.error(error)
                callback.onFailure(error)
            } finally {
                this.isNoteLoading = false
            }
        },
        async updateNote(supper: NoteModel, callback: CallbackModel) {
            try {
                this.isNoteLoading = true
                var response = await hiveApi.updateNote(supper)

                if (response) {
                    replace(this.notes, response, (item) => item.id === response?.id)
                    callback.onSuccess("Updated note")
                }
            } catch (error) {
                console.error(error);
                callback.onFailure(error);
            } finally {
                this.isNoteLoading = false
            }
        },
        async deleteNote(id: number, callback: CallbackModel) {
            try {
                this.isNoteLoading = true
                var response = await hiveApi.deleteNote(id)
                
                if (isNumber(response)) {
                    this.notes = this.notes.filter(note => note.id != response)
                    callback.onSuccess("Updated note")
                }
            } catch (error) {
                console.error(error);
                callback.onFailure(error);
            } finally {
                this.isNoteLoading = false
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