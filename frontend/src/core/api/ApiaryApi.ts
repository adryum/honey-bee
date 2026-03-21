import axios from "axios"
import { ApiaryCreateResponse_to_ApiaryModelDB } from "../Convertors";
import type { ApiaryCreateResponseModel, ApiaryCreateRequestModel, HiveAssignRequestModel, HiveAssignResponseModel } from "./Models";
import type { ApiaryModelDB } from "../stores/Models";

export const apiaryApi = {
    getApiaries: async (): Promise<ApiaryModelDB[]> => {
        const { data } = await axios.get<ApiaryCreateResponseModel[]>("/apiary/get")
        return data.map(ApiaryCreateResponse_to_ApiaryModelDB)
    },

    getApiary: async (id: number) => {
        const { data } = await axios.get<ApiaryCreateResponseModel>("/apiary/get", {
            params: {
                id: id
            }
        })
        return ApiaryCreateResponse_to_ApiaryModelDB(data)
    },

    createApiary: async (
        model: ApiaryCreateRequestModel
    ): Promise<ApiaryModelDB> => {
        const { name, description, image } = model 

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
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
