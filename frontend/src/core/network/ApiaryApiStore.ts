import { defineStore } from "pinia";
import type { ApiaryCreateRequestModel, ApiaryCreateResponseModel, HiveAssignRequestModel, HiveAssignResponseModel } from "./Models";
import axios from "axios";
import type { ApiaryModelDB } from "../stores/Models";
import { ApiaryCreateResponse_to_ApiaryModelDB, ApiaryCreateResponseArray_to_ApiaryModelDBArray } from "../Convertors";

export const useApiaryApiStore = defineStore("Apiary api store", () => {
    async function getApiaries(): Promise<ApiaryModelDB[] | undefined> {
        try {
            const result = await axios.get<ApiaryCreateResponseModel[]>("/apiary/get")
            if (result.data)
                return ApiaryCreateResponseArray_to_ApiaryModelDBArray(result.data)

        } catch (error) {
            return undefined
        }
    }

    async function createApiary(
        createApiaryModel: ApiaryCreateRequestModel
    ): Promise<ApiaryModelDB | undefined> {
        try {
            const formData = new FormData()
            formData.append("name", createApiaryModel.name)
            formData.append("description", createApiaryModel.description)
            if (createApiaryModel.image) formData.append("image", createApiaryModel.image)

            const result = await axios.post<ApiaryCreateResponseModel>("/apiary/create", formData)

            console.log("Gote apiaria : ", result.data);
            

            if (result.data)
                return ApiaryCreateResponse_to_ApiaryModelDB(result.data)

        } catch (error) {
            return undefined
        }
    }

    async function deleteApiary(
        id: number
    ): Promise<number | undefined> {
        try {
            const result = await axios.post<number>("/apiary/delete", id)

            if (result.data)
                return result.data
            
        } catch (error) {
            return undefined
        }
    }

    async function assignHive(
        requestModel: HiveAssignRequestModel
    ): Promise<HiveAssignResponseModel | undefined> {
        try {
            const result = await axios.post<HiveAssignResponseModel>("/apiary/assignHive", requestModel)

            if (result.data)
                return result.data
            
        } catch (error) {
            return undefined
        }
    }

    async function unassignHive(
        id: number
    ): Promise<number | undefined> {
        try {
            const result = await axios.post<number>("/apiary/unassignHive", { id: id })

            if (result.data)
                return result.data
            
        } catch (error) {
            return undefined
        }
    }

    return {
        createApiary,
        getApiaries,
        deleteApiary,
        assignHive,
        unassignHive
    }
})