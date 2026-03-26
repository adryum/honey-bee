import type { HiveModelDB } from "../stores/Models";
import axios from "axios"
import { HiveCreateResponse_to_HiveModelDB } from "../Convertors";
import { isValidValue } from "../utils/others";
import type { HiveCreateResponseModel, HiveCreateRequestModel, HiveUpdateRequestModel, HiveHistoryCreateModel, HiveHistoryGetModel } from "./Models";

export const hiveApi = {
    getHives: async (
        apiaryId: number | undefined
    ) => {
        const { data } = await axios.get<HiveCreateResponseModel[]>("/hive", {
            params: {
                apiaryId: apiaryId
            }
        })
        return data.map(HiveCreateResponse_to_HiveModelDB)
    },

    getHive: async (
        id: number
    ) => {
        const { data } = await axios.get<HiveCreateResponseModel>(`/hive/${id}`)
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

        const result = await axios.post<HiveCreateResponseModel>("/hive/create", formData)
        
        return HiveCreateResponse_to_HiveModelDB(result.data)
    },

    updateHive: async (
        model: HiveUpdateRequestModel
    ): Promise<HiveModelDB> => {
        const formData = new FormData()
        formData.append("id", model.id.toString())
        formData.append("name", model.name)
        formData.append("description", model.description) 
        formData.append("type", model.type) 
        formData.append("apiaryId", isValidValue(model.apiaryId) ? model.apiaryId!.toString() : "") 
        if (model.image) formData.append("image", model.image)

        const result = await axios.post<HiveCreateResponseModel>("/hive/update", formData)
        
        return HiveCreateResponse_to_HiveModelDB(result.data)
    },

    deleteHive: async (
        id: number
    ): Promise<number> => {
        const result = await axios.post<number>("/hive/delete", { id: id})        
        return result.data
    },


    // async function createCalendarEvent(
    //     model: HiveCalendarEntryRequestModel
    // ) {
    //     try {
    //         const result = await axios.post<HiveCalendarEntryResponseModel>("/hive/calendar/create", model)
    //         if (!result.data) throw new Error("Failed to create calendar entry!");
            
    //         return result.data
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function getHives(): Promise<HiveModelDB[] | undefined> {
    //     try {
            
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function createHive(
    //     model: HiveCreateRequestModel
    // ): Promise<HiveModelDB | undefined> {
    //     try {
    //         const formData = new FormData()
    //         formData.append("name", model.name)
    //         formData.append("description", model.description)
    //         formData.append("type", model.type)
    //         if (isValidValue(model.apiaryId)) formData.append("apiaryId", model.apiaryId.toString())
    //         if (model.image) formData.append("image", model.image)

    //         const result = await axios.post<HiveCreateResponseModel>("/hive/create", formData)
    //         if (!result.data) throw new Error("Failed to create hive!");
            
    //         return HiveCreateResponse_to_HiveModelDB(result.data)
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function updateHive(
    //     model: HiveUpdateRequestModel
    // ): Promise<HiveModelDB | undefined> {
    //     try {
    //         const formData = new FormData()
    //         formData.append("id", model.id.toString())
    //         formData.append("name", model.name)
    //         formData.append("description", model.description) 
    //         formData.append("type", model.type) 
    //         formData.append("apiaryId", isValidValue(model.apiaryId) ? model.apiaryId!.toString() : "") 
    //         if (model.image) formData.append("image", model.image)

    //         const result = await axios.post<HiveCreateResponseModel>("/hive/update", formData)
    //         if (!result.data) throw new Error("Failed to update hive!");

    //         console.log(result.data);
            
            
    //         return HiveCreateResponse_to_HiveModelDB(result.data)
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function deleteHive(
    //     id: number
    // ): Promise<number | undefined> {
    //     try {
    //         const result = await axios.post<number>("/hive/delete", { id: id})
    //         if (!isValidValue(result.data)) throw new Error("Failed to delete hive!");
            
    //         return result.data
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }
}
