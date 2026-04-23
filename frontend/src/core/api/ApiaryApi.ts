import axios from "axios"
import { ApiaryCreateResponse_to_ApiaryModelDB, HiveCreateResponse_to_HiveModelDB } from "../Convertors";
import type { ApiaryCreateResponseModel, ApiaryCreateRequestModel, HiveAssignRequestModel, HiveAssignResponseModel, HiveCreateResponseModel } from "./Models";
import type { ApiaryModelDB, HiveModelDB } from "../stores/Models";

export const apiaryApi = {
    getApiaries: async (): Promise<ApiaryModelDB[]> => {
        const { data } = await axios.get<ApiaryCreateResponseModel[]>("/apiary")
        return data.map(ApiaryCreateResponse_to_ApiaryModelDB)
    },

    getApiary: async (id: number) => {
        const { data } = await axios.get<ApiaryCreateResponseModel>(`/apiary/${id}`)
        return ApiaryCreateResponse_to_ApiaryModelDB(data)
    },

    getApiaryHives: async (apiaryId: number): Promise<HiveModelDB[]> => {
        const { data } = await axios.get<HiveCreateResponseModel[]>(`/apiary/${apiaryId}/hives`)
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

        const result = await axios.post<ApiaryCreateResponseModel>("/apiary/create", formData)

        console.log("Gote apiaria : ", result.data);
    
        return ApiaryCreateResponse_to_ApiaryModelDB(result.data)
    },

    deleteApiary: async (id: number): Promise<number> => {
        const result = await axios.post<number>("/apiary/delete", id)
        return result.data
    },

    assignHive: async (
        requestModel: HiveAssignRequestModel
    ): Promise<HiveAssignResponseModel> => {
        const result = await axios.post<HiveAssignResponseModel>("/apiary/assignHive", requestModel)
        return result.data
    },
    
    unassignHive: async (id: number): Promise<number> => {
        const result = await axios.post<number>("/apiary/unassignHive", { id: id })
        return result.data
    }
}
