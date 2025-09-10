import { defineStore } from "pinia"
import type { ApiaryCreateModel, ApiaryModel, ApiarySearchOptions } from "../models/Models"
import { ApiaryApi } from "../api/ApiaryApi"
import { isNumber } from '@/core/utils/others'

const apiaryApi = new ApiaryApi()

export const useApiaryStore = defineStore('apiary', { 
    state: () => ({
        apiaries: [] as ApiaryModel[],
        showApiaryCreateLoading: false,
        showApiaryFetchLoading: false
    }),
    actions: {
        async init() {
            await this.getApiaries()
        },
        async getApiaries(): Promise<void> {
            try {
                this.showApiaryFetchLoading = true
                const response = await apiaryApi.getApiaries()

                if (response) {
                    this.apiaries = response
                } else {
                    console.log('No apiaries');
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.showApiaryFetchLoading = false
            }
        },
        async createApiary({
                apiary,
                onSuccess, 
                onFailure
            }: {
                apiary: ApiaryCreateModel,
                onSuccess: (apiary: ApiaryModel) => void, 
                onFailure: (error: unknown) => void
            }
        ): Promise<ApiaryModel | undefined> {
            try {
                this.showApiaryCreateLoading = true
                const response = await apiaryApi.createApiary(apiary)
                
                if (response) {
                    this.apiaries.push(response)
                    onSuccess(response)
                }

                return response
            } catch (error) {
                console.error(error);
                onFailure(error)
                return undefined
            } finally {
                this.showApiaryCreateLoading = false
            }
        },
        assignHiveUpdate(
            {takenApiaryId, givenApiaryId}: {takenApiaryId: number | undefined, givenApiaryId: number}
        ) {
            console.log(takenApiaryId);
            console.log(isNumber(takenApiaryId));
            
            if (isNumber(takenApiaryId))
                this.apiaries.find(apiary => apiary.id === takenApiaryId)!.hiveCount--
            this.apiaries.find(apiary => apiary.id === givenApiaryId)!.hiveCount++
        },
        searchForApiaries(options: ApiarySearchOptions): ApiaryModel[] {
            if (this.apiaries.length === 0) return [] as ApiaryModel[]

            console.log(this.apiaries);
            
            return this.apiaries.filter(apiary => {
                const wordMatches = (options.searchWord) 
                    ? (options.ignoreDifferentLetterCases) 
                        ? apiary.name.toLocaleUpperCase().startsWith(options.searchWord.toLocaleUpperCase())
                        : apiary.name.startsWith(options.searchWord)
                    : true

                const countMatches = (typeof options.hiveCount === "number")
                    ? options.hiveCount === apiary.hiveCount
                    : true 

                const idMatches = (isNumber(options.id))
                    ? options.id === apiary.id
                    : true

                return wordMatches && countMatches && idMatches
            })
        },
        getApiary(apiaryId: number): ApiaryModel | undefined {
            if (this.apiaries.length === 0) return undefined

            return this.apiaries.find(apiary => apiary.id === apiaryId)
        },
        
    }
})