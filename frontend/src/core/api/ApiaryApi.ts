import axios from "axios"
import { ApiaryCreateResponse_to_ApiaryModelDB, HiveCreateResponse_to_HiveModelDB } from "../Convertors";
import type { ApiaryGetModel, ApiaryCreateRequestModel, HiveAssignRequestModel, HiveAssignGetModel, HiveGetModel, HiveYieldGetModel } from "./Models";
import type { ApiaryModelDB, DateRange, HiveModelDB } from "../stores/Models";

export const apiaryApi = {
    getHiveYields: async (
        apiaryId: number,
        range:    DateRange
    ): Promise<HiveYieldGetModel[]> => {
        const { data } = await axios.get<HiveYieldGetModel[]>(`/apiary/${apiaryId}/yields`, {
            params: { 
                toISO: range.toISO, 
                fromISO: range.fromISO 
            }
        })
        
        return data
    },

    getApiaries: async (): Promise<ApiaryModelDB[]> => {
        const { data } = await axios.get<ApiaryGetModel[]>("/apiary")
        return data.map(ApiaryCreateResponse_to_ApiaryModelDB)
    },

    getApiary: async (id: number) => {
        const { data } = await axios.get<ApiaryGetModel>(`/apiary/${id}`)
        return ApiaryCreateResponse_to_ApiaryModelDB(data)
    },

    getApiaryHives: async (apiaryId: number): Promise<HiveModelDB[]> => {
        const { data } = await axios.get<HiveGetModel[]>(`/apiary/${apiaryId}/hives`)
        return data.map(HiveCreateResponse_to_HiveModelDB)
    },

    createApiary: async (
        model: ApiaryCreateRequestModel
    ): Promise<ApiaryModelDB> => {
        const { name, description, image } = model 

        const formData = new FormData()
        formData.append("name", name)
        if (description) formData.append("description", description)
        if (image) formData.append("image", image)

        const result = await axios.post<ApiaryGetModel>("/apiary", formData)
        
        return ApiaryCreateResponse_to_ApiaryModelDB(result.data)
    },

    deleteApiary: async (id: number): Promise<number> => {
        const result = await axios.post<number>("/apiary/delete", id)
        return result.data
    },

    assignHive: async (
        requestModel: HiveAssignRequestModel
    ): Promise<HiveAssignGetModel> => {
        const result = await axios.post<HiveAssignGetModel>("/apiary/assignHive", requestModel)
        return result.data
    },
    
    unassignHive: async (id: number): Promise<number> => {
        const result = await axios.post<number>("/apiary/unassignHive", { id: id })
        return result.data
    }
}
