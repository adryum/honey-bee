import type { HiveModelDB } from "../stores/Models";
import axios from "axios"
import { HiveCreateResponse_to_HiveModelDB } from "../Convertors";
import { isValidValue } from "../utils/others";
import type { HiveGetModel, HiveCreateRequestModel, HiveUpdateRequestModel, HiveHistoryCreateModel, HiveHistoryGetModel } from "./Models";

export const hiveApi = {
    getHives: async (
        apiaryId: number | undefined
    ) => {
        const { data } = await axios.get<HiveGetModel[]>("/hive", {
            params: {
                apiaryId: apiaryId
            }
        })
        return data.map(HiveCreateResponse_to_HiveModelDB)
    },

    getHive: async (
        id: number
    ) => {
        const { data } = await axios.get<HiveGetModel>(`/hive/${id}`)
        return HiveCreateResponse_to_HiveModelDB(data)
    },

    createHive: async (
        model: HiveCreateRequestModel
    ): Promise<HiveModelDB> => {
        const formData = new FormData()
        formData.append("name", model.name)
        formData.append("description", model.description)
        formData.append("type", model.type)
        if (isValidValue(model.apiaryId)) formData.append("apiaryId", model.apiaryId.toString())
        if (model.image) formData.append("image", model.image)

        const { data } = await axios.post<HiveGetModel>("/hive", formData)
        
        return HiveCreateResponse_to_HiveModelDB(data)
    },

    updateHive: async (
        model: HiveUpdateRequestModel
    ): Promise<HiveModelDB> => {
        const formData = new FormData()
        formData.append("name", model.name)
        formData.append("description", model.description) 
        formData.append("type", model.type) 
        formData.append("apiaryId", isValidValue(model.apiaryId) ? model.apiaryId!.toString() : "") 
        if (model.image) formData.append("image", model.image)

        const { data } = await axios.put<HiveGetModel>(`/hive/${model.id}`, formData)
        
        return HiveCreateResponse_to_HiveModelDB(data)
    },

    deleteHive: async (
        id: number
    ): Promise<number> => {
        const { data } = await axios.delete<number>(`/hive/${id}`)
        return data
    }
}
